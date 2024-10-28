import React, { useState } from 'react';
import { useQuery, useAction, getTasks, createTask, updateTask } from 'wasp/client/operations';

const MainPage = () => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);
  const createTaskFn = useAction(createTask);
  const updateTaskFn = useAction(updateTask);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingDescription, setEditingDescription] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateTask = () => {
    if (newTaskDescription.trim()) {
      createTaskFn({ description: newTaskDescription });
      setNewTaskDescription('');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setEditingDescription(task.description);
  };

  const handleUpdateTask = () => {
    if (editingDescription.trim()) {
      updateTaskFn({ id: editingTask, description: editingDescription, isDone: false });
      setEditingTask(null);
      setEditingDescription('');
    }
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Task'
          className='px-1 py-2 border rounded text-lg'
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button
          onClick={handleCreateTask}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <p>{task.description}</p>
            <button
              onClick={() => handleEditTask(task)}
              className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded'
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {editingTask && (
        <div className='flex gap-x-4 py-5'>
          <input
            type='text'
            placeholder='Edit Task Description'
            className='px-1 py-2 border rounded text-lg'
            value={editingDescription}
            onChange={(e) => setEditingDescription(e.target.value)}
          />
          <button
            onClick={handleUpdateTask}
            className='bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold rounded'
          >
            Update Task
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
