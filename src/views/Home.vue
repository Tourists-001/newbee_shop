<template>
	<div>
		<header class="home-header wrap" :class="{ active: headerScroll }">
			<router-link to="./category" tag="i">
				<i class="nbicon nbmenu2"></i>
			</router-link>
			<div class="header-search">
				<span class="app-name">新锋商城</span>
				<i class="iconfont icon-search"></i>
				<router-link
					tag="span"
					class="search-title"
					to="./product-list?from=home"
				>
					山河无恙，人间皆安
				</router-link>
			</div>
			<router-link to="./login" class="login" tag="span" v-if="!isLogin">
				登录
			</router-link>
			<router-link class="login" tag="span" to="./user" v-else>
				<van-icon name="manager-o" />
			</router-link>
		</header>
		<NavBar></NavBar>
		<Swiper :list="swiperList"></Swiper>
		<!-- 中间导航 -->
		<div class="category-list">
			<div v-for="item in categoryList" :key="item.categoryId">
				<img :src="item.imgUrl" alt="" />
				<span>{{ item.name }}</span>
			</div>
		</div>
		<!-- new good -->
		<div class="good">
			<header class="good-header">新品上市</header>
			<div class="good-box">
				<div
					class="good-item"
					v-for="item in newGoodses"
					:key="item.goodsId"
					@click="goToDetail(item)"
				>
					<img :src="prefix(item.goodsCoverImg)" alt="" />
					<div class="good-desc">
						<div class="title">{{ item.goodsName }}</div>
						<div class="price">¥ {{ item.sellingPrice }}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="good">
			<header class="good-header">热门商品</header>
			<div class="good-box">
				<div
					class="good-item"
					v-for="item in hots"
					:key="item.goodsId"
					@click="goToDetail(item)"
				>
					<img :src="prefix(item.goodsCoverImg)" alt="" />
					<div class="good-desc">
						<div class="title">{{ item.goodsName }}</div>
						<div class="price">¥ {{ item.sellingPrice }}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="good" :style="{ paddingBottom: '100px' }">
			<header class="good-header">最新推荐</header>
			<div class="good-box">
				<div
					class="good-item"
					v-for="item in recommends"
					:key="item.goodsId"
					@click="goToDetail(item)"
				>
					<img :src="prefix(item.goodsCoverImg)" alt="" />
					<div class="good-desc">
						<div class="title">{{ item.goodsName }}</div>
						<div class="price">¥ {{ item.sellingPrice }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Swiper from '@/components/Swiper.vue'
import { getHome } from '@/service/home.js'
import { Toast } from 'vant'
import { getLocal } from '@/common/js/utils'

export default {
	components: {
		NavBar,
		Swiper,
	},
	data() {
		return {
			swiperList: [],
			isLogin: false, // 是否登录
			headerScroll: false, //  滚动条是否移动
			hots: [],
			newGoodses: [],
			recommends: [],
			categoryList: [
				{
					name: '新蜂超市',
					imgUrl: '//s.weituibao.com/1583585285461/cs.png',
					categoryId: 100001,
				},
				{
					name: '新蜂服饰',
					imgUrl: '//s.weituibao.com/1583585285468/fs.png',
					categoryId: 100003,
				},
				{
					name: '全球购',
					imgUrl: '//s.weituibao.com/1583585285470/qq.png',
					categoryId: 100002,
				},
				{
					name: '新蜂生鲜',
					imgUrl: '//s.weituibao.com/1583585285472/sx.png',
					categoryId: 100004,
				},
				{
					name: '新蜂到家',
					imgUrl: '//s.weituibao.com/1583585285467/dj.png',
					categoryId: 100005,
				},
				{
					name: '充值缴费',
					imgUrl: '//s.weituibao.com/1583585285465/cz.png',
					categoryId: 100006,
				},
				{
					name: '9.9元拼',
					imgUrl: '//s.weituibao.com/1583585285469/pt.png',
					categoryId: 100007,
				},
				{
					name: '领劵',
					imgUrl: '//s.weituibao.com/1583585285468/juan.png',
					categoryId: 100008,
				},
				{
					name: '省钱',
					imgUrl: '//s.weituibao.com/1583585285471/sq.png',
					categoryId: 100009,
				},
				{
					name: '全部',
					imgUrl: '//s.weituibao.com/1583585285470/qb.png',
					categoryId: 100010,
				},
			],
		}
	},
	created() {
		// 判断用户是否登录
		const token = getLocal('token')
		if (token) {
			this.isLogin = true
		}
		// 监听滚动条变化
		window.addEventListener('scroll', this.pageScroll)
		Toast.loading({
			message: '加载中...',
			forbidClick: true,
		})
		this.getData()
	},
	// 销毁组件之前取消监听
	beforeDestroy() {
		window.removeEventListener('scroll', this.pageScroll)
	},
	methods: {
		async getData() {
			const { data } = await getHome()
			this.swiperList = data.carousels
			this.newGoodses = data.newGoodses
			this.hots = data.hotGoodses
			this.recommends = data.recommendGoodses
			Toast.clear()
		},
		// 滚动条监听函数
		pageScroll() {
			const top =
				window.pageYOffset ||
				document.documentElement.scrollTop ||
				document.body.scrollTop
			top > 100 ? (this.headerScroll = true) : (this.headerScroll = false)
		},
		// 进入详情
		goToDetail(item) {
			this.$router.push({ path: `product/${item.goodsId}` })
		},
	},
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin.less';
.home-header {
	position: fixed;
	left: 0;
	top: 0;
	.wh(100%,50px);
	.fj();
	line-height: 50px;
	padding: 0 15px;
	box-sizing: border-box;
	font-size: 15px;
	color: #fff;
	z-index: 10000;
	.login {
		color: @primary;
	}
	.nbmenu2 {
		color: @primary;
	}
	&.active {
		transition: all 1s;
		background: @primary;
		.nbmenu2 {
			color: #fff;
		}
		.login {
			color: #fff;
		}
	}

	.header-search {
		display: flex;
		.wh(74%, 20px);
		line-height: 20px;
		margin: 10px 0;
		padding: 5px 0;
		color: #232326;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 20px;
		.app-name {
			padding: 0 10px;
			color: @primary;
			font-size: 20px;
			font-weight: bold;
			border-right: 1px solid #666;
		}
		.icon-search {
			padding: 0 10px;
			font-size: 17px;
		}
		.search-title {
			font-size: 12px;
			color: #666;
			line-height: 21px;
		}
	}
}

.category-list {
	display: flex;
	flex-shrink: 0;
	flex-wrap: wrap;
	width: 100%;
	padding-bottom: 13px;
	div {
		display: flex;
		flex-direction: column;
		width: 20%;
		text-align: center;
		img {
			.wh(40%,40px);
			margin: 13px auto 8px auto;
		}
	}
}

.good {
	.good-header {
		background: #f9f9f9;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: @primary;
		font-size: 16px;
		font-weight: 500;
	}
	.good-box {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		.good-item {
			box-sizing: border-box;
			width: 50%;
			border-bottom: 1px solid #e9e9e9;
			padding: 10px 10px;
			img {
				display: block;
				width: 120px;
				margin: 0 auto;
			}
			.good-desc {
				text-align: center;
				font-size: 14px;
				padding: 10px 0;
				.title {
					color: #222333;
				}
				.price {
					color: @primary;
				}
			}
			&:nth-child(2n + 1) {
				border-right: 1px solid #e9e9e9;
			}
		}
	}
}
</style>
