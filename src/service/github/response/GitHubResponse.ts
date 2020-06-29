import {GitHubItemResponse} from './GitHubItemResponse';

export interface GitHubResponse {
    incomplete_results: boolean;
    items: Array<GitHubItemResponse>;
    total_count: number;
}
