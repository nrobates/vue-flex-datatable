import Vue from 'vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTableFilter from '../../src/components/FlexTableFilter.vue'

Vue.config.productionTip = false

test('renders', async t => {
  const Constructor = Vue.extend(FlexTableFilter)
  const vm = new Constructor({
    propsData: {
      value: 'John',
      placeholder: 'Search table...',
      inputClass: 'some-class'
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
