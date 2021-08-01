<template>
  <q-page class="flex flex-center">
    <q-card class="my-card">
      <q-card-section>
        <q-form
          class="q-gutter-md"
          @submit="login"
        >
          <q-input
            v-model="email"
            type="email"
            filled
            label="E-Mail"
          />

          <q-input
            v-model="password"
            type="password"
            filled
            label="Password"
          />

          <div class="flex justify-end">
            <q-btn color="primary" label="Login" type="submit"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import {useQuasar, Loading} from 'quasar'
const $q = useQuasar()
import {auth} from 'boot/supabase'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  created() {
    const user = auth.user()
    console.log(user)
    if (user) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    async login(e) {
      e.preventDefault()
      if (this.password.length < 8) {
        this.$q.notify({
          message: 'Password too short',
          color: 'red'
        })
      } else {
        this.$q.loading.show({
          message: '<b>Signing you in..</b>',
          html: true,
          boxClass: 'bg-grey-2 text-grey-9',
          customClass: 'loader-text',
          spinnerColor: 'primary'
        })

        let { user, error } = await auth.signIn({
          email: this.email,
          password: this.password
        })

        this.$q.loading.hide()

        if (error) {
          this.$q.notify({
            message: error.message,
            color: 'red'
          })
        }

      }
    }
  }
}
</script>

<style>
.my-card {
  min-width: 24rem;
}

.loader-text {
  font-size: 16px;
}
</style>
