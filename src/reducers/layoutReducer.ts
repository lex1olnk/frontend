import { LayoutState } from '../interfaces/layout'
import { createSlice } from '@reduxjs/toolkit'

const initialState: LayoutState = {
  formType: null,
  formErrors: {
    username: { errorOccured: false, errorMessage: '' },
    email: { errorOccured: false, errorMessage: '' },
    password: { errorOccured: false, errorMessage: '' },
    confirmPassword: { errorOccured: false, errorMessage: '' },
  },
  formSubmitted: false,
}

const layoutSlice = createSlice({
  name: 'layout',
  initialState: { ...initialState },
  reducers: {
    openForm(state, action) {
      state.formType = action.payload.formType
    },
    closeForm(state) {
      state.formType = null
    },
    formErrorOccured(state, action) {
      ;(state.formSubmitted = false),
        (state.formErrors = {
          ...state.formErrors,
          [action.payload.inputName]: { errorOccured: true, errorMessage: action.payload.error },
        })
    },
    removeFormError(state, action) {
      state.formErrors = {
        ...state.formErrors,
        [action.payload.inputName]: { errorOccured: false, errorMessage: '' },
      }
    },
    clearFromErrors(state) {
      state.formErrors = initialState.formErrors
    },
    submitForm(state) {
      state.formSubmitted = true
    },
    registerForm() {},
    login(state) {
      state.formSubmitted = false
      state.formType = null
    },
  },
})

export const {
  openForm,
  closeForm,
  formErrorOccured,
  removeFormError,
  clearFromErrors,
  submitForm,
  registerForm,
  login,
} = layoutSlice.actions

export default layoutSlice
