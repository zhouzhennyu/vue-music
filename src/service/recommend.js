import { get } from './base.js';


//获取轮播和热门歌单
export function getRecommend() {
    return get('/api/getRecommend');
}

export function getAlbum(album) {
    return get('/api/getAlbum', {
        id: album.id
    })
}