<template>
    <button class="btn mr-1" :class="localValue ? 'btn-primary' : 'btn-outline-primary'"
            @click="toggleValue">{{label}}
    </button>
</template>

<script>
  export default {
    name: 'FlexTableToggle',
    props: {
      value: {default: null},
      label: {required: true, type: String},
      type: {required: false, type: String, default: ''}
    },
    data () {
      return {
        localValue: this.value
      }
    },
    computed: {},
    watch: {
      value (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.localValue = newVal
        }
      },
      localValue (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$emit('input', newVal)
          this.$root.$emit('flex-table-toggle::change', this.label, this.localValue, this.type)
        }
      }
    },
    methods: {
      toggleValue () {
        this.localValue = !this.localValue
      }
    }
  }
</script>