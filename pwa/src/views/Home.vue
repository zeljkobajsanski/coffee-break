<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <img src="img/coffee_cup.png" slot="start" />
        <ion-title>Coffee Break</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout">
            <ion-icon name="power"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p v-if="!isOpen" class="ion-text-center">
        Coffee shop is closed. Please come back later
      </p>
      <ion-list lines="none">
        <ion-item v-for="user in users" :key="user.id">
          <ion-avatar slot="start">
            <img :src="'data:image/png;base64,' + user.photo" />
          </ion-avatar>
          <ion-label>{{ user.name }}</ion-label>
        </ion-item>
      </ion-list>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="applyOrOpen" v-if="!applied">
          <ion-icon name="cafe"></ion-icon>
        </ion-fab-button>
        <ion-fab-button @click="remove" color="danger" v-else>
          <ion-icon name="remove"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "home",
  data() {
    return {};
  },
  async created() {
    const { data: isOpen } = await axios.get("/api/coffee-shop/is-open");
    this.setOpen(isOpen);
    if (isOpen) {
      await this.loadUsers();
    }
  },
  computed: {
    ...mapState(["users", "isOpen", "authenticatedUser"]),
    applied() {
      return (
        this.authenticatedUser &&
        this.users.find(user => user.id === this.authenticatedUser.id)
      );
    }
  },
  methods: {
    ...mapMutations(["setOpen", "setAuthenticated"]),
    ...mapActions(["loadUsers"]),
    async applyOrOpen() {
      try {
        await axios.post("/api/coffee-shop/apply");
      } catch (e) {
        this.showError(
          this.isOpen
            ? ""
            : "Shop is closed at the moment and isn't receiving orders"
        );
      }
    },
    async showError(error) {
      const alert = await this.$ionic.alertController.create({
        header: "Something is wrong 😞",
        message: error
      });
      alert.present();
    },
    async remove() {
      await axios.delete("/api/coffee-shop");
    },
    logout() {
      this.setAuthenticated(null);
      localStorage.clear();
    }
  }
};
</script>
