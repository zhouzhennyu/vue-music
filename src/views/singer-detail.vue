<template>
    <div class="singer-detail">
        <music-list 
            :songs="songs"
            :title="title"
            :pic="pic"
            :loading="loading"
            >
        </music-list>
    </div>
</template>
<script>
import { getSingerDetail } from '@/service/singer.js';
import { processSongs } from '@/service/song.js'
import MusicList from '@/components/music-list/music-list';
import storage from 'good-storage';
import { SINGER_KEY } from '@/assets/js/constant.js';
export default {
    name: 'singer-detail',
    props: {
        singer: {
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
        computedSinger() {
            let ret = null;
            const singer = this.singer;
            if (singer) {
                ret = singer;
            } else {
                const catchSinger = storage.session.get(SINGER_KEY);
                const mid = this.$route.params.id;
                if (catchSinger && catchSinger.mid === mid) {
                    ret = catchSinger;
                }
            }
            return ret;
        },
        title() {
            const computedSinger = this.computedSinger;
            return computedSinger && computedSinger.name;
        },
        pic() {
            const computedSinger = this.computedSinger;
            return computedSinger && computedSinger.pic;
        }
    },
    async created() {
        if (!this.computedSinger) {
            const path = this.$route.matched[0].path;
            this.$router.push({ path });
            return 
        }
        const result = await getSingerDetail(this.computedSinger);
        this.songs = await processSongs(result.songs);
        this.loading = false;
    }
}
</script>
<style lang="less" scoped>
    .singer-detail {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: @color-background;
    }
</style>