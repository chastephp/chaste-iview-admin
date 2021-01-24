<template>
  <div class="cs-i-calendar">
    <div class="cs-i-calendar-header" style="display: flex">
      <Button @click="previousMonth()" type="default">
        <Icon type="ios-arrow-back"/>
      </Button>
      <div class="cs-i-calendar-header-title">{{ currentDate.getFullYear() }} 年 {{ currentDate.getMonth() + 1 }} 月</div>
      <Button @click="nextMonth()" type="default">
        <Icon type="ios-arrow-forward"/>
      </Button>
    </div>
    <div class="ivu-calendar-body">
      <table cellspacing="0" cellpadding="0" class="ivu-calendar-table">
        <thead>
        <th>一</th>
        <th>二</th>
        <th>三</th>
        <th>四</th>
        <th>五</th>
        <th>六</th>
        <th>日</th>
        </thead>
        <tbody>
        <tr v-for="(week_data,week_key) in list" :key="'t'+week_key">
          <td v-for="(_date,_k) in week_data" :key="'s'+week_key+_k">
            <div @click="dayClick(_date)" v-if="_date" class="ivu-calendar-table-day" :class=" _date.getDate() === currentDate.getDate() ? 'ivu-calendar-table-day-current' : ''">
              <div class="ivu-calendar-table-day-title" v-text="_date.getDate()"></div>
              <div class="ivu-calendar-table-day-slot">
                <div @click="eventClick(_event)" :key="_event.title" v-for="(_event) in getEvents(_date)">
                  <Poptip style="width: 100%" trigger="click" :title="_event.title" :content="_event.content || ''">
                    <Badge :title="_event.title" :class="'cs-i-badge'" :color="_event.color" :text="_event.title"/>
                  </Poptip>
                </div>
              </div>
            </div>
            <div v-else class="ivu-calendar-table-day">
              <div class="ivu-calendar-table-day-title"></div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

export default {
  name: 'ICalendar',
  data () {
    return {
      currentDate: new Date(),
      colors: ['blue', 'green', 'red', 'yellow', 'pink', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple']
    }
  },
  props: {
    date: {
      type: Date,
      default: () => new Date()
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    date: function (value) {
      this.currentDate = value
    }
  },
  computed: {
    list () {
      return this.getList()
    }
  },
  methods: {
    dayClick (date) {
      console.log(date)
      this.$emit('dayClick', date)
    },
    eventClick (event) {
      this.$emit('eventClick', event)
    },
    getEvents (date) {
      const _date = +date
      return this.events.filter((item) => {
        // started_at  ended_at
        const _start = new Date(item.start)
        const _end = new Date(item.end)

        const start = +new Date(_start.getFullYear(), _start.getMonth(), _start.getDay())
        const end = +new Date(_end.getFullYear(), _end.getMonth(), _end.getDay() + 1)

        return (_date >= start && _date < end)
      })
      //
      // if (Math.random() > 0.5) {
      //   return [
      //     { content: '看星星看星星看星星看星星看星星看星星看星星看星星看星星看星星', title: '看星星看星星看星星看星星看星星', color: this.getRandomColor() },
      //     { content: '看星星看星星看星星看星星看星星看星星看星星看星星看星星看星星', title: '看太阳', color: this.getRandomColor() },
      //     { content: '看星星看星星看星星看星星看星星看星星看星星看星星看星星看星星', title: '看太阳11', color: this.getRandomColor() },
      //     { content: '看星星看星星看星星看星星看星星看星星看星星看星星看星星看星星', title: '看苹果发布会', color: this.getRandomColor() },
      //     { content: '看星星看星星看星星看星星看星星看星星看星星看星星看星星看星星', title: '看月亮', color: this.getRandomColor() }
      //   ]
      // }
      //
      // return []
    },
    getRandomColor () {
      return this.colors[Math.floor(Math.random() * this.colors.length)]
    },
    previousMonth: function () {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)
    },
    nextMonth: function () {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)
    },
    getList () {
      const days = (new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0)).getDate()

      const day = ((new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1)).getDay() || 7) - 1

      const list = new Array(42).fill(null)
      for (let i = day; i < (days + day); i++) {
        list[i] = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i - day + 1)
      }
      const _list = [[], [], [], [], [], []]
      list.forEach((item, index) => {
        _list[Math.floor(index / 7)][index % 7] = item
      })
      return _list
    }
  }
}
</script>

<style scoped>

::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  display: none;
}

.cs-i-calendar-header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #e8eaec;
}

.cs-i-calendar-header-title {
  color: #17233d;
  font-size: 18px;
}

.ivu-calendar-table {
  table-layout: fixed;
  width: 100%;
}

.ivu-calendar-table thead th {
  padding: 24px 0 6px 6px;
  text-align: left;
  font-size: 14px;
}

.ivu-calendar-table tr td:first-child {
  border-left: 1px solid #e8eaec;
}

.ivu-calendar-table tr:first-child td {
  border-top: 1px solid #e8eaec;
}

.ivu-calendar-table td {
  font-size: 14px;
  border-bottom: 1px solid #e8eaec;
  border-right: 1px solid #e8eaec;
  vertical-align: top;
}

.ivu-calendar-table-day:hover, .ivu-calendar-table-day-current {
  background-color: #f0faff;
}

.ivu-calendar-table-day {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100px;
  padding: 6px;
  -webkit-transition: background-color .2s ease-in-out;
  transition: background-color .2s ease-in-out;
  cursor: pointer;
}

.cs-i-calendar .cs-i-badge {
  width: 100%;
}

.ivu-calendar-table-day {
  overflow-y: auto;
}
</style>

<style>
.cs-i-calendar .cs-i-badge .ivu-badge-status-text {
  white-space: nowrap; /*强制span不换行*/
  display: inline-block; /*将span当做块级元素对待*/
  width: calc(100% - 18px); /*限制宽度*/
  overflow: hidden; /*超出宽度部分隐藏*/
  text-overflow: ellipsis; /*超出部分以点号代替*/
  vertical-align: middle;
}

.cs-i-calendar .ivu-poptip-rel {
  width: 100%;
}
</style>
