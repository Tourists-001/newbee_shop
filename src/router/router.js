export default [
	{
		path: '/',
		name: 'home',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'home',
		meta: {
			index: 1,
		},
		component: () => import(/* webpackChunkName: "home"*/ '../views/Home.vue'),
	},
	{
		path: '/category',
		name: 'category',
		meta: {
			index: 1,
		},
		component: () =>
			import(/* webpackChunkName: "home" */ '../views/Category.vue'),
	},
	{
		path: '/cart',
		name: 'cart',
		meta: {
			index: 1,
		},
		component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
	},
	{
		path: '/login',
		name: 'login',
		meta: {
			index: 1,
		},
		component: () =>
			import(/* webpackChunkName: "login" */ '../views/Login.vue'),
	},
	{
		path: '/user',
		name: 'user',
		meta: {
			index: 1,
		},
		component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
	},
	{
		path: '/product-list',
		name: 'product-list',
		meta: {
			index: 1,
		},
		component: () =>
			import(/* webpackChunkName: "productList" */ '../views/ProductList.vue'),
	},
	{
		path: '/product/:id',
		name: 'product',
		meta: {
			index: 3,
		},
		component: () =>
			import(/* webpackChunkName: "product" */ '../views/ProductDetail.vue'),
	},
	{
		path: '/order',
		name: 'order',
		meta: {
			index: 3,
		},
		component: () =>
			import(/* webpackChunkName: "order" */ '../views/Order.vue'),
	},
	{
		path: '/setting',
		name: 'setting',
		meta: {
			index: 3,
		},
		component: () =>
			import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
	},
	{
		path: '/address',
		name: 'address',
		meta: {
			index: 3,
		},
		component: () =>
			import(/* webpackChunkName: "address" */ '../views/Address.vue'),
	},
	{
		path: '/about',
		name: 'about',
		meta: {
			index: 3,
		},
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/order-detail',
		name: 'order-detail',
		meta: {
			index: 3,
		},
		component: () =>
			import(/* webpackChunkName: "order-detail" */ '../views/OrderDetail.vue'),
	},
	{
		path: '/address-edit',
		name: 'address-edit',
		meta: {
			index: 3,
		},
		component: () =>
			import(/* webpackChunkName: "address-edit" */ '../views/AddressEdit.vue'),
	},
	{
		path: '/create-order',
		name: 'create-order',
		meta: {
			index: 2,
		},
		component: () =>
			import(/* webpackChunkName: "create-order" */ '../views/CreateOrder.vue'),
	},
]
