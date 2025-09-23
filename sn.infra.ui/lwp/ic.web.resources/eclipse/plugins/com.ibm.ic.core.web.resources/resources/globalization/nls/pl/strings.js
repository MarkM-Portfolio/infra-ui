/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

// NLS_CHARSET=UTF-8
define({
      "globalization" : {
         "windowtitle" : "Globalizacja",
         "unavailable" : "Ustawienia globalizacji są niedostępne",
         "details" : "Określ preferowany język, kalendarz oraz kierunek przepływu generowanego przez użytkownika tekstu.",
         "error" : "Ustawienia globalizacji nie zostały pobrane z powodu wystąpienia błędu.",
         "titlebar" : {
            "tab2" : "Dostęp aplikacji",
            "tab1" : "Powiadomienia e-mail",
            "tab3" : "Globalizacja"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Naciśnięcie tego przycisku powoduje odświeżenie bieżącej strony i wyświetlenie nowej treści.  Aby powrócić do tego menu, wróć do:"
         },
         "details_nolanguage" : "Określ preferowany kalendarz oraz kierunek przepływu generowanego przez użytkownika tekstu.",
         "a11y" : {
            "titlebar_label" : "Ustawienia programu HCL Connections",
            "body_label" : "Ustawienia globalizacji"
         },
         "heading" : "Ustawienia globalizacji"
      },
      "restore_defaults" : {
         "error" : "Wystąpił błąd. Spróbuj ponownie później.",
         "action_tooltip" : "Przywróć oryginalne wartości domyślne ustawień globalizacji",
         "action" : "Przywróć wartości domyślne",
         "success" : "W przypadku ustawień globalizacji przywrócono oryginalne wartości domyślne."
      },
      "help" : {
         "help" : "Pomoc",
         "close" : "Zamknij"
      },
      "save" : {
         "error" : "Wystąpił błąd. Spróbuj ponownie później.",
         "action_tooltip" : "Zapisz ustawienia globalizacji",
         "action" : "Zapisz",
         "success" : "Ustawienia globalizacji zostały zaktualizowane."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Błąd:",
            "icon_alt" : "Błąd"
         },
         "success" : {
            "a11y_label" : "Powodzenie:",
            "icon_alt" : "Powodzenie"
         },
         "warning" : {
            "a11y_label" : "Ostrzeżenie:",
            "icon_alt" : "Ostrzeżenie"
         },
         "info" : {
            "a11y_label" : "Informacja:",
            "icon_alt" : "Informacja"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Przywróć wartości domyślne"
         },
         "bidi" : {
            "help" : "Włącz pomoc do obsługi tekstu dwukierunkowego",
            "label" : "Włącz obsługę tekstu dwukierunkowego",
            "tooltip" : "Umożliwia specyficzne dla języka wyświetlanie skonkatenowanego i ustrukturyzowanego tekstu, na przykład ścieżek do plików.  Umożliwia również określenie kierunku tekstu niezależnie od wybranego języka."
         },
         "error" : "Błąd",
         "save" : {
            "label" : "Zapisz"
         },
         "direction" : {
            "label" : "Kierunek tekstu generowanego przez użytkownika:",
            "tooltip" : "Kierunek tekstu określony na podstawie danych wejściowych użytkownika, takich jak nazwy treści i elementy ścieżki nawigacyjnej.  Domyślnie jest on zgodny z wybranym językiem (najczęściej jest to kierunek od lewej do prawej).  Wybranie kierunku kontekstowego umożliwia systemowi określenie kierunku na podstawie analizy znaków (obsługuje tekst o różnych kierunkach).",
            "options" : {
               "contextual" : "Kontekstowy (na podstawie znaków)",
               "rtl" : "Od prawej do lewej",
               "ltr" : "Od lewej do prawej",
               "default_ltr" : "Użyj wartości domyślnej języka (od lewej do prawej)",
               "default_rtl" : "Użyj wartości domyślnej języka (od prawej do lewej)"
            }
         },
         "cancel" : {
            "label" : "Anuluj"
         },
         "language" : {
            "selected" : "${0} (bieżący)",
            "label" : "Język:",
            "tooltip" : "Określ język, w jakim będzie wyświetlany tekst aplikacji.  To ustawienie nie będzie miało wpływu na tekst generowany przez użytkownika."
         },
         "calendar" : {
            "label" : "Kalendarz:",
            "options" : {
               "hebrew" : "hebrajski",
               "gregorian" : "gregoriański",
               "hijri" : "muzułmański"
            }
         }
      }
});
