<template>
	<div>
			<router-link to="/">首页</router-link>
			<router-link to="/signout">退出</router-link>
		<div>{{user.id}}欢迎回家</div>
	</div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
      computed: mapState({ user: state => state.user })
    }
</script>