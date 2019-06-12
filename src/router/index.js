import Vue from 'vue';
import Router from 'vue-router';
import Pos from '@/components/pages/Pos';
import Goods from '@/components/pages/Goods';
import Member from '@/components/pages/Member';
import Shop from '@/components/pages/Shop';
import Statistics from '@/components/pages/Statistics';
import Install from '@/components/pages/Install';

Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'nav-active',
    routes: [
        {
            path: '/',
            redirect: '/pos'
        },
        {
            path: '/pos',
            name: 'Pos',
            component: Pos
        },
        {
            path: '/goods',
            name: 'Goods',
            component: Goods
        },
        {
            path: '/member',
            name: 'Member',
            component: Member
        },
        {
            path: '/shop',
            name: 'Shop',
            component: Shop
        },
        {
            path: '/statistics',
            name: 'Statistics',
            component: Statistics
        },
        {
            path: '/install',
            name: 'Install',
            component: Install
        }
    ]
});
