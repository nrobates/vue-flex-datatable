import Vue from 'vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTableToggle from '../../src/components/FlexTableToggle.vue'

Vue.config.productionTip = false

test('renders', async t => {
  const Constructor = Vue.extend(FlexTableToggle)
  const vm = new Constructor({
    propsData: {
      label: 'Toggle Label',
      value: true
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
