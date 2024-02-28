<template>
  <div class="budget-list-wrap">
      <el-button type="success" @click="filterList('INCOME')">Show only income</el-button>
      <el-button type="danger" @click="filterList('OUTCOME')">Show only outcome</el-button>
      <el-button type="info" @click="filterList()">Show all</el-button>
    <ElCard :header="header">
        <template v-if="!isEmpty">
            <budget-list-item v-for="(item, index) in list" :key="index" :item="item" @itemDeleted="deleteItem"/>
        </template>
<ElAlert v-else type="info" :title="emptyTitle" :closable="false"/>
    </ElCard>
  </div>
</template>

<script>
import BudgetListItem from "@/components/BudgetListItem.vue";

export default {
  name: "BudgetList",
    components: {BudgetListItem},
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
      header: "Budget List",
      emptyTitle: 'Empty List',
  }),
    computed: {
      isEmpty() {
          return !this.list.length
      }
    },
    methods: {
      deleteItem(id) {
          this.$emit('deleteItem', id);
      },

      filterList(type) {
        this.$emit('filterList',type)
        },
    }
};
</script>

<style scoped>
.budget-list-wrap {
    max-width: 500px;
    margin: auto;
}
</style>
