<template>
  <q-dialog v-model="$store.state.modalsModule.image.active" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Upload Image to
          {{ $store.state.directoriesModule.directories.find(d => d.id === $route.params.id).name }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-file v-model="image" accept=".jpg, image/*" label="Select an image" standout="bg-primary text-white">
          <template v-slot:append>
            <q-icon color="primary" name="attach_file"/>
          </template>
        </q-file>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn :disable="$store.state.modalsModule.image.loading" flat label="Cancel"
               @click="$store.commit('modalsModule/closeImageModal')"/>
        <q-btn :disable="$store.state.modalsModule.image.loading" color="primary" label="Upload"
               @click="uploadImage"/>
      </q-card-actions>
      <q-linear-progress v-if="$store.state.modalsModule.image.loading" indeterminate/>
    </q-card>
  </q-dialog>
</template>

<script>
import {auth} from "boot/supabase";

export default {
  name: 'ImageModal',
  computed: {
    image: {
      get() {
        return this.$store.state.modalsModule.image.data
      },
      set(newImage) {
        this.$store.commit('modalsModule/setImage', newImage)
      }
    }
  },
  methods: {
    async uploadImage() {
      try {
        this.$store.commit('modalsModule/toggleLoading', {modal: 'image', loading: true})
        const directoryId = this.$route.params.id
        console.log(directoryId)
        const file = this.$store.state.modalsModule.image.data
        if (!file) {
          this.$q.notify({
            message: "Please select an image",
            color: "red"
          })
        } else {
          const rData = new FormData()
          rData.append("image", file)
          const response = await fetch(`${process.env.FE_SERVER_URL}/directories/${directoryId}`, {
            method: 'POST',
            headers: {authorization: `Bearer ${auth.session().access_token}`},
            body: rData
          })

          const {data, error} = await response.json()
          console.log("Response received", data, error)
          if (error) {
            console.log(error)
            this.$q.notify({
              message: "an error occurred. Please try again.",
              color: "red"
            })
          } else {
            console.log(data)
            this.$q.notify({
              message: "Image uploaded successfully",
              color: "green"
            })
          }
          this.$store.commit('modalsModule/closeImageModal')
        }
        this.$store.commit('modalsModule/toggleLoading', {modal: 'image', loading: false})
        // if (localStorage.getItem("new_user") === "true") {
        //   window.location.reload()
        // }
        // await this.$router.push(`/dashboard/directory/${data}`)
      } catch (e) {
        console.log(e)
        this.$q.notify({
          message: "Something went wrong. Please refresh and try again",
          color: "red"
        })
      }
    }
  }
}
</script>
