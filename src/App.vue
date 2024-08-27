<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import API from '@/api';
	import { onMounted } from 'vue';
	import useAppStore from '@/stores/appStore';
	import useUserStore from '@/stores/userStore';
	import zhCN from 'ant-design-vue/es/locale/zh_CN';
	import * as dayjs from 'dayjs';
	import 'dayjs/locale/zh-cn'; // import locale

	dayjs.locale('zh-cn'); // use locale

	const init = async () => {
		const { data }: { data: IUserInfo } = await API.getUserInfo({ uid: 10001 });
		const {
			data: { list },
		}: { data: { list: ISelectOption[] } } = await API.getClientConfigList({});

		useUserStore().setUserInfo(data);
		useAppStore().setClientSelectOptions(list);
	};

	onMounted(async () => {
		try {
			init();
		} catch (error) {
			console.log(`error`, error);
		}
	});
</script>

<template>
	<a-config-provider :locale="zhCN">
		<RouterView />
	</a-config-provider>
</template>

<style scoped></style>
