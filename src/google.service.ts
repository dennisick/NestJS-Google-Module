import { Inject, Injectable } from '@nestjs/common';
import { google } from "googleapis";

@Injectable()
export class GoogleService {

  private readonly oAuth2Client;

  constructor(@Inject('GOOGLE_OPTIONS') private readonly options: Record<string, any>) {
      this.oAuth2Client = new google.auth.OAuth2(
        options.clientId,
        options.secret,
        options.redirectUri
      );
  }

  public generateAuthURL(accessType: 'offline' | 'online', scope: string[]): string {
    const url = this.oAuth2Client.generateAuthUrl({
      access_type: accessType,
      scope
    });

    return url;
  }

  public async getTokens(code: string) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    return tokens;
  }

  public async getProfile(token: string) {
    const oAuth2 = google.oauth2({
      auth: this.oAuth2Client,
      version: 'v2'
    });

    const { data } = await oAuth2.userinfo.get();
    return data;
  }

}
