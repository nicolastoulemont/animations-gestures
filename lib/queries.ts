import { useQuery } from 'react-query'
import { Todo } from 'pages/api/todos'
import { Image } from 'pages/api/images'
export const useTodos = () =>
	useQuery<Array<Todo>, Error>('todos', async () => await (await fetch('/api/todos')).json())

export const useImages = () =>
	useQuery<Array<Image>, Error>('images', async () => await (await fetch('/api/images')).json())
