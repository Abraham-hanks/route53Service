import { Sequelize } from 'sequelize-typescript';
import { RecordModel } from 'src/modules/dns/record.model';
import { configService } from '../common/config/config.service';
import { SEQUELIZE } from '../common/constants';

// factory pattern is used for database setup
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(configService.getDatabaseUrl(), configService.getSequelizeConfig());
      sequelize.addModels([
        RecordModel,
      ]);
      return sequelize;
    },
  },
];
