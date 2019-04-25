<template>
  <el-container>
    <el-header>
      <div class="logo-box">
        <img src="./../assets/img/heima.png">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout()">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isshow? '65px' : '200px'">
        <div class="toggle_bar" @click="isshow = !isshow">|||</div>

        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="rgb(64, 158, 255)"
          :unique-opened="true"
          :collapse="isshow"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="(item, k) in menuList"
            :key="item.id"
            :style="{width:isshow? '65px' : '200px'}"
          >
            <template slot="title">
              <i class="iconfont" v-html="iconList[k]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="item2 in item.children" :key="item2.id">
              <i class="el-icon-menu"></i>
              <span>{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMemuList()
  },
  methods: {
    async getMemuList() {
      const { data: dt } = await this.$http.get('/menus')
      // 能够获取左侧列表数据
      // console.log(dt)
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      this.menuList = dt.data
    },
    logout() {
      this.$confirm('确认要退出系统吗?', '退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认退出：① 删除 token ，② 跳转回 登录页
        window.sessionStorage.removeItem('token')
        this.$router.push('/login')
      })
    }
  },
  data() {
    return {
      menuList: [],
      isshow: false,
      iconList: ['&#xe8b5;', '&#xe89f;', '&#xe888;', '&#xe89b;', '&#xe902;']
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 0;
    background-color: #373d41;
    .logo-box {
      display: flex;
      align-items: center;
      font-size: 22px;
      color: #fff;
      user-select: none;
      img {
        margin-right: 10px;
        width: 50px;
        height: 50px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .toggle_bar {
      height: 25px;
      line-height: 25px;
      color: #fff;
      text-align: center;
      letter-spacing: 0.1em;
      font-size: 12px;
      background-color: #4a5064;
      user-select: none;
      cursor: pointer;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
