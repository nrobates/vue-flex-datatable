<template>
    <nav v-if="showPagingElement">
        <ul class="flex-table-pagination pagination justify-content-end pb-0 mb-0">
            <li class="page-item" :class="{'disabled' : !hasPreviousPage}">
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="selectPage(current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li class="page-item" :class="{ active: isPageActive(page) }" v-for="page in pageItems">
                <a class="page-link" href="#" @click.prevent="selectPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled' : !hasNextPage}">
                <a class="page-link" href="#" aria-label="Next" @click.prevent="selectPage(current_page + 1)">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Next</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
  import range from 'lodash/range'

  export default {
    name: 'FlexTablePagination',

    props: {
      pagination: {type: Object, default: () => ({})}
    },

    computed: {
      current_page () {
        return this.pagination.current_page || 1
      },
      pageItems () {
        return typeof this.pagination.total_pages === 'undefined' ? [] : range(1, this.pagination.total_pages + 1)
      },
      showPagingElement () {
        if (typeof this.pagination.total_pages === 'undefined') {
          return false
        }
        if (this.pagination.count === 0) {
          return false
        }
        return this.pagination.total_pages > 1
      },

      hasPreviousPage () {
        return this.current_page > 1
      },

      hasNextPage () {
        return this.current_page < this.pagination.total_pages
      }
    },

    methods: {
      isPageActive (page) {
        return this.current_page === page
      },

      selectPage (page) {
        if (this.pagination.current_page === page) {
          return
        }

        this.$emit('changePage', page)
      }
    }
  }
</script>