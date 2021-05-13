<template>
    <ul class="songs-list">
        <li class="songs-item" v-for="item in songs" :key="item.id">
            <div class="name">{{ item.name }}</div>
            <p class="desc">{{ item.singer }}·{{ item.album }}</p>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'song-list',
    props: {
        songs: {
            type: Array,
            default() {
                return []
            }
        }
    },
    created(){
        console.log('songs-list', this.songs);
    }
}
</script>
<style lang="less" scoped>
    .songs-list {
        .songs-item {
            height: 64px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
            font-size: @font-size-medium;
            .name {
                .no-wrap();
                color: @color-text
            }
            .desc {
                .no-wrap();
                margin-top: 8px;
                color: @color-text-d;
            }
        }
    }
</style>