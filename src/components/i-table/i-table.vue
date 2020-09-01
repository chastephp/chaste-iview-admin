<template>
  <div>
    <Table
      :border="border"
      :columns="insideColumns"
      :data="insideTableData"
      :disabled-hover="disabledHover"
      :height="height"
      :highlight-row="highlightRow"
      :loading="loading"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      :row-class-name="rowClassName"
      :show-header="showHeader"
      :size="size"
      :stripe="stripe"
      :width="width"
      @on-current-change="onCurrentChange"
      @on-expand="onExpand"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-select="onSelect"
      @on-select-all="onSelectAll"
      @on-select-cancel="onSelectCancel"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      ref="tablesMain"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
  </div>
</template>

<script>
import handleBtn from './handle-btn'
import './index.less'

export default {
  name: 'ITable',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    size: String,
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data () {
    return {
      selection: [],
      insideColumns: [],
      insideTableData: []
    }
  },
  methods: {

    supportHandle (item) {
      const options = item.options || []
      const insideBtns = []
      options.forEach(item => {
        if (handleBtn[item]) insideBtns.push(handleBtn[item])
      })
      const btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns (columns) {
      this.insideColumns = columns.map((item, index) => {
        let res = item
        if (res.editable) res = this.suportEdit(res, index)
        if (res.key === 'handle') res = this.supportHandle(res)
        return res
      })
    },
    handleTableData () {
      this.insideTableData = this.value.map((item, index) => {
        const res = item
        res.initRowIndex = index
        return res
      })
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      this.selection = selection
      this.$emit('on-selection-change', selection)
    },
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    }
  },
  watch: {
    columns (columns) {
      this.handleColumns(columns)
    },
    value (val) {
      this.handleTableData()
    }
  },
  mounted () {
    this.handleColumns(this.columns)
    this.handleTableData()
  }
}
</script>
