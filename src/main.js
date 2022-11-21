/* eslint-disable sort-imports */

/* Polyfill */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
require('intersection-observer'); // For Safari

import Vue from 'vue';
import App from './App.vue';

/* Plugins */

import i18n from '@/plugins/vue-i18n';


/* Design */

import VueLoadingOverlay from 'vue-loading-overlay';
Vue.component('Loading', VueLoadingOverlay);

const defaultTrigger = window.matchMedia('(hover: hover) and (pointer: fine)').matches ? 'hover focus' : 'focus';

import VTooltip from 'v-tooltip';
Vue.use(VTooltip, { popover: { defaultOffset: '10', defaultContainer: '#main' }, defaultTrigger, defaultPlacement: 'auto', defaultOffset: '5', defaultBoundariesElement: 'window', defaultContainer: '#main' });

import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  listenEvents: ['scroll'],
  error: require('@/assets/images/error.png'), // Don't use SVG, bug in safari : https://stackoverflow.com/questions/21536937/svg-resizes-on-hover-in-safari-only
  // loading: require('@/assets/images/loading.png'),
  observer: true
});

import { InlineSvgPlugin } from 'vue-inline-svg';
Vue.use(InlineSvgPlugin);

import vTostini from 'v-tostini';
Vue.use(vTostini);

/* Performance */

import VueStatic from 'vue-static';
Vue.use(VueStatic);

import VueForceNextTick from 'vue-force-next-tick';
Vue.use(VueForceNextTick);

/* Accessibility */

import('focus-visible');

Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.config.keyCodes = {
  shift: 16 // imageView3D: show/hide the image
};

const app = new Vue({
  name: 'Embed3d',
  i18n,
  render: h => h(App)
});

app.$mount('#app');

export default app;
