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
                    username: 'Username',
                    password: 'Password',
                    register: 'Don\'t have an account? Register',
                    errorUsername: 'You must enter your username',
                    errorPassword: 'You must enter your password'
                },
            },
        },
        es: {
            translation: {
                Login: {
                    login: 'Iniciar sesión',
                    username: 'Nombre de usuario',
                    password: 'Contraseña',
                    register: '¿No tiene una cuenta? Regístrate',
                    errorUsername: 'Debes introducir tu nombre de usuario',
                    errorPassword: 'Debes introducir tu contraseña'
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
