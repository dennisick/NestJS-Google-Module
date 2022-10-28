import { DynamicModule, Module, Provider } from '@nestjs/common';
import { GoogleService } from './google.service';
import { GoogleModuleAsyncOptions, GoogleModuleOptions, GoogleOptionsFactory } from './google.interfaces';

@Module({})
export class GoogleModule {

  static register(options: GoogleModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: GoogleModule,
      providers: [
        {
          provide: 'GOOGLE_OPTIONS',
          useValue: options
        },
        GoogleService
      ],
      exports: [GoogleService]
    }
  }

  static registerAsync(options: GoogleModuleAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: GoogleModule,
      imports: options.imports || [],
      exports: [GoogleService],
      providers: [...this.createAsyncProviders(options), GoogleService]
    }
  }

  private static createAsyncProviders(options: GoogleModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ]
  }

  private static createAsyncOptionsProvider(options: GoogleModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: 'GOOGLE_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }

    return {
      provide: 'GOOGLE_OPTIONS',
      useFactory: async (optionsFactory: GoogleOptionsFactory) => await optionsFactory.createGoogleOptions(),
      inject: [options.useExisting || options.useClass]
    }
  }

}
