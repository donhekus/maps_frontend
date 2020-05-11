<template>
	<div class="home">
		<h2>Főoldal</h2>
		<table>
			<thead>
				<tr>
					<th>Név</th>
					<th>Műveletek</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Első számú element</td>
					<td>
						<a class="button button-small button-green" href="#">Szerkesztés</a>
						<a class="button button-small button-red" href="#">Törlés</a>
					</td>
				</tr>
			</tbody>
		</table>
		<a class="button button-small button-green" href="#" @click="addNewElement">Hozzáadás</a>
	</div>
</template>

<script>
	export default {
		name: "List",
		data() {
			return {
				listData: []
			}
		},
		created() {
			let vm = this;
			vm.getPopups();
		},
		methods: {
			getPopups: function () {
				let vm = this;
				window.axios.get('http://maps.test/')
					.then(function (response) {
						vm.listData = response.data;
					})
					.catch(function () {
					});
			}
		}
	}
</script>

<style scoped>

</style>
