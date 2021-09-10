import { IsOptional, IsString } from 'class-validator';

export class HostedZoneQueryFiltersDto  {
  @IsOptional()
  @IsString()
  marker?: string;

  @IsOptional()
  @IsString()
  max_items?: string;

  @IsOptional()
  @IsString()
  delegation_set_id?: string;
}
