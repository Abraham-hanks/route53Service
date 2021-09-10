import { Module } from '@nestjs/common';
import { DnsModule } from '../dns/dns.module';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [DnsModule],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
