import { Module } from '@nestjs/common';
import { DnsController } from './dns.controller';
import { DnsProvider } from './dns.providers';
import { CloudfrontService } from './services/cloud-front.service';
import { DnsService } from './services/dns.service';

@Module({
  controllers: [DnsController],
  providers: [
    DnsService,
    CloudfrontService,
    ...DnsProvider
  ]
})
export class DnsModule {}
