<template>
    <div style="height: 100vh;">
        <l-map
                style="height: 100vh; width: 100vw"
                :zoom="zoom"
                :center="center"
        >
            <l-tile-layer :url="url"></l-tile-layer>
        </l-map>
    </div>
</template>

<script>
    import {LMap, LTileLayer} from 'vue2-leaflet';
    export default {
        name: "Maps.vue",
        components: {
            LMap,
            LTileLayer,
        },
        data () {
            return {
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                zoom: 11,
                center: [47.5622775, 18.9888979],
                bounds: null,

                layout: [],

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
    }
</script>

<style scoped>

</style>