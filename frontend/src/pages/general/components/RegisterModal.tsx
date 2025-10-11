// src/pages/general/components/RegisterModal.tsx
import { useState } from 'react';
import AnimatedBackground from './AnimatedBackground';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al backend
    console.log('Datos de registro:', formData);
    alert('Registro enviado (simulado)');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatedBackground>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border-2 border-yellow-400">
          <h2 className="text-2xl font-bold text-center text-black">Registro de Usuario</h2>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-black">
                  Nombres
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="w-full px-3 py-2 mt-1 text-black bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-black">
                  Apellidos
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="w-full px-3 py-2 mt-1 text-black bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
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
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 mt-1 text-black bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-black">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                className="w-full px-3 py-2 mt-1 text-black bg-transparent border-b-2 border-yellow-400 focus:outline-none focus:border-yellow-500"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-black bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default RegisterModal;
