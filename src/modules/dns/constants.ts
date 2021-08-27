export enum CHANGE_RESOURCE_RECORD_SETS_ACTION {
  create = 'CREATE',
  delete = 'DELETE',
  upsert = 'UPSERT',
};

export const RECORD_REPOSITORY = 'RECORD_REPOSITORY';

export enum DNS_RECORD_TYPE {
  A = 'A',
  AAA = 'AAAA',
  CAA = 'CAA',
  CNAME = 'CNAME',
  DS = 'DS',
  MX = 'MX',
  NAPTR = 'NAPTR',
  NS = 'NS',
  PTR = 'PTR',
  SOA = 'SOA',
  SPF = 'SPF',
  SRV = 'SRV',
  TXT = 'TXT'
};
