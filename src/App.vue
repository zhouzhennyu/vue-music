<template>
    <m-header></m-header>
    <tab></tab>
    <router-view></router-view>
    <player></player>
</template>
<script>
import Header from '@/components/header/header';
import Tab from '@/components/tab/tab';
import Player from '@/components/player/player';
export default {
    components: {
        Tab,
        MHeader: Header,
        Player
    }
}
</script>
<style lang="less" scoped>
</style>
