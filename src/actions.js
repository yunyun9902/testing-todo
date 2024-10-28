import { HttpError } from 'wasp/server'

export const createTask = async ({ description }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newTask = await context.entities.Task.create({
    data: {
      description,
      isDone: false,
      userId: context.user.id
    }
  });

  return newTask;
}

export const updateTask = async ({ id, description, isDone }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const task = await context.entities.Task.findUnique({
    where: { id },
    include: { user: true }
  });
  if (task.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Task.update({
    where: { id },
    data: { description, isDone }
  });
}
