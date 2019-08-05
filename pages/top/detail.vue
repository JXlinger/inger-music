<template>
	<view class="top_detail">
		<!-- <song-detail :src="current.src" :autoplay="true" v-if="songDetailShow"></song-detail> -->
		<loading v-if="loading"></loading>
		 
		<view class="top_info_pic">
			<image :src="topDetail.topinfo.pic_v12" mode="widthFix"></image>
		</view>
		<view class="top_info_text">
			<text>{{ topDetail.topinfo.ListName }}</text>
			<text>{{ topDetail.topinfo.ListName }} 第{{ topDetail.day_of_year == '' ? period  : topDetail.day_of_year }}{{ topDetail.day_of_year == '' ? '周' : '天' }}</text>
			<text>更新时间：{{ topDetail.update_time }}</text>
		</view>
		<view class="player_btn" @tap="playFirst(firstUrl.songmid,firstUrl.songname,firstUrl.songid)">
			<view class="arrow"></view>
		</view>
		<view class="top_list">
			<text>排行榜  共{{ topDetail.total_song_num }}首</text>
			<view class="list_item" v-for="(item,index) in topDetail.songlist" :key="index">
				<view @tap="toSongpage(item.data.songmid,item.data.songname,item.data.songid)">
					<view class="songname"><text :class="index > 2 ? '' : 'redname'">{{ index + 1 }}</text><text>{{ item.data.songname }}</text></view>
					<view class="singername clearfix">
						<view></view>
						<text>{{ item.in_count }}</text>
						<text>
							<text v-for="(singer,index) in item.data.singer" :key="index">{{ singer.name }}</text>{{ item.data.albumdesc == '' ? '' : '·' }}{{ item.data.albumdesc }}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="toplist_info">
			<view>榜单简介</view>
			<rich-text class="rich_info" :nodes="topDetail.topinfo.info"></rich-text>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				topDetail: {},
				period: '',
				loading: false,
				songDetailShow: false,
				firstUrl: ''
			}
		},
		onLoad(option) {
			this.getListDetail(option);
		},
		methods: {
			playFirst(id,name,songid){
				uni.navigateTo({
					url: '../song/index?songmid=' + id + '&songname=' + name + '&songid=' +songid
				});
			},
			toSongpage(id,name,songid){
				uni.navigateTo({
					url: '../song/index?songmid=' + id + '&songname=' + name + '&songid=' +songid
				});
				//this.songDetailShow = true;
				var _self = this;
			},
			getListDetail(option) {
				var _self = this;
				_self.loading = true;
				var id = option.Top100_id;
				uni.request({
					url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
					data: {
						g_tk: 1760095680,
						uin: 599526934,
						format: 'json',
						inCharset: 'utf-8',
						outCharset: 'utf-8',
						notice: 0,
						platform: 'h5',
						needNewCode: 1,
						tpl: 3,
						page: 'detail',
						type: 'top',
						topid: id,
						_: 1550133338328
					},
					success(res) {
						uni.setNavigationBarTitle({
							title: res.data.topinfo.ListName
						});
						_self.loading = false;
						//console.log(res.data.songlist);
						_self.topDetail = res.data;
						
						_self.firstUrl = res.data.songlist[0].data;
						console.log(_self.firstUrl)
						_self.period = res.data.date.slice(5);
					}     
				})
			}
		},
	}
</script>

<style>
</style>
