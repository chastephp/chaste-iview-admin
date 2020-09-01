<template>
  <div>
    <Menu active-name="1" mode="horizontal" theme="light">
      <MenuItem name="1">
        Banner设置
      </MenuItem>
    </Menu>

    <br/>
    <Card>
      <Form :label-width="100" :model="form.model" :rules="form.rules" ref="form">
        <FormItem :label-width="0" prop="banner_list">
          <div class="ivu-table-wrapper">
            <div class="ivu-table ivu-table-default">
              <div class="ivu-table-header">
                <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                  <thead>
                  <tr>
                    <th>
                      <div class="ivu-table-cell"><span>名称</span></div>
                    </th>
                    <th>
                      <div class="ivu-table-cell"><span>链接</span></div>
                    </th>
                    <th>
                      <div class="ivu-table-cell"><span>图片</span></div>
                    </th>
                    <th>
                      <div class="ivu-table-cell"><span>操作</span></div>
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr :key="index" class="ivu-table-row" v-for="(item,index) in form.model.banner_list">
                    <td>
                      <div class="ivu-table-cell">
                        <Input class="" v-model="item.title"/>
                      </div>
                    </td>
                    <td>
                      <div class="ivu-table-cell">
                        <Input class="" v-model="item.url"/>
                      </div>
                    </td>
                    <td>
                      <div class="ivu-table-cell">
                        <IUploadImage :data="{folder:'banners'}" :max="1" :tip="'800*600'" style="margin-top: 14px;"
                                      v-model="item.image">
                        </IUploadImage>
                      </div>
                    </td>
                    <td>
                      <div class="ivu-table-cell">
                        <Icon :size="16" @click.native="go('up',index)" style="margin-right: 8px;cursor: pointer"
                              type="md-arrow-up"/>
                        <Icon :size="16" @click.native="go('down',index)" style="margin-right: 8px;cursor: pointer"
                              type="md-arrow-down"/>
                        <Icon :size="16" @click.native="go('delete',index)" style="margin-right: 8px;cursor: pointer"
                              type="md-close"/>
                      </div>
                    </td>
                  </tr>

                  <tr class="ivu-table-row">
                    <td rowspan="4">
                      <div class="ivu-table-cell">
                        <Button @click="addBanner" type="default">新增</Button>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
import Vue from 'vue'
import IUploadImage from '@/components/i-upload-image'

export default {
  components: {
    IUploadImage
  },
  data () {
    return {
      form: {
        model: {
          banner_list: [{
            title: '',
            url: '',
            image: ''
          }]
        },
        rules: {
          banner_list: [
            { required: true, type: 'array', message: '不能为空', trigger: 'change' }
          ]
        }
      }
    }
  },
  methods: {
    go (type, index) {
      var temp
      var bannerList = this.form.model.banner_list
      switch (type) {
        case 'up': {
          if (index === 0) {
            return
          }
          temp = bannerList[index]
          Vue.set(bannerList, index, bannerList[index - 1])
          Vue.set(bannerList, index - 1, temp)
          break
        }
        case 'down': {
          if (index === (bannerList.length - 1)) {
            return
          }
          temp = bannerList[index]
          Vue.set(bannerList, index, bannerList[index + 1])
          Vue.set(bannerList, index + 1, temp)
          break
        }
        case 'delete': {
          this.$Modal.confirm({
            title: '确认删除',
            onOk: () => {
              bannerList.splice(index, 1)
            }
          })
          break
        }
      }
    },
    addBanner () {
      if (this.form.model.banner_list.length >= 6) {
        this.$Message.error('最多6个')
        return
      }

      this.form.model.banner_list.push({
        title: '',
        url: '',
        image: ''
      })
    },
    handleSubmit (params) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const msg = this.$Message.loading({
            content: '提交中...',
            duration: 2
          })

          const data = Object.assign({}, this.form.model)

          api.app.config.update(data).then(res => {
            if (res.status === 200 && res.data.code === 0) {
              this.$Message.success(res.data.message || res.data.msg)
            } else {
              this.$Message.error(res.data.message || res.data.msg)
            }
            msg()
          })
        } else {
          this.$Message.error('表单校验错误')
          console.log(this.form.model)
        }
      })
    }
  },
  mounted () {
    api.app.config.list().then(res => {
      if (res.data) {
        this.form.model.banner_list = res.data.banner_list
      }
    })
  }
}
</script>
