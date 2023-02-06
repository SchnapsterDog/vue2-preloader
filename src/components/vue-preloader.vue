<template>
	<div 
    class="preloader"
    :style="preloaderStyle"
  >
		<div
      v-if="showPercent"
      class="percent"
    >
			{{ width }} %
		</div>
		<div
      v-if="showBar"
      class="bar"
    >
			<div
        class="barconfirm"
        ref="barconfirm"
      />
		</div>
	</div>
</template>
<script>
export default {
	name: 'VuePreloader',
	data() {
		return {
			showBar: true,
      showPercent: true,
      width: 0
		}
	},
	computed: {
		preloaderStyle() {
			return this.width >= 100 ? 'width: 0%' : ''
		}
	},
	watch: {
		width: {
			handler(width) {
				if (width < 100) {
					setTimeout(() => {
						this.width = width += 1
						this.$refs.barconfirm.style.width = this.width + '%'
					}, 15)
				} else {
					this.showBar = false
					this.showPercent = false
				}
			}
		}
	},
	mounted() {
		this.width = this.width += 1
	}
}
</script>
<style lang="css">
.preloader {
	position: fixed;
	display: flex;
	top: 0;
	left: 0;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
	z-index: 100;
	background-color: #091a28;
	flex-direction: column;
	transition: all 1.4s ease-in-out;
}

.percent {
	color: white;
	transition: all 0.2s ease-in-out;
}

.bar {
	width: 60%;
	margin-top: 20px;
}

.barconfirm {
	width: 1%;
	padding: 1px 0;
	background-color: white;
}
</style>