import { Module } from '@nestjs/common';
import { DnsController } from './dns.controller';
import { DnsProvider } from './dns.providers';
import { DnsService } from './dns.service';

@Module({
  controllers: [DnsController],
  providers: [DnsService, ...DnsProvider]
})
export class DnsModule {}
