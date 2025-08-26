import { useI18n } from 'vue-i18n';

export function useLocale() {
  const { t, locale } = useI18n({
    messages: {
      en: {
        noActions: 'No actions available.',
        save: 'Save',
        close: 'Close',
        valueCopied: 'Copied!',
        required: 'Field is required.',
        counter: 'Max {counter} characters.',
        phoneInvalid: 'The number provided is incorrect. (Ex: {example})',
        emptyValue: 'No value',
        address: {
          country: 'Country',
          region: 'Region',
          addressLine: 'Street and number',
          postalCode: 'Postal code',
          city: 'City',
        },
        datePicker: {
          futureDateError: 'Date cannot be in the future',
          pastDateError: 'Date cannot be in the past',
          invalidDateError: 'Invalid date',
        },
        hint: {
          hide: 'Mark hint as read',
          show: 'Show hint',
        },
        duplicatedSection: {
          deleteAction: 'Delete',
          addBelowAction: 'Add below',
          copyBelowAction: 'Copy below',
          addAction: 'Add',
          closeAndAdd: 'Close and add',
        },
        userInput: {
          noData: 'No users available.',
        },
        dictionary: {
          noData: 'No data available.',
        },
        multiOrderedList: {
          available: 'Available',
          selected: 'Selected',
        },
        numberInput: {
          resultWasModified: 'Result was manually modified.',
        },
        tableField: {
          enableRowActions: "Selection mode",
          disableRowActions: "Single mode"
        }
      },
      pl: {
        noActions: 'Brak dostępnych akcji.',
        save: 'Zapisz',
        close: 'Zamknij',
        valueCopied: 'Skopiowano!',
        required: 'Pole jest wymagane.',
        counter: 'Dozwolona liczba znaków: {counter}.',
        phoneInvalid: 'Podany numer jest niepoprawny. (Np.: {example})',
        emptyValue: 'Brak',
        address: {
          country: 'Kraj',
          region: 'Województwo/Region',
          addressLine: 'Ulica i numer',
          postalCode: 'Kod pocztowy',
          city: 'Miejscowość',
        },
        datePicker: {
          futureDateError: 'Data nie może być datą przyszłą',
          pastDateError: 'Data nie może być datą przeszłą',
          invalidDateError: 'Nieprawidłowa data',
        },
        hint: {
          hide: 'Oznacz podpowiedź jako przeczytaną',
          show: 'Zobacz podpowiedź',
        },
        duplicatedSection: {
          deleteAction: 'Usuń',
          addBelowAction: 'Dodaj poniżej',
          copyBelowAction: 'Kopiuj poniżej',
          addAction: 'Dodaj',
          closeAndAdd: 'Dodaj i zamknij',
        },
        userInput: {
          noData: 'Brak dostępnych użytkowników.',
        },
        dictionary: {
          noData: 'Brak danych.',
        },
        multiOrderedList: {
          available: 'Dostępne',
          selected: 'Wybrane',
        },
        numberInput: {
          resultWasModified: 'Wynik został ręcznie zmodyfikowany.',
        },
        tableField: {
          enableRowActions: "Tryb zaznaczania",
          disableRowActions: "Tryb pojedynczy"
        }
      },
      de: {
        noActions: 'Keine Aktionen verfügbar.',
        save: 'Speichern',
        close: 'Schließen',
        valueCopied: 'Kopiert!',
        required: 'Feld ist erforderlich.',
        counter: 'Maximal {counter} Zeichen.',
        phoneInvalid: 'Die angegebene Nummer ist falsch. (Z.B.: {example})',
        emptyValue: 'Kein Wert',
        address: {
          country: 'Land',
          region: 'Region/Bundesland',
          addressLine: 'Straße und Hausnummer',
          postalCode: 'Postleitzahl',
          city: 'Stadt',
        },
        datePicker: {
          futureDateError: 'Datum darf nicht in der Zukunft liegen',
          pastDateError: 'Datum darf nicht in der Vergangenheit liegen',
          invalidDateError: 'Ungültiges Datum',
        },
        hint: {
          hide: 'Hinweis als gelesen markieren',
          show: 'Hinweis anzeigen',
        },
        duplicatedSection: {
          deleteAction: 'Löschen',
          addBelowAction: 'Darunter hinzufügen',
          copyBelowAction: 'Darunter kopieren',
          addAction: 'Hinzufügen',
          closeAndAdd: 'Schließen und hinzufügen',
        },
        userInput: {
          noData: 'Keine Benutzer verfügbar.',
        },
        dictionary: {
          noData: 'Keine Daten verfügbar.',
        },
        multiOrderedList: {
          available: 'Verfügbar',
          selected: 'Ausgewählt',
        },
        numberInput: {
          resultWasModified: 'Ergebnis wurde manuell geändert.',
        },
        tableField: {
          enableRowActions: "Auswahlmodus",
          disableRowActions: "Einzelmodus"
        }
      },
      ru: {
        noActions: 'Нет доступных действий.',
        save: 'Сохранить',
        close: 'Закрыть',
        valueCopied: 'Скопировано!',
        required: 'Обязательное поле.',
        counter: 'Максимум {counter} символов.',
        phoneInvalid: 'Указанный номер неверен. (Напр.: {example})',
        emptyValue: 'Нет значения',
        address: {
          country: 'Страна',
          region: 'Регион',
          addressLine: 'Улица и номер',
          postalCode: 'Почтовый индекс',
          city: 'Город',
        },
        datePicker: {
          futureDateError: 'Дата не может быть в будущем',
          pastDateError: 'Дата не может быть в прошлом',
          invalidDateError: 'Некорректная дата',
        },
        hint: {
          hide: 'Отметить подсказку как прочитанную',
          show: 'Показать подсказку',
        },
        duplicatedSection: {
          deleteAction: 'Удалить',
          addBelowAction: 'Добавить ниже',
          copyBelowAction: 'Копировать ниже',
          addAction: 'Добавить',
          closeAndAdd: 'Закрыть и добавить',
        },
        userInput: {
          noData: 'Нет доступных пользователей.',
        },
        dictionary: {
          noData: 'Нет данных.',
        },
        multiOrderedList: {
          available: 'Доступно',
          selected: 'Выбрано',
        },
        numberInput: {
          resultWasModified: 'Результат был изменён вручную.',
        },
        tableField: {
          enableRowActions: "Режим выделения",
          disableRowActions: "Одиночный режим"
        }
      },
      es: {
        noActions: 'No hay acciones disponibles.',
        save: 'Guardar',
        close: 'Cerrar',
        valueCopied: '¡Copiado!',
        required: 'Campo obligatorio.',
        counter: 'Máximo {counter} caracteres.',
        phoneInvalid: 'El número proporcionado es incorrecto. (Ej.: {example})',
        emptyValue: 'Sin valor',
        address: {
          country: 'País',
          region: 'Región',
          addressLine: 'Calle y número',
          postalCode: 'Código postal',
          city: 'Ciudad',
        },
        datePicker: {
          futureDateError: 'La fecha no puede ser futura',
          pastDateError: 'La fecha no puede ser pasada',
          invalidDateError: 'Fecha inválida',
        },
        hint: {
          hide: 'Marcar pista como leída',
          show: 'Mostrar pista',
        },
        duplicatedSection: {
          deleteAction: 'Eliminar',
          addBelowAction: 'Añadir abajo',
          copyBelowAction: 'Copiar abajo',
          addAction: 'Añadir',
          closeAndAdd: 'Cerrar y añadir',
        },
        userInput: {
          noData: 'No hay usuarios disponibles.',
        },
        dictionary: {
          noData: 'No hay datos disponibles.',
        },
        multiOrderedList: {
          available: 'Disponible',
          selected: 'Seleccionado',
        },
        numberInput: {
          resultWasModified: 'El resultado fue modificado manualmente.',
        },
        tableField: {
          enableRowActions: "Modo de selección",
          disableRowActions: "Modo único"
        }
      },
      fr: {
        noActions: 'Aucune action disponible.',
        save: 'Enregistrer',
        close: 'Fermer',
        valueCopied: 'Copié !',
        required: 'Champ obligatoire.',
        counter: 'Maximum {counter} caractères.',
        phoneInvalid: 'Le numéro fourni est incorrect. (Ex : {example})',
        emptyValue: 'Aucune valeur',
        address: {
          country: 'Pays',
          region: 'Région',
          addressLine: 'Rue et numéro',
          postalCode: 'Code postal',
          city: 'Ville',
        },
        datePicker: {
          futureDateError: 'La date ne peut pas être dans le futur',
          pastDateError: 'La date ne peut pas être dans le passé',
          invalidDateError: 'Date invalide',
        },
        hint: {
          hide: "Marquer l'indice comme lu",
          show: "Afficher l'indice",
        },
        duplicatedSection: {
          deleteAction: 'Supprimer',
          addBelowAction: 'Ajouter en dessous',
          copyBelowAction: 'Copier en dessous',
          addAction: 'Ajouter',
          closeAndAdd: 'Fermer et ajouter',
        },
        userInput: {
          noData: 'Aucun utilisateur disponible.',
        },
        dictionary: {
          noData: 'Aucune donnée disponible.',
        },
        multiOrderedList: {
          available: 'Disponible',
          selected: 'Sélectionné',
        },
        numberInput: {
          resultWasModified: 'Le résultat a été modifié manuellement.',
        },
        tableField: {
          enableRowActions: "Mode sélection",
          disableRowActions: "Mode simple"
        }
      },
    },
    fallbackLocale: 'en',
  });

  return { t, locale };
}
