<template>
    <teleport to='body'>
        <transition name="confirm-fade">
            <div class="confirm" v-show="visible">
                <div class="confirm-wrapper">
                    <div class="confirm-content">
                        <div class="title">{{ text }}</div>
                        <div class="btn-wrapper">
                            <span class="btn btn-left" @click="confirm">{{ confirmBtnText }}</span>
                            <span class="btn" @click="cancel">{{ cancelBtnText }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script>
export default {
    name: 'confirm',
    props: {
        text: {
            type: String,
            default: ''
        },
        confirmBtnText: {
            type: String,
            default: '确定'
        },
        cancelBtnText: {
            type: String,
            default: '取消'
        }
    },
    data() {
        return {
            visible: false
        }
    },
    emits: ['confirm', 'cancel'],
    methods: {
        confirm() {
            this.hide();
            this.$emit('confirm')
        },
        cancel() {
            this.hide();
            this.$emit('cancel')
        },
        hide() {
            this.visible = false;
        },
        show() {
            this.visible = true;
        }
    }
}
</script>
<style lang="less" scoped>
    .confirm {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 990;
        &.confirm-fade-enter-active {
            animation: confirm-fadein .3s;
            .confirm-content {
                animation: confirm-zoom-in .3s;
            }
        }
        &.confirm-fade-leave-active {
                animation: confirm-fadeout .3s;
            .confirm-content {
                animation: confirm-zoom-out .3s;
            }
        }
    }
    .confirm-content {
        background: #333;
        border-radius: 13px;
    }
    .confirm-wrapper {
        width: 80%;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 999;
        transform: translate(-50%, -50%);
        .title{
            padding: 19px 15px;
            line-height: 22px;
            text-align: center;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.5);
        }
        .btn-wrapper {
            display: flex;
            align-items: center;
            text-align: center;
            font-size: 18px;
            .btn {
                flex: 1;
                line-height: 22px;
                padding: 10px 0;
                border-top: 1px solid rgba(0, 0, 0, 0.3);
                color: rgba(255, 255, 255, 0.5);
            }
            .btn-left {
                color: #fff;
                border-right: 1px solid rgba(0, 0, 0, .3);
            }
        }
    }
    @keyframes confirm-fadein {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes confirm-fadeout {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    @keyframes confirm-zoom-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    @keyframes confirm-zoom-out {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
    }
</style>