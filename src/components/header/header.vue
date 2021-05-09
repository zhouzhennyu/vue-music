<template>
    <div class="header">
        <div class="header-img"></div>
        <span class="header-title">Chicken Music</span>
    </div>
</template>
<script>
export default {
    name: 'm-header',
}
</script>
<style lang="less" scoped>
    .header {
        height: 44px;
        text-align: center;
        color: @color-theme;
        font-size: 0;
        .header-img {
            display: inline-block;
            vertical-align: top;
            margin-top: 6px;
            width: 30px;
            height: 32px;
            margin-right: 9px;
            background-image: url('./logo@2x.png');
            background-size: 30px 32px;
        }
        .header-title {
            display: inline-block;
            vertical-align: top;
            line-height: 44px;
            font-size: @font-size-large;
        }
    }
</style>