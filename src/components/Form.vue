<template>
  <ElCard class="form-card">
      <ElForm :model="formData" ref="addItemForm" :rules="rules" label-position="top">
<!--для доступа к компоненте ElForm с помощью свойства ref задаем имя addItemForm
с помощью которого будем иметь доступ к ElForm в onSubmit-->
          <ElFormItem label="Type" prop="type">
<!--prop="type" - привзяываем prop в котором будет значение инпута-->
            <ElSelect class="type-select" v-model="formData.type" placeholder="Choose type...">
<!--привязываем через v-model="formData.type"-->
                <ElOption label="Income" value="INCOME"/>
<!--value - значение с которым будем работать-->
                <ElOption label="Outcome" value="OUTCOME"/>
            </ElSelect>
        </ElFormItem>
          <ElFormItem label="Comments" prop="comment">
              <ElInput v-model="formData.comment"/>
          </ElFormItem>
          <ElFormItem label="Value" prop="value" >
              <ElInput v-model.number="formData.value"/>
<!--чтобы привязать значение к числу на v-model добавляем атрибут number-->
          </ElFormItem>
          <ElButton @click="onSubmit" type="primary">Submit</ElButton>
<!--вешаем событие @click на который вешаем обработчик onSubmit-->
      </ElForm>
  </ElCard>
</template>

<script>
const checkValue = (rule, value, callback) => {
    if (value === 0) {
        callback(new Error('Please input value'))
    } else {callback()}
}

export default {
    name: 'Form', //задаем имя компоненты
    data: () => ({
    formData: { //создаем модель и передаем в ElForm в качестве model
        type: 'INCOME',
        comment: '',
        value: 0,
    },
        rules: {
// создаем правила для инпутов и передаем в форму в спец свойство :rules
            type: [{required: true, message: 'Please select type', trigger: 'blur'}],
// прописываем условия для каждого инпута
// свойство required - обязательный к заполнению
            comment: [{required: true, message: 'Please input comment', trigger: 'change'}],
            value: [
                {required: true, message: 'Please input value', trigger: 'change'},
                {type: 'number', message: 'Value must be a number', trigger: 'change'},
                { validator: checkValue, trigger: 'blur' }
            ],
        }
    }),
    methods: {
        onSubmit() { // при клике на кнопку Submit выполняется этот метод
            this.$refs.addItemForm.validate(valid => {
// с помощью свойства $refs.addItemForm получаем доступ к компоненте ElForm
//получаем объект формы и вызываем метод validate который возвращает булевое
//учитывая все правила которые описаны выше
                if(valid) {
                    this.$emit('submitForm', {...this.formData});
//если форма валидна то создаем и передаем событие отправляя копию
//обьекта формы и подписываемся на это событие в App.vue
                    this.$refs.addItemForm.resetFields();
//после этого сбрасываем поля с помощью метода resetFields
                }
            });
        }
    }
};

</script>


<style scoped>
.form-card {
    max-width: 500px;
    margin: auto;
}

.type-select {
    width: 100%;
}
</style>
