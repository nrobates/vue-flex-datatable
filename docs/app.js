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
    searchBy: '',
    activeSearch: '',
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
    ]
  },
  methods: {
    async fetchData ({search, page, filter, sort}) {
      let page1 = {
        'data': [{
          'id': 1,
          'name': 'Nicholas Bates',
          'first_name': 'Nicholas',
          'last_name': 'Bates',
          'email': 'nicholas@appbut.com',
          'created_at': {'date': '2017-03-16 03:03:03.000000', 'timezone_type': 3, 'timezone': 'UTC'},
          'updated_at': {'date': '2017-11-13 20:03:19.000000', 'timezone_type': 3, 'timezone': 'UTC'},
          'roles': {'data': [{'id': 1, 'name': 'Admin', 'slug': 'admin'}]}
        }],
        'meta': {
          'pagination': {
            'total': 1,
            'count': 1,
            'per_page': 20,
            'current_page': 1,
            'total_pages': 1,
            'links': []
          }
        }
      }

      let page2 = {
        meta: {
          pagination: {
            count: 3,
            current_page: 2,
            links: [],
            per_page: 3,
            total: 6,
            total_pages: 2
          }
        },
        data: [
          {
            firstName: 'Mitch',
            lastName: 'Campbell',
            email: 'mitchc@example.com',
            phone: '444-222-3333',
            nested: {song: 'Ice Ice Baby'},
            children: []
          },
          {
            firstName: 'Jackie',
            lastName: 'Dot',
            email: 'jackiedot@example.com',
            phone: '222-222-2222',
            nested: {song: 'Enter Sandman'},
            children: []
          },
          {
            firstName: 'Jervis',
            lastName: 'Jefferson',
            email: 'jj@example.com',
            phone: '444-444-4444',
            nested: {song: 'Fire and Ice'},
            children: []
          }
        ]
      }

      const $myHttp = {
        get (url, page) {
          let data
          if (page === 2) {
            data = page2
          } else {
            data = page1
          }

          return new Promise(resolve => setTimeout(() => resolve(data), 1500))
        }
      }
      let response = await $myHttp.get('http://api.randomuser.me/', page)
      return response
    }
  }
})
