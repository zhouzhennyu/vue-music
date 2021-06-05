<template>
    <div class="search-container">
        <div class="search-input-wrapper">
            <search-input v-model="query" />
        </div>
        <scroll 
            v-show="!query"
            class="search-content">
            <div>
                <div class="hot-search-wrapper" v-show="!query">
                    <h2 class="title">热门搜索</h2>
                    <ul>
                        <li v-for="item in hotKeys" 
                            :key="item.id"
                            @click="selectHotKey(item.key)"
                            class="key-item"
                        >
                            {{ item.key }}
                        </li>
                    </ul>
                </div>
                <div class="search-history" v-show="searchHistory.length">
                    <h1 class="title">
                        <span class="text">搜索历史</span>
                        <span class="clear" @click="showConfirm">
                        <i class="icon-clear"></i>
                        </span>
                    </h1>
                    <confirm
                        ref="confirmRef"
                        text="是否清空所有搜索历史"
                        confirm-btn-text="清空"
                        @confirm="clearSearch"
                    />
                    <search-list 
                        :searches="searchHistory"
                        @select="selectHotKey"
                        @delete="deleteSearch"
                        ></search-list>
                </div>
            </div>
        </scroll>
        <div class="suggest-result" v-show="query">
            <suggest 
                :query="query" 
                @select-song="selectSong"
                @select-singer="selectSinger"></suggest>
        </div>
        <router-view v-slot="{ Component }">
            <transition appear name="slide">
                <component :is="Component" :data="selectdSingerData" />
            </transition>
        </router-view>
    </div>
</template>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getHotKeys } from '@/service/search.js';
import SearchInput from '@/components/search/search-input.vue';
import Suggest from '@/components/search/suggest.vue';
import storage from 'good-storage';
import { SINGER_KEY } from '@/assets/js/constant.js';
import SearchList from '@/components/search/search-list.vue';
import useSearchHistory from '@/components/search/use-search-history';
import Scroll from '@/components/wrap-scroll';
import Confirm from '@/components/base/confirm/confirm.vue';

export default {
    components: {
        SearchInput,
        Suggest,
        SearchList,
        Scroll,
        Confirm
    },
    setup() {
        const query = ref('');
        const hotKeys = ref([]);
        const confirmRef = ref(null);
        const selectdSingerData = ref(null);

        const store = useStore();
        const router = useRouter();

        const searchHistory = computed(() => store.state.searchHistory);

        const { saveSearch, deleteSearch, clearSearch } = useSearchHistory();

        getHotKeys().then((result) => {
            hotKeys.value = result.hotKeys;
        })
        function selectHotKey(key) {
            query.value = key;
        }
        function selectSong(song) {
            saveSearch(query.value);
            store.dispatch('addSong', song);
        }
        function selectSinger(singer) {
            saveSearch(query.value);
            selectdSingerData.value = singer;
            storage.session.set(SINGER_KEY, singer);
            router.push({
                path: `/search/${singer.mid}`
            })
        }

        function showConfirm() {
            confirmRef.value.show();
        }

        return {
            query,
            hotKeys,
            selectHotKey,
            selectSong,
            selectSinger,
            selectdSingerData,
            searchHistory,
            deleteSearch,
            clearSearch,
            confirmRef,
            showConfirm
        }
    }
}
</script>
<style lang="less" scoped>
    .search-container {
        position: fixed;
        top: 88px;
        bottom: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        .search-input-wrapper {
            margin: 20px;
        }
        .search-content {
            flex: 1;
            overflow: hidden;
        }
        .hot-search-wrapper {
            overflow: hidden;
            margin: 0 20px 20px 20px;
            .title {
                margin-bottom: 20px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.5);
            }
            .key-item {
                display: inline-block;
                padding: 5px 10px;
                margin: 0 20px 10px 0;
                border-radius: 6px;
                background: #333;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.3);
            }
        }
        .search-history {
            position: relative;
            margin: 0 20px;
            .title {
                display: flex;
                align-items: center;
                height: 40px;
                font-size: @font-size-medium;
                color: @color-text-l;
                .text {
                    flex: 1;
                }
                .clear {
                    .extend-click();
                    .icon-clear {
                        font-size: @font-size-medium;
                        color: @color-text-d;
                    }
                }
            }
        }
        .suggest-result {
            flex: 1;
            overflow: hidden;
            margin: 0 30px 20px;
        }
    }
</style>