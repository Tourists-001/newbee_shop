<template>
	<div class="category">
		<div>
			<header class="category-header warp">
				<i class="nbicon nbfanhui" @click="goHome"></i>
				<div class="header-search">
					<i class="nbicon nbSearch"></i>
					<router-link
						to="./product-list?from=category"
						tag="span"
						class="search-title"
					>
						全场50元起步
					</router-link>
				</div>
				<i class="iconfont icon-More"></i>
			</header>
			<NavBar />

			<div class="search-wrap" ref="searchWrap">
				<ListScroll :scroll-data="categoryData" class="nav-side-wrapper">
					<ul class="nav-side">
						<li
							v-for="item in categoryData"
							:key="item.categoryId"
							v-text="item.categoryName"
							:class="{ active: currentIndex === item.categoryId }"
							@click="selectMenu(item.categoryId)"
						></li>
					</ul>
				</ListScroll>

				<div class="search-content">
					<ListScroll :scroll-data="categoryData">
						<div class="swiper-container">
							<div class="swiper-wrapper">
								<template v-for="(category, index) in categoryData">
									<div
										class="swiper-slide"
										v-if="currentIndex == category.categoryId"
										:key="index"
									>
										<div
											class="category-list"
											v-for="(
												products, index
											) in category.secondLevelCategoryVOS"
											:key="index"
										>
											<p class="catogory-title">{{ products.categoryName }}</p>
											<div
												class="product-item"
												v-for="(
													product, index
												) in products.thirdLevelCategoryVOS"
												:key="index"
												@click="selectProduct(product)"
											>
												<img
													src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
													class="product-img"
												/>
												<p
													v-text="product.categoryName"
													class="product-title"
												></p>
											</div>
										</div>
									</div>
								</template>
							</div>
						</div>
					</ListScroll>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ListScroll from '@/components/ListScroll'
import { getCategory } from '@/service/good'
export default {
	components: {
		NavBar,
		ListScroll,
	},
	data() {
		return {
			categoryData: [],
			currentIndex: 15,
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		async getData() {
			this.setWrapHeight()
			const { data } = await getCategory()
			this.categoryData = data
		},
		goHome() {
			this.$router.push({ path: 'home' })
		},
		setWrapHeight() {
			// 设置视口高度
			let $screenHeight = document.documentElement.clientHeight
			this.$refs.searchWrap.style.height = $screenHeight - 100 + 'px'
		},
		selectMenu(index) {
			this.currentIndex = index
		},
		selectProduct(item) {
			this.$router.push({ path: `product-list?categoryId=${item.categoryId}` })
		},
	},
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.category {
	.category-header {
		background-color: #fff;
		position: fixed;
		left: 0;
		top: 0;
		.fj();
		.wh(100%,50px);
		line-height: 50px;
		padding: 0 15px;
		box-sizing: border-box;
		font-weight: 15px;
		color: #656771;
		z-index: 10000;
		&.active {
			background-color: @primary;
		}
		.icon-left {
			font-size: 25px;
			font-weight: bold;
		}
		.header-search {
			display: flex;
			width: 80%;
			height: 20px;
			line-height: 20px;
			margin: 10px 0;
			padding: 5px 0;
			color: #232326;
			background-color: #f7f7ff;
			border-radius: 20px;
		}
		.nbSearch {
			padding: 0 10px 0 20px;
			font-size: 17px;
		}
		.search-title {
			font-size: 12px;
			color: #666;
		}
	}
	.icon-More {
		font-size: 20px;
	}
}
.search-wrap {
	.fj();
	width: 100%;
	margin-top: 50px;
	background-color: #f8f8f8;
	border-top: 1px solid #999;
	.nav-side-wrapper {
		width: 28%;
		height: 100%;
		overflow: hidden;
		.nav-side {
			width: 100%;
			box-sizing: border-box;
			background-color: #f8f8f8;
			li {
				width: 100%;
				height: 56px;
				text-align: center;
				line-height: 56px;
				font-size: 14px;
				&.active {
					color: @primary;
					background-color: #fff;
				}
			}
		}
	}

	.search-content {
		width: 72%;
		overflow: hidden;
		height: 92vh;
		padding: 0 10px;
		background: #fff;
		box-sizing: border-box;
		.swiper-container {
			width: 100%;
			.swiper-slide {
				width: 100%;
				.category-main-img {
					width: 100%;
				}
				.category-list {
					display: flex;
					flex-wrap: wrap;
					flex-shrink: 0;
					width: 100%;
					.catogory-title {
						width: 100%;
						font-size: 17px;
						font-weight: 500;
						padding: 20px 0;
					}
					.product-item {
						width: 33.3333%;
						margin-bottom: 10px;
						text-align: center;
						font-size: 15px;
						.product-img {
							.wh(30px, 30px);
						}
					}
				}
			}
		}
	}
}
</style>
