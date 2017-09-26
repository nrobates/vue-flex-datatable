<template>
    <button class="btn" :class="localValue ? 'btn-primary' : 'btn-outline-primary'" @click="localValue = !localValue">{{label}}</button>
</template>

<script>
  export default {
    name: 'FlexTableToggle',
    components: {},
    props: {
      value: {
        default: null
      },
      label: {required: true, type: String}
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
        }
      }
    },
    methods: {
      onChange (value, e) {
        this.localValue = !value
        this.$emit('change', this.localValue)
      }
    },
    mounted () {}
  }
</script>