<template>
    <div class="home">
        <h2>Főoldal</h2>
        <table>
            <thead>
            <tr>
                <th>Név</th>
                <th>Műveletek</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="elem in list" :key="elem.id">
                <td>{{ elem.name }}</td>
                <td>
                    <router-link class="button button-small button-green" :to="{ name:'edit', params: { id: elem.id }}"
                                 title="Szerkesztés">Szerkesztés
                    </router-link>
                    <a class="button button-small button-red" href="#" @click="deleteItem(elem.id)">Törlés</a>
                </td>
            </tr>
            </tbody>
        </table>
        <router-link class="button button-small button-green" :to="{ name:'edit'}" title="Szerkesztés">Hozzáadás</router-link>
    </div>
</template>

<script>
    export default {
        name: "List",
        data() {
            return {
                list: []
            }
        },
        created() {
            this.getPopups();
        },
        methods: {
            getPopups: function () {
                let vm = this;
                window.axios.get('http://api.donhekus.com/layout')
                    .then(function (response) {
                        vm.list = response.data;
                    });
            },
            deleteItem(id) {
                let vm = this;
                window.axios.post('http://api.donhekus.com/layout/' + id + '/delete')
                    .then(function () {
                        vm.getPopups();
                    });
            }
        }
    }
</script>

<style scoped>

</style>
