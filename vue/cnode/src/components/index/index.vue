<template>
  <div class="topic-lists">
    <ul>
      <scroller :on-refresh="refresh"
            :on-infinite="infinite">
      <li v-for="topic in topiclists" :key="topic.id"><router-link :to="{ name: 'Post', params: { id: topic.id } }"> {{ topic.title }}</router-link></li>
      </scroller>
    </ul>

  </div>
</template>

<script>
import api from '../../util/api'
export default {
  data () {
    return {
      topiclists: [],
      page: 1,
      tab: 'dev',
      lists: [],
      top: 1,
      bottom: 50
    }
  },
  created () {
    this.fetchData(this.page, this.tab)
    this.topiclists = this.lists
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: async function (p, t) {
      api.get('/topics', {
        page: p,
        tab: t,
        limit: 50
      }).then(res => {
        this.lists = res.data.data
      })
    },
    refresh: function (done) {
      let self = this
      setTimeout(function () {
        self.fetchData(1, self.tab)
        self.topiclists = self.lists
        self.top = self.top - 50
        done()
      }, 1500)
    },

    infinite: function (done) {
      let self = this
      setTimeout(function () {
        self.fetchData(self.page++, self.tab).then(() => {
          self.topiclists = self.topiclists.concat(self.lists)
          self.bottom = self.bottom + 50
          done()
        })
      }, 1500)
    }
  }

}
</script>

