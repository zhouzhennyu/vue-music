import { PLAY_MODE } from '@/assets/js/constant';

const state = {
    sequenceList: [],   //顺序歌曲列表
    playList: [],   //播放歌曲列表  
    playing: false, //播放状态
    playMode: PLAY_MODE.sequence,
    currentIndex: 0,   //当前播放歌曲索引
    fullScreen: false   //播放器状态
}

export default state;