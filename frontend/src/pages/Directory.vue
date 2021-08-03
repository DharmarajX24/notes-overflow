<template>
  <q-page class="flex column full-width full-height">
    <div class="flex q-mt-sm q-px-lg justify-between">
      <q-input v-model="text" dense hide-bottom-space hide-hint
               input-class="text-left" prefix="Search:" standout="bg-primary">
        <template v-slot:append>
          <q-icon v-if="text === ''" name="search"/>
          <q-icon v-else class="cursor-pointer" name="clear" @click="text = ''"/>
        </template>
      </q-input>
      <q-btn @click="$store.commit('modalsModule/openImageModal')" color="primary">Upload Image
        <q-icon name="file_upload" class="q-ml-sm"></q-icon>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  },
  created() {
    console.log(this.$route.params)
  }
}
</script>
