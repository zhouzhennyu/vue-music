<template>
    <div class="search-list">
        <transition-group name="list" tag="ul">
            <li class="search-item" 
                v-for="item in searches" 
                :key="item"
                @click="selectItem(item)"
            >
                <span class="text">{{ item }}</span>
                <span v-if="showDelete" class="icon" @click.stop="deleteItem(item)"><i class="icon-delete"></i></span>
            </li>
        </transition-group>
    </div>
</template>
<script>
export default {
    props: {
        searches: {
            type: Array,
            default() {
                return []
            }
        },
        showDelete: {
            type: Boolean,
            default: true
        }
    },
    emits: ['select', 'delete'],
    methods: {
        selectItem(item) {
            this.$emit('select', item)
        },
        deleteItem(item) {
            this.$emit('delete', item)
        }
    }
}
</script>
<style lang="less" scoped>
    .search-list {
        .search-item {
            display: flex;
            align-items: center;
            height: 40px;
            overflow: hidden;
            .text {
                flex: 1;
                color: @color-text-l;
            }
            .icon {
                .extend-click();
                .icon-delete {
                    font-size: @font-size-small;
                    color: @color-text-d;
                }
            }
        }
    }
</style>