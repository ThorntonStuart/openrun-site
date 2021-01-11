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
    '~/plugins/helpers',
    '~/plugins/vue-formulate',
    '~/plugins/vue-the-mask',
    '~/plugins/repository',
    '~/plugins/notifier',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/fontawesome',
    '@nuxtjs/laravel-echo',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/laravel-echo',
    'nuxt-stripe-module',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['epic-spinners'],
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
        client_secret: 'JZfzuk7a3X1sawFlY4WCt4U4AnnpXLJivJCOTkms',
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
          height: {
            'screen-custom': 'calc(100vh - 64px)',
          },
          colors: {
            'brand-blue': '#2f6cc1',
            'brand-light-blue': '#6395d9',
            'brand-lighter-blue': '#dee9f7',
            'brand-dark-blue': '#204a83',
            'paypal': '#fcc438',
            'paypal-dark': '#e4a403',
            'background-success': '#a7f3d0',
            'background-info': '#fde68a',
            'background-danger': '#fecaca',
            'border-success': '#059669',
            'border-info': '#d97706',
            'border-danger': '#dc2626',
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
      'Source+Sans+Pro': [100, 300, 500, 600, 700],
    },
  },

  echo: {
    broadcaster: 'pusher',
    cluster: 'eu',
    authModule: true,
    connectOnLogin: true,
    key: '4aea26852864863e36db',
    forceTLS: true,
  },

  stripe: {
    publishableKey: 'pk_test_qCu3tklT7ZRHzn2pGt6X7whX',
  },
}
