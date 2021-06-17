<template>
  <aside class="pe-none" :class="['app-drawer', mShow && 'is-active']">
    <div ref="overlay" class="app-drawer__overlay" @click.self="animateHide" />
    <nav ref="content" class="app-drawer__content bg-white">
      <ul>
        <li v-for="(m, index) in menus" :key="index">
          <a
            v-if="m.children === undefined"
            :class="[
              'app-drawer__menu-item' + ' 33',
              isMenuItemActive(m) && 'is-active',
            ]"
            :href="m.to"
            @click.prevent="onClickMenuItem(m)"
          >
            <b-icon icon="camera" font-scale="1"></b-icon>
            <span>
              {{ m.label }}
            </span>
          </a>
          <a
            v-if="m.children"
            :class="[
              'app-drawer__menu-item',
              isMenuItemActive(m) && 'is-active',
            ]"
            :href="m.to"
            @click.prevent="onClickMenuItem(m, index)"
          >
            <b-icon icon="camera" font-scale="1"></b-icon>
            <span>
              {{ m.label }}
            </span>
          </a>
          <ul v-if="m.children" :class="['hidden ml-5 submenu-' + index]">
            <li v-for="(subm, indexSub) in m.children" :key="indexSub">
              <a
                :class="[
                  ' ml-5 app-drawer__menu-item',
                  isMenuItemActive(subm) && 'is-active',
                ]"
                :href="subm.to"
                @click.prevent="onClickMenuItem(subm)"
              >
                <b-icon icon="camera" font-scale="1"></b-icon>
                <span>
                  {{ subm.label }}
                </span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mShow: false,
      icon: {},
    }
  },
  computed: {
    menus() {
      return [
        { to: '/', label: 'Home', exact: true, icon: '' },
        {
          to: '#',
          label: 'Data',
          icon: '',
          children: [
            { to: '/data', label: 'Statistik', icon: '' },
            {
              to: '/distribution-case',
              label: 'Sebaran Kasus',
              icon: '',
            },
          ],
        },
        {
          to: '/articles?tab=jabar',
          label: 'Berita',
          icon: '',
        },
        { to: '/contact', label: 'Kontak', icon: '' },
        { to: '/faq', label: 'FAQ', icon: '' },
        {
          to: 'https://forum.pikobar.jabarprov.go.id/',
          label: 'Forum',
          icon: '',
        },
        { to: '/donate/logistic', label: 'Donasi', icon: '' },
        {
          to: 'https://bansos.pikobar.jabarprov.go.id/',
          label: 'Bantuan Sosial',
          icon: '',
        },
      ]
    },
  },
  created() {},
  mounted() {
    this.$watch(
      'show',
      function handler(v) {
        this.mShow = v
        this.$nextTick(() => {
          this.animate(v)
        })
      },
      { immediate: false }
    )
  },
  methods: {
    animate(toggled) {
      if (toggled) {
        this.animateShow()
      } else {
        this.animateHide()
      }
    },
    animateShow() {
      this.$emit('update:show', true)
      this.updateOverlayOpacity(1)
      this.showContent(true)
    },
    animateHide() {
      this.$emit('update:show', false)
      this.showContent(false)
      this.updateOverlayOpacity(0)
    },
    updateOverlayOpacity(opacity) {
      const overlay = this.$refs.overlay
      overlay.style.setProperty('opacity', opacity)
    },
    showContent(show) {
      const content = this.$refs.content
      content.style.setProperty(
        'transform',
        `translateX(${show ? '0%' : '-100%'})`
      )
    },
    isExternalLink(path) {
      return path.startsWith('http')
    },
    isMenuItemActive(menu) {
      if (this.isExternalLink(menu.to)) {
        return
      }
      if (menu.exact) {
        return this.$route.path === menu.to
      } else {
        return this.$route.path.startsWith(menu.to)
      }
    },
    onClickMenuItem(menu, index = 0) {
      if (menu.children) {
        const x = document.getElementsByClassName('submenu-' + index)
        if (x[0].style.display === 'none') {
          x[0].style.display = 'block'
        } else {
          x[0].style.display = 'none'
        }
      } else {
        this.animateHide()
        setTimeout(() => {
          if (this.isExternalLink(menu.to)) {
            window.open(menu.to, '_blank')
            return
          }
          this.$router.push(
            {
              path: menu.to,
            },
            null,
            () => {}
          )
        }, 350)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.app-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
}

.app-drawer__content {
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);
  width: 75%;
  max-width: 400px;
  min-width: 300px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  --bg-opacity: 1;
}

.app-drawer__overlay {
  transition: opacity 0.3s ease-out;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.app-drawer.is-active {
  pointer-events: auto !important;
}

.app-drawer__menu-item {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.25rem;
  --text-opacity: 1;
  color: #718096;
  color: rgba(113, 128, 150, var(--text-opacity));
  padding: 1rem;

  &.is-active {
    color: green;
  }

  &:hover {
    color: white;
    background-color: green;
  }
}
</style>
