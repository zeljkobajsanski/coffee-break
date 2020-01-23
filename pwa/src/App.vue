<template>
  <div id="app">
    <ion-app>
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers = { Authorization: `Bearer ${token}` };
      const userInfo = localStorage.getItem("user");
      this.setAuthenticated(userInfo ? JSON.parse(userInfo) : null);
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    ...mapMutations(["setAuthenticated"])
  },
  computed: mapState(["isAuthenticated"]),
  watch: {
    isAuthenticated: function(isAuthenticated) {
      if (isAuthenticated) {
        this.$router.push("/home");
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>
