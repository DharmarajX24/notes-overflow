<template>
  <q-page class="flex column full-width items-center full-height">
    <q-scroll-area class="full-width full-height absolute">
      <div class="flex q-mt-sm q-px-lg justify-between">
        <q-input v-model="search" dense hide-bottom-space hide-hint
                 input-class="text-left" prefix="Search:" standout="bg-primary">
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search"/>
            <q-icon v-else class="cursor-pointer" name="clear" @click="search = ''"/>
          </template>
        </q-input>
        <q-btn class="q-ml-sm" color="primary" @click="$store.commit('modalsModule/openImageModal')">Upload Image
          <q-icon class="q-ml-sm" name="file_upload"></q-icon>
        </q-btn>
      </div>
      <div v-if="getImageCount" class="flex column full-width items-center q-pa-md q-mt-sm">
        <q-infinite-scroll class="full-width flex justify-center absolute">
          <q-card v-for="image in $store.state.directoriesModule.images[$route.params.id]" :key="image.name"
                  class="full-width q-my-sm"
                  style="height: auto; max-width: 36rem;">
            <q-card-section>
              <q-img
                :src="image.url"
                spinner-color="white"
                style="height: 100%; width: 100%;"
              />
              <p class="q-mb-none q-mt-sm">Uploaded {{formattedTime(image.added_at)}} ago</p>
            </q-card-section>
          </q-card>
        </q-infinite-scroll>
      </div>
      <div v-else class="flex flex-center column q-mt-xl">
          <img
            alt="Quasar logo"
            src="~assets/search.svg"
            style="width: 200px; height: 200px"
          >
          <p class="text-subtitle1">{{ search.length > 0 ? 'No results for entered query' : 'Enter your query' }}</p>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import io from "socket.io-client"
import {auth, storage} from "boot/supabase";
import {formatDistance} from "date-fns"

export default {
  name: 'Index',
  data() {
    return {
      socket: null,
      search: ""
    }
  },
  created() {
    console.log(this.$route.params)
    this.socket = io(`${process.env.FE_SOCKET_URL}`, {
      path: process.env.FE_SOCKET_PATH,
      transports: ['websocket'],
    });

    this.socket.on("results", async (data) => {
      console.log(data)
      const urlRequests = data.map(({name}) => storage.from("images").createSignedUrl(`${auth.user().id}/${name}`, 30))
      const urls = await Promise.all(urlRequests)
      const images = data.map((img, i) => ({...img, url: urls[i].data.signedURL}))
      this.$store.commit('directoriesModule/setImages', {id: this.$route.params.id, images})
    })

    this.socket.on("error", (e) => {
      console.log(e)
    })
  },
  methods: {
    loadResults() {
      const q = this.search
      console.log("Stage", this.stage)
      if (q.length) {
        this.socket.emit("search", {
          q,
          offset: 0,
          token: auth.session().access_token,
          directory_id: this.$route.params.id
        })
      } else {
        this.$store.commit('directoriesModule/setImages', {id: this.$route.params.id, images: []})
      }
    },
    formattedTime(ts) {
      return formatDistance(ts, Date.now())
    }
  },
  computed: {
    getImageCount() {
      if (this.$store.state.directoriesModule.images[this.$route.params.id]) {
        return this.$store.state.directoriesModule.images[this.$route.params.id].length
      } else {
        return  0
      }
    }
  },
  watch: {
    search() {
      this.loadResults()
    }
  }
}
</script>

<style>
.image-info {
  width: 100%;
  padding: 8px 8px 8px 8px;
}
</style>
