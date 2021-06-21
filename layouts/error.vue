<template>
  <div
    class="
      d-flex
      row
      justify-content-center
      align-items-center
      fullpage-error
      mx-4
    "
  >
    <div class="col-md-3 col-sm-12">
      <h2 class="title mb-3">Sorry, Something Wrong</h2>
      <nuxt-link class="btn btn-primary" to="/">Back to Homepage</nuxt-link>
    </div>
    <div class="col-md-3 col-sm-12">
      <img src="../static/images/errorpage.png" alt="Error Page" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'fullpage',
}
</script>

<style scoped>
.fullpage-error {
  margin-top: 130px;
}
</style>
