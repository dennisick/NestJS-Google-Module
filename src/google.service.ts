import { Inject, Injectable } from '@nestjs/common';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { google, oauth2_v2 } from "googleapis";

@Injectable({  })
export class GoogleService {

  @Inject('GOOGLE_OPTIONS') 
  private readonly options: Record<string, any>

  /**
   * This method generates a Google OAuth2 login URL for the user.
   * After the user has successfully logged in, Google redirects the user
   * to the redirect_uri and passes the "code" in the query of the GET request
   * to get the JWT token "access_token" 
   * 
   * @param accessType type 'offline' gives a refresh_token to refesh the access_token and type 'online' gives only an access_token
   * @param scope Hand over the features of the Google API to get access to it (e.g email & profile)
   * @returns (string) The Google OAuth2 login URL for the user
   */
  public generateAuthURL(client: OAuth2Client, accessType: 'offline' | 'online', scope: string[]): string {
    const url = client.generateAuthUrl({
      access_type: accessType,
      scope
    });

    return url;
  }

  public async setCredentials(client: OAuth2Client, code: string): Promise<Credentials> {
    const { tokens }: GetTokenResponse = await client.getToken(code);
    client.setCredentials(tokens);

    return tokens;
  }

  public async getTokenInfo(authUser: oauth2_v2.Oauth2) {
    return authUser.tokeninfo;
  }

  public async getUserInfo(authUser: oauth2_v2.Oauth2) {
    return (await authUser.userinfo.get()).data;
  }

  public getAuthClient(): OAuth2Client {
    return new google.auth.OAuth2(
      this.options.clientId,
      this.options.secret,
      this.options.redirectUri
    );
  }

  public getAuthUser(client: OAuth2Client): oauth2_v2.Oauth2 {
    return google.oauth2({
      auth: client,
      version: "v2"
    });
  }

}
