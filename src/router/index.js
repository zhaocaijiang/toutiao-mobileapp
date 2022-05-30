import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 配置自己的路由表
const routes = [{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/MyIndex.vue')
},
{
  // redirect: '/home',
  // 名为Route 'layout'的路由有一个默认的子路由。当导航到这个命名路由(:to="{name: 'layout'}")时，默认的子路由将不会被渲染。从该路由中删除该名称，并为命名链接使用默认子路由的名称。
  // 父级路由不能定义name属性，SO解决办法是：即去除父级的name属性即可。
  // name: 'layout', // 如果父路由有默认子路由，那它的 name 没有意义
  path: '/',
  redirect: '/home',
  component: () => import('@/views/layout/MyIndex.vue'),
  children: [
    {
      path: '/home', // 默认子路由，只能有一个
      name: 'home',
      component: () => import('@/views/home/MyIndex.vue')
    },
    {
      path: 'qa', // 默认子路由，只能有一个
      name: 'qa',
      component: () => import('@/views/qa/MyIndex.vue')
    },
    {
      path: 'video', // 默认子路由，只能有一个
      name: 'video',
      component: () => import('@/views/video/MyIndex.vue')
    },
    {
      path: 'my', // 默认子路由，只能有一个
      name: 'my',
      component: () => import('@/views/my/MyIndex.vue')
    }
  ]
}]

const router = new VueRouter({
  routes
  // linkExactActiveClass: 'open active'
})

export default router
