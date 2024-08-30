<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import { UserOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons-vue';
	import API from '@/api';
	import { useAuthStore } from '@/stores/authStore';

	interface FormState {
		phone: string;
		password: string;
		userName?: string;
	}
	const formState = reactive<FormState>({
		phone: '',
		password: '',
		userName: '',
	});
	const isLoginMode = ref<boolean>(true);

	const onFinish = (values: any) => {
		if (isLoginMode.value) {
			handleLogin();
		} else {
			handleRegister();
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	const disabled = computed(() => {
		return !(formState.phone && formState.password);
	});
	const formTitle = computed(() => {
		return isLoginMode.value ? '登录' : '注册';
	});
	const formTips = computed(() => {
		return isLoginMode.value ? '还没有账号？' : '已有账号？';
	});
	const formTipsBtnTxt = computed(() => {
		return isLoginMode.value ? '立即注册' : '去登录';
	});

	const handleLogin = async () => {
		try {
			const { phone, password } = formState;
			useAuthStore().login({
				phone,
				password,
			});
		} catch (error) {
			console.log(`error`, error);
		}
	};
	const handleRegister = async () => {
		try {
			const { userName, phone, password } = formState;
			const { success } = await API.register({
				userName,
				phone,
				password,
			});

			if (success) {
				handleLogin();
			}
		} catch (error) {
			console.log(`error`, error);
		}
	};
</script>

<template>
	<div class="login">
		<div class="login-form">
			<h5>{{ formTitle }}</h5>
			<a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed" :labelCol="{ span: 4 }">
				<a-form-item label="用户名" name="userName" :rules="[{ required: true, message: '请输入用户名!' }]" v-if="!isLoginMode">
					<a-input v-model:value="formState.userName" size="large">
						<template #prefix>
							<UserOutlined class="site-form-item-icon" />
						</template>
					</a-input>
				</a-form-item>
				<a-form-item label="手机号" name="phone" :rules="[{ required: true, message: '请输入手机号!' }]">
					<a-input v-model:value="formState.phone" size="large">
						<template #prefix> <PhoneOutlined class="site-form-item-icon" /> </template>
					</a-input>
				</a-form-item>

				<a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
					<a-input-password v-model:value="formState.password" size="large">
						<template #prefix>
							<LockOutlined class="site-form-item-icon" />
						</template>
					</a-input-password>
				</a-form-item>

				<a-form-item>
					<a-button :disabled="disabled" block type="primary" size="large" html-type="submit" class="login-form-button">{{
						isLoginMode ? '登录' : '注册/登录'
					}}</a-button>
				</a-form-item>
			</a-form>
			<div class="login-form-tips">
				{{ formTips
				}}<a-button
					type="link"
					size="small"
					@click="
						() => {
							isLoginMode = !isLoginMode;
						}
					"
					>{{ formTipsBtnTxt }}</a-button
				>
			</div>
		</div>
	</div>
</template>

<style scoped lang="postcss">
	.login {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		background: url('@/assets/images/mountain.jpg') no-repeat center center;
		background-size: cover;
		&-form {
			width: 428px;
			padding: 24px;
			font-size: 14px;
			background-color: white;
			border-radius: 8px;
			h5 {
				font-size: 20px;
				font-weight: 500;
				margin-bottom: 16px;
			}
			&-tips {
				display: flex;
				justify-content: flex-end;
			}
		}
	}
</style>
