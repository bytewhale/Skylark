<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { formatDate } from '@/utils/util';

	interface IDataItem {
		recordId: number;
		create_time: string;
		caseType: number;
		clientName: string;
		update_time: string;
		caseId: number;
		caseName: string;
		opposingPartyName: string;
		jurisdictionalCourt: string;
		levelOfCourt: string;
		judge: string;
		contact: string;
		case_status: string;
		serviceCategory: string;
		serviceContent: string;
		count: string;
		liaison: string;
		remarks: string;
	}

	const columns = [
		{ title: 'ID', dataIndex: 'recordId', key: 'recordId' },
		{ title: '诉讼类型', dataIndex: 'caseType', key: 'caseType' },
		{ title: '客户名称', dataIndex: 'clientName', key: 'clientName' },
		{ title: '创建时间', dataIndex: 'create_time', key: 'create_time' },
		{ title: '更新日期', dataIndex: 'update_time', key: 'update_time' },
		{ title: '操作', key: 'edit' },
	];

	// 诉讼业务表头
	const litigationColumns = [
		{ title: '案件ID', dataIndex: 'caseId', key: 'caseId' },
		{ title: '案件名称', dataIndex: 'caseName', key: 'caseName' },
		{ title: '对方当事人', dataIndex: 'opposingPartyName', key: 'opposingPartyName' },
		{ title: '管辖法院', dataIndex: 'jurisdictionalCourt', key: 'jurisdictionalCourt' },
		{ title: '审级', dataIndex: 'levelOfCourt', key: 'levelOfCourt' },
		{ title: '法官', dataIndex: 'judge', key: 'judge' },
		{ title: '联系方式', dataIndex: 'contact', key: 'contact' },
		{ title: '备注', dataIndex: 'remarks', key: 'remarks' },
	];
	// 非诉业务表头
	const nonLitigationColumns = [
		{ title: '服务类别', dataIndex: 'serviceCategory', key: 'serviceCategory' },
		{ title: '服务内容', dataIndex: 'serviceContent', key: 'serviceContent' },
		{ title: '数量', dataIndex: 'count', key: 'count' },
		{ title: '对接人', dataIndex: 'liaison', key: 'liaison' },
		{ title: '备注', dataIndex: 'remarks', key: 'remarks' },
	];

	const serviceCategoryMap = new Map([
		['1', '合同/文件审查'],
		['2', '法律咨询'],
		['3', '现场服务'],
		['4', '法律培训'],
		['5', '草拟文件'],
	]);

	const emit = defineEmits<{
		edit: any;
	}>();

	const props = defineProps<{
		tableProps: any;
		pageChange: any;
	}>();

	const handleEdit = (record: IDataItem) => {
		emit('edit', record);
	};

	onMounted(() => {});
</script>

<template>
	<div class="table">
		<a-table v-bind="tableProps" :columns="columns" @change="pageChange" :rowKey="(record: any) => record.recordId">
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'caseType'">
					<a-tag v-if="record.caseType == 1" color="blue">诉讼</a-tag>
					<a-tag v-else-if="record.caseType == 2" color="success">非诉</a-tag>
				</template>
				<template v-if="column.key === 'create_time'">
					<div>{{ formatDate(record.create_time) }}</div>
				</template>
				<template v-if="column.key === 'update_time'">
					<div>{{ formatDate(record.update_time) }}</div>
				</template>
				<template v-if="column.key === 'edit'">
					<a @click="handleEdit(record)">编辑</a>
				</template>
			</template>
			<template #expandedRowRender="{ column, record }">
				<div v-if="record.caseType == 1">
					<a-table :columns="litigationColumns" :data-source="[record]" :pagination="false"> </a-table>
				</div>
				<div v-if="record.caseType == 2">
					<a-table :columns="nonLitigationColumns" :data-source="[record]" :pagination="false">
						<template #bodyCell="{ column, record }">
							<template v-if="column.key === 'serviceCategory'">
								{{ serviceCategoryMap.get(record.serviceCategory) }}
							</template>
						</template>
					</a-table>
				</div>
			</template>
			<template #expandColumnTitle>
				<span style="display: inline-block; width: 80px">详情</span>
			</template>
		</a-table>
	</div>
</template>

<style scoped lang="postcss"></style>
