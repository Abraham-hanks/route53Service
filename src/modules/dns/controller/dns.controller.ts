import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateHostedZoneDto } from '../dto/create-hosted-zone.dto';
import { CreateRecordDto } from '../dto/create-record.dto';
import { HostedZoneQueryFiltersDto } from '../dto/hosted-zone-query-filters.dto';
import { DnsService } from '../services/dns.service';

@ApiTags('DNS')
@ApiBearerAuth('JWT')
@Controller('dns')
export class DnsController {
  constructor(
    private readonly dnsService: DnsService,
  ) {}

  @Get('hostedZone')
  async getHostedZoneList(
    @Query() query: HostedZoneQueryFiltersDto,
  ) {
    return this.dnsService.getHostedZonesList(query);
  }

  // @Get('hostedZoneName')
  // async getHostedZonesByName() {
  //   return this.dnsService.getHostedZonesByName();
  // }

  @Get('hostedZone/:id')
  async getHostedZoneById(
    @Param('id') id: string,
  ) {
    return this.dnsService.getHostedZoneById(id);
  }

  @Post('hostedZone')
  async createHostedZone(@Body() newHostedZone: CreateHostedZoneDto) {
    return this.dnsService.createHostedZone(newHostedZone)
  }

  @Post('changeResourceRecordSets')
  async createChangeResourceRecordSets(
    @Body() newRecord: CreateRecordDto
  ) {
    return this.dnsService.changeResourceRecordSets(newRecord);
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
