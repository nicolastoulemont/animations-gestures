/* 
Based on the Framer-motion code sandbox example :
https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?fontsize=14&module=/src/Example.tsx
*/
import Head from 'next/head'
import { Box, Button, Flex } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import NextLink from 'next/link'
import { useImages } from 'lib'
import { useState } from 'react'
import { wrap } from 'popmotion'

const variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		y: 0,
		opacity: 0
	}),
	center: {
		zIndex: 1,
		x: 0,
		y: 0,
		opacity: 1
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? 1000 : -1000,
		y: 0,
		opacity: 0
	})
}

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity
}

export default function Home() {
	const [[page, direction], setPage] = useState([0, 0])

	const { data: images } = useImages()

	const imageIndex = wrap(0, images?.length || 0, page)

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection])
	}

	return (
		<>
			<Head>
				<title>Image SlideShow</title>
			</Head>

			<Box as='main' width='100%' boxSizing='border-box'>
				<Flex as='nav' width='100%' align='center' justify='flex-start' p={3}>
					<NextLink href='/' passHref>
						<Button as='a'>Retour</Button>
					</NextLink>
				</Flex>
				<Box p={3} width='100%' height='80vh' boxSizing='border-box'>
					<AnimatePresence initial={false} custom={direction}>
						{images ? (
							<motion.img
								style={{
									position: 'absolute',
									width: 'calc(100% - 1.5rem)',
									borderRadius: '10px'
								}}
								key={page}
								src={images[imageIndex].imageSrcUrl}
								custom={direction}
								variants={variants}
								initial='enter'
								animate='center'
								exit='exit'
								transition={{
									x: { type: 'spring', stiffness: 300, damping: 30 },
									opacity: { duration: 0.2 }
								}}
								drag='x'
								dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
								dragElastic={1}
								onDragEnd={(e, { offset, velocity }) => {
									const swipe = swipePower(offset.x, velocity.x)

									if (swipe < -swipeConfidenceThreshold) {
										paginate(1)
									} else if (swipe > swipeConfidenceThreshold) {
										paginate(-1)
									}
								}}
							/>
						) : null}
					</AnimatePresence>
				</Box>
			</Box>
		</>
	)
}
