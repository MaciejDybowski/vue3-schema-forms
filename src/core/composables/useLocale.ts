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
          selectedItemsCount: 'No selected items | Selected {el} item | Selected {el} items',
          enableRowActions: 'Selection mode',
          disableRowActions: 'Single mode',
          of:"of",
        },
        pesel: {
          invalidFormat: 'PESEL must contain exactly 11 digits.',
          invalidChecksum: 'Invalid PESEL checksum.',
          invalidDate: 'PESEL contains an invalid birth date.',
          notAdult: 'Person must be at least 18 years old.',
        },
        nip: {
          invalidFormat: 'Invalid NIP/VAT ID format.',
          invalidChecksum: 'Invalid NIP/VAT ID checksum.',
        },
        schedulerGrid: {
          person: 'Person',
          clickToEdit: 'Click to edit',
          note: 'Note (Optional)',
          status: 'Status',
          notePlaceholder: 'e.g., 8-15, after 1PM',
          editSchedule: 'Edit Schedule',
        },
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
          enableRowActions: 'Tryb zaznaczania',
          disableRowActions: 'Tryb pojedynczy',
          selectedItemsCount:
            'Brak zaznaczonych elementów | Zaznaczono {el} element | Zaznaczono {el} elementy | Zaznaczono {el} elementów',
          of:"z"
        },
        pesel: {
          invalidFormat: 'Numer PESEL musi składać się z dokładnie 11 cyfr.',
          invalidChecksum: 'Nieprawidłowa suma kontrolna numeru PESEL.',
          invalidDate: 'Numer PESEL zawiera nieprawidłową datę urodzenia.',
          notAdult: 'Osoba musi być pełnoletnia (minimum 18 lat).',
        },
        nip: {
          invalidFormat: 'Nieprawidłowy format numeru NIP/VAT ID.',
          invalidChecksum: 'Nieprawidłowa suma kontrolna numeru NIP/VAT ID.',
        },
        schedulerGrid: {
          person: 'Osoba',
          clickToEdit: 'Naciśnij aby edytować.',
          note: 'Notatka (Opcjonalna)',
          status: 'Status',
          notePlaceholder: 'np. 8-15, po 12:00',
          editSchedule: 'Edytuj harmonogram',
        },
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
          selectedItemsCount:
            'Keine ausgewählten Elemente | {el} Element ausgewählt | {el} Elemente ausgewählt',
          enableRowActions: 'Auswahlmodus',
          disableRowActions: 'Einzelmodus',
        },
        pesel: {
          invalidFormat: 'PESEL muss genau 11 Ziffern enthalten.',
          invalidChecksum: 'Ungültige PESEL-Prüfsumme.',
          invalidDate: 'PESEL enthält ein ungültiges Geburtsdatum.',
          notAdult: 'Person muss mindestens 18 Jahre alt sein.',
        },
        nip: {
          invalidFormat: 'Ungültiges NIP/USt-IdNr. Format.',
          invalidChecksum: 'Ungültige NIP/USt-IdNr. Prüfsumme.',
        },
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
          selectedItemsCount:
            'Нет выбранных элементов | Выбран {el} элемент | Выбрано {el} элемента | Выбрано {el} элементов',
          enableRowActions: 'Режим выделения',
          disableRowActions: 'Одиночный режим',
        },
        pesel: {
          invalidFormat: 'PESEL должен содержать ровно 11 цифр.',
          invalidChecksum: 'Неверная контрольная сумма PESEL.',
          invalidDate: 'PESEL содержит неверную дату рождения.',
          notAdult: 'Человеку должно быть не менее 18 лет.',
        },
        nip: {
          invalidFormat: 'Неверный формат NIP/VAT ID.',
          invalidChecksum: 'Неверная контрольная сумма NIP/VAT ID.',
        },
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
          selectedItemsCount:
            'Ningún elemento seleccionado | {el} elemento seleccionado | {el} elementos seleccionados',
          enableRowActions: 'Modo de selección',
          disableRowActions: 'Modo único',
        },
        pesel: {
          invalidFormat: 'PESEL debe contener exactamente 11 dígitos.',
          invalidChecksum: 'Suma de control PESEL inválida.',
          invalidDate: 'PESEL contiene una fecha de nacimiento inválida.',
          notAdult: 'La persona debe tener al menos 18 años.',
        },
        nip: {
          invalidFormat: 'Formato de NIP/NIF-IVA inválido.',
          invalidChecksum: 'Suma de control NIP/NIF-IVA inválida.',
        },
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
          selectedItemsCount:
            'Aucun élément sélectionné | {el} élément sélectionné | {el} éléments sélectionnés',
          enableRowActions: 'Mode sélection',
          disableRowActions: 'Mode simple',
        },
        pesel: {
          invalidFormat: 'Le PESEL doit contenir exactement 11 chiffres.',
          invalidChecksum: 'Somme de contrôle PESEL invalide.',
          invalidDate: 'Le PESEL contient une date de naissance invalide.',
          notAdult: 'La personne doit avoir au moins 18 ans.',
        },
        nip: {
          invalidFormat: 'Format NIP/TVA invalide.',
          invalidChecksum: 'Somme de contrôle NIP/TVA invalide.',
        },
      },
    },
    fallbackLocale: 'en',
  });

  return { t, locale };
}
