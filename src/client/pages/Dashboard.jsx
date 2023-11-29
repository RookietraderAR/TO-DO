import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserTasks from '@wasp/queries/getUserTasks';
import createTask from '@wasp/actions/createTask';
import updateTask from '@wasp/actions/updateTask';

export function Dashboard() {
  const { data: tasks, isLoading, error } = useQuery(getUserTasks);
  const createTaskFn = useAction(createTask);
  const updateTaskFn = useAction(updateTask);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{task.description}</div>
            <div>
              <button
                onClick={() => updateTaskFn({ id: task.id, isDone: !task.isDone })}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${task.isDone ? 'bg-red-500' : 'bg-green-500'}`}
              >
                {task.isDone ? 'Unmark' : 'Mark'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <input type='text' className='px-1 py-2 border rounded-lg' />
        <button
          onClick={() => createTaskFn({ description: 'New task' })}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add Task
        </button>
        <br />
        <Link to='/'>Go to Homepage</Link>
      </div>
    </div>
  );
}