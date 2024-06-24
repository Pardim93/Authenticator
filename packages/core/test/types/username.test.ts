import { chai } from "..";
import { Username, UsernameTypeError } from "../..";
import fakerStatic from "faker";

const invalidUsernames = [
  // eslint-disable-next-line spellcheck/spell-checker
  "a3578813-0294-6ece-b542-32986389cdb9",
  "test@test.mail.com.",
  "@natura.com.br",
  "test@test",
];

describe("username", (): void => {
  describe("constructor", (): void => {
    it("should create an email with valid emails", (): void => {
      const email = fakerStatic.internet.email();
      chai.expect(new Username(email).type).to.be.equals("email");
    });

    it("should create personId with valid uuid", (): void => {
      const personId = fakerStatic.random.uuid();
      chai.expect(new Username(personId).type).to.be.equals("personId");
    });

    it("should create naturaCode with valid code", (): void => {
      for (const code of ["2223598", "999999999999"]) {
        chai.expect(new Username(code).type).to.be.equals("naturaCode");
      }
    });

    it("should throw UsernameTypeError when type are not recognized", (): void => {
      for (const username of invalidUsernames) {
        chai.expect(() => new Username(username)).to.throw(UsernameTypeError);
      }
    });
  });
});
