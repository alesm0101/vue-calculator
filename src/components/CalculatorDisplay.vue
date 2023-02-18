<template>
  <div class="calculator">
    <div class="display">
      <p class="big">{{ displayFull }}</p>
      <p>{{ displayValue }}</p>
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
        [0, ".", "="], // TODO , * / or . x %
      ],
      operators: ["x", "-", "+", "/", "%"],

      displayFull: "",
      displayValue: 0,
    };
  },
  methods: {
    onPadEvent(value: number | string) {
      // change to switch
      if (value === "=") {
        this.calculate();
      } else if (value === ".") {
        this.setComma();
      } else if (typeof value === "number") {
        this.setNumbers(value);
      } else if (this.operators.includes(value)) {
        this.setOperator(value);
      } else if (value === "C") {
        this.resetValues();
      } else if (value === "Del") {
        this.removeCharacter();
      }
    },
    resetValues() {
      this.displayFull = "";
      this.displayValue = 0;
    },
    removeCharacter() {
      const hasNumber = this.displayValue.toString().length > 1;
      if (hasNumber) {
        const newValue = this.displayValue.toString().slice(0, -1);
        this.displayValue = Number(newValue);
      } else {
        this.displayValue = 0;
      }
      // TODO ver si es necesario que borre si es un operador y actualize displayFull ademas
    },
    setNumbers(value: number) {
      const v = value.toString();
      const hasDefaultValue = this.displayValue === 0;
      if (hasDefaultValue) {
        this.displayValue = value;
      } else {
        // TODO ACA SI EL ULTIMO de displayFull ES UN operador reseat
        if (this.displayFull.length > 1) {
          const lastCharacter = this.displayFull.slice(-1);
          if (this.operators.includes(lastCharacter)) {
            this.displayValue = value;
          }
        } else {
          // console.log(this.displayValue + v);
          this.displayValue = Number(`${this.displayValue}${v}`);
        }
      }
      // TODO CHECK
      this.displayFull = this.displayFull + v;
    },
    setOperator(value: string) {
      this.displayFull = `${this.displayFull}${value}`;
      // TODO temporal resolve any operator (- + x /) as = WHEN
      if (this.displayFull.length > 1) {
        const lastCharacter = this.displayFull.slice(-1);
        console.log("lastCharacter", lastCharacter);
        const isLastCharacterANumber = !isNaN(Number(lastCharacter));
        console.log("isLastCharacterANumber", isLastCharacterANumber);
        if (isLastCharacterANumber) {
          this.calculate();
        }
      }
      // TODO no salvar dos operdores juntos 2**2
    },
    setComma() {
      console.log("setComma");
      // TODO ver si ya no tiene una comma antes
      // al poner coma despues de + psara a "0," despues se elimina en el calculae
      // this.currentOperator = "";
    },
    calculate() {
      // validar que el ultimo no sea operador si no solo mostrar el numero que esta
      // tengo que borrar display? or como hAGO PARA SEGUIR SUMANDO
      const calculate = this.displayFull.replace(/x/gi, "*");
      this.displayValue = eval(calculate);
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
