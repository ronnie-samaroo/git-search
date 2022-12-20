export type Owner = {
	id: number;
	login: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
}

export interface SearchItem {
	id: number;
	node_id: string;
	name: string;
	full_name: string;
	owner: Owner;
	stargazers_count: number;
	created_at: string;
}

export interface SearchResult {
	total_count: number;
	incomplete_results: boolean;
	items: SearchItem[]
}

export interface SearchParam {
	page: number;
	pageSize: number;
	sort: string;
	order: string;
	query: string;
}