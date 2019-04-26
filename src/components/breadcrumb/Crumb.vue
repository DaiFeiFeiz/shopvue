<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name1 }}管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ name2 }}列表</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ['name1', 'name2']
}
</script>

<style lang="less" scoped>
</style>
