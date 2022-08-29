import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';


const MyTextInput = ({label, ...props}) => {

    const [filed, meta] = useField(props);

    return(
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...filed} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </>
    )
};

const CustomForm = () => {


    return (
       <Formik 
            initialValues = {{
                    name: '',
                    email: '',
                    amount: 0, 
                    currency: '',
                    text: '',
                    terms: false
            }}
            validationSchema = {Yup.object({
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
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
            >
                <Form className="form" >
                <h2>Отправить пожертвование</h2>

                <MyTextInput label='Ваше имя'
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Введите ваше имя"
                />
                
                <MyTextInput label='Ваша почта' 
                             id="email"
                             name="email"
                             type="email"
                />
                
                <MyTextInput label='Количество'
                            id="amount"
                            name="amount"
                            type="number"
                />
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as='select' >
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name='currency' component='div' />
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as='textarea'
                />
                <ErrorMessage className='error' name='text' component='div' />
                <label className="checkbox">
                    <Field name="terms" 
                            type="checkbox" 
                             />
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage className='error' name='terms' component='div' />
                <button type="submit">Отправить</button>
            </Form>
       </Formik>
    )
};

export default CustomForm;

// 1 - Передаем в Formik пропсы initialValues и alidationSchema. У Form удаляем onSubmit, т.к. этот компанент будет получать ее из контекста.
// 2 - Вместо input используем Fiel, у него удаляем value={formik.values.name}, onChange={formik.handleChange}, onBlur={formik.handleBlur}. Они теперь будут подставляться автоматом. Нам самое главное подставить name именно он бдет контралировать value у нашего стейта.
// 3 - Там где у нас select, textarea мы используем пропс as='select/textarea'
// 4 - ErrorMessage привязываем по name и вместо component мы можем прокинуть туда callback фун-ию, которая будет возращать jsx элемент
                   
                  

