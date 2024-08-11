<script setup lang="ts">
	import SearchForm from './components/SearchForm.vue';
	import Table from './components/Table.vue';
	import Modal from './components/Modal.vue';
	import { ref } from 'vue';
	import type { Ref } from 'vue';

	const modalRef: Ref<InstanceType<typeof Modal> | null> = ref(null);
	const action = ref('add');

	const handleOpenAddModal = () => {
		const modalInstance = modalRef.value;

		if (modalInstance) {
			modalInstance.showModal();
		}
	};
</script>

<template>
	<div class="index">
		<SearchForm @addRecord="handleOpenAddModal" />
		<a-divider />
		<Table />
		<Modal ref="modalRef" :action="action" />
	</div>
</template>

<style scoped lang="postcss"></style>
