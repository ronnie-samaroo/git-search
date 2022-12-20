import React, { ChangeEvent, useCallback, useState, MouseEvent, KeyboardEvent } from 'react'
import { Button, FormControl } from 'react-bootstrap'
import styles from './search-bar.module.scss'

type SearchInputBarProps = {
	className?: string;
	onSearch: (txt: string) => void;
}
export const SearchInputBar: React.FC<SearchInputBarProps> = (props: SearchInputBarProps) => {

	const { onSearch, className } = props
	const [value, setValue] = useState('')

	const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}, [])

	const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
		e.preventDefault()
		onSearch(value)
	}, [value, onSearch])

	const handleKeyPress = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onSearch(value)
		}
	}, [value, onSearch])

	return (
		<div className={className ? `${styles.control} ${className}` : styles.control}>
			<i className={`fa fa-search ${styles.prepend}`} />
			<FormControl onChange={handleChange} value={value} placeholder='Search ...' onKeyPress={handleKeyPress} />
			<Button variant='primary' onClick={handleClick} className='mx-2'>
				<i className='fa fa-search' />
			</Button>
		</div>
	)
}
