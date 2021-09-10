import { ApiHideProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";
import { CHANGE_RESOURCE_RECORD_SETS_ACTION } from "../constants";

export class CreateRecordDto {
  @ApiHideProperty()
  @IsOptional()
  action? = CHANGE_RESOURCE_RECORD_SETS_ACTION.create;
  
  @IsUrl()
  name: string;
  
  @IsString()
  cloudfront_domain_name: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsString()
  hosted_zone_id: string;
}
