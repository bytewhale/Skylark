<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import DynamicIcon from '@/components/Common/DynamicIcon.vue';

	const props = defineProps<{
		collapsed: boolean;
	}>();

	const selectedKeys = ref<number[]>([1]);
	const menuList = ref([
		{
			id: 1,
			name: '速记',
			icon: 'HighlightOutlined',
			path: '/note-taking',
		},
		{
			id: 2,
			name: '客户管理',
			icon: 'UserOutlined',
			path: '/client-management',
		},
		{
			id: 3,
			name: '案件管理',
			icon: 'FileWordOutlined',
			path: '/case-management',
		},
	]);
	const routes = useRoute();

	onMounted(() => {
		// console.log(`routes`, routes);
		const [selectedMenu] = menuList.value.filter((item) => {
			return item.path == routes.path;
		});
		if (selectedMenu) {
			selectedKeys.value = [selectedMenu.id];
		}
	});
</script>

<template>
	<a-layout-sider class="sider" :collapsed="props.collapsed" :trigger="null" collapsible>
		<div class="logo">
			<img class="logo-default" src="@/assets/images/skylark-logo.png" alt="" />
			<span class="logo-text" v-show="!props.collapsed">语燕</span>
		</div>
		<a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
			<a-menu-item v-for="menu in menuList" :key="menu.id">
				<router-link :to="menu.path">
					<DynamicIcon :name="menu.icon" />
					<span>{{ menu.name }}</span>
				</router-link>
			</a-menu-item>
		</a-menu>
	</a-layout-sider>
</template>

<style scoped lang="postcss">
	.sider {
		min-height: 100vh;
	}
	.logo {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 64px;
		&-default {
			width: 32px;
			height: 24px;
		}
		&-text {
			margin-left: 16px;
			font-family: AlibabaPuhuiBold;
			color: #ffffff;
			font-size: 16px;
		}
	}
	a {
		color: #ffffff;
		:hover {
			background-color: none;
		}
	}
</style>
