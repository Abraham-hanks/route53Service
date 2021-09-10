import { Body, Controller, Post } from '@nestjs/common';
import { CHANGE_RESOURCE_RECORD_SETS_ACTION } from '../dns/constants';
import { CreateRecordDto } from '../dns/dto/create-record.dto';
import { CloudfrontService } from '../dns/services/cloudfront.service';
import { DnsService } from '../dns/services/dns.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { CreateSubdomainDto } from './dto/create-subdomain.dto';

@Controller('client')
export class ClientsController {
  constructor(
    private readonly dnsService: DnsService,
    private readonly cloudfrontService: CloudfrontService,
  ) {}

  @Post('subdomain')
  async createSubdomain(
    @Body() newSubdomain: CreateSubdomainDto
  ) {
    const dns = await this.dnsService.createCloudfrontAlias({
      name: newSubdomain.name,
      cloudfront_domain_name: newSubdomain.cloudfront_domain_name,
      hosted_zone_id: newSubdomain.hosted_zone_id,
      comment: newSubdomain.comment
    });

    await this.cloudfrontService.addAlias(newSubdomain.name, newSubdomain.cloudfront_domain_name);

    return {
      aws_response: dns,
    };
  }

  @Post('domain')
  async createDomain(
    @Body() newDomain: CreateDomainDto
  ) {
    const hostedZone = await this.dnsService.createHostedZone({
      name: newDomain.name,
      comment: newDomain.comment,
      private_zone: false,
    })

    await this.dnsService.createCloudfrontAlias({
      name: newDomain.name,
      cloudfront_domain_name: newDomain.cloudfront_domain_name,
      hosted_zone_id: hostedZone.HostedZone.Id,
      comment: newDomain.comment
    });
    
    await this.cloudfrontService.addAlias(newDomain.name, newDomain.cloudfront_domain_name);

    return {
      ns_records: hostedZone.DelegationSet.NameServers
    };
  }
}
