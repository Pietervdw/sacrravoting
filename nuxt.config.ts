// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-vuefire'
    ],
    vuefire: {
        auth: {
            enabled: true,
            sessionCookie: true
        },
        config: {
            apiKey: "AIzaSyDIjHEKoHM0HqTHzpXjY0ZY1ltLmi54P3U",
            authDomain: "sacrravoting.firebaseapp.com",
            projectId: "sacrravoting",
            storageBucket: "sacrravoting.appspot.com",
            messagingSenderId: "765471833616",
            appId: "1:765471833616:web:ee2d6c4a932155f0a55495"
        },
    },
})