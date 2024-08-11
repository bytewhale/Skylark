<script setup lang="ts">
	import { computed, onMounted, reactive, ref, type Ref } from 'vue';
	import { useModal } from '@/composition/useModal';
	import { useRequest } from '@/composition/useRequest';
	import type { Rule } from 'ant-design-vue/es/form';

	interface IState {
		case_name: string;
		opposing_party_name: string;
		jurisdictional_court: string;
		level_of_court: string;
		judge: string;
		contact: string;
		case_status?: string;
		collaborator: string;
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
		return props.action == 'add' ? '新增案件' : '编辑案件';
	});

	const formState = reactive<IState>({
		case_name: '',
		opposing_party_name: '',
		jurisdictional_court: '',
		level_of_court: '',
		judge: '',
		contact: '',
		collaborator: '',
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
				<a-form-item label="案件名称">
					<a-input v-model:value="formState.case_name" style="width: 180px" placeholder="请输入案件名称" />
				</a-form-item>
				<a-form-item label="对方当事人">
					<a-input v-model:value="formState.opposing_party_name" style="width: 180px" placeholder="请输入对方当事人" />
				</a-form-item>
				<a-form-item label="管辖法院">
					<a-input v-model:value="formState.jurisdictional_court" style="width: 180px" placeholder="请输入管辖法院" />
				</a-form-item>
				<a-form-item label="审级">
					<a-input v-model:value="formState.level_of_court" style="width: 180px" placeholder="请输入审级" />
				</a-form-item>
				<a-form-item label="法官">
					<a-input v-model:value="formState.judge" style="width: 180px" placeholder="请输入法官姓名" />
				</a-form-item>
				<a-form-item label="联系方式">
					<a-input v-model:value="formState.contact" style="width: 180px" placeholder="请输入联系方式" />
				</a-form-item>
				<a-form-item label="协作人">
					<a-input v-model:value="formState.collaborator" style="width: 180px" placeholder="请输入案件协作人" />
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<style scoped lang="postcss"></style>
