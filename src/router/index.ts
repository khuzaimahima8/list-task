import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/task',
            name: 'create-task',
              component: () => import('../views/CreateTaskView.vue')
        },
        {
            path: '/task/:id',
            name: 'edit-task',
            component: () => import('../views/EditTaskView.vue'),
            props: true
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splittingMore actions
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
       
    ],
})

export default router
