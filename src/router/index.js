import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/search',
        component: () => import('@/views/search.vue' /* webpackChunkName: "search" */)
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
        path: '/recommend',
        component: () => import('@/views/recommend.vue' /* webpackChunkName: "recommend" */)
    },
    {
        path: '/top-list',
        component: () => import('@/views/top-list.vue' /* webpackChunkName: "top-list" */)
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
