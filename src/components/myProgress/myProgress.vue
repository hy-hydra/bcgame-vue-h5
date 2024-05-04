<template>
	<view class="charts-box">
		<view class="progress_box" v-for="(item, index) in progressList" :key="index">
			<view class="box_name" v-if="item.name != '其他'"> </view>
			<!-- show-info -->
			<view class="box_length" v-if="item.name != '其他'">
				<progress :percent="item.valueData" stroke-width="6" :active="true" border-radius="3" font-size="14" activeColor="#509CFF" backgroundColor="#E9F3FD" />
			</view>
             
			<view class="box_percentage" v-if="item.name != '其他'">{{ item.value }}({{ item.percentage }})</view>
            <div>{{ item.name }}</div>
        </view>
        
	</view>
     
</template>
 
<script>
export default {
	props: {
		proList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			totalNum: 0
		};
	},
	computed: {
		progressList() {
			let totalNum = 0;
			let progressLists = [];
			progressLists = JSON.parse(JSON.stringify(this.proList));
			progressLists.forEach(item => {
				totalNum += item.value;
			});
			progressLists.forEach(item => {
				item.valueData = (item.value / totalNum) * 100;
				item.percentage = this.toPercent(item.value / totalNum);
			});
			return progressLists;
		}
	},
	onReady() {},
	methods: {
		// 百分比
		toPercent(point) {
			var percent = Number(point * 100).toFixed(1);
			percent += '%';
			return percent;
		}
	}
};
</script>
 
<style scoped lang="less">
.charts-box {
	width: 100%;
	// height: 600rpx;
	position: relative;
	.progress_box {
		display: flex;
		align-items: center;
		height: 50rpx;
		margin: 0rpx 0rpx 50rpx;
		.box_name {
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			color: #999999;
			width: 168rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.box_length {
			flex: 1;
		}
		.box_percentage {
			font-size: 28rpx;
			font-family: DINAlternate-Bold, DINAlternate;
			font-weight: bold;
			color: #509cff;
			margin-left: 20rpx;
		}
	}
	.progress_box:first-child {
		margin: 100rpx 0rpx 50rpx;
	}
	.uni-icon {
		line-height: 1.5;
	}
}
</style>