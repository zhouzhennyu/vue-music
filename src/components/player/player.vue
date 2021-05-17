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
        </div>
        <audio ref="audioRef"></audio>
    </div>
</template>
<script>
import { computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'player',
    setup() {
        const store = useStore();
        const audioRef = ref(null);

        const fullScreen = computed(() => store.state.fullScreen);
        const currentSong = computed(() => store.getters.currentSong);
        watch(currentSong, (newSong) => {
            if (!newSong.id || !newSong.url) {
                return
            }
            const audioEl = audioRef.value;
            audioEl.src = newSong.url;
            audioEl.play()
        }) 
        function back() {
            store.commit('setFullScreen', false)
        }
        return {
            audioRef,
            fullScreen,
            currentSong,
            back
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
        }
    }
</style>