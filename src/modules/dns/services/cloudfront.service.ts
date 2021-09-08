import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ERROR_MESSAGES } from 'src/common/utils/error-messages';
import { DistributionQueryFiltersDto } from '../dto/distribution-query-filters.dto';

const cloudfront = new AWS.CloudFront({apiVersion: '2020-05-31'});

@Injectable()
export class CloudfrontService {
  constructor() { }

  async listDistributions(query?: DistributionQueryFiltersDto): Promise<AWS.CloudFront.ListDistributionsResult> {
    var params = {
      Marker: query.marker || '',
      MaxItems: query.max_items || '',
    }
    try {
      return await cloudfront.listDistributions(params).promise();
    } catch (error) {
      throw error
    }
  }

  async getDistributionById(id: string): Promise<AWS.CloudFront.GetDistributionResult> {
    try {
      return await cloudfront.getDistribution({ Id: id }).promise();
    } catch (error) {
      throw error      
    }
  }

  async getDistributionByDomainName(domainName: string) {
    try {
      let distribution: AWS.CloudFront.DistributionSummary;

      const distributionList = await cloudfront.listDistributions().promise();
      var list = distributionList.DistributionList;
              
      if (list.Items && list.Items.length > 0)
        distribution = list.Items.find( item => item.DomainName === domainName )

      if (!distribution)
        throw new BadRequestException(ERROR_MESSAGES.DistributionNotFound)

      return distribution
      
    } catch (error) {
      throw error 
    }
  }

  async getDistributionConfig(id: string): Promise<AWS.CloudFront.GetDistributionConfigResult> {
    try {
      return await cloudfront.getDistributionConfig({Id: id}).promise();
    } catch (error) {
      throw error      
    }
  }

  async addAlias(alias: string) {
    try {
      const config = await this.getDistributionConfig('E2SLOJW43MEYI');
      var DistributionConfig

      if(config.DistributionConfig) {
        DistributionConfig = config.DistributionConfig
        DistributionConfig.Aliases.Items.push(alias)
        DistributionConfig.Aliases.Quantity++ 
      }
      const params = {
        DistributionConfig,
        Id: 'E2SLOJW43MEYI',
        IfMatch: config.ETag
      }

      return await cloudfront.updateDistribution(params).promise()
    } catch (error) {
      throw error
    }
  }

}
