<template>
  <div class="calculator">
    <div v-if="!showError" class="display">
      <div class="big">
        <p data-testid="displayFull">{{ displayFull }}</p>
      </div>
      <p data-testid="displayValue">{{ displayValue }}</p>
    </div>
    <div v-else class="display">
      <div class="big">
        <p data-testid="displayFull">{{ displayFull }}</p>
      </div>
      <p data-testid="displayValue">{{ showError }}</p>
    </div>
    <template v-for="(padKey, i) in padKeys" :key="i">
      <div class="buttons-row">
        <button
          v-for="(key, index) in padKey"
          :key="index"
          :data-testid="`key-${key}`"
          class="square"
          :class="{
            expanded: key === 0 || key === 'C',
            operator: isEspacialKey(key),
          }"
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
        ["C", "Del", "/"],
        [7, 8, 9, "x"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
        [0, ".", "="],
      ],
      operators: ["x", "-", "+", "/"],
      displayFull: "0",
      displayValue: "0",
      showError: "",
    };
  },
  methods: {
    onPadEvent(value: number | string) {
      if (value === "C") {
        this.resetValues();
      }
      if (this.showError) {
        return;
      }
      if (value === "=") {
        this.calculate();
      } else if (value === ".") {
        this.setComma();
      } else if (typeof value === "number") {
        this.setNumbers(value);
      } else if (this.operators.includes(value)) {
        this.setOperator(value);
      } else if (value === "Del") {
        this.removeCharacter();
      }
    },
    resetValues() {
      this.displayFull = "0";
      this.displayValue = "0";
      this.showError = "";
    },
    removeCharacter() {
      if (this.isLastCharacterOperator()) {
        // remove operator
        this.displayFull = this.displayFull.slice(0, -1);
      } else {
        const hasMultipleValues = this.displayValue.length > 1;
        const hasNegativeFirst =
          this.displayFull.length == 2 && this.displayFull.slice(0, -1) === "-";

        if (hasMultipleValues && !hasNegativeFirst) {
          // remove number or comma
          this.displayValue = this.displayValue.slice(0, -1);
          this.displayFull = this.displayFull.slice(0, -1);
        } else {
          if (this.displayFull.length > 1 && !hasNegativeFirst) {
            // remove number or comma and replace displayValue for the last one
            this.displayFull = this.displayFull.slice(0, -1);
            const newValue = this.getLastSetNumber(
              this.displayFull.slice(0, -1) // pass without remove operator
            );
            this.displayValue = newValue;
          } else {
            // reset
            this.displayValue = "0";
            this.displayFull = "0";
          }
        }
      }
    },
    setNumbers(value: number) {
      const v = value.toString();
      if (this.displayValue === "0") {
        // not allow double cero before comma
        if (value !== 0) {
          // replace cero with new number
          this.displayValue = v;
          if (this.isLastCharacterOperator()) {
            this.displayFull = this.displayFull + v;
          } else {
            this.displayFull = this.displayFull.slice(0, -1) + v;
          }
        }
      } else {
        // reset display after operator
        if (this.isLastCharacterOperator()) {
          this.displayValue = v;
        } else {
          this.displayValue = this.displayValue + v;
        }
        this.displayFull = this.displayFull + v;
      }
    },
    setOperator(value: string) {
      if (this.isLastCharacterOperator()) {
        // replace operator
        this.displayFull = this.displayFull.slice(0, -1) + value;
      } else {
        if (this.isDivisionByZero()) {
          this.showError = "Division by zero is not allowed";
          return;
        }
        this.displayFull = `${this.displayFull}${value}`;
      }
    },
    setComma() {
      if (this.isLastCharacterOperator()) {
        this.displayValue = "0.";
        this.displayFull = this.displayFull + "0.";
      } else {
        let hasAlreadyComma = this.displayValue.indexOf(".") !== -1;
        if (!hasAlreadyComma) {
          if (this.displayValue.length > 0) {
            this.displayValue = this.displayValue + ".";
            this.displayFull = this.displayFull + ".";
          } else {
            this.displayValue = "0.";
            this.displayFull = this.displayFull + "0.";
          }
        }
      }
    },
    calculate() {
      if (this.isLastCharacterOperator()) {
        this.displayFull = this.displayFull.slice(0, -1);
      }
      const calculate = this.displayFull.replace(/x/gi, "*");
      if (this.isDivisionByZero()) {
        this.showError = "Division by zero is not allowed";
        return;
      }
      this.displayValue = eval(calculate).toString();
      this.displayFull = this.displayValue;
    },
    isEspacialKey(value: string | number) {
      return typeof value === "string" && value !== ".";
    },
    isLastCharacterOperator(): boolean {
      let lastCharacter = "";
      if (this.displayFull.length > 0) {
        lastCharacter = this.displayFull.slice(-1);
      }
      return this.operators.includes(lastCharacter);
    },
    isDivisionByZero(): boolean {
      let last = "";
      if (this.displayFull.length > 2) {
        last = this.displayFull.slice(-2);
      }
      return last === "/0";
    },
    getLastSetNumber(fullValues: string): string {
      let lastOpIndex = -1;
      this.operators.forEach((op, i) => {
        const opIndex = fullValues.lastIndexOf(this.operators[i]);
        lastOpIndex = opIndex > lastOpIndex ? opIndex : lastOpIndex;
      });
      if (lastOpIndex === -1) {
        return fullValues;
      }
      console.log(lastOpIndex);
      const lastBlock = fullValues.substring(lastOpIndex + 1);
      return lastBlock;
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
    }
    .big {
      font-size: 2em;
      min-height: 1.25em;
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
      &:hover {
        background-color: var(--color-primary-shadow);
      }
      &.expanded {
        width: 124px;
      }
      &.operator {
        background-color: var(--color-primary-shadow);
        &:hover {
          filter: brightness(0.85);
        }
      }
    }
  }
}
</style>
