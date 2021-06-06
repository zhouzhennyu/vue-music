<template>
    <div class="user-center" v-no-result:[noResultText]="noResult">
        <div class="back" @click="back"><i class="icon-back"></i></div>
        <div class="swiches-wrapper">
            <switches :items="['我喜欢的', '最近播放']" v-model="currentIndex"></switches>
        </div>
        <div
            class="play-btn"
            v-if="currentList.length"
            @click="random"
        >
            <i class="icon-play"></i>
            <span class="text">随机播放全部</span>
        </div>
        <div class="list-wrapper">
            <scroll class="list-scroll" v-if="currentIndex === 0">
                <song-list :songs="favoriteList" @select="selectSong"></song-list>
            </scroll>
            <scroll class="list-scroll" v-if="currentIndex === 1">
                <song-list :songs="playHistory" @select="selectSong"></song-list>
            </scroll>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Switches from '@/components/base/switches/switches.vue';
import SongList from '@/components/base/song-list/song-list.vue';
import Scroll from '@/components/wrap-scroll'

export default {
    components: {
        Switches,
        SongList,
        Scroll
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    computed: {
        ...mapState([
            'favoriteList',
            'playHistory'
        ]),
        noResult() {
            return this.currentIndex === 0 ? !this.favoriteList.length : !this.playHistory.length
        },
        noResultText() {
            return this.currentIndex === 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
        },
        currentList() {
            return this.currentIndex === 0 ? this.favoriteList : this.playHistory
        },
    },
    methods: {
        ...mapActions([
            'addSong',
            'randomPlay'
        ]),
        selectSong({ song }) {
            this.addSong(song);
        },
        random() {
            this.randomPlay(this.currentList)
        },
        back() {
            this.$router.back();
        }
    }
}
</script>
<style lang="less" scoped>
    .user-center {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
        width: 100%;
        background: #222;
        .back {
            position: absolute;
            top: 0;
            left: 6px;
            z-index: 50;
            .icon-back {
                display: block;
                padding: 10px;
                font-size: 22px;
                color: #ffcd32;
            }
        }
        .swiches-wrapper {
            margin: 10px 0 30px 0;
        }
        .play-btn {
            box-sizing: border-box;
            width: 135px;
            padding: 7px 0;
            margin: 0 auto;
            text-align: center;
            border: 1px solid @color-text-l;
            color: @color-text-l;
            border-radius: 100px;
            font-size: 0;
            .icon-play {
                display: inline-block;
                vertical-align: middle;
                margin-right: 6px;
                font-size: @font-size-medium-x;
            }
            .text {
                display: inline-block;
                vertical-align: middle;
                font-size: @font-size-small;
            }
        }
        .list-wrapper {
            position: absolute;
            top: 110px;
            bottom: 0;
            width: 100%;
            padding: 20px 30px;
            .list-scroll {
                height: 100%;
                overflow: hidden;
            }
        }
    }
</style>