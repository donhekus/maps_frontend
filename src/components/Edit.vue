<template>
	<main class="main">
		<edit-form :layout="layout" :filled="filled"></edit-form>
		<edit-preview :layout="layout" :filled="filled"></edit-preview>
	</main>
</template>

<script>
	import EditForm from "@/components/EditForm";
	import EditPreview from "@/components/EditPreview";
	import {eventBus} from "@/main";
	export default {
		name: "Edit",
		components: {EditPreview, EditForm},
		data() {
			return {
				layout: {
					width: 1,
					height: 1,
					elements: []
				},
				filled: false
			}
		},
		created() {
			let vm = this;
			eventBus.$on('onTableFilled', function () {
				vm.filled = true;
			});
			eventBus.$on('onTableFree', function () {
				vm.filled = false;
			});
		},
	}
</script>

<style scoped>

</style>
