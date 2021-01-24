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
        <Page show-elevator slot="footer" :current="pager.page" @on-change="handlePage" :page-size="pager.pageSize"
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
    title: 'JSX',
    key: 'mobile',
    render: (h, params) => {
      return <span>xxoo</span>
    }
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
    fixed: 'right',
    minWidth: 140,
    maxWidth: 140,
    buttons: ['edit', 'delete']
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
      this.loading = false
      const data = {
        current_page: 1,
        data: [{
          id: 1,
          title: '说说你想读什么书',
          desc: '你该读书了',
          is_public: 1,
          image: '//img14.360buyimg.com/n1/jfs/t1/58236/23/2337/358377/5d03632cEe3ea3a66/302f4bca3823a6fb.jpg',
          order_value: 1,
          created_at: '2019-07-23 00:16:06',
          updated_at: '2020-07-22 16:50:41',
          deleted_at: null
        }, {
          id: 5,
          title: '探索万古星辰',
          desc: '宇宙的秘密',
          is_public: 1,
          image: '//img11.360buyimg.com/n1/jfs/t1/127804/28/7640/517528/5f17b640E6f3d7448/eda897ad69031638.jpg',
          order_value: 0,
          created_at: '2019-07-23 21:24:59',
          updated_at: '2020-07-13 13:10:12',
          deleted_at: null
        }, {
          id: 3,
          title: '读书是一种陪伴',
          desc: '读书是一种陪伴',
          is_public: 1,
          image: '//img14.360buyimg.com/n1/jfs/t1/141248/39/6580/686587/5f45fde8Ea0111fa5/e82fd7373a70e83b.jpg',
          order_value: 0,
          created_at: '2019-07-23 00:27:44',
          updated_at: '2020-08-03 21:44:02',
          deleted_at: null
        }, {
          id: 2,
          title: '深夜安静的躺着读书',
          desc: '深夜安静的躺着读书',
          is_public: 1,
          image: '//img10.360buyimg.com/n1/jfs/t1/104968/21/17082/405932/5e819d6fEb10c3d64/408ce3ee8306e661.jpg',
          order_value: 0,
          created_at: '2019-07-23 00:20:46',
          updated_at: '2020-08-18 11:05:20',
          deleted_at: null
        }],
        last_page: 1,
        per_page: 2,
        total: 4
      }

      const res = { code: 0, data: data }

      if (res.code === 0) {
        this.pager.total = res.data.total
        this.pager.pageSize = res.data.per_page
        this.table.data = res.data.data
      }
    }

  },
  mounted () {
    this.getList()
  }
}
</script>
