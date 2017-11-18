<template>
  <div>
    <h2>login</h2>
    <form @submit.prevent="login">
      <label for="accessToken"><input v-model="accessToken" placeholder="xxxx"></label>
      <button type="submit">login</button>
      <p v-if="error" class="error">login failed.</p>
    </form>
  </div>
</template>

<script>
import login from './login'
import { mapActions } from 'vuex'
import { USER_SIGNIN } from '../../vuex/modules/user'
export default {
  data () {
    return {
      accessToken: '64065d7d-9461-41e2-8a1e-00b59d525dfc',
      error: false
    }
  },
  methods: {
    ...mapActions([USER_SIGNIN]),
    login () {
      login.login(this.accessToken).then(res => {
        if (res === null) {
          this.error = true
        } else {
          alert(JSON.stringify(res))
          this.USER_SIGNIN(res)
          this.$router.push({name: 'Home'})
        }
      })
    }
  }
}
</script>
