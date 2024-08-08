<script setup lang="ts">
	import SearchForm from './components/SearchForm.vue';
	import Table from './components/Table.vue';
	import Modal from './components/Modal.vue';
</script>

<template>
	<div class="index">
		<SearchForm />
		<a-divider />
		<Table />
		<Modal />
	</div>
</template>

<style scoped lang="postcss"></style>
