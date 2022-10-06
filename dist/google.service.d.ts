import { Credentials } from 'google-auth-library';
import { oauth2_v2 } from "googleapis";
export declare class GoogleService {
    private readonly options;
    private readonly oAuth2Client;
    private oAuth2User;
    constructor(options: Record<string, any>);
    generateAuthURL(accessType: 'offline' | 'online', scope: string[]): string;
    setCredentials(code: string): Promise<Credentials>;
    getTokenInfo(token: string): Promise<import("google-auth-library").TokenInfo>;
    getUserInfo(): Promise<oauth2_v2.Schema$Userinfo>;
}
