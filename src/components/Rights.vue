<template>
  <div>
    <!-- 面包屑导航 -->
    <com-crumb name="权限"/>
    <!-- 卡片区 -->
    <el-card class="box-card">
      <el-table :data="rightData" stripe style="width: 100%" border>
        <el-table-column type="index" label="序号" width="160"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="240"></el-table-column>
        <el-table-column prop="path" label="路径" width="240"></el-table-column>
        <el-table-column prop="level" label="等级">
          <template slot-scope="info">
            <el-tag v-if="info.row.level == 0">一级</el-tag>
            <el-tag v-else-if="info.row.level == 1" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// 引入 面包屑 导航
import Crumb from './breadcrumb/Crumb'
export default {
  components: {
    'com-crumb': Crumb
  },
  created() {
    this.getRightList()
  },
  data() {
    return {
      rightData: []
    }
  },
  methods: {
    async getRightList() {
      const { data: dt } = await this.$http.get('rights/list')
      // console.log(dt)
      if (dt.meta.status !== 200) {
        return this.$message.error(dt.meta.msg)
      }
      this.rightData = dt.data
    }
  }
}
</script>

<style lang="less" scoped>
</style>
