import Head from 'next/head'
import { Box, chakra, UnorderedList, Link, Heading, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
const MotionListItem = chakra(motion.li)

export default function Home() {
	const links = [
		{
			href: '/drag-and-reorder',
			heading: 'Drag and reorder',
			text: 'Using framer-motion to perform drag to reorder ops'
		},
		{
			href: '/list-items-presence',
			heading: 'List items presence',
			text: 'Using framer-motion to animate some list item presence'
		},
		{
			href: '/images-slideshow',
			heading: 'Images slideshow',
			text: 'Slide image on swipe'
		}
	]

	return (
		<>
			<Head>
				<title>Mobile gesture testing with framer motion</title>
			</Head>

			<Box as='main' width='100%' boxSizing='border-box' p={3}>
				<UnorderedList m={0}>
					{links.map((link, index) => (
						<MotionListItem
							key={index}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							ml='auto'
							mr='auto'
							mb={index !== links.length - 1 ? 6 : 0}
							maxW={{ base: '100%', md: '50%' }}
							listStyleType='none'
						>
							<NextLink href={link.href} passHref>
								<Link width='100%'>
									<Box
										width='100%'
										borderRadius='10px'
										p={3}
										boxShadow='rgba(0, 0, 0, 0.2) 0px 3px 8px'
									>
										<Heading size='md'>{link.heading}</Heading>
										<Text>{link.text}</Text>
									</Box>
								</Link>
							</NextLink>
						</MotionListItem>
					))}
				</UnorderedList>
			</Box>
		</>
	)
}
