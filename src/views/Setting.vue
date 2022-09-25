<template>
	<div class="seting-box">
		<Sheader :name="'账号管理'"></Sheader>
		<div class="input-item">
			<van-field v-model="nickName" label="昵称"></van-field>
			<van-field v-model="introduceSign" label="个性签名"></van-field>
			<van-field
				v-model="password"
				type="password"
				label="修改密码"
			></van-field>
		</div>
		<van-button
			class="save-btn"
			color="#1baeae"
			type="primary"
			@click="save"
			block
		>
			保存
		</van-button>
		<van-button
			class="save-btn"
			color="#1baeae"
			type="primary"
			@click="logout"
			block
		>
			退出登录
		</van-button>
	</div>
</template>

<script>
import Sheader from '@/components/SimpleHeader.vue'
import { getUserInfo, EditUserInfo, logout } from '@/service/user'
import { setLocal } from '@/common/js/utils'
export default {
	components: {
		Sheader,
	},
	data() {
		return {
			nickName: '',
			introduceSign: '',
			password: '',
		}
	},
	created() {
		this.init()
	},
	methods: {
		async init() {
			const { data } = await getUserInfo()
			this.nickName = data.nickName
			this.introduceSign = data.introduceSign
		},
		async save() {
			const params = {
				introduceSign: this.introduceSign,
				nickName: this.nickName,
				passwordMd5: this.$md5(this.password),
			}
			const { data } = await EditUserInfo(params)
			console.log(data)
		},
		async logout() {
			const { resultCode } = await logout()
			if (resultCode == 200) {
				setLocal('token', '')
				window.location.href = '/'
			}
		},
	},
}
</script>

<style lang="less" scoped>
.seting-box {
	.input-item {
		margin-top: 44px;
	}
	.save-btn {
		width: 80%;
		margin: 20px auto;
	}
}
</style>
