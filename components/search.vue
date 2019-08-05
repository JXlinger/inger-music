<template>
	<view class="search" @tap="toSearch">
		<view>歌名/歌手/专辑</view>
	</view>
</template>

<script>
	export default{
		onLoad() {
			this.toSearch()
		},
		methods:{
			toSearch(){
				uni.navigateTo({
					url: '/pages/search/index'
				})
			}
		}
	}
</script>

<style lang="less">
	.search{
		padding: 20upx;
		background: #f5f5f5;
		>view{
			background: #ffffff;
			border: 1px solid #f9f9f9;
			border-radius: 9px;
			font-size: 30upx;
			text-indent: 20upx;
			padding: 15upx 0;
			color: #22d59c;
		}
	}
</style>
