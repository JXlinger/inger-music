<template>
	<view class="song_detail" :style="{background: current.poster}">
		<view class="song_bag">
			<image :src="current.poster"></image>
		</view>
		
		<view class="songdetail_wrap">
			<view class="song_title">
				<view class="close_detail">
					<view></view>
				</view>
				<view class="song_info">
					<view class="song_name">{{ current.name }}</view>
					<view class="singer">-
						<template v-for="(singer,index) in current.author">
							<text :key="index">{{ singer.name }}</text>
						</template>
						-
					</view>
				</view>
			</view>
			<view class="coverimg" :style="{backgroundImg: current.poster}">
				<view class="coverimg_wrap">
					<image :src="current.poster" mode="widthFix"></image>
				</view>
				
			</view>
			<view class="progress_bar">
				<view class="progress_left">{{ currentTime }}</view>
				<slider class="audio-slider" :activeColor="color" block-size="16" :value="current" :max="duration" @changing="seek=true,current=$event.detail.value"
				 @change="change"></slider>
				<view class="progress_right">{{ durationTime }}</view>
			</view>
			<view class="song_lyric">
				<scroll-view scroll-top="50" scroll-y="true" class="scroll-Y">
					<view class="lyric_cont">这里是歌词位置</view>
					<view class="lyric_cont">由于还未完成</view>
                    <view class="lyric_cont curr_cont">暂时先占个位置</view>
					<view class="lyric_cont">明天继续做</view>
					<view class="lyric_cont">啦啦啦啦啦~~~</view>
					<view class="lyric_cont">德玛西亚~~~</view>
					<view class="lyric_cont">哈撒该</view>
                </scroll-view>
			</view>
			<view class="control_wrap">
				<view class="control_prev">MV</view>
				<view class="control_switch"><text>&#xe612;</text></view>
				<view class="control_next">&#xe601;</view>
			</view>
		</view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				current: {
					poster: '',
					name: '',
					author: '暂无',
					src: '',
				},
				mvid: ''
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
		onLoad(option) {
			var mvid = this.mvid
			this.getSongsongId(option);
			//this.getSongInfo(option)
			var that = this;
			uni.request({ //歌曲信息
				url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI17055661341822592',
				method: 'GET',
				data: {
					g_tk: 1331728248,
					loginUin: 156696747,
					hostUin: 0,
					format: 'json',
					inCharset: 'utf8',
					outCharset: 'utf - 8',
					notice: 0,
					platform: 'yqq.json',
					needNewCode: 0,
					data: {
						"comm": {
							"ct": 24,
							"cv": 0
						},
						"songinfo": {
							"method": "get_song_detail_yqq",
							"param": {
								"song_type": 0,
								"song_mid": option.songmid,
								"song_id": option.songid
							},
							"module": "music.pf_song_detail_svr"
						}
					}
				},
				success(res) {
					//console.log(res.data)
					//console.log(res.data.songinfo.data.track_info)
					that.mvid = res.data.songinfo.data.track_info.mid;
					//console.log(that.mvid)
					that.current.name = res.data.songinfo.data.track_info.title;
					that.current.author = res.data.songinfo.data.track_info.singer;
					that.current.poster = 'http://y.gtimg.cn/music/photo_new/T002R150x150M000' + res.data.songinfo.data.track_info.album.mid + '.jpg?max_age=2592000'
					//console.log(that.current)
				}
			});
			uni.request({//获取歌词
				url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
				method: 'GET',
				data: {
                    g_tk: 1331728248,
                    inCharset: 'utf-8',
                    outCharset: 'utf-8',
                    notice: 0,
                    format: 'json',
                    songmid: option.songmid,
                    platform: 'yqq',
                    hostUin: 0,
                    needNewCode: 0,
                    categoryId: 10000000,
                    pcachetime: 1592556924250
				},
				success(res) {
					console.log(res);
				}
			})
		},
		methods: {
			getSongsongId(option) { //必须，获取歌曲串接地址方法
				//console.log(option);
				var songmid = option.songmid;
				var _self = this;
				uni.request({
					url: 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey6580271972893776',
					method: 'GET',
					data: {
						g_tk: 604300829,
						loginUin: 156696747,
						hostUin: 0,
						format: 'json',
						inCharset: 'utf8',
						outCharset: 'utf-8',
						notice: 0,
						platform: 'yqq.json',
						needNewCode: 0,
						data: {
							"req": {
								"module": "CDN.SrfCdnDispatchServer",
								"method": "GetCdnDispatch",
								"param": {
									"guid": "5892439010",
									"calltype": 0,
									"userip": ""
								}
							},
							"req_0": {
								"module": "vkey.GetVkeyServer",
								"method": "CgiGetVkey",
								"param": {
									"guid": "5892439010",
									"songmid": [songmid],
									"songtype": [0],
									"uin": "156696747",
									"loginflag": 1,
									"platform": "20"
								}
							},
							"comm": {
								"uin": 156696747,
								"format": "json",
								"ct": 24,
								"cv": 0
							}
						}
					},
					success(res) {
						//console.log(res)
						_self.current.src = res.data.req_0.data.sip + res.data.req_0.data.midurlinfo[0].purl;
						//console.log(_self.current.src);
						const bgAudioMannager = uni.getBackgroundAudioManager();
						bgAudioMannager.title = option.songname;
						bgAudioMannager.singer = '暂无';
						bgAudioMannager.coverImgUrl = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg';
						bgAudioMannager.src = _self.current.src;
					}
				})
			}
		}
	}
</script>

<style>
</style>
