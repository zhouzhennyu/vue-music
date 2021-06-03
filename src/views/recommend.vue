<template>
    <div class="recommend-container" v-loading:[loadingText]="loading">
        <scroll class="scroll-content">
            <div>
                <div class="slider-wrapper">
                    <div class="slider-content">
                        <slider v-if="sliders.length" :sliders="sliders"></slider>
                    </div>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title" v-show="!loading">热门歌单推荐</h1>
                    <ul>
                        <li
                            v-for="item in albums"
                            class="item"
                            :key="item.id"
                            @click="selectItem(item)"
                        >
                            <div class="icon">
                                <img :src="item.pic" width="60" height="60">
                            </div>
                            <div class="text">
                                <h2 class="name">{{ item.username }}</h2>
                                <p class="title">{{item.title}}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
</template>
<script>
import { getRecommend } from '@/service/recommend.js';
import slider from '@/components/base/slider/slider.vue';
import scroll from '@/components/wrap-scroll/index';
export default {
    data() {
        return {
            sliders: [],
            albums: [],
            loadingText: '加载中'
        }
    },
    computed: {
        loading() {
            return !this.sliders.length && !this.albums.length;
        }
    },
    components: {
        slider,
        scroll
    },
    methods: {
        selectItem(item) {
            console.log(item);
        }
    },
    async created() {
        const result = await getRecommend();
        console.log(result);
        this.sliders = result.sliders;
        this.albums = result.albums;
    }
}
</script>
<style lang="less" scoped>
    .recommend-container {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0;
        overflow: scroll;
        .scroll-content {
            height: 100%;
            overflow: hidden;
        }
        .slider-wrapper {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 40%;
            overflow: hidden;
            .slider-content {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            } 
        }
        .recommend-list {
            .list-title {
                height: 65px;
                line-height: 65px;
                text-align: center;
                font-size: @font-size-medium;
                color: @color-theme;
            }
            .item {
                display: flex;
                box-sizing: border-box;
                align-items: center;
                padding: 0 20px 20px 20px;
                .icon {
                    flex: 0 0 60px;
                    width: 60px;
                    padding-right: 20px;
                }
                .text {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    flex: 1;
                    line-height: 20px;
                    overflow: hidden;
                    font-size: @font-size-medium;
                }
                .name {
                    margin-bottom: 10px;
                    color: @color-text;
                }
                .title {
                    color: @color-text-d;
                }
            }
        }
    }
</style>