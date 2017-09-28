import _ from 'lodash'
import Vue from 'vue/dist/vue.common'
import test from 'ava'
import nextTick from 'p-immediate'
import FlexTable from '../../src/components/FlexTable.vue'
import FlexDataTable from '../../src/index'

Vue.use(FlexDataTable)
Vue.config.productionTip = false

test('has a created hook', (t) => {
  t.true(_.isFunction(FlexTable.created))
})

test('has data as function', (t) => {
  t.true(_.isFunction(FlexTable.data))
})

test('sets default data', (t) => {
  t.deepEqual(FlexTable.data(), {
    rows: [],
    columns: [],
    filter: '',
    pagination: null,
    sort: {fieldName: '', order: 'asc'},
    toggleGroups: []
  })
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

//
// it('can display a custom message when filtering results in no results', async () => {
//   document.body.innerHTML = `
//             <div id="app">
//                 <flex-table
//                     :extra-settings="{ labels: { filterResultEmpty: 'game over man, game over' } }"
//                     :data="[{ firstName: 'John' },{ id: 2, firstName: 'Doe' }]">
//                     <flex-table-column show="firstName" label="First name"></flex-table-column>
//                 </flex-table>
//             </div>
//         `
//
//   const table = await createVm()
//
//   table.filter = 'this returns nothing'
//
//   await Vue.nextTick(() => {
//   })
//
//   expect(document.body.innerHTML).toMatchSnapshot()
// })
//
// it('can display a custom placeholder in the filter field', async () => {
//   document.body.innerHTML = `
//             <div id="app">
//                 <flex-table
//                     :extra-settings="{ labels: { filterPlaceholder: 'custom placeholder' } }"
//                     :data="[{ firstName: 'John' },{ id: 2, firstName: 'Doe' }]">
//                     <flex-table-column show="firstName" label="First name"></flex-table-column>
//                 </flex-table>
//             </div>
//         `
//
//   const table = await createVm()
//
//   table.filter = 'this returns nothing'
//
//   await Vue.nextTick(() => {
//   })
//
//   expect(document.body.innerHTML).toMatchSnapshot()
// })
//
// it('can accept a function to fetch the data', async () => {
//   const serverResponse = () => {
//     return {
//       data: [{firstName: 'John'}, {id: 2, firstName: 'Doe'}]
//     }
//   }
//
//   document.body.innerHTML = `
//             <div id="app">
//                 <flex-table
//                     :data="${serverResponse}">
//                     <flex-table-column show="firstName" label="First name"></flex-table-column>
//                 </flex-table>
//             </div>
//         `
//
//   await createVm()
//
//   await Vue.nextTick(() => {
//   })
//
//   expect(document.body.innerHTML).toMatchSnapshot()
// })
//
// it('can render pagination when the server responds with pagination data', async () => {
//   const serverResponse = () => {
//     return {
//       data: [{firstName: 'John'}, {id: 2, firstName: 'Doe'}],
//
//       pagination: {
//         totalPages: 4,
//         currentPage: 2
//       }
//     }
//   }
//
//   document.body.innerHTML = `
//             <div id="app">
//                 <flex-table
//                     :data="${serverResponse}">
//                     <flex-table-column show="firstName" label="First name"></flex-table-column>
//                 </flex-table>
//             </div>
//         `
//
//   await createVm()
//
//   await Vue.nextTick(() => {
//   })
//
//   expect(document.body.innerHTML).toMatchSnapshot()
// })
//
// it('clicking a link in the pagination will rerender the table', async () => {
//   const serverResponse = ({page}) => {
//     return {
//       data: [{firstName: `John ${page}`}, {id: 2, firstName: `Doe ${page}`}],
//
//       pagination: {
//         totalPages: 4,
//         currentPage: page
//       }
//
//     }
//   }
//
//   document.body.innerHTML = `
//             <div id="app">
//                 <flex-table
//                     :data="${serverResponse}">
//                     <flex-table-column show="firstName" label="First name"></flex-table-column>
//                 </flex-table>
//             </div>
//         `
//
//   await createVm()
//
//   await Vue.nextTick(() => {
//   })
//
//   expect(document.body.innerHTML).toMatchSnapshot()
//
//   const thirdPageLink = document.getElementsByClassName('page-link')[2]
//
//   await simulant.fire(thirdPageLink, 'click')
//
//   await Vue.nextTick()
//   await Vue.nextTick()
//
//   expect(document.body.innerHTML).toMatchSnapshot()
// })
//
// it('can add extra classes to the table, the cells and the headers', async () => {
//   document.body.innerHTML = `
//             <div id="app">
//                 <flex-table
//                     :data="[{ firstName: 'John' },{ firstName: 'Doe' }]"
//                     table-class="my-table"
//                     thead-class="my-thead"
//                     tbody-class="my-tbody"
//                 >
//                     <flex-table-column
//                         show="firstName"
//                         label="First name"
//                         header-class="my-header"
//                         cell-class="my-cell"
//                     ></flex-table-column>
//                 </flex-table>
//             </div>
//         `
//
//   await createVm()
//
//   expect(document.body.innerHTML).toMatchSnapshot()
// })
//
// it('can update columns', async () => {
//   document.body.innerHTML = `
//             <div id="app">
//                 <flex-table :data="[{ firstName: 'John' },{ firstName: 'Doe' }]">
//                     <flex-table-column show="firstName" :label="label"></table-column>
//                 </flex-table>
//             </div>
//         `
//
//   const vm = new Vue({
//     el: '#app',
//     data: {
//       label: 'First name'
//     }
//   })
//
//   await Vue.nextTick()
//
//   expect(document.body.innerHTML).toMatchSnapshot()
//
//   vm.label = 'Something else'
//
//   await Vue.nextTick()
//
//   expect(document.body.innerHTML).toMatchSnapshot()
// })
