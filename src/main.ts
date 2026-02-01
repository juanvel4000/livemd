import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { initTheme } from "./utils/theme";
import "./assets/main.css";

const theme = initTheme();
if (theme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const app = createApp(App);

app.use(router);

app.mount("#app");
