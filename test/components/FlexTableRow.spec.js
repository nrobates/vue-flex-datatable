import Vue from 'vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTableRow from '../../src/components/FlexTableRow.vue'
import settings from '../../src/settings'

Vue.config.productionTip = false

const columnMock = Object.assign({}, settings.columnSettings, {show: 'name', 'label': 'First Name'})

test('renders', async t => {
  const Constructor = Vue.extend(FlexTableRow)
  const vm = new Constructor({
    propsData: {
      columns: [columnMock],
      data: {firstName: 'John'}
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
