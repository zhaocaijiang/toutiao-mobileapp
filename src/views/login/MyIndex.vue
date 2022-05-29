<template>
  <div  class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="请输入手机号"
          :rules="userFormRules.mobile"
          type="number"
          maxlength="11"
        >
            <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
          v-model="user.code"
          name="code"
          placeholder="请输入验证码"
          :rules="userFormRules.code"
          type="number"
          maxlength="6"
        >
             <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
              <template #button>
                <van-count-down
                 :time="1000 * 10"
                 format="ss s"
                 v-if="isCountDownShow"
                 @finish = "isCountDownShow = false" />
                <van-button round native-type="button" size="small"
                class="send-sms-btn" type="primary" @click="onSendSms"
                v-else>
                  获取验证码
                </van-button>
              </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button  block  type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
// 按需导入 要加括号，不然找不到这个函数
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      // 登录
      // 1获取表单数据
      const user = this.user

      // 2、验证表单
      // 2.1 为van -field 添加rules验证规则
      // 2.2 表单提交时会自动为表单验证 验证成功 会触发submit事件 否则不会
      // console.log(user)
      // Toast是未定义的 在组件中使用，要用this.$toast
      this.$toast.loading({
        message: '登录中...', // 提示消息
        forbidClick: true, // 提示时禁用背景点击
        duration: 0 // 默认时长为2s, 为0时会一直提示
      })

      // 3、提交表单请求登录
      try {
        const { data } = await login(user)
        // console.log('登录成功', res)
        // 登录成功后保存token
        this.$store.commit('setUser', data)
        this.$toast.success('登录成功!') // 后一个提示会覆盖前一个提示
      } catch (err) {
        if (err.response.status === 400) {
          console.log('登录成功', err)
          this.$toast.fail('手机号或者验证码错误!')
        } else {
          this.$toast.fail('登录失败！')
        }
        // console.log('登录失败', err)
      }
      //  4、登录后的后续操作
    },
    async onSendSms () {
      // 发送验证码
      // 1、验证手机号
      //     Vant 中的许多组件提供了实例方法，调用实例方法时，我们需要通过 ref 来注册组件引用信息，引用信息将会注册在父组件的$refs对象上。
      //     $refs返回得到是一个期约Promise 对象。故可以使用await 修饰
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2、倒计时
      this.isCountDownShow = true
      // 3、请求后端发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功！')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.van-button {
  background-color: #6db4fb;
  border: none;
}
  .toutiao {
    font-size: 37px;
  }
.send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
.login-btn-wrap {
  padding: 53px 33px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
  }
}

</style>
