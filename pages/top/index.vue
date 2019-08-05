<template>
	<view class="top">
		<search></search>
		<view v-for="(item, index) in topList" :key="index">
			<view @tap="toDetails(item.id)" class="top_item clearfix">
				<view class="top_pic"><image :src="item.picUrl" mode="widthFix"></image></view>
				<view class="top_music">
					<view class="top_name">{{ item.topTitle }}</view>
					<view class="music_name" v-for="(name, index) in item.songList" :key="index">
						<view>
							<text>{{ index + 1 }}</text>
							{{ name.songname }}--{{ name.singername }}
						</view>
					</view>
					<view class="arrow_ico"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			topList: {}
		};
	},
	onLoad() {
		this.getTopList();
	},
	methods: {
		getTopList() {
			var _self = this;
			uni.request({
				url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
				data: {
					g_tk: 859095654,
					uin: 599526934,
					format: 'json',
					inCharset: 'utf-8',
					outCharset: 'utf-8',
					notice: 0,
					platform: 'h5',
					needNewCode: 1,
					_: 1550211734922
				},
				success(res) {
					//console.log(res.data.data.topList)
					_self.topList = res.data.data.topList;
				}
			});
		},
		toDetails(id) {
			uni.navigateTo({
				url: 'detail?Top100_id=' + id
			});
		}
	},
	onPullDownRefresh() {
		var _self = this;
		_self.getTopList();
		setTimeout(function () {
			uni.stopPullDownRefresh({
				success() {
					uni.showToast({
						title: '刷新成功',
						duration: 2000
					});
				}
			});
		}, 1000);
	}
};
</script>

<style></style>
