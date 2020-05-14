<template>
    <aside class="preview">
        <table class="preview-table">
            <tbody>
            <tr v-for="(i, index) in list" :key="index">
                <td v-for="(j, jindex) in i" :key="jindex" :colspan="j.width" :style="j.color"></td>
            </tr>
            </tbody>
        </table>
    </aside>
</template>

<script>
    import {eventBus} from "@/main";

    export default {
        name: "EditPreview",
        props: {
            layout: {
                type: Object,
                required: true
            },
            filled: {
                type: Boolean
            }
        },
        data() {
            return {
                list: [],
            }
        },
        created() {
            for (let i = this.list.length; i < this.layout.height; i++) {
                let row = [];
                for (let j = 0; j < this.layout.width; j++) {
                    row.push({
                        color: '',
                        width: 1
                    })
                }
                this.list.push(row);
            }
        },
        watch: {
            layout: {
                handler: function (newVal) {
                    this.list = [];
                    let row = [];
                    let rowWidth = 0;
                    for (let i = 0; i < newVal.elements.length; i++) {
                        let current = newVal.elements[i];
                        if (rowWidth + parseInt(current.width) <= this.layout.width) {
                            row.push(current);
                            rowWidth += parseInt(current.width);
                        } else {
                            for (let j = rowWidth; j < this.layout.width; j++) {
                                row.push({
                                    color: '',
                                    width: 1
                                })
                            }
                            this.list.push(row);
                            row = [];
                            rowWidth = 0;

                            if (this.list.length < this.layout.height) {
                                //berakjuk a mostanit egy új sorba ha nem fért be elsőnek
                                row.push(current);
                                rowWidth += parseInt(current.width);
                            }
                        }
                    }
                    let emptyFields = false;
                    for (let j = rowWidth; j < this.layout.width; j++) {
                        emptyFields = true;
                        row.push({
                            color: '',
                            width: 1
                        })
                    }
                    if (this.list.length < this.layout.height) {
                        this.list.push(row);
                    }
                    if(this.list.length == this.layout.height && newVal.elements.length > 0 && !emptyFields) {
                        eventBus.$emit('onTableFilled');
                    } else {
                        eventBus.$emit('onTableFree');
                    }

                    for (let i = this.list.length; i < this.layout.height; i++) {
                        row = [];
                        for (let j = 0; j < this.layout.width; j++) {
                            row.push({
                                color: '',
                                width: 1
                            })
                        }
                        this.list.push(row);
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
