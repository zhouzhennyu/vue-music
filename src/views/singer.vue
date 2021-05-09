<template>
    <div class="singer-container" v-loading:[loadingText]="!singerLists.length">
        <index-list :data='singerLists'></index-list>
    </div>
</template>
<script>
import { getSingerList } from '@/service/singer.js';
import indexList from '@/components/base/index-list/index-list';
export default {
    data() {
        return {
            singerLists: [],
            loadingText: '加载中'
        }
    },
    components: {
        indexList
    },
    async created() {
        const result = await getSingerList();
        this.singerLists = result.singers;
        console.log('result.singers', result.singers);
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