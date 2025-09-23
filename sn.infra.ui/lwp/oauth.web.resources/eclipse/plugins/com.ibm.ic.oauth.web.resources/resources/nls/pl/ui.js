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
      "authorize" : {
         "legal" : "Licensed Materials - Property of IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, logo IBM, ibm.com oraz Lotus są znakami towarowymi IBM Corporation w Stanach Zjednoczonych i/lub w innych krajach. Użytkowników z instytucji rządowych USA obowiązują warunki umowy GSA ADP Schedule Contract z IBM Corp. Więcej informacji na ten temat zawiera strona Informacje.",
         "error" : "Wystąpił błąd. Spróbuj ponownie później.",
         "granted" : {
            "title" : "Przyznano dostęp",
            "blurb" : "Aplikacji ${0} przyznano dostęp na potrzeby współpracy z kontem programu HCL Connections."
         },
         "denied" : {
            "title" : "Odmowa dostępu",
            "blurb" : "Aplikacji ${0} odmówiono dostępu na potrzeby współpracy z kontem programu HCL Connections."
         },
         "blurb" : "Aplikacja {0} żąda dostępu do informacji zawartych w programie HCL Connections (w tym do treści użytkownika udostępnionych w programie Connections).",
         "revoke" : {
            "description" : "W dowolnym momencie można odebrać dostęp przy użyciu opcji Ustawienia programu Connections > {0}. Program Connections może okresowo prosić o ponowną autoryzację.",
            "link" : "Dostęp aplikacji"
         },
         "authorize" : {
            "label" : "Przyznaj dostęp"
         },
         "windowtitle" : "Autoryzacja dostępu do programu HCL Connections",
         "title" : "Żądanie dostępu",
         "deny" : {
            "label" : "Odmów dostępu"
         },
         "action_tooltip" : "Przyznaj dostęp aplikacji ${0}",
         "action" : "Przyznaj dostęp",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Przekierowywanie z powrotem do aplikacji ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Włączanie obsługi skryptów JavaScript",
            "p2" : "Odśwież stronę, aby kontynuować.",
            "p1" : "W przeglądarce WWW wyłączono obsługę skryptów JavaScript.  Program Connections wymaga do działania obsługi skryptów JavaScript.  Po jej włączeniu odśwież stronę."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Nie można przetworzyć żądania",
            "description" : "Żądanie wysłane przez aplikację żądającą dostępu do konta programu HCL Connections jest niekompletne.  Kliknij przycisk Wstecz przeglądarki, aby wrócić do miejsca (serwisu lub aplikacji), które umożliwiło przejście do bieżącego miejsca, i spróbuj ponownie.  Jeśli ten błąd będzie nadal występować, zgłoś problem administratorowi."
         },
         "invalid_token" : {
            "title" : "Nie można przetworzyć żądania",
            "description" : "Żądanie wysłane przez aplikację żądającą dostępu do konta programu HCL Connections jest niepoprawne.  Kliknij przycisk Wstecz przeglądarki, aby wrócić do miejsca (serwisu lub aplikacji), które umożliwiło przejście do bieżącego miejsca, i spróbuj ponownie.  Jeśli ten błąd będzie nadal występować, zgłoś problem administratorowi."
         },
         "default_action" : {
            "label" : "Powrót do strony głównej"
         }
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
      "loading" : "Ładowanie...",
      "deny" : {
         "error" : "Wystąpił błąd. Spróbuj ponownie później.",
         "action_tooltip" : "Odmów dostępu aplikacji ${0}",
         "action" : "Odmów dostępu",
         "success" : "Odmowa dostępu."
      },
      "grid" : {
         "applications" : {
            "summary" : "Lista aplikacji mających dostęp do informacji programu HCL Connections.",
            "loading" : "Ładowanie...",
            "empty" : "Nie znaleziono aplikacji.",
            "reverse_sort" : "Sortuj odwrotnie"
         }
      },
      "applications" : {
         "windowtitle" : "Dostęp aplikacji",
         "details" : "Aplikacje mające dostęp do informacji programu HCL Connections.",
         "error" : "Lista nie została pobrana z powodu błędu.",
         "titlebar" : {
            "tab2" : "Dostęp aplikacji",
            "tab1" : "Powiadomienia e-mail",
            "tab3" : "Globalizacja"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Naciśnięcie tego przycisku powoduje odświeżenie bieżącej strony i wyświetlenie nowej treści.  Aby powrócić do tego menu, wróć do:"
         },
         "a11y" : {
            "titlebar_label" : "Ustawienia programu HCL Connections"
         },
         "heading" : "Dostęp aplikacji"
      },
      "sorts" : {
         "application_name" : "Nazwa aplikacji",
         "authorization_date" : "Data autoryzacji",
         "expiration_date" : "Data ważności",
         "action" : "Działanie"
      },
      "revoke_token" : {
         "error" : "Wystąpił błąd. Spróbuj ponownie później.",
         "dialog_title" : "Odbieranie prawa dostępu",
         "action_tooltip" : "Odbierz dostęp aplikacji ${0}",
         "action" : "Odwołaj",
         "ok" : "OK",
         "cancel" : "Anuluj",
         "confirm" : "Czy tej aplikacji odebrać dostęp do informacji zawartych w programie HCL Connections? ",
         "success" : "Usunięto aplikację."
      }
});
