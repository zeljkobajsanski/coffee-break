import Vue from "vue";
import { IonicVueRouter } from "@ionic/vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from "../store";

Vue.use(IonicVueRouter);

const authGuard = async (to, from, next) => {
  const isAuthenticated = await store.state.isAuthenticated;
  if (!isAuthenticated) next("/login");
  else next();
};

const routes = [
  { path: "/home", name: "home", component: Home, beforeEnter: authGuard },
  { path: "/login", name: "login", component: Login }
];

const router = new IonicVueRouter({
  routes
});

export default router;
