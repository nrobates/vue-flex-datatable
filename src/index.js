import { mergeSettings } from './settings'
import FlexTable from './components/FlexTable.vue'
import FlexTableColumn from './components/FlexTableColumn.vue'
import FlexTableHeaderColumn from './components/FlexTableHeaderColumn.vue'
import FlexTableToggle from './components/FlexTableToggle.vue'
import FlexTableRow from './components/FlexTableRow.vue'

export default {
  install (Vue) {
    Vue.component('flex-table', FlexTable)
    Vue.component('flex-table-row', FlexTableRow)
    Vue.component('flex-table-column', FlexTableColumn)
    Vue.component('flex-table-header-column', FlexTableHeaderColumn)
    Vue.component('flex-table-toggles', FlexTableToggle)
  },

  settings (settings) {
    mergeSettings(settings)
  }
}

export { FlexTable, FlexTableRow, FlexTableColumn, FlexTableHeaderColumn, FlexTableToggle }
