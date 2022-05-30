<template>
  <div  class="my-container">
     <!-- 登录头部 -->
    <div v-if="user" class="header">
      <div class="user-info">
        <div class="base-info">
          <div class="left">
            <van-image
              class="avatar"
              fit="cover"
              round
              :src="userInfo.photo"
            />
            <span class="name">{{ userInfo.name }}</span>
          </div>
          <div class="right">
            <van-button size="mini" round>编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{ userInfo.art_count }}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
    </div>
    <!-- /登录头部 -->
    <!-- 未登录头部 -->
    <div v-else  class="header not-login">
      <div class="login-btn" @click="$router.push('login')">
        <img src="~@/assets/mobile.png" alt="">
        <span class="text">注册 / 登录</span>
      </div>
    </div>
    <!-- 未登录头部 -->

    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable >
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->
    <!-- 消息通知 -->
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link class="md9"/>
      <van-cell
        v-if="user"
        title="退出登录"
        class="lgout-cell"
        clickable
        @click="onLogout"
       />
    </van-cell-group>
    <!-- /消息通知 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  components: {},
  props: {},
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      // 确认操作
      // 在组件中调用，需要this.$Dialog
      this.$dialog.confirm({
        title: '确认退出登录吗？'
      })
        .then(() => {
          // 清除token，将token赋值为空
          this.$store.commit('setUser', null)
          // on confirm
        })
        .catch(() => {
          // on cancel
          // console.log(this.$store.state.user.data.token)
        })
    },
    async loadUser () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        console.log(err)
        this.$toast('获取数据失败')
        // 如果没获取成功，清除token,重新登录，可体验感太差
        // this.$store.commit('setUser', null)
      }
    }
  },
  watch: {},
  created () {
    if (this.$store.state.user) { this.loadUser() }
  },
  mounted () {}
}
</script>

<style lang="less" scoped>
body {
  background-color: #f5f7f9;
}
.my-container {
  .header {
    height: 361px;
    // 相对定位比较麻烦
    // background: url(../../assets/banner.png) no-repeat;
    // css也支持@ 代表src 但需要在前面加一个~
    background: url(~@/assets/banner.png);
    background-size: cover;
  }
  .not-login {
      display: flex;
      justify-content: center;
      align-items: center;
      .login-btn{
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      img {
        width: 132px;
      }
      .text {
        color: #fff;
        font-size: 28px;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 32px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
        }
        .name {
          margin-left: 22px;
          color: #fff;
          font-size: 30px;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .count {
          color: #fff;
          font-size: 36px;
        }
        .text {
          color: #fff;
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      .toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
      }
    }
  }
  .md9{
    margin-bottom: 9px;
  }
  .lgout-cell {
    text-align: center;
    color: #d86262;
    font-size: 30px;
  }
}

</style>
