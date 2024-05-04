package com.ttg.slots.game;

import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.ttg.core.modules.balance.entity.UserBalance;
import com.ttg.core.modules.common.enums.code.GameCode;
import com.ttg.core.utils.RandomUtils;
import com.ttg.gamecore.common.starter.game.GameLogic;
import com.ttg.gamecore.proto.*;
import com.ttg.gamecore.utils.MsgUtils;
import com.ttg.slots.game.user.CrashUser;
import com.ttg.slots.utils.CrashMsgUtils;
import lombok.Getter;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class CrashGame extends GameLogic<CrashUser> {

    @Getter
//    private final static int startInterval = 7;
    private final int startInterval = 7;
    @Getter
    private final int settleInterval = 10;
    private Map<Integer,CrashUser> userMap = new HashMap<>();

    @Getter
    private LocalDateTime startTime = LocalDateTime.now();
    private LocalDateTime lastStartDay = startTime;
    private LocalDateTime lastSendUpdate = LocalDateTime.now();


    private BigDecimal speed = BigDecimal.valueOf(0.02);
    private BigDecimal speedScale = BigDecimal.valueOf(0.02);
    private BigDecimal accSpeed = BigDecimal.valueOf(0.0005);
    private BigDecimal accScale = BigDecimal.valueOf(0.0001);
    @Getter
    private BigDecimal value = BigDecimal.ONE;





    private BigDecimal time = BigDecimal.valueOf(0);
    private BigDecimal timeInterval = BigDecimal.valueOf(16.7);
    private long lastUpdateTimes = 0;


    @Getter
    private int status = CrashStatus.Start_VALUE;     //初始状态
    private int issueCount = 1;
    @Getter
    private String issue = "";
//    @Getter
//    private BigDecimal rate = BigDecimal.ONE;

    private TreeMap<String,BigDecimal> historyIssueRate = new TreeMap<>();


    @Override
    public GameCode game() {
        return GameCode.Crash;
    }

    @Override
    public Integer gameCode() {
        return game().getGameId();
    }

    @Override
    public void handlerMsg(Msg msg) {
        try {
            switch (msg.getMsgId()) {
                case BcGameType.ReqCrashBetType_VALUE:
                    crashBet(msg);
                    break;
                case BcGameType.ReqCrashCashOutType_VALUE:
                    crashCashOut(msg);
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private void crashBet(Msg msg) throws Exception {
        CrashBetReq req = CrashBetReq.parseFrom(msg.getData());
        //不是开始状态下注失败
        if (status != CrashStatus.Start_VALUE) {
            return;
        }
        CrashUser user = userManager.gameUser(msg.getPeople().getUid());
        user.bet(req);

        sendCrashBetRes(user);
    }

    private void crashCashOut(Msg msg) throws Exception {
        CrashCashOutReq req = CrashCashOutReq.parseFrom(msg.getData());
        //不是开始状态下注失败
        if (status != CrashStatus.Gaming_VALUE) {
            return;
        }
        CrashUser user = userManager.gameUser(msg.getPeople().getUid());
//        if (value.compareTo(new BigDecimal(req.getRate())) < 0) {
//            return;
//        }
        user.crashOut(req,value);
        sendCrashOutRes(user);
    }

    @Override
    public void update() {
        nextStatus();

        //发送jackpot通知
        userManager.update();
    }


    private void updateValue(LocalDateTime now,long times) {
//        Duration duration = Duration.between(now,startTime);
//        duration.toMillis()
//        BigDecimal.valueOf(1000).divide(BigDecimal.valueOf(60));
        for (int i = 0; i < times; i++) {
            updateSingleValue();
        }
    }


    private void updateSingleValue() {
//        time = time.add(timeInterval);


//        BigDecimal valueAdd = speed.multiply(accSpeed);
//        value = value.add(valueAdd);
//        speed = speed.add(accSpeed);






//        speed = speed + accSpeed;
//        accSpeed = accSpeed + accSpeed * accScale;
//        value = value + (speedScale * speed);

        speed = speed.add(accSpeed);
        accSpeed = accSpeed.add(accSpeed.multiply(accScale));
        value = value.add(speedScale.multiply(speed)).setScale(6,RoundingMode.HALF_UP);
    }

    @Override
    public CrashUser buildUser(Msg msg, EnterGameReq enterGameReq, People people, UserBalance balance) {
        CrashUser user = new CrashUser();
        user.setUid(people.getUid());
        user.setBalance(balance.getBalance());
        user.setGameId(gameCode());
        user.setIcon(people.getAvatar());
        user.setAccount(people.getName());
        user.setPeople(people);



        user.reset();
        userMap.put(user.getUid(),user);
        return user;
    }

    @Override
    public GameLogic<CrashUser> createLogicNewInstance() {
        return new CrashGame();
    }

    @Override
    public void enterNotification(CrashUser crashUser, Msg msg) {
        sendCrashEnterNotify(crashUser);
    }

    @Override
    public void leaveNotification(Integer uid) {

    }


    //离开用户通知
    private void cashOutPlayerNotify() {

    }

    private void nextStatus() {
        LocalDateTime now = LocalDateTime.now();
        if (!checkSendUpdate(now)) {
            return;
        }
        switch (status) {
            case CrashStatus.Start_VALUE:
                changeToGameStatus(now);
                break;
            case CrashStatus.Gaming_VALUE:
                //每秒执行更新60次
                changeToSettleStatus(now);
                break;
            case CrashStatus.Settle_VALUE:
                changeToStartStatus(now);
                break;
        }
    }

    private void changeToGameStatus(LocalDateTime now) {
        if (needChangeToGaming(now)) {
            startTime = now;
            status = CrashStatus.Gaming_VALUE;

            //更新
            sendCrashGamingNotify();
        }
    }

    //开始7s后更改成游戏状态
    private boolean needChangeToGaming(LocalDateTime now) {
        return now.isAfter(startTime.plusSeconds(startInterval));
    }

    private void changeToSettleStatus(LocalDateTime now) {

        //进行计算最新rate
        updateRate(now);

        //未到结算条件
        if (!needChangeToSettle(now)){
            sendCrashUpdateNotify();
            return;
        }

        //达到结算条件进行结算
        startTime = now;
        status = CrashStatus.Settle_VALUE;
        historyIssueRate.put(this.issue,this.value);

        sendCrashFinishNotify();
    }


    private boolean checkSendUpdate(LocalDateTime now) {
        if (now.isAfter(lastSendUpdate.plusSeconds(1))) {
            lastSendUpdate = now;
            return true;
        }
        return false;
    }

    private void updateRate(LocalDateTime now) {
        long millis = Duration.between(startTime,now).toMillis();
        long currentTimes
                = BigDecimal.valueOf(millis)
                .divide(BigDecimal.valueOf(16.6666),6,RoundingMode.HALF_UP).longValue();
        long intervalTimes = currentTimes-lastUpdateTimes;
        lastUpdateTimes = currentTimes;

        updateValue(now,intervalTimes);

//        Duration duration = Duration.between(startTime,now);
//        long seconds = duration.getSeconds();
//        BigDecimal addend = BigDecimal.valueOf(seconds).multiply(BigDecimal.valueOf(0.01));
//        rate = BigDecimal.ONE.add(addend);
    }

    private boolean needChangeToSettle(LocalDateTime now) {
        return RandomUtils.nextInt(1000) < 100;
    }

    private void changeToStartStatus(LocalDateTime now) {
        if (needChangeToStart(now)) {
            startReset();


            //新一天，重置期号
            if (isNewDay(now)) {
                issueCount = 1;
            }

            this.issue = String.format("%s%02d%02d%04d",now.getYear(),now.getMonthValue(),now.getDayOfMonth(),issueCount);
            startTime = now;
            status = CrashStatus.Start_VALUE;

//            value = BigDecimal.ONE;

            //重置用户押注金额
            userMap.values().forEach(CrashUser::reset);


            //发送开始通知
            sendCrashStartNotify();
        }
    }

    private void startReset() {
//        private BigDecimal speed = BigDecimal.valueOf(0.02);
//        private BigDecimal speedScale = BigDecimal.valueOf(0.02);
//        private BigDecimal accSpeed = BigDecimal.valueOf(0.0005);
//        private BigDecimal accScale = BigDecimal.valueOf(0.0001);
//        @Getter
//        private BigDecimal value = BigDecimal.ONE;


        speed = BigDecimal.valueOf(0.02);
        speedScale = BigDecimal.valueOf(0.02);
        accSpeed = BigDecimal.valueOf(0.0005);
        accScale = BigDecimal.valueOf(0.0001);
        value = BigDecimal.ONE;
        time = BigDecimal.valueOf(0);
    }

    private boolean isNewDay(LocalDateTime now) {
        int lastDay = lastStartDay.getDayOfMonth();
        int dayNow = now.getDayOfMonth();

        return lastDay != dayNow;
    }


    private boolean needChangeToStart(LocalDateTime now) {
        return now.isAfter(startTime.plusSeconds(settleInterval));
    }
    public Integer getNextStatusInterval(LocalDateTime now) {
        if (status == CrashStatus.Settle_VALUE) {
            return settleInterval - (int)Duration.between(startTime,now).getSeconds();
        } else if (status == CrashStatus.Start_VALUE) {
            return startInterval - (int)Duration.between(startTime,now).getSeconds();
        } else {
            //游戏状态不知道啥时候停止
            return -1;
        }
    }

    public List<CrashHistory> historyList() {
        List<CrashHistory> historyList = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(historyIssueRate)) {
            historyIssueRate.forEach((issue,rate)->{
                historyList.add(CrashHistory.newBuilder()
                        .setIssue(issue)
                        .setRate(rate.setScale(2, RoundingMode.HALF_DOWN).toString())
                        .build());
            });
        }
        return historyList;
    }

    public List<CrashWinner> winnerList() {
        List<CrashWinner> winnerList = new ArrayList<>();
        if (CollectionUtils.isNotEmpty(userMap)) {
            userMap.forEach((k,v)->{
                winnerList.add(CrashWinner.newBuilder()
                        .setUid(v.getUid())
                        .setName(v.getAccount())
                        .setAmount(v.getBetAmount().toString())
                        .setCashRate(v.getCrashOutRate().toString())
                        .setProfit(v.getCrashOutRate().toString())
                        .build());
            });
        }
        return winnerList;
    }



    private void sendCrashEnterNotify(CrashUser user) {
        Msg notify = MsgUtils.buildMsgNotify(BcGameType.NotifyCrashEnterType_VALUE
                ,ServiceType.Slots_VALUE,user, CrashMsgUtils.buildCrashEnterNotify(user,this,LocalDateTime.now()));
        userManager.sendMsg(user,notify);
    }

    private void sendCrashBetRes(CrashUser user) {
        Msg notify = MsgUtils.buildMsgRes(BcGameType.ResCrashBetType_VALUE
                ,ServiceType.Slots_VALUE,user, CrashMsgUtils.buildCrashBetRes(user,this,LocalDateTime.now()));
        userManager.sendMsg(user,notify);
    }

    private void sendCrashOutRes(CrashUser user) {
        Msg notify = MsgUtils.buildMsgRes(BcGameType.ResCrashCashOutType_VALUE
                ,ServiceType.Slots_VALUE,user, CrashMsgUtils.buildCrashCashOutRes(user,this,LocalDateTime.now()));
        userManager.sendMsg(user,notify);
    }


    private void sendCrashStartNotify() {
        Msg startNtf = MsgUtils.buildMsgNotify(BcGameType.NotifyCrashStartType_VALUE
                ,ServiceType.Slots_VALUE,String.format("%s_%s_%s",merchant,ServiceType.Slots_VALUE,gameCode())
                , CrashMsgUtils.buildCrashStartNotify(this,LocalDateTime.now()));
        userManager.broadcast(startNtf);
    }


    private void sendCrashGamingNotify() {
        Msg startNtf = MsgUtils.buildMsgNotify(BcGameType.NotifyCrashGamingType_VALUE
                ,ServiceType.Slots_VALUE,String.format("%s_%s_%s",merchant,ServiceType.Slots_VALUE,gameCode())
                , CrashMsgUtils.buildCrashGamingNotify(this,LocalDateTime.now()));
        userManager.broadcast(startNtf);
    }

    private void sendCrashFinishNotify() {
        Msg finishNtf = MsgUtils.buildMsgNotify(BcGameType.NotifyCrashFinishType_VALUE
                ,ServiceType.Slots_VALUE,String.format("%s_%s_%s",merchant,ServiceType.Slots_VALUE,gameCode())
                , CrashMsgUtils.buildCrashFinishNotify(this,LocalDateTime.now()));
        userManager.broadcast(finishNtf);
    }

    private void sendCrashUpdateNotify() {
        Msg updateNtf = MsgUtils.buildMsgNotify(BcGameType.NotifyCrashUpdateType_VALUE
                ,ServiceType.Slots_VALUE,String.format("%s_%s_%s",merchant,ServiceType.Slots_VALUE,gameCode())
                , CrashMsgUtils.buildCrashUpdateNotify(this,LocalDateTime.now()));
        userManager.broadcast(updateNtf);
    }
}
