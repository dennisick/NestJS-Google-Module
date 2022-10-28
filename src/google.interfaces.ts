import { ModuleMetadata, Type } from "@nestjs/common";

export interface GoogleModuleOptions {
    clientId: string;
    secret: string;
    redirectUri: string;
    isGlobal?: boolean;
}

export interface GoogleOptionsFactory {
    createGoogleOptions(): Promise<GoogleModuleOptions> | GoogleModuleOptions;
}

export interface GoogleModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    isGlobal?: boolean;
    useExisting?: Type<GoogleOptionsFactory>;
    useClass?: Type<GoogleOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<GoogleModuleOptions> | GoogleModuleOptions;
    inject?: any[];
}