<template>
    <nav v-if="showPagingElement">
        <ul class="flex-table-pagination pagination justify-content-end">
            <li class="page-item" :class="{'disabled' : !hasPreviousPage}">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">Previous</span>
                </a>
            </li>
            <li class="page-item" :class="{ active: isPageActive(page) }" v-for="page in pageItems">
                <a class="page-link" @click="selectPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled' : !hasNextPage}">
                <a class="page-link" href="#" aria-label="Next">
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
      currentPage () {
        return this.pagination.currentPage || 1
      },
      pageItems () {
        return typeof this.pagination.totalPages === 'undefined' ? [] : range(1, this.pagination.totalPages + 1)
      },
      showPagingElement () {
        if (typeof this.pagination.totalPages === 'undefined') {
          return false
        }
        if (this.pagination.count === 0) {
          return false
        }
        return this.pagination.totalPages > 1
      },

      hasPreviousPage () {
        return this.currentPage > 1
      },

      hasNextPage () {
        return this.currentPage < this.pagination.totalPages
      }
    },

    methods: {
      isPageActive (page) {
        return this.currentPage === page
      },

      selectPage (page) {
        if (this.pagination.currentPage === page) {
          return
        }

        this.$emit('changePage', page)
      }
    }
  }
</script>