<template>
    <div class="toplist-container" v-loading="loading">
        <scroll class="top-list-content">
            <ul>
                <li
                    class="item"
                    v-for="item in topList"
                    :key="item.id"
                    @click="selectItem(item)"
                >
                    <div class="icon">
                        <img width="100" height="100" :src="item.pic" />
                    </div>
                    <ul class="song-list">
                        <li
                            class="song"
                            v-for="(song, index) in item.songList"
                            :key="song.id">
                            <span>{{index + 1}}. </span>
                            <span>{{song.songName}}-{{song.singerName}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </scroll>
        <router-view v-slot="{ Component }">
            <transition appear name="slide">
                <component :is="Component" :data="selectTop" />
            </transition>
        </router-view>
    </div>
</template>
<script>
import Scroll from '@/components/base/scroll/scroll';
import { getTopList } from '@/service/top-list.js';
import storage from 'good-storage';
import { TOP_KEY } from '@/assets/js/constant.js';
export default {
    components: {
        Scroll
    },
    data() {
        return {
            topList: [],
            selectTop: null,
            loading: true,
        }
    },
    methods: {
        selectItem(item) {
            this.selectTop = item;
            storage.session.set(TOP_KEY, item);
            this.$router.push({
                path: `/top-list/${item.id}`
            })
        }
    },
    async created() {
        const { topList } = await getTopList();
        this.topList = topList;
        this.loading = false;
    }

}
</script>
<style lang="less" scoped>
    .toplist-container {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        .top-list-content {
      height: 100%;
      overflow: hidden;
      .item {
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
        &:last-child {
          padding-bottom: 20px;
        }
        .icon {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .song-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: @color-highlight-background;
          color: @color-text-d;
          font-size: @font-size-small;
          .song {
            .no-wrap();
            line-height: 26px;
          }
        }
      }
    }
    }
</style>