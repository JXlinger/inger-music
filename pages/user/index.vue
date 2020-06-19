<template>
	<view class="user">
		<view class="nologin_wrap" v-if="loginHide">
			<view class="nologin">
				<text>你还未登录，请点击登录</text>
				<button plain="true" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
			</view>
		</view>
		<view class="user_info">
			<view class="user_head clearfix">
				<image src="userInfo.avatarUrl" mode="widthFix"></image>
				<view class="user_name">{{ userInfo.nickName }}昵称</view>
			</view>
			<view class="user_city" @tap="choseLocation">我的位置:{{ city }}<view></view></view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				userInfo: {},
				loginHide: true,
				city: ''
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'menu') {
				console.log(res.target);
			}
			return {
				title: 'inger,音乐',
				path: '/pages/index/index',
				success: function() {
					uni.showToast({
						icon: 'success',
						title: '分享成功',
						duration: 2000
					})
				}
			};
		},
		onLoad() {
			var that = this;
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success: function (res) {
			// 		console.log(res.city);
			// 		that.city = res.city;
			// 	}
			// });
			// 
			// uni.checkSession({
			// 	success(infoRes) {
			// 		console.log(infoRes)
			// 		if(infoRes){
			// 			that.loginHide = false;
			// 		}else{
			// 			
			// 		}
			// 	}
			// });
			// this.getUserInfo()
		},
		methods:{
			choseLocation(){
				var that = this;
				uni.chooseLocation({
					success: function (res) {
						that.city = res.name
					}
				});
			},
			getUserInfo(){
				var that = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function (infoRes) {
						uni.showToast({
							title: '登录成功',
							duration: 2000
						});
						that.loginHide = false;
						that.userInfo = infoRes.userInfo;
						//console.log(infoRes)
					},
					fail: function () {
						uni.showToast({
							title: '登录失败',
							duration: 2000
						});
					}
				});
			}
		}
	}
</script>

<style>
</style>
