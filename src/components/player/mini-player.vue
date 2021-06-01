<template>
    <transition name="mini">
        <div
            class="mini-player" 
            v-show="!fullScreen"
            @click="changeFullScreen">
            <div class="cd-wrapper">
                <div class="cd" ref="cdRef">
                    <img ref="cdimgRef" :class="cdClass" :src="currentSong.pic" alt="">
                </div>
            </div>
            <div class="song-info" ref="minSlideWrapperRef">
                <div class="min-slide-group">
                    <div
                        class="slide-page"
                        v-for="item in playList"
                        :key="item.id">
                        <h2 class="name">{{ item.name }}</h2>
                        <p class="desc">{{ item.singer }}</p>
                    </div>
                </div>
            </div>
            <div class="control">
                <progress-circle
                    :radius="32"
                    :progress="progress"
                    >
                    <i
                        class="icon-mini"
                        :class="miniPlayIcon"
                        @click.stop="togglePlay"
                    ></i>
                </progress-circle>
            </div>
            <div class="control" @click.stop="showPlaylist">
                <i class="icon-playlist"></i>
            </div>
            <playlist ref="playlistRef"></playlist>
        </div>
    </transition>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import useCd from './use-cd';
import useMinSlide from './use-min-slide';
import ProgressCircle from './progress-circle'
import Playlist from './playlist.vue';
export default {
    name: 'mini-player',
    props: {
        togglePlay: Function,
        progress: {
            type:Number,
            default: 0
        }
    },
    components: {
        Playlist,
        ProgressCircle
    },
    setup() {
        const playlistRef = ref(null);
        const store = useStore();

        const currentSong = computed(() => store.getters.currentSong);
        const fullScreen = computed(() => store.state.fullScreen);
        const playing = computed(() => store.state.playing);
        const playList = computed(() => store.state.playList);

        const { cdClass, cdRef, cdimgRef } = useCd();
        const { minSlideWrapperRef } = useMinSlide();

        const miniPlayIcon = computed(() => {
            return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
        })
        function changeFullScreen() {
            store.commit('setFullScreen', true)
        }
        function showPlaylist() {
            playlistRef.value.show();
        }

        return {
            showPlaylist,
            currentSong,
            fullScreen,
            cdClass,
            cdRef,
            cdimgRef,
            changeFullScreen,
            miniPlayIcon,
            playList,
            minSlideWrapperRef,
            playlistRef
        }
    }
}
</script>
<style lang="less" scoped>
    .mini-player {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: #333;
        display: flex;
        align-items: center;
        z-index: 180;
        .cd-wrapper {
            width: 40px;
            height: 40px;
            padding: 0 10px 0 20px;
            .cd {
                width: 100%;
                height: 100%;
            }
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                &.playing {
                    animation: rotate 10s linear infinite;
                }
            }
        }
        .song-info {
            flex: 1;
            overflow: hidden;
            .min-slide-group {
                overflow: hidden;
                white-space: nowrap;
                .slide-page {
                    width: 100%;
                    display: inline-block;
                }
            }
            .name {
                margin-bottom: 8px;
                .no-wrap();
                font-size: 14px;
                color: #fff;
            }
            .desc {
                .no-wrap();
                font-size: 12px;
                color: rgba(255, 255, 255, 0.3);
            }
        }
        &.mini-enter-active, &.mini-leave-active {
            transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
        }
        &.mini-enter-from, &.mini-leave-to {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
        }
        .control {
            width: 30px;
            padding: 0 10px;
            .icon-playlist {
                position: relative;
                top: -2px;
                font-size: 28px;
                color: @color-theme-d;
            }
            .icon-mini {
                color: @color-theme-d;
                font-size: 32px;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        
    }
</style>