import { useI18n } from "vue-i18n";

export function useLocale() {
  const { t, locale } = useI18n({
    messages: {
      en: {
        noActions: "No actions available.",
        save: "Save",
        close: "Close",
        required: "Field is required.",
        counter: "Max {counter} characters.",
        phoneInvalid: "The number provided is incorrect. (Ex: {example})",
        emptyValue: "No value",
        address: {
          country: "Country",
          region: "Region",
          addressLine: "Street and number",
          postalCode: "Postal code",
          city: "City",
        },
        datePicker: {
          futureDateError: "Date cannot be in the future",
          pastDateError: "Date cannot be in the past",
          invalidDateError: "Invalid date",
        },
      },
      pl: {
        noActions: "Brak dostępnych akcji.",
        save: "Zapisz",
        close: "Zamknij",
        required: "Pole jest wymagane.",
        counter: "Dozwolona liczba znaków: {counter}.",
        phoneInvalid: "Podany numer jest niepoprawny. (Np.: {example})",
        emptyValue: "Brak",
        address: {
          country: "Kraj",
          region: "Województwo/Region",
          addressLine: "Ulica i numer",
          postalCode: "Kod pocztowy",
          city: "Miejscowość",
        },
        datePicker: {
          futureDateError: "Data nie może być datą przyszłą",
          pastDateError: "Data nie może być datą przeszłą",
          invalidDateError: "Nieprawidłowa data",
        },
      },
    },
    fallbackLocale: "en"
  });

  return { t, locale };
}
