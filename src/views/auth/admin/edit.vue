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
        <FormItem label="账号" prop="account">
          <Input placeholder="账号" v-model="form.model.account"></Input>
        </FormItem>

        <FormItem label="重置密码" style="margin-bottom: 12px" v-if="id">
          <i-switch v-model="showPassword"/>
        </FormItem>

        <FormItem :rules="{required: true, message: '密码不能为空', trigger: 'blur'}" label="密码" prop="password"
                  v-if="showPassword">
          <Input type="password" v-model="form.model.password"/>
        </FormItem>

        <FormItem label="状态" prop="is_lock">
          <RadioGroup v-model="form.model.is_lock">
            <Radio :label=0>正常</Radio>
            <Radio :label=1>锁定</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="超级管理员" prop="is_lock">
          <RadioGroup v-model="form.model.is_super">
            <Radio :label=0>否</Radio>
            <Radio :label=1>是</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem class="role-list" label="角色" v-if="!form.model.is_super">
          <Transfer :data="totalRoleTransfer"
                    :operations="['To left','To right']"
                    :target-keys="form.model.role_list"
                    @on-change="handleRoleChange"
                    v-if="totalRoleArray.length > 0"
          >
          </Transfer>

          <span v-else="">加载中</span>
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
import { Util } from '@/libraries/ivu'

export default {
  data () {
    return {
      page: page,
      id: false,
      totalRoleArray: [],
      totalRoleTransfer: [],
      showPassword: true,
      form: {
        model: {
          id: 0,
          account: '',
          password: '',
          is_super: 0,
          is_lock: 1,
          role_list: []
        },
        rules: {
          account: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ]
        }
      }
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

          if (!this.showPassword) {
            delete data.password
          }

          const save = this.id ? api.admin.update : api.admin.create

          save(data).then(res => {
            if (res.code === 0) {
              this.$router.push(this.page.listRoute)
            }
            msg()
          })
        } else {
          this.$Message.error('表单校验错误')
        }
      })
    },
    handleRoleChange (newTargetKeys) {
      this.form.model.role_list = newTargetKeys
    }
  },
  mounted () {
    const id = this.$route.params.id || 0

    if (id) {
      this.id = id
      this.showPassword = false // 不显示修改密码

      const row = chaste.setStorageSync(this.page.editRoute.name).get(id)
      if (!row) {
        this.$Message.error('数据不存在')
        return this.$router.push(this.page.listRoute)
      }

      for (const i in this.form.model) {
        if (row.hasOwnProperty(i)) this.form.model[i] = row[i]
      }
    }

    api.role.list({ page_size: 1000 }).then(res => {
      if (res.code === 0) {
        const data = res.data.data
        this.totalRoleArray = data

        this.totalRoleTransfer = Util.transfer(data, 'id', 'name')
      }
    })
  }
}
</script>
