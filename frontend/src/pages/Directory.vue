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
      <div class="flex column full-width items-center q-pa-md q-mt-sm">
        <q-infinite-scroll :offset="250" class="full-width flex justify-center absolute">
          <q-card v-for="image in images" :key="image.name" class="full-width q-my-sm" style="height: auto; max-width: 36rem;">
            <q-card-section>
              <q-img
                :src="image.url"
                spinner-color="white"
                style="height: 100%; width: 100%;"
              />
              <p class="q-mb-none q-mt-sm">Uploaded </p>
            </q-card-section>
          </q-card>
        </q-infinite-scroll>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script>
import io from "socket.io-client"
import {auth} from "boot/supabase";

export default {
  name: 'Index',
  data() {
    return {
      socket: null,
      search: "",
      images: [
        {
          name: "Roll9",
          url: "https://rpjbbnpgtxpifoubkcct.supabase.in/storage/v1/object/sign/images/userId1/undraw_text_files_au1q.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdXNlcklkMS91bmRyYXdfdGV4dF9maWxlc19hdTFxLnN2ZyIsImlhdCI6MTYyNzk4NTUyOSwiZXhwIjoxOTQzMzQ1NTI5fQ.x8zS8erK_BbsiQX37yU1M3rjWm0Q-T8IQnaBqHlQSVA"
        },
        {
          name: "Roll9",
          url: "https://rpjbbnpgtxpifoubkcct.supabase.in/storage/v1/object/sign/images/39c2cddc-f831-4a9b-981c-01267d9fe50a/image_b13904ea-7fd0-4cbc-ad21-df31292fe0ba.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvMzljMmNkZGMtZjgzMS00YTliLTk4MWMtMDEyNjdkOWZlNTBhL2ltYWdlX2IxMzkwNGVhLTdmZDAtNGNiYy1hZDIxLWRmMzEyOTJmZTBiYS5wbmciLCJpYXQiOjE2Mjc5ODc0ODMsImV4cCI6MTk0MzM0NzQ4M30.Y_adpSCfUVKfoPdtsNGdJVuWwg1EfwOTC_rq_Q7OW9o"
        },
        {
          name: "Roll9",
          url: "https://rpjbbnpgtxpifoubkcct.supabase.in/storage/v1/object/sign/images/e6c1c218-9488-4034-ae72-726ff751f82c/image_d50ecfae-4977-45f1-afc9-640d537303be.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZTZjMWMyMTgtOTQ4OC00MDM0LWFlNzItNzI2ZmY3NTFmODJjL2ltYWdlX2Q1MGVjZmFlLTQ5NzctNDVmMS1hZmM5LTY0MGQ1MzczMDNiZS5qcGciLCJpYXQiOjE2Mjc5OTA2MjQsImV4cCI6MTk0MzM1MDYyNH0.wcIfVmvYcwEH4_OFf4sJicr5PYDLewlugewEJgx2RK4"
        },
        {
          name: "Roll9",
          url: "https://rpjbbnpgtxpifoubkcct.supabase.in/storage/v1/object/sign/images/userId1/undraw_text_files_au1q.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdXNlcklkMS91bmRyYXdfdGV4dF9maWxlc19hdTFxLnN2ZyIsImlhdCI6MTYyNzk4NTUyOSwiZXhwIjoxOTQzMzQ1NTI5fQ.x8zS8erK_BbsiQX37yU1M3rjWm0Q-T8IQnaBqHlQSVA"
        }
      ]
    }
  },
  created() {
    console.log(this.$route.params)
    this.socket = io(`${process.env.SERVER_URL}`, {
      path: process.env.SOCKET_PATH,
      transports: ['websocket'],
    });

    this.socket.on("results", (data) => {
      console.log(data)
    })

    this.socket.on("error", (e) => {
      console.log(e)
    })
  },
  watch: {
    search(n) {
      this.socket.emit("search", {query: n, offset: 0, token: auth.session().access_token})
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
