import { type RouterOptions, createRouter, createWebHistory } from 'vue-router';
import { isLoggedIn } from './auth';
import DashboardPage from './pages/DashboardPage.vue';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';

export const PageName = {
    HOME: 'home-page',
    DASHBOARD: 'dashboard-page',
    LOGIN: 'login-page',
};

const routes = [
    {
        path: '/',
        name: PageName.HOME,
        components: {
            page: HomePage,
        },
    },
    {
        path: '/dashboard',
        name: PageName.DASHBOARD,
        components: {
            page: DashboardPage,
        },
    },
    {
        path: '/login',
        name: PageName.LOGIN,
        components: {
            page: LoginPage,
        },
    },
];

const routerOptions = {
    history: createWebHistory(),
    routes,
};

const router = createRouter(routerOptions as RouterOptions);

// Navigation guard to check authentication before each route
router.beforeEach((to, from, next) => {
    if (!isLoggedIn() && to.name !== PageName.LOGIN) {
        next({ name: PageName.LOGIN });
    } else {
        next();
    }
});

export default router;
