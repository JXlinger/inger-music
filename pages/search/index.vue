<template>
	<view class="search_wrap">
		<view class="search">
			<form class="search_form" @submit="searchSubmit">
				<input @confirm="autoSearch" name="input" type="text" focus="true" confirm-type="search" placeholder="歌名/歌手/专辑" v-model="searchContent" />
			</form>
		</view>
		<view class="hot_search clearfix" v-if="showHotlist">
			<text>{{ hotSearch.special_key }}</text>
			<template v-for="(item,index) of hotSearch.hotkey">
				<text :key="index" @tap="hotlistSearch(item.k)">{{ item.k }}</text>
			</template>
		</view>
		<view class="search_content">
			<template v-for="(item,index) in searchResult.song.list">
				<view class="songlist" @tap="toSongpage(item.songmid,item.songname,item.songid)" :key="index">
					<view class="ablum_cover">
						<image :src="item.albummid ? ('http://y.gtimg.cn/music/photo_new/T002R150x150M000' + item.albummid + '.jpg?max_age=2592000') : 'https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png'" mode="widthFix"></image>
					</view>
					<view class="songname"><text>{{ item.songname }}</text></view>
					<view class="singername clearfix">
						<text v-for="(singer,index) in item.singer" :key="index">{{ singer.name }}</text><text>{{ item.albumname =='' ? '' : '·' }}  {{ item.albumname }}</text>
					</view>
					<view :style="{ 'display': block}" class="mv" @tap="toVideoPage">
						<view></view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				searchResult: {},
				hotSearch: {},
				searchContent: '',
				showHotlist: true,
				ablumCover: ''
			}
		},
		onLoad() {
			var that = this;
			uni.request({
				url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
				method: 'GET',
				data: {
					g_tk: 5381,
					uin: 599526934,
					format: 'json',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'yqq.json',
					needNewCode: 1,
					_: 1513317614040
				},
				success(res) {
					that.hotSearch = res.data.data
				},
				fail(err) {
					console.error(err + '请求失败')
				}
			});
		},
		methods: {
			autoSearch(){
				this.searchSubmit();
			},
			hotlistSearch(k){
				this.searchContent = k;
				return this.getSearchResult()
			},
			searchSubmit(){
				if(this.searchContent === ''){
					return uni.showToast({
						title: '请输入内容',
						duration: 1000,
						icon: 'none'
					});
				}else{
					uni.showToast({
						title: '加载中',
						duration: 500,
						icon: 'loading'
					});
					this.getSearchResult()
				}
				
			},
			getSearchResult(){
				var _self = this;
				uni.request({
					url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
					method: 'GET',
					data: {
						g_tk: 5381,
						p: 1,
						n: 20,
						w: this.searchContent,
						format: 'json',
						loginUin: 599526934,
						hostUin: 0,
						inCharset: 'utf8',
						outCharset: 'utf-8',
						notice: 0,
						platform: 'yqq.json',
						needNewCode: 0,
						remoteplace: 'txt.yqq.song',
						t: 0,
						aggr: 1,
						cr: 1,
						catZhida: 1,
						flag_qc: 0,
					},
					success(res) {
						//console.log(res.data.data.song.list.albummid)
						_self.searchResult = res.data.data;
						_self.showHotlist = false;
					},
					fail(err) {
						console.error(err + '请求失败');
						uni.showToast({
							title: '搜索失败',
							duration: 500,
							icon: 'none'
						});
					}
				})
			},
			toSongpage(id,name,songid){
				uni.navigateTo({
					url: '../song/index?songmid=' + id + '&songname=' + name + '&songid=' +songid
				});
				//this.songDetailShow = true;
				var _self = this;
			}
		}
	}
</script>

<style lang="less">
</style>
