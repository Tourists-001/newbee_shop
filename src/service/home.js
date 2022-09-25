import request from '@/utils/asios';
export const getHome = async () => {
  return await request({
    url : '/index-infos',
    method: 'get'
  })
}