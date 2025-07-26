import { createI18n } from 'vue-i18n';

import en_us from './en-US.json';
import ru_ru from './ru-RU.json';

function loadLocaleMessages() {
  const messages = {
    'en-US': en_us,
    'ru-RU': ru_ru,
  };
  return messages;
}

const i18n = createI18n({
  locale: window.localStorage.getItem('storedLanguage'),
  fallbackLocale: 'en-US',
  silentFallbackWarn: true,
  messages: loadLocaleMessages(),
  globalInjection: false,
  legacy: false,
});

export default i18n;