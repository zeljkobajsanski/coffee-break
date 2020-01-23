import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";

import Ionic from "@ionic/vue";
import "@ionic/core/css/ionic.bundle.css";
import store from "./store";
import VueSocketIO from "vue-socket.io";

Vue.config.productionTip = false;
Vue.use(Ionic);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3001",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
