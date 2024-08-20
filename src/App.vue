<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import zhCN from 'ant-design-vue/es/locale/zh_CN';
	import API from '@/api';
	import { nextTick, onMounted } from 'vue';

	onMounted(async () => {
		// try {
		// 	const data = await API.getUserInfo({ uid: 10001 });
		// 	console.log(`userInfo => ${data}`);
		// } catch (error) {}
	});
</script>

<template>
	<a-config-provider :locale="zhCN">
		<RouterView />
	</a-config-provider>
</template>

<style scoped></style>
