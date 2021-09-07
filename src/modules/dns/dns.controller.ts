import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CHANGE_RESOURCE_RECORD_SETS_ACTION } from './constants';
import { CreateRecordDto } from './create-record.dto';
import { CloudfrontService } from './services/cloudfront.service';
import { DnsService } from './services/dns.service';

@ApiTags('DNS')
@ApiBearerAuth('JWT')
@Controller('dns')
export class DnsController {
  constructor(
    private readonly dnsService: DnsService,
    private readonly cloudfrontService: CloudfrontService,
  ) {}

  @Get('hostedZones')
  async getHostedZonesList() {
    return this.dnsService.getHostedZonesList();
  }

  @Get('hostedZonesName')
  async getHostedZonesByName() {
    return this.dnsService.getHostedZonesByName();
  }

  @Get('distributions')
  async getDistributions() {
    return this.cloudfrontService.listDistributions();
  }

  @Get('distributions/id')
  async getDistributionById() {
    return this.cloudfrontService.getById();
  }

  @Get('distributions/id/config')
  async getDistributionConfig() {
    return this.cloudfrontService.getConfig();
  }


  @Post('changeResourceRecordSets')
  async createChangeResourceRecordSets(
    @Body() newRecord: CreateRecordDto
  ) {
    newRecord.action = CHANGE_RESOURCE_RECORD_SETS_ACTION.create;

    const dns = await this.dnsService.createChangeResourceRecordSets(newRecord);
    await this.cloudfrontService.addAlias(newRecord.name);

    return dns;
  }

  @Put('changeResourceRecordSets')
  async updateChangeResourceRecordSets() {
    return this.dnsService.updateChangeResourceRecordSets();
  }

  @Delete('changeResourceRecordSets')
  async deleteChangeResourceRecordSets() {
    return this.dnsService.deleteChangeResourceRecordSets();
  }
}
