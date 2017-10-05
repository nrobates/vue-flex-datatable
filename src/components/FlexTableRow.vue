<template>
    <tr>
        <td v-if="hasToggle">
            <a href="#" class="btn btn-sm btn-link"

            >
                <i :class="['fa', {'fa-plus-circle': !data.showChildren, 'fa-minus-circle': data.showChildren}]"></i>
            </a>
        </td>
        <flex-table-cell v-for="(column, index) in columns" :key="index" :column="column" :row="data"></flex-table-cell>
    </tr>
</template>

<script>
  import FlexTableCell from './FlexTableCell.vue'

  export default {
    name: 'FlexTableRow',
    components: {FlexTableCell},
    props: {
      data: {required: true, type: Object},
      columns: {required: true, type: Array}
    },
    computed: {
      hasToggle () {
        return this.data.isGroup === true
      }
    }
  }
</script>