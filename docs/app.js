import Vue from 'vue'
import { FlexTable, FlexTableColumn, FlexTableToggle } from '../src'

new Vue({
  el: '#app',

  components: {
    FlexTable,
    FlexTableColumn,
    FlexTableToggle
  },

  data: {
    showCol1: true,
    showCol2: true,
    showCol3: true,
    showCol4: true,
    cols: [
      {
        label: 'Column 1',
        show: 'name',
        sortable: true,
        filterable: true,
        visible: true,
        toggleable: true,
        toggleLabel: 'Name'
      },
      {
        label: 'Column 2',
        show: 'email',
        sortable: true,
        filterable: true,
        visible: true,
        toggleable: true,
        toggleLabel: 'Email'
      },
      {
        label: 'Column 3',
        show: 'phone',
        sortable: true,
        filterable: true,
        visible: true,
        toggleable: true,
        toggleLabel: 'Phone'
      },
      {
        label: 'Column 4',
        show: 'nested.song',
        sortable: true,
        filterable: true,
        visible: true,
        toggleable: true,
        toggleLabel: 'Nested'
      }
    ],
    rows: [
      {
        id: 1,
        parentId: 0,
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        phone: '222-222-2222',
        nested: {song: 'Done Dirt Cheap'},
        children: [
          {
            id: 2,
            parentId: 1,
            firstName: 'Max',
            lastName: 'Joshie',
            email: 'maxj@example.com',
            phone: '333-333-3333',
            nested: {song: 'Back in Black'}
          },
          {
            id: 3,
            parentId: 1,
            firstName: 'Josh',
            lastName: 'Max',
            email: 'jmax@example.com',
            phone: '333-333-3333',
            nested: {song: 'Born to be wild'}
          }
        ]
      },
      {
        id: 4,
        parentId: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        phone: '222-222-2222',
        nested: {song: 'Enter Sandman'}
      },
      {
        id: 5,
        parentId: 0,
        firstName: 'Jack',
        lastName: 'Davis',
        email: 'jackdavis@example.com',
        phone: '222-222-2222',
        nested: {song: 'Fire and Ice'}
      },
      {
        id: 6,
        parentId: 0,
        firstName: 'Joan',
        lastName: 'Davis',
        email: 'joandavis@example.com',
        phone: '222-222-2222',
        nested: {song: 'Crackerman'}
      }
    ]
  },
  methods: {
    async fetchData ({page, filter, sort}) {
      let page1 = {
        data: [
          {
            id: 1,
            parentId: 0,
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            phone: '222-222-2222',
            nested: {song: 'Done Dirt Cheap'},
            children: [
              {
                id: 2,
                parentId: 1,
                firstName: 'Max',
                lastName: 'Joshie',
                email: 'maxj@example.com',
                phone: '333-333-3333',
                nested: {song: 'Back in Black'}
              },
              {
                id: 3,
                parentId: 1,
                firstName: 'Josh',
                lastName: 'Max',
                email: 'jmax@example.com',
                phone: '333-333-3333',
                nested: {song: 'Born to be wild'}
              }
            ]
          },
          {
            id: 4,
            parentId: 0,
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@example.com',
            phone: '222-222-2222',
            nested: {song: 'Enter Sandman'}
          },
          {
            id: 5,
            parentId: 0,
            firstName: 'Jack',
            lastName: 'Davis',
            email: 'jackdavis@example.com',
            phone: '222-222-2222',
            nested: {song: 'Fire and Ice'}
          },
          {
            id: 6,
            parentId: 0,
            firstName: 'Joan',
            lastName: 'Davis',
            email: 'joandavis@example.com',
            phone: '222-222-2222',
            nested: {song: 'Crackerman'}
          }
        ],
        pagination: {
          currentPage: 1,
          totalPages: 2
        }
      }

      let page2 = {
        data: [
          {
            id: 7,
            parentId: 0,
            firstName: 'Mitch',
            lastName: 'Campbell',
            email: 'mitchc@example.com',
            phone: '444-222-3333',
            nested: {song: 'Ice Ice Baby'},
            children: []
          },
          {
            id: 8,
            parentId: 0,
            firstName: 'Jackie',
            lastName: 'Dot',
            email: 'jackiedot@example.com',
            phone: '222-222-2222',
            nested: {song: 'Enter Sandman'},
            children: []
          },
          {
            id: 9,
            parentId: 0,
            firstName: 'Jervis',
            lastName: 'Jefferson',
            email: 'jj@example.com',
            phone: '444-444-4444',
            nested: {song: 'Fire and Ice'},
            children: []
          }
        ],
        pagination: {
          currentPage: 2,
          totalPages: 2
        }
      }

      const $myHttp = {
        get (url, page) {
          let data
          if (page === 2) {
            data = page2
          } else {
            data = page1
          }
          return new Promise(resolve => setTimeout(() => resolve(data), 3000))
        }
      }
      let response = await $myHttp.get('http://api.randomuser.me/', page)
      return response
    }
  }
})
