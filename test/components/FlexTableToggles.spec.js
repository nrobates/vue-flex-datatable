import Vue from 'vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTableToggles from '../../src/components/FlexTableToggles.vue'

Vue.config.productionTip = false

test('renders', async t => {
  const Constructor = Vue.extend(FlexTableToggles)
  const vm = new Constructor({
    propsData: {
      toggles: {
        name: {
          label: 'Names',
          visible: true,
          columns: []
        }
      }
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
