import { GitHubItemModel } from './GitHubItemModel';

export class GitHubModel {
    constructor(
        public incompleteResults: boolean,
        public items: Array<GitHubItemModel>,
        public totalCount: number
    ) {
        // tslint:disable:empty-block;
    }

    public static create(res: GitHubModel): GitHubModel {
        return new GitHubModel(
            res.incompleteResults,
            res.items,
            res.totalCount
        );
    }
}