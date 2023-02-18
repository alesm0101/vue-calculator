<template>
  <div class="calculator">
    <div class="display">
      <p>{{ currentValue == null ? initalValue : currentValue }}</p>
    </div>
    <template v-for="(padKey, i) in padKeys" :key="i">
      <div class="buttons-row">
        <button
          v-for="(key, index) in padKey"
          :key="index"
          class="square"
          @click="onPadEvent(key)"
        >
          <span>{{ key }}</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CalculatorDisplay",
  data() {
    return {
      padKeys: [
        ["C", "Del", "%", "/"],
        [7, 8, 9, "x"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
        [0, ".", "="],
      ],
      operators: ["x", "-", "+", "/", "%"],
      initalValue: null as null | number,
      currentValue: null as null | number,
      isLastKeyOperator: false,
      isOnInitialValue: true,
      isLastKeyComma: false,
      currentOperator: "",
    };
  },
  methods: {
    onPadEvent(value: number | string) {
      if (value === "=") {
        this.calculate();
      } else if (value === ".") {
        this.isLastKeyComma = true;
        console.log(value);
        // this.currentOperator = "";
      } else if (typeof value === "number") {
        this.setNumbers(value);
      } else if (this.operators.includes(value)) {
        // TODO ver %
        // TODO Ver si llamo a calculate segun que clicke
        if (this.initalValue != null) {
          this.currentOperator = value;
          this.isLastKeyComma = false;
          this.isLastKeyOperator = true;
          this.isOnInitialValue = false;
        }
      } else if (value === "C") {
        this.resetValues();
      } else if (value === "Del") {
        // TODO this.operation = this.operation.slice(0, -1);
      }
    },
    resetValues() {
      this.isLastKeyComma = false;
      this.currentOperator = "";
      this.isLastKeyOperator = false;
      this.isOnInitialValue = true;
      this.initalValue = null;
      this.currentValue = null;
    },
    setNumbers(value: number) {
      // TODO support 0.
      // first time initalValue is null
      if (this.isLastKeyOperator) {
        this.currentValue = value;
      } else {
        if (this.isOnInitialValue) {
          // TODO agregar como si isLastKeyComma y resetear
          this.initalValue =
            this.initalValue === null
              ? value
              : Number(`${this.initalValue}${value}`);
        } else {
          this.currentValue =
            this.currentValue === null
              ? value
              : Number(`${this.currentValue}${value}`);
        }
      }
      this.isLastKeyOperator = false;
      this.isLastKeyComma = false;
      // this.currentOperator = "";
    },
    calculate() {
      // TOdo reasing value 2 to 1 y resetear el 2
      // todo ver que mas reseteo
      this.isLastKeyComma = false;
      // todo ver la primera vez
      if (
        this.currentValue != null &&
        this.initalValue != null &&
        this.currentOperator
      ) {
        const pValue = Number(this.initalValue);
        const cValue = Number(this.currentValue);
        if (this.currentOperator === "+") {
          this.currentValue = pValue + cValue;
        } else if (this.currentOperator === "-") {
          this.currentValue = pValue - cValue;
        } else if (this.currentOperator === "x") {
          this.currentValue = pValue * cValue;
        } else if (this.currentOperator === "/") {
          // todo validate / 0
          this.currentValue = pValue / cValue;
        }
        // TODO % just is x - o + x da el porcentaje
      }
      // this.currentOperator = "";
    },
  },
});
</script>

<style scoped lang="scss">
.calculator {
  .display {
    text-align: right;
    background-color: var(--color-secondary);
    padding: 1em 0.5em;
    margin: 0.5em 0;
    border-radius: 10px;
    p {
      padding: 0;
      margin: 0;
      min-height: 1.2em;
      &.big {
        font-size: 2em;
        min-height: 1.25em;
      }
    }
  }
  .buttons-row {
    button {
      cursor: pointer;
      width: 60px;
      height: 60px;
      border: 0;
      border-radius: 10px;
      background-color: var(--color-primary);
      margin: 2px;
    }
  }
}
</style>
