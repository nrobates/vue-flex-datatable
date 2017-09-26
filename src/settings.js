import merge from 'lodash/merge'

const settings = {
  tableClass: 'table table-responsive table-hover table-bordered mt-2',
  headerClass: 'thead-default',
  cellClass: '',
  filterInputClass: 'form-control',
  filterPlaceholder: 'Filter table…',
  filterNoResults: 'There are no matching rows',
  cacheKey: null,
  cacheLifetime: 5,
  toggleLabel: 'Show:',
  columnSettings: {
    label: '',
    show: null,
    visible: true,
    sortable: false,
    filterable: false,
    toggleable: false,
    toggleLabel: null,
    formatter: null,
    childFormatter: null
  }
}

export function mergeSettings (newSettings) {
  merge(settings, newSettings)
}

export default settings
