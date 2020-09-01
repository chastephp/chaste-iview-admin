<template>
  <div>
    <Menu active-name="2" mode="horizontal" theme="light">
      <MenuItem :to="page.listRoute" name="1">
        {{ page.name }}列表
      </MenuItem>
      <MenuItem name="2">编辑{{ page.name }}</MenuItem>
    </Menu>

    <br/>
    <Card>
      <Form :label-width="100" :model="form.model" :rules="form.rules" ref="form">
        <FormItem label="角色名称" prop="roleName">
          <Input placeholder="角色名称" v-model="form.model.name"></Input>
        </FormItem>
        <FormItem label="角色描述" prop="roleDesc">
          <Input :rows="2"
                 type="textarea" v-model="form.model.desc"/>
        </FormItem>

        <FormItem class="auth-list" label="权限列表" prop="permission_list">
          <Tree :data="totalAuthTree" ref="tree" show-checkbox></Tree>
        </FormItem>

        <FormItem>
          <Button @click="handleSubmit('form')" type="primary">提交</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<style>

</style>

<script>
import { page } from './page'
import { array2tree, arrayColumn } from '@/libraries/util'

export default {
  components: {},
  data () {
    return {
      page: page,
      id: false,
      totalPermissionArray: [],
      totalAuthTree: [],
      form: {
        model: {
          id: 0,
          name: '',
          desc: '',
          permission_list: []
        },
        rules: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ]
        }
      }
    }
  },
  watch: {
    'form.model.permission_list': {
      handler: function (val, oldVal) {
        this.handleSelected()
      },
      deep: true
    },
    totalPermissionArray () {
      this.handleSelected()
    }
  },
  methods: {
    handleSubmit (params) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const msg = this.$Message.loading({
            content: '提交中...',
            duration: 2
          })

          const data = Object.assign({}, this.form.model)
          const checkedNodes = this.$refs.tree.getCheckedNodes()
          if (checkedNodes.length === 0) {
            // return this.$Message.error('权限不能为空')
          }

          data.permission_list = arrayColumn(checkedNodes, 'id')

          const save = this.id ? api.role.update : api.role.create

          save(data).then(res => {
            if (res.code === 0) {
              this.$router.push(this.page.listRoute)
            }
            msg()
          })
        } else {
          this.$Message.error('表单校验错误')
          console.log(this.form.model)
        }
      })
    },
    handleSelected () {
      const data = this.totalPermissionArray

      const array = data.map(v => {
        v = Object.assign({}, v)
        v.expand = true
        v.title = '[' + v.type + '] ' + v.name

        if (this.form.model.permission_list.find(item => {
          return item === v.id
        })) {
          v.checked = true
        }

        return v
      })

      this.totalAuthTree = array2tree(array, 'id', 'parent_id')
    }
  },
  mounted () {
    const id = this.$route.params.id || 0

    if (id) {
      const row = chaste.setStorageSync(this.page.editRoute.name).get(id)
      if (!row) {
        this.$Message.error('数据不存在')
        return this.$router.push(this.page.listRoute)
      }

      for (const i in this.form.model) {
        // 格式化
        if (row.hasOwnProperty(i)) this.form.model[i] = row[i]
      }
    }

    api.permission.list().then(res => {
      if (res.code === 0) {
        const data = res.data
        this.totalPermissionArray = data
      }
    })
  }
}
</script>
<style>
.auth-list .ivu-form-item-content {
  border: 1px solid #dcdee2;
}
</style>
