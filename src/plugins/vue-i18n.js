import Vue from 'vue';
import VueI18n from 'vue-i18n';

import en from '@/locales/en.json';

Vue.use(VueI18n);

const loadedLanguages = [];

export function getLanguage() {
  // User or system can force a link to be rendered with a certain language (useful for SEO)
  const urlParams = new URLSearchParams(window.location.search);
  const langQueryParam = urlParams.get('lang');

  const navLang = navigator.language.split('-')[0] || navigator.userLanguage.split('-')[0];

  const lang = langQueryParam || navLang || 'en';

  loadLanguageAsync(lang);

  return lang;
}

function setI18nLanguage(lang) {
  i18n.locale = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  if (loadedLanguages.includes(lang)) {
    if (i18n.locale !== lang) setI18nLanguage(lang);
    return Promise.resolve();
  }

  return import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.json`).then(
    response => {
      loadedLanguages.push(lang);
      i18n.setLocaleMessage(lang, response);
      setI18nLanguage(lang);
    }
  );
}

export const i18n = new VueI18n({
  locale: getLanguage(),
  fallbackLocale: 'en',
  messages: { en },
  postTranslation: (str) => str.replace(' ?', '\xa0?').replace(' !', '\xa0!')
});

export default i18n;
