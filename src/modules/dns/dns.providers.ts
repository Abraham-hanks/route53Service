import { RECORD_REPOSITORY } from "./constants";
import { RecordModel } from "./record.model";

export const DnsProvider = [
  {
    provide: RECORD_REPOSITORY,
    useValue: RecordModel,
  }
];
