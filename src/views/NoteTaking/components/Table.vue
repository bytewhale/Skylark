<script setup lang="ts">
	import { onMounted, ref } from 'vue';

	interface IDataItem {
		id: number;
		create_time: string;
		case_type: number;
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
		service_category: string;
		service_content: string;
		count: string;
		liaison: string;
		remarks: string;
	}

	const columns = [
		{ title: 'ID', dataIndex: 'id', key: 'id' },
		{ title: '创建时间', dataIndex: 'create_time', key: 'create_time' },
		{ title: '诉讼类型', dataIndex: 'case_type', key: 'case_type' },
		{ title: '客户名称', dataIndex: 'clientName', key: 'clientName' },
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
		{ title: '案件进度', dataIndex: 'case_status', key: 'case_status' },
		{ title: '备注', dataIndex: 'remarks', key: 'remarks' },
	];
	// 非诉业务表头
	const nonLitigationColumns = [
		{ title: '服务类别', dataIndex: 'service_category', key: 'service_category' },
		{ title: '服务内容', dataIndex: 'service_content', key: 'service_content' },
		{ title: '数量', dataIndex: 'count', key: 'count' },
		{ title: '对接人', dataIndex: 'liaison', key: 'liaison' },
		{ title: '备注', dataIndex: 'remarks', key: 'remarks' },
	];
	// 一级 table 数据来源
	const dataSource = ref<IDataItem[]>([]);

	onMounted(() => {
		for (let i = 0; i < 15; ++i) {
			if (i % 2 == 0) {
				dataSource.value.push({
					id: i + 1,
					create_time: `2014-12-24 23:12:00`,
					case_type: 1,
					clientName: '九策',
					update_time: `2014-12-24 23:12:00`,
					caseId: i + 1,
					caseName: '香江',
					opposingPartyName: '张三',
					jurisdictionalCourt: '武侯区中级人民法院',
					levelOfCourt: '一审',
					judge: '李思维',
					contact: '17389489390',
					case_status: '一审',
					service_category: '',
					service_content: '',
					count: '',
					liaison: '',
					remarks: '备注备注备注',
				});
			} else {
				dataSource.value.push({
					id: i + 1,
					create_time: `2014-12-24 23:12:00`,
					case_type: 2,
					clientName: '港航投资',
					update_time: `2014-12-24 23:12:00`,
					caseId: 0,
					caseName: '',
					opposingPartyName: '',
					jurisdictionalCourt: '',
					levelOfCourt: '',
					judge: '',
					contact: '',
					case_status: '',
					service_category: '合同审查',
					service_content: '审查合同',
					count: '21',
					liaison: '王虎',
					remarks: '备注备注备注',
				});
			}
			// console.log(`dataSource`, dataSource.value);
		}
	});
</script>

<template>
	<div class="table">
		<a-table :columns="columns" :data-source="dataSource" rowKey="id">
			<template #bodyCell="{ column, record }">
				<template v-if="column.key === 'case_type'">
					<a-tag v-if="record.case_type == 1" color="blue">诉讼</a-tag>
					<a-tag v-else-if="record.case_type == 2" color="success">非诉</a-tag>
				</template>
				<template v-if="column.key === 'edit'">
					<a>编辑</a>
				</template>
			</template>
			<template #expandedRowRender="{ record }">
				<div v-if="record.case_type == 1">
					<a-table :columns="litigationColumns" :data-source="[record]" :pagination="false"> </a-table>
				</div>
				<div v-if="record.case_type == 2">
					<a-table :columns="nonLitigationColumns" :data-source="[record]" :pagination="false"> </a-table>
				</div>
			</template>
			<template #expandColumnTitle>
				<span style="display: inline-block; width: 80px">详情</span>
			</template>
		</a-table>
	</div>
</template>

<style scoped lang="postcss"></style>
