/// <reference types="node" />
import { Credentials, OAuth2Client } from 'google-auth-library';
import { oauth2_v2 } from "googleapis";
export declare class GoogleService {
    private readonly options;
    generateAuthURL(client: OAuth2Client, accessType: 'offline' | 'online', scope: string[]): string;
    setCredentials(client: OAuth2Client, code: string): Promise<Credentials>;
    getTokenInfo(authUser: oauth2_v2.Oauth2): Promise<{
        (params: oauth2_v2.Params$$Tokeninfo, options: import("googleapis-common").StreamMethodOptions): import("gaxios").GaxiosPromise<import("stream").Readable>;
        (params?: oauth2_v2.Params$$Tokeninfo, options?: import("googleapis-common").MethodOptions): import("gaxios").GaxiosPromise<oauth2_v2.Schema$Tokeninfo>;
        (params: oauth2_v2.Params$$Tokeninfo, options: import("googleapis-common").StreamMethodOptions | import("googleapis-common").BodyResponseCallback<import("stream").Readable>, callback: import("googleapis-common").BodyResponseCallback<import("stream").Readable>): void;
        (params: oauth2_v2.Params$$Tokeninfo, options: import("googleapis-common").MethodOptions | import("googleapis-common").BodyResponseCallback<oauth2_v2.Schema$Tokeninfo>, callback: import("googleapis-common").BodyResponseCallback<oauth2_v2.Schema$Tokeninfo>): void;
        (params: oauth2_v2.Params$$Tokeninfo, callback: import("googleapis-common").BodyResponseCallback<oauth2_v2.Schema$Tokeninfo>): void;
        (callback: import("googleapis-common").BodyResponseCallback<oauth2_v2.Schema$Tokeninfo>): void;
    }>;
    getUserInfo(authUser: oauth2_v2.Oauth2): Promise<oauth2_v2.Schema$Userinfo>;
    getAuthClient(): OAuth2Client;
    getAuthUser(client: OAuth2Client): oauth2_v2.Oauth2;
}
