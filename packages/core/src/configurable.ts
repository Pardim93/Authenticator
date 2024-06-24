import { I18n } from "./I18n";
import { ConfigurationError } from "./errors";

export abstract class Configurable<TOptions> {
  protected configured: boolean = false;

  /**
   * configures the instance class with supported options
   * including, at least, the required ones.
   * @param options
   */
  public async configure(options: TOptions): Promise<void> {
    try {
      await this.makeConfiguration(options);
      this.configured = true;
    } catch (e) {
      throw new ConfigurationError(I18n.get(e));
    }
  }

  protected handleMissConfiguredCall(): void {
    if (!this.configured) {
      throw new ConfigurationError("Miss configured call");
    }
  }

  protected abstract makeConfiguration(options: TOptions): Promise<void>;
}
