/* eslint-disable spellcheck/spell-checker */
import { chai } from "..";
import {
  I18n,
  I18nDictionary,
  I18nMultiLanguageDictionary,
  Language,
} from "../..";

const multiLanguageDictionary: I18nMultiLanguageDictionary = {
  pt: {
    test: "teste",
  },
};

describe("I18n", (): void => {
  describe("putVocabulariesForLanguage", (): void => {
    it("should complete call if language is not defined on dictionary yet", (): void => {
      const language: Language = "en";
      const vocabulary: I18nDictionary = { test: "test" };
      const response = I18n.putVocabulariesForLanguage(language, vocabulary);
      chai.expect(response).to.be.equal(undefined);
    });

    it("should complete call if language is already defined on dictionary", (): void => {
      const language: Language = "pt";
      const vocabulary: I18nDictionary = { test: "test" };
      const response = I18n.putVocabulariesForLanguage(language, vocabulary);
      chai.expect(response).to.be.equal(undefined);
    });
  });

  describe("getByLanguage", (): void => {
    it("should return portuguese result when pt is provided as language", (): void => {
      I18n.putVocabularies(multiLanguageDictionary);
      const language: Language = "pt";
      const key: string = "test";
      const response = I18n.getByLanguage(language, key);
      chai.expect(response).to.be.equal("teste");
    });
  });

  describe("get", (): void => {
    it("should return english result if no language was configured", (): void => {
      const translation = I18n.get("test");
      chai.expect(translation).to.be.equals("test");
    });

    it("should return default value if no language was configured and default value was provided", (): void => {
      const translation = I18n.get("test", "default");
      chai.expect(translation).to.be.equals("default");
    });

    it("should return default value if key is not defined on provided language and default value was provided", (): void => {
      I18n.setLanguage("es");
      const translation = I18n.get("test", "default");
      chai.expect(translation).to.be.equals("default");
    });

    it("should return portuguese result when pt is provided as language", (): void => {
      I18n.putVocabularies(multiLanguageDictionary);
      I18n.setLanguage("pt");
      const translation = I18n.get("test");
      chai.expect(translation).to.be.equals("teste");
    });
  });
});
