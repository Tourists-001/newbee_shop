<template>
	<div class="product-list-wrap">
		<div class="product-list-content">
			<header class="category-header wrap">
				<i class="nbicon nbfanhui" @click="goBack"></i>
				<div class="header-search">
					<i class="nbicon nbSearch"></i>
					<input
						type="text"
						class="search-title"
						@mouseenter="textEnter"
						@mouseleave="textLeave"
						v-model="keyword"
					/>
				</div>
				<span class="search-btn" @click="getSearch">搜索</span>
			</header>
			<van-tabs type="card" color="#1baeae" @click="changeTab">
				<van-tab title="推荐" name=""></van-tab>
				<van-tab title="新品" name="new"></van-tab>
				<van-tab title="价格" name="price"></van-tab>
			</van-tabs>
		</div>
		<van-pull-refresh
			v-model="refreshing"
			@refresh="onRefresh"
			class="product-list-refresh"
		>
			<van-list
				v-model="loading"
				:finished="finished"
				finished-text="没有更多了"
				@load="onLoad"
				@offset="300"
			>
				<div
					class="product-item"
					v-for="(item, index) in productList"
					:key="index"
					@click="productDetail(item)"
				>
					<img :src="prefix(item.goodsCoverImg)" alt="" />
					<div class="product-info">
						<p class="name">{{ item.goodsName }}</p>
						<p class="subtitle">{{ item.goodsIntro }}</p>
						<p class="price">${{ item.sellingPrice }}</p>
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
import { search } from '@/service/good'
export default {
	data() {
		return {
			keyword: this.$route.query.keyword || '',
			refreshing: false,
			loading: false,
			page: 1,
			orderBy: '',
			finished: false,
			productList: [],
			totalPage: 0,
		}
	},
	created() {
		this.init()
	},
	methods: {
		async init() {
			const { categoryId } = this.$route.query
			if (!this.keyword && !categoryId) {
				this.finished = true
				this.loading = false
				return
			}
			const {
				data,
				data: { list },
			} = await search({
				pageNumber: this.page,
				goodsCategoryId: categoryId,
				keyword: this.keyword,
				orderBy: this.orderBy,
			})
			// console.log(list, data)
			this.productList = this.productList.concat(list)
			this.totalPage = data.totalPage
			this.loading = false
			if (this.page >= data.totalPage) this.finished = true
		},
		goBack() {
			this.$router.go(-1)
		},
		getSearch() {
			this.onRefresh()
		},
		textEnter() {},
		textLeave() {},
		changeTab() {
			this.orderBy = name
			this.onRefresh()
		},
		onRefresh() {
			this.refreshing = true
			this.finished = false
			this.loading = true
			this.page = 1
			this.onLoad()
		},
		onLoad() {
			if (!this.refreshing && this.page < this.totalPage) {
				this.page = this.page + 1
			}
			if (this.refreshing) {
				this.productList = []
				this.refreshing = false
			}
      this.init();
		},
		productDetail(item) {
			this.$router.push({ path: `product/${item.goodsId}` })
		},
	},
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.product-list-content {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	z-index: 1000;
	background: #fff;
	.category-header {
		.fj();
		width: 100%;
		height: 50px;
		line-height: 50px;
		padding: 0 15px;
		box-sizing: border-box;
		font-size: 15px;
		color: #656771;
		z-index: 10000;
		&.active {
			background: @primary;
		}
		.icon-left {
			font-size: 25px;
			font-weight: bold;
		}
		.header-search {
			display: flex;
			width: 76%;
			height: 20px;
			line-height: 20px;
			margin: 10px 0;
			padding: 5px 0;
			color: #232326;
			background: #f7f7f7;
			border-radius: 20px;
			.nbSearch {
				padding: 0 5px 0 20px;
				font-size: 17px;
			}
			.search-title {
				font-size: 12px;
				color: #666;
				background-color: #f7f7f7;
			}
		}
		.icon-More {
			font-size: 20px;
		}
		.search-btn {
			height: 50%;
			margin: 8px 0;
			line-height: 28px;
			padding: 0 5px;
			color: #fff;
			background: @primary;
			border-radius: 5px;
			margin-top: 10px;
		}
	}
}
.product-list-refresh {
	margin-top: 78px;
	.product-item {
		.fj();
		width: 100%;
		height: 120px;
		padding: 10px 0;
		border-bottom: 1px solid #dcdcdc;
		img {
			width: 140px;
			height: 120px;
			padding: 0 10px;
			box-sizing: border-box;
		}
		.product-info {
			width: 56%;
			height: 120px;
			padding: 5px;
			text-align: left;
			box-sizing: border-box;
			p {
				margin: 0;
			}
			.name {
				width: 100%;
				max-height: 40px;
				line-height: 20px;
				font-size: 15px;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.subtitle {
				width: 100%;
				max-height: 20px;
				padding: 10px 0;
				line-height: 25px;
				font-size: 13px;
				color: #999;
				overflow: hidden;
			}
			.price {
				color: @primary;
				font-size: 16px;
			}
		}
	}
}
</style>
