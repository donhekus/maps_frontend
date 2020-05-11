<template>
	<aside class="preview">
		<!-- <table>
			<tr v-for="i in parseInt(layout.height)" :key="i">
				<td v-for="j in parseInt(layout.width)" :key="j">
					x
				</td>
			</tr>
		</table> -->
		<table class="preview-table">
			<tbody>
				<tr>
					<td style="background-color: tomato;"></td>
					<td style="background-color: yellowgreen;"></td>
					<td style="background-color: teal;"></td>
					<td style="background-color: violet;"></td>
				</tr>
				<tr>
					<td colspan="3" style="background-color: royalblue;"></td>
					<td></td>
				</tr>
				<tr>
					<td style="background-color: tomato;"></td>
					<td colspan="2" style="background-color: teal;"></td>
					<td style="background-color: violet;"></td>
				</tr>
			</tbody>
		</table>
	</aside>
</template>

<script>
	export default {
		name: "EditPreview",
		props: {
			layout: {
				type: Object,
				required: true
			}
		}
	}
</script>

<style scoped>

</style>
