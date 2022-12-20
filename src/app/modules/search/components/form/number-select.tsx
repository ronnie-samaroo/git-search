import React, { useCallback, ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'

type NumberSelectProps = {
	sizes: number[];
	value: number;
	onChange: (num: number) => void;
	label?: string;
	selectClass?: string;
}
export function NumberSelect(props: NumberSelectProps): JSX.Element {

	const { onChange, value, sizes, label, selectClass } = props
	const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
		onChange(parseInt(e.target.value))
	}, [onChange])

	return (
		<Form.Group className='d-flex align-items-center m-0'>
			{label && <Form.Label className='m-0'>{label} &nbsp;</Form.Label>}
			<Form.Control as='select' className={selectClass} value={value} onChange={handleChange}>
				{sizes.map((size) => (
					<option value={size} key={size}>{size}</option>
				))}
			</Form.Control>
		</Form.Group>
	)
}
