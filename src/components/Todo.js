import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const TodoApp = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true); // Keep sidebar open on large screens
      } else {
        setIsSidebarOpen(false); // Close sidebar on small screens
      }
    };

    // Check initial screen size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    setTodos([...todos, { ...newTodo, completed: false }]);
    setNewTodo({ title: '', description: '' });
  };

  const handleEditTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <div className="text-white">Please log in to manage your todos.</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="block lg:hidden p-4 text-white bg-[#1E1E1E]"
      >
        ☰
      </button>

      {/* Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3 }}
        className={`fixed lg:relative top-0 left-0 z-50 w-64 h-full bg-[#1E1E1E] p-6 text-gray-400 border-r border-gray-700 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex justify-between  items-center">
          <h2 className="text-2xl font-bold text-white mb-8">Task Manager</h2>
          {/* Close Button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            ✕
          </button>
        </div>

        <nav>
          <ul>
            <li className="mb-6">
              <button className="text-gray-400 hover:text-white">Home</button>
            </li>
            <li className="mb-6">
              <button className="text-gray-400 hover:text-white">My Tasks</button>
            </li>
            <li className="mb-6">
              <button className="text-gray-400 hover:text-white">Projects</button>
            </li>
          </ul>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 bg-[#252525] text-white p-8 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold tracking-wide">To-Do List</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* New Todo Input Section */}
        <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg mb-8">
          <input
            type="text"
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-[#333333] text-white"
          />
          <textarea
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-600 rounded-lg bg-[#333333] text-white"
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
          >
            Add Todo
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-6">
          {todos.map((todo, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`p-6 bg-[#2C2C2C] border border-gray-600 rounded-lg shadow-md transition-transform ${
                todo.completed ? 'opacity-60 line-through' : ''
              }`}
            >
              <h2 className="text-2xl font-semibold mb-2">{todo.title}</h2>
              <p className="text-gray-300 mb-4">{todo.description}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleToggleComplete(index)}
                  className="text-green-400 hover:text-green-300"
                >
                  {todo.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                </button>
                <button
                  onClick={() => handleDeleteTodo(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    handleEditTodo(index, {
                      ...todo,
                      title: prompt('New Title', todo.title),
                      description: prompt('New Description', todo.description),
                    })
                  }
                  className="text-blue-400 hover:text-blue-300"
                >
                  Edit
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;

