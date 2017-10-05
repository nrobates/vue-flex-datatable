<template>
    <tbody class="flex-table-row-group" :id="componentId" v-if="isVisible">
    <template v-if="hasMultipleRows">
        <flex-table-row v-for="(row, index) in data" :key="index" :data="row" :columns="columns"></flex-table-row>
    </template>
    <template v-else>
        <flex-table-row :data="data" :columns="columns"></flex-table-row>
    </template>
    </tbody>
</template>

<script>
  import _ from 'lodash'
  import FlexTableRow from './FlexTableRow.vue'

  export default {
    name: 'FlexTableGroup',
    components: {FlexTableRow},
    props: {
      data: {type: [Object, Array], required: true},
      columns: {type: Array, required: true},
      parent: {type: Object}
    },
    data: () => ({}),
    computed: {
      hasMultipleRows () {
        return _.isArray(this.data)
      },
      componentId () {
        return this.parent === undefined ? null : 'flex-table-row-group-' + this.parent.flexTableRowId + '-children'
      },
      isVisible () {
        if (this.parent === undefined) {
          return true
        }

        return this.parent.showChildren
      }
    },
    watch: {},
    methods: {},
    mounted () {}
  }
</script>