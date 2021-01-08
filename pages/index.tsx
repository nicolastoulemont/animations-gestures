import Head from 'next/head'
import { Box, chakra, UnorderedList, Link, Heading, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
const MotionListItem = chakra(motion.li)

export default function Home() {
	return (
		<>
			<Head>
				<title>Mobile gesture testing with framer motion</title>
			</Head>

			<Box as='main' width='100%' boxSizing='border-box' p={3}>
				<UnorderedList m={0}>
					<MotionListItem initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						<NextLink href='/drag-and-reorder' passHref>
							<Link width='100%'>
								<Box
									width='100%'
									borderRadius='10px'
									p={3}
									boxShadow='rgba(0, 0, 0, 0.2) 0px 3px 8px'
								>
									<Heading size='md'>Drag and reorder</Heading>
									<Text>Using framer-motion to perform drag to reorder ops</Text>
								</Box>
							</Link>
						</NextLink>
					</MotionListItem>
				</UnorderedList>
			</Box>
		</>
	)
}
