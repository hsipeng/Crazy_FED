<style lang="less" scoped>
@text: #222;
@main: #80bd01;
a {
        display: block;
        text-decoration: none;
      }

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
  .list {
    overflow: hidden;
    padding: 0;
    margin: 0;
    background: #eee;
    li {
      position: relative;
      padding: 15px 15px 0 15px;
      margin-bottom: 15px;
      list-style: none;
      box-shadow: 0 0 5px #ccc;
      background: #fff;
    }
    .top {
      height: 40px;
      .headimg {
        float: left;
        overflow: hidden;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 1px solid #ddd;
        background-position: center center;
        background-size: cover;
      }
      .box {
        padding-left: 5px;
        strong {
          line-height: 30px;
          font-size: 16px;
          font-weight: normal;
          float: left;
          padding-left: 10px;
          color: darken(@text, 10%);
        }
        time {
              padding-left: 59px;
              line-height: 29px;
              font-size: 12px;
              font-style: normal;
              color: #aaa;
        }
        .tag {
          float: right;
          margin-left: 4px;
          line-height: 28px;
          font-size: 12px;
          font-style: normal;
          color: @main;
        }
      }
    }
    .tit {
      padding: 10px 0;
      line-height: 22px;
      font-size: 16px;
      font-weight: bold;
      color: @text;
    }
  }

  .expand {
    padding: 10px 0;
    border-top: 1px solid #e1e1e1;
    text-align: center;
    .item {
      padding: 0 10px;
     line-height: 20px;
     text-align: center;
     border-right: 1px solid #e1e1e1;
     float: left;
     margin-top: -12px;
     margin-left: 18px;
      &:last-of-type {
        border: none;
      }
      .iconfont {
        color: #aaa;
      }
      .num,
      .time {
        padding-left: 3px;
        font-size: 12px;
        color: #aaa;
      }
      .pic,
      img {
        width: 16px;
        height: 16px;
        background: #e1e1e1;
        background-size: cover;
        background-position: center center;
      }
      .pic {
        overflow: hidden;
        border-radius: 50%;
      }
    }
  }
  ._v-container{
    padding-top: 50px;
  }
</style>

<template>
  <div class="topic-lists">
    <div class="topNavList">
    <nav class="nav">
      <ul flex="box:mean">

        <li v-for="item in tabs" :key="item.tab" :class="{ active: item.tab === (activeTab || '') }">
          <router-link :to="{ name: 'Index', query: { t: item.tab } }">{{ item.title }}</router-link>
        </li>
      </ul>
    </nav>
    </div>
    <div class="topic-content">
    <ul class="list">
      <scroller :on-refresh="refresh"
            :on-infinite="infinite">
      <li v-for="item in topiclists" :key="item.id"><router-link :to="{ name: 'Post', params: { id: item.id } }">

        <div class="top">
              <div class="headimg" :style="{ backgroundImage: 'url(' + item.author.avatar_url + ')' }"></div>
              <div class="box">
                <strong>{{ item.author.loginname }}</strong>
                <div>
                  <time>{{ item.create_at | formatDate }}</time>
                  <span class="tag">#分享#</span>
                </div>
              </div>
            </div>
            <div class="common-typeicon" v-if="item.top || item.good">
              <div class="icon" v-if="item.good">
                <i class="iconfont icon-topic-good"></i>
              </div>
              <div class="icon" v-if="item.top">
                <i class="iconfont icon-topic-top"></i>
              </div>
            </div>
            <div class="tit">{{ item.title }}</div>
            <div class="expand">
              <div class="item click">
                <i class="iconfont icon-click"></i>
                <div class="num">{{ item.visit_count > 0 ? item.visit_count : '暂无阅读' }}</div>
              </div>
              <div class="item reply">
                <i class="iconfont icon-comment"></i>
                <div class="num">{{ item.reply_count > 0 ? item.reply_count : '暂无评论' }}</div>
              </div>
              <div class="item last-reply">
                <time class="time">{{ item.last_reply_at | formatDate }}</time>
              </div>
            </div>
        </router-link></li>
      </scroller>
    </ul>
  </div>
  </div>
</template>

<script>
import api from '../../util/api'
export default {
  data () {
    return {
      topiclists: [],
      page: 1,
      activeTab: this.$route.query.t === undefined ? '' : this.$route.query.t,
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
      lists: []
    }
  },
  watch: {
    '$route': 'changeTab'
  },
  methods: {
    changeTab: async function () {
      const {t = ''} = this.$route.query
      this.activeTab = t
      this.page = 1
      this.topiclists = []
      let self = this
      api.get('/topics', {
        page: 1,
        tab: t,
        limit: 10
      }).then(res => {
        self.topiclists = res.data.data
      })
    },
    fetchData: async function (p, t) {
      api.get('/topics', {
        page: p,
        tab: t,
        limit: 10
      }).then(res => {
        this.lists = res.data.data
      })
    },
    refresh: function (done) {
      let self = this
      setTimeout(function () {
        self.fetchData(1, self.activeTab)
        self.topiclists = self.lists
        self.page = 1
        done()
      }, 1500)
    },

    infinite: function (done) {
      let self = this
      setTimeout(function () {
        self.fetchData(self.page++, self.activeTab)
        self.topiclists = self.topiclists.concat(self.lists)
        done()
      }, 2000)
    }
  }

}
</script>

