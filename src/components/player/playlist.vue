<template>
    <teleport to='body'>
        <transition name="list-fade">
            <div class="playlist" v-show="visible && playList.length" @click="hide">
                <div class="list-wrapper" @click.stop>
                    <div class="list-header">
                        <div class="header-left"><i @click.stop="changeMode" class="icon" :class="modeIcon"></i><span>{{ modeText }}</span></div>
                        <div class="header-right"><i class="icon-clear"></i></div>
                    </div>
                    <scroll class="list-content" ref="scrollRef">
                        <transition-group
                            ref="listRef"
                            name="list" 
                            tag="ul"
                        >
                            <li v-for="song in sequenceList"
                                :key="song.id"
                                class="item"
                                @click.stop="selectCurrentSong(song)">
                                <i class="current" :class="getCurrentIcon(song)"></i>
                                <span class="text">{{ song.name }}</span>
                                <span class="favorite" @click.stop="toggleFavorite(song)"><i :class="getFavoriteIcon(song)"></i></span>
                                <span class="delete" :class="{'disable': removeing}" @click.stop="removeSong(song)"><i class="icon-delete"></i></span>
                            </li>
                        </transition-group>
                    </scroll>
                    <div class="list-add">
                        <div class="add-content"><i class="icon-add"></i><span>添加歌曲到队列</span></div>
                    </div>
                    <div class="list-footer">
                        <span @click.stop="hide">关闭</span>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script>
import Scroll from '@/components/base/scroll/scroll.vue'
import { computed, ref, nextTick, watch } from 'vue';
import { useStore } from 'vuex';
import useMode from './use-mode';
import useFavorite from './use-favorite';
export default {
    name: 'playlist',
    components: {
        Scroll
    },
    setup() {
        const visible = ref(false);
        const scrollRef = ref(null);
        const listRef = ref(null);
        const removeing = ref(false);
        const store = useStore();

        const playList = computed(() => store.state.playList);
        const sequenceList = computed(() => store.state.sequenceList);
        const currentSong = computed(() => store.getters.currentSong);

        const { modeText, changeMode, modeIcon } = useMode();
        const { getFavoriteIcon, toggleFavorite } = useFavorite();

        watch(currentSong, async (newSong) => {
            if (!visible.value || !newSong.id) {
                return;
            }
            await nextTick();
            scrollCurrentSong();
        })
        function hide() {
            visible.value = false;
        }
        async function show() {
            visible.value = true;
            await nextTick();
            scrollRef.value.scroll.refresh();
            scrollCurrentSong();
        }
        function getCurrentIcon(song) {
            if (song.id === currentSong.value.id) {
                return 'icon-play';
            }
        }
        function scrollCurrentSong() {
            const index = sequenceList.value.findIndex(item => item.id === currentSong.value.id);
            if (index === -1) {
                return;
            }
            const targetEl = listRef.value.$el.children[index];
            scrollRef.value.scroll.scrollToElement(targetEl, 300);
        }
        function selectCurrentSong(song) {
            const index = playList.value.findIndex(item => item.id === song.id);
            store.commit('setCurrentIndex', index);
            store.commit('setPlayingState', true);

        }
        function removeSong(song) {
            if (removeing.value) {
                return;
            }
            removeing.value = true;
            store.dispatch('removeSong', song);
            setTimeout(() => {
                removeing.value = false;
            }, 300)
        }
        return {
            visible,
            playList,
            sequenceList,
            modeText,
            getFavoriteIcon,
            toggleFavorite,
            hide,
            changeMode,
            modeIcon,
            show,
            getCurrentIcon,
            scrollRef,
            listRef,
            selectCurrentSong,
            removeSong,
            removeing
        }
    }
}
</script>
<style lang="less" scoped>
.playlist {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(0, 0, 0, .3);
    &.list-fade-enter-active, &.list-fade-leave-active {
        transition: opacity, .3s;
        .list-wrapper {
            transition: all, .3s;
        }
    }
    &.list-fade-enter-from, &.list-fade-leave-to {
        opacity: 0;
        .list-wrapper {
            transform: translate3d(0, 100%, 0);
        }
    }
    .list-wrapper {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 210;
        width: 100%;
        background: #333;
        .list-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px 30px 10px 20px;
            .header-left {
                i {
                    font-size: 24px;
                    color: rgba(255, 205, 49, 0.5);
                    margin-right: 10px;
                    vertical-align: middle;
                }
                span {
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.5);
                }
            }
            .header-right {
                i {
                   font-size: 14px;
                    color: rgba(255, 255, 255, 0.3); 
                }
            }
        }
        .list-content {
            max-height: 240px;
            overflow: hidden;
            .item {
                display: flex;
                align-items: center;
                height: 40px;
                padding: 0 30px 0 20px;
                overflow: hidden;
                .current {
                    flex: 0 0 20px;
                    width: 20px;
                    font-size: @font-size-small;
                    color: @color-theme-d;
                }
                .text {
                    flex: 1;
                    .no-wrap();
                    font-size: @font-size-medium;
                    color: @color-text-d;
                }
                .favorite {
                    .extend-click();
                    margin-right: 15px;
                    font-size: @font-size-small;
                    color: @color-theme;
                    .icon-favorite {
                    color: @color-sub-theme;
                    }
                }
                .delete {
                    .extend-click();
                    font-size: @font-size-small;
                    color: @color-theme;
                    &.disable {
                    color: @color-theme-d;
                    }
                }
            }
        }
        .list-add {
            margin-top: 20px;
            margin-bottom: 30px;
            text-align: center;
            .add-content {
                display: inline-block;
                padding: 8px 16px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 100px;
                color: rgba(255, 255, 255, 0.5);
                span {
                    font-size: 12px;
                }
            }
            .icon-add {
                margin-right: 5px;
                font-size: 10px;
                vertical-align: middle;
            }
        }
        .list-footer {
            text-align: center;
            line-height: 50px;
            background: #222;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.5);
        }
    }
    
}

</style>