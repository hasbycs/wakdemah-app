<template>
  <div>
    <AppBar
      :drawer-active="isDrawerOpen"
      @toggle:drawer="isDrawerOpen = $event"
    />
    <div ref="sidebarTopRef" style="visibility: hidden" />
    <AppDrawer ref="drawer" :show.sync="isDrawerOpen" class="d-lg-none" />
    <div
      class="full-content w-100"
      style="min-height: 75vh"
      :style="{ backgroundColor: darkMode == 'dark' ? 'black' : 'white' }"
    >
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

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    AppBar,
    AppDrawer,
    Footer,
    BackToTopButton,
  },
  created() {
    this.$store.dispatch('darkMode/setDarkMode')
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
    ...mapState({
      darkMode: (state) => state.darkMode.darkMode,
    }),
  },
  watch: {},
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
.full-content {
}
</style>
