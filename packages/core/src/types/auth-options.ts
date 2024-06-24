import { UsernameType } from "./username-type";
import { Environment } from "./environment";
import { Language } from "./language";

export interface AuthOptions {
  company: string;
  country: string;
  language: Language;
  clientId: string;
  clientSecret: string;
  region: string;
  environment: Environment;
  acceptedUsernameTypes?: UsernameType[];
}
