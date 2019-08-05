<script>
export default {
	onLaunch: function() {
		
	},
	onShow() {
		uni.getUserInfo({
			provider: 'weixin',
			success: function(infoRes) {
				console.log('用户昵称为：' + infoRes.userInfo.nickName);
			},
			fail: function() {
				console.log('获取失败');
			}
		});
	},
	onShareAppMessage(res) {
		if (res.from === 'menu') {
			console.log(res.target);
		}
		return {
			title: '自定义分享标题',
			path: '/pages/index/index',
			success: function() {
				uni.showShareMenu({
					title: '分享',
					content: '分享出去',
					success() {
						uni.showToast({
							title: '分享成功',
							duration: 2000
						});
					}
				});
			}
		};
	}
};
</script>

<style lang="less">
/*每个页面公共css */
@import './less/style';
</style>
