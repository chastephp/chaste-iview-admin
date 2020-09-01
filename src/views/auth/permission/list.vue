<template>
  <div>
    <Menu active-name="1" mode="horizontal" theme="light">
      <MenuItem name="1">
        {{ page.name }}列表
      </MenuItem>
      <!--<MenuItem name="2" :to="page.editRoute">新增{{page.name}}</MenuItem>-->
    </Menu>
    <br/>
    <Card>

      <Tree :data="data" :style="{paddingLeft:'40px'}"></Tree>

    </Card>
  </div>
</template>

<script>
import { page } from './page'

export default {
  components: {},
  data () {
    return {
      page: page,
      loading: true,
      data: []
    }
  },
  methods: {
    getList () {
      this.loading = true

      api.permission.list({}).then(res => {
        this.loading = false

        if (res.code === 0) {
          let data = res.data
          data.forEach(v => {
            v.expand = true
            v.title = '[' + v.type + '] ' + v.name
            return v
          })
          data = array2tree(data, 'id', 'parent_id')
          this.data = data
        }
      })
    }

  },
  mounted () {
    this.getList()
  }
}
</script>
<style>
.ivu-tree-title {
  font-size: 14px;
}
</style>
