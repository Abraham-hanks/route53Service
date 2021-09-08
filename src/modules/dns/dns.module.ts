import { Module } from '@nestjs/common';
import { CloudfrontController } from './controller/cloudfront.controller';
import { DnsController } from './controller/dns.controller';
import { DnsProvider } from './dns.providers';
import { CloudfrontService } from './services/cloudfront.service';
import { DnsService } from './services/dns.service';

@Module({
  controllers: [
    DnsController,
    CloudfrontController,
  ],
  providers: [
    DnsService,
    CloudfrontService,
    ...DnsProvider
  ]
})
export class DnsModule {}
