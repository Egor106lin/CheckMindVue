import { createI18n } from 'vue-i18n';
import en_us from './en-US.json';
import ru_ru from './ru-RU.json';

function loadLocaleMessages() {
    return {
        'en-US': en_us,
        'ru-RU': ru_ru,
    };
}

function normalizeLocale(locale) {
    if (!locale) return 'en-US';
    const supported = ['en-US', 'ru-RU'];
    if (supported.includes(locale)) return locale;
    if (locale.startsWith('ru')) return 'ru-RU';
    return 'en-US';
}

const savedLocale = localStorage.getItem('locale');
const browserLocale = navigator.language;
const initialLocale = normalizeLocale(savedLocale || browserLocale);

const i18n = createI18n({
    locale: initialLocale,
    fallbackLocale: 'en-US',
    silentFallbackWarn: true,
    messages: loadLocaleMessages(),
    globalInjection: false,
    legacy: false,
});

export default i18n;