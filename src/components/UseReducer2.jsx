import { useReducer } from 'react';

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
  SUBMIT_FORM: 'SUBMIT_FORM',
  VALIDATE_FORM: 'VALIDATE_FORM',
  CLEAR_FORM: 'CLEAR_FORM'
};

// Вспомогательные функции
function validateField(field, value, formFields) {
  switch (field) {
    case 'name':
      return value.trim() === '' ? 'Имя обязательно' : '';
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? '' : 'Некорректный email';
    case 'password':
      return value.length >= 6 ? '' : 'Минимум 6 символов';
    case 'confirmPassword':
      return value === formFields.password 
        ? '' 
        : 'Пароли не совпадают';
    default:
      return '';
  }
}

function validateAllFields(formFields) {
  const errors = {};
  errors.name = validateField('name', formFields.name, formFields);
  errors.email = validateField('email', formFields.email, formFields);
  errors.password = validateField('password', formFields.password, formFields);
  errors.confirmPassword = validateField(
    'confirmPassword',
    formFields.confirmPassword,
    formFields
  );
  return errors;
}

// Редьюсер
function formReducer(state, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_FIELD:
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: validateField(
            action.field,
            action.value,
            state.formFields
          )
        }
      };
    
    case ActionTypes.SUBMIT_FORM:
      return {
        ...state,
        isSubmitting: true,
        submitError: '',
        submitSuccess: false
      };
    
    case ActionTypes.VALIDATE_FORM:
      return {
        ...state,
        errors: validateAllFields(state.formFields),
        submitSuccess: false,
        submitError: ''
      };
    
    case ActionTypes.CLEAR_FORM:
      return {
        ...initialState
      };
    
    default:
      return state;
  }
}

// Компонент
function UseReducer2() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Перед отправкой обновляем все ошибки
    dispatch({ type: ActionTypes.VALIDATE_FORM });
    
    // Если есть ошибки → выходим
    if (Object.values(state.errors).some(error => error !== '')) {
      return;
    }
    
    // Отправляем форму
    dispatch({ type: ActionTypes.SUBMIT_FORM });
    
    try {
      // Моковая отправка
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Успешно
      dispatch({ type: ActionTypes.CLEAR_FORM });
      dispatch({ 
        type: ActionTypes.SUBMIT_FORM, 
        submitSuccess: true 
      });
    } catch (error) {
      dispatch({ 
        type: ActionTypes.SUBMIT_FORM, 
        submitError: error.message 
      });
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      
      {state.submitSuccess && <div className="success">Успех!</div>}
      {state.submitError && <div className="error">Ошибка: {state.submitError}</div>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            value={state.formFields.name}
            onChange={(e) => dispatch({
              type: ActionTypes.CHANGE_FIELD,
              field: 'name',
              value: e.target.value
            })}
          />
          {state.errors.name && <span className="error">{state.errors.name}</span>}
        </div>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={state.formFields.email}
            onChange={(e) => dispatch({
              type: ActionTypes.CHANGE_FIELD,
              field: 'email',
              value: e.target.value
            })}
          />
          {state.errors.email && <span className="error">{state.errors.email}</span>}
        </div>
        
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={state.formFields.password}
            onChange={(e) => dispatch({
              type: ActionTypes.CHANGE_FIELD,
              field: 'password',
              value: e.target.value
            })}
          />
          {state.errors.password && <span className="error">{state.errors.password}</span>}
        </div>
        
        <div>
          <label>Подтвердите пароль:</label>
          <input
            type="password"
            value={state.formFields.confirmPassword}
            onChange={(e) => dispatch({
              type: ActionTypes.CHANGE_FIELD,
              field: 'confirmPassword',
              value: e.target.value
            })}
          />
          {state.errors.confirmPassword && (
            <span className="error">{state.errors.confirmPassword}</span>
          )}
        </div>
        
        <button 
          type="submit"
          disabled={state.isSubmitting}
        >
          {state.isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
}

export default UseReducer2;