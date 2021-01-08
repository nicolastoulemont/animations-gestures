import { useQuery } from 'react-query'
import { Todo } from 'pages/api/todos'
export const useTodos = () =>
	useQuery<Array<Todo>, Error>('todos', async () => await (await fetch('/api/todos')).json())
