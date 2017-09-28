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
    },
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
  }
})
