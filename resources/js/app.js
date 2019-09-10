/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import moment from 'moment';
import 'moment/locale/id';
import { Form, HasError, AlertError } from 'vform';
import VueRouter from 'vue-router'
import VueProgressBar from 'vue-progressbar'
import Swal from 'sweetalert2'

import dashboard from './components/Dashboard.vue'
import profile from './components/Profile.vue'
import users from './components/Users.vue'
import developer from './components/Developer.vue'

window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})

Vue.use(VueRouter);

let routes = [
    { path: '/dasboard', component: dashboard },
    { path: '/profile', component: profile },
    { path: '/users', component: users },
    { path: '/developer', component: developer }
]

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes // short for `routes: routes`
})

Vue.filter('upFirtsText', function (text) {
    if (text != null) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
})

Vue.filter('myDate', function (text) {
    if (text != null) {
        return moment(text).format('Do MMMM YYYY');
    }
})

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
})
window.Toast = Toast;
window.Swal = Swal;

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

const app = new Vue({
    el: '#app',
    router
});
