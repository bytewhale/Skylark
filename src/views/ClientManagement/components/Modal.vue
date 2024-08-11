<script setup lang="ts">
	import { computed, onMounted, reactive, ref, type Ref } from 'vue';
	import { useModal } from '@/composition/useModal';
	import { useRequest } from '@/composition/useRequest';
	import type { Rule } from 'ant-design-vue/es/form';

	interface IState {
		client_name: string;
		contract_amount: number | undefined;
		payment_date: string;
		service_effective_date: string;
		service_expiration_date: string;
	}

	// 服务类别
	// 合同/文件审查
	// 法律咨询
	// 现场服务
	// 法律培训
	// 草拟文件
	//

	const { open, show: showModal, close: closeModal, submit: handleOk } = useModal();

	const { loading } = useRequest(() => Promise.resolve({ code: 0 }), {
		manual: true,
	});

	const props = defineProps<{
		action: string;
	}>();

	const title = computed(() => {
		return props.action == 'add' ? '新增客户' : '编辑客户';
	});

	const formState = reactive<IState>({
		client_name: '',
		contract_amount: undefined,
		payment_date: '',
		service_effective_date: '',
		service_expiration_date: '',
	});

	const rulesRef: Record<string, Rule[]> = reactive({});

	const formRef: Ref<any | null> = ref(null);

	const handleConfirm = () => {
		formRef.value
			.validate()
			.then(() => {
				console.log(`validate ok`);
				handleOk();
			})
			.catch(() => {
				console.log(`validate error`);
			});
	};

	defineExpose({
		showModal,
	});

	onMounted(() => {});
</script>

<template>
	<div class="modal">
		<a-modal width="800px" :title="title" :open="open" :confirm-loading="loading" @ok="handleConfirm" @cancel="closeModal">
			<a-form ref="formRef" :model="formState" :rules="rulesRef" :labelCol="{ span: 3 }">
				<a-form-item label="客户名称">
					<a-input v-model:value="formState.client_name" style="width: 180px" placeholder="请输入客户名称" />
				</a-form-item>
				<a-form-item label="合同金额">
					<a-input v-model:value="formState.contract_amount" style="width: 180px" placeholder="请输入合同金额" />
				</a-form-item>
				<a-form-item label="付款日期">
					<a-date-picker v-model:value="formState.payment_date" style="width: 180px" />
				</a-form-item>
				<a-form-item label="服务开始时间">
					<a-date-picker v-model:value="formState.service_effective_date" style="width: 180px" />
				</a-form-item>
				<a-form-item label="服务到期时间">
					<a-date-picker v-model:value="formState.service_expiration_date" style="width: 180px" />
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<style scoped lang="postcss"></style>
