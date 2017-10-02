<template>
    <div class="input-group">
        <input type="text" class="form-control" v-model="localValue" :placeholder="placeholder"
               :aria-label="placeholder">
        <span class="input-group-btn">
            <button class="btn btn-outline-secondary" type="button" @click="clear()">x</button>
        </span>
    </div>
</template>

<script>
  export default {
    name: 'FlexTableFilter',
    props: {
      value: {default: null},
      placeholder: {default: '', type: String},
      inputClass: {default: '', type: String}
    },
    data () {
      return {
        localValue: this.value
      }
    },
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
      clear () {
        this.localValue = ''
      }
    }
  }
</script>