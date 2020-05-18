<template>
    <div style="height: 100vh;">
        <l-map
                style="height: 100vh; width: 100vw"
                :zoom="zoom"
                :center="center"
        >
            <l-tile-layer :url="url"></l-tile-layer>

            <l-marker v-for="marker in markers" :lat-lng="marker.center" :key="marker.center">
                <l-popup :options="{ maxWidth: 'auto' }">
                    <table class="preview-table preview-table-map">
                        <tbody>
                        <tr v-for="(i, index) in list" :key="index">
                            <td v-for="(j, jindex) in i" :key="jindex" :colspan="j.width">{{ j.data }}</td>
                        </tr>
                        </tbody>
                    </table>
                </l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';

    export default {
        name: "Maps.vue",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup
        },
        data () {
            return {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                zoom: 11,
                center: [47.5622775, 18.9888979],
                bounds: null,

                layout: [],
                list: [],

                markers: [
                    {
                        center: [47.473621, 19.059674],
                        data: []
                    },
                    {
                        center: [47.646950, 18.816972],
                        data: []
                    }
                ]
            };
        },
        created() {
            let vm = this;
            window.axios.get('http://api.donhekus.com/maps/' + this.$route.params.name)
                .then(function (response) {
                    vm.layout = response.data;
                });
        },
        methods: {
            fillLayoutWithData: function (layout, data) {
                let vm = this;
                vm.list = [];
                let row = [];
                let rowWidth = 0;
                for (let i = 0; i < vm.layout.elements.length; i++) {
                    let current = vm.layout.elements[i];
                    current['data'] = data[i] ? data[i] : '';
                    if (rowWidth + parseInt(current.width) <= vm.layout.width) {
                        row.push(current);
                        rowWidth += parseInt(current.width);
                    } else {
                        for (let j = rowWidth; j < layout.width; j++) {
                            row.push({
                                color: '',
                                width: 1
                            })
                        }
                        vm.list.push(row);
                        row = [];
                        rowWidth = 0;

                        if (vm.list.length < vm.layout.height) {
                            //berakjuk a mostanit egy új sorba ha nem fért be elsőnek
                            row.push(current);
                            rowWidth += parseInt(current.width);
                        }
                    }
                }
                for (let j = rowWidth; j < vm.layout.width; j++) {
                    row.push({
                        color: '',
                        width: 1
                    })
                }
                if (vm.list.length < vm.layout.height) {
                    vm.list.push(row);
                }

                for (let i = vm.list.length; i < vm.layout.height; i++) {
                    row = [];
                    for (let j = 0; j < vm.layout.width; j++) {
                        row.push({
                            color: '',
                            width: 1
                        })
                    }
                    vm.list.push(row);
                }
            }
        }
    }
</script>

<style scoped>
</style>