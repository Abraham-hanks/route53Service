import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CHANGE_RESOURCE_RECORD_SETS_ACTION } from './constants';
import { CreateRecordDto } from './create-record.dto';
import { DnsService } from './dns.service';

@ApiTags('DNS')
@ApiBearerAuth('JWT')
@Controller('dns')
export class DnsController {
  constructor(
    private readonly dnsService: DnsService,
  ) {}

  @Get('hostedZones')
  async getHostedZonesList() {
    return this.dnsService.getHostedZonesList();
  }

  @Get('hostedZonesName')
  async getHostedZonesByName() {
    return this.dnsService.getHostedZonesByName();
  }

  @Post('changeResourceRecordSets')
  async createChangeResourceRecordSets(
    @Body() newRecord: CreateRecordDto
  ) {
    newRecord.action = CHANGE_RESOURCE_RECORD_SETS_ACTION.create;
    
    return this.dnsService.createChangeResourceRecordSets(newRecord);
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
