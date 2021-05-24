export function shuffle(source) {
    const arr = source.slice();
    for (let i = 0; i < arr.length; i++) {
        const j = getRandomInt(i);
        swap(arr, i, j);
    }
    return arr;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1))
}

function swap(arr, i, j) {
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}

export function formatTime(time) {
    time = time | 0;
    const minute = ((time / 60 | 0) + '').padStart(2, '0');
    const seconds = (time % 60 + '').padStart(2, '0');
    return `${minute}:${seconds}`;
}