<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue';

	const formRef = ref();

	const formState = reactive({
		caseId: '',
		caseName: undefined,
	});

	const rules = {};

	const labelCol = { style: { width: '80px' } };
	const emit = defineEmits<{
		search: any;
		addRecord: any;
	}>();
	const handleSearch = () => {
		emit('search', {
			caseId: formState.caseId,
			caseName: formState.caseName,
		});
	};
</script>

<template>
	<div class="search-form">
		<a-form ref="formRef" :model="formState" :rules="rules" :labelCol="labelCol">
			<a-flex gap="middle" align="start" justify="space-between" horizontal>
				<a-space>
					<a-form-item ref="name" label="案件ID" name="caseId">
						<a-input v-model:value="formState.caseId" placeholder="请输入案件ID" />
					</a-form-item>
					<a-form-item label="案件名称" name="clientName">
						<a-input v-model:value="formState.caseName" style="width: 180px" placeholder="请输入客户名称" />
					</a-form-item>
				</a-space>
				<a-space>
					<a-button type="primary" @click="handleSearch"><SearchOutlined />搜索</a-button>
					<a-button type="primary" @click="$emit('addRecord')"><PlusOutlined />新增案件</a-button>
				</a-space>
			</a-flex>
		</a-form>
	</div>
</template>

<style scoped lang="postcss"></style>
