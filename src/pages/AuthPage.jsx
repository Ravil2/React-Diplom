import { useState } from 'react';

const AuthPage = ({ setIsAuth }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleMode = () => {
    setError('');
    setIsLoginMode(!isLoginMode);
    setUsername('');
    setPassword('');
  };

  // Ник: минимум 8 символов, только английские буквы и цифры, и обязательно хотя бы одна буква
  const isValidUsername = name => {
    return /^[a-zA-Z0-9]{8,}$/.test(name) && /[a-zA-Z]/.test(name);
  };

  // Пароль: минимум 8 символов, не только цифры (хотя бы одна буква или спецсимвол)
  const isValidPassword = pass => {
    return pass.length >= 8 && /[^\d]/.test(pass);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (!isLoginMode) {
      if (!isValidUsername(username)) {
        setError(
          'Имя пользователя должно содержать только английские буквы и цифры, быть не менее 8 символов и содержать хотя бы одну букву',
        );
        return;
      }
      if (!isValidPassword(password)) {
        setError(
          'Пароль должен быть не менее 8 символов и содержать не только цифры',
        );
        return;
      }
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (isLoginMode) {
      const user = users.find(
        user => user.username === username && user.password === password,
      );
      if (!user) {
        setError('Неверный логин или пароль');
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsAuth(true);
      alert(`Добро пожаловать, ${username}!`);
    } else {
      const userExists = users.some(user => user.username === username);
      if (userExists) {
        setError('Пользователь с таким именем уже существует');
        return;
      }
      const newUser = { username, password };
      const newUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(newUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      setIsAuth(true);
      alert(`Пользователь ${username} успешно зарегистрирован!`);
    }
  };

  return (
    <div className="auth-page">
      <h1 className="auth-page__title">React Shop</h1>
      <form onSubmit={handleSubmit} className="auth-page__form">
        <h2 style={{ fontWeight: 700, fontSize: 25, textAlign: 'center' }}>
          {isLoginMode ? 'Вход' : 'Регистрация'}
        </h2>
        <input
          type="text"
          className="auth-page__input"
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          className="auth-page__input"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="auth-page__error">{error}</div>}
        <button type="submit" className="auth-page__button">
          {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      <div className="auth-page__toggle">
        {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
        <button
          type="button"
          onClick={toggleMode}
          className="auth-page__toggle-button"
        >
          {isLoginMode ? 'Зарегистрируйтесь' : 'Войдите'}
        </button>
      </div>
      <p className="p-autor">Автор: Юсупжанов Равиль ПО 21-2</p>
    </div>
  );
};

export default AuthPage;
