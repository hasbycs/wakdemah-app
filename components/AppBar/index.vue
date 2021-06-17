<template>
  <header
    class="appbar"
    style="box-shadow: 0 0px 32px -4px rgba(0, 0, 0, 0.15)"
  >
    <div class="container mx-auto p-4">
      <MobileAppBar
        :toggle-drawer="drawerActive"
        @toggle:drawer="$emit('toggle:drawer', $event)"
      />
      <DesktopAppBar />
    </div>
  </header>
</template>

<script>
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
}
</script>

<style scoped></style>
