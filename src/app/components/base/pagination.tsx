import React, { useState, useMemo, useCallback, useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination'
import _ from 'lodash'

type AutoPaginationProps = {
	curPage: number;
	count: number;
	viewRadius: number;
	onChange: (page: number) => void;
	size?: 'sm' | 'lg';
}
export const AutoPagination: React.FC<AutoPaginationProps> = (props: AutoPaginationProps) => {

	const { count, onChange, viewRadius, size, curPage } = props
	const [page, setPage] = useState(1)
	const [pages, setPages] = useState<number[]>([])
	const viewCount = useMemo(() => viewRadius * 2 + 1, [viewRadius])

	const pageSelect = useCallback((idx: number) => {
		onChange(idx)
	}, [onChange])

	useEffect(() => {
		setPage(curPage)
	}, [curPage])

	const buildPageinationItems = useCallback((pages: number[]) => {
		return pages.map((pageNo: number, idx: number) => (
			pageNo === 0 ? (
				<Pagination.Ellipsis
					onClick={() => pageSelect(idx === 0 ? pages[idx + 1] - 1 : pages[pages.length - 2] + 1)}
					key={idx}
				/>
			) : (
				<Pagination.Item
					onClick={() => pageSelect(pageNo)} active={pageNo === page}
					key={idx}
				>
					{pageNo}
				</Pagination.Item>
			)
		))
	}, [pageSelect, page])

	useEffect(() => {
		if (pages.includes(page)) return;

		if (count <= (viewCount + 2)) {
			setPages(_.range(1, count + 1))
		} else {
			let pages = []
			if (page > viewCount) {
				if (page > (count - viewCount)) {
					pages = _.range(count - viewCount + 1, count + 1)
					pages.unshift(0)
				} else {
					pages = _.range(page - viewRadius, page + viewRadius + 1)
					pages.unshift(0)
					pages.push(0)
				}
			} else {
				pages = _.range(1, viewCount + 1)
				pages.push(0)
			}

			setPages(pages)
		}
		// eslint-disable-next-line
	}, [page, viewCount, count])

	const items = useMemo(() => buildPageinationItems(pages), [pages, buildPageinationItems])

	return (
		<Pagination size={size}>
			{count > (viewCount + 2) && (
				<>
					<Pagination.First disabled={page === 1} onClick={() => pageSelect(1)}/>
					<Pagination.Prev disabled={page === 1} onClick={() => pageSelect(page - 1)} />
				</>
			)}
			{items}
			{count > (viewCount + 2) && (
				<>
					<Pagination.Next disabled={page === count} onClick={() => pageSelect(page + 1)} />
					<Pagination.Last disabled={page === count} onClick={() => pageSelect(count)} />
				</>
			)}
		</Pagination>
	)
}
