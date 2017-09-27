<script>
  import _ from 'lodash'

  export default {
    name: 'FlexTableCell',
    functional: true,
    props: ['column', 'row'],
    render (createElement, {props}) {
      const data = {}
      if (typeof props.column.$scopedSlots.default !== 'undefined') {
        return createElement('td', data, props.column.$scopedSlots.default(props.row))
      }
      let defaultContent = _.isFunction(props.column.formatter) ? props.column.formatter(_.get(props.row, props.column.show), props.row) : _.get(props.row, props.column.show)
      data.domProps = {}
      data.domProps.innerHTML = defaultContent

      return createElement('td', data)
    }
  }
</script>