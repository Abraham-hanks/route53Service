import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { ClientsModule } from './modules/clients/clients.module';
import { DnsModule } from './modules/dns/dns.module';

@Module({
  imports: [
    ClientsModule,
    DatabaseModule,
    DnsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
