<template>
    <div class="loading-container">
        <div class="loading-content">
            <img class="laodin-img" src="./loading.gif" alt="">
            <p class="loading-title">{{ title }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'loading',
    data() {
        return {
            title: '正在载入'
        }
    },
    methods: {
        setTitle(title) {
            this.title = title;
        }
    }
}
</script>
<style lang="less" scoped>
    .loading-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        .loading-content {
            text-align: center;
            .laodin-img {
                width: 24px;
                height: 24px;
            }
            .loading-title {
                line-height: 20px;
                font-size: @font-size-small;
                color: @color-text-l;
            }
        }
    }
</style>