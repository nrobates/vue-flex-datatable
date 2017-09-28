import Vue from 'vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTablePagination from '../../src/components/FlexTablePagination.vue'

Vue.config.productionTip = false

test('can be created and mounted without paging data', async t => {
  const Constructor = Vue.extend(FlexTablePagination)
  const vm = new Constructor().$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})

test('not to be displayed if total pages equals 1', async t => {
  const Constructor = Vue.extend(FlexTablePagination)
  const vm = new Constructor({
    propsData: {
      pagination: {currentPage: 1, totalPages: 1}
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})

test('displays on page if total pages is greater than 1', async t => {
  const Constructor = Vue.extend(FlexTablePagination)
  const vm = new Constructor({
    propsData: {
      pagination: {currentPage: 1, totalPages: 3}
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})

test('previous button is disabled if on page 1', async t => {
  const Constructor = Vue.extend(FlexTablePagination)
  const vm = new Constructor({
    propsData: {
      pagination: {currentPage: 1, totalPages: 3}
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})

test('previous button is enabled if on page 2', async t => {
  const Constructor = Vue.extend(FlexTablePagination)
  const vm = new Constructor({
    propsData: {
      pagination: {currentPage: 2, totalPages: 3}
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})

test('next button is enabled if on less than total pages', async t => {
  const Constructor = Vue.extend(FlexTablePagination)
  const vm = new Constructor({
    propsData: {
      pagination: {currentPage: 2, totalPages: 3}
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})

test('next button is disabled if on final page', async t => {
  const Constructor = Vue.extend(FlexTablePagination)
  const vm = new Constructor({
    propsData: {
      pagination: {currentPage: 3, totalPages: 3}
    }
  }).$mount()

  await nextTick
  const tree = {
    $el: vm.$el.outerHTML
  }
  t.snapshot(tree)
})
