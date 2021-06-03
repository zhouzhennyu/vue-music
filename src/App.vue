<template>
    <m-header></m-header>
    <tab></tab>
    <router-view :style="viewStyle"></router-view>
    <player></player>
</template>
<script>
import Header from '@/components/header/header';
import Tab from '@/components/tab/tab';
import Player from '@/components/player/player';
import { mapState } from 'vuex';
export default {
    components: {
        Tab,
        MHeader: Header,
        Player
    },
    computed: {
        ...mapState([
            'playList'
        ]),
        viewStyle() {
            const bottom = this.playList.length ? '60px' : ''
            return {
                bottom
            }
        }
    }
}
</script>
<style lang="less" scoped>
</style>
