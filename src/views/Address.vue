<template>
	<div class="address-box">
		<Sheader :name="'地址管理'" :back="'/user'"></Sheader>
		<div class="address-item">
			<van-address-list
				v-if="from != 'mine'"
				v-model="chosenAddressId"
				:list="list"
				default-tag-text="默认"
				@add="onAdd"
				@edit="onEdit"
				@select="select"
			></van-address-list>
			<van-address-list
				v-else
				v-model="chosenAddressId"
				:list="list"
				default-tag-text="默认"
				@add="onAdd"
				@edit="onEdit"
			></van-address-list>
		</div>
	</div>
</template>

<script>
import Sheader from '@/components/SimpleHeader.vue'
import { getAddressList } from '@/service/address'
export default {
	components: {
		Sheader,
	},
	data() {
		return {
			from: this.$route.query.from,
			chosenAddressId: '1',
			list: [],
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		async init() {
			const { data } = await getAddressList()
			console.log(data)
			this.list = data.map((item) => {
				return {
					id: item.addressId,
					name: item.userName,
					tel: item.userPhone,
					address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
					isDefault: !!item.defaultFlag,
				}
			})
			console.log(this.list)
		},
    onAdd() {
      this.$router.push({ path: `address-edit?type=add&from=${this.from}` })
    },
    onEdit(item) {
      this.$router.push({ path: `address-edit?type=edit&addressId=${item.id}&from=${this.from}` })
    },
    select(item) {
      this.$router.push({ path: `create-order?addressId=${item.id}&from=${this.from}` })
    }
	},
}
</script>

<style lang="less">
@import '../common/style/mixin';
.address-box {
	.van-radio__icon {
		display: none;
	}
	.address-item {
		margin-top: 44px;
		.van-button {
			background: @primary;
			border-color: @primary;
		}
	}
}
</style>
