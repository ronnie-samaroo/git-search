import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useLocation } from 'react-router'

export const Header: React.FC = () => {

	const location = useLocation()
	return (
		<Navbar bg="dark" variant="dark" className='px-3'>
			<Navbar.Brand href="/">Home</Navbar.Brand>
			<Nav className="me-auto">
				<Nav.Link href="/search" className={location.pathname.startsWith('/search') ? 'active' : ''}>
					Search
				</Nav.Link>
			</Nav>
		</Navbar>
	)
}
