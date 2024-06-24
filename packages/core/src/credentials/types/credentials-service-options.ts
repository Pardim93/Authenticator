import { ParameterStoreApiOptions } from "../../integrations";
import { Environment } from "../..";

export interface CredentialsServiceOptions extends ParameterStoreApiOptions {
  environment: Environment;
}
