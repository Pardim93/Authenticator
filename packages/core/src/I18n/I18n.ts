import { Language } from "../types";
import { I18nDictionary, I18nMultiLanguageDictionary } from ".";

export class I18nClass {
  private readonly multiLanguageDictionary: I18nMultiLanguageDictionary;

  private language: Language | undefined;

  public constructor(multiLanguageDictionary: I18nMultiLanguageDictionary) {
    this.multiLanguageDictionary = Object.assign({}, multiLanguageDictionary);
  }

  public setLanguage(language: Language): void {
    this.language = language;
  }

  public get(key: string, defaultValue: string | null = null): string {
    if (this.language === undefined) {
      return defaultValue === null ? key : defaultValue;
    }

    const language = this.language;
    let value = this.getByLanguage(language, key);
    if (value !== undefined && value !== null) {
      return value;
    }
    return defaultValue === null ? key : defaultValue;
  }

  public getByLanguage(
    language: Language,
    key: string,
    defaultValue: string | null = null
  ): string | null {
    const dictionary = this.multiLanguageDictionary[language];
    if (dictionary === undefined || dictionary === null) {
      return defaultValue;
    }
    return dictionary[key];
  }

  public putVocabulariesForLanguage(
    language: Language,
    vocabularies: I18nDictionary
  ): void {
    let dictionary = this.multiLanguageDictionary[language];
    if (dictionary === undefined || dictionary === null) {
      dictionary = this.multiLanguageDictionary[language] = {};
    }
    Object.assign(dictionary, vocabularies);
  }

  public putVocabularies(vocabularies: I18nMultiLanguageDictionary): void {
    for (const key of Object.keys(vocabularies)) {
      this.putVocabulariesForLanguage(key as Language, vocabularies[key]);
    }
  }
}

export const I18n = new I18nClass({});
