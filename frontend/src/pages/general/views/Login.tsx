// src/pages/general/views/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';
import RegisterModal from '../components/RegisterModal';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <AnimatedBackground>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border-2 border-yellow-400">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black">Hotel Imperial</h1>
          <p className="mt-2 text-yellow-600">Inicia sesión para continuar</p>
        </div>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-black">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 text-black bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 text-black bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="px-6 py-2 mt-4 text-lg font-bold text-black bg-yellow-400 rounded-md transition-all duration-300 hover:bg-orange-400 hover:text-white hover:scale-105"
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="px-6 py-2 mt-4 text-lg font-bold text-black bg-transparent border-2 border-yellow-400 rounded-md transition-all duration-300 hover:bg-yellow-400 hover:text-white hover:scale-105"
            >
              Regístrate
            </button>
          </div>
        </form>
      </div>
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
      />
    </AnimatedBackground>
  );
};

export default Login;
