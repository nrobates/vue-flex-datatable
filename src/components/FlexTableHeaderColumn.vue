<template>
    <th @click="clicked"
        role="columnheader"
        scope="col"
        :aria-sort="ariaSort"
        :aria-disabled="ariaDisabled"
        :class="headerClasses"
        :style="columnStyles"
    >
        <span v-if="isStandardType">{{label}}</span>
        <label class="form-check-label" v-else-if="isSelectAllType">
            <input class="form-check-input" type="checkbox" value="">
        </label>
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
          return classList('flex-table-column-header', this.column.columnClass)
        }
        if (this.column.show !== this.sort.fieldName) {
          return classList('flex-table-column-header flex-table-column-sort', this.column.columnClass)
        }
        return classList(`flex-table-column-header flex-table-column-sort flex-table-column-sort-${this.sort.order}`, this.column.columnClass)
      },
      columnStyles () {
        let styles = ''
        if (this.column.columnStyles) {
          for (var key in this.column.columnStyles) {
            styles += `${key}: ${this.column.columnStyles[key]};`
          }
        }
        return styles
      },
      isStandardType () {
        return this.column.type === 'standard'
      },
      isSelectAllType () {
        return this.column.type === 'selectAll'
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
        position: relative;

        &.flex-table-column-sort {
            padding-right: 1.5em;
            cursor: pointer;

            &:before,
            &:after {
                position: absolute;
                bottom: 1px;
                display: block;
                opacity: 0.4;
                padding-bottom: inherit;
                font-size: 80%;
            }

            &:before {
                right: 0.90em;
                content: "\2191";
            }

            &:after {
                right: 0.25em;
                content: "\2193";
            }
        }

        &.flex-table-column-sort-asc:after,
        &.flex-table-column-sort-desc:before {
            opacity: 1;
        }
    }
</style>
