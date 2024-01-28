import { useI18n } from "vue-i18n";

export function useLocale() {
  const { t, locale } = useI18n({
    messages: {
      en: {
        required: "Field is required.",
        counter: "Max {counter} characters.",
        phoneInvalid: "The number provided is incorrect. (Ex: {example})",

        emptyValue: "No value",
        address: {
          country: "Country",
          region: "Region",
          addressLine: "Street and number",
          postalCode: "Postal code",
          city: "City"
        }
      },
      pl: {
        required: "Pole jest wymagane.",
        counter: "Dozwolona liczba znaków: {counter}.",
        phoneInvalid: "Podany numer jest niepoprawny. (Np.: {example})",
        emptyValue: "Brak",
        address: {
          country: "Kraj",
          region: "Województwo/Region",
          addressLine: "Ulica i numer",
          postalCode: "Kod pocztowy",
          city: "Miejscowość"
        }
      },
    },
  });

  return { t, locale };
}
