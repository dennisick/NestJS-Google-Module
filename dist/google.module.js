"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GoogleModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleModule = void 0;
const common_1 = require("@nestjs/common");
const google_service_1 = require("./google.service");
let GoogleModule = GoogleModule_1 = class GoogleModule {
    static register(options) {
        return {
            global: options.isGlobal,
            module: GoogleModule_1,
            providers: [
                {
                    provide: 'GOOGLE_OPTIONS',
                    useValue: options
                },
                google_service_1.GoogleService
            ],
            exports: [google_service_1.GoogleService]
        };
    }
    static registerAsync(options) {
        return {
            global: options.isGlobal,
            module: GoogleModule_1,
            imports: options.imports || [],
            exports: [google_service_1.GoogleService],
            providers: [...this.createAsyncProviders(options), google_service_1.GoogleService]
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass
            }
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: 'GOOGLE_OPTIONS',
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        return {
            provide: 'GOOGLE_OPTIONS',
            useFactory: async (optionsFactory) => await optionsFactory.createGoogleOptions(),
            inject: [options.useExisting || options.useClass]
        };
    }
};
GoogleModule = GoogleModule_1 = __decorate([
    (0, common_1.Module)({})
], GoogleModule);
exports.GoogleModule = GoogleModule;
//# sourceMappingURL=google.module.js.map