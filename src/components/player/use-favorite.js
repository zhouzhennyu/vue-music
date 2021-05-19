import { computed } from 'vue';
import { useStore } from 'vuex';
import  { save, remove} from '@/assets/js/array-store.js';
import { FAVORITE_KEY } from '@/assets/js/constant.js'

export function useFavorite() {
    const store = useStore();

    const maxLen = 100
    const favoriteList = computed(() => store.state.favoriteList);

    function toggleFavorite(song) {
        let list;
        if (isFavoriteSong(song)) {
            list = remove(FAVORITE_KEY, compare);
        } else {
            list = save(song, FAVORITE_KEY, compare, maxLen);
        }
        store.commit('setFavoriteList', list)
        function compare(item) {
            return item.id === song.id;
        }
    }

    function getFavoriteIcon(song) {
        return isFavoriteSong(song) ? 'icon-favorite' : 'icon-not-favorite';
    }

    function isFavoriteSong(song) {
        return favoriteList.value.findIndex(item => song.id === item.id) > -1;
    }

    return {
        getFavoriteIcon,
        toggleFavorite
    }
}