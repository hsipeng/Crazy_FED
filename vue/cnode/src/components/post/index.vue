<template>
  <div class="post">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
          <router-link to="/">&larr; Home</router-link>
    <transition name="slide">
      <!--
        giving the post container a unique key triggers transitions
        when the post id changes.
      -->
      <div v-if="post" class="content" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p v-html="post.content"></p>
      </div>
    </transition>
  </div>
</template>

<script>
import api from '../../util/api'

export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      api.get('/topic/' + this.$route.params.id, {

      }).then(res => {
        this.loading = false
        if (res.data.success !== true) {
          this.error = res.toString()
        } else {
          this.post = res.data.data
        }
      })
    }
  }
}
</script>

<style>
.loading {
  position: absolute;
  top: 10px;
  right: 10px;
}
.error {
  color: red;
}
.content {
  transition: all .35s ease;
  position: absolute;
}
.slide-enter {
  opacity: 0;
  transform: translate(30px, 0);
}
.slide-leave-active {
  opacity: 0;
  transform: translate(-30px, 0);
}
</style>
