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

export function removeSong({commit, state}, song) {
    const sequenceList = state.sequenceList.slice();
    const playList = state.playList.slice();

    const sequenceIndex = findCurrentIndex(sequenceList, song);
    const playIndex = findCurrentIndex(playList, song);
    if (sequenceIndex < 0 || playIndex < 0) {
        return;
    }
    
    sequenceList.splice(sequenceIndex, 1);
    playList.splice(playIndex, 1);

    let currentIndex = state.currentIndex;
    if (playIndex < currentIndex || currentIndex === playList.length) {
        currentIndex--;
    }
    commit('setSequenceList', sequenceList);
    commit('setPlaylist', playList);
    commit('setCurrentIndex', currentIndex);
}

export function clearSongList({ commit }) {
    commit('setSequenceList', []);
    commit('setPlaylist', []);
    commit('setCurrentIndex', 0);
    commit('setPlayingState', false);
}

function findCurrentIndex(list, song) {
    return list.findIndex(item => item.id === song.id);
}