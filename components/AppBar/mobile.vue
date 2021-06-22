<template>
  <div class="">
    <a
      v-if="canGoBack"
      class="cursor-pointer d-flex align-items-center"
      href="javascript:void(0)"
      @click.prevent="onGoBack"
    >
      <b-icon icon="arrow-left-short" font-scale="1"></b-icon>
      <div class="text-left px-4">
        <p class="text-lg">Kembali</p>
      </div>
    </a>
    <div
      v-if="!canGoBack"
      class="d-flex justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center">
        <a
          v-show="showDrawerToggle"
          class="cursor-pointer mr-4"
          href="javascript:void(0)"
          @click.prevent="onToggleDrawer"
        >
          <b-icon icon="justify" font-scale="2"></b-icon>
        </a>
        <nuxt-link to="/" tag="div" class="text-left">
          <small>Wakdemah</small><br />
          <small>by hasbycs</small>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toggleDrawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDrawerToggled: false,
    }
  },
  computed: {
    showDrawerToggle() {
      return this.$route.path === '/'
    },
    canGoBack() {
      return this.$route.path !== '/'
    },
    pathToGoBack() {
      return this.$store.state.route.from.path
    },
  },
  watch: {
    toggleDrawer: {
      immediate: true,
      handler(v) {
        this.isDrawerToggled = v
      },
    },
  },
  created() {},
  methods: {
    onToggleDrawer() {
      this.isDrawerToggled = !this.isDrawerToggled
      this.$emit('toggle:drawer', this.isDrawerToggled)
    },
    onGoBack() {
      this.$router.back()
    },
  },
}
</script>

<style scoped>
a {
  color: black;
}
</style>
