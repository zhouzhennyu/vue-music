import { ref, watch, nextTick, computed } from 'vue'

export default function useFixed(props) {
    const TITLE_HEIGHT = 30;
    const groupRef = ref(null);
    const listHeights = ref([]);
    const scrollY = ref(0);
    const currentIndex = ref(0);
    const distance = ref(0);
    
    const fixedTitle = computed(() => {
        if (scrollY.value < 0) return '';
        const currentGroup = props.data[currentIndex.value];
        return currentGroup ? currentGroup.title : '';
    })
    const fixedStyle = computed(() => {
        const distanceVal = distance.value;
        let diff = 0;
        if (distanceVal > 0 && distanceVal < TITLE_HEIGHT) {
            diff = distanceVal - TITLE_HEIGHT;
        }
        return {
            transform: `translate3d(0,${diff}px,0)`
        }
    })
    watch(() => props.data, async () => {
        await nextTick();
        calculate();
    })
    watch(scrollY, (newVal) => {
        const listHeightsVal = listHeights.value;
        for (let i = 0; i < listHeightsVal.length - 1; i++) {
            const listTop = listHeightsVal[i];
            const listBottom = listHeightsVal[i + 1];

            if (newVal >= listTop && newVal <= listBottom) {
                currentIndex.value = i;
                distance.value = listBottom - newVal;
            }
        }
    })

    function calculate() {
        const list = groupRef.value.children;
        const listHeightsVal = listHeights.value;
        let height = 0;
        listHeightsVal.length = 0;
        listHeightsVal.push(height)

        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight;
            listHeightsVal.push(height);
        }
    }

    function onScroll(pos) {
        scrollY.value = -pos.y
        // console.log(scrollY.value);
    }

    return {
        groupRef,
        onScroll,
        fixedTitle,
        fixedStyle,
        currentIndex
    }
}


