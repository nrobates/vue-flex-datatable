<template>
    <th @click="clicked"
        role="columnheader"
        scope="col"
        :aria-sort="ariaSort"
        :aria-disabled="ariaDisabled"
        :class="headerClasses"
    >
        {{label}}
    </th>
</template>

<script>
  import { classList } from '../helpers'

  export default {
    name: 'FlexTableHeaderColumn',
    props: {
      column: {
        type: Object,
        required: true
      },
      sort: {
        type: Object,
        required: true
      }
    },
    computed: {
      ariaDisabled () {
        if (!this.column.sortable) {
          return 'true'
        }
        return false
      },
      ariaSort () {
        if (!this.column.sortable) {
          return false
        }
        if (this.column.show !== this.sort.fieldName) {
          return 'none'
        }
        return this.sort.order === 'asc' ? 'ascending' : 'descending'
      },
      label () {
        return this.column.label
      },
      headerClasses () {
        if (typeof this.column.sortable === 'undefined' || this.column.sortable === false) {
          return classList('flex-table-column-header')
        }
        if (this.column.show !== this.sort.fieldName) {
          return classList('flex-table-column-header flex-table-column-sort')
        }
        return classList(`flex-table-column-header flex-table-column-sort flex-table-column-sort-${this.sort.order}`)
      }
    },
    methods: {
      clicked () {
        if (this.column.sortable) {
          this.$emit('click', this.column)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .flex-table-column-header {
        &.flex-table-column-sort {
            text-decoration: underline;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            &.flex-table-column-sort-asc:after,
            &.flex-table-column-sort-desc:after {
                position: absolute;
                right: .25em;
                display: inline-block;
                color: #bbb;
            }

            &.flex-table-column-sort-asc:after {
                content: '↑';
            }

            &.flex-table-column-sort-desc:after {
                content: '↓';
            }
        }
    }
</style>