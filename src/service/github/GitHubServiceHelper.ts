import { GitHubResponse } from './response/GitHubResponse';
import { GitHubModel} from './GitHubModel';
import { GitHubItemModel } from './GitHubItemModel';
import { GitHubItemResponse } from './response/GitHubItemResponse';

export class GitHubServiceHelper {
    public static mappingGitHubResponse(response: GitHubResponse): GitHubModel {
        return GitHubModel.create({
            incompleteResults: response.incomplete_results,
            items: GitHubServiceHelper.mappingGitHubItemResponse(response.items),
            totalCount: response.total_count
        })
    }

    public static mappingGitHubItemResponse(items: Array<GitHubItemResponse>): Array<GitHubItemModel> {
        return items.map((item: GitHubItemResponse) => {
            return GitHubItemModel.create({
                avatarUrl: item.avatar_url,
                eventsUrl: item.events_url,
                followersUrl: item.followers_url,
                followingUrl: item.following_url,
                gistsUrl: item.gists_url,
                gravatarId: item.gravatar_id,
                htmlUrl: item.html_url,
                id: item.id,
                login: item.login,
                nodeId: item.node_id,
                organizationsUrl: item.organizations_url,
                receivedEventsUrl: item.received_events_url,
                reposUrl: item.repos_url,
                score: item.score,
                siteAdmin: item.site_admin,
                starredUrl: item.starred_url,
                subscriptionsUrl: item.subscriptions_url,
                type: item.type,
                url: item.url
            });
        });
    }
}
