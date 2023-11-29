import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getTask from '@wasp/queries/getTask';
import updateTask from '@wasp/actions/updateTask';

export function Task() {
  const { taskId } = useParams();
  const { data: task, isLoading, error } = useQuery(getTask, { taskId });
  const updateTaskFn = useAction(updateTask);
  const [newTaskStatus, setNewTaskStatus] = useState(task?.isDone || false);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateTask = () => {
    updateTaskFn({ id: taskId, isDone: newTaskStatus });
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Task: {task?.description}</h1>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={newTaskStatus}
          onChange={() => setNewTaskStatus(!newTaskStatus)}
          className="mr-2 h-6 w-6"
        />
        <p className="text-lg">Status: {newTaskStatus ? 'Done' : 'Not Done'}</p>
      </div>
      <button
        onClick={handleUpdateTask}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Task
      </button>
      <Link to="/" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
        Go Back
      </Link>
    </div>
  );
}