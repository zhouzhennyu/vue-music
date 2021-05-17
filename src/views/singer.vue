<template>
    <div class="singer-container" v-loading:[loadingText]="!singerLists.length">
        <index-list
            :data='singerLists'
            @select="selectSinger"
        ></index-list>
        <router-view v-slot="{ Component }">
            <transition appear name="slide">
                <component :is="Component" :singer="selectdSinger" />
            </transition>
        </router-view>
    </div>
</template>
<script>
import { getSingerList } from '@/service/singer.js';
import indexList from '@/components/base/index-list/index-list';
import storage from 'good-storage';
import { SINGER_KEY } from '@/assets/js/constant.js';
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
            this.selectdSinger = singer;
            storage.session.set(SINGER_KEY, singer);
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