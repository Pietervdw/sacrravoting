// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-vuefire',
        '@pinia/nuxt',
    ],
    tailwindcss: {
        configPath: 'tailwind.config.js'
    },
    vuefire: {
        auth: {
            enabled: false,
            sessionCookie: false
        },
        config: {
            authDomain: "sacrravoting.firebaseapp.com",
            projectId: "sacrravoting",
            storageBucket: "sacrravoting.appspot.com",
            messagingSenderId: "765471833616",
            appId: "1:765471833616:web:ee2d6c4a932155f0a55495"
        },
    },
    nitro: {
        firebase: {
            gen: 2
        }
    }

})