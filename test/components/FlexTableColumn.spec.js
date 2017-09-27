import _ from 'lodash'
import Vue from 'vue'
import test from 'ava'
import FlexTableColumn from '../../src/components/FlexTableColumn.vue'

Vue.config.productionTip = false

test('has a mounted hook', (t) => {
  t.true(_.isFunction(FlexTableColumn.mounted))
})

test('has data as function', (t) => {
  t.true(_.isFunction(FlexTableColumn.data))
})
