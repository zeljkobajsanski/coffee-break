<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <img src="img/coffee_cup.png" slot="start" />
        <ion-title>Coffee Break</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h3 class="ion-text-center">Please sign in</h3>
      <ion-button color="primary" expand="block" @click="login"
        >Sign In</ion-button
      >
    </ion-content>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  methods: {
    ...mapActions({ performLogin: "login" }),
    async login() {
      const loader = await this.$ionic.loadingController.create({
        message: "Please wait..."
      });
      await loader.present();
      const ok = await this.performLogin();
      loader.dismiss();
      if (ok) {
        await this.$router.push("/home");
      }
    }
  }
};
</script>
