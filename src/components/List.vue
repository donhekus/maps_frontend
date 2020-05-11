<template>
    <table>
        <thead>
            <tr>
                <th>Név</th>
                <th>Műveletek</th>
            </tr>
        </thead>
        <tbody>
            <tr></tr>
        </tbody>
    </table>
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