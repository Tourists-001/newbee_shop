<template>
	<van-swipe class="my-swipe" :autoplay="5000" indicator-color="#1baeae">
		<van-swipe-item v-for="(item, i) in list" :key="i">
			<img :src="item.carouselUrl" alt="" />
		</van-swipe-item>
	</van-swipe>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			default: null,
		},
	},
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
	img {
		width: 100%;
		height: 100%;
	}
}
</style>
