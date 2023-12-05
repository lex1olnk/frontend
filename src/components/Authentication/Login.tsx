import React, { useEffect, useState } from 'react'
import { loginUser } from '../../actions/userActions'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { removeFormError, submitForm } from '../../reducers/layoutReducer'
// import { validateEmail } from '../../helpers'
import { useNavigate } from 'react-router-dom'

import './styles.css'
import { classNames } from '../../utils/consts'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { formErrors } = useAppSelector(({ root }) => root.layout)
  const { isAuthenticated } = useAppSelector(({ root }) => root.user)
  const [formValues, setFormValues] = useState({
    login: '',
    password: '',
  })

  // const [validInputs, setValidInputs] = useState({
  //   email: false,
  //   password: false,
  // })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevState) => ({ ...prevState, [name]: value }))

    if (name === 'login' || name === 'password') {
      if (formErrors[name].errorOccured) {
        dispatch(removeFormError({ name }))
      }
    }
  }

  // const handleValidation = (inputName: string) => {
  //   switch (inputName) {
  //     case 'email':
  //       if (formValues.email === '') {
  //         setValidInputs({ ...validInputs, [inputName]: false })
  //         dispatch(formErrorOccured({ inputName, error: 'Email is required' }))
  //       } else if (!validateEmail(formValues.email)) {
  //         setValidInputs({ ...validInputs, [inputName]: false })
  //         dispatch(formErrorOccured({ inputName, error: 'Please enter a valid email' }))
  //       } else {
  //         setValidInputs({ ...validInputs, [inputName]: true })
  //       }
  //       break
  //     case 'password':
  //       if (formValues.password === '') {
  //         setValidInputs({ ...validInputs, [inputName]: false })
  //         dispatch(formErrorOccured({ inputName, error: 'Password is required' }))
  //       } else if (formValues.password.length < 6) {
  //         setValidInputs({ ...validInputs, [inputName]: false })
  //         dispatch(formErrorOccured({ inputName, error: 'Password must be at least 6 characters' }))
  //       } else {
  //         setValidInputs({ ...validInputs, [inputName]: true })
  //       }
  //       break
  //     default:
  //       break
  //   }
  // }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(submitForm())
    dispatch(loginUser(formValues))
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  const { login, password } = formValues

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
      <form onSubmit={handleSubmit} className='bg-white my-auto h-[400px] rounded-md p-4'>
        <div className='flex flex-col justify-center my-auto'>
          <span className='text-xl text-center'>Авторизация</span>
          <div className='flex flex-col mx-auto w-[364px]'></div>
          <a className='text-right'>забыли пароль?</a>
          <input
            className={classNames(
              'input'
            )}
            value={login}
            onChange={handleChange}
            // onBlur={(e) => handleValidation(e.target.name)}
            type='text'
            name='login'
            placeholder='Email'
          />
          <input
            className={'input'}
            value={password}
            onChange={handleChange}
            // onBlur={(e) => handleValidation(e.target.name)}
            type='password'
            name='password'
            placeholder='Пароль'
          />
          <button
            // disabled={!validInputs.email || !validInputs.password || formSubmitted}
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
