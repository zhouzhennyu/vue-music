<template>
    <teleport to='body' >
        <transition name="slide">
            <div class="add-song" v-show="visible">
                <div class="header">
                    <h1 class="title">添加歌曲到列表</h1>
                    <div class="close" @click="hide">
                        <i class="icon-close"></i>
                    </div>
                </div>
                <div class="search-input-wrapper">
                    <search-input v-model="query" placeholder="搜索歌曲"></search-input>
                </div>
                <div v-show="!query">
                    <switches :items="['最近播放', '搜索历史']" v-model="currentIndex"></switches>
                    <div class="list-wrapper">
                        <scroll
                            ref="scrollRef"
                            class="list-scroll"
                            v-show="currentIndex === 0"
                            >
                                <song-list :songs="playHistory"></song-list>
                        </scroll>
                        <scroll
                            ref="scrollRef"
                            class="list-scroll"
                            v-show="currentIndex === 1"
                            >
                               <search-list :searches="searchHistory" :showDelete="false"></search-list>
                        </scroll>
                    </div>
                </div>
                <div class="search-result" v-show="query">
                    <suggest :query="query" :show-singer="false"></suggest>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script>
import SearchInput from '@/components/search/search-input.vue';
import Suggest from '@/components/search/suggest.vue';
import Switches from '@/components/base/switches/switches.vue';
import SearchList from '@/components/search/search-list.vue';
import SongList from '@/components/base/song-list/song-list.vue';
import Scroll from '@/components/base/scroll/scroll.vue';
import { ref, computed, nextTick } from 'vue';
import { useStore } from 'vuex'

export default {
    name: 'add-song',
    components: {
        SearchInput,
        Suggest,
        Switches,
        SearchList,
        SongList,
        Scroll
    },
    setup() {
        const visible = ref(false);
        const query = ref('');
        const currentIndex = ref(0);
        const scrollRef = ref(null);

        const store = useStore();

        const searchHistory = computed(() => store.state.searchHistory);
        const playHistory = computed(() => store.state.playHistory);

        
        async function show() {
            visible.value = true;
            await nextTick();
            refreshScroll();
        }

        function hide() {
            visible.value = false;
        }
        function refreshScroll() {
            scrollRef.value.scroll.refresh();
        }
        return {
            query,
            visible,
            show,
            hide,
            currentIndex,
            searchHistory,
            playHistory,
            scrollRef
        }
    }
}
</script>
<style lang="less" scoped>
    .add-song {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        z-index: 300;
        background: @color-background;
        .header {
        position: relative;
        height: 44px;
        text-align: center;
        .title {
            line-height: 44px;
            font-size: @font-size-large;
            color: @color-text;
        }
        .close {
            position: absolute;
            top: 0;
            right: 8px;
            .icon-close {
            display: block;
            padding: 12px;
            font-size: 20px;
            color: @color-theme;
            }
        }
        }
        .search-input-wrapper {
            margin: 20px
        }
        .list-wrapper {
            position: absolute;
            top: 165px;
            bottom: 0;
            width: 100%;
            
            box-sizing: border-box;
            .list-scroll {
                height: 100%;
                overflow: hidden;
                padding: 0px 30px;
            }
        }
        .search-result {
            position: fixed;
            top: 124px;
            bottom: 0;
            width: 100%;
            margin: 0 20px 20px;
        }
    }

  .message-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
    .icon-ok {
      font-size: @font-size-medium;
      color: @color-theme;
      margin-right: 4px;
    }
    .text {
      font-size: @font-size-medium;
      color: @color-text;
    }
  }
</style>