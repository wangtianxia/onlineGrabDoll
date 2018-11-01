
import CF from '../../CF.js';
import qqLogin from './qqLogin/index.vue';
import loading from './customCom/loadimg';
import violation from './customCom/violation'

const Vue = CF.Vue;
let componentQQLogin;
let componentLoad;
let componentViolation;

//登陆
const login = (option={})=>{
    let QQLogin = Vue.extend(qqLogin);
    componentQQLogin = new QQLogin({
        data:option
    }).$mount();
    document.querySelector('body').appendChild(componentQQLogin.$el);
};
const hideLogin = ()=>{
    componentQQLogin.$el.parentNode.removeChild(componentQQLogin.$el)
};

//load
const load = (option={})=>{
    let load = Vue.extend(loading);
    componentLoad = new load({
        data:option
    }).$mount();
    document.querySelector('body').appendChild(componentLoad.$el);
};
const hideLoad = ()=>{
    if(componentLoad &&　componentLoad.$el &&  componentLoad.$el.parentNode){
        componentLoad.$el.parentNode.removeChild(componentLoad.$el);
    }
};

//违规
const Violation = (option={})=>{
    let Violation = Vue.extend(violation);
    componentViolation = new Violation({
        data:option
    }).$mount();
    document.querySelector('body').appendChild(componentViolation.$el);
};

const install = (Vue)=>{
    Vue.prototype.$login = login;
    Vue.prototype.$hideLogin = hideLogin;
    Vue.prototype.$load = load;
    Vue.prototype.$violation = Violation;
};
export default install;