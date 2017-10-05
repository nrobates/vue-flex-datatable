import { mergeSettings } from './settings'
import FlexTable from './components/FlexTable.vue'
import FlexTableCell from './components/FlexTableCell.vue'
import FlexTableColumn from './components/FlexTableColumn.vue'
import FlexTableFilter from './components/FlexTableFilter.vue'
import FlexTableGroup from './components/FlexTableGroup.vue'
import FlexTableHeaderColumn from './components/FlexTableHeaderColumn.vue'
import FlexTablePagination from './components/FlexTablePagination.vue'
import FlexTableCollapsibleRow from './components/FlexTableCollapsibleRow.vue'
import FlexTableRow from './components/FlexTableRow.vue'
import FlexTableRows from './components/FlexTableRows.vue'
import FlexTableToggle from './components/FlexTableToggle.vue'
import FlexTableToggles from './components/FlexTableToggles.vue'

export default {
  install (Vue) {
    Vue.component('flex-table', FlexTable)
    Vue.component('flex-table-cell', FlexTableCell)
    Vue.component('flex-table-column', FlexTableColumn)
    Vue.component('flex-table-filter', FlexTableFilter)
    Vue.component('flex-table-group', FlexTableGroup)
    Vue.component('flex-table-header-column', FlexTableHeaderColumn)
    Vue.component('flex-table-collapsible-row', FlexTableCollapsibleRow)
    Vue.component('flex-table-row', FlexTableRow)
    Vue.component('flex-table-rows', FlexTableRows)
    Vue.component('flex-table-toggle', FlexTableToggle)
    Vue.component('flex-table-toggles', FlexTableToggles)
    Vue.component('flex-table-pagination', FlexTablePagination)
  },

  settings (settings) {
    mergeSettings(settings)
  }
}

export {
  FlexTable,
  FlexTableCell,
  FlexTableColumn,
  FlexTableFilter,
  FlexTableGroup,
  FlexTableHeaderColumn,
  FlexTablePagination,
  FlexTableCollapsibleRow,
  FlexTableRow,
  FlexTableRows,
  FlexTableToggle,
  FlexTableToggles
}
