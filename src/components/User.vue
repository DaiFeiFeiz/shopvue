<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 【添加用户】 对话框 -->
    <el-dialog title="添加用户" :visible.sync="adduserVisible" @close="closeAdduser()" width="50%">
      <el-form
        ref="adduserFormRef"
        :model="adduserForm"
        :rules="adduserRules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="adduserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="adduserForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="adduserForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="adduserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adduserVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 【修改用户】 对话框 -->
    <el-dialog title="修改用户" :visible.sync="edituserVisible" @close="closeedituser()" width="50%">
      <el-form
        ref="edituserFormRef"
        :model="edituserForm"
        :rules="edituserRules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="edituserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="edituserForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="edituserForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="edituserVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索框 -->
          <el-input
            placeholder="请输入搜索内容"
            v-model="userListdt.query"
            class="input-with-select"
            clearable
            @clear="search()"
            @keyup.enter.native="search()"
          >
            <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8">
          <!-- 添加用户按钮 -->
          <el-button type="primary" @click="adduserVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 表格 -->
      <el-table :data="userData" stripe style="width: 100%" border>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="180"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <!-- 状态栏 -->
        <el-table-column prop="mg_state" label="状态" width="80">
          <el-switch v-model="info.row.mg_state" slot-scope="info" @change="switchChange()"></el-switch>
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column label="操作" width="240">
          <template slot-scope="info">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserShow(info.row.id)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delUser(info.row.id)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="userListdt.pagenum"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="userListdt.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tot"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created() {
    this.getuserList()
  },
  data() {
    // 【添加用户对话框】自定义校验规则 --- 手机架号码
    var checkMobile = (rule, value, callback) => {
      var reg = /^1[356789]\d{9}$/
      // 校验失败
      if (!reg.test(value)) {
        return callback(new Error('手机号码格式不正确'))
      }
      // 校验成功
      callback()
    }
    return {
      userListdt: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      userData: [],
      tot: 0,
      // 【添加用户 对话框】 默认不显示
      adduserVisible: false,
      // 【添加用户对话框】
      // 添加用户对话框 表格数据
      adduserForm: {
        username: '',
        password: '',
        mobile: '',
        email: ''
      },
      // 【添加用户对话框】 表单验证
      adduserRules: {
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }],
        mobile: [
          { required: true, message: '手机号码必填', trigger: 'blur' },
          { required: true, validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 【修改用户 对话框】 默认不显示
      edituserVisible: false,
      // 【修改用户 对话框】表格数据
      edituserForm: {
        username: '',
        mobile: '',
        email: ''
      },
      // 【修改用户 对话框】表单验证
      edituserRules: {
        mobile: [
          { required: true, message: '手机号码必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getuserList() {
      const { data: dt } = await this.$http.get('users', {
        params: this.userListdt
      })
      //   console.log(dt)
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      // 将 用户数据 赋予 data 数据中
      this.userData = dt.data.users
      // 将 用户总数量 赋值到 data 中
      this.tot = dt.data.total
    },
    // 每页显示条数 变化时触发
    handleSizeChange(val) {
      this.userListdt.pagesize = val
      this.getuserList()
    },
    // 当前页码 变化时触发
    handleCurrentChange(val) {
      this.userListdt.pagenum = val
      this.getuserList()
    },
    // switch 开关 状态修改时 触发弹窗提示修改成功
    switchChange() {
      this.$message.success('修改状态成功')
    },
    // 搜索框 点击搜索 查询数据
    search() {
      this.getuserList()
    },
    // 【添加用户对话框】关闭对话框后重置表单
    closeAdduser() {
      this.$refs.adduserFormRef.resetFields()
    },
    // 【添加用户对话框】 点击确认，添加数据到服务器
    adduser() {
      // ! 提交表单前，必须要先校验表单内容，validate
      this.$refs.adduserFormRef.validate(async valid => {
        if (valid) {
          const { data: dt } = await this.$http.post('users', this.adduserForm)
          // console.log(dt)
          if (dt.meta.status !== 201) {
            return this.$message.error(dt.meta.msg)
          }
          // 添加用户成功后，①提示成功信息，②关闭对话框，③刷新数据
          this.$message.success(dt.meta.msg)
          this.adduserVisible = false
          this.getuserList()
        }
      })
    },
    // 【删除用户】
    delUser(id) {
      this.$confirm('确定删除该用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          //! 删除前判断该页面是否只有一条数据，若为一条数据则将当前页数 减1，否则该条数据删除后本页面没有数据，页面会显示 “暂无数据”
          //! 但需要排除 第一页的情况（不能减到0页）
          if (this.userData.length === 1 && this.userListdt.pagenum > 1) {
            this.userListdt.pagenum--
          }
          const { data: dt } = await this.$http.delete('users/' + id)
          // console.log(dt)
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          this.$message.success(dt.meta.msg)
          this.getuserList()
        })
        .catch(() => {})
    },
    // 【修改用户】显示 修改用户对话框
    async editUserShow(id) {
      // 显示 修改用户 对话框
      this.edituserVisible = true
      const {data: dt} = await this.$http.get('users/' + id)
      // console.log(dt)
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      this.edituserForm = dt.data
    },
    // 【修改用户 对话框】提交 修改数据
    edituser() {
      // ! 提交表单一定要先验证表单，都符合要求后方可提交至后台修改
      this.$refs.edituserFormRef.validate(async(valid) => {
        if (valid) {
          const {data: dt} = await this.$http.put('users/' + this.edituserForm.id, this.edituserForm)
          // console.log(dt)
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          // 修改用户信息成功后：①提示信息，②关闭对话框，③刷新数据
          this.$message.success(dt.meta.msg)
          this.edituserVisible = false
          this.getuserList()
        }
      })
    },
    // 【修改用户 对话框】关闭对话框 重置表格
    closeedituser() {
      this.$refs.edituserFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
