<template>
    <div class="flex-table-wrapper">
        <div class="row">
            <div class="col-12 col-md-6 mb-2 text-center">
                <slot name="search">
                    <input
                            :class="filterInputClass"
                            type="text"
                            placeholder="Search"
                    >
                </slot>
            </div>
            <div class="col-12 col-md-6 mb-2 text-center">
                <input
                        :class="filterInputClass"
                        type="text"
                        v-model="filter"
                        :placeholder="filterPlaceholder"
                >
                <a
                        v-if="filter"
                        @click="filter = ''"
                        class="table-component__filter__clear"
                >×</a>
            </div>
            <div class="col-12 col-md-6 mb-2 align-content-center" v-show="columnToggles.length">
                <span><strong>{{toggleLabel}}</strong></span>

                <flex-table-toggle
                        v-for="(toggle, tIndex) in columnToggles"
                        :key="tIndex"
                        v-model="toggle.visible"
                        :label="toggle.toggleLabel"
                        class="mr-1"
                ></flex-table-toggle>

            </div>
            <div class="col-12 col-md-6 mb-2 text-right align-content-center">
                <span><strong>Group By: </strong></span>

            </div>
        </div>

        <table :class="tableClasses">
            <thead>
            <tr>
                <td v-if="childRows"></td>
                <flex-table-header-column
                        v-for="(column, cIndex) in visibleColumns"
                        :key="cIndex"
                        :column="column"
                        :sort="sort"
                        @click="updateSort"
                ></flex-table-header-column>
            </tr>
            </thead>

            <template v-if="childRows">
                <template v-for="(row, rIndex) in displayedRows">
                    <tbody :key="rIndex" :id="'flex-table-row-' + rIndex" class="flex-table-row">
                    <tr>
                        <td>
                            <a href="#" class="btn btn-sm btn-link"
                               @click.prevent="row.showChildren = !row.showChildren"><i
                                    :class="['fa', {'fa-plus-circle': !row.showChildren, 'fa-minus-circle': row.showChildren}]"></i></a>
                        </td>
                        <flex-table-column
                                v-for="(column, cIndex) in visibleColumns"
                                :key="cIndex"
                                :row="row"
                                :column="column"
                        ></flex-table-column>
                    </tr>
                    </tbody>
                    <transition name="fade">
                        <tbody :id="'flex-table-child-rows-' + rIndex" v-show="row.showChildren"
                               class="flex-table-child-rows">
                        <flex-table-row
                                v-for="(childRow, crIndex) in childRowColumn(row)"
                                :key="rIndex + '-' + crIndex"
                                :data="childRow"
                                :columns="visibleColumns"
                                childRows
                        ></flex-table-row>
                        </tbody>
                    </transition>
                </template>
            </template>

            <tbody v-else>
            <flex-table-row
                    v-for="(row, rIndex) in displayedRows"
                    :key="rIndex"
                    :data="row"
                    :columns="visibleColumns"
            ></flex-table-row>
            </tbody>
        </table>
    </div>
</template>

<script>
  import _ from 'lodash'
  import Vue from 'vue'
  import settings from '../settings'
  import { classList } from '../helpers'
  import FlexTableToggle from './FlexTableToggle.vue'
  import FlexTableColumn from './FlexTableColumn.vue'
  import FlexTableHeaderColumn from './FlexTableHeaderColumn.vue'
  import FlexTableRow from './FlexTableRow.vue'

  export default {
    name: 'FlexTable',
    components: {
      FlexTableRow,
      FlexTableHeaderColumn,
      FlexTableColumn,
      FlexTableToggle
    },
    props: {
      columns: {default: () => [], type: Array},
      rows: {default: () => [], type: Array},

      childRows: {default: false, type: Boolean},
      childRowsKey: {default: null, type: String},

      showCaption: {default: true},
      showFilter: {default: true},
      filterPlaceholder: {default: settings.filterPlaceholder},
      filterInputClass: {default: settings.filterInputClass},
      filterNoResults: {default: settings.filterNoResults},

      sortBy: {default: '', type: String},
      sortOrder: {default: '', type: String},

      cacheKey: {default: settings.cacheKey},
      cacheLifetime: {default: settings.cacheLifetime},

      tableClass: {default: settings.tableClass},
      theadClass: {default: settings.headerClass},

      toggleLabel: {default: settings.toggleLabel}
    },
    data: () => ({
      filter: '',
      sort: {
        fieldName: '',
        order: 'asc'
      },
      pagination: null,
      localSettings: {},
      slotObserver: null,
      toggles: []
    }),
    computed: {
      mappedColumns () {
        return this.columns.map((col) => {
          for (var key in settings.columnSettings) {
            if (typeof col[key] === 'undefined') {
              Vue.set(col, key, settings.columnSettings[key])
            }
          }
          return col
        })
      },
      columnToggles () {
        return this.mappedColumns.filter(column => column.toggleable)
      },
      visibleColumns () {
        return this.mappedColumns.filter(column => column.visible === true)
      },
      filterableColumns () {
        return this.visibleColumns.filter(column => column.filterable)
      },
      tableClasses () {
        return classList('flex-table', this.tableClass)
      },
      displayedRows () {
        if (!this.showFilter) {
          return this.sortedRows
        }
        if (!this.columns.filter(column => column.filterable === true).length) {
          return this.sortedRows
        }
        return this.sortedRows.filter((row) => {
          return this.visibleColumns
            .filter(column => column.filterable === true)
            .map(column => _.get(row, column.show).toString().toLowerCase())
            .filter((filteredValue) => {
              return filteredValue.includes(this.filter.toLowerCase())
            })
            .length
        })
      },
      sortedRows () {
        if (this.sort.fieldName === '') {
          return this.tableRows
        }
        if (this.mappedColumns.length === 0) {
          return this.tableRows
        }
        const sortColumn = this.getColumn(this.sort.fieldName)
        if (!sortColumn) {
          return this.tableRows
        }
        return _.orderBy(this.tableRows, this.sort.fieldName, this.sort.order)
      },
      tableRows () {
        return this.rows.map((row) => {
          Vue.set(row, 'showChildren', false)
          return row
        })
      }
    },
    watch: {},
    methods: {
      columnValue (row, column) {
        return _.get(row, column.show)
      },
      childRowColumn (row) {
        return _.get(row, this.childRowsKey)
      },
      getColumn (columnName) {
        return this.mappedColumns.find(column => column.show === columnName)
      },
      updateSort (column) {
        if (this.sort.fieldName !== column.show) {
          this.sort.fieldName = column.show
          this.sort.order = 'asc'
        } else {
          this.sort.order = (this.sort.order === 'asc' ? 'desc' : 'asc')
        }
      }
    },
    mounted () {},
    created () {}
  }
</script>

<style lang="css">
    @keyframes slideInDown {
        from {
            transform: translate3d(0, -100%, 0);
            visibility: visible;
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideOutDown {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            visibility: hidden;
            transform: translate3d(0, 100%, 0);
        }
    }

    @keyframes slideInLeft {
        from {
            transform: translate3d(-100%, 0, 0);
            visibility: visible;
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideOutLeft {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            visibility: hidden;
            transform: translate3d(-100%, 0, 0);
        }
    }

    @keyframes slideInRight {
        from {
            transform: translate3d(100%, 0, 0);
            visibility: visible;
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            visibility: hidden;
            transform: translate3d(100%, 0, 0);
        }
    }

    @keyframes slideInUp {
        from {
            transform: translate3d(0, 100%, 0);
            visibility: visible;
        }
        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideOutUp {
        from {
            transform: translate3d(0, 0, 0);
        }
        to {
            visibility: hidden;
            transform: translate3d(0, -100%, 0);
        }
    }

    .slide-enter-active,
    .slideIn,
    .slide-leave-active,
    .slideOut {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slide-enter-active,
    .slideIn {
        animation-name: slideIn;
    }

    .slide-leave-active,
    .slideOut {
        animation-name: slideOut;
    }

    .slideUp-enter-active,
    .slideInUp,
    .slideUp-leave-active,
    .slideOutUp {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slideUp-enter-active,
    .slideInUp {
        animation-name: slideInUp;
    }

    .slideUp-leave-active,
    .slideOutUp {
        animation-name: slideOutUp;
    }

    .slideRight-enter-active,
    .slideInRight,
    .slideRight-leave-active,
    .slideOutRight {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slideRight-enter-active,
    .slideInRight {
        animation-name: slideInRight;
    }

    .slideRight-leave-active,
    .slideOutRight {
        animation-name: slideOutRight;
    }

    .slideLeft-enter-active,
    .slideInLeft,
    .slideLeft-leave-active,
    .slideOutLeft {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slideLeft-enter-active,
    .slideInLeft {
        animation-name: slideInLeft;
    }

    .slideLeft-leave-active,
    .slideOutLeft {
        animation-name: slideOutLeft;
    }

    .slideDown-enter-active,
    .slideInDown,
    .slideDown-leave-active,
    .slideOutDown {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slideDown-enter-active,
    .slideInDown {
        animation-name: slideInDown;
    }

    .slideDown-leave-active,
    .slideOutDown {
        animation-name: slideOutDown;
    }
</style>