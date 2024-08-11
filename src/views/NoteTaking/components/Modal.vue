<script setup lang="ts">
	import { computed, onMounted, reactive, ref, type Ref } from 'vue';
	import { useModal } from '@/composition/useModal';
	import { useRequest } from '@/composition/useRequest';
	import type { Rule } from 'ant-design-vue/es/form';

	interface IState {
		case_type: string | undefined;
		client_name?: string;
		case_name?: string;
		opposing_party_name?: string;
		jurisdictional_court?: string;
		level_of_court?: string;
		judge?: string;
		contact?: string;
		case_status?: string;
		collaborator?: string;
		service_category?: string;
		service_content?: string;
		count?: string;
		liaison?: string;
		remarks?: string;
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
		return props.action == 'add' ? '新增记录' : '编辑记录';
	});

	const formState = reactive<IState>({
		case_type: undefined,
		client_name: undefined,
		case_name: undefined,
		opposing_party_name: '',
		jurisdictional_court: '',
		level_of_court: undefined,
		judge: '',
		contact: '',
		case_status: '',
		service_category: undefined,
		service_content: '',
		count: '',
		liaison: '',
		remarks: '',
	});

	const rulesRef: Record<string, Rule[]> = reactive({
		case_type: [{ required: false, message: '请选择案件类型' }],
	});

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
				<a-form-item label="案件类型" name="case_type">
					<a-select v-model:value="formState.case_type" style="width: 180px" placeholder="请选择案件类型">
						<a-select-option value="1">诉讼案件</a-select-option>
						<a-select-option value="2">非诉案件</a-select-option>
					</a-select>
				</a-form-item>

				<template v-if="formState.case_type && +formState.case_type == 1">
					<a-form-item label="客户名称">
						<a-select v-model:value="formState.client_name" style="width: 180px" placeholder="请选择客户名称">
							<a-select-option value="九策">九策</a-select-option>
							<a-select-option value="港投">港投</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="案件名称">
						<a-select v-model:value="formState.case_name" style="width: 180px" placeholder="请选择客户名称">
							<a-select-option value="香江">香江</a-select-option>
							<a-select-option value="菁蓉城">菁蓉城</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="对方当事人">
						<a-input v-model:value="formState.opposing_party_name" style="width: 180px" placeholder="请输入对方当事人" />
					</a-form-item>
					<a-form-item label="审级">
						<a-select v-model:value="formState.level_of_court" style="width: 180px" placeholder="请选择审级">
							<a-select-option value="1">一审</a-select-option>
							<a-select-option value="2">二审</a-select-option>
							<a-select-option value="3">再审</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="法官">
						<a-input v-model:value="formState.judge" style="width: 180px" placeholder="请输入法官姓名" />
					</a-form-item>
					<a-form-item label="联系方式">
						<a-input v-model:value="formState.contact" style="width: 180px" placeholder="请输入手机号" />
					</a-form-item>
					<a-form-item label="协作人">
						<a-input v-model:value="formState.collaborator" style="width: 180px" placeholder="请输入案件协作人" />
					</a-form-item>
					<!-- <a-form-item label="案件进度">
						<a-select v-model:value="formState.case_status" style="width: 180px" placeholder="请选择进度">
							<a-select-option value="1">一审</a-select-option>
							<a-select-option value="2">二审</a-select-option>
							<a-select-option value="3">再审</a-select-option>
						</a-select>
					</a-form-item> -->
				</template>
				<template v-else-if="formState.case_type && +formState.case_type == 2">
					<a-form-item label="服务类别">
						<a-select v-model:value="formState.service_category" style="width: 180px" placeholder="请选择服务类别">
							<a-select-option value="法律咨询">法律咨询</a-select-option>
							<a-select-option value="法律培训">法律培训</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="服务内容">
						<a-textarea v-model:value="formState.service_content" :auto-size="{ minRows: 1, maxRows: 5 }" placeholder="请输入服务内容" />
					</a-form-item>
					<a-form-item label="数量">
						<a-input-number v-model:value="formState.count" min="1" style="width: 180px" placeholder="请输入数量" />
					</a-form-item>
					<a-form-item label="对接人">
						<a-input v-model:value="formState.liaison" style="width: 180px" placeholder="请输入对接人" />
					</a-form-item>
				</template>
				<a-form-item label="备注">
					<a-textarea v-model:value="formState.remarks" :auto-size="{ minRows: 3, maxRows: 6 }" placeholder="请输入备注" />
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<style scoped lang="postcss"></style>
