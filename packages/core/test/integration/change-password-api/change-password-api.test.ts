import nock from "nock";
import fakerStatic from "faker";
import {
  ChangePasswordApi,
  PasswordPattern,
  ChangePasswordApiOptions,
} from "../../../src/integrations/change-password";
import { expect } from "chai";
import { ChangePasswordRequestError } from "../../../src/integrations/global-people-platform/errors/change-password-request-error";

const options: ChangePasswordApiOptions = {
  baseUrl: fakerStatic.internet.url(),
};

const prepareEnvironment = (): void => {
  nock.disableNetConnect();
};

const tearDownEnvironment = (): void => {
  nock.cleanAll();
  nock.enableNetConnect();
};

const ResolveOnSucceed = "Should resolve if request succeeds";
const RejectOnFail = "Should reject if request fails";

describe("ChangePasswordApi", () => {
  beforeEach(prepareEnvironment);
  afterEach(tearDownEnvironment);

  describe("changePassword", () => {
    it(
      ResolveOnSucceed,
      async (): Promise<void> => {
        const currentPassword = fakerStatic.internet.password();
        const newPassword = fakerStatic.internet.password();
        const username = fakerStatic.internet.email();

        nock(options.baseUrl)
          .post("/change-password", {
            currentPassword: currentPassword,
            newPassword: newPassword,
            username: username,
          })
          .reply(200);

        await ChangePasswordApi.configure(options);
        await expect(
          ChangePasswordApi.changePassword(
            username,
            currentPassword,
            newPassword
          )
        ).to.be.fulfilled;
      }
    );

    it(
      RejectOnFail,
      async (): Promise<void> => {
        const currentPassword = fakerStatic.internet.password();
        const newPassword = fakerStatic.internet.password();
        const username = fakerStatic.internet.email();

        nock(options.baseUrl)
          .post("/change-password", {
            currentPassword: currentPassword,
            newPassword: newPassword,
            username: username,
          })
          .reply(500, { message: "Failed to change password" });

        await ChangePasswordApi.configure(options);
        await expect(
          ChangePasswordApi.changePassword(
            username,
            currentPassword,
            newPassword
          )
        ).to.be.rejectedWith(ChangePasswordRequestError);
      }
    );
  });

  describe("forgotPassword", () => {
    it(
      ResolveOnSucceed,
      async (): Promise<void> => {
        const username = fakerStatic.internet.email();

        nock(options.baseUrl)
          .post("/forgot-password", {
            username: username,
          })
          .reply(200);

        await ChangePasswordApi.configure(options);
        await expect(ChangePasswordApi.forgotPassword(username)).to.be
          .fulfilled;
      }
    );

    it(
      RejectOnFail,
      async (): Promise<void> => {
        const username = fakerStatic.internet.email();

        nock(options.baseUrl)
          .post("/forgot-password", {
            username: username,
          })
          .reply(500, { message: "Failed to send recovery email" });

        await ChangePasswordApi.configure(options);
        await expect(
          ChangePasswordApi.forgotPassword(username)
        ).to.be.rejectedWith(ChangePasswordRequestError);
      }
    );
  });

  describe("confirmForgotPassword", () => {
    it(
      ResolveOnSucceed,
      async (): Promise<void> => {
        const username = fakerStatic.internet.email();
        const code = fakerStatic.random.number().toString();
        const newPassword = fakerStatic.internet.password();

        nock(options.baseUrl)
          .post("/confirm-forgot-password", {
            username: username,
            code: code,
            newPassword: newPassword,
          })
          .reply(200);

        await ChangePasswordApi.configure(options);
        await expect(
          ChangePasswordApi.confirmForgotPassword(username, code, newPassword)
        ).to.be.fulfilled;
      }
    );

    it(
      RejectOnFail,
      async (): Promise<void> => {
        const username = fakerStatic.internet.email();
        const code = fakerStatic.random.number().toString();
        const newPassword = fakerStatic.internet.password();

        nock(options.baseUrl)
          .post("/confirm-forgot-password", {
            username: username,
            code: code,
            newPassword: newPassword,
          })
          .reply(500, { message: "Failed to confirm" });

        await ChangePasswordApi.configure(options);
        await expect(
          ChangePasswordApi.confirmForgotPassword(username, code, newPassword)
        ).to.be.rejectedWith(ChangePasswordRequestError);
      }
    );
  });

  describe("resendTemporaryPassword", () => {
    it(
      ResolveOnSucceed,
      async (): Promise<void> => {
        const username = fakerStatic.internet.email();

        nock(options.baseUrl)
          .post("/resend-temporary-password", {
            username: username,
          })
          .reply(200);

        await ChangePasswordApi.configure(options);
        await expect(ChangePasswordApi.resendTemporaryPassword(username)).to.be
          .fulfilled;
      }
    );

    it(
      RejectOnFail,
      async (): Promise<void> => {
        const username = fakerStatic.internet.email();

        nock(options.baseUrl)
          .post("/resend-temporary-password", {
            username: username,
          })
          .reply(500, { message: "Failed to resend temporary password" });

        await ChangePasswordApi.configure(options);
        await expect(
          ChangePasswordApi.resendTemporaryPassword(username)
        ).to.be.rejectedWith(ChangePasswordRequestError);
      }
    );
  });

  describe("passwordPattern", () => {
    it("Should return password pattern if request succeeds", async (): Promise<void> => {
      const expectedResult: PasswordPattern = {
        MinimumLength: 8,
        RequireLowercase: true,
        RequireNumbers: true,
        RequireSymbols: true,
        RequireUppercase: true,
        TemporaryPasswordValidityDays: 10,
      };

      nock(options.baseUrl)
        .get("/password-pattern")
        .reply(200, JSON.stringify(expectedResult));

      await ChangePasswordApi.configure(options);
      const result = await ChangePasswordApi.getPasswordPattern();
      expect(result).to.be.deep.equal(expectedResult);
    });

    it("Should throw ChangePasswordRequestError if request fails", async (): Promise<void> => {
      nock(options.baseUrl)
        .get("/password-pattern")
        .reply(500, JSON.stringify({ message: "Failed to fetch" }));

      await ChangePasswordApi.configure(options);
      await expect(ChangePasswordApi.getPasswordPattern()).to.be.rejectedWith(
        ChangePasswordRequestError
      );
    });
  });
});
