import { SetMetadata } from '@nestjs/common';
import { Permissions } from '../../../../shared/constants/enums';

export const PERMISSIONS_KEY = 'permissions';
/**
 * https://docs.nestjs.com/security/authorization#claims-based-authorization
 * @param permissions
 * @returns
 */
export const RequirePermissions = (...permissions: Permissions[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
