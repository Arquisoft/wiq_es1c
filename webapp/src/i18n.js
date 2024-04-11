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
                Register: {
                    register: 'Register',
                    username: 'Username',
                    password: 'Password',
                    confirmPassword: 'Confirm password',
                    toRegister: 'Register',
                    login: 'Already have an account? Sign in',
                    errorUsername: 'You must enter your username',
                    errorPassword: 'You must enter your password',
                    errorConfirmPassword: 'Passwords do not match'
                }
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
                Register: {
                    register: 'Regístrate',
                    username: 'Nombre de usuario',
                    password: 'Contraseña',
                    confirmPassword: 'Repetir contraseña',
                    toRegister: 'Registrarme',
                    login: '¿Ya tienes una cuenta? Inicia sesión',
                    errorUsername: 'Debes introducir tu nombre de usuario',
                    errorPassword: 'Debes introducir tu contraseña',
                    errorConfirmPassword: 'Las contraseñas no coinciden'
                }
            },
        },
    },
    lng: "es", // if you're using a language detector, do not define the lng option
    fallbackLng: "es",
    interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
});
