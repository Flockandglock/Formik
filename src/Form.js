import { useFormik } from "formik";
import * as Yup from 'yup';


// const validate = values => {
//     const errors = {};

//     if (!values.name) {
//         errors.name = 'Обязательное поле'
//     } else if(values.name.length < 2) {
//         errors.name = 'Символов должно быть больше 2ух'
//     }

//     if (!values.email) {
//         errors.email = 'Обязательное поле'
//     } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//         errors.email = 'Неправильный email'
//     }

//     return errors;
// };

const Form = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            amount: 0, 
            currency: '',
            text: '',
            terms: false
        },
        validationSchema: Yup.object({
            name: Yup.string()
                    .min(2, 'Минимум 2 символа')
                    .required('Обязательное поле для заполнения'),
            email: Yup.string()
                    .email('Неверный email')
                    .required('Обязательное поле для заполнения'),
            amount: Yup.number()
                    .min(5, 'Не менее 5')
                    .required('Обязательное поле для заполнения'),
            currency: Yup.string().required('Выбирите валюту'),
            text: Yup.string()
                    .min(10, 'Не менее 10 символов'),
            terms: Yup.boolean()
                    .required('Необходимо согласие')
                    .oneOf([true], 'Необходимо согласие')
        }),
        // после отправки, мы преобразуме объект в строку, иначе нам выйдет object: object
        onSubmit: values => console.log(JSON.stringify(values, null, 2))
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                placeholder="Введите ваше имя"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <div className='error'>{formik.errors.name }</div> : null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div className='error'>{formik.errors.email }</div> : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount ? <div className='error'>{formik.errors.amount }</div> : null}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} >
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="RUB">RUB</option>
            </select>
            {formik.errors.currency && formik.touched.currency ? <div className='error'>{formik.errors.currency }</div> : null}
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
            />
            {formik.errors.text && formik.touched.text ? <div className='error'>{formik.errors.text }</div> : null}
            <label className="checkbox">
                <input name="terms" 
                        type="checkbox" 
                        value={formik.values.terms}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur} />
                Соглашаетесь с политикой конфиденциальности?
            </label>
            {formik.errors.terms && formik.touched.terms ? <div className='error'>{formik.errors.terms }</div> : null}
            <button type="submit">Отправить</button>
        </form>
    )
}

export default Form;

// 1 - Создаем переменную formik
// 2 - деалем контралируемый input, задаем им value
// 3 - Добавляем также к каждому input слушатель события onChange={formik.handleChange}. Таким образом мы делаем контралируемуб форму и при каждом вводе в поле, у нас будет перерендер компанента, изменение его стайта
// 4 - На саму форму вешаем onSubmit={formik.handleSubmit}
// 5 - создаем фун-ию validate и там прописываем нашу валидацию, возвращем из нее объект и кидаем его в  formik.initialValue. Эта фун-ия будет запускаться каждый раз, когда будет срабатывать событие onChange={formik.handleChange}
// 6 - Используем Yup и меняем validate в formik на validationSchema и заполняем поля error согласно документации

