import { shallowMount } from "@vue/test-utils";
import CalculatorDisplay from "@/components/CalculatorDisplay.vue";

describe("CalculatorDisplay Cmpt", () => {
  it("convert comma to 0", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-."]').trigger("click");
    const result = wrapper.find('[data-testid="displayValue"]').text();
    expect(result).toBe("0.");
  });
  it("sum two values", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-8"]').trigger("click");
    await wrapper.find('[data-testid="key-x"]').trigger("click");
    await wrapper.find('[data-testid="key-2"]').trigger("click");
    await wrapper.find('[data-testid="key-="]').trigger("click");
    const result = wrapper.find('[data-testid="displayValue"]').text();
    expect(result).toBe("16");
  });
  it("rest two value", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-8"]').trigger("click");
    await wrapper.find('[data-testid="key--"]').trigger("click");
    await wrapper.find('[data-testid="key-2"]').trigger("click");
    await wrapper.find('[data-testid="key-="]').trigger("click");
    const result = wrapper.find('[data-testid="displayValue"]').text();
    expect(result).toBe("6");
  });
  it("divide by zero shows error", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-8"]').trigger("click");
    await wrapper.find('[data-testid="key-/"]').trigger("click");
    await wrapper.find('[data-testid="key-0"]').trigger("click");
    await wrapper.find('[data-testid="key-="]').trigger("click");
    const result = wrapper.find('[data-testid="displayValue"]').text();
    expect(result).toBe("Division by zero is not allowed");
  });
  it("divide using comma", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-8"]').trigger("click");
    await wrapper.find('[data-testid="key-/"]').trigger("click");
    await wrapper.find('[data-testid="key-0"]').trigger("click");
    await wrapper.find('[data-testid="key-."]').trigger("click");
    await wrapper.find('[data-testid="key-2"]').trigger("click");
    await wrapper.find('[data-testid="key-="]').trigger("click");
    const result = wrapper.find('[data-testid="displayValue"]').text();
    expect(result).toBe("40");
  });
  it("multiply three values", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-2"]').trigger("click");
    await wrapper.find('[data-testid="key-x"]').trigger("click");
    await wrapper.find('[data-testid="key-6"]').trigger("click");
    await wrapper.find('[data-testid="key-x"]').trigger("click");
    await wrapper.find('[data-testid="key-3"]').trigger("click");
    await wrapper.find('[data-testid="key-="]').trigger("click");
    const result = wrapper.find('[data-testid="displayValue"]').text();
    expect(result).toBe("36");
  });
  it("remove character", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-9"]').trigger("click");
    await wrapper.find('[data-testid="key-x"]').trigger("click");
    await wrapper.find('[data-testid="key-8"]').trigger("click");
    await wrapper.find('[data-testid="key-Del"]').trigger("click");
    const result = wrapper.find('[data-testid="displayValue"]').text();
    expect(result).toBe("9");
    expect(wrapper.find('[data-testid="displayFull"]').text()).toBe("9x");
  });
  it("reset calculator", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-9"]').trigger("click");
    await wrapper.find('[data-testid="key-x"]').trigger("click");
    await wrapper.find('[data-testid="key-8"]').trigger("click");
    await wrapper.find('[data-testid="key-C"]').trigger("click");
    const result = wrapper.find('[data-testid="displayValue"]').text();
    expect(result).toBe("0");
  });
  it("block double operator", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-9"]').trigger("click");
    await wrapper.find('[data-testid="key-x"]').trigger("click");
    await wrapper.find('[data-testid="key-x"]').trigger("click");
    const result = wrapper.find('[data-testid="displayFull"]').text();
    expect(result).toBe("9x");
  });
  it("don't allow double zero before comma", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-0"]').trigger("click");
    await wrapper.find('[data-testid="key-0"]').trigger("click");
    await wrapper.find('[data-testid="key-."]').trigger("click");
    await wrapper.find('[data-testid="key-8"]').trigger("click");
    const result = wrapper.find('[data-testid="displayFull"]').text();
    expect(result).toBe("0.8");
  });
  it("allow double zero after comma", async () => {
    const wrapper = shallowMount(CalculatorDisplay);
    await wrapper.find('[data-testid="key-2"]').trigger("click");
    await wrapper.find('[data-testid="key-."]').trigger("click");
    await wrapper.find('[data-testid="key-0"]').trigger("click");
    await wrapper.find('[data-testid="key-0"]').trigger("click");
    const result = wrapper.find('[data-testid="displayFull"]').text();
    expect(result).toBe("2.00");
  });
});
