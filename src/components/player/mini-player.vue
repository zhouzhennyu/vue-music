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
            <div class="song-info">
                <h2 class="name">{{ currentSong.name }}</h2>
                <p class="desc">{{ currentSong.singer }}</p>
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
            <div></div>
        </div>
    </transition>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import useCd from './use-cd';
import ProgressCircle from './progress-circle'
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
        ProgressCircle
    },
    setup() {
        const store = useStore();

        const currentSong = computed(() => store.getters.currentSong);
        const fullScreen = computed(() => store.state.fullScreen);
        const playing = computed(() => store.state.playing);
        const { cdClass, cdRef, cdimgRef } = useCd();

        const miniPlayIcon = computed(() => {
            return playing.value ? 'icon-pause-mini' : 'icon-play-mini'
        })
        function changeFullScreen() {
            store.commit('setFullScreen', true)
        }
        return {
            currentSong,
            fullScreen,
            cdClass,
            cdRef,
            cdimgRef,
            changeFullScreen,
            miniPlayIcon
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
            .name {
                margin-bottom: 8px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 14px;
                color: #fff;
            }
            .desc {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
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