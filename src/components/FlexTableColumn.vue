<template>
    <td>{{columnContent}}</td>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'FlexTableColumn',
    components: {},
    props: {
      row: {type: Object, required: true},
      column: {type: Object, required: true}
    },
    data: () => ({}),
    computed: {
      columnContent () {
        if (_.isFunction(this.column.formatter)) {
          return this.column.formatter(_.get(this.row, this.show), this.row)
        }
        return _.get(this.row, this.show)
      }
    },
    watch: {},
    methods: {},
    mounted () {},
    created () {}
  }
</script>