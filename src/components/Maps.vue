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
                        data: [
                            'Ez egy szép cím',
                            'Seduced wisest unspoken tree image mortality illusion binding Buckland perils. Galeton treachery source white sworn anymore river-folk survival rid? Meeting spears worry sorcerer thunderstorm Halflings no. Tunnels disturb rot Peregrin altogether weather. Worrywort rascals murder waybread undeceased toes. Undómiel unnoticed fails enter helpless trimming hall hundreds convinced lit lives hero. All right, then. Keep your secrets. Straight commoners few circles batses rope Azog fend. Doing authority far solitude months Legolas tries slight midday rubbish facing. Sit encourage handy tree ancient battered iron sprinters escapes darling!\n' +
                            'Athelas devils concealed moment scouts brightest help outrun. Truth famousest paws account tingle Noldorin ginger faithless. Bars bled current effect awfully succumb Lake-town ordinary sorcerer strain caution. Painted Saruman retribution fixed treachery forgave useless sweeter. You cannot hide. I see you. There is no life in the void. Only death. We\'ve deadliest Witchking maiden safe stare been. Reaction banner Barahir world\'s spoke. Feeling careful among grave Éowyn? Fallen Goblins matters unto waste.\n' +
                            'Elf-maiden dumping hutch? Ha Bucklebury turns should\'ve towers king\'s consistency nobly boarded? Elderly chap. Big grey beard, pointy hat. Rivers meaty barren a mist warmth thinking Witchking? Heathen climbing stories armoury Treebeard drown ripe insult. Worm keepsakes goat cooking Elrond silverware meadow of stone limited brew. Warmongering Misty Mountain forces certainly hunter settlement thoughts. Rationed Aragorn burst nature joined grumpy livery handling maps forth! Isengard venerable selling.',
                            'https://randomwordgenerator.com/img/picture-generator/57e7d0454b57ac14f1dc8460962e33791c3ad6e04e50744172297cd59344c5_640.jpg'
                        ]
                    },
                    {
                        center: [47.646950, 18.816972],
                        data: [
                            'Ez egy még szebb cím',
                            'Crying breeding bonds news hid bloom Elfling pieces powerless completely. Let the Ring-bearer decide. Seduced Númenor granny raw hasn\'t stay sure. Wear loses Dwarf! Lied poured Isen maggot generation twiddle jewel. Coast former s snaffle paths defeated necessary legendary Gorgoroth slunk. Sam sun handsome melt treacherous minute he\'s. Characters advantage fox examine obvious sweet-taking ones mash gracious Gandalf\'s tracks?\n' +
                            'Slinker approaching J.R.R. Tolkien speak save southern eluded predicted miss? Squeaked kinsman Worrywort bearer! Unheard-of flurgaburburhobbit streaming assure liable Goblin-town ignore note owed. There and Back Again. A Hobbit\'s Tale. Warn than camp learn Thofin was. Decisions boys promised finer content disband Argonath prosaic else. Undómiel tide grasped explain place store! Bag-end rose athletic happy forsaken gate serves number yet.\n' +
                            'Dealings Mungo\'s caves remains waterman resolved appeared? Even the smallest person can change the course of the future. Stars mother\'s serve also utterly delays exhausted Erebor. Delved machine Haradrim question veiled undoubtedly. Returned winter\'s circus maggoty renewed Thorin! Smeagol\'s sprite stepped pays burn boots star decisions smoked. Dominate necessary arrangements slaves amazing turning earned absurd becoming Rohan! Pointy-ear Peregrin foolish obstinate things.',
                            'https://randomwordgenerator.com/img/picture-generator/5fe4d2404856b10ff3d8992cc12c30771037dbf852547941742673d79f4f_640.jpg'
                        ]
                    }
                ]
            };
        },
        created() {
            let vm = this;
            window.axios.get('http://api.donhekus.com/maps/' + this.$route.params.name)
                .then(function (response) {
                    vm.layout = response.data;
                    for (let i = 0; i < vm.markers.length; i++) {
                        vm.fillLayoutWithData(vm.layout, vm.markers[i].data);
                    }
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