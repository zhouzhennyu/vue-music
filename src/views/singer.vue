<template>
    <div class="singer-container" v-loading:[loadingText]="!singerLists.length">
        <index-list
            :data='singerLists'
            @select="selectSinger"
        ></index-list>
        <router-view :singer="selectdSinger"></router-view>
    </div>
</template>
<script>
import { getSingerList } from '@/service/singer.js';
import indexList from '@/components/base/index-list/index-list';
export default {
    name: 'singer',
    data() {
        return {
            singerLists: [],
            selectdSinger: null,
            loadingText: '加载中'
        }
    },
    components: {
        indexList
    },
    methods: {
        selectSinger(singer) {
            console.log('singer-item', singer);
            this.selectdSinger = singer;
            this.$router.push({
                path: `/singer/${singer.mid}`
            })
        }
    },
    async created() {
        const result = await getSingerList();
        this.singerLists = result.singers;
    }
}
</script>
<style lang="less" scoped>
    .singer-container {
        position: fixed;
        top: 88px;
        width: 100%;
        bottom: 0;
        .scroll-content {
            height: 100%;
            overflow: hidden;
        }
        .singer-list {
            .singer-title {

            }
        }
    }
</style>