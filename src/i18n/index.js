import { createI18n } from 'vue-i18n';

// import translations
import ru from '@/i18n/locales/ru.json';
import en from '@/i18n/locales/en.json';
import uz from '@/i18n/locales/uz.json';

// configure index
const index = createI18n({
    locale: localStorage.getItem('locale')||'en',
    fallbackLocale: 'en',
    legacy: false,
    globalInjection: true,
    messages: { ru, en, uz }
});

export default index;
