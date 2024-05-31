import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/pages/dashboard.vue')
                },
                {
                    path: '/settings',
                    name: 'settings',
                    component: () => import('@/views/pages/settings.vue')
                },
                {
                    path: '/corporative-carts',
                    name: 'CorporativeCarts',
                    component: () => import('@/views/pages/corporative-carts.vue')
                },
                {
                    path: '/orders',
                    name: 'orders',
                    component: () => import('@/views/pages/orders.vue')
                },
                {
                    path: '/subscribers',
                    name: 'subscribers',
                    component: () => import('@/views/pages/subscribers.vue')
                }
            ]
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue'),
            meta: { redirectIfLoggedIn: true }
        },

    ]
});
// const isUserLoggedIn = () => !!(localStorage.getItem('userData') && localStorage.getItem('accessToken'));



const nextGourd = (to, from, next) => {
    console.log(to, 'to');
    console.log(from, 'from');
    const isUserLoggedIn = !!localStorage.getItem('token');
    if (to.path === '/auth/login' && isUserLoggedIn) return next('/');

    if (to.path !== '/auth/login' && !isUserLoggedIn) return next('/auth/login');

    return next();
    // console.log('to', to, 'from', from, to.meta.redirectIfLoggedIn,!isUserLoggedIn);
    // if (to.meta.redirectIfLoggedIn && !isUserLoggedIn) return next();
    // if (to.meta.redirectIfLoggedIn && !isUserLoggedIn) {
    //     return next('/dashboard')
    // };
    // else if(!isUserLoggedIn() && canNavigate(to)) {
    //
    //     localStorage.clear()
    //
    //     return next('/login')
    //
    // }
    // else if(isUserLoggedIn() && canNavigate(to)) {
    //
    //     return  next()
    //
    // }
    // else if(isUserLoggedIn() && !canNavigate(to)) {
    //
    //     if(isUserLoggedIn() && to.path === '/') return next('/dashboards/crm')
    //
    //     if(!isUserLoggedIn() && to.path === '/') return next('/login')
    //
    //     return  next("/not-authorized")
    //
    // }
    // if (!isUserLoggedIn && !roleAccessChek(to)) return next('/auth/login');
    // else
    //     return next();
};
router.beforeEach(nextGourd);
export default router;
