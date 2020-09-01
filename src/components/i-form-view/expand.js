export default {
  name: 'SpanExpand',
  functional: true,
  props: {
    prop: {
      type: String
    },
    model: {
      type: Object
    },
    render: {
      type: Function
    }
  },
  render: (h, ctx) => {
    if (!ctx.props.model.hasOwnProperty(ctx.props.prop)) {
      ctx.props.model[ctx.props.prop] = '' // 兼容一波
    }

    const params = {
      column: {
        key: ctx.props.prop
      },
      row: ctx.props.model
    }
    return ctx.props.render(h, params)
  }
}
