<template>
  <div
    :class="$style.preloader"
    :style="preloader"
  >
    <slot
      name="container"
      v-bind="{ percent }"
    >
      <div
        v-if="percent < 100"
        :class="$style.percentBar"
        :style="percentBackgroundColor"
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
          :style="barBackgroundColor"
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
    barColor: VueTypes.string.def('#ffffff'),
    percentColor: VueTypes.string.def('#ffffff'),
    percentSpeed:  VueTypes.number.def(15),
    transitionOn: VueTypes.bool.def(true),
    transitionSpeed:  VueTypes.number.def(1400)
  },
  data() {
    return {
      percent: 0
    };
  },
  computed: {
    barBackgroundColor() {
      return `background-color: ${this.barColor};`;
    },
    percentBackgroundColor() {
      return `color: ${this.percentColor};`;
    },
    preloader() {
      return this.percent >= 100
        ? `width: 0%; background-color: ${this.backgroundColor}; transition: all ${this.transitionSpeed}ms ease-in-out`
        : `background-color: ${this.backgroundColor}; transition: all ${this.transitionSpeed}ms ease-in-out`;
    }
  },
  watch: {
    percent: {
      handler(percent) {
        if (percent < 100) {
          setTimeout(() => {
            this.percent = percent += 1;
            this.$refs.loadingbar.style.width = `${this.percent}%`;
          }, this.percentSpeed);
        }
      },
    },
  },
  mounted() {
    this.percent = this.percent += 1;
  }
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