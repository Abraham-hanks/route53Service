import { BelongsTo, Column, HasOne, Table, DataType } from 'sequelize-typescript';
import { BaseModel } from 'src/database/models/base.model';

@Table({
  tableName: 'records',
  timestamps: true,
  paranoid: true
})

export class RecordModel extends BaseModel {
  @Column({
    unique: false
  })
  business_name: string;

  @Column
  action: string;

  @Column
  name: string;

  @Column
  value: string;

  @Column
  ttl: number;

  @Column
  type: string;

  @Column
  comment: string;

  @Column
  hosted_zone_id: string;

  @Column
  weight: number;

  @Column
  alias_id: number;

  @Column
  is_active: boolean;

  // associations
}
