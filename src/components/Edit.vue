<template>
    <div>
        <edit-form :layout="layout"></edit-form>
        <edit-preview :layout="layout"></edit-preview>
    </div>
</template>

<script>
    import EditForm from "@/components/EditForm";
    import EditPreview from "@/components/EditPreview";
    export default {
        name: "Edit",
        components: {EditPreview, EditForm},
        data() {
            return {
                layout: {
                    width: 0,
                    height: 0,
                    elements: []
                }
            }
        }
    }
</script>

<style scoped>

</style>