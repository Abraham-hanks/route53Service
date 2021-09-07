import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

const route53 = new AWS.Route53({apiVersion: '2013-04-01'});
const cloudfront = new AWS.CloudFront({apiVersion: '2020-05-31'});

@Injectable()
export class CloudfrontService {
  constructor() { }

  async listDistributions() {
    try {
      const distributionList = await cloudfront.listDistributions().promise()

      return distributionList;
      
    } catch (error) {
      throw error
    }
  }

  async getById(id = '') {
    try {
      const distribution = await cloudfront.getDistribution({Id: 'E2SLOJW43MEYI'}).promise();

      return distribution
    } catch (error) {
      throw error      
    }
  }

  async getConfig(id = '') {
    try {
      const distributionConfig = await cloudfront.getDistributionConfig({Id: 'E2SLOJW43MEYI'}).promise();

      return distributionConfig
    } catch (error) {
      throw error      
    }
  }

  async addAlias(alias: string) {
    try {
      const config = await this.getConfig();
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
