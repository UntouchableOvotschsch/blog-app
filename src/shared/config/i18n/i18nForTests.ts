import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'ru',
    debug: false,
    // react: {
    //     useSuspense: false, //   <---- this will do the magic
    // },
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    resources: { ru: { translations: {} } },
});

export default i18n;
