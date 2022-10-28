import { DynamicModule } from '@nestjs/common';
import { GoogleModuleAsyncOptions, GoogleModuleOptions } from './google.interfaces';
export declare class GoogleModule {
    static register(options: GoogleModuleOptions): DynamicModule;
    static registerAsync(options: GoogleModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
