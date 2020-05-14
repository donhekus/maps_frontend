<template>
    <div class="edit">
        <header class="edit-header">
            <h2>Adatok</h2>
            <div class="form-group">
                <label for="name">Név:</label>
                <input id="name" type="text" v-model="layout.name">
            </div>
            <div class="flex">
                <div class="form-group">
                    <label for="width">Szélesség:</label>
                    <input id="width" type="number" min="1" v-model="layout.width">
                </div>
                <span class="edit-header-x">×</span>
                <div class="form-group">
                    <label for="height">Magasság:</label>
                    <input id="height" type="number" min="1" v-model="layout.height">
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
                <tr v-for="(element, index) in layout.elements" :key="element.order">
                    <td>
                        <div class="box-identifier" :style="element.color"></div>
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
                        <input class="box-width" type="number" value="1" min="1" :max="layout.width"
                               v-model="element.width">
                    </td>
                    <td>
                        <a class="button button-small button-red" href="#" @click="deleteElement(index)">Törlés</a>
                    </td>
                </tr>
                </tbody>
            </table>
            <a class="button button-small button-green" href="#" @click="addNewElement" v-if="!filled">Hozzáadás</a>
            <p v-if="filled">Nem fér több elem a táblázatba</p>
        </div>

        <footer class="edit-footer">
            <a class="button button-green" href="#" @click="saveLayout">Mentés és Visszalépés</a>
        </footer>
    </div>
</template>

<script>
    import {eventBus} from "@/main";

    export default {
        name: "EditForm",
        props: {
            layout: {
                type: Object,
                required: true
            },
            filled: {
                type: Boolean,
            }
        },
        data() {
            return {
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
        methods: {
            addNewElement: function () {
                let vm = this;
                vm.layout.elements.push({
                    color: 'background-color: ' + vm.colorNames[Math.floor(Math.random() * 147)],
                    type: null,
                    width: 1,
                    order: vm.layout.elements.length
                })
            },
            deleteElement: function (index) {
                this.layout.elements.splice(index, 1);
                eventBus.$emit('onTableFree');
            },
            saveLayout: function () {
                let vm = this;

                if (vm.layout.id) {
                    window.axios.put('http://api.donhekus.com/layout/' + vm.layout.id, vm.layout)
                        .then(function () {
                            vm.$router.push('/');
                        });
                } else {
                    window.axios.post('http://api.donhekus.com/layout', vm.layout)
                        .then(function () {
                            vm.$router.push('/');
                        });
                }

            }
        }
    }
</script>

<style scoped>

</style>
