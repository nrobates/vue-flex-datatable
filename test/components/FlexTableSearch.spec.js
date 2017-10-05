import Vue from 'vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTableSearch from '../../src/components/FlexTableSearch.vue'

Vue.config.productionTip = false

test('renders', async t => {
  const Constructor = Vue.extend(FlexTableSearch)
  const vm = new Constructor({
    propsData: {
      value: 'Search Value',
      inputPlaceholder: 'Search table...',
      inputClass: 'some-input-class',
      buttonClass: 'some-button-class',
      useInputGroup: false,
      disableSearch: false,
      buttonLabel: 'Click me'
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
