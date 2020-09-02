<template>
  <div>
    <Menu mode="horizontal" theme="light" active-name="1">
      <MenuItem name="1">
        图书列表
      </MenuItem>
    </Menu>
    <br/>
    <Card>

      <IForm :inline=true :form="search" @on-submit="handleSearch" @on-export="handleExport"></IForm>

      <ITable :loading="loading" v-model="table.data" :columns="table.columns" @on-edit="handleEdit"
              @on-delete="handleDelete">
        <Page slot="footer" :current="pager.page" @on-change="handlePage" :page-size="pager.pageSize"
              :total="pager.total"/>
      </ITable>

    </Card>
  </div>
</template>

<script>
import ITable from '@/components/i-table'
import IForm from '@/components/i-form'
import { Item, Table } from '@/libraries/ivu'

const searchItems = {
  title: Item.input('名称')
}

const columns = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '主图',
    key: 'image',
    render: Table.image({ width: '60px' })
  },
  {
    title: '名称',
    key: 'title',
    width: 300
  },
  {
    title: '排序',
    key: 'order_value'
  },
  {
    title: '创建时间',
    key: 'created_at',
    width: 200
  },
  {
    title: '操作',
    key: 'handle',
    minWidth: 150,
    maxWidth: 150,
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
      loading: true,

      search: {
        items: searchItems,
        model: {
          title: ''
        }
      },
      table: {
        columns: columns,
        data: []
      },
      pager: {
        page: 1,
        size: 2,
        total: 1
      }
    }
  },
  methods: {

    handleEdit (params) {
      const id = params.row.id

      const route = { name: '/components/edit' }
      route.params = { id: id }
      this.$router.push(route)
    },
    handleDelete (params) {
      const data = {}
      data.id = params.row.id

      api.book.delete(data).then(res => {
        if (res.code === 0) {
          this.$Message.success('删除成功')
          this.table.data = params.tableData.filter((item, index) => index !== params.row.initRowIndex)
        } else {
          this.$Message.error(res.message)
        }
      })
    },
    handleSearch (params) {
      this.pager.page = 1
      this.getList()
    },
    handleExport (params) {
    },
    handlePage (page) {
      this.pager.page = page
      this.getList()
    },
    getList () {
      this.loading = true

      const params = Object.assign({
        page: this.pager.page,
        page_size: this.pager.size
      }, this.search.model)

      api.book.list(params).then(res => {
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
