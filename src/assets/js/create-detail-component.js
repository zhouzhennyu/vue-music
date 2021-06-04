import storage from 'good-storage';
import { processSongs } from '@/service/song.js'
import MusicList from '@/components/music-list/music-list';

export default function createDetailComponent(name, key, fetch) {
    return {
        name,
        props: {
            data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        components: {
            MusicList
        },
        data() {
            return {
                songs: [],
                loading: true
            }
        },
        computed: {
            computedData() {
                let ret = null;
                const data = this.data;
                if (data) {
                    ret = data;
                } else {
                    const catched = storage.session.get(key);
                    const routeId = this.$route.params.id;
                    if (catched && (catched.mid || catched.id + '') === routeId) {
                        ret = catched;
                    }
                }
                return ret;
            },
            title() {
                const computedData = this.computedData;
                return computedData && (computedData.name || computedData.title);
            },
            pic() {
                const computedData = this.computedData;
                return computedData && computedData.pic;
            }
        },
        async created() {
            const data = this.computedData;
            if (!data) {
                const path = this.$route.matched[0].path;
                this.$router.push({ path });
                return 
            }
            const result = await fetch(data);
            this.songs = await processSongs(result.songs);
            this.loading = false;
        }
    }
}