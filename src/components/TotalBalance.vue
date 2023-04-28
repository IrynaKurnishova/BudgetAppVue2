<template>
<div class="total-value">Balance: {{total}} </div>
</template>

<script>
export default {
  name: 'TotalBalance', // устанавливаем имя компоненты
    props: { // принимает props свойства total
      total: { // total будем выводить внутри <div class="total-value"
          type: Number,
          default: 0,
      }
    },
    // computed:{
    // }
};
</script>

<style scoped>
.total-value {
    font-size: 26px;
    text-transform: uppercase;
    padding: 20px;
    text-align: center;
}
</style>
