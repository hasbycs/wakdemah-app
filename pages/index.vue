<template>
  <div class="container mx-auto">
    <section id="about" class="about">
      <About />
    </section>
    <section id="content" class="content">
      <Content />
    </section>
  </div>
</template>

<script>
import About from '~/components/Home/about'
import Content from '~/components/Home/content'
export default {
  components: {
    About,
    Content,
  },
}
</script>

<style></style>
