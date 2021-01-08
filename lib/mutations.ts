import { Todo } from 'pages/api/todos'

export async function updateTodos(newTodos: Array<Todo>) {
	const response = await fetch('/api/todos', {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({ newTodos })
	})
	const { updatedTodos } = await response.json()
	return updatedTodos
}
