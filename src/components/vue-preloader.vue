<template>
	<div
    :class="$style.preloader"
    :style="[
      preloaderBackgroundColor,
      preloaderTransition,
      preloaderWidth
    ]"
  >
    <slot v-bind="{ color, percent }">
      <div
        v-if="percent < 100"
        :class="$style.percentBar"
        :style="{ color }"
      >
        {{ percent }} %
      </div>
      <div
        v-if="percent < 100"
        :class="$style.loadingWrapper"
      >
        <div
          ref="loadingbar"
          :class="$style.loadingBar"
          :style="{ backgroundColor: color }"
        />
      </div>
    </slot>
  </div>
</template>
<script>
import VueTypes from '../utils/vuetypes';

export default {
  name: "VuePreloader",
  props: {
    backgroundColor: VueTypes.string.def('#091a28'),
    color: VueTypes.string.def('#ffffff'),
    loadingSpeed:  VueTypes.number.def(15),
    transitionOn: VueTypes.bool.def(true),
    transitionSpeed:  VueTypes.number.def(1400)
  },
  data() {
    return {
      percent: 0
    };
  },
  computed: {
    preloaderBackgroundColor() {
      return { backgroundColor: this.backgroundColor };
    },
    preloaderTransition() {
      return { transition: `all ${this.transitionSpeed}ms ease-in-out` };
    },
    preloaderWidth() {
      return this.percent >= 100 ? { width: '0%' } : '';
    }
  },
  watch: {
    percent: {
      handler(percent) {
        if (percent < 100) {
          setTimeout(() => {
            this.percent = percent += 1
            this.$refs.loadingbar.style.width = `${this.percent}%`
          }, this.loadingSpeed)
        } else {
          this.transitionIsOver()
        }
      },
    },
  },
  methods: {
    setOverflowAuto() {
      document.body.style.overflow = 'auto'
    },
    setOverflowHidden() {
      document.body.style.overflow = 'hidden'
    },
    transitionIsOver() {
      setTimeout(() => {
        this.$emit('finish-loading')
        this.setOverflowAuto()
      }, this.transitionSpeed)
    },
  },
  beforeMount() {
    this.setOverflowHidden()
  },
  mounted() {
    this.percent = this.percent += 1
  },
};
</script>
<style lang="css" module>
.preloader {
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 100;
}

.percentBar {
  transition: all 0.2s ease-in-out;
}

.loadingWrapper {
  width: 60%;
  margin-top: 20px;
}

.loadingBar {
  width: 1%;
  padding: 1px 0;
}
</style>