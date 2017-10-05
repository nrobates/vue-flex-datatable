<template>
    <!-- Never render the contents -->
    <!-- The scoped slot won't have the required data -->
    <div v-if="false">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: 'FlexTableColumn',
    props: {
      label: {type: String, default: ''},
      show: {type: String, default: ''},
      sortable: {type: Boolean, default: false},
      filterable: {type: Boolean, default: false},
      toggleable: {type: Boolean, default: false},
      toggleableGroup: {type: String, default: ''},
      formatter: {type: Function, default: null},
      childFormatter: {type: Function, default: null},
      visible: {type: Boolean, default: true},
      columnClass: {type: String, default: ''},
      columnStyles: {type: Object, default: () => {}},
      rowGroup: {type: Boolean, default: false},
      rowGroupOrder: {type: Number, default: 0},
      rowGroupLabel: {type: String, default: null}
    },
    data () {
      return {
        isVisible: this.visible
      }
    },
    methods: {
      checkVisibility (toggleGroup, visible, type) {
        if (this.toggleableGroup === toggleGroup && type === 'column') {
          this.isVisible = visible
        }
      }
    },
    mounted () {
      this.$root.$on('flex-table-toggle::change', this.checkVisibility)
    }
  }
</script>