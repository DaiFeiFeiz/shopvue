<template>
  <div>
    <!-- 面包屑导航 -->
    <com-crumb name1="权限" name2="角色"/>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <el-table :data="rolesData" border style="width: 100%" stripe>
        <el-table-column type="expand" width="60">
          <template slot-scope="info">
            <el-row
              v-for="(v, k) in info.row.son"
              :key="v.id"
              :style="{'border-bottom': '1px solid rgb(235, 238, 245)', 'border-top': k === 0 ? '1px solid rgb(235, 238, 245)' : ''}"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="handleClose(info.row, v.id)">{{ v.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(vv, kk) in v.children"
                  :key="vv.id"
                  :style="{'border-top': kk === 0 ? '' : '1px solid rgb(235, 238, 245)'}"
                >
                  <el-col :span="8">
                    <el-tag
                      type="success"
                      closable
                      @close="handleClose(info.row, vv.id)"
                    >{{ vv.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="16">
                    <el-tag
                      type="warning"
                      closable
                      @close="handleClose(info.row, vvv.id)"
                      v-for="vvv in vv.children"
                      :key="vvv.id"
                    >{{ vvv.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="260"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="460">
          <template slot-scope="info">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="distributeRole(info.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 角色分配 对话框 -->
    <el-dialog title="分配权限" :visible.sync="distributeRoleVisible" width="50%">
      <!-- <el-form ref="distributeRoleFef" :model="distributeRoleForm" label-width="80px">
        <el-form-item label="角色："> -->
          <span>
          角色：{{ distributeRoleForm.roleName }}
          </span>
        <!-- </el-form-item>
      </el-form> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="distributeRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="distributeRoleVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  created() {
    this.getRolesList()
  },
  data() {
    return {
      rolesData: [],
      distributeRoleVisible: false,
      distributeRoleForm: {}
    }
  },
  methods: {
    // 【角色列表】 数据获取
    async getRolesList() {
      const { data: dt } = await this.$http.get('roles')
      // console.log(dt)
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      //! 将 data 数据中的 children 属性改名为 son
      dt.data.forEach(value => {
        value.son = value.children
        //! 删除原有 children 属性，保留 son 属性
        delete value.children
      })
      // console.log(dt)
      this.rolesData = dt.data
    },
    // 【展开行 tag标签】 移除 权限
    handleClose(roleinfo, rightId) {
      // console.log(roleId, rightId)
      this.$confirm('确定要删除该权限吗?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          const { data: dt } = await this.$http.delete(
            `roles/${roleinfo.id}/rights/${rightId}`
          )
          console.log(dt)
          // 取消权限失败提示
          if (dt.meta.status !== 200) {
            return this.$message.error(dt.meta.msg)
          }
          //! 取消权限成功 只需要更新 单个权限的数据，不要全部数据更新，否则展开行会闭合
          // 返回的数据 dt.data 是整个 info。row 的 数据
          roleinfo.son = dt.data
        })
        .catch(() => {})
    },
    // 【权限分配】对话框
    distributeRole(role) {
      console.log(role)
      this.distributeRoleVisible = true
      this.distributeRoleForm = role
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  align-items: center;
  // 设置边框的另一种方案
  // border-bottom: 1px solid rgb(235, 238, 245);
  // margin-bottom: -1px;
}
.el-tag {
  margin: 10px 5px;
}
</style>
