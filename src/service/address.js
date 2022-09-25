import request from '@/utils/asios'

export const getAddressList = async () => {
	return await request({
		url: '/address',
		data: {
			pageNumber: 1,
			pageSize: 1000,
		},
	})
}
export const addAddress = async (params) => {
  return await request({
    url: '/address',
    method: 'post',
    data: params,
  })
}

export const EditAddress = async (params) => {
  return await request({
    url: '/address',
    method: 'put',
    params,
  })
}

export const DeleteAddress = async (id) => {
  return await request({
    url: `/address/${id}`,
    method: 'delete'
  })
}

export const getAddressDetail = async (id) => {
  return await request({
    url: `/address/${id}`
  })
}
export const getDefaultAddress = async () => {
	return await request({
		url: '/address/default',
	})
}
