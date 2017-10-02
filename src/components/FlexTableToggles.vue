<template>
    <div>
        <span><strong>{{label}}</strong></span>
        <flex-table-toggle v-for="toggle in toggles" :key="toggle.label" :label="toggle.label" :value="toggle.visible"></flex-table-toggle>
    </div>
</template>

<script>
  import FlexTableToggle from './FlexTableToggle.vue'

  export default {
    name: 'FlexTableToggles',
    components: {FlexTableToggle},
    props: ['toggles', 'label']
  }
</script>