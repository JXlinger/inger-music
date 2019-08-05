<template>
	<view class="index">
		<search></search>
		<swiper class="swiper" indicator-dots="true" indicator-color="rgba(0,0,0,.3)" indicator-active-color="rgba(26, 173, 25)"
		 autoplay="true" interval="3000" circular="true">
			<swiper-item v-for="(banner,index) in bannerList" :key="index">
				<image :src="banner.picUrl" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="radio_title">电台</view>
		<view class="radiolist">
			<view class="radio_item" v-for="(radio,index) in radioList" :key="index">
				<image :src="radio.picUrl" mode="widthFix"></image>
				<text>{{ radio.Ftitle }}</text>
			</view>
		</view>
		<view class="radio_title">热门歌单推荐</view>
		<view class="hot_v">
			<template v-for="(item,index) in recommHotList">
				<view @tap="toSonglist(item.id)" :key="index" class="hot_v_item">
					<view class="hot_cover">
						<image :src="item.cover" mode="widthFix"></image>
					</view>
					<view class="hot_username">
						<text>{{ item.title }}</text>
						<text>{{ item.username }}</text>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: {},
				radioList: {},
				topList: {},
				recommHotList: {}
			}
		},
		onLoad() {
			var _self = this;
			uni.request({
				url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
				data: {
					g_tk: 1191629287,
					uin: 599526934,
					format: 'json',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'h5',
					needNewCode: 1,
					_: 1550124593938
				},
				success(res) {
					//console.log(res.data.data);
					_self.bannerList = res.data.data.slider;
					_self.radioList = res.data.data.radioList;

				}
			});
			uni.request({ //推荐歌单
				url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?callback=&g_tk=1278911659&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8¬ice=0&platform=yqq&needNewCode=0&data={"comm":{"ct":24},"category":{"method":"get_hot_category","param":{"qq":""},"module":"music.web_category_svr"},"recomPlaylist":{"method":"get_hot_recommend","param":{"async":1,"cmd":2},"module":"playlist.HotRecommendServer"},"playlist":{"method":"get_playlist_by_category","param":{"id":8,"curPage":1,"size":40,"order":5,"titleid":8},"module":"playlist.PlayListPlazaServer"},"new_song":{"module":"QQMusic.MusichallServer","method":"GetNewSong","param":{"type":0}},"new_album":{"module":"QQMusic.MusichallServer","method":"GetNewAlbum","param":{"type":0,"category":"-1","genre":0,"year":1,"company":-1,"sort":1,"start":0,"end":39}},"toplist":{"module":"music.web_toplist_svr","method":"get_toplist_index","param":{}},"focus":{"module":"QQMusic.MusichallServer","method":"GetFocus","param":{}}}',
				method: 'GET',
				data: {
					g_tk: 1278911659,
					loginUin: 0,
					hostUin: 0,
					format: 'json',
					inCharset: 'utf8',
					outCharset: 'utf- 8¬ ice = 0',
					platform: 'yqq.json',
					needNewCode: 0,
					data: {
						"comm": {
							"ct": 24
						},
						"category": {
							"method": "get_hot_category",
							"param": {
								"qq": ""
							},
							"module": "music.web_category_svr"
						},
						"recomPlaylist": {
							"method": "get_hot_recommend",
							"param": {
								"async": 1,
								"cmd": 2
							},
							"module": "playlist.HotRecommendServer"
						},
						"playlist": {
							"method": "get_playlist_by_category",
							"param": {
								"id": 8,
								"curPage": 1,
								"size": 40,
								"order": 5,
								"titleid": 8
							},
							"module": "playlist.PlayListPlazaServer"
						},
						"new_song": {
							"module": "QQMusic.MusichallServer",
							"method": "GetNewSong",
							"param": {
								"type": 0
							}
						},
						"new_album": {
							"module": "QQMusic.MusichallServer",
							"method": "GetNewAlbum",
							"param": {
								"type": 0,
								"category": "-1",
								"genre": 0,
								"year": 1,
								"company": -1,
								"sort": 1,
								"start": 0,
								"end": 39
							}
						},
						"toplist": {
							"module": "music.web_toplist_svr",
							"method": "get_toplist_index",
							"param": {}
						},
						"focus": {
							"module": "QQMusic.MusichallServer",
							"method": "GetFocus",
							"param": {}
						}
					}
				},
				success(res) {
					//console.log(res.data.recomPlaylist.data);
					_self.recommHotList = res.data.recomPlaylist.data.v_hot;
					//console.log(_self.recommHotList);
				}
			});
		},
		methods: {
			toSonglist(id){
				// uni.navigateTo({
				// 	url: '../songlist/index?songlistid=' + id
				// })
				uni.showToast({
					icon: 'loading',
					title: '功能开发中',
					duration: 1000
				})
			}
		},
		onPullDownRefresh() {
			setTimeout(function () {
				uni.stopPullDownRefresh({
					success() {
						uni.showToast({
							title: '刷新成功',
							duration: 1000
						});
					}
				});
			}, 1000);
		}
	}
</script>

<style>

</style>
