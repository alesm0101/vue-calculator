import { createApp } from "vue";
import "@/styles/main.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// TODO IMPORT SASS GLOBAL
createApp(App).use(store).use(router).mount("#app");
