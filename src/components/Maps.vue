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
                zoom: 3,
                center: [47.413220, -1.219482],
                bounds: null
            };
        },
    }
</script>

<style scoped>

</style>