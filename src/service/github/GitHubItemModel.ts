export class GitHubItemModel {
    constructor(
        public avatarUrl: string,
        public eventsUrl: string,
        public followersUrl: string,
        public followingUrl: string,
        public gistsUrl: string,
        public gravatarId: string,
        public htmlUrl: string,
        public id: number,
        public login: string,
        public nodeId: string,
        public organizationsUrl: string,
        public receivedEventsUrl: string,
        public reposUrl: string,
        public score: number,
        public siteAdmin: string,
        public starredUrl: string,
        public subscriptionsUrl: string,
        public type: string,
        public url: string
    ) {
    }

    public static create(response: GitHubItemModel): GitHubItemModel {
        return new GitHubItemModel(
            response.avatarUrl,
            response.eventsUrl,
            response.followersUrl,
            response.followingUrl,
            response.gistsUrl,
            response.gravatarId,
            response.htmlUrl,
            response.id,
            response.login,
            response.nodeId,
            response.organizationsUrl,
            response.receivedEventsUrl,
            response.reposUrl,
            response.score,
            response.siteAdmin,
            response.starredUrl,
            response.subscriptionsUrl,
            response.type,
            response.url
        );
    }
}
