import React, { useState, useEffect, useCallback } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { SortTable } from 'app/components/table/sort-table'
import { AutoPagination } from 'app/components/base/pagination'
import { SearchInputBar } from 'app/components/form/search-bar'
import { NumberSelect } from '../form/number-select'
import { PageParam, usePagedSource, useWindowSize } from 'app/shared/hooks'
import { SearchResult, SearchItem, SearchParam } from '../../types'

type DataTableProps = {
	title?: string;
	fetchFn: (param: SearchParam) => Promise<SearchResult>
}
export function DataTable(props: DataTableProps): JSX.Element {

  const { title, fetchFn } = props
  const [pageNum, setPageNum] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [pageCount, setPageCount] = useState(0)

  const [sortKey, setSortKey] = useState('')
	const [sortUp, setSortUp] = useState(false)
	const [query, setQuery] = useState('')

  const [data, setData] = useState<SearchItem[]>([])
  const windowSize = useWindowSize()

  const onSearch = useCallback((query: string) => {
		setQuery(query)
	}, [])

  const changePageSize = useCallback((size: number) => {
    const pos = (pageNum - 1) * pageSize
    setPageNum(Math.floor(pos / size) + 1)
    setPageSize(size)
  }, [pageNum, pageSize])

  const changePage = useCallback((page: number) => {
    setPageNum(page)
  }, [])

  const onSort = useCallback((key: string, up: boolean) => {
		setSortKey(key)
		setSortUp(up)
	}, [])

  const pagedFetch = useCallback(async (param: PageParam) => {
    return await fetchFn({
      page: param.page, 
      pageSize: param.pageSize,
      query,
      sort: sortKey,
      order: sortUp ? 'asc' : 'desc'
    })
  }, [query, sortKey, sortUp, fetchFn])

  const [source, error, loading] = usePagedSource(pageNum, pageSize, pagedFetch)

  useEffect(() => {
    setData(source?.items ?? [])
    setPageCount(source ? Math.ceil(Math.min(source.total_count, 1000) / pageSize) : 0)
  }, [source, pageSize])

  return (
    <>
      <h1>{title}</h1>
      <div className='action-bar'>
        <SearchInputBar onSearch={onSearch} className='search-bar' />
        <NumberSelect
          sizes={[5, 10, 20, 50]}
          onChange={changePageSize}
          value={pageSize}
          label='Page Size'
          selectClass='number-select'
        />
      </div>
      <div className='position-relative'>
        {loading && <Spinner animation="border" variant="primary" className='absolute-center' />}
        {error && <span className='error-message'>{error}</span>}
        {pageCount ? (
          <SortTable
            onSort={onSort}
            sort={sortKey}
            colgroups={['30%', '30%', '15%', '25%']}
            columns={[
              { title: 'Name', key: 'name', sortable: true },
              { title: 'Owner', key: 'owner', sortable: true },
              { title: 'Stars', key: 'stars', sortable: true },
              { title: 'Created at', key: 'created', sortable: true }
            ]}
          >
            <tbody>
              {data.map((item: SearchItem) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.owner.login}</td>
                  <td>{item.stargazers_count}</td>
                  <td>{item.created_at}</td>
                </tr>
              ))}
            </tbody>
          </SortTable>
        ) : (
          <div className='text-center'>
            No Data
          </div>
        )}
      </div>
      {pageCount > 1 && (
        <div className='d-flex justify-content-center align-items-center mt-3'>
          <AutoPagination
            curPage={pageNum}
            count={pageCount}
            onChange={changePage}
            viewRadius={2}
            size={windowSize.width < 480 ? 'sm' : undefined}
          />
        </div>
      )}
    </>
  )
}

