<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img src="./../assets/img/logo.png" alt>
      </div>
      <form action class="el-form"></form>
    </div>
  </div>
</template>

<script>
export default {}
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
  }
}
</style>
