import { useI18n } from "vue-i18n";

export function useLocale() {
  const { t, locale } = useI18n({
    messages: {
      en: {
        required: "Field is required.",
        counter: "Max {counter} characters.",
        phoneInvalid: "The number provided is incorrect. (Ex: {example})",
        countryLabel: "Country",
        emptyValue: "No value"
      },
      pl: {
        required: "Pole jest wymagane.",
        counter: "Dozwolona liczba znaków: {counter}.",
        phoneInvalid: "Podany numer jest niepoprawny. (Np.: {example})",
        countryLabel: "Kraj",
        emptyValue: "Brak"
      },
    },
  });

  return { t, locale };
}
