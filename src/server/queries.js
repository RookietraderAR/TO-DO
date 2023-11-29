import HttpError from '@wasp/core/HttpError.js';

export const getUserTasks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Task.findMany({
    where: {
      userId: args.userId
    }
  });
}

export const getTask = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { taskId } = args;

  const task = await context.entities.Task.findUnique({
    where: { id: taskId }
  });

  if (!task) { throw new HttpError(404, 'No task found with ID: ' + taskId) };

  return task;
}