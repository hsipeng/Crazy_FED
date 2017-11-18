<style lang="less" scoped>
@text: #222;
@main: #80bd01;
.nav {
    position: absolute;
    background: #fff;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    border-bottom: 1px solid #ddd;
    ul {
      overflow: hidden;
      padding: 0;
      margin: 0;
      li {
        float: left;
        margin-left: 2rem;
        position: relative;
        list-style: none;
        line-height: 49px;
        text-align: center;
      }
      a {
        display: block;
        text-decoration: none;
        font-size: 14px;
        color: lighten(@text, 50%);
      }
      .active {
        &:after {
          content: "";
          position: absolute;
          right: 0;
          left: 0;
          bottom: 1px;
          z-index: 1;
          height: 3px;
          background: @main;
        }
        a {
          color: @text;
        }
      }
    }
  }
</style>

<template>
  <div class="topic-lists">
    <nav class="nav">
      <ul flex="box:mean">

        <li v-for="item in tabs" :key="item.tab" :class="{ active: item.tab === ($route.query.tab || '') }">
          <router-link :to="{ name: 'Index', query: { t: item.tab } }">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>

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
      tabs: [
        {
          title: '全部',
          tab: ''
        },
        {
          title: '精华',
          tab: 'good'
        },
        {
          title: '分享',
          tab: 'share'
        },
        {
          title: '问答',
          tab: 'ask'
        },
        {
          title: '招聘',
          tab: 'job'
        },
        {
          title: 'dev',
          tab: 'dev'
        }
      ],
      lists: [],
      top: 1,
      bottom: 50
    }
  },
  created () {
    const { t = '' } = this.$route.query
    if (t !== undefined) {
      this.tab = t
    }
    this.fetchData(this.page, this.tab)
    this.topiclists = this.lists
  },
  watch: {
    '$route': 'fetchDataByTab'
  },
  methods: {
    fetchData: async function (p, t) {
      api
        .get('/topics', {
          page: p,
          tab: t,
          limit: 50
        })
        .then(res => {
          this.lists = res.data.data
        })
    },
    fetchDataByTab: async function () {
      const { t = '' } = this.$route.query
      this.tab = t
      this.fetchData(1, t)
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

