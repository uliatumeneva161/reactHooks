import { useReducer } from 'react';

// Стили компонента
const styles = {
  formContainer: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  formTitle: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontWeight: '500',
  },
  formInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  formInputError: {
    borderColor: '#e74c3c',
  },
  errorMessage: {
    color: '#e74c3c',
    fontSize: '14px',
    marginTop: '5px',
    display: 'block',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButtonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
  },
  alert: {
    padding: '10px 15px',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  alertSuccess: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  alertError: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
};

// Начальное состояние
const initialState = {
  formFields: {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  errors: {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  isSubmitting: false,
  submitSuccess: false,
  submitError: ''
};

// Типы действий
const ActionTypes = {
  CHANGE_FIELD: 'CHANGE_FIELD',
  VALIDATE_FIELD: 'VALIDATE_FIELD',
  VALIDATE_ALL: 'VALIDATE_ALL',
  SUBMIT_START: 'SUBMIT_START',
  SUBMIT_SUCCESS: 'SUBMIT_SUCCESS',
  SUBMIT_ERROR: 'SUBMIT_ERROR',
  RESET_FORM: 'RESET_FORM'
};

// Валидация полей
const validators = {
  name: (value) => value.trim() === '' ? 'Имя обязательно' : '',
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === '') return 'Email обязателен';
    return emailRegex.test(value) ? '' : 'Некорректный email';
  },
  password: (value) => {
    if (value.trim() === '') return 'Пароль обязателен';
    return value.length >= 6 ? '' : 'Минимум 6 символов';
  },
  confirmPassword: (value, formFields) => {
    if (value.trim() === '') return 'Подтвердите пароль';
    return value === formFields.password ? '' : 'Пароли не совпадают';
  }
};

// Редьюсер
function formReducer(state, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_FIELD:
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [action.field]: action.value
        }
      };
    
    case ActionTypes.VALIDATE_FIELD:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: validators[action.field](
            state.formFields[action.field],
            state.formFields
          )
        }
      };
    
    case ActionTypes.VALIDATE_ALL:
      const newErrors = {};
      Object.keys(state.formFields).forEach(field => {
        newErrors[field] = validators[field](
          state.formFields[field],
          state.formFields
        );
      });
      return {
        ...state,
        errors: newErrors
      };
    
    case ActionTypes.SUBMIT_START:
      return {
        ...state,
        isSubmitting: true,
        submitError: '',
        submitSuccess: false
      };
    
    case ActionTypes.SUBMIT_SUCCESS:
      return {
        ...initialState,
        submitSuccess: true
      };
    
    case ActionTypes.SUBMIT_ERROR:
      return {
        ...state,
        isSubmitting: false,
        submitError: action.error
      };
    
    case ActionTypes.RESET_FORM:
      return initialState;
    
    default:
      return state;
  }
}

function RegistrationForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    dispatch({
      type: ActionTypes.CHANGE_FIELD,
      field,
      value
    });
    
    dispatch({
      type: ActionTypes.VALIDATE_FIELD,
      field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch({ type: ActionTypes.VALIDATE_ALL });
    
    const hasErrors = Object.values(state.errors).some(error => error !== '');
    if (hasErrors) return;
    
    dispatch({ type: ActionTypes.SUBMIT_START });
    
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      
      dispatch({ type: ActionTypes.SUBMIT_SUCCESS });
    } catch (error) {
      dispatch({ 
        type: ActionTypes.SUBMIT_ERROR,
        error: error.message 
      });
    }
  };

  const isFormValid = !Object.values(state.errors).some(error => error !== '') &&
    Object.values(state.formFields).every(field => field.trim() !== '');

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>Регистрация</h2>
      
      {state.submitSuccess && (
        <div style={{...styles.alert, ...styles.alertSuccess}}>
          Регистрация прошла успешно!
        </div>
      )}
      
      {state.submitError && (
        <div style={{...styles.alert, ...styles.alertError}}>
          Ошибка: {state.submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Имя:</label>
          <input
            type="text"
            style={{
              ...styles.formInput,
              ...(state.errors.name ? styles.formInputError : {})
            }}
            value={state.formFields.name}
            onChange={handleChange('name')}
          />
          {state.errors.name && (
            <span style={styles.errorMessage}>{state.errors.name}</span>
          )}
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Email:</label>
          <input
            type="email"
            style={{
              ...styles.formInput,
              ...(state.errors.email ? styles.formInputError : {})
            }}
            value={state.formFields.email}
            onChange={handleChange('email')}
          />
          {state.errors.email && (
            <span style={styles.errorMessage}>{state.errors.email}</span>
          )}
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Пароль:</label>
          <input
            type="password"
            style={{
              ...styles.formInput,
              ...(state.errors.password ? styles.formInputError : {})
            }}
            value={state.formFields.password}
            onChange={handleChange('password')}
          />
          {state.errors.password && (
            <span style={styles.errorMessage}>{state.errors.password}</span>
          )}
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Подтвердите пароль:</label>
          <input
            type="password"
            style={{
              ...styles.formInput,
              ...(state.errors.confirmPassword ? styles.formInputError : {})
            }}
            value={state.formFields.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
          {state.errors.confirmPassword && (
            <span style={styles.errorMessage}>{state.errors.confirmPassword}</span>
          )}
        </div>
        
        <button 
          type="submit"
          style={{
            ...styles.submitButton,
            ...(!isFormValid || state.isSubmitting ? styles.submitButtonDisabled : {})
          }}
          disabled={state.isSubmitting || !isFormValid}
        >
          {state.isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;