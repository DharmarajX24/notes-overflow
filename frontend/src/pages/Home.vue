<template>
  <q-page class="flex column">
    <div class="flex full-width">
      <div class="half-width flex justify-center items-center">
        <img
          alt="Quasar logo"
          src="~assets/folder.svg"
          style="width: 500px; height: 500px"
        >
      </div>
      <div class="half-width q-pa-md">
        <h3 class="font-atkinson">Categorize file in folders</h3>
        <p class="font-atkinson text-h6 text-weight-regular">Directories help you manage files in batches and search
          through it.</p>
        <div class="flex half-width justify-between">
          <q-btn color="primary" class="btn-signin" @click="$router.push('/login')">Login</q-btn>
          <q-btn color="primary" class="btn-signin" @click="$router.push('/signup')">Signup</q-btn>
        </div>
      </div>
    </div>
    <div class="flex full-width q-mt-xl">
      <div class="half-width q-pa-md">
        <h3 class="font-atkinson">Easy uploads</h3>
        <p class="font-atkinson text-h6 text-weight-regular">Text is scanned using advanced AI and stored securely in cloud</p>
      </div>
      <div class="half-width flex justify-center items-center">
        <img
          alt="Quasar logo"
          src="~assets/firmware.svg"
          style="width: 500px; height: 500px"
        >
      </div>
    </div>
    <div class="flex full-width q-mt-xl">
      <div class="half-width flex justify-center items-center">
        <img
          alt="Quasar logo"
          src="~assets/search.svg"
          style="width: 500px; height: 500px"
        >
      </div>
      <div class="half-width q-pa-md">
        <h3 class="font-atkinson">Next Generation Search</h3>
        <p class="font-atkinson text-h6 text-weight-regular">Blazing fast search powered by Meilisearch</p>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  }
}
</script>

<style>
.half-width {
  width: 50%;
}

.half-height {
  height: 50%;
}

.btn-signin {
  min-width: 8rem;
}
</style>
