<template>
    <div>
        <div v-for="i in parseInt(layout.height)" :key="i">
            <div v-for="j in parseInt(layout.width)" :key="j">

            </div>
        </div>
    </div>
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