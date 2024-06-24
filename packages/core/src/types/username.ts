import { UsernameType } from "./username-type";
import { UsernameTypeError } from "../errors/username-type-error";
export class Username {
  public readonly value: string;

  public readonly type: UsernameType;

  public constructor(value: string) {
    this.value = value;
    this.type = this.getType();
  }

  private getType(): UsernameType {
    if (this.isPersonId()) {
      return "personId";
    }

    if (this.isEmail()) {
      return "email";
    }

    if (this.isNaturaCode()) {
      return "naturaCode";
    }

    throw new UsernameTypeError(
      `it was not possible to recognize username type for value '${this.value}'`
    );
  }

  private isEmail(): boolean {
    return this.emailRegex().test(this.value);
  }

  private isPersonId(): boolean {
    return this.uuidRegex().test(this.value);
  }

  private isNaturaCode(): boolean {
    return this.naturaCodeRegex().test(this.value);
  }

  private emailRegex(): RegExp {
    return /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
  }

  private uuidRegex(): RegExp {
    return /^[0-9A-F]{8}-[0-9A-F]{4}-[1-5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  }

  private naturaCodeRegex(): RegExp {
    return /^[0-9]{5,12}$/i;
  }
}
