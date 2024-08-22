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
	const { tableMethods, tableProps, search, pageChange, refresh: refreshTable } = useTable(API.getClientList);

	const handleOpenAddModal = () => {
		const modalInstance = modalRef.value;

		if (modalInstance) {
			modalInstance.showModal();
		}
	};
</script>

<template>
	<div class="index">
		<SearchForm @addRecord="handleOpenAddModal" @search="search" />
		<a-divider />
		<Table :tableMethods="tableMethods" :tableProps="tableProps" />
		<Modal ref="modalRef" :action="action" :refreshTable="refreshTable" />
	</div>
</template>

<style scoped lang="postcss"></style>
