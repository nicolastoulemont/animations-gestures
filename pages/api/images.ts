export interface Image {
	id: number
	imageSrcUrl: string
}

let images: Array<Image> = [
	{
		id: 0,
		imageSrcUrl: 'https://i.pravatar.cc/400?img=1'
	},
	{
		id: 1,
		imageSrcUrl: 'https://i.pravatar.cc/400?img=2'
	},
	{
		id: 2,
		imageSrcUrl: 'https://i.pravatar.cc/400?img=3'
	},
	{
		id: 3,
		imageSrcUrl: 'https://i.pravatar.cc/400?img=4'
	}
]

export default (_, res) => {
	res.statusCode = 200
	res.json(images)
}
