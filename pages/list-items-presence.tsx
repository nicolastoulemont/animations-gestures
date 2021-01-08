/* 
Based on the Sam Selikoff yt video example :
https://www.youtube.com/watch?v=gRFOstDXl1s&ab_channel=SamSelikoff
*/
import Head from 'next/head'
import { Box, Heading, Text, Image, chakra, UnorderedList, Button, Flex } from '@chakra-ui/react'
import { Todo } from 'pages/api/todos'
import { motion, AnimatePresence } from 'framer-motion'
import NextLink from 'next/link'
import { useTodos } from 'lib'

const MotionListItem = chakra(motion.li)

export default function Home() {
	const { data } = useTodos()

	return (
		<>
			<Head>
				<title>List items presence</title>
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
					<AnimatePresence>
						{data?.map((todo, index) => (
							<TodoItem key={todo.id} todo={todo} index={index} />
						))}
					</AnimatePresence>
				</UnorderedList>
			</Box>
		</>
	)
}

const colorsReg = ['purple.300', 'red.300', 'cyan.300', 'yellow.300']

type TodoItemProps = {
	todo: Todo
	index: number
}

function TodoItem({ todo, index }: TodoItemProps) {
	return (
		<MotionListItem
			layout
			p={3}
			my={2}
			borderBottom='1px solid'
			borderColor='gray.200'
			display='flex'
			alignItems='flex-start'
			justifyContent='space-between'
			bgColor={colorsReg[todo.id]}
			borderRadius='10px'
			variants={{
				hidden: (index) => ({
					opacity: 0,
					y: -50 * index
				}),
				visible: (index) => ({
					opacity: 1,
					y: 0,
					transition: {
						delay: index * 0.05
					}
				})
			}}
			initial='hidden'
			animate='visible'
			custom={index}
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
		</MotionListItem>
	)
}
