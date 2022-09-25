<template>
	<header class="simple-header">
		<i class="nbicon nbfanhui" @click="goBack"></i>
		<div class="simple-header-name">{{ name }}</div>
    <i class="nbicon nbmore"></i>
	</header>
</template>

<script>
export default {
	props: {
		name: {
			type: String,
			default: '',
		},
		back: {
			type: String,
			default: '',
		},
	},
	methods: {
		goBack() {
			if (!this.back) {
				this.$router.go(-1)
			} else {
				this.$router.push(this.back)
			}
			this.$emit('callBack')
		},
	},
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin.less';
.simple-header {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10000;
	.fj();
	.wh(100%, 44px);
	line-height: 44px;
	padding: 0 10px;
	box-sizing: border-box;
	color: #252525;
	background: #fff;
	border-bottom: 1px solid #dcdcdc;
	.simple-header-name {
		font-size: 14px;
	}
}
</style>
