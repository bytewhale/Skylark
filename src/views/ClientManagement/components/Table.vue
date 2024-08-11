<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	interface IDataItem {
		client_id: number;
		client_name: string;
		contract_amount: number;
		payment_date: string;
		service_effective_date: string;
		service_expiration_date: string;
	}

	const columns = [
		{ title: '客户ID', dataIndex: 'client_id', key: 'client_id' },
		{ title: '客户名称', dataIndex: 'client_name', key: 'client_name' },
		{ title: '合同金额', dataIndex: 'contract_amount', key: 'contract_amount' },
		{ title: '付款日期', dataIndex: 'payment_date', key: 'payment_date' },
		{ title: '服务开始时间', dataIndex: 'service_effective_date', key: 'service_effective_date' },
		{ title: '服务到期时间', dataIndex: 'service_expiration_date', key: 'service_expiration_date' },
		{ title: '操作', key: 'edit' },
	];
	// 一级 table 数据来源
	const dataSource = ref<IDataItem[]>([]);

	onMounted(() => {
		for (let i = 0; i < 15; ++i) {
			dataSource.value.push({
				client_id: i + 1,
				client_name: '九策',
				contract_amount: 234892,
				payment_date: '2024-03-03',
				service_effective_date: '2024-03-03',
				service_expiration_date: '2024-03-03',
			});

			// console.log(`dataSource`, dataSource.value);
		}
	});
</script>

<template>
	<div class="table">
		<a-table :columns="columns" :data-source="dataSource" rowKey="id">
			<template #bodyCell="{ column }">
				<template v-if="column.key === 'edit'">
					<a>编辑</a>
				</template>
			</template>
		</a-table>
	</div>
</template>

<style scoped lang="postcss"></style>
