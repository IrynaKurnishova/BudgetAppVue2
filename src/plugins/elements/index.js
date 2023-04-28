import Vue from 'vue'; //импортируем само Vue
import lang from 'element-ui/lib/locale/lang/en'; //импортируем англ язык из библиотеки
import locale from 'element-ui/lib/locale'; // импортируем locale - параметр, определяющий язык и
//региональные настройки для конкретного местоположение и пользователя
import 'element-ui/packages/theme-chalk/lib/index.css';// импорт стилей
import {
    Button,
    Card,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Alert
} from 'element-ui'; // импорт отдельных компонент

const elements = [
    Button,
    Card,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Alert
]; // объединяем все компоненты в один массив

locale.use(lang); // вызывая метод use у locale мы заставим этот
//фреймворк работать на англ а не на китайском

elements.forEach(El => Vue.use(El, { locale }));
//импортировали все элементы из element-ui и сделали все элементы
//глобальными для всего проекта


