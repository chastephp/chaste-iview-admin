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
              v-model="table.data">
        <Page :current="pager.page" :page-size="pager.pageSize" :total="pager.total" @on-change="handlePage"
              slot="footer"/>
      </ITable>

    </Card>
  </div>
</template>

<script>
import ITable from '@/components/i-table'
import IForm from '@/components/i-form'
import { config, page } from './page'
import { Table } from '@/libraries/ivu'

const columns = [
  { title: 'ID', key: 'id' },
  { title: '账号', key: 'account' },
  { title: '状态', key: 'is_lock', render: Table.kv(config.is_lock) },
  {
    title: '操作',
    key: 'handle',
    minWidth: 180,
    maxWidth: 180,
    button: [
      (h, params, vm) => {
        if (Number(params.row.id) === 1) {
          return h('span', '')
        }
        return h('Button', {
          props: {
            type: 'default',
            size: 'small'
          },
          style: {
            marginRight: '5px'
          },
          on: {
            click: () => {
              vm.$emit('on-edit', params)
            }
          }
        }, '编辑')
      },
      (h, params, vm) => {
        if (Number(params.row.id) === 1) {
          return h('span', '')
        }
        return h('Poptip', {
          props: {
            transfer: true,
            confirm: true,
            title: '你确定要删除吗?'
          },
          on: {
            'on-ok': () => {
              vm.$emit('on-delete', params)
            }
          }
        }, [
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            }
          }, '删除')
        ])
      }
    ]
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
    handleEdit (params) {
      const id = params.row.id

      const route = Object.assign({}, this.page.editRoute)
      route.params = { id: id }

      chaste.setStorageSync(this.page.editRoute.name).set(id, params.row)
      this.$router.push(route)
    },
    handleDelete (params) {
      const data = {}
      data.id = params.row.id

      api.admin.delete(data).then(res => {
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
        page_size: this.pager.pageSize
      }, this.search.model)

      api.admin.list(params).then(res => {
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
