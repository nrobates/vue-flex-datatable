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
      columnStyles: {type: Object, default: () => {}}
    },
    data () {
      return {
        isVisible: this.visible
      }
    },
    methods: {
      checkVisibility (toggleGroup, visible) {
        if (this.toggleableGroup === toggleGroup) {
          this.isVisible = visible
        }
      }
    },
    mounted () {
      this.$root.$on('flex-table-toggle::change', this.checkVisibility)
    }
  }
</script>