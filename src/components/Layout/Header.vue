<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue';
	import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons-vue';
	import { getCurrentDate } from '@/utils/util';

	const props = defineProps<{
		collapsed: boolean;
	}>();

	const emit = defineEmits<{
		collapse: [];
	}>();

	// const currentTime = ref()
	const handleCollapseClick = () => {
		emit('collapse');
	};

	const currentDate = ref('');
	const interval = ref<number>(0);

	onMounted(() => {
		setInterval(() => getCurrentDate(currentDate), 1000);
	});

	onUnmounted(() => {
		clearInterval(interval.value);
	});
</script>

<template>
	<a-layout>
		<a-layout-header style="background: #fff; padding: 0">
			<div class="header">
				<div class="header-left">
					<menu-unfold-outlined v-if="props.collapsed" class="trigger" @click="handleCollapseClick" />
					<menu-fold-outlined v-else class="trigger" @click="handleCollapseClick" />
				</div>
				<div class="header-right">
					<div class="header-right-date">{{ currentDate }}</div>
					<a-avatar src="/avatar.gif" />
				</div>
			</div>
		</a-layout-header>
		<slot></slot>
	</a-layout>
</template>

<style scoped lang="postcss">
	.header {
		padding: 0 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&-right {
			display: flex;
			align-items: center;
			&-date {
				margin-right: 16px;
				font-family: AlibabaPuhuiSemiBold;
				color: #1a1a1a;
			}
		}
	}
	.trigger {
		font-size: 18px;
		line-height: 64px;
		cursor: pointer;
		transition: color 0.3s;
	}
	.trigger:hover {
		color: #1890ff;
	}
</style>
