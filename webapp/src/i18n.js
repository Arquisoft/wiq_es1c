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
                    toLogin: 'Login',
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
                },
                Nav: {
                    alertTitle: 'Do you want to return to the home screen?',
                    alertText: 'Your game will end.',
                    alertConfirm: 'Yes, go out',
                    alertCancel: 'No, continue playing',
                },
                Home: {
                    home: 'Home',
                    welcome: 'Welcome, {{ name }}!',
                    howToPlay: 'How to play',
                    tutorialP1: 'When you click on the play button, you will be shown questions along with 4 possible answers, only one of them is true, click on the correct answer to earn points.',
                    tutorialP2: 'The time to answer is limited. The bar at the bottom shows the remaining time. If the time runs out, the question will count as failed and you will move on to the next one.',
                    goodLuck: 'Good luck and show what you know!',
                    playClassic: 'PLAY CLASSIC',
                    playSuddenDeath: 'PLAYING SUDDEN DEATH',
                    chooseTags: 'Choose the tags',
                    infoTags: 'With the tags you can select the categories you want to be asked about.',
                }
            },
        },
        es: {
            translation: {
                Login: {
                    login: 'Iniciar Sesión',
                    toLogin: 'Iniciar sesión',
                    username: 'Nombre de usuario',
                    password: 'Contraseña',
                    register: '¿No tiene una cuenta? Regístrate',
                    errorUsername: 'Debes introducir tu nombre de usuario',
                    errorPassword: 'Debes introducir tu contraseña'
                },
                Register: {
                    register: 'Registro',
                    username: 'Nombre de usuario',
                    password: 'Contraseña',
                    confirmPassword: 'Repetir contraseña',
                    toRegister: 'Registrarme',
                    login: '¿Ya tienes una cuenta? Inicia sesión',
                    errorUsername: 'Debes introducir tu nombre de usuario',
                    errorPassword: 'Debes introducir una contraseña',
                    errorConfirmPassword: 'Las contraseñas no coinciden'
                },
                Nav: {
                    alertTitle: '¿Quieres volver a la pantalla de inicio?',
                    alertText: 'Terminará tu partida.',
                    alertConfirm: 'Sí, salir',
                    alertCancel: 'No, continuar jugando',
                },
                Home: {
                    home: 'Inicio',
                    welcome: '¡Bienvenido, {{ name }}!',
                    howToPlay: 'Cómo jugar',
                    tutorialP1: 'Cuando pulses en el botón de jugar, se te irán mostrando preguntas junto con 4 posibles respuestas, sólo una de ellas es verdadera, haz click sobre la respuesta correcta para ganar puntos.',
                    tutorialP2: 'El tiempo para contestar es limitado. La barra en la parte inferior muestra el tiempo restante. Si el tiempo se termina, la pregunta contará como fallada y se pasará a la siguiente.',
                    goodLuck: '¡Mucha suerte y demuestra lo que sabes!',
                    playClassic: 'JUGAR CLÁSICO',
                    playSuddenDeath: 'JUGAR MUERTE SÚBITA',
                    chooseTags: 'Elige las tags',
                    infoTags: 'Con las tags puedes seleccionar las categorías sobre las que quieres ser preguntado.'
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

export default i18n;