var CF = {};

import Vue from 'vue';
import Ajax from './extend/ajax';
import Connet from './extend/connect';
import M5B from './extend/md5';
import Jsmpeg from './lib/jsmpeg.min.js';
import gmSdk from './lib/gmSdk.js';
import VueRouter from 'vue-router';
import TOOLS from './extend/tools';
import timers from './extend/timers';
import queue from './extend/queue';
import Fetch from './extend/fetch.js';
import GameSDK from './extend/gameSDK';

CF.Vue = Vue;
CF.gmSdk = gmSdk;
CF.Ajax = Ajax;
CF.Connet = Connet;
CF.pubsub = new Vue();
CF.JSMpeg = Jsmpeg;
CF.M5B = M5B;
CF.TOOLS = TOOLS;
CF.timers = timers;
CF.Queue = queue;
CF.Fetch = Fetch;
CF.GameSDK = GameSDK;
CF.user = {};

CF.gameInfo = {

       // host:'https://h5wwj.xintiao100.com/development/', //测试服
       // env:1,

    host: 'https://h5wwj.xintiao100.com/production/', //正式服
    env:2,

    // socketBallHost: 'h5wwj.xintiao100.com',

};

CF.Vue.directive('disabletouchmove', {
    bind: (el, binding, vnode, oldVnode) => {
        let cb_name = binding.expression;
        if (cb_name) {
            var cb = vnode.context[cb_name];
        }
        el.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (cb && cb()) {
            } else {
                e.preventDefault();
            }
        })
    },
    unbind: (el) => {
        el.removeEventListener('touchmove', (e) => {
            e.preventDefault()
        }, false)
    }
});

CF.VueRouter = VueRouter;

CF.Vue.use(CF.VueRouter);

export default CF;
