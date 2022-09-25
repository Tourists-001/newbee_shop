import request from '../utils/asios'
export const login = async (params) => {
	return await request({
		url: '/user/login',
		method: 'post',
		data: params,
	})
}

export const register = async (params) => {
	return await request({
		url: '/user/register',
		method: 'post',
		data: params,
	})
}

export const getUserInfo = async () => {
	return await request({
		url: '/user/info',
	})
}

export const EditUserInfo = async (params) => {
	return await request({
		url: '/user/info',
		params,
	})
}

export const logout = async () => {
	return await request({
		url: '/user/logout',
		method: 'post',
	})
}
