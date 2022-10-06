"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
let GoogleService = class GoogleService {
    constructor(options) {
        this.options = options;
        this.oAuth2Client = new googleapis_1.google.auth.OAuth2(this.options.clientId, this.options.secret, this.options.redirectUri);
    }
    generateAuthURL(accessType, scope) {
        const url = this.oAuth2Client.generateAuthUrl({
            access_type: accessType,
            scope
        });
        return url;
    }
    async setCredentials(code) {
        const { tokens } = await this.oAuth2Client.getToken(code);
        this.oAuth2Client.setCredentials(tokens);
        this.oAuth2User = googleapis_1.google.oauth2({
            auth: this.oAuth2Client,
            version: "v2"
        });
        return tokens;
    }
    async getTokenInfo(token) {
        return this.oAuth2Client.getTokenInfo(token);
    }
    async getUserInfo() {
        return (await this.oAuth2User.userinfo.get()).data;
    }
};
GoogleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('GOOGLE_OPTIONS')),
    __metadata("design:paramtypes", [Object])
], GoogleService);
exports.GoogleService = GoogleService;
//# sourceMappingURL=google.service.js.map