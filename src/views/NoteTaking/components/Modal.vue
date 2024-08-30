<script setup lang="ts">
	import { computed, onMounted, reactive, ref, watch, type Ref } from 'vue';
	import { useModal } from '@/composition/useModal';
	import { useRequest } from '@/composition/useRequest';
	import { useForm, type Rule } from 'ant-design-vue/es/form';
	import API from '@/api';
	import { message } from 'ant-design-vue';
	import { useAppStore } from '@/stores/appStore';

	interface IState {
		recordId?: number | undefined;
		caseId?: number | undefined;
		caseType: CaseType | undefined;
		clientName?: string;
		clientId?: number | undefined;
		caseName?: string;
		opposingPartyName?: string;
		jurisdictionalCourt?: string;
		levelOfCourt?: LevelOfCourt;
		judge?: string;
		contact?: string;
		collaborator?: string;
		serviceCategory?: ServiceCategory | undefined;
		serviceContent?: string;
		count?: string;
		liaison?: string;
		remarks?: string;
	}

	const props = defineProps<{
		action: string;
		refreshTable: () => void;
	}>();

	const appStore = useAppStore();
	const title = computed(() => {
		return props.action == 'add' ? '新增记录' : '编辑记录';
	});

	const formState = reactive<IState>({
		recordId: undefined,
		caseType: undefined,
		clientId: undefined,
		clientName: undefined,
		caseName: undefined,
		opposingPartyName: '',
		jurisdictionalCourt: '',
		levelOfCourt: undefined,
		judge: '',
		contact: '',
		serviceCategory: undefined,
		serviceContent: '',
		count: '',
		liaison: '',
		remarks: '',
	});

	// const rules: Record<string, Rule[]> = reactive({
	// 	caseType: [{ required: true, message: '请选择案件类型', trigger: 'blur' }],
	// 	clientId: [{ required: true, message: '请选择客户', trigger: 'blur' }],
	// 	caseName: [{ required: true, message: '请选择案件', trigger: 'blur' }],
	// 	opposingPartyName: [{ required: true, message: '请填写对方当事人', trigger: 'blur' }],
	// 	levelOfCourt: [{ required: true, message: '请选择审级', trigger: 'blur' }],
	// 	judge: [{ required: true, message: '请填写法官姓名', trigger: 'blur' }],
	// 	contact: [{ required: true, message: '请填写法官联系方式', trigger: 'blur' }],
	// 	serviceCategory: [{ required: formState.caseType == 2, message: '请选择服务类别', trigger: 'blur' }],
	// 	serviceContent: [{ required: formState.caseType == 2, message: '请填写服务内容', trigger: 'blur' }],
	// 	count: [{ required: formState.caseType == 2, message: '请填写数量', trigger: 'blur' }],
	// 	liaison: [{ required: formState.caseType == 2, message: '请填写对接人', trigger: 'blur' }],
	// });

	const rules: Record<string, Rule[]> = reactive({
		caseType: [{ required: true, message: '请选择案件类型', trigger: 'blur' }],
	});

	const { resetFields, validate, validateInfos } = useForm(formState, rules, {
		deep: true,
		immediate: true,
	});
	const { run: addRecord, loading } = useRequest(API.addRecord, {
		manual: true,
	});
	const { run: updateRecord, loading: updateLoading } = useRequest(API.updateRecord, {
		manual: true,
	});
	const { run: getCaseListByClientId, loading: caseListLoading } = useRequest(API.getCasesByClientId, {
		manual: true,
	});
	const dateFormat = 'YYYY-MM-DD';
	const caseListOptions = ref<IState[]>([]);
	const handleValidateLitigationParams = () => {
		const { clientId, caseName } = formState;

		if (!clientId) {
			message.warning('请选择客户名称');
			return false;
		}
		if (!caseName) {
			message.warning('请选择案件信息');
			return false;
		}
		return true;
	};

	const handleValidateNonLitigationParams = () => {
		const { clientId, serviceCategory, serviceContent, count, liaison } = formState;

		if (!clientId) {
			message.warning('请选择客户名称');
			return false;
		}
		if (!serviceCategory) {
			message.warning('请选择服务目录');
			return false;
		}
		if (!serviceContent) {
			message.warning('请填写服务内容');
			return false;
		}
		if (!count) {
			message.warning('请填写服务数量');
			return false;
		}
		if (!liaison) {
			message.warning('请填写对接人');
			return false;
		}
		return true;
	};
	const {
		open,
		show: showModal,
		close: closeModal,
		submit: handleOk,
	} = useModal({
		onShow: async (data) => {
			// 处理数据回显示
			if (data) {
				console.log(`data`, data);
				const { clientId, clientName, recordId, caseType, remarks } = data;

				formState.recordId = recordId;
				formState.caseType = caseType;
				formState.remarks = remarks;
				formState.clientId = clientId;
				formState.clientName = clientName;

				if (caseType == 1) {
					const { caseName, caseId, opposingPartyName, jurisdictionalCourt, levelOfCourt, judge, contact, collaborator } = data;

					formState.caseName = caseName;
					formState.caseId = caseId;
					formState.opposingPartyName = opposingPartyName;
					formState.jurisdictionalCourt = jurisdictionalCourt;
					formState.levelOfCourt = levelOfCourt;
					formState.judge = judge;
					formState.contact = contact;
					formState.collaborator = collaborator;
					await getCaseList(clientId);
					handleSelectCase(caseId);
				} else if (caseType == 2) {
					const { serviceCategory, serviceContent, count, liaison } = data;

					formState.serviceCategory = +serviceCategory;
					formState.serviceContent = serviceContent;
					formState.count = count;
					formState.liaison = liaison;
				}
			}
		},
		onClose: () => {
			resetFields();
		},
		onSubmit: async () => {
			try {
				await validate();

				let params = { ...formState };
				const { caseType } = formState;
				if (caseType == 1) {
					const isValid = handleValidateLitigationParams();

					if (!isValid) return;
				} else if (caseType == 2) {
					const isValid = handleValidateNonLitigationParams();

					if (!isValid) return;
				}

				console.log(`params`, params);
				// 添加记录
				if (props.action == 'add') {
					const { success } = await addRecord(params);

					if (success) {
						message.success('添加成功');
						closeModal();
						props.refreshTable();
					}
				} else if (props.action === 'edit') {
					const { success } = await updateRecord(params);

					if (success) {
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

	const getCaseList = async (clientId: number) => {
		try {
			const { list } = await getCaseListByClientId({ clientId });

			caseListOptions.value = list;
		} catch (e) {
			console.log(`e`, e);
		}
	};

	const handleSelectClient = async (clientId: number) => {
		try {
			// 重新选择客户时，重置案件信息表单禁用
			if (formState.caseType == 1) {
				handleResetCaseForm();
				await getCaseList(clientId);
			} else {
				handleResetNonCaseForm();
			}
		} catch (error) {
			console.log(`error`, error);
		}
	};

	const handleSelectCase = (caseId: number) => {
		try {
			const [caseItem] = caseListOptions.value.filter((item) => {
				return item.caseId == caseId;
			});

			if (caseItem) {
				const { caseName, opposingPartyName, jurisdictionalCourt, levelOfCourt, judge, contact, collaborator } = caseItem;

				formState.caseId = caseId;
				formState.caseName = caseName;
				formState.opposingPartyName = opposingPartyName;
				formState.jurisdictionalCourt = jurisdictionalCourt;
				formState.levelOfCourt = levelOfCourt;
				formState.judge = judge;
				formState.contact = contact;
				formState.collaborator = collaborator;
			}
			// 数据回填
		} catch (error) {
			console.log(`error`, error);
		}
	};

	const handleResetCaseForm = () => {
		formState.caseName = '';
		formState.caseId = undefined;
		formState.opposingPartyName = '';
		formState.jurisdictionalCourt = '';
		formState.levelOfCourt = undefined;
		formState.judge = '';
		formState.contact = '';
		formState.collaborator = '';
		formState.remarks = '';
	};

	const handleResetNonCaseForm = () => {
		formState.serviceCategory = undefined;
		formState.serviceContent = '';
		formState.count = undefined;
		formState.liaison = '';
		formState.remarks = '';
	};

	const caseInfoDisabled = computed(() => {
		return Boolean(formState.caseId);
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
			<a-form :model="formState" :rules="rules" :labelCol="{ span: 3 }" :disabled="caseListLoading">
				<a-form-item label="案件类型" name="caseType">
					<a-select v-model:value="formState.caseType" style="width: 180px" placeholder="请选择案件类型">
						<a-select-option :value="1">诉讼案件</a-select-option>
						<a-select-option :value="2">非诉案件</a-select-option>
					</a-select>
				</a-form-item>

				<template v-if="formState.caseType && +formState.caseType == 1">
					<a-form-item label="客户名称" v-bind="validateInfos.clientId">
						<a-select v-model:value="formState.clientId" style="width: 180px" placeholder="请选择客户名称" @change="handleSelectClient">
							<a-select-option :value="item.value" v-for="item in appStore.clientSelectOptions">{{ item.text }}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="案件名称" v-bind="validateInfos.caseName">
						<a-select v-model:value="formState.caseName" style="width: 180px" placeholder="请选择案件名称" @change="handleSelectCase">
							<a-select-option :value="item.caseId" v-for="item in caseListOptions">{{ item.caseName }}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="对方当事人" v-bind="validateInfos.opposingPartyName">
						<a-input
							v-model:value="formState.opposingPartyName"
							style="width: 180px"
							placeholder="请输入对方当事人"
							:disabled="caseInfoDisabled"
						/>
					</a-form-item>
					<a-form-item label="审级" v-bind="validateInfos.levelOfCourt">
						<a-select v-model:value="formState.levelOfCourt" style="width: 180px" placeholder="请选择审级" :disabled="caseInfoDisabled">
							<a-select-option :value="1">一审</a-select-option>
							<a-select-option :value="2">二审</a-select-option>
							<a-select-option :value="3">再审</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="法官" v-bind="validateInfos.judge">
						<a-input v-model:value="formState.judge" style="width: 180px" placeholder="请输入法官姓名" :disabled="caseInfoDisabled" />
					</a-form-item>
					<a-form-item label="联系方式" v-bind="validateInfos.contact">
						<a-input v-model:value="formState.contact" style="width: 180px" placeholder="请输入手机号" :disabled="caseInfoDisabled" />
					</a-form-item>
					<a-form-item label="协作人">
						<a-input
							v-model:value="formState.collaborator"
							style="width: 180px"
							placeholder="请输入案件协作人"
							:disabled="caseInfoDisabled"
						/>
					</a-form-item>
				</template>
				<template v-else-if="formState.caseType && +formState.caseType == 2">
					<a-form-item label="客户名称" v-bind="validateInfos.clientId">
						<a-select v-model:value="formState.clientId" style="width: 180px" placeholder="请选择客户名称" @change="handleSelectClient">
							<a-select-option :value="item.value" v-for="item in appStore.clientSelectOptions">{{ item.text }}</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="服务类别" v-bind="validateInfos.serviceCategory">
						<a-select v-model:value="formState.serviceCategory" style="width: 180px" placeholder="请选择服务类别">
							<a-select-option :value="1">合同/文件审查</a-select-option>
							<a-select-option :value="2">法律咨询</a-select-option>
							<a-select-option :value="3">现场服务</a-select-option>
							<a-select-option :value="4">法律培训</a-select-option>
							<a-select-option :value="5">草拟文件</a-select-option>
						</a-select>
					</a-form-item>
					<a-form-item label="服务内容" v-bind="validateInfos.serviceContent">
						<a-textarea v-model:value="formState.serviceContent" :auto-size="{ minRows: 1, maxRows: 5 }" placeholder="请输入服务内容" />
					</a-form-item>
					<a-form-item label="数量" v-bind="validateInfos.formState">
						<a-input-number v-model:value="formState.count" min="1" style="width: 180px" placeholder="请输入数量" />
					</a-form-item>
					<a-form-item label="对接人" v-bind="validateInfos.liaison">
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
