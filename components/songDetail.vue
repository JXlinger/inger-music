<template>
	<view class="song_detail" :style="{ background: coverurl }">
		<view class="songdetail_wrap">
			<view class="song_title">
				<view class="close_detail"><view></view></view>
				<view class="song_info">
					<view class="song_name">{{ songname }}</view>
					<view class="singer">
						<template v-for="(singer,index) in singers">
							<text :key="index">{{ sing.singername }}</text>
						</template>
					</view>
				</view>
			</view>
		</view>
		<view class="coverimg">
			<image :src="coverurl"></image>
		</view>
		<view class="progress_bar">
			<view class="progress_left">{{ currentTime }}</view>
			<slider class="audio-slider" :activeColor="color" block-size="16" :value="current" :max="duration" @changing="seek=true,current=$event.detail.value"
			 @change="change"></slider>
			<view class="progress_right">{{ durationTime }}</view>
		</view>
		<view class="control_wrap">
			<view class="control_prev">&#xe601;</view>
			<view class="control_switch">&#xe612;</view>
			<view class="control_next">&#xe601;</view>
		</view>
	</view>
</template>

<script>
	const audio = uni.getBackgroundAudioManager(); //创建音频
	export default {
		data() {
			return {
				currentTime: '', //当前播放时间
				durationTime: '', //总时长
				current: '', //slider当前进度
				loading: false, //是否处于读取状态
				paused: true, //是否处于暂停状态
				seek: false //是否处于拖动状态
			}
		},
		props: {
			coverurl: '',
			singers: '',
			songname: '',
			src: String, //音频链接
			autoplay: Boolean, //是否自动播放
			duration: Number, //总时长（单位：s）
			control: {
				type:Boolean,
				default:true
			}, //是否需要上一曲/下一曲按钮
			continue:Boolean,//播放完成后是否继续播放下一首，需定义@next事件
			color: {
				type:String,
				default:'#169af3'
			} //主色调
		},
	}
</script>

<style>
	@font-face {
		font-family: 'icon';
		src: url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot');
		src: url('//at.alicdn.com/t/font_1104838_fxzimc34xw.eot?#iefix') format('embedded-opentype'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff2') format('woff2'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.woff') format('woff'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.ttf') format('truetype'),
			url('//at.alicdn.com/t/font_1104838_fxzimc34xw.svg#iconfont') format('svg');
	}
	.control_wrap{
		font-family: 'icon' !important;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		
	}
	.control_next{
		transform: rotate(180deg);
	}
	.control_wrap > view{
		font-size: 32upx;
		line-height: 1;
		border: 4upx solid;
		border-radius: 50%;
		padding: 16upx;
		margin: 20upx 50upx;
		color: #F1F1F1;
	}
	.song_detail{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.7);
		z-index: 99;
	}
</style>
