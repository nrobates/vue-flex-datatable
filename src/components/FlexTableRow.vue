<template>
    <tr>
        <td v-if="childRows"></td>
        <flex-table-column
                v-for="(column, cIndex) in columns"
                :key="cIndex"
                :row="data"
                :column="column"
        ></flex-table-column>
    </tr>
</template>

<script>
  import _ from 'lodash'
  import FlexTableColumn from './FlexTableColumn.vue'

  export default {
    name: 'FlexTableRow',
    components: {FlexTableColumn},
    props: {
      data: {required: true, type: Object},
      columns: {required: true, type: Array},
      childRows: {default: false, type: Boolean},
      childRowsKey: {default: null, type: String}
    },
    computed: {
      bodyOpen () {
        return this.childRows ? '<tbody>' : ''
      },
      bodyClose () {
        return this.childRows ? '</tbody>' : ''
      }
    }
  }
</script>