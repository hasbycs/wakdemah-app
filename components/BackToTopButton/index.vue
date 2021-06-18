<template>
  <button
    :class="['button-back-to-top', !showButton && 'is-hidden']"
    @click="onScrollToTop"
  >
    <b-icon class="nav-icon" icon="arrow-up" font-scale="1"></b-icon>
  </button>
</template>

<script>
import _throttle from 'lodash/throttle'
import _debounce from 'lodash/debounce'

const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
}

export default {
  data() {
    return {
      showButton: false,
      isInit: false,
      currentScrollY: 0,
      scrollingDirection: null,
      isScrollingToTop: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      if (!this.isInit) {
        this.removeWindowEventListeners()
        this.addWindowEventListeners()
        this.isInit = true
      }
    },
    addWindowEventListeners() {
      window.addEventListener('scroll', this.onScrollListener)
      window.addEventListener('scroll', this.onScrollEndListener)
    },
    removeWindowEventListeners() {
      window.removeEventListener('scroll', this.onScrollListener)
      window.removeEventListener('scroll', this.onScrollEndListener)
    },
    onScrollListener: _throttle(function (e) {
      const top = window.scrollY
      const innerHeight = window.innerHeight
      const totalHeight = document.documentElement.scrollHeight

      if (totalHeight <= innerHeight || this.isScrollingToTop) {
        return
      }

      const diff = Math.abs(top - this.currentScrollY)
      if (diff > innerHeight / 2) {
        if (top > this.currentScrollY) {
          this.scrollingDirection = DIRECTION.DOWN
          this.showButton = top > innerHeight
        } else {
          this.scrollingDirection = DIRECTION.UP
          this.showButton = false
        }
        this.currentScrollY = top
      }
    }, 1000 / 60),
    onScrollEndListener: _debounce(function (e) {
      this.isScrollingToTop = false
      this.onScrollListener()
    }, 350),
    onScrollToTop(e) {
      this.isScrollingToTop = true
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.button-back-to-top {
  --translateY: -6rem;
  right: 2rem;
  bottom: 0;
  transform: translateY(var(--translateY));
  transition-property: transform, opacity;
  transition-duration: 0.45s;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 10;
  position: fixed;
  width: 4rem;
  height: 4rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 9999px;
  color: #fff;
  font-size: 1.25rem;
  background-color: #5aaa4e;

  // @screen lg {
  //   --translateY: -2rem;
  // }

  &:focus,
  &:active {
    outline: none;
  }

  &:focus,
  &:hover {
    background-color: #76b74b;
  }

  &:active {
    background-color: #b7eeae;
  }

  &.is-hidden {
    opacity: 0;
    transform: translateY(4rem);
  }

  &:not(.is-hidden) {
    opacity: 1;
  }
}
</style>
