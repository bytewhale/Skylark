<script setup lang="ts">
	import SearchForm from './components/SearchForm.vue';
	import Table from './components/Table.vue';
	import Modal from './components/Modal.vue';
	import { ref } from 'vue';
	import type { Ref } from 'vue';
	import { useTable } from '@/composition/useTable';
	import API from '@/api';

	const modalRef: Ref<InstanceType<typeof Modal> | null> = ref(null);
	const action = ref('add');
	const { tableProps, search, download, pageChange, refresh: refreshTable } = useTable(API.getRecordList);

	const handleOpenAddModal = () => {
		const modalInstance = modalRef.value;
		action.value = 'add';
		if (modalInstance) {
			modalInstance.showModal();
		}
	};

	const handleOpenEditModal = (record: any) => {
		const modalInstance = modalRef.value;
		action.value = 'edit';

		if (modalInstance) {
			modalInstance.showModal(record);
		}
	};
</script>

<template>
	<div class="index">
		<SearchForm @addRecord="handleOpenAddModal" @search="search" @download="download" />
		<a-divider />
		<Table :tableProps="tableProps" :pageChange="pageChange" @edit="handleOpenEditModal" />
		<Modal ref="modalRef" :action="action" :refreshTable="refreshTable" />
	</div>
</template>

<style scoped lang="postcss"></style>
