<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import API from '@/api';
	import { onMounted } from 'vue';
	import { useAppStore } from '@/stores/appStore';
	import zhCN from 'ant-design-vue/es/locale/zh_CN';
	import * as dayjs from 'dayjs';
	import { useAuthStore } from '@/stores/authStore';
	import 'dayjs/locale/zh-cn'; // import locale

	dayjs.locale('zh-cn'); // use locale

	const init = async () => {
		const { list }: { list: ISelectOption[] } = await API.getClientConfigList({});

		useAppStore().setClientSelectOptions(list);
	};

	onMounted(async () => {
		try {
			if (useAuthStore().hasLogin) {
				init();
			}
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
