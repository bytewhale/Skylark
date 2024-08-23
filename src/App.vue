<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import API from '@/api';
	import { nextTick, onMounted } from 'vue';
	import useUserStore from '@/stores/userStore';
	import zhCN from 'ant-design-vue/es/locale/zh_CN';
	import * as dayjs from 'dayjs';
	import 'dayjs/locale/zh-cn'; // import locale

	dayjs.locale('zh-cn'); // use locale

	onMounted(async () => {
		try {
			const { data }: { data: IUserInfo } = await API.getUserInfo({ uid: 10001 });
			console.log(`userInfo => `, data);

			useUserStore().setUserInfo(data);
		} catch (error) {}
	});
</script>

<template>
	<a-config-provider :locale="zhCN">
		<RouterView />
	</a-config-provider>
</template>

<style scoped></style>
