import { ApiHideProperty } from "@nestjs/swagger";
import { IsOptional, IsPositive, IsString, IsUrl } from "class-validator";

export class CreateRecordDto {
  @IsString()
  business_name: string;

  @ApiHideProperty()
  @IsOptional()
  action: string;
  
  @IsUrl()
  name: string;
  
  @IsString()
  value: string;

  @ApiHideProperty()
  @IsOptional()
  ttl: number = 60;

  @ApiHideProperty()
  @IsOptional()
  type: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsString()
  hosted_zone_id: string;

  @IsOptional()
  @IsPositive()
  weight?: number;

  @IsOptional()
  @IsPositive()
  alias_id?: number;

  @ApiHideProperty()
  @IsOptional()
  is_active?: boolean;
}
