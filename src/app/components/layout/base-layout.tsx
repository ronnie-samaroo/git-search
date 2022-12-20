import React from 'react'
import { Helmet } from "react-helmet"
import { Header } from './header'
import { Footer } from './footer'
import { useTitle } from 'app/container'


export const BaseLayout: React.FC<React.PropsWithChildren<{}>> = (props) => {
	const title = useTitle()
	return (
		<div className='h-100 d-flex flex-column'>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<Header />
			<main className='flex-fill'>
				{props.children}
			</main>
			<Footer />
		</div>
	)
}
