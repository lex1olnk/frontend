import { useState } from 'react'
import { loginUser } from '../../actions/userActions'
import { Input } from '../Inputs/inputs'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../interfaces'
import { useAppDispatch } from '../../hooks/hooks'
import { formErrorOccured, removeFormError, submitForm } from '../../reducers/layoutReducer'
import { validateEmail } from '../../helpers'

export const Login = () => {
  const dispatch = useAppDispatch()
  const { formErrors, formSubmitted } = useSelector((state: State) => state.layout)

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const [validInputs, setValidInputs] = useState({
    email: false,
    password: false,
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevState) => ({ ...prevState, [name]: value }))

    if (name === 'email' || name === 'password') {
      if (formErrors[name].errorOccured) {
        dispatch(removeFormError({ name }))
      }
    }
  }

  const handleValidation = (inputName: string) => {
    switch (inputName) {
      case 'email':
        if (formValues.email === '') {
          setValidInputs({ ...validInputs, [inputName]: false })
          dispatch(formErrorOccured({ inputName, error: 'Email is required' }))
        } else if (!validateEmail(formValues.email)) {
          setValidInputs({ ...validInputs, [inputName]: false })
          dispatch(formErrorOccured({ inputName, error: 'Please enter a valid email' }))
        } else {
          setValidInputs({ ...validInputs, [inputName]: true })
        }
        break
      case 'password':
        if (formValues.password === '') {
          setValidInputs({ ...validInputs, [inputName]: false })
          dispatch(formErrorOccured({ inputName, error: 'Password is required' }))
        } else if (formValues.password.length < 6) {
          setValidInputs({ ...validInputs, [inputName]: false })
          dispatch(formErrorOccured({ inputName, error: 'Password must be at least 6 characters' }))
        } else {
          setValidInputs({ ...validInputs, [inputName]: true })
        }
        break
      default:
        break
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(submitForm())
    dispatch(loginUser(formValues))
  }

  return (
    <div className='bg-slate-100 min-h-[calc(100vh_-_65px_-_148px)] flex flex-row justify-center'>
      <div className='text-center justify-centerw-[333px] h-[400px] rounded-md my-auto mx-2 bg-cred flex flex-col p-4 text-white'>
        <img
          src={process.env.REACT_APP_API_URL + '/img/' + 'defaultImg.jpg'}
          className='h-[217px] w-[217px] object-cover mx-auto rounded-full border-2 border-white'
        />
        <span className='my-2'>Добро пожаловать к нам!</span>
        <span>Чувствуйте себя как дома.</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='bg-white flex flex-col my-auto justify-center h-[400px] rounded-md p-4'>
          <span className='text-xl text-center'>Авторизация</span>
          <div className='flex flex-col mx-auto w-[364px]'></div>
          <a className='text-right'>забыли пароль?</a>
          <button
            type='submit'
            className='text-white w-28 mx-auto my-4 outline-none bg-cred h-9 rounded-full'
          >
            Войти
          </button>
          <a className='text-center'>Нету аккаунта? зарегистрируйтесь!</a>
        </div>
      </form>
    </div>
  )
}
