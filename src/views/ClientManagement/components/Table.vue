<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import { formatDate, formatMoney } from '@/utils/util';

	export interface IDataItem {
		clientId: number;
		clientName: string;
		contractAmount: number;
		paymentDate: string;
		serviceEffectiveDate: string;
		serviceExpirationDate: string;
	}

	const emit = defineEmits<{
		edit: any;
	}>();

	const columns = [
		{ title: '客户ID', dataIndex: 'clientId', key: 'clientId' },
		{ title: '客户名称', dataIndex: 'clientName', key: 'clientName' },
		{ title: '合同金额（元）', dataIndex: 'contractAmount', key: 'contractAmount' },
		{ title: '付款日期', dataIndex: 'paymentDate', key: 'paymentDate' },
		{ title: '服务开始时间', dataIndex: 'serviceEffectiveDate', key: 'serviceEffectiveDate' },
		{ title: '服务到期时间', dataIndex: 'serviceExpirationDate', key: 'serviceExpirationDate' },
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
		<a-table v-bind="tableProps" :columns="columns" @change="pageChange" :rowKey="(record: any) => record.clientId">
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'contractAmount'">
					<div>{{ formatMoney(record.contractAmount) }}</div>
				</template>
				<template v-if="column.key === 'paymentDate'">
					<div>{{ formatDate(record.paymentDate, true) }}</div>
				</template>
				<template v-if="column.key === 'serviceEffectiveDate'">
					<div>{{ formatDate(record.serviceEffectiveDate, true) }}</div>
				</template>
				<template v-if="column.key === 'serviceExpirationDate'">
					<div>{{ formatDate(record.serviceExpirationDate, true) }}</div>
				</template>
				<template v-if="column.key === 'edit'">
					<a @click="handleEdit(record)">编辑</a>
				</template>
			</template>
		</a-table>
	</div>
</template>

<style scoped lang="postcss"></style>
