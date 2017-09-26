import _ from 'lodash'
import Vue from 'vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTableColumn from '../../src/components/FlexTableColumn.vue'
import settings from '../../src/settings'

Vue.config.productionTip = false

const columnMockA = Object.assign({}, settings.columnSettings, {show: 'name', 'label': 'Name'})
const columnMockB = Object.assign({}, settings.columnSettings, {show: 'some.nested.row.value', 'label': 'Nested Value'})

test('has a created hook', (t) => {
  t.true(_.isFunction(FlexTableColumn.created))
})

test('has data as function', (t) => {
  t.true(_.isFunction(FlexTableColumn.data))
})

test('renders default view', async t => {
  const Constructor = Vue.extend(FlexTableColumn)
  const vm = new Constructor({
    propsData: {
      column: columnMockA,
      row: {name: 'John Doe'}
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})

test('can render using nested data values', async (t) => {
  const Constructor = Vue.extend(FlexTableColumn)
  const vm = new Constructor({
    propsData: {
      row: {some: {nested: {row: {value: 'Nested Value'}}}},
      column: columnMockB
    }
  }).$mount()

  await nextTick

  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
