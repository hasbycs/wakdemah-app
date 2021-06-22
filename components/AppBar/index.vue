<template>
  <header
    class="appbar sticky-top bg-white"
    style="box-shadow: 0 0px 32px -4px rgba(0, 0, 0, 0.15)"
  >
    <div
      class="
        container
        mx-auto
        p-3
        d-flex
        justify-content-between
        row
        align-items-center
      "
    >
      <MobileAppBar
        class="mobile col-9 d-lg-none"
        :toggle-drawer="drawerActive"
        @toggle:drawer="$emit('toggle:drawer', $event)"
      />
      <DesktopAppBar class="desktop d-none d-lg-block col-lg-11" />
      <div class="col-2 col-lg-1">
        <div id="icon" class="icon-dark-mode">
          <input type="checkbox" id="theme-toggle" v-model="nightMode" />
          <label for="theme-toggle"><span></span></label>
        </div>
      </div>
      <div class="col-1 col-lg-none"></div>
    </div>
  </header>
</template>

<script>
const STATUS = {
  dark: 'dark',
  light: 'light',
}
export default {
  components: {
    MobileAppBar: () => import('./mobile'),
    DesktopAppBar: () => import('./desktop'),
  },
  props: {
    drawerActive: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    nightMode(v) {
      let state = v ? STATUS.dark : STATUS.light
      localStorage.setItem('nightMode', state)
      this.$store.dispatch('darkMode/setDarkMode', state)
    },
  },
  data() {
    return {
      nightMode:
        process.browser && localStorage.getItem('nightMode') == STATUS.dark
          ? true
          : false,
    }
  },
}
</script>

<style scoped></style>
