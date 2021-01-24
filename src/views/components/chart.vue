<template>
  <div>
    <Menu mode="horizontal" theme="light" active-name="1">
      <MenuItem name="1">
        用户注册数统计
      </MenuItem>
    </Menu>
    <br/>
    <Card>

      <div class="search-bar">
        <Form :inline="true" ref="form" :model="search.model" :rules="{}" :label-width="100" :show-message="false">
          <FormItem label="开始时间" prop="beginTime">
            <DatePicker style="width: 200px;" v-model="search.model.begin_time"
                        type="datetime"
                        :transfer="true"
                        placeholder="开始时间"></DatePicker>
          </FormItem>

          <FormItem label="结束时间" prop="endTime">
            <DatePicker style="width: 200px;" v-model="search.model.end_time"
                        :transfer="true" type="datetime"
                        placeholder="结束时间"></DatePicker>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleSearch">查看</Button>
            <Button @click="handleReset" style="margin-left: 12px">重置</Button>
          </FormItem>
        </Form>
      </div>

      <IChart style="height: 500px;" v-model="option"></IChart>

    </Card>
  </div>
</template>

<script>
import IChart from '@/components/i-chart'
import { Line } from '@/libraries/echarts'

export default {
  components: {
    IChart
  },
  data () {
    return {
      loading: true,

      search: {
        model: {
          begin_time: new Date(+new Date() - 30 * 86400 * 1000),
          end_time: new Date(+new Date() + 86400 * 1000)
        }
      },
      option: {}
    }
  },
  methods: {
    handleReset () {
      this.$refs.form.resetFields()
    },
    handleSearch (params) {
      this.getData()
    },
    getData () {
      // const params = Object.assign({}, this.search.model)

      const data = [
        {
          date: '2020-01',
          news_users: 1000
        }, {
          date: '2020-02',
          news_users: 2000
        }, {
          date: '2020-03',
          news_users: 1500
        }, {
          date: '2020-04',
          news_users: 1300
        }, {
          date: '2020-05',
          news_users: 2500
        }, {
          date: '2020-06',
          news_users: 2800
        }, {
          date: '2020-07',
          news_users: 1800
        }, {
          date: '2020-08',
          news_users: 1790
        }
      ]

      this.option = Line.makeBasicOption({
        data: data,
        xKey: 'date',
        yKey: 'news_users',
        title: { text: '每日新增用户数' }
      })

      // 变化
      setInterval(() => {
        this.option = Line.makeBasicOption({
          data: [
            {
              date: '2020-01',
              news_users: Math.floor(Math.random() * 1000)
            }, {
              date: '2020-02',
              news_users: Math.floor(Math.random() * 1000)
            }, {
              date: '2020-03',
              news_users: Math.floor(Math.random() * 1000)
            }, {
              date: '2020-04',
              news_users: Math.floor(Math.random() * 1000)
            }, {
              date: '2020-05',
              news_users: Math.floor(Math.random() * 1000)
            }, {
              date: '2020-06',
              news_users: Math.floor(Math.random() * 1000)
            }, {
              date: '2020-07',
              news_users: Math.floor(Math.random() * 1000)
            }, {
              date: '2020-08',
              news_users: Math.floor(Math.random() * 1000)
            }
          ],
          xKey: 'date',
          yKey: 'news_users',
          title: { text: '每日新增用户数' }
        })
      }, 2000)
    }

  },
  mounted () {
    this.getData()
  }
}
</script>
