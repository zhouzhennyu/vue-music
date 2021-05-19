import { PLAY_MODE } from '@/assets/js/constant'
import { shuffle } from '@/assets/js/utils'


export function selectPlay({ commit }, { list, index }) {
    commit('setPlayingState', true);
    commit('setFullScreen', true);
    commit('setSequenceList', list);
    commit('setPlaylist', list);
    commit('setCurrentIndex', index);
    commit('setPlayMode', PLAY_MODE.sequence); 
}

export function randomPlay({ commit }, { list }) {
    commit('setPlayingState', true);
    commit('setFullScreen', true);
    commit('setSequenceList', list);
    commit('setPlaylist', shuffle(list));
    commit('setCurrentIndex', 0);
    commit('setPlayMode', PLAY_MODE.random); 
}

export function changeMode({ commit, state, getters }, mode) {
    let currentSongID = getters.currentSong.id;
    if (mode === PLAY_MODE.random) {
        commit('setPlaylist', shuffle(state.sequenceList))
    } else {
        commit('setPlaylist', state.sequenceList)
    }
    const index = state.playList.findIndex(song => currentSongID === song.id);
    commit('setCurrentIndex', index);
    commit('setPlayMode', mode); 
}