import { BadRequestException, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CloudFront } from 'aws-sdk';
import { ERROR_MESSAGES } from 'src/common/utils/error-messages';
import { DistributionQueryFiltersDto } from '../dto/distribution-query-filters.dto';

const cloudfront = new AWS.CloudFront({apiVersion: '2020-05-31'});

@Injectable()
export class CloudfrontService {
  constructor() { }

  async listDistributions(query?: DistributionQueryFiltersDto): Promise<CloudFront.ListDistributionsResult> {  
    let params = {
      Marker: query.marker || '',
      MaxItems: query.max_items || '',
    }

    try {
      return await cloudfront.listDistributions(params).promise();
    } catch (error) {
      throw error
    }
  }

  async getDistributionById(id: string): Promise<CloudFront.GetDistributionResult> {
    try {
      return await cloudfront.getDistribution({ Id: id }).promise();
    } catch (error) {
      throw error      
    }
  }

  async getDistributionByDomainName(domainName: string): Promise<CloudFront.DistributionSummary> {
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

  async getDistributionConfig(id: string): Promise<CloudFront.GetDistributionConfigResult> {
    try {
      return await cloudfront.getDistributionConfig({Id: id}).promise();
    } catch (error) {
      throw error      
    }
  }

  async addAlias(alias: string, cloudfront_url: string) {
    try {
      const distribution = await this.getDistributionByDomainName(cloudfront_url)
      const config = await this.getDistributionConfig(distribution.Id);
      var DistributionConfig

      if(config.DistributionConfig) {
        DistributionConfig = config.DistributionConfig
        DistributionConfig.Aliases.Items.push(alias)
        DistributionConfig.Aliases.Quantity++ 
      }
      const params = {
        DistributionConfig,
        Id: distribution.Id,
        IfMatch: config.ETag
      }

      return await cloudfront.updateDistribution(params).promise()
    } catch (error) {
      throw error
    }
  }
}
