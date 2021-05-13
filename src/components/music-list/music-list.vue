<template>
    <div class="music-list">
        <div class="back" @click="back"><i class="icon-back"></i></div>
        <h1 class="title">{{ title }}</h1>
        <div class="bg-image"
             :style="bgImageStyle"
             ref="bgImage">
            <div class="play-btn" :style="playBtnStyle">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="filter"></div>
        </div>
        <scroll
            class="list"
            :style="scrollStyle"
            :probeType="3"
            @scroll="onScroll"
            >
            <div class="song-list-wrapper" v-loading="loading">
                <song-list :songs="songs"></song-list>
            </div>
        </scroll>
    </div>
</template>
<script>
import scroll from '@/components/base/scroll/scroll.vue';
import songList from '@/components/base/song-list/song-list.vue';

const TITLE_HEIGHT = 40;

export default {
    name: 'music-list',
    props: {
        songs: {
            type: Array,
            default() {
                return []
            }
        },
        title: String,
        pic: String,
        loading: Boolean
    },
    data() {
        return {
            scrollY: 0,
            bgImageHeight: 0,
            maxTranslateY: 0
        }
    },
    components: {
        scroll,
        songList
    },
    computed: {
        bgImageStyle() {
            let zIndex = 0;
            let paddingTop = '70%';
            let height = 0;
            if (this.scrollY > this.maxTranslateY) {
                zIndex = 10;
                paddingTop = 0;
                height = `${TITLE_HEIGHT}px`
            }
            let scale = 1;
            if (this.scrollY < 0) {
                scale = 1 + Math.abs(this.scrollY / this.bgImageHeight);
            }
            return {
                zIndex,
                paddingTop,
                height,
                backgroundImage: `url(${this.pic})`,
                transform: `scale(${scale})`
            }
        },
        scrollStyle() {
            return {
                top: `${this.bgImageHeight}px`
            }
        },
        playBtnStyle() {
            let display = ''
            if (this.scrollY > this.maxTranslateY) {
                display = 'none';
            }
            return {
                display
            }
    }
    },
    methods: {
        onScroll(pos) {
            this.scrollY = -pos.y;
            
        },
        back() {
            this.$router.back();
        }
    },
    mounted() {
        this.bgImageHeight = this.$refs.bgImage.clientHeight;
        this.maxTranslateY = this.bgImageHeight - TITLE_HEIGHT;
    },
    created() {
    }
}
</script>
<style lang="less" scoped>
    .music-list {
        position: relative;
        height: 100%;
        .back {
            position: absolute;
            top: 0;
            left: 6px;
            z-index: 30;
            .icon-back {
                display: block;
                padding: 10px;
                font-size: 22px;
                color: #ffcd32;
            }
        }
        .title {
            position: absolute;
            top: 0;
            width: 100%;
            font-size: @font-size-large;
            color: @color-text;
            text-align: center;
            line-height: 40px;
            z-index: 20;
            .no-wrap();
        }
        .bg-image {
            position: relative;
            width: 100%;
            transform-origin: top;
            background-size: cover;
            z-index: 0;
            .play-btn {
                position: absolute;
                bottom: 20px;
                left: 50%;
                z-index: 20;
                margin-left: -67.5px;
                box-sizing: border-box;
                width: 135px;
                padding: 7px 0;
                text-align: center;
                border: 1px solid @color-theme;
                color: @color-theme;
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
        }
        .list {
            position: absolute;
            bottom: 0;
            width: 100%;
            z-index: 0;
            // overflow: hidden;
            .song-list-wrapper {
                padding: 20px 30px;
                background: @color-background;
            }
        }
    }
</style>