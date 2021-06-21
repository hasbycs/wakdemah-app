<template>
  <div class="d-none d-lg-block">
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
                <li class="nav__item"></li>
              </ul>
              <div id="icon" class="icon-dark-mode">
                <input type="checkbox" id="theme-toggle" v-model="nightMode" />
                <label for="theme-toggle"><span></span></label>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
const STATUS = {
  dark: 'dark',
  light: 'light',
}
export default {
  data() {
    return {
      nightMode:
        process.browser && localStorage.getItem('nightMode') == STATUS.dark
          ? true
          : false,
    }
  },
  created() {},
  watch: {
    nightMode(v) {
      let state = v ? STATUS.dark : STATUS.light
      localStorage.setItem('nightMode', state)
      this.$store.dispatch('darkMode/setDarkMode', state)
    },
  },
  methods: {},
}
</script>

<style lang="scss">
:root {
  --toggle-size: 1rem;
  --switch-w: 4em;
  --switch-h: 2em;
  --switch-handle-scale: 0.65;
  --switch-off-handle-x: -0.125em;
  --switch-on-handle-x: calc(100% - 0.125em);
  --switch-transition-duration: 0.2s;
}
#theme-toggle {
  display: none;

  & + label {
    font-size: var(--toggle-size);
    display: flex;
    height: var(--switch-h);
    width: var(--switch-w);
    border-radius: calc(var(--switch-h) / 2);
    background-size: auto 8em;
    background-position: bottom;
    background-image: linear-gradient(
      180deg,
      #021037 0%,
      #20206a 19%,
      #4184b1 66%,
      #62e7f7 100%
    );
    transition: var(--switch-transition-duration);
    border: 0.125em solid hsl(207, 30%, 95%);
    overflow: hidden;

    span {
      background: #fffad8;
      border-radius: 50%;
      height: var(--switch-h);
      width: var(--switch-h);
      transform: translateX(var(--switch-off-handle-x))
        scale(var(--switch-handle-scale));
      transition: var(--switch-transition-duration);
      cursor: pointer;
      box-shadow: 0 0 0.25em 0.0625em #fbee8d, 0 0 2em 0 #ffeb3b,
        inset -0.25em -0.25em 0 0 #fbee8e,
        inset -0.3125em -0.3125em 0 0.625em #fff5b2;
      margin-top: var(--switch-off-handle-x);
    }
  }

  &:checked {
    font-size: var(--switch-font-size);

    & + label {
      background-position: top;
      border-color: hsl(207, 30%, 50%);

      span {
        background: transparent;
        transform: translateX(var(--switch-on-handle-x))
          scale(var(--switch-handle-scale));
        box-shadow: inset -0.1875em -0.1875em 0 0 #fbe7ef,
          inset -0.5625em -0.5625em 0 0 #fffff7;
      }
    }
  }
}

/*-- Housekeeping --*/

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  margin: 0;
}

#page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
}
</style>
