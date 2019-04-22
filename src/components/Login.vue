<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="./../assets/img/logo.png" alt>
      </div>
      <el-form ref="loginFormref" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont">&#xe89a;</i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password">
            <i slot="prefix" class="iconfont">&#xe66c;</i>
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :push="15">
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="info" @click="reset()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormref.validate(async valid => {
        if (valid) {
          var { data: dt } = await this.$http.post('/login', this.loginForm)
          // console.log(dt)
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          window.sessionStorage.setItem('token', dt.data.token)
          this.$message.success(dt.meta.msg)
          this.$router.push('/home')
        }
      })
    },
    reset() {
      this.$refs.loginFormref.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background-color: #2b4b6b;
  overflow: hidden;
  .login-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 304px;
    border-radius: 4px;
    background-color: #fff;
    .avatar-box {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 8px;
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      box-shadow: 0 0 10px #eee;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .el-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
