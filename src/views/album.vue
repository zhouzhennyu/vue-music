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
import { getAlbum } from '@/service/recommend.js';
import { ALBUM_KEY } from '@/assets/js/constant.js';
import createDetailComponent from '@/assets/js/create-detail-component.js';

export default createDetailComponent('album', ALBUM_KEY, getAlbum);
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