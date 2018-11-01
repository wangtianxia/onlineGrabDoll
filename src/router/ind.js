

import CF from '../CF'
import App from '../app.vue'
import channel from '../channel'
import index from '../js/page/index.vue'
import gameRoom from '../js/page/gameRoom.vue'
import recharge from '../js/page/recharge.vue'
import myDoll from '../js/page/myDoll/myDoll.vue'
import myDoll_state from '../js/page/myDoll/myDoll_state.vue'
import payIframe from '../js/page/payIframe.vue'
import sendDolls from '../js/page/myDoll/sendDolls.vue'
import cashCouponList from '../js/page/cashCouponList.vue'
import rulePage from '../js/page/rulePage.vue'
import uploadPhoto from '../js/page/dollShow/uploadPhoto.vue'
import dollShow from '../js/page/dollShow/dollShow.vue'
import virtualRoom from '../js/page/virtualRoom/virtualRoom.vue';
import qqLogin from '../js/page/qqLogin.vue'
import wifi from '../js/components/wifi/index.vue'
import holdRank from '../js/page/active/holdRank';
import newActive from '../js/page/active/newActive';
import productInfo from '../js/page/productInfo';
import distribution from '../js/distribution/home';
import revenueDetails from '../js/distribution/revenueDetails';
import myLevelInfo from '../js/distribution/myLevelInfo';
import withdraw from '../js/distribution/withdraw';
import withDrawList from '../js/distribution/withdrawList';
import education from "../js/distribution/education";
import payPage from '../js/distribution/payPage';
import customerService from '../js/distribution/customerService'
import limitList from '../js/distribution/distributionCom/limitWithdraw/limitList';
import confirmEmail from '../js/distribution/confirmEmail';
import task from '../js/distribution/task';
import coinList from '../js/distribution/coinList';
import otherGameInfo from '../js/page/otherGame/index';
import phoneFare from '../js/page/phoneFare'


let VueAwesomeSwiper = require('vue-awesome-swiper');
CF.Vue.use(VueAwesomeSwiper);
require('../style/swiper.css');

import tempCommpose from '../js/components/customCom.js'

CF.Vue.use(tempCommpose);

import store from '../js/store/index.js';

CF.channel = channel;

CF.start = function () {

    const routes = [
        {path: '/', component: index, name: 'listPage', meta: {keepAlive: true}},

        {path: '/qqLogin', component: qqLogin, name: 'index', meta: {keepAlive: true}},
        {
            path: '/gameRoom',
            component: gameRoom,
            name: 'gameRoomPage',
            meta: {keepAlive: true},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/recharge',
            component: recharge,
            name: 'rechargePage',
            meta: {keepAlive: false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/myDoll',
            component: myDoll,
            name: 'myDollPage',
            meta: {keepAlive: true},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/myDoll_statePage/:doll_id',
            component: myDoll_state,
            name: 'myDoll_statePage',
            meta: {keepAlive: false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/payIframe',
            component: payIframe,
            name: 'payIframePage',
            meta: {keepAlive: true},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/sendDollsPage/:doll_id',
            component: sendDolls,
            name: 'sendDollsPage',
            meta: {keepAlive: false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/cashCouponList',
            component: cashCouponList,
            name: 'cashCouponListPage',
            meta: {keepAlive: true},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/rulePage',
            component: rulePage,
            name: 'rulePage',
            meta: {keepAlive: true},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/uploadPhoto',
            component: uploadPhoto,
            name: 'uploadPhotoPage',
            meta: {keepAlive: false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/dollShow',
            component: dollShow,
            name: 'dollShowPage',
            meta: {keepAlive: false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/virtualRoom',
            component: virtualRoom,
            name: 'virtualRoomPage',
            meta: {keepAlive: true},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/wifi',
            component: wifi,
            name: 'wifi',
            meta: {keepAlive: true}
        },

        {
            path: '/holdRank',
            component: holdRank,
            name: 'holdRank',
            meta: {keepAlive: false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path: '/newActive',
            component: newActive,
            name: 'newActive',
            meta: {keepAlive: false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:'/productInfo/:doll_id/:hasNewDollShow',
            component: productInfo,
            name: 'productInfo',
            meta: {keepAlive: false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:'/distribution',
            name:"distribution",
            component:distribution,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/revenueDetails",
            name:'revenueDetails',
            component:revenueDetails,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/myLevelInfo",
            name:'myLevelInfo',
            component:myLevelInfo,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:'/withdraw',
            name:'withdraw',
            component:withdraw,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:'/withdrawList',
            name:'withdrawList',
            component:withDrawList,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/education",
            name:"education",
            component:education,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/payPage",
            name:"payPage",
            component:payPage,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/customerService",
            name:"customerService",
            component:customerService,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/limitList/:time/:money",
            name:"limitList",
            component:limitList,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/confirmEmail",
            name:"confirmEmail",
            component:confirmEmail,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/task",
            name:"task",
            component:task,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/coinList",
            name:"coinList",
            component:coinList,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/otherGameInfo",
            name:"otherGameInfo",
            component:otherGameInfo,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        },

        {
            path:"/phoneFare",
            name:"phoneFare",
            component:phoneFare,
            meta:{keepAlive :false},
            beforeEnter: (to, from, next) => {
                if (!CF.user.uid) {
                    next({replace:true,path:'/'})
                } else {
                    next();
                }
            }
        }
    ];

    const router = new CF.VueRouter({
        routes // （缩写）相当于 routes: routes
    });

    router.beforeEach((to, from, next) => {
        window.scrollTo(0, 0);
        if(!CF.TOOLS.isIos()){
            CF.channel.weReady();
        }
        if (to.fullPath === '/' && CF.TOOLS.getUrlAttribute('is_visiter')) {
            next('/qqLogin');
        } else if (to.fullPath === '/' && CF.TOOLS.getUrlAttribute('is_wifi')) {
            next('/wifi');
        } else {
            next();
        }
    });

    const app = new CF.Vue({
        router,
        store,
        template: '<App/>',
        components: {App}
    }).$mount('#app');

    //用来阻止android手机点击图片自动放大
    if (window.event) {
        window.event.preventDefault();
    }

    CF.app = app;
};

export default CF;