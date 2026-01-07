import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    TerminusModule,
    HttpModule,

    // Rate limiting configuration (official syntax)
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 60 seconds (milliseconds as per docs)
          limit: 10, // max 100 requests
        },
      ],
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,

    // lobal guard binding (REQUIRED in v6)
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
