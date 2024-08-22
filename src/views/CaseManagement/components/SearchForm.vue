<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue';

	const formRef = ref();

	const formState = reactive({
		case_id: '',
		case_name: undefined,
		case_type: undefined,
	});

	const rules = {};

	const labelCol = { style: { width: '80px' } };
</script>

<template>
	<div class="search-form">
		<a-form ref="formRef" :model="formState" :rules="rules" :labelCol="labelCol">
			<a-flex gap="middle" align="start" justify="space-between" horizontal>
				<a-space>
					<a-form-item ref="name" label="案件ID" name="case_id">
						<a-input v-model:value="formState.case_id" placeholder="请输入案件ID" />
					</a-form-item>
					<a-form-item label="案件类型" name="case_type">
						<a-select v-model:value="formState.case_type" style="width: 180px" placeholder="请选择案件类型">
							<a-select-option value="1">诉讼案件</a-select-option>
							<a-select-option value="2">非诉案件</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="案件名称" name="clientName">
						<a-input v-model:value="formState.case_name" style="width: 180px" placeholder="请输入客户名称" />
					</a-form-item>
				</a-space>
				<a-space>
					<a-button type="primary"><SearchOutlined />搜索</a-button>
					<a-button type="primary" @click="$emit('addRecord')"><PlusOutlined />新增案件</a-button>
				</a-space>
			</a-flex>
		</a-form>
	</div>
</template>

<style scoped lang="postcss"></style>
