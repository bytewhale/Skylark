<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { SearchOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons-vue';
	import dayjs, { type Dayjs } from 'dayjs';
	import { useAppStore } from '@/stores/appStore';
	import API from '@/api';
	import { message } from 'ant-design-vue';

	const formRef = ref();
	const appStore = useAppStore();
	const formState = reactive({
		recordId: undefined,
		caseType: undefined,
		clientName: undefined,
		createTimeRange: [],
	});

	const rules = {};

	const dateFormat = 'YYYY-MM-DD';

	const labelCol = { style: { width: '80px' } };

	const emit = defineEmits<{
		search: any;
		download: any;
		addRecord: any;
	}>();

	function handleSearch() {
		const [startTime, endTime] = formState.createTimeRange;

		emit('search', {
			recordId: formState.recordId,
			caseType: formState.caseType,
			clientName: formState.clientName,
			createTimeRange: formState.createTimeRange.length ? [dayjs(startTime).format(dateFormat), dayjs(endTime).format(dateFormat)] : [],
		});
	}
	const handleExport = async () => {
		try {
			if (!formState.createTimeRange.length) {
				message.warning('请选择时间范围');
				return;
			}
			const [startTime, endTime] = formState.createTimeRange;

			const params = {
				recordId: formState.recordId,
				caseType: formState.caseType,
				clientName: formState.clientName,
				createTimeRange: [dayjs(startTime).format(dateFormat), dayjs(endTime).format(dateFormat)],
			};

			await API.exportRecordListToExcel(params);
		} catch (error) {}
	};
</script>

<template>
	<div class="search-form">
		<a-form ref="formRef" :model="formState" :rules="rules" :labelCol="labelCol">
			<a-flex gap="middle" align="start" justify="space-between" horizontal>
				<a-form-item label="时间范围" name="createTimeRange">
					<a-range-picker v-model:value="formState.createTimeRange" :format="dateFormat" />
				</a-form-item>
				<a-space>
					<a-button type="primary" @click="handleSearch"><SearchOutlined />搜索</a-button>
					<a-button type="primary" @click="$emit('addRecord')"><PlusOutlined />新增记录</a-button>
					<a-button type="primary" @click="handleExport"><DownloadOutlined />导出记录</a-button>
				</a-space>
			</a-flex>
			<a-flex gap="middle" align="start" horizontal>
				<a-form-item ref="name" label="记录ID" name="recordId">
					<a-input v-model:value="formState.recordId" placeholder="请输入记录ID" />
				</a-form-item>

				<a-form-item label="案件类型" name="caseType">
					<a-select v-model:value="formState.caseType" style="width: 180px" placeholder="请选择案件类型">
						<a-select-option :value="1">诉讼案件</a-select-option>
						<a-select-option :value="2">非诉案件</a-select-option>
					</a-select>
				</a-form-item>

				<a-form-item label="客户名称" name="clientName">
					<a-select v-model:value="formState.clientName" style="width: 180px" placeholder="请选择客户名称">
						<a-select-option :value="item.text" v-for="item in appStore.clientSelectOptions">{{ item.text }}</a-select-option>
					</a-select>
				</a-form-item>
			</a-flex>
		</a-form>
	</div>
</template>

<style scoped lang="postcss"></style>
