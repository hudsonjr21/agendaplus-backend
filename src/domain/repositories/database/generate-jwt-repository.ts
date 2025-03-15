export interface GenerateJwtRepository {
  generateJwt(payload: object): Promise<string>;
}
