<template>
    <ul class="songs-list">
        <li class="songs-item" 
            v-for="(item, index) in songs" 
            :key="item.id" 
            @click="selectItem(item, index)"
        >
            <div class="rank" v-if="rank">
                <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
            </div>
            <div class="song-info">
                <div class="name">{{ item.name }}</div>
                <p class="desc">{{ item.singer }}·{{ item.album }}</p>
            </div>
            
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
        },
        rank: {
            type: Boolean,
            default: false
        }
    },
    emits: ['select'],
    methods: {
        selectItem(song, index) {
            this.$emit('select', { song, index })
        },
        getRankCls(index) {
            if (index <= 2) {
                return `icon icon${index}`;
            } else {
                return 'text'
            }
        },
        getRankText(index) {
            if (index > 2) {
                return index + 1;
            }
        }
    },
    created(){
    }
}
</script>
<style lang="less" scoped>
    .songs-list {
        .songs-item {
            height: 64px;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            font-size: @font-size-medium;
             .rank {
                flex: 0 0 25px;
                width: 25px;
                margin-right: 20px;
                text-align: center;
                .icon {
                    display: inline-block;
                    width: 25px;
                    height: 24px;
                    background-size: 25px 24px;
                &.icon0 {
                    background-image: url('./first@2x.png');
                }
                &.icon1 {
                    background-image: url('./second@2x.png');
                }
                &.icon2 {
                    background-image: url('./third@2x.png');
                }
                }
                .text {
                    color: @color-theme;
                    font-size: @font-size-large;
                }
            }
            .song-info {
                flex: 1;
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
    }
</style>