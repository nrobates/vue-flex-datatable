import _ from 'lodash'
import Vue from 'vue/dist/vue'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTable from '../../src/components/FlexTable'
import FlexDataTable from '../../src/index'

Vue.config.productionTip = false
Vue.use(FlexDataTable)

test('has a created hook', (t) => {
  t.true(_.isFunction(FlexTable.created))
})

test('has data as function', (t) => {
  t.true(_.isFunction(FlexTable.data))
})

test('can be mounted', async (t) => {
  document.body.innerHTML = `
            <div id="app">
                <flex-table
                    :rows="[{ firstName: 'John' },{ firstName: 'Doe' }]">
                    <flex-table-column show="firstName" label="First name"></flex-table-column>
                </flex-table>
            </div>
        `
  const vm = new Vue({
    el: '#app'
  })

  await nextTick

  t.snapshot(vm.$el.innerHTML)
})

test('can format values using a formatting function passed by prop', async (t) => {
  document.body.innerHTML = `
            <div id="app">
                <flex-table
                    :rows="[{ firstName: 'John' },{ firstName: 'Doe' }]">
                    <flex-table-column show="firstName" label="First name" :formatter="formatter"></flex-table-column>
                </flex-table>
            </div>
        `

  const vm = new Vue({
    el: '#app',
    methods: {
      formatter (value, properties) {
        return `Formatted: <strong>${value}</strong>`
      }
    }
  })

  await nextTick

  t.snapshot(vm.$el.innerHTML)
})

test('allows a scoped slot to custom template the table column', async (t) => {
  document.body.innerHTML = `
            <div id="app">
                <flex-table
                    :data="[{ firstName: 'John' },{ firstName: 'Doe' }]">
                    <flex-table-column label="First name">
                        <template scope="row">
                           {{ row.firstName }} slot
                        </template>
                    </flex-table-column>
                </flex-table>
            </div>
        `

  const vm = new Vue({
    el: '#app'
  })

  await nextTick

  t.snapshot(vm.$el.innerHTML)
})

test('can display a filter for the table', async (t) => {
  document.body.innerHTML = `
            <div id="app">
                <flex-table show-filter
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Doe' }]">
                    <flex-table-column show="firstName" label="First name"></flex-table-column>
                </flex-table>
            </div>
        `

  const vm = new Vue({
    el: '#app'
  })

  await nextTick

  t.snapshot(vm.$el.innerHTML)
})

test('can pass row data as a function', async (t) => {
  document.body.innerHTML = `
            <div id="app">
                <flex-table show-filter
                    :data="sampleFetchData">
                    <flex-table-column show="firstName" label="First name"></flex-table-column>
                </flex-table>
            </div>
        `

  const vm = new Vue({
    el: '#app',
    data: {
      sampleFetchData: () => {
        return {
          data: [
            {
              firstName: 'John',
              lastName: 'Doe',
              email: 'johndoe@example.com',
              phone: '222-222-2222',
              nested: {song: 'Done Dirt Cheap'},
              children: [
                {
                  firstName: 'Max',
                  lastName: 'Joshie',
                  email: 'maxj@example.com',
                  phone: '333-333-3333',
                  nested: {song: 'Back in Black'}
                },
                {
                  firstName: 'Josh',
                  lastName: 'Max',
                  email: 'jmax@example.com',
                  phone: '333-333-3333',
                  nested: {song: 'Born to be wild'}
                }
              ]
            },
            {
              firstName: 'Jane',
              lastName: 'Doe',
              email: 'janedoe@example.com',
              phone: '222-222-2222',
              nested: {song: 'Enter Sandman'}
            },
            {
              firstName: 'Jack',
              lastName: 'Davis',
              email: 'jackdavis@example.com',
              phone: '222-222-2222',
              nested: {song: 'Fire and Ice'}
            },
            {
              firstName: 'Joan',
              lastName: 'Davis',
              email: 'joandavis@example.com',
              phone: '222-222-2222',
              nested: {song: 'Crackerman'}
            }
          ],
          pagination: {
            currentPage: 1,
            totalPages: 3
          }
        }
      }
    }
  })

  await nextTick

  t.snapshot(vm.$el.innerHTML)
})
