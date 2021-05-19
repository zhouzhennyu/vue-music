<template>
    <div class="player">
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
            <div class="bottom">
                <div class="operators">
                    <div class="icon" @click="changeMode"><i :class="modeIcon"></i></div>
                    <div class="icon" :class="disableCls" @click="prev"><i class="icon-prev" ></i></div>
                    <div class="icon" :class="disableCls" @click="togglePlay"><i :class="playIcon"></i></div>
                    <div class="icon" :class="disableCls" @click="next"><i class="icon-next"></i></div>
                    <div class="icon" @click="toggleFavorite(currentSong)"><i :class="getFavoriteIcon(currentSong)"></i></div>
                </div>
            </div>
        </div>
        <audio ref="audioRef" @pause="pause" @canplay="ready"></audio>
    </div>
</template>
<script>
import { computed, watch, ref } from 'vue'
import { useStore,  } from 'vuex'
import { useMode } from './use-mode';
import { useFavorite } from './use-favorite';

export default {
    name: 'player',
    setup() {
        const store = useStore();
        const audioRef = ref(null);
        const songReady = ref(false);

        const { modeIcon, changeMode } = useMode();
        const { getFavoriteIcon, toggleFavorite } = useFavorite();

        const fullScreen = computed(() => store.state.fullScreen);
        const currentSong = computed(() => store.getters.currentSong);
        const playing = computed(() => store.state.playing);
        const playList = computed(() => store.state.playList);
        const currentIndex = computed(() => store.state.currentIndex);
        const playIcon = computed(() => {
            return playing.value ? 'icon-pause' : 'icon-play'
        })
        const disableCls = computed(() => {
            return songReady.value ? '' : 'disable'
        })
        watch(currentSong, (newSong) => {
            if (!newSong.id || !newSong.url) {
                return
            }
            songReady.value = false;
            const audioEl = audioRef.value;
            audioEl.src = newSong.url;
            audioEl.play()
        })
        watch(playing, (newPlaying) => {
            if (!songReady.value) return;
            const audioEl = audioRef.value; 
            newPlaying ? audioEl.play() : audioEl.pause();
        })
        function back() {
            store.commit('setFullScreen', false)
        }
        function togglePlay() {
            store.commit('setPlayingState', !playing.value);
        }
        function pause() {
            store.commit('setPlayingState', false);
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
        }
        function ready() {
            songReady.value = true;
        }
        return {
            audioRef,
            fullScreen,
            currentSong,
            back,
            togglePlay,
            playIcon,
            pause,
            prev,
            next,
            ready,
            disableCls,
            modeIcon,
            changeMode,
            getFavoriteIcon,
            toggleFavorite
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
            .bottom {
                position: absolute;
                width: 100%;
                bottom: 50px;
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
        }
    }
</style>