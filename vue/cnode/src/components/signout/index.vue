<style lang="less" scoped>
.btn {
  padding: 50px;
  text-align: center;
  button {
    padding: 5px 10px;
  }
}
</style>
<template>
	<div>
			<router-link to="/home">返回</router-link>
		<div class="btn">
			<button v-on:click="submit">确认退出</button>
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
import { USER_SIGNOUT } from '../../vuex/modules/user'
export default {
  methods: {
    ...mapActions([USER_SIGNOUT]),
    submit () {
      this.USER_SIGNOUT()
      this.$router.replace({ path: '/login' })
    }
  }
}
</script>