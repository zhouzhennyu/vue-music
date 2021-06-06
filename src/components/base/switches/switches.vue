<template>
    <ul class="switches">
        <li v-for="(item, index) in items"
            :key="item"
            @click="selectItem(index)"
            class="switch-item"
            :class="{'active': modelValue === index}"
        >
            <span class="">{{ item }}</span>
        </li>
        <div class="active-bar" :style="activeStyle"></div>
    </ul>
</template>
<script>
export default {
    name: 'switches',
    props: {
        items: {
            type: Array,
            default() {
                return []
            }
        },
        modelValue: {
            type: Number,
            default: 0
        }
    },
    computed: {
        activeStyle() {
            const x = 120 * this.modelValue;
            return {
                transform: `translate3d(${x}px, 0, 0)`
            }
        }
    },
    methods: {
        selectItem(index) {
            this.$emit('update:modelValue', index);
        }
    }
}
</script>
<style lang="less" scoped>
    .switches {
        display: flex;
        align-items: center;
        position: relative;
        width: 240px;
        margin: 0 auto;
        border-radius: 5px;
        border: 1px solid #333;
        .switch-item {
            position: relative;
            z-index: 10;
            flex: 1;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.3);
        }
        .active {
            color: #fff;
        }
        .active-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 120px;
            height: 30px;
            transition: transform .3s;
            border-radius: 5px;
            background: #333;
        }
    }
</style>