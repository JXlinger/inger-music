<script>
export default {
	onLaunch: function() {
		uni.showShareMenu({
			title: 'inger音乐',
			content: 'inger，美好音乐',
			path: '/pages/index/index'
		})
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
	}
};
</script>

<style lang="less">
/*每个页面公共css */
@import './less/style';
</style>
