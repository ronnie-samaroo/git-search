import React from 'react'
import { AppRouter } from './modules';
import { GlobalContainer } from './container';
import 'assets/styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CacheContainer } from './shared/cache';

const App: React.FC = () => {
	return (
		<GlobalContainer>
			<CacheContainer>
				<AppRouter />
			</CacheContainer>
		</GlobalContainer>
	);
}

export default App;
