<template>
    <div class="flex-data-table-search">
        <template v-if="useInputGroup">
            <div class="input-group">
                <input type="text" :class="formInputClass" :placeholder="inputPlaceholder" :aria-placeholder="inputPlaceholder" v-model="localValue"
                       :disabled="disableSearch" :readonly="disableSearch">
                <span class="input-group-btn">
                    <button :class="submitButtonClass" type="button" @click.prevent="submit" :disabled="disableSearch">{{buttonLabel}}</button>,
                </span>
            </div>
        </template>

        <template v-else>
            <input type="text" :class="formInputClass" :placeholder="inputPlaceholder" :aria-placeholder="inputPlaceholder" v-model="localValue"
                   :disabled="disableSearch">
            <button :class="submitButtonClass" type="button" @click.prevent="submit" :disabled="disableSearch">{{buttonLabel}}</button>,
        </template>
    </div>
</template>

<script>
  import settings from '../settings'
  import { classList } from '../helpers'

  export default {
    name: 'FlexTableSearch',
    props: {
      value: {default: null},
      inputClass: {default: settings.searchInputClass, type: String},
      inputPlaceholder: {default: settings.searchPlaceholder, type: String},
      useInputGroup: {default: true, type: Boolean},
      disableSearch: {default: false, type: Boolean},
      buttonLabel: {default: 'Search', type: String},
      buttonClass: {default: 'btn btn-secondary', type: String}
    },
    data () {
      return {
        localValue: this.value
      }
    },
    computed: {
      formInputClass () {
        return classList('flex-table-search-input', this.inputClass, this.disableSearch ? 'disabled' : '')
      },
      submitButtonClass () {
        return classList('flex-table-search-button', this.buttonClass, this.disableSearch ? 'disabled' : '')
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
      submit () {
        this.$emit('submit', this.localValue)
      }
    }
  }
</script>