import Vue from 'vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTableHeaderColumn from '../../src/components/FlexTableHeaderColumn.vue'
import settings from '../../src/settings'

Vue.config.productionTip = false

const columnMock = Object.assign({}, settings.columnSettings, {
  label: 'First Name',
  show: 'firstName',
  sortable: true,
  filterable: true
})

test('renders', async t => {
  const Constructor = Vue.extend(FlexTableHeaderColumn)
  const vm = new Constructor({
    propsData: {
      column: columnMock,
      sort: {}
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
