<template>
  <q-dialog v-model="$store.state.modalsModule.directory.active" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New Directory</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="name" autofocus filled label="Name"/>
        <q-input v-model="description" autofocus class="q-my-sm" filled label="Description" type="textarea"/>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn :disable="$store.state.modalsModule.directory.loading" flat label="Cancel"
               @click="$store.commit('modalsModule/closeDirectoryModal')"/>
        <q-btn :disable="$store.state.modalsModule.directory.loading" color="primary" label="Create"
               @click="createDirectory"/>
      </q-card-actions>
      <q-linear-progress v-if="$store.state.modalsModule.directory.loading" indeterminate/>
    </q-card>
  </q-dialog>
</template>

<script>
import {auth} from "boot/supabase";

export default {
  name: 'DirectoryModal',
  computed: {
    name: {
      get() {
        return this.$store.state.modalsModule.directory.data.name
      },
      set(newName) {
        this.$store.commit('modalsModule/setDirectoryName', newName)
      }
    },
    description: {
      get() {
        return this.$store.state.modalsModule.directory.data.description
      },
      set(newDesc) {
        this.$store.commit('modalsModule/setDirectoryDescription', newDesc)
      }
    }
  },
  methods: {
    async createDirectory() {
      this.$store.commit('modalsModule/toggleLoading', {modal: 'directory', loading: true})
      const response = await fetch(`${process.env.FE_SERVER_URL}/directories/create`, {
        method: 'POST',
        headers: {authorization: `Bearer ${auth.session().access_token}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({name: this.name, description: this.description})
      })

      const {data, error} = await response.json()

      if (error) {
        console.log(error)
        this.$q.notify({
          message: error,
          color: 'red'
        })
      } else {
        console.log(data)
        this.$store.commit('directoriesModule/addDirectory', {id: data, name: this.name, description: this.description})
        this.$store.commit('modalsModule/toggleLoading', {modal: 'directory', loading: false})
        this.$store.commit('modalsModule/closeDirectoryModal')
        await this.$router.push(`/dashboard/directory/${data}`)
      }
      this.$store.commit('modalsModule/toggleLoading', {modal: 'directory', loading: false})
    }
  }
}
</script>
