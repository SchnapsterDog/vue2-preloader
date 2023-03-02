<template>
	<div
    :class="$style.preloader"
    :style="[
      preloaderBackgroundColor,
      preloaderTransitionSpeed,
      preloaderTransitionType
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
import { transitionMap } from '../utils/transitionmap'

export default {
  name: "VuePreloader",
  props: {
    backgroundColor: VueTypes.string.def('#091a28'),
    color: VueTypes.string.def('#ffffff'),
    loadingSpeed:  VueTypes.number.def(15),
    transitionSpeed:  VueTypes.number.def(1400),
    transitionType: VueTypes.string.def('fade-left')
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
    preloaderTransitionSpeed() {
      return { transition: `all ${this.transitionSpeed}ms ease-in-out` };
    },
    preloaderTransitionType() {
      if (this.percent >= 100) {
        return transitionMap[this.transitionType] || transitionMap.default
      }
      return
    }
  },
  watch: {
    percent: {
      handler(percent) {
        if (percent < 100) {
          setTimeout(() => {
            this.percent = percent += 1
            if (this.$refs.loadingbar) {
              this.$refs.loadingbar.style.width = `${this.percent}%`
            }
          }, this.loadingSpeed)
        } else {
          this.loadingIsOver()
          this.transitionIsOver()
        }
      },
    },
  },
  methods: {
    loadingIsOver() {
      this.$emit('loading-is-over')
    },
    setOverflowAuto() {
      document.body.style.overflow = 'auto'
    },
    setOverflowHidden() {
      document.body.style.overflow = 'hidden'
    },
    transitionIsOver() {
      setTimeout(() => {
        this.$emit('transition-is-over')
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