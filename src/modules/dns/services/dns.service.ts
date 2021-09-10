import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Route53 } from 'aws-sdk';
import { CHANGE_RESOURCE_RECORD_SETS_ACTION, DNS_RECORD_TYPE, RECORD_REPOSITORY } from '../constants';
import { CreateHostedZoneDto } from '../dto/create-hosted-zone.dto';
import { CreateRecordDto } from '../dto/create-record.dto';
import { CreateCloudfrontAliasDto } from '../dto/create-cloudfront-alias.dto';
import { HostedZoneQueryFiltersDto } from '../dto/hosted-zone-query-filters.dto';
import { RecordModel as Record } from '../record.model';

const route53 = new AWS.Route53({apiVersion: '2013-04-01'});

@Injectable()
export class DnsService {
  constructor(
    @Inject(RECORD_REPOSITORY) private readonly recordRepo: typeof Record
  ) { }

  async createHostedZone(newHostedZone: CreateHostedZoneDto): Promise<Route53.CreateHostedZoneResponse> {
    try {
      var params = {
        CallerReference: `${Date.now()}-route53-service`,
        Name: newHostedZone.name,
        HostedZoneConfig: {
          Comment: newHostedZone.comment,
          PrivateZone: newHostedZone.private_zone,
        }
      };
  
      const hostedZone = await route53.createHostedZone(params).promise();
  
      return hostedZone;
      
    } catch (error) {
      throw error
    }
  }

  async getHostedZonesList(query?: HostedZoneQueryFiltersDto) {
    try {
      return await route53.listHostedZones().promise();
    } catch (error) {
     throw error 
    }
  }

  async getHostedZonesByName(): Promise<Route53.ListHostedZonesByNameResponse> {
    try {
      return await route53.listHostedZonesByName().promise();
    } catch (error) {
     throw error 
    }
  }

  async getHostedZoneById(id: string) {
    try {
      return await route53.getHostedZone({Id: id}).promise();
    } catch (error) {
      throw error
    }
  }

  async changeResourceRecordSets(newRecord: CreateRecordDto): Promise<Route53.ChangeResourceRecordSetsResponse> {
    try {
      const params = {
        ChangeBatch: {
          Changes: [
            {
              Action: CHANGE_RESOURCE_RECORD_SETS_ACTION.create,
              ResourceRecordSet: {
                Name: newRecord.name,
                AliasTarget: {
                  DNSName: newRecord.cloudfront_domain_name,
                  EvaluateTargetHealth: false,
                  HostedZoneId: 'Z2FDTNDATAQYW2',
                },
                Type: DNS_RECORD_TYPE.A
              }
            }
          ],
          Comment: newRecord.comment
        }, 
        HostedZoneId: newRecord.hosted_zone_id
      };

      const response = await route53.changeResourceRecordSets(params).promise();
    
      return response
      
    } catch (error) {
     throw error 
    }
  }

  async createCloudfrontAlias(newRecord: CreateCloudfrontAliasDto): Promise<Route53.ChangeResourceRecordSetsResponse> {
    try {
      const params = {
        ChangeBatch: {
          Changes: [
            {
              Action: CHANGE_RESOURCE_RECORD_SETS_ACTION.create,
              ResourceRecordSet: {
                Name: newRecord.name,
                AliasTarget: {
                  DNSName: newRecord.cloudfront_domain_name,
                  EvaluateTargetHealth: false,
                  HostedZoneId: 'Z2FDTNDATAQYW2',
                },
                Type: DNS_RECORD_TYPE.A
              }
            }
          ],
          Comment: newRecord.comment
        },
        HostedZoneId: newRecord.hosted_zone_id
      };

      return await route53.changeResourceRecordSets(params).promise();
    
    } catch (error) {
     throw error 
    }
  }

  async updateChangeResourceRecordSets() {
    try {
      const params = {
        ChangeBatch: {
         Changes: [
            {
           Action: CHANGE_RESOURCE_RECORD_SETS_ACTION.upsert,
           ResourceRecordSet: {
            Name: "test.datafirst.com.ng.", 
            ResourceRecords: [
               {
              Value: "192.0.2.35"
             }
            ], 
            TTL: 60, 
            Type: DNS_RECORD_TYPE.A,
           }
          }
         ], 
         Comment: "Web server for test UPDATED"
        }, 
        HostedZoneId: "Z0249728C9Z8SQ9R2614"
      };

      return await route53.changeResourceRecordSets(params).promise();
      
    } catch (error) {
     throw error 
    }
  }

  async deleteChangeResourceRecordSets() {
    try {
      const params = {
        ChangeBatch: {
         Changes: [
            {
           Action: CHANGE_RESOURCE_RECORD_SETS_ACTION.delete,
           ResourceRecordSet: {
            Name: "test.datafirst.com.ng.", 
            ResourceRecords: [
               {
              Value: "192.0.2.35"
             }
            ], 
            TTL: 60, 
            Type: DNS_RECORD_TYPE.A,
           }
          }
         ], 
         Comment: "Web server for test UPDATED"
        }, 
        HostedZoneId: "Z0249728C9Z8SQ9R2614"
      };

      return await route53.changeResourceRecordSets(params).promise();
      
    } catch (error) {
     throw error 
    }
  }
}
