import { IsOptional, IsString } from 'class-validator';

export class DistributionQueryFiltersDto  {
  @IsOptional()
  @IsString()
  marker?: string;

  @IsOptional()
  @IsString()
  max_items?: string;
}
