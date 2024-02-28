<template>
  <div id="app">
<Form @submitForm="onFormSubmit"/>
<TotalBalance :total="totalBalance" :style="{color:textColor}"/>
<BudgetList :list="filteredList" @deleteItem="onDeleteItem" @filterList="onChangeList"/>
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList.vue";
import TotalBalance from "@/components/TotalBalance.vue";
import Form from "@/components/Form.vue";


export default {
  name: "app",
  components: {
      BudgetList,
      TotalBalance,
      Form,
  },
  data: () => ({
    list: {
      1: {
        type: "INCOME",
        value: 100,
        comment: "Some comment",
        id: 1
      },
      2: {
        type: "OUTCOME",
        value: -50,
        comment: "Some outcome comment",
        id: 2
      }
    },
      filter: null
  }),
    computed: {
        totalBalance() {
            return Object.values(this.list).reduce(
                (acc, item) => acc + item.value,
                0
            );
        },
        textColor() {
            return this.totalBalance > 0 ? 'green' : this.totalBalance < 0 ? 'red' : 'black';
        },
        filteredList(){
            let listArray = Object.values(this.list)
            return !this.filter ? listArray : listArray.filter(item=>item.type === this.filter)
        }
    },
    methods: {
        onChangeList(type) {
        this.filter = type
        },
      onDeleteItem(id) {
          const onConfirm = confirm('Do you really want to delete?');
          if (!onConfirm) return;
        else{this.$delete(this.list, id)}
      },
        onFormSubmit(data) {
            let value
            if (data.type === 'OUTCOME') {
                value = data.value > 0 ? data.value * -1 : data.value
            } else {
                value = Math.abs(data.value)
            }

          const newObj = {
              ...data,
              id: String(Math.random()),
              value
          };
          this.$set(this.list, newObj.id, newObj);
        }
    },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
