<template>
  <div id="app">
<Form @submitForm="onFormSubmit"/>
<!--добавялем форму в разметку после импорта и регистрации-->
<!-- подписываемся на событие в Form.vue c помощью @submitForm и создаем обработчик события onFormSubmit-->
<TotalBalance :total="totalBalance" :style="{color:textColor}"/>
<BudgetList :list="filteredList" @deleteItem="onDeleteItem" @filterList="onChangeList"/><!--добавляем компоненту BudgetList в разметку-->
<!--с помощью :list передаем список доходов и расходов в компоненту BudgetList   -->
<!--"list" - это название под которым мы этот список объявили в props в компоненте BudgetList-->
<!--с помощью @deleteItem перехватываем событие клика для удаления Item и
добавляем обработчик onDeleteItem в methods-->
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList.vue"; // импортируем BudgetList
import TotalBalance from "@/components/TotalBalance.vue"; // импортируем TotalBalance
import Form from "@/components/Form.vue"; // импортируем форму


export default {
  name: "app",
  components: {
      BudgetList, // регистрируем компоненту BudgetList
      TotalBalance, //  регистрируем компоненту TotalBalance
      Form, // регистрируем форму
  },
  data: () => ({
    list: { // создаем список доходов и расходов
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
    computed: { // подсчитываем баланс
        totalBalance() {// перебираем полученные данные из list
            // изначальный акк=0, и записываем туда значения item.value
            return Object.values(this.list).reduce(
                (acc, item) => acc + item.value,
                0
            );
// полученный totalBalance передаем в компоненту TotalBalance в template
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
      onDeleteItem(id) { // принмаем id
          const onConfirm = confirm('Do you really want to delete?');
          if (!onConfirm) return;
        else{this.$delete(this.list, id)}
//метод $delete удаляет и вызывает изменение разметки
// вызываем метод внутри компоненты который принимает
// 1)this.list-объект из которго нужно удалить и
//2)id - свойство которое нужно удалить
//id - соответствует ключу в объекте list
      },
        onFormSubmit(data) {
// в обработчк принимаем переданный объект из формы при сабмите
//и добавляем в объект this.list
            let value
            if (data.type === 'OUTCOME') {
                value = data.value > 0 ? data.value * -1 : data.value
            } else {
                value = Math.abs(data.value)
            }

          const newObj = {
//генерируем id для нового обьекта
//деструктурируем получаемые данные
              ...data,
// и добавляем поле id куда записываем рандомное число в виде строки
              id: String(Math.random()),
              value
          };
//с помощью спец метода $set который есть в каждой компоненте
//устанавливаем новый обьект со знаечением id
//метод $set также добавляет реактивность на странице
          this.$set(this.list, newObj.id, newObj);
// 1)аргумент - куда хотим установить (this.list)
//2) аргумент - под какой ключ хотим установить(newObj.id)
//3) аргумент - что хотим установить(newObj)
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
