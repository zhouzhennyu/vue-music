import { computed, watch, nextTick, onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'
import { useStore } from 'vuex'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide' 

BScroll.use(Slide);

export default function useMinSlide() {
    const minSlideWrapperRef = ref(null);
    const slider = ref(null);

    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const playList = computed(() => store.state.playList);
    const currentIndex = computed(() => store.state.currentIndex);
    const slideShow = computed(() => {
        return !fullScreen.value && !!playList.value.length;
    })

    onMounted(() => {
        let sliderVal;
        watch(slideShow, async (newSlideShow) => {
            if (newSlideShow) {
                await nextTick();
                if (!sliderVal) {
                    sliderVal = slider.value = new BScroll(minSlideWrapperRef.value, {
                        click: true,
                        scrollX: true,
                        scrollY: false,
                        momentum: false,
                        bounce: false,
                        probeType: 2,
                        slide: {
                            autoplay: false,
                            loop: true
                        }
                    })
                    sliderVal.on('slidePageChanged', (page) => {
                        store.commit('setCurrentIndex', page.pageX);
                    })
                } else {
                    sliderVal.refresh();
                }
                sliderVal.goToPage(currentIndex.value, 0, 0);
            }
        })
        watch(currentIndex, (newCurrentIndex) => {
            if (sliderVal && slideShow.value) {
                sliderVal.goToPage(newCurrentIndex, 0, 0);
            }
        })
        watch(playList, async (newList) => {
            if (sliderVal && slideShow.value && newList.length) {
                await nextTick();
                sliderVal.refresh();
            }
        })
    })

    onUnmounted(() => {
        if (slider.value) {
            slider.value.destroy();
        }
    })

    onActivated(() => {
        scroll.value.enable()
        scroll.value.refresh()
    })
    
    onDeactivated(() => {
        scroll.value.disable()
    })
    
    return {
        minSlideWrapperRef
    }
}