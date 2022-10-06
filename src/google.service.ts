import { Inject, Injectable } from '@nestjs/common';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { GetTokenResponse } from 'google-auth-library/build/src/auth/oauth2client';
import { google, oauth2_v2 } from "googleapis";

@Injectable()
export class GoogleService {

  private readonly oAuth2Client: OAuth2Client;
  private oAuth2User: oauth2_v2.Oauth2;

  constructor(@Inject('GOOGLE_OPTIONS') private readonly options: Record<string, any>) {
      this.oAuth2Client = new google.auth.OAuth2(
        this.options.clientId,
        this.options.secret,
        this.options.redirectUri
      );
  }

  public generateAuthURL(accessType: 'offline' | 'online', scope: string[]): string {
    const url = this.oAuth2Client.generateAuthUrl({
      access_type: accessType,
      scope
    });

    return url;
  }

  public async setCredentials(code: string): Promise<Credentials> {
    const { tokens }: GetTokenResponse = await this.oAuth2Client.getToken(code);
    this.oAuth2Client.setCredentials(tokens);

    this.oAuth2User = google.oauth2({
      auth: this.oAuth2Client,
      version: "v2"
    });

    return tokens;
  }

  public async getTokenInfo(token: string) {
    return this.oAuth2Client.getTokenInfo(token);
  }

  public async getUserInfo() {
    return (await this.oAuth2User.userinfo.get()).data;
  }

}
