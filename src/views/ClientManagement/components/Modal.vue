<script setup lang="ts">
	import { computed, onMounted, reactive, ref, type Ref } from 'vue';
	import { useModal } from '@/composition/useModal';
	import { useRequest } from '@/composition/useRequest';
	import { useForm, type Rule } from 'ant-design-vue/es/form';
	import API from '@/api';
	import { message } from 'ant-design-vue';
	import dayjs, { type Dayjs } from 'dayjs';

	interface IState {
		clientName: string;
		contractAmount: number | undefined;
		paymentDate: string;
		serviceEffectiveDate: string;
		serviceExpirationDate: string;
	}
	// 服务类别
	// 合同/文件审查
	// 法律咨询
	// 现场服务
	// 法律培训
	// 草拟文件

	const props = defineProps<{
		action: string;
		refreshTable: () => void;
	}>();

	const formState = reactive<IState>({
		clientName: '',
		contractAmount: undefined,
		paymentDate: '',
		serviceEffectiveDate: '',
		serviceExpirationDate: '',
	});
	const rules: Record<string, Rule[]> = reactive({
		clientName: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
		contractAmount: [{ required: true, message: '请输入合同金额', trigger: 'blur' }],
		paymentDate: [{ required: true, message: '请选择支付日期', trigger: 'blur' }],
		serviceEffectiveDate: [{ required: true, message: '请选择服务开始时间', trigger: 'blur' }],
		serviceExpirationDate: [{ required: true, message: '请选择服务到期时间', trigger: 'blur' }],
	});

	const title = computed(() => {
		return props.action == 'add' ? '新增客户' : '编辑客户';
	});
	const { resetFields, validate, validateInfos } = useForm(formState, rules, {
		deep: true,
		immediate: true,
	});
	const { run: addClient, loading } = useRequest(API.addClient, {
		manual: true,
	});
	const dateFormat = 'YYYY-MM-DD';

	const {
		open,
		show: showModal,
		close: closeModal,
		submit: handleOk,
	} = useModal({
		onClose: () => {
			resetFields();
		},
		onSubmit: async () => {
			try {
				await validate();
				// 添加客户
				if (props.action == 'add') {
					const { paymentDate, serviceEffectiveDate, serviceExpirationDate } = formState;
					const params = {
						...formState,
						paymentDate: dayjs(paymentDate).format(dateFormat) || '',
						serviceEffectiveDate: dayjs(serviceEffectiveDate).format(dateFormat) || '',
						serviceExpirationDate: dayjs(serviceExpirationDate).format(dateFormat) || '',
					};
					console.log(`params`, params);
					const {
						code,
						data: { success },
					} = await addClient(params);
					console.log(`code`, code);
					console.log(`success`, success);
					if (code == 0 && success) {
						message.success('添加成功');
						closeModal();
						props.refreshTable();
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
	});

	defineExpose({
		showModal,
	});

	onMounted(() => {});
</script>

<template>
	<div class="modal">
		<a-modal width="800px" :title="title" :open="open" :confirm-loading="loading" @ok="handleOk" @cancel="closeModal">
			<a-form :model="formState" :rules="rules" :labelCol="{ span: 4 }">
				<a-form-item label="客户名称" v-bind="validateInfos.clientName">
					<a-input v-model:value="formState.clientName" style="width: 180px" placeholder="请输入客户名称" />
				</a-form-item>
				<a-form-item label="合同金额" v-bind="validateInfos.contractAmount">
					<a-input v-model:value="formState.contractAmount" style="width: 180px" placeholder="请输入合同金额" />
				</a-form-item>
				<a-form-item label="付款日期" v-bind="validateInfos.paymentDate">
					<a-date-picker v-model:value="formState.paymentDate" :format="dateFormat" style="width: 180px" />
				</a-form-item>
				<a-form-item label="服务开始时间" v-bind="validateInfos.serviceEffectiveDate">
					<a-date-picker v-model:value="formState.serviceEffectiveDate" :format="dateFormat" style="width: 180px" />
				</a-form-item>
				<a-form-item label="服务到期时间" v-bind="validateInfos.serviceExpirationDate">
					<a-date-picker v-model:value="formState.serviceExpirationDate" :format="dateFormat" style="width: 180px" />
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<style scoped lang="postcss"></style>
