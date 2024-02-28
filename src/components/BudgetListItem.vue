<template>
    <div class="list-item">
        <i :class="icon" />
        <span class="budget-comment">{{item.comment}}</span>
        <span class="budget-value" :style="{color:valueColor}">{{item.value}}</span>
        <ElButton type="danger" size="mini" @click="$emit('itemDeleted', item.id)">Delete</ElButton>
    </div>
</template>

<script>
export default {
  props: {
      item: {
          type: Object,
          default: () => ({})
      }
  },
    computed: {
        icon() {
            return this.item.type === 'INCOME' ? 'el-icon-top' : 'el-icon-bottom';
        },
        valueColor() {
            return this.item.type === 'INCOME' ? 'green' : 'red'

        }
    }
    }
</script>

<style scoped>
.list-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
}
.budget-value {
    font-weight: bold;
    margin-left: auto;
    margin-right: 20px;
}
</style>
