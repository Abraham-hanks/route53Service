import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DistributionQueryFiltersDto } from '../dto/distribution-query-filters.dto';
import { CloudfrontService } from '../services/cloudfront.service';

@ApiTags('Cloudfront')
@Controller('cloudfront')
export class CloudfrontController {
  constructor(
    private readonly cloudfrontService: CloudfrontService,
  ) {}

  @Get('distribution')
  async getDistribution(
    @Query() query: DistributionQueryFiltersDto
  ) {
    return this.cloudfrontService.listDistributions(query);
  }

  @Get('distribution/:id')
  async getDistributionById(
    @Param('id') id: string,
  ) {
    return this.cloudfrontService.getDistributionById(id)
  }
}
