import { DynamicModule, Module } from '@nestjs/common';
import { GoogleService } from './google.service';

@Module({})
export class GoogleModule {

  static register(options: Record<string,any>): DynamicModule {
    return {
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

}
