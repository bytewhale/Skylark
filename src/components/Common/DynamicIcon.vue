<template>
	<component :is="name" :style="style" :class="className" />
</template>

<script>
	import { defineComponent } from 'vue';
	import {
		HighlightOutlined,
		FormOutlined,
		SmileOutlined,
		UserOutlined,
		PoweroffOutlined,
		InfoCircleOutlined,
		SafetyCertificateOutlined,
		FolderOutlined,
		MenuUnfoldOutlined,
		MenuFoldOutlined,
		FileWordOutlined,
	} from '@ant-design/icons-vue';

	export default defineComponent({
		name: 'DynamicIcon',
		components: {
			HighlightOutlined,
			FormOutlined,
			SmileOutlined,
			UserOutlined,
			PoweroffOutlined,
			InfoCircleOutlined,
			SafetyCertificateOutlined,
			FolderOutlined,
			MenuUnfoldOutlined,
			MenuFoldOutlined,
			FileWordOutlined,
		},
		props: {
			name: {
				type: String,
				default: 'SmileOutlined',
			},
			className: {
				type: String,
				default: '',
			},
			style: {
				type: Object,
				default: () => {},
			},
		},
	});
</script>
