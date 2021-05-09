<template>
    <div class="tab-container">
        <router-link
            class="tabs-item"
            v-for="item in tabs"
            :to="item.path"
            :key="item.path">
            <span class="tabs-name">{{ item.name }}</span>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'tab',
    data() {
        return {
            tabs: [
                {
                    name: '推荐',
                    path: '/recommend'
                },
                {
                    name: '歌手',
                    path: '/singer'
                },
                {
                    name: '排行',
                    path: '/top-list'
                },
                {
                    name: '搜索',
                    path: '/search'
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
    .tab-container {
        display: flex;
        height: 44px;
        line-height: 44px;
        font-size: @font-size-medium;
        .tabs-item {
            flex: 1;
            text-align: center;
            .tabs-name {
                padding-bottom: 5px;
                color: @color-text-l;
            }
            &.router-link-active {
                .tabs-name{
                    color: @color-theme;
                    border-bottom: 2px solid @color-theme;
                }
            }
        }
    }
</style>