<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn dense flat icon="menu" round @click="leftDrawerOpen = !leftDrawerOpen"/>

        <q-toolbar-title>
          Notes<b>Overflow</b>
        </q-toolbar-title>

        <q-btn :icon="rightDrawerOpen ? 'close' : 'account_circle'" dense flat round
               @click="rightDrawerOpen = !rightDrawerOpen"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered show-if-above side="left">
      <div class="flex column q-py-sm">
        <div class="flex full-width">
          <q-btn dense flat icon="folder_open" round/>
          <p class="text-h6 q-mb-none q-mx-sm">Directories</p>
        </div>
        <q-btn class="q-mx-lg q-my-md" color="primary" @click="$store.commit('modalsModule/openDirectoryModal')">
          Create Directory
        </q-btn>
        <q-list>
          <q-item v-for="(directory, i) in $store.state.directoriesModule.directories"
                  :key="i" v-ripple :active="directory.id === $route.params.id"
                  clickable @click="$router.push(`/dashboard/directory/${directory.id}`)">
            <q-item-section>{{ directory.name }}</q-item-section>
            <q-item-section avatar>
              <q-icon color="primary" name="chevron_right"/>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" bordered show-if-above side="right">
      <div class="flex column full-width full-height content-center">
        <div v-if="user" class="flex row items-center justify-start q-pa-md full-width">
          <q-avatar color="primary" size="xl" text-color="white">{{ user.email[0].toUpperCase() }}</q-avatar>
          <p class="q-ml-md q-mb-none text-subtitle1">{{ user.email }}</p>
        </div>
        <table class="q-mx-md">
          <tr>
            <td>Joined</td>
            <td>{{ new Date(user.created_at).toLocaleString() }}</td>
          </tr>
          <tr>
            <td>Directories</td>
            <td>{{ $store.state.directoriesModule.directories.length }}</td>
          </tr>
        </table>
        <q-btn @click="logout" color="red" class="q-mx-lg q-mb-md q-mt-auto">Logout</q-btn>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view/>
      <directory-modal/>
      <image-modal/>
    </q-page-container>

  </q-layout>
</template>

<script>
import {auth} from "boot/supabase";
import DirectoryModal from "components/DirectoryModal";
import ImageModal from "components/ImageModal";

export default {
  name: 'MainLayout',
  components: {
    DirectoryModal,
    ImageModal
  },
  data() {
    return {
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      user: null,
    }
  },
  async created() {
    console.log(this.$store.state.modalsModule)
    if (!auth.user()) {
      await this.$router.push('/')
    }
    console.log(auth.user())
    this.user = auth.user()

    await this.$store.dispatch('directoriesModule/loadDirectories')
    if (this.$route.path === "/dashboard") {
      this.$q.notify({
        message: `Welcome! ${auth.user().email}`,
        color: "primary",
      })
    }
  },
  methods: {
    async logout() {
      const {error} = await auth.signOut()
      if (error) {
        this.$q.notify({
          message: "Error logging out!",
          color: "red"
        })
      } else {
        await this.$router.push("/")
      }
    }
  }
}
</script>
