import * as dotenv from 'dotenv';
import { EncryptionObjInterface } from '../constants';
import { SequelizeOptions } from 'sequelize-typescript';

// load dotenv variables
dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public nodeEnv = this.getValue('NODE_ENV', true);
  public isDev: boolean = this.nodeEnv === 'development';
  public isStaging: boolean = this.nodeEnv === 'staging';
  public isProduction: boolean = this.nodeEnv === 'production';

  // get value of key from .env, else throw error
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getAppName(): string {
    return this.getValue('APP_NAME', true);
  }

  public getAppUrl(): string {
    return this.getValue('APP_URL', true);
  }

  public getAppVersionNo(): string {
    return this.getValue('VERSION_NO', true);
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getApiPrefix() {
    return this.getValue('API_PREFIX', true);
  }

  public getWebAppUrl(): string {
    return this.getValue('WEB_APP_URL', true)
  }

  public getAwsAccessKeyId(): string {
    return this.getValue('AWS_ACCESS_KEY_ID', true)
  }

  public getAwsSecretAccessKey(): string {
    return this.getValue('AWS_SECRET_ACCESS_KEY', true)
  }

  public getAwsRegion(): string {
    return this.getValue('AWS_REGION', true)
  }

  public getSentryDsn(): string {
    return this.getValue('SENTRY_DSN', true)
  }

  public getEncryptionObj(): EncryptionObjInterface {
    return {
      PASSWORD: this.getValue('ENCRYPTION_PASSWORD', true),
      SALT: this.getValue('ENCRYPTION_SALT', true),
    }
  }

  // database
  public getPostgresLogging(): boolean {
    try {
      return <boolean><unknown>this.getValue('POSTGRES_LOGGING');
    }
      catch (error) {
      // return default logging value as false
      return false;
    }
  }

  public getDatabaseUrl() {
    return this.getValue('DATABASE_URL', true);
  }

  public getSequelizeConfig(): SequelizeOptions {
    return {
      timezone: this.getValue('POSTGRES_TIMEZONE'),
      dialect: 'postgres',
      logging: false,
      ssl: true
    };
  }
}

// enusre the values exist in .env on app startup, else throw error
const configService = new ConfigService(process.env).ensureValues([
  // 'POSTGRES_TIMEZONE',
  // 'POSTGRES_LOGGING',
  //'DATABASE_URL',
  // 'JWT_SECRET',
  // 'REDIS_URL'
]);

export { configService };
