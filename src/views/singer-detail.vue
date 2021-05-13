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
        title() {
            return this.singer && this.singer.name;
        },
        pic() {
            return this.singer && this.singer.pic;
        }
    },
    async created() {
        const result = await getSingerDetail(this.singer);
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