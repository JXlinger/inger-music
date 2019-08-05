<template>
	<view class="songlist">
		
	</view>
</template>

<script>
	export default{
		
		onLoad() {
			uni.request({
				url: 'https://c.y.qq.com/v8/fcg-bin/album_library?g_tk=1278911659&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cmd=firstpage&page=1&pagesize=20&sort=1&language=-1&genre=0&year=1&pay=0&type=-1&company=-1',
				method: 'GET',
				success(res) {
					console.log(res);
				}
			})
		}
	}
</script>

<style>
</style>
