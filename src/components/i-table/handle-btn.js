const btns = {
  delete: (h, params, vm) => {
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
  },
  edit: (h, params, vm) => {
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
  view: (h, params, vm) => {
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
          vm.$emit('on-view', params)
        }
      }
    }, '查看')
  }
}

export default btns
