import { Auth as AmplifyAuth, CognitoUser } from "@aws-amplify/auth";
import { AuthOptions, UsernameType, Username } from "./types";
import { UsernameTypeError } from "./errors";
import { Configurable } from "./configurable";
import { UsernameExchanger } from "./exchangers";
import { I18n } from "./I18n";
import { dictionary } from "./auth-I18n";
import { CredentialsService } from "./credentials";

class AuthClass extends Configurable<AuthOptions> {
  private readonly defaultAcceptedTypes: UsernameType[];

  private acceptedUsernameTypes: UsernameType[];

  private user: CognitoUser | undefined;

  public constructor() {
    super();
    this.defaultAcceptedTypes = ["email", "personId"];
    this.acceptedUsernameTypes = this.defaultAcceptedTypes;
    I18n.putVocabularies(dictionary);
  }

  /**
   * Sign In
   * @param {string | Username} username The username to be signed in
   * @param {string} password The password of the username
   * @return object
   */
  public async signIn(
    username: string | Username,
    password: string
  ): Promise<void> {
    this.handleMissConfiguredCall();
    username = await this.normalizeUsername(username);
    this.user = (await AmplifyAuth.signIn(
      username.value,
      password
    )) as CognitoUser;
  }

  /**
   * Sign Out
   */
  public async signOut(): Promise<void> {
    this.handleMissConfiguredCall();
    await AmplifyAuth.signOut();
  }

  /**
   * Get  authenticated credentials of current user.
   * @return - A promise resolves to be current user's credentials
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public async currentAuthenticatedUser(): Promise<object> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return AmplifyAuth.currentAuthenticatedUser();
  }

  /**
   * Change a password for an authenticated user
   * @param {Object} user - The User object
   * @param {String} oldPassword - the current password
   * @param {String} newPassword - the requested new password
   * @return - A promise resolves if success
   */
  public async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await AmplifyAuth.changePassword(this.user, oldPassword, newPassword);
  }

  /**
   * Initiate a forgot password request
   * @param {String} username - the username to change password
   * @return - A promise resolves if success
   */
  public async forgotPassword(username: string): Promise<void> {
    await AmplifyAuth.forgotPassword(username);
  }

  protected async makeConfiguration(options: AuthOptions): Promise<void> {
    if (options.acceptedUsernameTypes !== undefined) {
      this.acceptedUsernameTypes = options.acceptedUsernameTypes;
      this.validateUserNameTypes();
    }
    I18n.setLanguage(options.language);
    await CredentialsService.configure(options);
    const credentials = await CredentialsService.fetch();
    await UsernameExchanger.configure(Object.assign({}, credentials, options));
    AmplifyAuth.configure(credentials);
  }

  private async normalizeUsername(
    username: string | Username
  ): Promise<Username> {
    if (typeof username === "string") {
      username = new Username(username);
    }
    if (!this.acceptedUsernameTypes.includes(username.type)) {
      throw new UsernameTypeError(I18n.get("not acceptable username type"));
    }
    if (!this.defaultAcceptedTypes.includes(username.type)) {
      username = await UsernameExchanger.exchange(username);
    }
    return username;
  }

  private validateUserNameTypes(): void {
    for (const mandatoryType of this.defaultAcceptedTypes) {
      if (!this.acceptedUsernameTypes.includes(mandatoryType)) {
        const required = this.defaultAcceptedTypes.join(", ");
        const error = `${I18n.get(
          "username options must contain at least these options:"
        )} [${required}]`;
        throw new UsernameTypeError(error);
      }
    }
  }
}

export const Auth = new AuthClass();
