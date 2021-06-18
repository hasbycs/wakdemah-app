<template>
  <div>
    <AppBar
      :drawer-active="isDrawerOpen"
      @toggle:drawer="isDrawerOpen = $event"
    />
    <div ref="sidebarTopRef" style="visibility: hidden" />
    <AppDrawer ref="drawer" :show.sync="isDrawerOpen" class="d-lg-none" />
    <div class="bg-white w-100" style="min-height: 75vh">
      <Nuxt />
    </div>
    <BackToTopButton />
    <AppFooter
      v-show="isTopLevelRoute"
      class="bg-white container mx-auto pb-32"
    >
      <Footer class="footer m-4 rounded-lg bg-white shadow-lg" />
    </AppFooter>
  </div>
</template>

<script>
import _throttle from 'lodash/throttle'
import AppBar from '~/components/AppBar'
import AppDrawer from '~/components/AppDrawer'
import Footer from '~/components/Footer'
import BackToTopButton from '~/components/BackToTopButton'

export default {
  components: {
    AppBar,
    AppDrawer,
    Footer,
    BackToTopButton,
  },
  data() {
    return {
      layout: null,
      defaultLayout: 'default',
      alertUpdate: false,
      refreshing: false,
      registration: null,
      isDrawerOpen: false,
    }
  },
  mounted() {
    if ('serviceWorker' in navigator) {
      document.addEventListener('swUpdated', this.showRefreshUI, { once: true })

      // Refresh all open app tabs when a new service worker is installed.
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) {
          return
        }
        this.refreshing = true
        window.location.reload()
      })
    }
  },
  beforeUpdate() {
    this.$nextTick(() => {
      this.setDrawerFixedPosition()
      this.unwatchWindowResize()
      setTimeout(() => {
        this.watchWindowResize()
      }, 50)
    })
  },
  computed: {
    isTopLevelRoute() {
      return (
        this.$route.path.split('/').length < 3 ||
        this.$route.path.match(/\/donate/g)
      )
    },
  },
  methods: {
    watchWindowResize() {
      if (!window) {
        return
      }
      window.addEventListener('resize', this.onWindowResize, { passive: false })
    },
    unwatchWindowResize() {
      window.removeEventListener('resize', this.onWindowResize, {
        passive: false,
      })
    },
    onWindowResize: _throttle(function (e) {
      this.setDrawerFixedPosition()
    }, 1000 / 60),
    setDrawerFixedPosition() {
      const ref = this.$refs.sidebarTopRef
      const drawer = this.$refs.drawer
      if (!ref || !drawer) {
        return
      }
      const top = ref.offsetTop
      drawer.$el.style.setProperty('top', top + 'px')
    },
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail

      this.alertUpdate = true
    },
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

@media screen and (max-width: 768px) {
  .footer {
    padding: 1em;
  }
}
@media screen and (min-width: 768px) {
  .footer {
    padding: 2em;
  }
}
</style>
