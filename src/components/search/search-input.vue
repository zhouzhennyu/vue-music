<template>
    <div class="search-input">
        <i class="icon-search"></i>
        <input class="input-inner" v-model="query" :placeholder="placeholder">
        <i v-show="query" @click="clearInput" class="icon-dismiss"></i>
    </div>
</template>
<script>
import { debounce } from 'throttle-debounce';
export default {
    name: 'search-input',
    props: {
        modelValue: String,
        placeholder: {
            type: String,
            default: '搜索歌曲、歌手'
        }
    },
    data() {
        return {
            query: this.modelValue
        }
    },
    methods: {
        // changeInput:debounce(300, function(e) {
        //     const val = e.target.value.trim();
        //     this.$emit('update:modelValue', val.trim())
        // })
        clearInput() {
            this.query = '';
        }
    },
    created() {
        this.$watch('query', debounce(300, (newQuery) => {
            this.$emit('update:modelValue', newQuery.trim());
        }))
        this.$watch('modelValue', (newVal) => {
            this.query = newVal;
        })
    }
}
</script>
<style lang="less" scoped>
    .search-input {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        background: #333;
        height: 32px;
        border-radius: 6px;
        padding: 0 6px;
        .icon-search {
            font-size: 24px;
            color: rgba(255, 255, 255, 0.3);
        }
        .icon-dismiss {
            font-size: 16px;
            color: rgba(255, 255, 255, 0.3);
        }
        .input-inner {
            flex: 1;
            margin: 0 5px;
            line-height: 18px;
            background: #333;
            outline: none;
            font-size: 14px;
            color: #fff;
        }
    }
</style>
