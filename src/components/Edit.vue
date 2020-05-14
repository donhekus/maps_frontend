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
					name: '',
					width: 1,
					height: 1,
					elements: []
				},
				filled: false,
				colorNames: [
					'AliceBlue',
					'AntiqueWhite',
					'Aqua',
					'Aquamarine',
					'Azure',
					'Beige',
					'Bisque',
					'Black',
					'BlanchedAlmond',
					'Blue',
					'BlueViolet',
					'Brown',
					'BurlyWood',
					'CadetBlue',
					'Chartreuse',
					'Chocolate',
					'Coral',
					'CornflowerBlue',
					'Cornsilk',
					'Crimson',
					'Cyan',
					'DarkBlue',
					'DarkCyan',
					'DarkGoldenRod',
					'DarkGray',
					'DarkGreen',
					'DarkGrey',
					'DarkKhaki',
					'DarkMagenta',
					'DarkOliveGreen',
					'DarkOrange',
					'DarkOrchid',
					'DarkRed',
					'DarkSalmon',
					'DarkSeaGreen',
					'DarkSlateBlue',
					'DarkSlateGray',
					'DarkSlateGrey',
					'DarkTurquoise',
					'DarkViolet',
					'DeepPink',
					'DeepSkyBlue',
					'DimGray',
					'DimGrey',
					'DodgerBlue',
					'FireBrick',
					'FloralWhite',
					'ForestGreen',
					'Fuchsia',
					'Gainsboro',
					'GhostWhite',
					'Gold',
					'Goldenrod',
					'Gray',
					'Green',
					'GreenYellow',
					'Grey',
					'HoneyDew',
					'HotPink',
					'IndianRed',
					'Indigo',
					'Ivory',
					'Khaki',
					'Lavender',
					'LavenderBlush',
					'LawnGreen',
					'LemonChiffon',
					'LightBlue',
					'LightCoral',
					'LightCyan',
					'LightGoldenRodYellow',
					'LightGray',
					'LightGreen',
					'LightGrey',
					'LightPink',
					'LightSalmon',
					'LightSeaGreen',
					'LightSkyBlue',
					'LightSlateGray',
					'LightSlateGrey',
					'LightSteelBlue',
					'LightYellow',
					'Lime',
					'LimeGreen',
					'Linen',
					'Magenta',
					'Maroon',
					'MediumAquaMarine',
					'MediumBlue',
					'MediumOrchid',
					'MediumPurple',
					'MediumSeaGreen',
					'MediumSlateBlue',
					'MediumSpringGreen',
					'MediumTurquoise',
					'MediumVioletRed',
					'MidnightBlue',
					'MintCream',
					'MistyRose',
					'Moccasin',
					'NavajoWhite',
					'Navy',
					'OldLace',
					'Olive',
					'OliveDrab',
					'Orange',
					'OrangeRed',
					'Orchid',
					'PaleGoldenRod',
					'PaleGreen',
					'PaleTurquoise',
					'PaleVioletRed',
					'PapayaWhip',
					'PeachPuff',
					'Peru',
					'Pink',
					'Plum',
					'PowderBlue',
					'Purple',
					'RebeccaPurple',
					'Red',
					'RosyBrown',
					'RoyalBlue',
					'SaddleBrown',
					'Salmon',
					'SandyBrown',
					'SeaGreen',
					'SeaShell',
					'Sienna',
					'Silver',
					'SkyBlue',
					'SlateBlue',
					'SlateGray',
					'SlateGrey',
					'Snow',
					'SpringGreen',
					'SteelBlue',
					'Tan',
					'Teal',
					'Thistle',
					'Tomato',
					'Turquoise',
					'Violet',
					'Wheat',
					'White',
					'WhiteSmoke',
					'Yellow',
					'YellowGreen'
				]
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

			if(vm.$route.params['id']) {
				vm.getLayout(vm.$route.params.id);
			}
		},
		methods: {
			getLayout: function (id) {
				let vm = this;
				window.axios.get('http://api.donhekus.com/layout/' + id)
					.then(function (response) {
						vm.layout = response.data;
						for(let i = 0; i < vm.layout.elements.length; i++) {
							vm.layout.elements[i]['color'] = 'background-color: ' + vm.colorNames[Math.floor(Math.random() * 147)];
						}
					});
			}
		}
	}
</script>

<style scoped>

</style>
