<script setup lang="ts">
	import { computed, onMounted, reactive, ref, type Ref } from 'vue';
	import { useModal } from '@/composition/useModal';
	import { useRequest } from '@/composition/useRequest';
	import { useForm, type Rule } from 'ant-design-vue/es/form';
	import API from '@/api';
	import { message } from 'ant-design-vue';
	import appStore from '@/stores/appStore';

	interface IState {
		clientId?: number | undefined;
		clientName?: string | undefined;
		caseId?: number | undefined;
		caseName: string;
		opposingPartyName: string;
		jurisdictionalCourt: string;
		levelOfCourt: string;
		judge: string;
		contact: string;
		caseStatus?: string;
		collaborator: string;
	}

	// 服务类别
	// 合同/文件审查
	// 法律咨询
	// 现场服务
	// 法律培训
	// 草拟文件
	//
	const props = defineProps<{
		action: string;
		refreshTable: () => void;
	}>();
	const useAppStore = appStore();
	const title = computed(() => {
		return props.action == 'add' ? '新增案件' : '编辑案件';
	});

	const formState = reactive<IState>({
		clientId: undefined,
		clientName: undefined,
		caseId: undefined,
		caseName: '',
		opposingPartyName: '',
		jurisdictionalCourt: '',
		levelOfCourt: '',
		judge: '',
		contact: '',
		collaborator: '',
	});

	const rules: Record<string, Rule[]> = reactive({
		clientId: [{ required: true, message: '请选择客户', trigger: 'blur' }],
		caseName: [{ required: true, message: '请输入案件名称', trigger: 'blur' }],
		opposingPartyName: [{ required: true, message: '请输入对方当事人', trigger: 'blur' }],
		jurisdictionalCourt: [{ required: true, message: '请输入管辖法院', trigger: 'blur' }],
		levelOfCourt: [{ required: true, message: '请选择审级', trigger: 'blur' }],
		judge: [{ required: true, message: '请输入法官', trigger: 'blur' }],
		contact: [{ required: true, message: '请输入法官联系方式', trigger: 'blur' }],
	});

	const { resetFields, validate, validateInfos } = useForm(formState, rules, {
		deep: true,
		immediate: true,
	});
	const { run: addClient, loading } = useRequest(API.addCase, {
		manual: true,
	});
	const { run: updateClient, loading: updateLoading } = useRequest(API.updateCase, {
		manual: true,
	});

	const {
		open,
		show: showModal,
		close: closeModal,
		submit: handleOk,
	} = useModal({
		onShow: (data) => {
			// 处理数据回显示
			if (data) {
				const { clientId, caseId, caseName, opposingPartyName, jurisdictionalCourt, levelOfCourt, judge, contact, collaborator } = data;

				formState.clientId = clientId;
				formState.caseId = caseId;
				formState.caseName = caseName;
				formState.opposingPartyName = opposingPartyName;
				formState.jurisdictionalCourt = jurisdictionalCourt;
				formState.levelOfCourt = levelOfCourt;
				formState.judge = judge;
				formState.contact = contact;
				formState.collaborator = collaborator;
			}
		},
		onClose: () => {
			resetFields();
		},
		onSubmit: async () => {
			try {
				await validate();

				const params = {
					...formState,
				};
				// 添加客户
				if (props.action == 'add') {
					// 找到客户名称
					const [clientNameItem] = useAppStore.clientSelectOptions.filter((item) => {
						return item.value == formState.clientId;
					});

					if (clientNameItem) {
						params.clientName = clientNameItem.text;
					}
					const {
						code,
						data: { success },
					} = await addClient(params);

					if (code == 0 && success) {
						message.success('添加成功');
						closeModal();
						props.refreshTable();
					}
				} else if (props.action === 'edit') {
					const {
						code,
						data: { success },
					} = await updateClient(params);
					if (code == 0 && success) {
						message.success('更新成功');
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
		<a-modal
			width="800px"
			:title="title"
			:open="open"
			:confirm-loading="action === 'add' ? loading : updateLoading"
			@ok="handleOk"
			@cancel="closeModal"
		>
			<a-form :model="formState" :rules="rules" :labelCol="{ span: 3 }">
				<a-form-item label="客户名称" v-bind="validateInfos.caseName">
					<a-select v-model:value="formState.clientId" style="width: 180px" placeholder="请选择客户名称">
						<a-select-option :value="item.value" v-for="item in useAppStore.clientSelectOptions">{{ item.text }}</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="案件名称" v-bind="validateInfos.caseName">
					<a-input v-model:value="formState.caseName" style="width: 180px" placeholder="请输入案件名称" />
				</a-form-item>
				<a-form-item label="对方当事人" v-bind="validateInfos.opposingPartyName">
					<a-input v-model:value="formState.opposingPartyName" style="width: 180px" placeholder="请输入对方当事人" />
				</a-form-item>
				<a-form-item label="管辖法院" v-bind="validateInfos.jurisdictionalCourt">
					<a-input v-model:value="formState.jurisdictionalCourt" style="width: 180px" placeholder="请输入管辖法院" />
				</a-form-item>
				<a-form-item label="审级" v-bind="validateInfos.levelOfCourt">
					<a-input v-model:value="formState.levelOfCourt" style="width: 180px" placeholder="请输入审级" />
				</a-form-item>
				<a-form-item label="法官" v-bind="validateInfos.judge">
					<a-input v-model:value="formState.judge" style="width: 180px" placeholder="请输入法官姓名" />
				</a-form-item>
				<a-form-item label="联系方式" v-bind="validateInfos.contact">
					<a-input v-model:value="formState.contact" style="width: 180px" placeholder="请输入联系方式" />
				</a-form-item>
				<a-form-item label="协作人" v-bind="validateInfos.collaborator">
					<a-input v-model:value="formState.collaborator" style="width: 180px" placeholder="请输入案件协作人" />
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<style scoped lang="postcss"></style>
