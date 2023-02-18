<template>
  <div class="calculator-view">
    <CalculatorDisplay />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CalculatorDisplay from "@/components/CalculatorDisplay.vue"; // @ is an alias to /src

export default defineComponent({
  name: "CalculatorView",
  components: {
    CalculatorDisplay,
  },
});
</script>
<style lang="scss" scoped>
.calculator-view {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
