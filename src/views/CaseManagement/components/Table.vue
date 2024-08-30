<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { formatDate } from '@/utils/util';
	import { type Dayjs } from 'dayjs';

	interface IDataItem {
		clientId: number;
		clientName: string;
		caseId: number;
		caseName: string;
		opposingPartyName: string;
		jurisdictionalCourt: string;
		levelOfCourt: string;
		judge: string;
		contact: string;
		collaborator: string;
		create_time: Dayjs | undefined;
		update_time: Dayjs | undefined;
	}
	const emit = defineEmits<{
		edit: any;
	}>();

	const columns = [
		// { title: '客户ID', dataIndex: 'clientId', key: 'clientId' },
		{ title: '案件ID', dataIndex: 'caseId', key: 'caseId' },
		{ title: '客户名称', dataIndex: 'clientName', key: 'clientName' },
		{ title: '案件名称', dataIndex: 'caseName', key: 'caseName' },
		{ title: '对方当事人', dataIndex: 'opposingPartyName', key: 'opposingPartyName' },
		{ title: '管辖法院', dataIndex: 'jurisdictionalCourt', key: 'jurisdictionalCourt' },
		{ title: '审级', dataIndex: 'levelOfCourt', key: 'levelOfCourt' },
		{ title: '法官', dataIndex: 'judge', key: 'judge' },
		{ title: '联系方式', dataIndex: 'contact', key: 'contact' },
		{ title: '协作人', dataIndex: 'collaborator', key: 'collaborator' },
		// { title: '创建时间', dataIndex: 'create_time', key: 'create_time' },
		{ title: '更新时间', dataIndex: 'update_time', key: 'update_time' },
		{ title: '操作', key: 'edit' },
	];

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
		<a-table v-bind="tableProps" :columns="columns" @change="pageChange" :rowKey="(record: any) => record.caseId">
			<template #bodyCell="{ column, record }">
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
		</a-table>
	</div>
</template>

<style scoped lang="postcss"></style>
