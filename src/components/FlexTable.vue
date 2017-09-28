<template>
    <div class="flex-table-wrapper">
        <div class="row">
            <div class="col-12 col-md-6 mb-2 text-center flex-table-search-wrapper" v-show="showSearch">
                <slot name="search">
                    <input
                            :class="filterInputClass"
                            type="text"
                            placeholder="Search"
                    >
                </slot>
            </div>
            <div class="col-12 col-md-6 mb-2 text-center flex-table-filter-wrapper" v-show="showFilter">
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
            <div class="col-12 col-md-6 mb-2 align-content-center flex-table-toggles-wrapper"
                 v-show="columnToggles.length">
                <flex-table-toggles :label="toggleLabel" :toggles="columnToggleGroups"
                                    class="mr-1"></flex-table-toggles>

            </div>
            <div class="col-12 col-md-6 mb-2 text-right align-content-center flex-table-group-by-wrapper"
                 v-show="showGroupBy">
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
                            <a href="#" class="btn btn-sm btn-link" :class="{'disabled': !row[childRowKey]}"
                               :disabled="!row[childRowKey]"
                               @click.prevent="row.showChildren = !row.showChildren"><i
                                    :class="['fa', {'fa-plus-circle': !row.showChildren, 'fa-minus-circle': row.showChildren}]"></i></a>
                        </td>
                        <flex-table-cell v-for="(column, cIndex) in visibleColumns" :key="cIndex" :column="column"
                                         :row="row"></flex-table-cell>
                    </tr>
                    </tbody>
                    <transition name="fade">
                        <tbody :id="'flex-table-child-rows-' + rIndex" v-show="row.showChildren"
                               class="flex-table-child-rows">
                        <tr v-for="(childRow, crIndex) in row[childRowKey]" :key="crIndex">
                            <td></td>
                            <flex-table-cell v-for="(column, cIndex) in visibleColumns" :key="cIndex" :column="column"
                                             :row="childRow"></flex-table-cell>
                        </tr>
                        </tbody>
                    </transition>
                </template>
            </template>

            <tbody v-else>
            <tr v-for="(row, rIndex) in displayedRows" :key="rIndex">
                <flex-table-cell v-for="(column, cIndex) in visibleColumns" :key="cIndex" :column="column"
                                 :row="row"></flex-table-cell>
            </tr>
            </tbody>
        </table>

        <flex-table-pagination :pagination="pagination" @changePage="navigateToPage" v-if="pagination"></flex-table-pagination>

        <div style="display: none;">
            <slot></slot>
        </div>
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
  import FlexTableCell from './FlexTableCell.vue'
  import FlexTableToggles from './FlexTableToggles.vue'
  import FlexTablePagination from './FlexTablePagination.vue'

  export default {
    name: 'FlexTable',

    components: {
      FlexTablePagination,
      FlexTableToggles,
      FlexTableCell,
      FlexTableRow,
      FlexTableHeaderColumn,
      FlexTableColumn,
      FlexTableToggle
    },

    props: {
      data: {default: () => [], type: [Array, Function]},

      childRows: {default: false, type: Boolean},
      childRowKey: {default: null, type: String},
      childRowType: {default: 'row', type: String},

      showCaption: {default: false, type: Boolean},
      showFilter: {default: false, type: Boolean},
      showSearch: {default: false, type: Boolean},
      showGroupBy: {default: false, type: Boolean},

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
      rows: [],
      columns: [],
      filter: '',
      sort: {
        fieldName: '',
        order: 'asc'
      },
      pagination: null,
      toggleGroups: []
    }),

    watch: {
      data () {
        if (_.isArray(this.data)) {
          this.mountData()
        }
      },

      filter () {
        if (!_.isArray(this.data)) {
          this.mountData()
        }
      }
    },

    computed: {
      tableClasses () {
        return classList('flex-table', this.tableClass)
      },

      columnToggles () {
        return this.columns.filter(column => column.toggleable === true)
      },

      columnToggleGroups () {
        let groupKeys = Object.create({})
        this.toggleableColumns.forEach((col) => {
          Vue.set(groupKeys, col.toggleableGroup, {
            visible: true,
            label: col.toggleableGroup,
            columns: this.columnToggles.filter(column => column.toggleableGroup === col.toggleableGroup)
          })
        })
        return groupKeys
      },

      toggleableColumns () {
        return this.columns.filter(column => column.toggleable === true)
      },

      visibleColumns () {
        return this.columns.filter(column => column.isVisible === true)
      },

      filterableColumns () {
        return this.visibleColumns.filter(column => column.filterable === true)
      },

      displayedRows () {
        if (!this.showFilter) {
          return this.sortedRows
        }
        if (!this.columns.filter(column => column._props.filterable === true).length) {
          return this.sortedRows
        }
        return this.sortedRows.filter((row) => {
          return this.visibleColumns
            .filter(column => column._props.filterable === true)
            .map(column => _.get(row, column._props.show).toString().toLowerCase())
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
        if (this.visibleColumns.length === 0) {
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

    methods: {
      columnValue (row, column) {
        return _.get(row, column.show)
      },

      childRowColumn (row) {
        return _.get(row, this.childRowKey)
      },

      getColumn (columnName) {
        return this.visibleColumns.find(column => column.show === columnName)
      },

      updateSort (column) {
        if (this.sort.fieldName !== column.show) {
          this.sort.fieldName = column.show
          this.sort.order = 'asc'
        } else {
          this.sort.order = (this.sort.order === 'asc' ? 'desc' : 'asc')
        }
      },

      mountColumns () {
        const components = this.$slots.default.filter((component) => {
          return typeof component.componentInstance !== 'undefined' && component.componentInstance.$vnode.tag.includes('FlexTableColumn')
        })
        this.columns = components.map((component) => {
          return component.componentInstance
        })
      },

      mapToggles () {
        this.toggleGroups = [...new Set(this.toggleableColumns.map(col => col.toggleableGroup))]
      },

      async fetchDataFromServer () {
        const page = this.pagination && this.pagination.currentPage ? this.pagination.currentPage : 1
        const response = await this.data({
          filter: this.filter,
          sort: this.sort,
          page: page
        })
        this.pagination = response.pagination
        return response.data
      },

      async mountData () {
        this.rows = _.isArray(this.data) ? this.data : await this.fetchDataFromServer()
      },

      async navigateToPage (page) {
        this.pagination.currentPage = page
        await this.mountData()
      }
    },

    async mounted () {
      this.mountColumns()
      await this.mountData()
      await this.mapToggles()
    },

    created () {
      this.sort.fieldName = this.sortBy
      this.sort.order = this.sortOrder
    }
  }
</script>

<style lang="scss" scoped>
    /* Busy table styling */
    .flex-table[aria-busy="false"] {
        opacity: 1;
    }

    .flex-table[aria-busy="true"] {
        opacity: .6;
    }

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

    .slide-enter-active, .slideIn, .slide-leave-active, .slideOut {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slide-enter-active, .slideIn {
        animation-name: slideIn;
    }

    .slide-leave-active, .slideOut {
        animation-name: slideOut;
    }

    .slideUp-enter-active, .slideInUp, .slideUp-leave-active, .slideOutUp {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slideUp-enter-active, .slideInUp {
        animation-name: slideInUp;
    }

    .slideUp-leave-active, .slideOutUp {
        animation-name: slideOutUp;
    }

    .slideRight-enter-active, .slideInRight, .slideRight-leave-active, .slideOutRight {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slideRight-enter-active, .slideInRight {
        animation-name: slideInRight;
    }

    .slideRight-leave-active, .slideOutRight {
        animation-name: slideOutRight;
    }

    .slideLeft-enter-active, .slideInLeft, .slideLeft-leave-active, .slideOutLeft {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slideLeft-enter-active, .slideInLeft {
        animation-name: slideInLeft;
    }

    .slideLeft-leave-active, .slideOutLeft {
        animation-name: slideOutLeft;
    }

    .slideDown-enter-active, .slideInDown, .slideDown-leave-active, .slideOutDown {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    .slideDown-enter-active, .slideInDown {
        animation-name: slideInDown;
    }

    .slideDown-leave-active, .slideOutDown {
        animation-name: slideOutDown;
    }
</style>