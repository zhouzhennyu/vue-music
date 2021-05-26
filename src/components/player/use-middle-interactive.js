import { ref } from 'vue';

export default function useMiddleInteractive() {
    let currentShow = ref('cd');
    const middleLStyle = ref(null);
    const middleRStyle = ref(null);

    const touch = {};

    let currentView = 'cd';

    function onMiddleTouchStart(e) {
        touch.startX = e.touches[0].pageX;
        touch.startY = e.touches[0].pageY;
        touch.directionLocked = ''
    }

    function onMiddleTouchMove(e) {
        const deltaX = e.touches[0].pageX - touch.startX;
        const deltaY = e.touches[0].pageY - touch.startY;

        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX >= absDeltaY) {
            touch.directionLocked = 'h'
        } else {
            touch.directionLocked = 'v'
        }
        if (touch.directionLocked === 'v') {
            return;
        }

        const left = currentView === 'cd' ? 0 : -window.innerWidth;
        let offsetWidth = Math.min(0, Math.max(-window.innerWidth, deltaX + left));
        touch.percent = Math.abs(offsetWidth / window.innerWidth);
        if (currentView === 'cd') {
            if (touch.percent > 0.2) {
                currentShow.value = 'lyric'
            } else {
                currentShow.value = 'cd'
            }
        } else {
            if (touch.percent < 0.8) {
                currentShow.value = 'cd'
            } else {
                currentShow.value = 'lyric'
            }
        }
        middleLStyle.value = {
            opacity: 1 - touch.percent
        }
        middleRStyle.value = {
            transform: `translate3D(${offsetWidth}px, 0, 0)`
        }
    }

    function onMiddleTouchEnd(e) {
        let offsetWidth, opacity;
        if (currentShow.value === 'cd') {
            currentView = 'cd';
            offsetWidth = 0;
            opacity = 1;
        } else {
            currentView = 'lyric'
            offsetWidth = -window.innerWidth;
            opacity = 0;
        } 
        let duration = 300;
        middleLStyle.value = {
            opacity,
            transitionDuration: `${duration}ms`
        }
        middleRStyle.value = {
            transform: `translate3D(${offsetWidth}px, 0, 0)`,
            transitionDuration: `${duration}ms`
        }
    }

    return {
        onMiddleTouchStart,
        onMiddleTouchMove,
        onMiddleTouchEnd,
        currentShow,
        middleLStyle,
        middleRStyle
    }
}