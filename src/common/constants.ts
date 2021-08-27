import { getCurrentDate } from "./utils/date-processor";

export const SEQUELIZE = 'SEQUELIZE';
export const HTTP_OK_STRING = 'ok';
export const DefaultQueryAttributeExclude = ['deleted_at', 'updated_at', 'meta'];

export const USER_HEADERS = [
  { name: 'email', description: 'email' },
  { name: 'password', description: 'password' },
]

export const CURRENT_DATE = getCurrentDate();
export const DATE_TIME_FORMAT = 'dddd, DD-MMM-YYYY, h:mm:ssa';

export type EncryptionObjInterface = {
  PASSWORD: string,
  SALT: string,
  // IV?: string
}
