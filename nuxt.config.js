export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'OpenRun',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/vue-formulate',
    '~/plugins/repository',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontawesome',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url: '/auth/logout',
            method: 'post',
          },
          user: {
            url: '/auth/user',
            method: 'get',
            propertyName: 'user',
          },
        },
      },
      'laravel.passport': {
        url: 'http://openrun-api.test/v1/',
        client_id: 1,
        client_secret: 'sdLbmc9vkVje0oMTijKA7wNLje4XNRRAheD10r0w',
      },
    },
  },

  axios: {
    baseURL: 'http://openrun-api.test/v1/',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    config: {
      purge: [],
      theme: {
        extend: {
          colors: {
            'brand-blue': '#2f6cc1',
            'brand-dark-blue': '#204a83',
          },
        },
      },
      variants: {
        extend: {
          space: ['hover'],
        }
      },
      plugins: [],
    }
  },

  googleFonts: {
    families: {
      'Source+Sans+Pro': true,
    },
  },
}
