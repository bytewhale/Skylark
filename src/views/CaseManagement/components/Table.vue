<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	interface IDataItem {
		case_id: number;
		case_name: string;
		opposing_party_name: string;
		jurisdictional_court: string;
		level_of_court: string;
		judge: string;
		contact: string;
		case_status?: string;
		collaborator: string;
	}

	const columns = [
		{ title: '案件ID', dataIndex: 'case_id', key: 'case_id' },
		{ title: '案件名称', dataIndex: 'case_name', key: 'case_name' },
		{ title: '对方当事人', dataIndex: 'opposing_party_name', key: 'opposing_party_name' },
		{ title: '管辖法院', dataIndex: 'jurisdictional_court', key: 'jurisdictional_court' },
		{ title: '审级', dataIndex: 'level_of_court', key: 'level_of_court' },
		{ title: '法官', dataIndex: 'judge', key: 'judge' },
		{ title: '联系方式', dataIndex: 'contact', key: 'contact' },
		{ title: '协作人', dataIndex: 'collaborator', key: 'collaborator' },
		{ title: '操作', key: 'edit' },
	];

	// 一级 table 数据来源
	const dataSource = ref<IDataItem[]>([]);

	onMounted(() => {
		for (let i = 0; i < 15; ++i) {
			dataSource.value.push({
				case_id: i + 1,
				case_name: '香江',
				opposing_party_name: '张三',
				jurisdictional_court: '武侯区中级人民法院',
				level_of_court: '一审',
				judge: '李思维',
				contact: '17389489390',
				collaborator: '里思维',
			});
		}
		// console.log(`dataSource`, dataSource.value);
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
