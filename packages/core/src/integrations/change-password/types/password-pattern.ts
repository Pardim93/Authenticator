export interface PasswordPattern {
  MinimumLength: number;
  RequireUppercase: boolean;
  RequireLowercase: boolean;
  RequireNumbers: boolean;
  RequireSymbols: boolean;
  TemporaryPasswordValidityDays: number;
}
