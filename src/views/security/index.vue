<template>
  <div class="securit-view p-16px">
    <p class="text-text-3 mt-0">
      <svg class="h-10px w-10px fill-text-6 rotate-180 cursor-pointer" @click="$router.go(-1)">
        <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Arrow"></use>
      </svg>
      <span class="text-text-3 text-15px px-8px font-800">
        {{ $t("security") }}
      </span>
    </p>
    <div class="account-info__item bg-fog-18 p-12px rounded-8px">
      <p
        class="item-title text-14px text-text-3 m-0 pb-12px bc-border-bottom font-700"
      >
        {{ $t("setup") }}
      </p>
      <div class="item-content pt-12px">
        <!-- 更新密码 -->
        <div class="text-12px text-text-3">{{ $t("change") }}</div>
        <van-button
          class="bc-btn mt-6px"
          block
          @click="$router.push({ name: 'set-password' })"
        >
          <svg class="fill-text-3 h-12px w-12px">
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Edit"></use>
          </svg>
          {{ $t("btn_text") }}
        </van-button>
        <!-- dy_au 隐藏了在4月1号 -->
        <!-- <div class="text-12px text-text-3 mt-10px">
          {{ $t("two") }}
        </div>
        <div class="text-text-4 text-12px mt-4px">
          {{ $t("desc") }}
        </div>
        <van-button
          class="bc-btn mt-6px"
          block
          @click="$router.push('/phone-validate')"
        >
          {{ $t("btn_text_2") }}
        </van-button> -->

        <!-- 更新钱包密码 -->
        <div class="text-12px text-text-3 mt-10px">{{ $t("wallet-change") }}</div>
        <van-button
          class="bc-btn mt-6px"
          block
          @click="$router.push({ name: 'wallet-password' })"
        >
          <svg class="fill-text-3 h-12px w-12px">
            <use xlink:href="@/assets/symbol-defs.ef6a79c4.svg#icon_Edit"></use>
          </svg>
          {{ $t("btn_text") }}
        </van-button>
      </div>
    </div>
    <div class="account-info__item bg-fog-18 p-12px rounded-8px mt-12px">
      <p class="item-title text-14px text-text-3 m-0 pb-12px  font-700">
        {{ $t("sessions") }}
      </p>
      <div class="flex justify-between bg-fog-45 px-6px py-8px">
        <span class="text-10px text-text-3"> {{ $t("device") }}</span>
        <span class="text-10px text-text-3">{{ $t("action") }}</span>
      </div>
      <div>
        <div class="flex justify-between items-center p-10px bc-border-bottom">
          <div>
            <div>
              <img
                class="h-12px"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAlCAYAAAAqXEs9AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUMSURBVHgB7VdPixxFFH/vVffMyrpLViF4kibuB1CQ4HEiBDyuB4WAqEtA8BT2E+zuQUUEdwXF697iIWA8iAcvk28Q8AM4FwXjwQE3q5tMV+W9V1Xd1T3dO5Nsjvugp6qrXtX71e/9qR6AC7mQ8wmeNfnBV6ORpbIAMGBIRvSH3+pfaSl2G/PSMXU/9DLKJt9+emcMTwPoxpejLTT2ABELZBVuVVXa+O77BEgYNkrHE/3WmqA5MWj2Dz/54WghoA8P3t511u0hEcyD4V4Yh6oPHlgDDPh1KDOkVuZAqa7b+frm7cNeQB8fvFMAlr9XixzB7ISXzbDSbhis3up3qFRTPT8yXDGQr2SQD02YI8gB3/h8++h+xJClgNjlu4i5bmZnAMd/MBgLPeLC0zuJSatj/3I/GxBcLtZh5YVBBHuLn+24kNJdMjMYGcoYWAYnD0jAOJHESJdh36n19PBJ21g3e2TdP3+ecJJwMqAkSzZqYEhfWKmI1Jenp3q6cIquE6tBAYJBoFuw3f53/MgRZRjisugHxMzUgXxaGevYtLbm5x0sKCHtZcJQbasHENcISO33H1rFJSCx9Z7qdG4ioSFCZwEyJk/yZuHmbUNLAYlCEkMdKnMMtfZON+4w4Nw8EDlyg6x2MuhgdFl726yNusuvDXvyowoMJtQlN18CeNCrqG5HfnKlhrRudQKKDEnBqjaukWB1YN96WGDVfNTVYHKpXsAnCQL1SUnjNTXRASgyBNigOpZtp0N6c1gnGetU1XmGuIOq4XRCC6qrGcQmS470EkwhdgAyZAIR6WGdi/ejjlB8d3zLi0XxIChXoqyBahW4c5aZ5otRSNR08qC0hIot6STe6GIo83RgwBKrnbAjx5Z7kpw+IE/mx9V1rEPcVXdZIZGHLZf6MgSu9QEFYVcSILgghtLId/E3Xs6k7HBFY2CZHNH6fgBH6qdAVMmWSqZuJm4h9azyaEOoOafXBuCCtNfID94KbvLOJ/EFb5IxD5l1pKDYDznHktBCri6NVgzzoscC0YKPNXbkzOccu09DjojqT4h+l8XPghjU4g7nXSbxYgJDeekw57mMqQjjCly4EHeVqAHPvg0BLTq+EX8pl0jtItwBCM2UsVwS1Ktrq/jw4bHakLXMAoNiRjKmgJnCAYNiQNF9ngrepAzfT6hhJYxoxjmnX5eaI2vr66gx5AFNGxigGUNj8a0wdWXzVUAfxOwrKwx5NthlmJeAOVsZsEuGFmjAKgMek2fIQHmcGLi4FcWtJkkE3nPztSviMg1sPsa9XoZ48htmdEtctvHSBlx960148PdfwoiAAu8mbgWIsMTAhCF/WDamtYdjo+SBGaf1Y5IHYx9miJdffgXWXlz37pXPHCj3mhha8t3Pn+0xQ7uhCEaW9E+DnjTzMUOhxaBTXSM2xJHUoNI/bkaa/qhzFIqmunh/+/qtswGJfP/LF/KR/xEbKpJ0ZzCggJSlCDCAqso6x4oAcgoGFQwEQFqTfI2a2tLt37y+c9i23XeLCqjCGDNig4Uw9dv/v+4CBjaq4gixwtQ1JRRGiNdHYGwVN+5vDq/+xAxNePTu9rWdaZfdXkCpjO7AFm/+I5xPpvfeh41FSgTLSAmvw/nl0uh28/u5S5YDhDCB5yDjG4v3WQ5QDnehVcCeQY6WUVoK0PhdmHKwXePuBJ5BON7H/P9zZyldeArRGDAw4kwqll5EMB6/B2O4kOckTwCWZd/eqV6QWQAAAABJRU5ErkJggg=="
              />
              <span class="text-12px text-text-3">
                Mac OS X (iPhone) (Mobile Safari)
              </span>
            </div>
            <div class="text-10px text-text-16">
              JP | 103.151.173.97
            </div>
            <div class="text-10px text-text-16">
              Online
            </div>
          </div>
          <div class="text-12px text-text-16">
            In Use
          </div>
        </div>
        <div class="flex justify-between items-center p-10px bc-border-bottom">
          <div>
            <div>
              <img
                class="h-12px"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAlCAYAAAAqXEs9AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUMSURBVHgB7VdPixxFFH/vVffMyrpLViF4kibuB1CQ4HEiBDyuB4WAqEtA8BT2E+zuQUUEdwXF697iIWA8iAcvk28Q8AM4FwXjwQE3q5tMV+W9V1Xd1T3dO5Nsjvugp6qrXtX71e/9qR6AC7mQ8wmeNfnBV6ORpbIAMGBIRvSH3+pfaSl2G/PSMXU/9DLKJt9+emcMTwPoxpejLTT2ABELZBVuVVXa+O77BEgYNkrHE/3WmqA5MWj2Dz/54WghoA8P3t511u0hEcyD4V4Yh6oPHlgDDPh1KDOkVuZAqa7b+frm7cNeQB8fvFMAlr9XixzB7ISXzbDSbhis3up3qFRTPT8yXDGQr2SQD02YI8gB3/h8++h+xJClgNjlu4i5bmZnAMd/MBgLPeLC0zuJSatj/3I/GxBcLtZh5YVBBHuLn+24kNJdMjMYGcoYWAYnD0jAOJHESJdh36n19PBJ21g3e2TdP3+ecJJwMqAkSzZqYEhfWKmI1Jenp3q6cIquE6tBAYJBoFuw3f53/MgRZRjisugHxMzUgXxaGevYtLbm5x0sKCHtZcJQbasHENcISO33H1rFJSCx9Z7qdG4ioSFCZwEyJk/yZuHmbUNLAYlCEkMdKnMMtfZON+4w4Nw8EDlyg6x2MuhgdFl726yNusuvDXvyowoMJtQlN18CeNCrqG5HfnKlhrRudQKKDEnBqjaukWB1YN96WGDVfNTVYHKpXsAnCQL1SUnjNTXRASgyBNigOpZtp0N6c1gnGetU1XmGuIOq4XRCC6qrGcQmS470EkwhdgAyZAIR6WGdi/ejjlB8d3zLi0XxIChXoqyBahW4c5aZ5otRSNR08qC0hIot6STe6GIo83RgwBKrnbAjx5Z7kpw+IE/mx9V1rEPcVXdZIZGHLZf6MgSu9QEFYVcSILgghtLId/E3Xs6k7HBFY2CZHNH6fgBH6qdAVMmWSqZuJm4h9azyaEOoOafXBuCCtNfID94KbvLOJ/EFb5IxD5l1pKDYDznHktBCri6NVgzzoscC0YKPNXbkzOccu09DjojqT4h+l8XPghjU4g7nXSbxYgJDeekw57mMqQjjCly4EHeVqAHPvg0BLTq+EX8pl0jtItwBCM2UsVwS1Ktrq/jw4bHakLXMAoNiRjKmgJnCAYNiQNF9ngrepAzfT6hhJYxoxjmnX5eaI2vr66gx5AFNGxigGUNj8a0wdWXzVUAfxOwrKwx5NthlmJeAOVsZsEuGFmjAKgMek2fIQHmcGLi4FcWtJkkE3nPztSviMg1sPsa9XoZ48htmdEtctvHSBlx960148PdfwoiAAu8mbgWIsMTAhCF/WDamtYdjo+SBGaf1Y5IHYx9miJdffgXWXlz37pXPHCj3mhha8t3Pn+0xQ7uhCEaW9E+DnjTzMUOhxaBTXSM2xJHUoNI/bkaa/qhzFIqmunh/+/qtswGJfP/LF/KR/xEbKpJ0ZzCggJSlCDCAqso6x4oAcgoGFQwEQFqTfI2a2tLt37y+c9i23XeLCqjCGDNig4Uw9dv/v+4CBjaq4gixwtQ1JRRGiNdHYGwVN+5vDq/+xAxNePTu9rWdaZfdXkCpjO7AFm/+I5xPpvfeh41FSgTLSAmvw/nl0uh28/u5S5YDhDCB5yDjG4v3WQ5QDnehVcCeQY6WUVoK0PhdmHKwXePuBJ5BON7H/P9zZyldeArRGDAw4kwqll5EMB6/B2O4kOckTwCWZd/eqV6QWQAAAABJRU5ErkJggg=="
              />
              <span class="text-12px text-text-3">
                Mac OS X (iPhone) (Mobile Safari)
              </span>
            </div>
            <div class="text-10px text-text-16 mt-4px">
              JP | 103.151.173.97
            </div>
            <div class="text-10px text-text-16 mt-4px">
              {{ $t("online") }}
            </div>
          </div>
          <div class="text-12px text-text-16" v-if="false">
            {{ $t("in_use") }}
          </div>
          <div class="text-12px text-text-17" v-if="true">
            {{ $t("remove") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const $t = key => {
  return t("security." + key);
};
</script>

<style></style>
