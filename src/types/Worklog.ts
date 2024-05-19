interface Worklog {
    id: string;
    author: {
        emailAddress: string;
        displayName: string;
        avatarUrls: AvatarUrls;
    };
    issueId: string;
    issue: {
        id: string;
        key: string;
        fields: {
            aggregatetimespent: number;
            issuetype: {
                description: string;
                iconUrl: string;
                name: string;
            };
            timeSpent: number;
            project: {
                key: string;
                name: string;
                avatarUrls: AvatarUrls;
            };
            lastViewed: string;
            created: string;
            priority: {
                id: string;
                iconUrl: string;
                name: string;
            };
            status: {
                iconUrl: string;
                name: string;
            };
            creator: {
                displayName: string;
                avatarUrls: AvatarUrls;
            };
            description: string;
            summary: string;
        };
    };
    timeSpent: string;
    timeSpentSeconds: number;
    created: string;
    updated: string;
    started: string;
}

interface AvatarUrls {
    '48x48': string;
    '24x24': string;
    '16x16': string;
    '32x32': string;
}

export type { Worklog };
