/* Polyfill */
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from 'vue';
import App from './App.vue';

/* Plugins */

import i18n from '@/plugins/vue-i18n';

const defaultTrigger = window.matchMedia('(hover: hover) and (pointer: fine)').matches ? 'hover focus' : 'focus';

import VTooltip from 'v-tooltip';
Vue.use(VTooltip, { popover: { defaultOffset: '10', defaultContainer: '#main' }, defaultTrigger, defaultPlacement: 'auto', defaultOffset: '5', defaultBoundariesElement: 'window', defaultContainer: '#main' });

/* Accessibility */

import('focus-visible');

Vue.config.productionTip = process.env.NODE_ENV === 'production';

const app = new Vue({
  name: 'Embed3d',
  i18n,
  render: h => h(App)
});

app.$mount('#app');

export default app;
