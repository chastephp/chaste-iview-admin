/**
 *
 * @param array
 * @param columnKey
 * @param indexKey
 * @returns {*}
 * @description 仿php函数
 */
export const arrayColumn = (array, columnKey, indexKey = null) => {
  const arr = indexKey === null ? [] : {}
  array.map(item => {
    if (indexKey === null) {
      arr.push(item[columnKey])
    } else if (columnKey === null) {
      arr[item[indexKey]] = item
    } else {
      arr[item[indexKey]] = item[columnKey]
    }
  })

  return arr
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const arrayUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * 可以使用JSON.parse(JSON.stringify(obj))来深克隆
 * @param data
 * @returns {*}
 */
export const deepClone = (data) => {
  if (Array.isArray(data)) {
    return data.map(deepClone)
  } else if (Object.prototype.toString.call(data) === '[object Object]') {
    return Object.keys(data).reduce(function (o, k) {
      o[k] = deepClone(data[k])
      return o
    }, {})
  } else {
    return data
  }
}

export const clone = (obj) => {
  const cloned = {}
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      cloned[prop] = obj[prop]
    }
  }
  return cloned
}

/*
 * Convert array to tree, array item id is related pid default;
 * Defined yourself related params in parameter you can;
 * put child item into children field;
 * @params {Array} arr = [{id:1,pid:0,name:'level 1'},{id:2,pid:1,name:'level 2'},...]
 * @return {Array}
 * */
export const array2tree = (array, keyName = 'id', parentKeyName = 'pid') => {
  if (!Array.isArray(array)) {
    console.error('params array need Array')
    return false
  }

  let hasError = false
  array.forEach((v, i) => {
    if (!(keyName in v)) {
      console.error(`params index ${i} has not key ${keyName}`)
      hasError = true
    } else if (!(parentKeyName in v)) {
      console.error(`params index ${i} has not key ${parentKeyName}`)
      hasError = true
    }
  })
  if (hasError) {
    return false
  }

  const map = {}
  array.forEach(v => {
    v.children = []
    map[v[keyName]] = v
  })
  map[0] = { [keyName]: 0, name: 'root', children: [] }
  array.forEach(v => {
    // 使用私有__parent存储一份父节点引用
    // v.__parent__ = v[parentKeyName] ? map[v[parentKeyName]] : null
    // 巧妙地利用了v是个对象引用
    map[v[parentKeyName]].children.push(v)
  })

  return map[0].children
}

export const array2kv = (array, keyName = 'id', valName = 'name') => {
  const arr = []
  for (const i in array) {
    arr.push({ key: array[i][keyName], val: array[i][valName] })
  }

  return arr
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}
