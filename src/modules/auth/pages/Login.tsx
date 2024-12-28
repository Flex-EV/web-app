import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { useCustomNavigate } from '@/routes/util/routing';
import FlexButton from '@/modules/ui/components/FlexButton';
import { login } from '@/modules/auth/authSlice.ts';
import { useNotification } from '@/modules/ui/hooks/useNotification.ts';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useCustomNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { showNotification } = useNotification();

  const { isLoading, error } = useSelector(
    (state: RootState) => state.authentication
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(login({ email, password })).unwrap();
    navigate.toDashboard();
    showNotification({
      type: 'success',
      message: 'Logged in successfully.',
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="fixed inset-0 bg-green-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-lg p-8 w-full max-w-md shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center leading-tight tracking-wide">
            Login
          </h2>
          <p className="mt-2 text-gray-600 mb-6">
            Welcome back! Please login to continue.
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm text-green-600 hover:text-green-500">
              Forgot password?
            </a>
          </div>

          <FlexButton
            text="Login"
            type="submit"
            variant="primary"
            fullWidth
            icon={<LogIn size={18} />}
            loading={isLoading}
          />
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don&#39;t have an account?{' '}
            <a
              href="#"
              className="text-green-600 hover:text-green-500 font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
