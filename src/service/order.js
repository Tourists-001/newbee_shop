import request from '@/utils/asios'
export const getOrderList = async (params) => {
	return await request({
		url: '/order',
		data: params,
	})
}

export const getOrderDetail = async (id) => {
	return await request({
		url: `/order/${id}`,
	})
}
export const cancelOrder = async (id) => {
	return await request({
		url: `/order/${id}/cancel`,
		method: 'put',
	})
}

export const confirmOrder = async (id) => {
	return await request({
		url: `/order/${id}/finish`,
		method: 'put',
	})
}

export const createOrder = async (params) => {
	return await request({
		url: '/saveOrder',
		method: 'post',
		data: params,
	})
}

export const payOrder = async (params) => {
	return await request({
		url: '/paySuccess',
		params,
	})
}
