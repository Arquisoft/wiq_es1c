import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
    resources: {
        en: {
            translation: {
                Login: {
                    login: 'Login',
                },
            },
        },
        es: {
            translation: {
                Login: {
                    login: 'Iniciar sesión',
                },
            },
        },
    },
    lng: "es", // if you're using a language detector, do not define the lng option
    fallbackLng: "es",
    interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
});
