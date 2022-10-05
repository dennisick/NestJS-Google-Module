export declare class GoogleService {
    private readonly options;
    private readonly oAuth2Client;
    constructor(options: Record<string, any>);
    generateAuthURL(accessType: 'offline' | 'online', scope: string[]): string;
    getTokens(code: string): Promise<any>;
}
