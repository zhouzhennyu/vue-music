<template>
    <div class="top-list-detail">
        <music-list 
            :songs="songs"
            :title="title"
            :pic="pic"
            :loading="loading"
            rank
            >
        </music-list>
    </div>
</template>
<script>
import { getTopDetail } from '@/service/top-list.js';
import { TOP_KEY } from '@/assets/js/constant.js';
import createDetailComponent from '@/assets/js/create-detail-component.js';

export default createDetailComponent('top-list-detail', TOP_KEY, getTopDetail);
</script>
<style lang="less" scoped>
    .top-list-detail {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: @color-background;
    }
</style>