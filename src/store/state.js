import { PLAY_MODE, FAVORITE_KEY, SEARCH_KEY, PLAY_KEY } from '@/assets/js/constant';
import { load } from '@/assets/js/array-store';

const state = {
    sequenceList: [],   //顺序歌曲列表
    playList: [],   //播放歌曲列表  
    playing: false, //播放状态
    playMode: PLAY_MODE.sequence,
    currentIndex: 0,   //当前播放歌曲索引
    fullScreen: false,   //播放器状态
    favoriteList: load(FAVORITE_KEY),
    searchHistory: load(SEARCH_KEY),
    playHistory: load(PLAY_KEY)
}

export default state;