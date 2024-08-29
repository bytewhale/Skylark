<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import Sider from './Sider.vue';
	import Header from './Header.vue';
	// import { useAppStore } from '@/stores/appStore';

	// const appStore = useAppStore();

	const collapsed = ref(true);

	const route = useRoute();

	const handleCollapse = () => {
		collapsed.value = !collapsed.value;
	};

	const keepAlive = computed(() => {
		return route.meta.keepAlive;
	});

	// const spinning = computed(() => Boolean(appStore.loadingCount));
</script>

<template>
	<a-layout>
		<Sider :collapsed="collapsed" />
		<Header :collapsed="collapsed" @collapse="handleCollapse">
			<!-- 内容区 -->
			<a-layout class="content" style="padding: 24px 24px 24px">
				<!-- <a-spin :spinning="spinning" size="large"> -->
				<router-view v-slot="{ Component }">
					<keep-alive>
						<component :is="Component" v-if="keepAlive" />
					</keep-alive>
					<component :is="Component" v-if="!keepAlive" />
				</router-view>
				<!-- </a-spin> -->
			</a-layout>
			<!-- 内容区结束 -->
		</Header>
	</a-layout>
</template>

<style scoped lang="postcss">
	.content {
		margin: 16px;
		padding: 24px;
		background: var(--color-background);
		border-radius: 6px;
	}
</style>
