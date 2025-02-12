import React from 'react'
import Todo from './components/Todo'

const App = () => {
  return (
    <div className='bg-gray-900 min-h-screen w-full overflow-hidden'>
      <div className='w-full m-auto max-w-[100%] sm:p-6 pt-4 rounded-2xl bg-gray-800 shadow-lg'>
        <h2 className='text-2xl text-center text-white mb-4'>Todo App</h2>
        <Todo/>
      </div>
    </div>
  )
}

export default App
