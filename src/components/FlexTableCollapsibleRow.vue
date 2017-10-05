<template>
    <div class="flex-row">
        <tbody class="flex-table-row" :key="data.flexTableRowId">
        <tr>
            <td class="flex-table-collapsible-toggle-column">
                <a href="#"
                   class="btn btn-sm btn-link"
                   :class="{'disabled': !data[childRowKey]}"
                   :disabled="!data[childRowKey]"
                   @click.prevent="showChildRows = !showChildRows"
                >
                    <i :class="['fa', {'fa-plus-circle': !data.showChildren, 'fa-minus-circle': data.showChildren}]"></i>
                </a>
            </td>
            <flex-table-cell
                    v-for="(column, cIndex) in columns"
                    :key="cIndex"
                    :column="column"
                    :row="data"
            ></flex-table-cell>
        </tr>
        </tbody>
        <tbody :id="'flex-table-row-'+data.flexTableRowId+'-children'"
               class="flex-table-child-rows"
               v-if="showChildRows"
        >
        <tr v-for="(childRow, crIndex) in data[childRowKey]" :key="crIndex">
            <td></td>
            <flex-table-cell v-for="(column, cIndex) in columns" :key="cIndex"
                             :column="column"
                             :row="childRow"></flex-table-cell>
        </tr>
        </tbody>
    </div>
</template>

<script>
  import FlexTableCell from './FlexTableCell.vue'

  export default {
    name: 'FlexTableCollapsibleRow',
    components: {FlexTableCell},
    props: {
      data: {type: Object, required: true},
      columns: {type: Array, required: true},
      childRowKey: {type: String, default: 'children'}
    },
    data: () => ({
      showChildRows: false
    }),
    computed: {},
    watch: {},
    methods: {},
    mounted () {}
  }
</script>

<style scoped="scss">
    .flex-table-collapsible-toggle-column {
        width: 10px;
    }

    tbody.collapse.in {
        display: table-row-group;
    }
</style>

<!--<template v-for="(row, rIndex) in displayedRows">
                        <tbody :key="rIndex" :id="'flex-table-row-' + rIndex" class="flex-table-row">
                        <tr>
                            <td>
                                <a href="#" class="btn btn-sm btn-link" :class="{'disabled': !row[childRowKey]}"
                                   :disabled="!row[childRowKey]"
                                   @click.prevent="toggleChildrenVisible(row.flexTableRowId)"><i
                                        :class="['fa', {'fa-plus-circle': !row.showChildren, 'fa-minus-circle': row.showChildren}]"></i></a>
                            </td>
                            <flex-table-cell v-for="(column, cIndex) in visibleColumns" :key="cIndex" :column="column"
                                             :row="row"></flex-table-cell>
                        </tr>
                        </tbody>
                        <transition name="fade">
                            <tbody :id="'flex-table-child-rows-' + rIndex"
                                   v-show="isChildrenVisible(row.flexTableRowId)"
                                   class="flex-table-child-rows">
                            <tr v-for="(childRow, crIndex) in row[childRowKey]" :key="crIndex">
                                <td></td>
                                <flex-table-cell v-for="(column, cIndex) in visibleColumns" :key="cIndex"
                                                 :column="column"
                                                 :row="childRow"></flex-table-cell>
                            </tr>
                            </tbody>
                        </transition>
                    </template>-->