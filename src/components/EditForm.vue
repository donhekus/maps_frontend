<template>
    <div>
        <label for="width">Szélesség:</label>
        <input type="number" id="width" v-model="layout.width">

        <label for="width">Magasság:</label>
        <input type="number" id="height" v-model="layout.height">

        <div v-for="element in layout.elements" :key="element.order">
            <span style="width: 20px; height: 20px; background-color: purple"></span>
            <select v-model="element.type">
                <option value="address">Cím</option>
                <option value="picture">Kép</option>
                <option value="text">Szöveg</option>
                <option value="button">Gomb</option>
            </select>
            <input type="number" v-model="element.size">
            <a href="#">X</a>
        </div>
        <a href="#" @click="addNewElement">Hozzáadás</a>
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