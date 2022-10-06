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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
let GoogleService = class GoogleService {
    generateAuthURL(client, accessType, scope) {
        const url = client.generateAuthUrl({
            access_type: accessType,
            scope
        });
        return url;
    }
    async setCredentials(client, code) {
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);
        return tokens;
    }
    async getTokenInfo(authUser) {
        return authUser.tokeninfo;
    }
    async getUserInfo(authUser) {
        return (await authUser.userinfo.get()).data;
    }
    getAuthClient() {
        return new googleapis_1.google.auth.OAuth2(this.options.clientId, this.options.secret, this.options.redirectUri);
    }
    getAuthUser(client) {
        return googleapis_1.google.oauth2({
            auth: client,
            version: "v2"
        });
    }
};
__decorate([
    (0, common_1.Inject)('GOOGLE_OPTIONS'),
    __metadata("design:type", Object)
], GoogleService.prototype, "options", void 0);
GoogleService = __decorate([
    (0, common_1.Injectable)({})
], GoogleService);
exports.GoogleService = GoogleService;
//# sourceMappingURL=google.service.js.map