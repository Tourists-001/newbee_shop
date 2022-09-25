import request from '@/utils/asios'
export const getCategory = async () => {
	return await request({
		url: '/categories',
	})
}

export const search = async (params) => {
	return await request({
		url: '/search',
		params,
	})
}

export const getDetail = async  (id) => {
  return await request({
    url: `/goods/detail/${id}`
  })
}