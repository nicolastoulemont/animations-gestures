import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
			</Head>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider resetCSS={true}>
					<Component {...pageProps} />
				</ChakraProvider>
			</QueryClientProvider>
			<style jsx global>
				{`
					* {
						box-sizing: border-box;
					}

					html,
					body,
					#__next {
						height: 100%;
						width: 100%;
					}

					main {
						height: 100%;
						width: 100%;
					}
				`}
			</style>
		</>
	)
}

export default MyApp
