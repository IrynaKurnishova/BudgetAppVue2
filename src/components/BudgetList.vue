<template>
  <div class="budget-list-wrap">
      <el-button type="success" @click="filterList('INCOME')">Show only income</el-button>
      <el-button type="danger" @click="filterList('OUTCOME')">Show only outcome</el-button>
      <el-button type="info" @click="filterList()">Show all</el-button>
    <ElCard :header="header"> <!--создаем карточку которая принмает спец атрибут header - это title карточки-->
        <template v-if="!isEmpty"><!--создаем шаблон одного элемента из списка-->
<!--вешаем условие v-if если список не пустой то продолжаем-->
            <budget-list-item v-for="(item, index) in list" :key="index" :item="item" @itemDeleted="deleteItem"/>
        </template>
<ElAlert v-else type="info" :title="emptyTitle" :closable="false"/>
<!--если список пустой выводим алерт emptyTitle-->
<!--добавляем атрибут :closable="false" чтобы его нельзя было закрыть-->
    </ElCard>
  </div>
</template>

<script>
import BudgetListItem from "@/components/BudgetListItem.vue";

export default {
  name: "BudgetList",
    components: {BudgetListItem},
 // имя компоненты
  props: { //компонента принимает массив который нужно вывести
      //для этого используем props куда записываем свойства
      // list который принимаем
    list: {
      type: Array, //это будет обьект
      default: () => []//по дефолту он будет равняться пустому обьекту
        //если принимаем массив или объект то нужно в default создать
        //функцию которая возвращает что-то
    }
  },
  data: () => ({
      header: "Budget List",
      emptyTitle: 'Empty List',
  }),
    computed: {
      isEmpty() { //получаем из списка массив ключей и меряем его длину
          return !this.list.length
      }
    },
    methods: { //создаем метод который принмает id Item который
      // мы хотим удалить и  с помощью this.$emit передаем событие
        // в App.vue передавая туда id, и вешаем на кнопку событие @click
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
