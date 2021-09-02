import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { CHANGE_RESOURCE_RECORD_SETS_ACTION, DNS_RECORD_TYPE, RECORD_REPOSITORY } from '../constants';
import { CreateRecordDto } from '../create-record.dto';
import { RecordModel as Record } from '../record.model';
import { CloudfrontService } from './cloud-front.service';

const route53 = new AWS.Route53({apiVersion: '2013-04-01'});

@Injectable()
export class DnsService {
  constructor(
    @Inject(RECORD_REPOSITORY) private readonly recordRepo: typeof Record
  ) { }

  async getHostedZonesList(): Promise<AWS.Route53.HostedZones> {
    try {
      const zones = await route53.listHostedZones().promise();
      zones.HostedZones.forEach((item) => {
        const index = item.Id.lastIndexOf('/');
        if (index)
          item.Id = item.Id.substr(index + 1)
      })

      return zones.HostedZones
    } catch (error) {
     throw error 
    }
  }

  async getHostedZonesByName(): Promise<AWS.Route53.ListHostedZonesByNameResponse> {
    try {
      return await route53.listHostedZonesByName().promise();
      
    } catch (error) {
     throw error 
    }
  }

  async createChangeResourceRecordSets(newRecord: CreateRecordDto) {
    try {
      const params = {
        ChangeBatch: {
         Changes: [
           {
             Action: CHANGE_RESOURCE_RECORD_SETS_ACTION.create, 
              ResourceRecordSet: {
                Name: newRecord.name, 
                AliasTarget: {
                  DNSName: "d1668pcx4tg6a3.cloudfront.net.", 
                  EvaluateTargetHealth: false, 
                  HostedZoneId: 'Z2FDTNDATAQYW2',
                }, 
              //   ResourceRecords: [
              //     {
              //    Value: "vendloft.com"
              //   }
              //  ], 
               // TTL:  newRecord.ttl, 
                Type: DNS_RECORD_TYPE.A
              }
            }
         ], 
         Comment: newRecord.comment
        }, 
        HostedZoneId: newRecord.hosted_zone_id
      };

      const response = await route53.changeResourceRecordSets(params).promise();
      //const record = await this.recordRepo.create(newRecord);

      return {
        //record,
        aws_response: response
      }
      
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
