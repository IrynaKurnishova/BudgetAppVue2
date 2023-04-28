<template>
    <div class="list-item">
        <!--создаем див для того чтобы выводить каждый элемент списка-->
        <!--с помощью v-for перебираем переданный объект item-значение, prop-свойство-->
        <!--устанавливаем атрибут key им будет prop чтобы правильно идентифициоровался элемент-->
        <i :class="icon" />
        <span class="budget-comment">{{item.comment}}</span>
        <span class="budget-value" :style="{color:valueColor}">{{item.value}}</span>
        <ElButton type="danger" size="mini" @click="$emit('itemDeleted', item.id)">Delete</ElButton>
        <!--повесили на кнопку событие @click и вызываем метод deleteItem передавая туда id -->
<!--        <el-dialog-->
<!--            title="Warning"-->
<!--            :visible.sync="centerDialogVisible"-->
<!--            width="30%"-->
<!--            center>-->
<!--            <span>It should be noted that the content will not be aligned in center by default</span>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--    <el-button @click="centerDialogVisible = false">Cancel</el-button>-->
<!--    <el-button type="primary" @click="centerDialogVisible = false">Confirm</el-button>-->
<!--  </span>-->
<!--        </el-dialog>-->
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
    data:()=>({
       // centerDialogVisible: false
    }),
    computed: {
        icon() {
            return this.item.type === 'INCOME' ? 'el-icon-top' : 'el-icon-bottom';
        },
        valueColor() {
            return this.item.type === 'INCOME' ? 'green' : 'red'

        }
    }
        // methods: {
        //     deleteItem(id) {
        //         this.$emit('itemDeleted', id)
        //     }
        // }
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
