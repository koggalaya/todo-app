import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { motion } from 'framer-motion';



const LoginForm = ({ toggleForm }) => {
  const { login } = useAuth();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values) => {
      try {
        login(values.email, values.password);
      } catch (err) {
        setError('Invalid email or password');
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative">
    

      {/* Left Side (Login Form) */}
      <motion.div 
        className="w-full lg:w-1/2 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center p-6 lg:p-10"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{
          backgroundImage: "url('/10619.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
         <div className="spotlight"></div>
        <div className="bg-gray-800 bg-opacity-40 p-6 lg:p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 lg:mb-6">Login</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4 lg:space-y-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.email ? <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div> : null}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.password ? <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div> : null}
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                Login
              </button>
              <button
                type="button"
                onClick={toggleForm}
                className="mt-4 lg:mt-0 text-blue-400 hover:underline"
              >
                Register
              </button>
            </div>
           
          </form>
          
        </div>
      </motion.div>
     

      {/* Right Side (Design Elements) */}
      <motion.div 
        className="w-full lg:w-1/2 bg-gradient-to-b from-gray-100 to-gray-200 p-6 lg:p-10 relative flex flex-col justify-center items-center lg:items-start"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <h2 className="text-4xl lg:text-6xl font-mono text-gray-800 mb-4 lg:mb-7 text-center lg:text-left">TimeBox Lite .</h2>
        <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-pink-500 to-indigo-400 inline-block text-transparent bg-clip-text mb-4 lg:mb-6 text-center lg:text-left">Start your day feeling centered and in command</h2>
        <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 text-center lg:text-left">Streamline your workflow by prioritizing what truly matters and organizing your time around the key aspects of your life.</p>
        {/* Floating Cards */}
        
        <div className="relative w-full lg:w-3/4">
        
          <motion.div 
            className="absolute bottom-15 left-0 lg:left-8 bg-blue-600 text-white p-4 lg:p-6 rounded-lg shadow-lg w-full lg:w-64"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.5 }}
          >
            <div className="bg-white text-blue-600 shadow-xl p-4 lg:p-4 rounded-lg w-64">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-700 mb-3">48 Tasks Completed</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span className="text-gray-600">Customize your time</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span className="text-gray-600">Update deadlines</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span className="text-gray-600">Calculate efficiency</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
