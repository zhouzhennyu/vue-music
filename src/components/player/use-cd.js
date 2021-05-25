import { computed, watch, ref } from 'vue';
import { useStore } from 'vuex';

export default function useCd() {
    const cdRef = ref(null);
    const cdimgRef = ref(null);

    const store = useStore();
    const playing = computed(() => store.state.playing);
    const cdClass = computed(() => {
        return playing.value ? 'playing' : ''
    })

    watch(playing, (newPlaying) => {
        if (!newPlaying) {
            syncTransform(cdRef.value, cdimgRef.value);
        }
    })

    function syncTransform(wrapper, inner) {
        const innerTransform = getComputedStyle(inner).transform;
        const wrapperTransform = getComputedStyle(wrapper).transform;
        wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform);
    }

    return {
        cdClass,
        cdRef,
        cdimgRef,
    }
}