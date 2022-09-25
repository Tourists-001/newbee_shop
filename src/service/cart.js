import request from '@/utils/asios'
export const addCart = async (params) => {
	return await request({
		url: '/shop-cart',
		data: params,
		method: 'post',
	})
}

export const getCart = async (params) => {
	return await request({
		url: '/shop-cart',
		params,
	})
}

export const deleteCartItem = async (id) => {
	return await request({
		url: `/shop-cart/${id}`,
		method: 'delete',
	})
}

export const modifyCart = async (data) => {
	return await request({
		url: '/shop-cart',
		method: 'put',
		data,
	})
}

export const getByCartItemIds = async (params) => {
	return await request({
		url: '/shop-cart/settle',
		params: params,
	})
}

