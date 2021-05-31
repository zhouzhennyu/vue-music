<template>
    <div class="player" v-show="playList.length">
        <transition 
            name="normal"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave"
            >
            <div 
                class="normal-player"
                v-show="fullScreen"
                >
                <div class="background">
                    <img :src="currentSong.pic" alt="">
                </div>
                <div class="top">
                    <div class="back" @click="back"><i class="icon-back"></i></div>
                    <h1 class="title">{{ currentSong.name }}</h1>
                    <h2 class="subtitle">{{ currentSong.singer }}</h2>
                </div>
                <div class="middle"
                    @touchstart.prevent="onMiddleTouchStart"
                    @touchmove.prevent="onMiddleTouchMove"
                    @touchend.prevent="onMiddleTouchEnd">
                    <div class="middle-l" :style="middleLStyle">
                        <div class="cd-wrapper" ref="cdWrapperRef">
                            <div class="cd" ref="cdRef">
                                <img class="cd-img" ref="cdimgRef" :class="cdClass" :src="currentSong.pic" alt="">
                            </div>
                        </div>
                        <div class="playing-lyric-wrapper">
                            <div class="playing-lyric">{{ playingLyric }}</div>
                        </div>
                    </div>
                    <scroll class="middle-r" :style="middleRStyle" ref="lyricScrollRef">
                        <div class="lyric-wrapper" >
                            <div v-if="currentLyric" ref="lyricListRef">
                                <p class="text"
                                    :class="{'current': currentLineNum === index}"
                                    v-for="(item, index) in currentLyric.lines"
                                    :key="item.num"
                                    >{{ item.txt }}</p>
                            </div>
                            <div class="pure-music" v-show="pureMusicLyric">
                                <p>{{ pureMusicLyric }}</p>
                            </div>
                        </div>
                    </scroll>
                </div>
                <div class="bottom">
                    <div class="dot-wrapper">
                        <span class="dot" :class="{'active':currentShow==='cd'}"></span>
                        <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
                    </div>
                    <div class="progress-wrapper">
                        <span class="time time-l">{{formatTime(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                        <progress-bar
                            ref="progressBarRef"
                            :progress="progress"
                            @progress-changing="onProgressChanging"
                            @progress-changed="onProgressChanged"
                            ></progress-bar>
                        </div>
                        <span class="time time-r">{{formatTime(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <div class="icon" @click="changeMode"><i :class="modeIcon"></i></div>
                        <div class="icon" :class="disableCls" @click="prev"><i class="icon-prev" ></i></div>
                        <div class="icon" :class="disableCls" @click="togglePlay"><i :class="playIcon"></i></div>
                        <div class="icon" :class="disableCls" @click="next"><i class="icon-next"></i></div>
                        <div class="icon" @click="toggleFavorite(currentSong)"><i :class="getFavoriteIcon(currentSong)"></i></div>
                    </div>
                </div>
            </div>
        </transition>
        <mini-player :togglePlay="togglePlay" :progress="progress"></mini-player>
        <audio 
            ref="audioRef"
            @pause="pause"
            @ended="end"
            @canplay="ready"
            @timeupdate="updateTime"
        >
        </audio>
    </div>
</template>
<script>
import { computed, watch, ref, nextTick } from 'vue'
import { useStore,  } from 'vuex'
import useMode from './use-mode';
import useFavorite from './use-favorite';
import useCd from './use-cd';
import useLyric from './use-lyric';
import useAnimation from './use-animation';
import useMiddleInteractive from './use-middle-interactive';
import ProgressBar from './progress-bar'
import { formatTime } from '@/assets/js/utils.js';
import { PLAY_MODE } from '@/assets/js/constant';
import scroll from '@/components/base/scroll/scroll.vue';
import MiniPlayer from './mini-player.vue';
export default {
    name: 'player',
    components: {
        scroll,
        ProgressBar,
        MiniPlayer
    },
    setup() {
        const store = useStore();
        const audioRef = ref(null);
        const progressBarRef = ref(null);
        const songReady = ref(false);
        const currentTime = ref(0);
        let progressChange = false;

        const { modeIcon, changeMode } = useMode();
        const { getFavoriteIcon, toggleFavorite } = useFavorite();
        const { cdClass, cdRef, cdimgRef } = useCd();
        const { lyricListRef, 
                lyricScrollRef, 
                currentLyric, 
                currentLineNum, 
                playLyric, 
                stopLyric, 
                pureMusicLyric,
                playingLyric } = useLyric({ songReady, currentTime })
        const { onMiddleTouchStart,
                onMiddleTouchMove,
                onMiddleTouchEnd,
                currentShow,
                middleLStyle,
                middleRStyle } = useMiddleInteractive();

        const { enter, afterEnter, leave, afterLeave, cdWrapperRef } = useAnimation();

        const fullScreen = computed(() => store.state.fullScreen);
        const currentSong = computed(() => store.getters.currentSong);
        const playing = computed(() => store.state.playing);
        const playList = computed(() => store.state.playList);
        const currentIndex = computed(() => store.state.currentIndex);
        const playMode = computed(() => store.state.playMode)
        const playIcon = computed(() => {
            return playing.value ? 'icon-pause' : 'icon-play'
        })
        const disableCls = computed(() => {
            return songReady.value ? '' : 'disable'
        })
        const progress = computed(() => {
            return currentTime.value / currentSong.value.duration;
        })
        watch(currentSong, (newSong) => {
            if (!newSong.id || !newSong.url) {
                return
            }
            currentTime.value = 0;
            songReady.value = false;
            const audioEl = audioRef.value;
            audioEl.src = newSong.url;
            audioEl.play()
        })
        watch(playing, (newPlaying) => {
            if (!songReady.value) return;
            const audioEl = audioRef.value; 
            if (newPlaying) {
                playLyric();
                audioEl.play()
            } else {
                stopLyric();
                audioEl.pause()
            }
        })
        // watch(fullScreen, async (newFullScreen) => {
        //     if (newFullScreen) {
        //         await nextTick();
        //         progressBarRef.value.setOffset(progress.value)
        //     }
        // })

        function back() {
            store.commit('setFullScreen', false)
        }
        function togglePlay() {
            store.commit('setPlayingState', !playing.value);
        }
        function pause() {
            store.commit('setPlayingState', false);
        }
        function end() {
            currentTime.value = 0;
            if (playMode.value === PLAY_MODE.loop) {
                loop();
            } else {
                next();
            }
        }
        function prev() {
            const list = playList.value;
            if (!list.length || !songReady.value) return;
            if (list.length === 1) {
                loop();
            } else {
                let index = currentIndex.value - 1;
                if ( index === -1) {
                    index = list.length - 1;
                }
                if (!playing.value) {
                    store.commit('setPlayingState', true);
                }
                store.commit('setCurrentIndex', index);
            }
            
        }
        function next() {
            const list = playList.value;
            if (!list.length || !songReady.value) return;
            if (list.length === 1) {
                loop();
            } else {
                let index = currentIndex.value + 1;
                if (index === list.length) {
                    index = 0;
                }
                if (!playing.value) {
                    store.commit('setPlayingState', true);
                }
                store.commit('setCurrentIndex', index);
            }
            
            
        }
        function loop() {
            const audioEl = audioRef.value;
            audioEl.currentTime = 0;
            audioEl.play();
            store.commit('setPlayingState', true)
        }
        function ready() {
            if (songReady.value) {
                return
            }
            songReady.value = true;
            playLyric()
        }
        function updateTime(e) {
            if (!progressChange) {
                currentTime.value = e.target.currentTime;
            }
        }
        function onProgressChanging(progress) {
            progressChange = true;
            currentTime.value = currentSong.value.duration * progress;
            playLyric();
            stopLyric();
        }
        function onProgressChanged(progress) {
            progressChange = false;
            audioRef.value.currentTime = currentTime.value = currentSong.value.duration * progress;
            store.commit('setPlayingState', true);
            playLyric();
        }
        return {
            audioRef,
            fullScreen,
            currentSong,
            playList,
            back,
            togglePlay,
            playIcon,
            pause,
            end,
            prev,
            next,
            ready,
            disableCls,
            modeIcon,
            changeMode,
            getFavoriteIcon,
            toggleFavorite,
            formatTime,
            updateTime,
            progress,
            currentTime,
            onProgressChanging,
            onProgressChanged,
            cdClass,
            cdRef,
            cdimgRef,
            currentLyric,
            currentLineNum,
            lyricListRef,
            lyricScrollRef,
            pureMusicLyric,
            playingLyric,
            onMiddleTouchStart,
            onMiddleTouchMove,
            onMiddleTouchEnd,
            currentShow,
            middleLStyle,
            middleRStyle,
            progressBarRef,
            enter,
            afterEnter,
            leave,
            afterLeave,
            cdWrapperRef,
        }
    }
}
</script>
<style lang="less" scoped>
    .player {
        .normal-player {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 150;
            background: #222;
        }
        .background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter: blur(20px);
            opacity: .6;
            z-index: -1;
            img {
                height: 100%;
                width: 100%;
            }
        }
        .top {
            position: relative;
            margin-bottom: 25px;
            .back {
                position: absolute;
                top: 0;
                left: 6px;
                z-index: 50;
            }
            .icon-back {
                display: block;
                padding: 9px;
                font-size: @font-size-large-x;
                color: @color-theme;
                transform: rotate(-90deg);
            }
            .title {
                // width: 70%;
                // margin: 0 auto;
                line-height: 40px;
                text-align: center;
                .no-wrap();
                font-size: @font-size-large;
                color: @color-text;
            }
            .subtitle {
                line-height: 20px;
                text-align: center;
                font-size: @font-size-medium;
                color: @color-text;
            }
        }
        .middle {
            position: fixed;
            top: 85px;
            bottom: 170px;
            width: 100%;
            font-size: 0;
            white-space: nowrap;
            .middle-l {
                vertical-align: top;
                display: inline-block;
                .cd-wrapper {
                    width: 80%;
                    height: 0;
                    margin: 0 auto;
                    padding-bottom: 80%;
                }
                .cd {
                    border-radius: 50%;
                }
                .cd-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    box-sizing: border-box;
                    border: 10px solid rgba(255, 255, 255, 0.1);
                }
                .playing {
                    animation: rotate 20s linear infinite;
                }
                .playing-lyric-wrapper {
                    font-size: 14px;
                    text-align: center;
                    color: @color-text-l;
                    margin-top: 30px;
                }
            }
            .middle-r {
                display: inline-block;
                width: 100%;
                height: 100%;
                overflow: hidden;
               .lyric-wrapper {
                   width: 80%;
                   margin: 0 auto;
                   text-align: center;
               }
                .text {
                    line-height: 32px;
                    color: @color-text-l;
                    font-size: @font-size-medium;
                    &.current {
                        color: @color-text;
                    }
                }
                .pure-music {
                    padding-top: 50%;
                    line-height: 32px;
                    color: @color-text-l;
                    font-size: @font-size-medium;
                }
            }
        }
        .bottom {
            position: absolute;
            width: 100%;
            bottom: 50px;
            .progress-wrapper {
                display: flex;
                align-items: center;
                width: 80%;
                margin: 0px auto;
                padding: 10px 0;
                .time {
                    color: @color-text;
                    font-size: @font-size-small;
                    flex: 0 0 40px;
                    line-height: 30px;
                    width: 40px;
                    &.time-l {
                        text-align: left;
                    }
                    &.time-r {
                        text-align: right;
                    }
                }
                .progress-bar-wrapper {
                    flex: 1;
                }
            }
            .operators {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 36px;
                .icon {
                    color: #ffcd32;
                    font-size: 30px;
                    &.disable{
                        color: @color-theme-d;
                    }
                }
            }
        }
        .dot-wrapper {
          text-align: center;
          font-size: 0;
          .dot {
            display: inline-block;
            vertical-align: middle;
            margin: 0 4px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: @color-text-l;
            &.active {
              width: 20px;
              border-radius: 5px;
              background: @color-text-ll;
            }
          }
        }
        .normal-enter-active, .normal-leave-active {
            transition: all .6s;
            .top, .bottom {
                transition: all .6s cubic-bezier(0.45, 0, 0.55, 1);
            }
        }
        .normal-enter-from, .normal-leave-to {
            opacity: 0;
            .top {
                transform: translate3d(0, -100px, 0);
            }
            .bottom {
                transform: translate3d(0, 100px, 0);
            }
        }
    }
</style>