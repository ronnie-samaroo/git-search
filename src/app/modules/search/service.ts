import { RestClient } from "app/shared/services"
import { SearchParam, SearchResult } from "./types"
import { Cache } from "app/shared/cache"
import { keyForSearch } from "app/helpers/cache-key"

const BASE_URL = 'https://api.github.com/search/repositories'
type GitSearchRepo = (param: SearchParam, cache: Cache) => Promise<SearchResult>
export const searchGit: GitSearchRepo = async (param: SearchParam, cache: Cache) => {
	if (!param.query) {
		return {} as SearchResult
	}
	const params: any = {
		q: param.query,
		page: param.page,
		per_page: param.pageSize
	}
	if (param.sort) {
		params.sort = param.sort
		params.order = param.order
	}

	const key = keyForSearch(params)
	const cached = cache.get(key)
	if (cached) {
		return cached as unknown as SearchResult
	} else {
		return await RestClient.get(
			BASE_URL, { params }
		).then(data => {
			cache.set(key, data)
			return data as unknown as SearchResult
		})
	}
}