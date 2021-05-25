const mutations = {
    //设置播放状态
    setPlayingState(state, playing) {
        state.playing = playing;
    },
    //设置歌曲列表
    setSequenceList(state, list) {
        state.sequenceList = list
    },
    //设置播放列表
    setPlaylist(state, list) {
        state.playList = list
    },
    //设置播放模式
    setPlayMode(state, mode) {
        state.playMode = mode
    },
    //设置当前播放索引
    setCurrentIndex(state, index) {
        state.currentIndex = index
    },
    //设置播放器状态
    setFullScreen(state, fullScreen) {
        state.fullScreen = fullScreen
    },
    //设置收藏歌曲列表
    setFavoriteList(state, list) {
        state.favoriteList = list
    },

    addSongLyric(state, {song, lyric}) {
        state.sequenceList.map(item => {
            if (item.mid === song.mid) {
                item.lyric = lyric;
            }
            return item;
        })
    }
}

export default mutations;