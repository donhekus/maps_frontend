<template>
	<div class="edit">
		<header class="edit-header">
			<h2>Adatok</h2>
			<div class="form-group">
				<label for="name">Név:</label>
				<input id="name" type="text">
			</div>
			<div class="flex">
				<div class="form-group">
					<label for="width">Szélesség:</label>
					<input id="width" type="number" v-model="layout.width">
				</div>
				<span class="edit-header-x">×</span>
				<div class="form-group">
					<label for="height">Magasság:</label>
					<input id="height" type="number" v-model="layout.height">
				</div>
			</div>
		</header>

		<div class="edit-content">
			<h2 class="full">Elemek</h2>
			<table>
				<thead>
					<tr>
						<th>Szín</th>
						<th>Típus</th>
						<th>Szélesség</th>
						<th>Műveletek</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="element in layout.elements" :key="element.order">
						<td>
							<div class="box-identifier" style="background-color: orange;"></div>
						</td>
						<td>
							<select class="box-type" v-model="element.type">
								<option value="address">Cím</option>
								<option value="picture">Kép</option>
								<option value="text">Szöveg</option>
								<option value="button">Gomb</option>
							</select>
						</td>
						<td>
							<input class="box-width" type="number" value="1" min="1" :max="layout.width" v-model="element.size">
						</td>
						<td>
							<a class="button button-small button-red" href="#">Törlés</a>
						</td>
					</tr>
				</tbody>
			</table>
			<a class="button button-small button-green" href="#" @click="addNewElement">Hozzáadás</a>
		</div>

		<footer class="edit-footer">
			<a class="button button-green" href="#">Mentés és Visszalépés</a>
		</footer>
	</div>
</template>

<script>
	export default {
		name: "EditForm",
		props: {
			layout: {
				type: Object,
				required: true
			}
		},
		methods: {
			addNewElement: function () {
				let vm = this;
				vm.layout.elements.push({
					color: null,
					type: null,
					size: null,
					order: vm.layout.elements.length
				})
			}
		}
	}
</script>

<style scoped>

</style>
