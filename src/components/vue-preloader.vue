<template>
  <div
    :class="$style.preloader"
    :style="preloaderStyle"
  >
    <div
      v-if="width < 100"
      :class="$style.percentBar"
    >
      {{ width }} %
    </div>
    <div
      v-if="width < 100"
      :class="$style.loadingWrapper"
    >
      <div :class="$style.loadingBar" ref="loadingbar" />
    </div>
  </div>
</template>
<script>
export default {
  name: "VuePreloader",
  data() {
    return {
      width: 0
    };
  },
  computed: {
    preloaderStyle() {
      return this.width >= 100 ? "width: 0%" : "";
    },
  },
  watch: {
    width: {
      handler(width) {
        if (width < 100) {
          setTimeout(() => {
            this.width = width += 1;
            this.$refs.loadingbar.style.width = this.width + "%";
          }, 15);
        }
      },
    },
  },
  mounted() {
    this.width = this.width += 1;
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
  background-color: #091a28;
  transition: all 1.4s ease-in-out;
  z-index: 100;
}

.percentBar {
  color: white;
  transition: all 0.2s ease-in-out;
}

.loadingWrapper {
  width: 60%;
  margin-top: 20px;
}

.loadingBar {
  width: 1%;
  padding: 1px 0;
  background-color: white;
}
</style>