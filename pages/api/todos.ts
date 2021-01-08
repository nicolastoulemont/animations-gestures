export interface Todo {
	id: number
	position: number
	complete: boolean
	title: string
	description: string
	userAvatarUrl: string
}

let todos: Array<Todo> = [
	{
		id: 0,
		position: 0,
		complete: false,
		title: 'Faire le ménage',
		description: "Même si j'ai pas envie",
		userAvatarUrl: 'https://i.pravatar.cc/150?img=1'
	},
	{
		id: 1,
		position: 1,
		complete: false,
		title: 'Faire à manger',
		description: "J'ai faim",
		userAvatarUrl: 'https://i.pravatar.cc/150?img=2'
	},
	{
		id: 2,
		position: 2,
		complete: false,
		title: 'Aller courir',
		description: 'Sinon je vais grossir',
		userAvatarUrl: 'https://i.pravatar.cc/150?img=3'
	},
	{
		id: 3,
		position: 3,
		complete: false,
		title: 'Réussir a animer ces items',
		description: 'Parce que pour le moment ça veut pas',
		userAvatarUrl: 'https://i.pravatar.cc/150?img=4'
	}
]

export default (req, res) => {
	if (req.method === 'GET') {
		res.statusCode = 200
		res.json(todos.sort((a, b) => a.position - b.position))
	} else if (req.method === 'POST') {
		const { newTodos } = req.body
		let todos = newTodos
		res.statusCode = 200
		res.json({ updatedTodos: todos.sort((a, b) => a.position - b.position) })
	}
}
