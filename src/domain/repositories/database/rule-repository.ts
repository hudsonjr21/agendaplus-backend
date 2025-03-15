export interface RuleRepository {
  doesTheUserHavePermission(
    userUuid: string,
    requiredPermissions: number[],
  ): Promise<boolean>;
}
