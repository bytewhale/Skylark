<script setup lang="ts">
	import { reactive, ref } from 'vue';
	import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue';

	const formRef = ref();

	const formState = reactive({
		id: '',
		client_name: undefined,
	});

	const rules = {};

	const labelCol = { style: { width: '80px' } };
</script>

<template>
	<div class="search-form">
		<a-form ref="formRef" :model="formState" :rules="rules" :labelCol="labelCol">
			<a-flex gap="middle" align="start" justify="space-between" horizontal>
				<a-space>
					<a-form-item ref="name" label="客户ID" name="id">
						<a-input v-model:value="formState.id" placeholder="请输入客户ID" />
					</a-form-item>
					<a-form-item label="客户名称" name="client_name">
						<a-input v-model:value="formState.client_name" style="width: 180px" placeholder="请输入客户名称" />
					</a-form-item>
				</a-space>

				<a-space>
					<a-button type="primary"><SearchOutlined />搜索</a-button>
					<a-button type="primary" @click="$emit('addRecord')"><PlusOutlined />新增客户</a-button>
				</a-space>
			</a-flex>
		</a-form>
	</div>
</template>

<style scoped lang="postcss"></style>
