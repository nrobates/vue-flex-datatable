import _ from 'lodash'
import Vue from 'vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTable from '../../src/components/FlexTable.vue'

Vue.config.productionTip = false

test('FlexTable.vue::has a created hook', (t) => {
  t.true(_.isFunction(FlexTable.created))
})

test('has data as function', (t) => {
  t.true(_.isFunction(FlexTable.data))
})

test('sets default data', (t) => {
  t.deepEqual(FlexTable.data(), {
    filter: '',
    localSettings: {},
    pagination: null,
    slotObserver: null,
    sort: { fieldName: '', order: 'asc' },
    toggles: []
  })
})

test('can mount', async (t) => {
  const Constructor = Vue.extend(FlexTable)
  const vm = new Constructor({
    propsData: {
      columns: [{ label: 'First Name', show: 'firstName', sortable: true, filterable: true }],
      rows: [{ firstName: 'John' }, { firstName: 'Paul' }]
    }
  }).$mount()

  await nextTick

  t.true(vm.$el.querySelector('.flex-table') !== null)
})

test('renders', async t => {
  const Constructor = Vue.extend(FlexTable)
  const vm = new Constructor({
    propsData: {
      columns: [{ label: 'First Name', show: 'firstName', sortable: true, filterable: true }],
      rows: [{ firstName: 'John' }, { firstName: 'Paul' }]
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
