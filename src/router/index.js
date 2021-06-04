import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/recommend',
    },
    {
        path: '/recommend',
        component: () => import('@/views/recommend.vue' /* webpackChunkName: "recommend" */),
        children: [
            {
                path: ':id',
                component: () => import('@/views/album.vue' /* webpackChunkName: "album" */)
            }
        ]
    },
    {
        path: '/singer',
        component: () => import('@/views/singer.vue' /* webpackChunkName: "singer" */),
        children: [
            {
                path: ':id',
                component: () => import('@/views/singer-detail.vue' /* webpackChunkName: "singer-detail" */)
            }
        ]
    },
    {
        path: '/top-list',
        component: () => import('@/views/top-list.vue' /* webpackChunkName: "top-list" */),
        children: [
            {
                path: ':id',
                component: () => import('@/views/top-detail.vue' /* webpackChunkName: "top-detail" */)
            }
        ]
    },
    {
        path: '/search',
        component: () => import('@/views/search.vue' /* webpackChunkName: "search" */)
    },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
