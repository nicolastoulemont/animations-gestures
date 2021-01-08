/* 
Based on the code sandbox example :
https://codesandbox.io/s/framer-motion-2-drag-to-reorder-fc4rt
*/
import Head from 'next/head'
import { Box, Heading, Text, Image, chakra, UnorderedList, Button, Flex } from '@chakra-ui/react'
import { Todo } from 'pages/api/todos'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { useMeasurePosition } from 'utils/useMeasurePosition'
import { findIndex, Position } from 'utils/usePositionReorder'
import move from 'array-move'
import NextLink from 'next/link'
import { useTodos, updateTodos } from 'lib'
import { useMutation } from 'react-query'

const MotionBox = chakra(motion.div)
const MotionListItem = chakra(motion.li)

export default function Home() {
	const [todos, setTodos] = useState<Array<Todo>>([])
	const { data } = useTodos()
	const { mutateAsync } = useMutation(updateTodos)

	useEffect(() => {
		if (data && JSON.stringify(data) !== JSON.stringify(todos)) {
			setTodos(data)
		}
	}, [data])

	const positions = useRef<Array<Position>>([]).current
	const setPositions = (i: number, offset: Position) => (positions[i] = offset)

	const moveItem = (i, dragOffset) => {
		const targetIndex = findIndex(i, dragOffset, positions)
		if (targetIndex !== i) setTodos(move(todos, i, targetIndex))
	}

	async function updateServerSideData() {
		try {
			await mutateAsync(todos.map((todo, index) => ({ ...todo, position: index })))
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<Head>
				<title>Drag and reorder list items</title>
			</Head>

			<Box as='main' width='100%' boxSizing='border-box'>
				<Flex as='nav' width='100%' align='center' justify='flex-start' p={3}>
					<NextLink href='/' passHref>
						<Button as='a'>Retour</Button>
					</NextLink>
				</Flex>

				<UnorderedList
					ml={{ base: 6, md: 'auto' }}
					mr={{ base: 6, md: 'auto' }}
					maxW={{ base: '100%', md: '50%' }}
					listStyleType='none'
					py={3}
				>
					{todos?.map((todo, index) => (
						<TodoItem
							todo={todo}
							key={todo.id}
							index={index}
							setPositions={setPositions}
							moveItem={moveItem}
							updateServerSideData={() => updateServerSideData()}
						/>
					))}
				</UnorderedList>
			</Box>
		</>
	)
}

const colorsReg = ['purple.300', 'red.300', 'cyan.300', 'yellow.300']

type TodoItemProps = {
	todo: Todo
	index: number
	setPositions: (i: number, offset: Position) => Position
	moveItem: (i: number, dragOffset: number) => void
	updateServerSideData: () => Promise<void>
}

const onTop = { zIndex: 3 }
const flat = {
	zIndex: 1,
	transition: { delay: 0.3 }
}

function TodoItem({ todo, index, setPositions, moveItem, updateServerSideData }: TodoItemProps) {
	const [isDragging, setIsDragging] = useState(false)
	const ref = useMeasurePosition((pos) => setPositions(index, pos))

	return (
		<MotionListItem p={0} initial={false} animate={isDragging ? onTop : flat}>
			<MotionBox
				layout
				p={3}
				my={2}
				ref={ref}
				display='flex'
				alignItems='flex-start'
				justifyContent='space-between'
				bgColor={colorsReg[todo.id]}
				borderRadius='10px'
				whileHover={{ scale: 1.03, cursor: 'grab' }}
				whileTap={{ scale: 1.12, cursor: 'grabbing' }}
				drag='y'
				onDragStart={() => setIsDragging(true)}
				onDragEnd={() => {
					setIsDragging(false)
					updateServerSideData()
				}}
				onViewportBoxUpdate={(_viewportBox, delta) => {
					isDragging && moveItem(index, delta.y.translate)
				}}
			>
				<Box>
					<Heading size='sm'>{todo.title}</Heading>
					<Text>{todo.description}</Text>
				</Box>
				<Image
					src={todo.userAvatarUrl}
					fallbackSrc={todo.userAvatarUrl}
					borderRadius='13px'
					width='60px'
				/>
			</MotionBox>
		</MotionListItem>
	)
}
