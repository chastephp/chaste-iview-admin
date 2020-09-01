import dayjs from 'dayjs'

export const Rule = {
  mobile (msg) {
    return { pattern: /^1(\d{10})?$/, message: msg || '手机号码不正确', trigger: 'blur' }
  },
  money (msg) {
    return { pattern: /^\d+(\.\d{1,2})?$/, message: msg || '金额错误', trigger: 'blur' }
  },
  integer (msg) {
    return { type: 'integer', message: msg || '必须为整数', trigger: 'blur' }
  },
  N (msg) {
    return { type: 'integer', min: 0, message: msg || '必须为整数', trigger: 'blur' }
  },
  order (msg) {
    return { type: 'integer', message: msg || '必须为整数', min: 0, trigger: 'change' }
  },
  date (msg) {
    return { type: 'date', message: msg || '时间错误', trigger: 'blur' }
  },
  url (msg) {
    return { type: 'url', message: msg || '链接错误', trigger: 'blur' }
  },
  email (msg) {
    return { type: 'email', message: msg || '邮箱错误', trigger: 'blur' }
  },
  required: {
    string (msg) {
      return { required: true, message: msg || '不能为空', trigger: 'trigger' }
    },
    number (msg) {
      return { required: true, type: 'number', message: msg || '不能为空', trigger: 'trigger' }
    },
    integer (msg) {
      return { required: true, type: 'integer', message: msg || '不能为空', trigger: 'trigger' }
    },
    array (msg) {
      return { required: true, type: 'array', message: msg || '不能为空', trigger: 'trigger' }
    },
    date (msg) {
      return { required: true, type: 'date', message: msg || '不能为空', trigger: 'trigger' }
    }
  }
}

export const Table = {
  // @example {title: '开始日期', key: 'validBeginDate', render: helper.table.date()},
  image (style = {}) {
    const _style = Object.assign({ 'max-width': '100px', 'max-height': '100px' }, style)
    return (h, params) => {
      return h('img', {
        style: _style,
        attrs: { src: params.row[params.column.key] }
      })
    }
  },
  kv (array) {
    return (h, params) => {
      const value = params.row[params.column.key]
      const index = array.findIndex(v => v.key.toString() === value.toString())
      const valueText = array[index] ? array[index].val : ''
      return h('span', valueText)
    }
  },
  date (fmt = 'YYYY-MM-DD HH:mm:ss') {
    return (h, params) => {
      const value = params.row[params.column.key]

      return h('span', value ? dayjs(new Date(value)).format(fmt) : '')
    }
  },
  union (keys, separator = '') {
    return (h, params) => {
      var ret = []
      keys.forEach(k => {
        ret.push(params.row[k])
      })

      return h('span', ret.join(separator))
    }
  },
  get (key) {
    return (h, params) => {
      var ret = params.row
      key.split('.').forEach(k => {
        ret = ret ? ret[k] : ''
      })

      return h('span', ret)
    }
  },
  radio (name = 'id') {
    return (h, params) => {
      const value = params.row[params.column.key]
      return h('Radio', { name, value })
    }
  }
}

export const Item = {
  select (label, options) {
    return Object.assign({ type: 'select', label }, options)
  },
  input (label, options) {
    return Object.assign({ type: 'input', label }, options)
  },
  textarea (label, options) {
    return Object.assign({ type: 'textarea', label }, options)
  },
  password (label, options) {
    return Object.assign({ type: 'password', label }, options)
  },
  checkbox (label, options) {
    return Object.assign({ type: 'checkbox', label }, options)
  },
  radio (label, options) {
    return Object.assign({ type: 'radio', label }, options)
  },
  inputNumber (label, options) {
    return Object.assign({ type: 'inputNumber', label }, options)
  },
  upload (label, options) {
    return Object.assign({ type: 'upload', label }, options)
  },
  datePicker (label, options) {
    return Object.assign({ type: 'datePicker', label }, options)
  },
  editor (label, options) {
    return Object.assign({ type: 'editor', label }, options)
  }
}

export const Util = {
  transfer (arr, key, label) {
    return arr.map(item => {
      const v = Object.assign({}, item)
      v.key = v[key]
      v.label = v[label]

      return v
    })
  },
  array2kv: (arr, key, value) => {
    return arr.map(item => {
      const v = {}
      v.key = item[key]
      v.val = item[value]

      return v
    })
  }
}
