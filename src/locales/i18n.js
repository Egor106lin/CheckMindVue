import { createI18n } from 'vue-i18n';
import { ref } from 'vue';

import en_us from './en-US.json';
import ru_ru from './ru-RU.json';

function loadLocaleMessages() {
  const messages = {
    'en-US': en_us,
    'ru-RU': ru_ru,
  };
  return messages;
}

const language = ref(localStorage.getItem('locale'))

const i18n = createI18n({
  locale: language.value,
  fallbackLocale: 'en-US',
  silentFallbackWarn: true,
  messages: loadLocaleMessages(),
  globalInjection: false,
  legacy: false,
});

export default i18n;