<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <div class="nav__perfil">
          <div class="nav__img">
            <img src="../../assets/img/perfil.png" alt="" />
          </div>
          <a href="#" class="text-decoration-none text-dark"
            ><strong>Wakdemah</strong>
          </a>
        </div>
      </div>
      <div class="d-flex">
        <nav class="nav__menu" ref="navmenu" id="nav-menu">
          <div class="nav__content bd-grid">
            <div class="nav__menu d-flex">
              <ul class="nav__list">
                <li class="nav__item">
                  <a href="#" class="nav__link active">Beranda</a>
                </li>
                <li class="nav__item">
                  <a href="#" class="nav__link">Berita</a>
                </li>
                <li class="nav__item">
                  <a href="#" class="nav__link">Tutorial</a>
                </li>
                <li class="nav__item">
                  <a href="#" class="nav__link">Keahlian </a>
                </li>
                <li class="nav__item">
                  <a href="#" class="nav__link">Portfolio</a>
                </li>
                <li class="nav__item">
                  <a href="#" class="nav__link">Kontak</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  watch: {},
  methods: {},
}
</script>

<style lang="scss"></style>
