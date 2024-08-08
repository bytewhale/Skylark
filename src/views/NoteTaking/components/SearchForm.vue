<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue';

	const formRef = ref();

	const formState = reactive({
		id: '',
		caseType: '',
		clinetName: '',
		timeRange: [],
	});

	const rules = {};

	const dateFormat = 'YYYY/MM/DD';

	const labelCol = { style: { width: '80px' } };
</script>

<template>
	<div class="search-form">
		<a-form ref="formRef" :model="formState" :rules="rules" :labelCol="labelCol">
			<a-flex gap="middle" align="start" justify="space-between" horizontal>
				<a-form-item label="生效日期">
					<a-range-picker v-model:value="formState.timeRange" :format="dateFormat" />
				</a-form-item>
				<a-space>
					<a-button type="primary"><SearchOutlined />搜索</a-button>
					<a-button type="primary"><PlusOutlined />新增记录</a-button>
				</a-space>
			</a-flex>
			<a-flex gap="middle" align="start" horizontal>
				<a-form-item ref="name" label="记录ID" name="id">
					<a-input v-model:value="formState.id" placeholder="请输入记录ID" />
				</a-form-item>

				<a-form-item label="案件类型" name="caseType">
					<a-select v-model:value="formState.caseType" style="width: 180px" placeholder="请选择案件类型（默认全部）">
						<a-select-option value="1">诉讼案件</a-select-option>
						<a-select-option value="2">非诉案件</a-select-option>
					</a-select>
				</a-form-item>

				<a-form-item label="客户名称" name="clinetName">
					<a-select v-model:value="formState.clinetName" style="width: 180px" placeholder="请选择客户名称（默认全部）">
						<a-select-option value="九策">香江</a-select-option>
						<a-select-option value="港投">港投</a-select-option>
					</a-select>
				</a-form-item>
			</a-flex>
		</a-form>
	</div>
</template>

<style scoped lang="postcss"></style>
