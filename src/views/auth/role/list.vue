<template>
  <div>
    <Menu active-name="1" mode="horizontal" theme="light">
      <MenuItem name="1">
        {{ page.name }}列表
      </MenuItem>
      <MenuItem :to="page.editRoute" name="2">新增{{ page.name }}</MenuItem>
    </Menu>
    <br/>
    <Card>

      <IForm :form="search" :inline=true @on-export="handleExport" @on-submit="handleSearch"></IForm>

      <ITable :columns="table.columns" :loading="loading" @on-delete="handleDelete" @on-edit="handleEdit"
              v-model="table.data"/>

      <Page :current="pager.page" :page-size="pager.pageSize" :total="pager.total"
            @on-change="handlePage"
            style="margin-top: 16px;text-align: right"/>

    </Card>
  </div>
</template>

<script>

const columns = [
  { title: 'ID', key: 'id' },
  { title: '角色名称', key: 'name' },
  { title: '角色描述', key: 'desc' },
  {
    title: '操作',
    key: 'handle',
    minWidth: 180,
    maxWidth: 180,
    options: ['edit', 'delete']
  }
]

export default {
  components: {
    ITable,
    IForm
  },
  data () {
    return {
      page: page,
      loading: true,

      search: {
        disabled: true,
        items: {},
        model: {}
      },
      table: {
        columns: columns,
        data: []
      },
      pager: {
        page: 1,
        pageSize: 20,
        total: 1
      }
    }
  },
  methods: {
    handleDelete (params) {
      const data = {}
      data.id = params.row.id

      api.role.delete(data).then(res => {
        if (res.code === 0) {
          this.$Message.success('删除成功')
          this.table.data = params.tableData.filter((item, index) => index !== params.row.initRowIndex)
        }
      })
    },
    handleSearch (params) {
      this.pager.page = 1
      this.getList()
    },
    handleExport (params) {
    },
    handleEdit (params) {
      const id = params.row.id

      const route = Object.assign({}, this.page.editRoute)
      route.params = { id: id }

      chaste.setStorageSync(this.page.editRoute.name).set(id, params.row)
      this.$router.push(route)
    },
    handlePage (page) {
      this.pager.page = page
      this.getData()
    },
    getList () {
      this.loading = true

      const params = Object.assign({
        page: this.pager.page,
        page_size: this.pager.pageSize
      }, this.search.model)

      api.role.list(params).then(res => {
        this.loading = false

        if (res.code === 0) {
          this.pager.total = res.data.total
          this.pager.pageSize = res.data.per_page
          this.table.data = res.data.data
        }
      })
    }

  },
  mounted () {
    this.getList()
  }
}
</script>
