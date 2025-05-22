import { useReducer } from 'react';

// Начальное состояние
const initialState = {
  products: [
    { id: 1, name: 'Ноутбук', price: 1999, category: 'electronics', inStock: true },
    { id: 2, name: 'Смартфон', price: 699, category: 'electronics', inStock: true },
    { id: 3, name: 'Книга', price: 19, category: 'books', inStock: false },
    { id: 4, name: 'Наушники', price: 199, category: 'electronics', inStock: true },
    { id: 5, name: 'Футболка', price: 29, category: 'clothing', inStock: true },
  ],
  cart: [],
  filters: {
    category: 'all',
    inStockOnly: false,
    maxPrice: 1000,
  },
  sortBy: 'name', // 'name' | 'price' | 'category'
};

// Типы действий
const ActionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  APPLY_FILTER: 'APPLY_FILTER',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  SORT_PRODUCTS: 'SORT_PRODUCTS',
};

// Редьюсер
function shopReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART: {
      const product = state.products.find(p => p.id === action.productId);
      if (!product) return state;

      const existingItem = state.cart.find(item => item.id === action.productId);
      
      return {
        ...state,
        cart: existingItem
          ? state.cart.map(item =>
              item.id === action.productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...product, quantity: 1 }],
      };
    }

    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.productId),
      };

    case ActionTypes.UPDATE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.productId
            ? { ...item, quantity: Math.max(1, action.quantity) }
            : item
        ),
      };

    case ActionTypes.APPLY_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case ActionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
      };

    case ActionTypes.SORT_PRODUCTS:
      return {
        ...state,
        sortBy: action.sortBy,
      };

    default:
      return state;
  }
}

// Вспомогательные функции
function filterAndSortProducts(products, filters, sortBy) {
  let filtered = [...products];
  
  // Применяем фильтры
  if (filters.category !== 'all') {
    filtered = filtered.filter(p => p.category === filters.category);
  }
  
  if (filters.inStockOnly) {
    filtered = filtered.filter(p => p.inStock);
  }
  
  filtered = filtered.filter(p => p.price <= filters.maxPrice);

  // Сортируем
  switch (sortBy) {
    case 'price':
      return filtered.sort((a, b) => a.price - b.price);
    case 'category':
      return filtered.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function UseReducer() {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const filteredProducts = filterAndSortProducts(
    state.products,
    state.filters,
    state.sortBy
  );

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="shop-container">
      <div className="filters">
        <h3>Фильтры</h3>
        <select
          value={state.filters.category}
          onChange={(e) => dispatch({
            type: ActionTypes.APPLY_FILTER,
            payload: { category: e.target.value }
          })}
        >
          <option value="all">Все категории</option>
          <option value="electronics">Электроника</option>
          <option value="books">Книги</option>
          <option value="clothing">Одежда</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={state.filters.inStockOnly}
            onChange={(e) => dispatch({
              type: ActionTypes.APPLY_FILTER,
              payload: { inStockOnly: e.target.checked }
            })}
          />
          Только в наличии
        </label>

        <div>
          Макс. цена: {state.filters.maxPrice}$
          <input
            type="range"
            min="0"
            max="1000"
            value={state.filters.maxPrice}
            onChange={(e) => dispatch({
              type: ActionTypes.APPLY_FILTER,
              payload: { maxPrice: Number(e.target.value) }
            })}
          />
        </div>

        <button onClick={() => dispatch({ type: ActionTypes.CLEAR_FILTERS })}>
          Сбросить фильтры
        </button>
      </div>

      <div className="sorting">
        <h3>Сортировка</h3>
        <button onClick={() => dispatch({ type: ActionTypes.SORT_PRODUCTS, sortBy: 'name' })}>
          По названию
        </button>
        <button onClick={() => dispatch({ type: ActionTypes.SORT_PRODUCTS, sortBy: 'price' })}>
          По цене
        </button>
        <button onClick={() => dispatch({ type: ActionTypes.SORT_PRODUCTS, sortBy: 'category' })}>
          По категории
        </button>
      </div>

      <div className="products">
        <h3>Товары ({filteredProducts.length})</h3>
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              <h4>{product.name}</h4>
              <p>Цена: {product.price}$</p>
              <p>Категория: {product.category}</p>
              <p>{product.inStock ? 'В наличии' : 'Нет в наличии'}</p>
              <button
                onClick={() => dispatch({ type: ActionTypes.ADD_TO_CART, productId: product.id })}
                disabled={!product.inStock}
              >
                Добавить в корзину
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="cart">
        <h3>Корзина ({totalItems})</h3>
        <ul>
          {state.cart.map(item => (
            <li key={item.id}>
              <h4>{item.name}</h4>
              <p>Цена: {item.price}$ x {item.quantity} = {item.price * item.quantity}$</p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => dispatch({
                  type: ActionTypes.UPDATE_QUANTITY,
                  productId: item.id,
                  quantity: Number(e.target.value)
                })}
              />
              <button onClick={() => dispatch({ type: ActionTypes.REMOVE_FROM_CART, productId: item.id })}>
                Удалить
              </button>
            </li>
          ))}
        </ul>
        <h4>Итого: {totalPrice}$</h4>
      </div> */}


<div className={`cart ${state.cart.length > 0 ? 'show' : ''}`}>
  <h3>Корзина ({totalItems})</h3>
  {state.cart.length > 0 ? (
    <>
      <ul>
        {state.cart.map(item => (
          <li key={item.id}>
            <h4>{item.name}</h4>
            <p>Цена: {item.price}$ x {item.quantity} = {item.price * item.quantity}$</p>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => dispatch({
                type: ActionTypes.UPDATE_QUANTITY,
                productId: item.id,
                quantity: Number(e.target.value)
              })}
            />
            <button onClick={() => dispatch({ type: ActionTypes.REMOVE_FROM_CART, productId: item.id })}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <h4>Итого: {totalPrice}$</h4>
    </>
  ) : (
    <p>Корзина пуста</p>
  )}
</div>
    </div>
  );
}

export default UseReducer;