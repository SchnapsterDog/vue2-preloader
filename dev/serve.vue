<script>
import Vue from "vue";
// Uncomment import and local "components" registration if library is not registered globally.
import { VuePreloader } from "@/entry.esm";

export default Vue.extend({
	name: "ServeDev",
	components: {
		VuePreloader,
	},
});
</script>

<template>
	<div id="app">
		<vue-preloader id="id" transition-type="fade-up">
		</vue-preloader>
	</div>
</template>
