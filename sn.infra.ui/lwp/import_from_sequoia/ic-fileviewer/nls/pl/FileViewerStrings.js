/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

//NLS_CHARSET=UTF-8

define ({
  root: {
     FILE_VIEWER_TITLE: "Podgląd pliku",
     FILENAME_TOOLTIP: "Edytuj nazwę pliku",
     ICON_TOOLTIP: "Pobierz plik",
     ERROR: "Wystąpił błąd.",
     SHARED_EXTERNALLY: "Współużytkowane zewnętrznie",
     FILE_SYNCED: "Dodano do synchronizowanych",
     MORE_ACTIONS: {
       TITLE: "Więcej działań",
       A11Y: "Otwiera menu rozwijane z listą dodatkowych działań do wykonania względem pliku."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Więcej opcji",
         A11Y: "Ten przycisk otwiera menu z większą liczbą opcji. "
       },
       BUTTON: {
         EDIT: {
           TITLE: "Edytuj"
         },
         UPLOAD: {
           TITLE: "Prześlij"
         }
       }
     },
     WELCOME: {
       TITLE: "Widok i szczegóły pliku zostały połączone",
       SUBTITLE: "Użytkownik może teraz wyświetlić obok siebie plik i dotyczące go komentarze. ",
       LINES: {
          LINE_1: "Wszystkie informacje i czynności, które można było wykonywać na starej stronie, są dostępne tutaj.",
          LINE_2: "Komentarze, relacje współużytkowania, wersje i informacje podstawowe są wyświetlane obok pliku."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Ten plik umożliwia przejście do następnego pliku.",
      PREVIOUS_A11Y: "Ten plik umożliwia przejście do poprzedniego pliku."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Zamknij",
         A11Y: "Ten przycisk umożliwia zamknięcie przeglądarki plików."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Nowy element na podstawie pliku",
         ACTION_NAME:"Utwórz plik",
         A11Y: {
           TEXT: "Utwórz dokument (plik DOC, DOCX lub ODT) na podstawie pliku szablonu. Takie dokumenty można edytować w sieci przy użyciu programu Docs.",
           PRES: "Utwórz prezentację (plik PPT, PPTX lub ODP) na podstawie pliku szablonu. Takie prezentacje można edytować w sieci przy użyciu programu Docs.",
           SHEET: "Utwórz arkusz kalkulacyjny (plik XLS, XLSX lub ODS) na podstawie pliku szablonu. Takie arkusze kalkulacyjne można edytować w sieci przy użyciu programu Docs."
         },
         PROMPT: {
           TEXT: "Utwórz dokument (plik DOC, DOCX lub ODT) na podstawie pliku szablonu. Takie dokumenty można edytować w sieci przy użyciu programu Docs.",
           PRES: "Utwórz prezentację (plik PPT, PPTX lub ODP) na podstawie pliku szablonu. Takie prezentacje można edytować w sieci przy użyciu programu Docs.",
           SHEET: "Utwórz arkusz kalkulacyjny (plik XLS, XLSX lub ODS) na podstawie pliku szablonu. Takie arkusze kalkulacyjne można edytować w sieci przy użyciu programu Docs."
         },
         NAME_FIELD: "Nazwa:",
         EXTERNAL_FIELD: "Pliki można udostępnić do współużytkowania osobom spoza mojej organizacji",
         EXTERNAL_DESC: "Dostęp zewnętrzny umożliwia udostępnianie plików do współużytkowania użytkownikom zewnętrznym (osoby spoza organizacji lub firmy), udostępnianie do współużytkowania folderów użytkownikom zewnętrznym oraz społeczności osobom z zewnątrz jako członkom. Dostęp zewnętrzny musi zostać ustawiony podczas przesyłania pliku. Nie można tego zrobić później.",
         CREATE_BUTTON: "Utwórz",
         CANCEL: "Anuluj",
         PRE_FILL_NAMES: {
           OTT: "Niezatytułowany dokument",
           OTS: "Niezatytułowany arkusz kalkulacyjny",
           OTP: "Niezatytułowana prezentacja",
           DOT: "Niezatytułowany dokument",
           XLT: "Niezatytułowany arkusz kalkulacyjny",
           POT: "Niezatytułowana prezentacja",
           DOTX: "Niezatytułowany dokument",
           XLTX: "Niezatytułowany arkusz kalkulacyjny",
           POTX: "Niezatytułowana prezentacja"
         },
         ERRORS: {
           NAME_REQUIRED: "Nazwa dokumentu jest wymagana.",
           ILLEGAL_NAME:"To jest niedozwolony tytuł dokumentu. Podaj inny tytuł.",
           WARN_LONG_NAME: "Nazwa dokumentu jest zbyt długa.",
           TRIM_NAME: "Czy skrócić nazwę dokumentu?",
           SESSION_TIMEOUT: "Sesja utraciła ważność. Zaloguj się i spróbuj ponownie.",
           DUPLICATE_NAME: "Znaleziono zduplikowaną nazwę pliku. Wprowadź nową nazwę.",
           SERVER_ERROR: "Serwer Connections jest niedostępny. Skontaktuj się z administratorem serwera i spróbuj ponownie później."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Pobierz plik",
         A11Y: "Ten przycisk umożliwia pobranie pliku."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Pobierz jako plik PDF",
         TOOLTIP: "Pobierz ten plik jako PDF",
         A11Y: "Ten przycisk umożliwia pobranie pliku jako pliku PDF.",
         SUCCESS: "Plik został pomyślnie pobrany jako plik PDF.",
         ERROR: {
           DEFAULT: "Nie można pobrać tego pliku jako pliku PDF.  Spróbuj ponownie później.",
           UNAUTHENTICATED: "Limit czasu sesji został przekroczony. Zaloguj się ponownie, aby pobrać ten plik jako plik PDF.",
           NOT_FOUND: "Nie można pobrać pliku jako pliku PDF, ponieważ plik został usunięty lub nie jest już udostępniony do współużytkowania dla bieżącego użytkownika.",
           ACCESS_DENIED: "Nie można pobrać pliku jako pliku PDF, ponieważ plik został usunięty lub nie jest już udostępniony do współużytkowania dla bieżącego użytkownika."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Nie istnieje żadna opublikowana wersja tego pliku, którą można pobrać.  Wersje można publikować z poziomu edytora programu Docs."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Nie można pobrać pliku",
           CANCEL: "Zamknij",
           PROMPT: "Nie istnieje żadna opublikowana wersja tego pliku, którą można pobrać.",
           PROMPT2: "Wersje można publikować z poziomu edytora programu Docs."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Nie można pobrać pliku",
           CANCEL: "Zamknij",
           PROMPT: "Nie istnieje żadna opublikowana wersja tego pliku, którą można pobrać.",
           PROMPT2: "Poproś właściciela pliku o opublikowanie wersji tego pliku."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Pobieranie wersji",
           OK: "Pobierz wersję",
           PROMPT: {
             TODAY: "Wykryto nowszą wersję roboczą (ostatnia modyfikacja: dzisiaj o ${time}).",
             YESTERDAY: "Wykryto nowszą wersję roboczą (ostatnia modyfikacja: wczoraj o ${time}).",
             DAY: "Wykryto nowszą wersję roboczą (ostatnia modyfikacja: ${date}).",
             MONTH: "Wykryto nowszą wersję roboczą (ostatnia modyfikacja: ${date}).",
             YEAR: "Wykryto nowszą wersję roboczą (ostatnia modyfikacja: ${date_long})."
           },
           PROMPT2: {
             TODAY: "Czy na pewno kontynuować pobieranie wersji opublikowanej dzisiaj o ${time}?",
             YESTERDAY: "Czy na pewno kontynuować pobieranie wersji opublikowanej wczoraj o ${time}?",
             DAY: "Czy na pewno kontynuować pobieranie wersji opublikowanej ${date}?",
             MONTH: "Czy na pewno kontynuować pobieranie wersji opublikowanej ${date}?",
             YEAR: "Czy na pewno kontynuować pobieranie wersji opublikowanej ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Pokaż panel szczegółów",
         HIDE: "Ukryj panel szczegółów",
         SHOW_A11Y: "Ten przycisk umożliwia otwieranie i zamykanie panelu bocznego. Panel boczny jest aktualnie zamknięty.",
         HIDE_A11Y: "Ten przycisk umożliwia otwieranie i zamykanie panelu bocznego. Panel boczny jest aktualnie otwarty."
       },
       VIEW_DOC: {
         NAME: "Otwórz w komponencie Viewer programu Docs",
         TOOLTIP: "Otwórz w komponencie Viewer programu Docs",
         A11Y: "Ten przycisk otwiera plik do wyświetlenia w nowym oknie przeglądarki."
       },
       EDIT_DOC: {
         NAME: "Edytuj w programie Docs",
         TOOLTIP: "Edytuj plik w programie Docs",
         A11Y: "Ten przycisk otwiera plik do edycji w programie Docs w nowym oknie."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Edytuj na pulpicie",
         DIALOG_TITLE: "Edycja na pulpicie",
         TOOLTIP: "Edytuj dokument",
         A11Y: "Ten przycisk otwiera plik do edytowania lokalnie.",
         PROMPT: "Ta opcja umożliwia lokalne edytowanie pliku.",
         IMPORTANT: "Ważne:",
         REMINDER: "Po zakończeniu edycji musisz opublikować wersję roboczą przy użyciu konektorów plików działających w środowisku pulpitu. Jeśli próba otwarcia pliku nie powiedzie się, być może będzie konieczne zainstalowanie wtyczek pulpitu.",
         SKIP_DIALOG: "Nie pokazuj tego komunikatu ponownie",
         OK: "OK",
         CANCEL: "Anuluj"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Potwierdzenie",
         DELETE_VERSION: "Usuń wersję ${version}",
         DELETE_VERSION_AND_PRIOR: "Usuń wersję ${version} i wszystkie wcześniejsze wersje",
         PROMPT: "Wersja ${version} zostanie usunięta. Czy kontynuować?",
         DELETE_PRIOR: "Usuń także wszystkie wcześniejsze wersje",
         ERROR: "Wystąpił błąd podczas usuwania wersji. Spróbuj ponownie później.",
         TOOLTIP: "Usuń tę wersję",
         OK: "OK",
         CANCEL: "Anuluj"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Uzyskiwanie odsyłaczy",
         LINK_FILE: "Odsyłacz do pliku:",
         LINK_PREVIEW: "Odsyłacz do pliku podglądu:",
         LINK_DOWNLOAD: "Odsyłacz do pobierania pliku:",
         TOOLTIP: "Odsyłacz do pliku",
         OK: "Zamknij"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Pobierz tę wersję"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Potwierdzenie",
         PROMPT: "Zamierzasz zastąpić bieżącą wersję tego pliku wersją ${version}. Czy kontynuować?",
         ERROR: "Wystąpił błąd podczas odtwarzania wersji. Spróbuj ponownie później.",
         TOOLTIP: "Odtwórz tę wersję",
         CHANGE_SUMMARY: "Odtworzono z wersji ${version}",
         OK: "OK",
         CANCEL: "Anuluj"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Potwierdzenie",
         REMOVE_EVERYONE: "Czy na pewno odebrać organizacji użytkownika dostęp do tego pliku? Jeśli dostęp zostanie usunięty, nastąpi usunięcie pliku z folderów i społeczności z dostępem na poziomie organizacji, a ten plik będzie mógł być wyświetlany i używany tylko przez właściciela oraz osoby, dla których został on udostępniony do współużytkowania.",
         REMOVE_USER: "Czy na pewno zakończyć współużytkowanie z użytkownikiem ${user}? W przypadku zakończenia udostępniania do współużytkowania użytkownik ${user} będzie mógł uzyskać dostęp do tego pliku tylko za pośrednictwem folderów lub wtedy, gdy plik będzie udostępniony do współużytkowania dla wszystkich osób w organizacji.",
         REMOVE_COMMUNITY: "Czy na pewno usunąć ten plik ze społeczności ${communityName}?",
         REMOVE_FOLDER: "Czy na pewno usunąć ten plik z folderu ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Usuń dostęp organizacji",
         REMOVE_USER_TOOLTIP: "Usuń wszystkie relacje współużytkowania z użytkownikiem ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Usuń ze społeczności ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Usuń z folderu ${folderName}",
         OK: "OK",
         CANCEL: "Anuluj"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Edytuj ten komentarz"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Potwierdzenie",
         PROMPT: "Czy na pewno usunąć ten komentarz?",
         ERROR: "Wystąpił błąd podczas usuwania komentarza. Spróbuj ponownie później.",
         TOOLTIP: "Usuń ten komentarz",
         OK: "OK",
         CANCEL: "Anuluj"
       },
       LIKE: {
         LIKE: "Polub plik",
         UNLIKE: "Anuluj polubienie pliku",
         LIKE_A11Y: "Ten przycisk umożliwia polubienie pliku.",
         UNLIKE_A11Y: "Ten przycisk umożliwia anulowanie polubienia pliku.",
         LIKED_SUCCESS: "Polubiono plik",
         UNLIKE_SUCCESS: "Anulowano polubienie pliku"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Edytuj opis",
         ERROR: {
           DEFAULT: "Opis nie może zostać zapisany. Spróbuj ponownie później.",
           UNAUTHENTICATED: "Limit czasu sesji został przekroczony. Aby móc zaktualizować opis, należy zalogować się ponownie.",
           NOT_FOUND: "Nie można zapisać opisu, ponieważ plik został usunięty lub nie jest już udostępniony do współużytkowania dla Ciebie.",
           ACCESS_DENIED: "Nie można zapisać opisu, ponieważ plik został usunięty lub nie jest już udostępniony do współużytkowania dla Ciebie."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Błąd podczas zapisywania nazwy pliku",
           CONFLICT: "Nazwa pliku już istnieje"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Wystąpił błąd podczas śledzenia pliku. Spróbuj ponownie później.",
             UNAUTHENTICATED: "Limit czasu sesji został przekroczony. Zaloguj się ponownie, aby śledzić ten plik.",
             NOT_FOUND: "Nie można śledzić tego pliku, ponieważ został on usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika.",
             ACCESS_DENIED: "Nie można śledzić tego pliku, ponieważ został on usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika."
           },
           UNFOLLOW: {
             DEFAULT: "Wystąpił błąd podczas anulowania śledzenia pliku. Spróbuj ponownie później.",
             UNAUTHENTICATED: "Limit czasu sesji został przekroczony. Zaloguj się ponownie, aby anulować śledzenie tego pliku.",
             NOT_FOUND: "Nie można anulować śledzenia tego pliku, ponieważ został on usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika.",
             ACCESS_DENIED: "Nie można anulować śledzenia tego pliku, ponieważ został on usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika."
           }
         },
         FOLLOW_NAME: "Śledź",
         FOLLOW_TOOLTIP: "Śledź ten plik",
         FOLLOW_A11Y: "Ten przycisk umożliwia śledzenie pliku.",
         FOLLOW_SUCCESS: "Obecnie śledzisz ten plik.",
         STOP_FOLLOWING_NAME: "Anuluj śledzenie",
         STOP_FOLLOWING_TOOLTIP: "Anuluj śledzenie tego pliku",
         STOP_FOLLOWING_A11Y: "Ten przycisk powoduje anulowanie śledzenia tego pliku.",
         STOP_FOLLOWING_SUCCESS: "Anulowano śledzenie tego pliku."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Dodaj do usługi synchronizacji",
           TOOLTIP: "Dodaj plik do usługi synchronizacji",
           A11Y: "Ten przycisk umożliwia dodanie pliku do usługi synchronizacji.",
           SUCCESS: "Dodano plik do usługi synchronizacji.",
           ERROR: {
             DEFAULT: "Wystąpił błąd podczas dodawania tego pliku do usługi synchronizacji. Spróbuj ponownie później.",
             UNAUTHENTICATED: "Limit czasu sesji został przekroczony. Zaloguj się ponownie, aby dodać ten plik do usługi synchronizacji.",
             NOT_FOUND: "Nie można dodać tego pliku do usługi synchronizacji, ponieważ został on usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika.",
             ACCESS_DENIED: "Nie można dodać tego pliku do usługi synchronizacji, ponieważ został on usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika."
           }
         },
         STOP_SYNC: {
           NAME: "Usuń z usługi synchronizacji",
           TOOLTIP: "Usuń plik z usługi synchronizacji",
           A11Y: "Ten przycisk umożliwia usunięcie pliku usługi synchronizacji.",
           SUCCESS: "Usunięto plik z usługi synchronizacji.",
           ERROR: {
             DEFAULT: "Wystąpił błąd podczas usuwania tego pliku z usługi synchronizacji. Spróbuj ponownie później.",
             UNAUTHENTICATED: "Limit czasu sesji został przekroczony. Zaloguj się ponownie, aby usunąć ten plik z usługi synchronizacji.",
             NOT_FOUND: "Nie można usunąć tego pliku z usługi synchronizacji, ponieważ został on usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika.",
             ACCESS_DENIED: "Nie można usunąć tego pliku z usługi synchronizacji, ponieważ został on usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Przypnij",
          FAVORITE_TOOLTIP: "Przypnij ten plik",
          FAVORITE_A11Y: "Ten przycisk umożliwia przypięcie pliku.",
          FAVORITE_SUCCESS: "Plik został przypięty.",
          STOP_FAVORITEING_NAME: "Odepnij",
          STOP_FAVORITEING_TOOLTIP: "Odepnij ten plik",
          STOP_FAVORITEING_A11Y: "Ten przycisk umożliwia odpięcie pliku.",
          STOP_FAVORITEING_SUCCESS: "Plik został odpięty."
       },
       TRASH: {
         NAME: "Przenieś do kosza",
         DIALOG_TITLE: "Potwierdzenie",
         PROMPT: "Czy na pewno przenieść ten plik do kosza? Po przeniesieniu do kosza plik stanie się niedostępny dla wszystkich osób, dla których jest obecnie udostępniony do współużytkowania.",
         ERROR: "Wystąpił błąd podczas usuwania pliku. Spróbuj ponownie później.",
         TOOLTIP: "Usuń ten plik",
         OK: "OK",
         CANCEL: "Anuluj",
         A11Y: "Ten przycisk służy do przenoszenia pliku do kosza.",
         SUCCESS_MSG: "Plik ${file} został przeniesiony do kosza."
       },
       REFRESH: {
         NAME: "Odśwież",
         ERROR: "Wystąpił błąd podczas odświeżania przeglądarki plików. Spróbuj ponownie później.",
         TOOLTIP: "Odśwież przeglądarkę plików",
         INFO_MSG: "Odśwież, aby uzyskać najnowszą treść. ${link}",
         A11Y: "Ten przycisk służy do przenoszenia pliku do kosza.",
         SUCCESS_MSG: "Treść została pomyślnie odświeżona."
       },
       COPY_FILE: {
         NAME: "Przekaż kopię społeczności",
         DIALOG_TITLE: "Potwierdzenie",
         ERROR: "Wystąpił błąd podczas kopiowania pliku. Spróbuj ponownie później.",
         TOOLTIP: "Przekaż kopię tego pliku społeczności",
         OK: "OK",
         CANCEL: "Anuluj",
         A11Y: "Ten przycisk otwiera okno dialogowe, które umożliwia przekazanie kopii tego pliku społeczności.",
         SUCCESS_MSG: "Plik ${file} został skopiowany do społeczności ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Prześlij nową wersję",
         NAME_SHORT: "Prześlij",
         CHANGE_SUMMARY: "Opcjonalne podsumowanie zmian...",
         TOOLTIP: "Prześlij nową wersję tego pliku",
         A11Y: "Ten przycisk otwiera okno dialogowe, które umożliwia przesłanie nowej wersji tego pliku."
       },
       LOG_IN: {
    	   NAME: "Zaloguj",
    	   TOOLTIP: "Zaloguj się, aby przesyłać i współużytkować pliki, wpisywać komentarze oraz tworzyć foldery."
       },
       LOCK: {
          NAME: "Zablokuj plik",
          TITLE: "Blokowanie pliku",
          A11Y: "Zablokuj plik",
          SUCCESS: "Plik jest teraz zablokowany."
       },
       UNLOCK: {
          NAME: "Odblokuj plik",
          TITLE: "Odblokowywanie pliku",
          A11Y: "Odblokuj plik",
          SUCCESS: "Plik jest teraz odblokowany."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Edytuj na pulpicie",
          TITLE: "Edycja na pulpicie",
          A11Y: "Edytuj na pulpicie"
       },
       FLAG: {
         FILE: {
           NAME: "Oznacz jako niestosowny",
           TITLE: "Oznaczanie pliku",
           A11Y: "Oznacz ten plik jako niestosowny",
           PROMPT: "Podaj przyczynę oznaczenia tego pliku (opcjonalnie):",
           OK: "Oznacz",
           CANCEL: "Anuluj",
           SUCCESS: "Plik został oznaczony i wysłany do przejrzenia.",
           ERROR: "Błąd podczas oznaczania tego pliku. Spróbuj ponownie później. "
         },
         COMMENT: {
           NAME: "Oznacz jako niestosowny",
           TITLE: "Oznaczanie komentarza",
           A11Y: "Oznacz komentarz jako niestosowny",
           PROMPT: "Podaj przyczynę oznaczenia tego komentarza (opcjonalnie):",
           OK: "Oznacz",
           CANCEL: "Anuluj",
           SUCCESS: "Komentarz został oznaczony i wysłany do przejrzenia.",
           ERROR: "Błąd podczas oznaczania tego komentarza. Spróbuj ponownie później. "
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Informacje o tym pliku",
       VIEW_FILE_DETAILS: "Wyświetl szczegóły pliku",
       A11Y: "Aktywowanie tego odsyłacza spowoduje zamknięcie przeglądarki plików i przekierowanie użytkownika do strony szczegółów tego pliku."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Podgląd nie jest dostępny dla tego pliku."
      },
      IMAGE: {
       ZOOM_IN: "Powiększ",
       ZOOM_OUT: "Pomniejsz",
       RESET: "Przywróć",
       ZOOM_IN_A11Y: "Ten przycisk umożliwia powiększenie obrazu.",
       ZOOM_OUT_A11Y: "Ten przycisk umożliwia pomniejszenie obrazu.",
       RESET_ZOOM_A11Y: "Ten przycisk umożliwia przywrócenie ustawienia poziomu powiększenia."
      },
      VIEWER: {
       LOADING: "Ładowanie...",
       NO_PUBLISHED_VERSION: "Nie możesz wyświetlić wersji tego pliku, ponieważ nie została ona opublikowana.",
       IFRAME_TITLE: "Podgląd tego pliku"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Ostatnia aktualizacja: przez użytkownika ${user}, dzisiaj o ${time}",
       YESTERDAY: "Ostatnia aktualizacja: przez użytkownika ${user}, wczoraj o ${time}",
       DAY: "Ostatnia aktualizacja: przez użytkownika ${user}, ${eeEE} o ${time}",
       MONTH: "Ostatnia aktualizacja: przez użytkownika ${user}, ${date_long}",
       YEAR: "Ostatnia aktualizacja: przez użytkownika ${user}, ${date_long}"
      },
      CREATED: {
       TODAY: "Utworzone przez użytkownika ${user}: dzisiaj o ${time}",
       YESTERDAY: "Utworzone przez użytkownika ${user}: wczoraj o ${time}",
       DAY: "Utworzone przez użytkownika ${user}: ${eeEE} o ${time}",
       MONTH: "Utworzone przez użytkownika ${user}: ${date_long}",
       YEAR: "Utworzone przez użytkownika ${user}: ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} – dzisiaj",
       YESTERDAY: "${time} – wczoraj",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "Dzisiaj",
       YESTERDAY: "Wczoraj",
       DAY: "${EEee}",
       MONTH: "${date_long}",
       YEAR: "${date_long}"
      }
     },
     FILE_SIZE: {
      BYTES: "${size} B",
      KILOBYTES: "${size} kB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
     },
     COMMENT_BOX: {
       TITLE: "Obszar tekstu komentarza",
       SHADOW_TEXT: "Dodaj komentarz...",
       CANNOT_ACCESS_CONTENT: "Następujące osoby wspomniane przez Ciebie nie mogą wyświetlić komentarza, ponieważ nie mają dostępu do treści:",
       ERROR: "Wystąpił błąd podczas sprawdzania poprawności wspominanego użytkownika.",
       POST: "Publikuj",
       SAVE: "Zapisz",
       CANCEL: "Anuluj",
       EXTERNAL_WARNING: "Komentarze mogą być przeglądane przez osoby spoza organizacji."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Anuluj",
         A11Y: "Ten przycisk powoduje anulowanie działania edytowania nazwy pliku. "
       },
       INVALID_CHARACTERS: "Niepoprawny znak",
       INVALID_CHARACTERS_REMOVED: "Usunięto niepoprawne znaki"
     },
     COMMENT_WIDGET: {
       EDITED: "(Edytowano)",
       EDITED_DATE: {
         TODAY: "Edytowano: dzisiaj o ${time}",
         YESTERDAY: "Edytowano: wczoraj o ${time}",
         DAY: "Edytowano: ${eeEE} o ${time}",
         MONTH: "Edytowano: ${date_long}",
         YEAR: "Edytowano: ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Zapisz",
       CANCEL: "Anuluj",
       USER: "Użytkownik",
       COMMUNITY: "Społeczność",
       SHARE: "Współużytkuj",
       SHARE_ALT: "Udostępnij do współużytkowania dla tego użytkownika",
       MEMBER_TYPE: "Typ członka",
       PERSON_SHADOW: "Wpisz, aby wyszukać osobę",
       COMMUNITY_SHADOW: "Wpisz, aby wyszukać społeczność",
       PERSON_FULL_SEARCH: "Osoby nie ma na liście? Użyj pełnego wyszukiwania...",
       COMMUNITY_FULL_SEARCH: "Społeczności nie ma na liście? Użyj pełnego wyszukiwania...",
       ADD_OPTIONAL_MESSAGE: "Dodaj opcjonalną wiadomość",
       ROLE_LABEL: "Rola",
       ROLE_EDIT: "Edytujący",
       ROLE_VIEW: "Czytelnik"
     },
     FILE_STATE: {
       DOCS_FILE: "To jest plik programu Docs. Musi być edytowany w sieci.",
       LOCKED_BY_YOU: {
         TODAY: "Zablokowane przez Ciebie o ${time}.",
         YESTERDAY: "Zablokowane przez Ciebie wczoraj o ${time}.",
         DAY: "Zablokowane przez Ciebie ${date}.",
         MONTH: "Zablokowane przez Ciebie ${date}.",
         YEAR: "Zablokowane przez Ciebie ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Zablokowane przez użytkownika ${user} o ${time}.",
         YESTERDAY: "Zablokowane przez użytkownika ${user} wczoraj o ${time}.",
         DAY: "Zablokowane przez użytkownika ${user}: ${date}.",
         MONTH: "Zablokowane przez użytkownika ${user}: ${date}.",
         YEAR: "Zablokowane przez użytkownika ${user}: ${date_long}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Komentarz jest zbyt długi.",
         TRIM: "Czy skrócić komentarz?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Opis jest zbyt długi.",
         TRIM: "Czy skrócić opis?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Wiadomość jest zbyt długa.",
         TRIM: "Czy skrócić wiadomość?"
       },
       TAG: {
         WARN_TOO_LONG: "Znacznik jest zbyt długi.",
         TRIM: "Czy skrócić znacznik?"
       },
       TAGS: {
         WARN_TOO_LONG: "Co najmniej jeden znacznik jest zbyt długi.",
         TRIM: "Czy skrócić znaczniki?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Nazwa pliku jest zbyt długa"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Ten plik jest dostępny do edycji w sieci tylko wtedy, gdy zostały zakupione uprawnienia do programu Docs.",
       CURRENT_EDITORS: "Ten plik jest aktualnie edytowany w sieci WWW przez użytkownika ${users}.",
       UNPUBLISHED_CHANGES: "Istnieją zmiany w wersji roboczej, które nie zostały opublikowane jako wersja.",
       PUBLISH_A_VERSION: "Publikuj wersję",
       PUBLISH_SUCCESS: "Użytkownik pomyślnie opublikował wersję tego pliku",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Nie można opublikować wersji z powodu odmowy dostępu.",
         NOT_FOUND: "Nie można opublikować wersji, ponieważ dokument nie został znaleziony.",
         CANNOT_REACH_REPOSITORY: "Nie można opublikować wersji, ponieważ serwer Docs nie może nawiązać połączenia z repozytorium plików.",
         QUOTA_VIOLATION: "Nie można opublikować wersji z powodu ograniczeń dotyczących ilości miejsca. Usuń inne pliki, aby zwolnić ilość miejsca wystarczającą do opublikowania tej wersji.",
         CONVERSION_UNAVAILABLE: "Nie można opublikować wersji, ponieważ usługa konwersji programu Docs jest niedostępna. Spróbuj ponownie później.",
         TOO_LARGE: "Nie można opublikować wersji, ponieważ dokument jest zbyt duży.",
         CONVERSION_TIMEOUT: "Nie można opublikować wersji, ponieważ konwersja dokumentu przeprowadzana przez usługę konwersji programu Docs trwa zbyt długo. Spróbuj ponownie później.",
         SERVER_BUSY: "Nie można opublikować wersji, ponieważ serwer Docs jest zajęty. Spróbuj ponownie później.",
         DEFAULT: "Nie można opublikować wersji, ponieważ usługa programu Docs jest niedostępna. Spróbuj ponownie później."
       }
     },
     COMMENTS: {
       EMPTY: "Brak komentarzy.",
       MODERATED: "Komentarz został wysłany do przejrzenia i będzie dostępny po zatwierdzeniu.",
       ERROR: {
         SAVE: {
           DEFAULT: "Nie można zapisać komentarza. Spróbuj ponownie później.",
           UNAUTHENTICATED: "Limit czasu sesji został przekroczony. Aby móc zapisać komentarz, należy zalogować się ponownie.",
           NOT_FOUND: "Nie można zapisać komentarza, ponieważ plik został usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika.",
           ACCESS_DENIED: "Nie można zapisać komentarza, ponieważ plik został usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika."
         },
         DELETE: {
           DEFAULT: "Nie można usunąć komentarza. Spróbuj ponownie później.",
           UNAUTHENTICATED: "Limit czasu sesji został przekroczony. Aby móc usunąć komentarz, należy zalogować się ponownie.",
           NOT_FOUND: "Nie można usunąć komentarza, ponieważ plik został usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika.",
           ACCESS_DENIED: "Nie można usunąć komentarza, ponieważ plik został usunięty lub nie jest już udostępniony do współużytkowania dla użytkownika."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Zapisz",
       EDIT_TAGS: "Edytuj znaczniki",
       ERROR: {
         SAVE: {
           DEFAULT: "Nie można utworzyć znacznika. Spróbuj ponownie później."
         },
         DELETE: {
           DEFAULT: "Nie można usunąć znacznika. Spróbuj ponownie później."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Więcej informacji...",
       READ_LESS: "Mniej informacji..."
     },
     SHARE: {
	     EVERYONE: "Wszyscy w mojej organizacji",
	     ADD_TOOLTIP: "Zapisz",
	     ROLES: {
	       OWNER: "Właściciel",
	       EDIT: "Edytujący",
	       VIEW: "Czytelnicy",
	       FOLDER: "Współużytkowane z folderami"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Właściciel"
	       },
	       EDIT: {
	         ROLE: "Edytuj",
           ADD: "Dodaj edytującego"
	       },
	       VIEW: {
	         ROLE: "Czytelnik",
           ADD: "Dodaj czytelnika"
	       },
	       FOLDER: {
           ADD: "Dodaj foldery",
           COMMUNITY_ADD: "Dodaj do folderu",
           MOVE: "Przenieś do folderu"
	       },
	       MULTI: {
	         ADD: "Dodaj osoby lub społeczności",
	         ADD_PEOPLE: "Dodaj osoby"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Wszyscy w mojej organizacji",
	        LONG: {
	           GENERIC: "Wszyscy w organizacji",
	           ORG: "Wszyscy w organizacji ${org}"
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Ten plik został już udostępniony do współużytkowania dla użytkownika ${user}.",
	       ERROR: "W tej chwili nie można udostępnić do współużytkowania dla użytkownika ${user}.",
	       SELF: "Nie można udostępniać do współużytkowania dla siebie."
	     },
	     SHARE_INFO: {
	       PROMOTED: "Użytkownik ${user} został awansowany do wyższej roli współużytkowania."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Pomyślnie udostępniono do współużytkowania dla użytkownika ${user}"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Opcjonalna wiadomość..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Udostępnianie użytkownika zewnętrznego",
            ACTION: "Udostępnij użytkownika zewnętrznego...",
            TOOLTIP: "Udostępnij użytkownika zewnętrznego",
            DIALOG_TITLE: "Treść nie została udostępniona do współużytkowania",
            PROMPT: {
              NO_ACCOUNT: "Następujący użytkownik nie ma konta i nie udostępniono mu żadnej treści do współużytkowania.",
              INVITE: "Zaproś tego użytkownika jako gościa, aby udostępnić mu treść do współużytkowania."
            },
            SUBMIT: "Kontynuuj wysyłanie zaproszenia",
            CANCEL: "Anuluj",
            ERROR: "Wystąpił błąd podczas udostępniania konta. Spróbuj ponownie później.",
            SUCCESS: "Pomyślnie udostępniono konto użytkownika."
	       },
	       PLURAL: {
	         NAME: "Udostępnianie użytkowników zewnętrznych",
	         ACTION: "Udostępnij użytkowników zewnętrznych...",
	         TOOLTIP: "Udostępnij użytkowników zewnętrznych",
	         DIALOG_TITLE: "Treść nie została udostępniona do współużytkowania",
	         PROMPT: {
	           NO_ACCOUNT: "Następujący użytkownicy nie mają konta i nie udostępniono im żadnej treści do współużytkowania.",
	           INVITE: "Zaproś tych użytkowników jako gości, aby udostępnić im treść do współużytkowania."
	         },
	         SUBMIT: "Kontynuuj wysyłanie zaproszeń",
	         CANCEL: "Anuluj",
	         ERROR: "Wystąpił błąd podczas udostępniania kont. Spróbuj ponownie później.",
	         SUCCESS: "Pomyślnie udostępniono konta użytkowników."
	       },
	       ABSTRACT: {
	         NAME: "Udostępnianie użytkowników zewnętrznych",
            ACTION: "Udostępnij użytkowników zewnętrznych...",
            TOOLTIP: "Udostępnij użytkowników zewnętrznych",
            DIALOG_TITLE: "Treść nie została udostępniona do współużytkowania",
            PROMPT: {
              NO_ACCOUNT: "Niektórzy użytkownicy nie mają kont i nie udostępniono im żadnej treści do współużytkowania.",
              INVITE: "Zaproś tych użytkowników jako gości, aby udostępnić im treść do współużytkowania."
            },
            SUBMIT: "Kontynuuj wysyłanie zaproszeń",
            CANCEL: "Anuluj",
            ERROR: "Wystąpił błąd podczas udostępniania kont. Spróbuj ponownie później.",
            SUCCESS: "Pomyślnie udostępniono konta użytkowników."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Opcje współużytkowania",
         PROPAGATION: "Zezwól innym osobom na udostępnianie tego pliku do współużytkowania",
         EVERYONE: "Wszyscy mogą udostępniać ten plik do współużytkowania.",
         OWNER_ONLY: "Tylko właściciel może udostępnić ten plik do współużytkowania.",
         STOP_SHARE: "Zakończ współużytkowanie",
         MAKE_INTERNAL: "Zakończ współużytkowanie zewnętrzne",
         MAKE_INTERNAL_SUCCESS: "Tego pliku nie można już udostępniać do współużytkowania dla osób spoza organizacji.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Czy ustawić jako wewnętrzny?",
           PROMPT: "Ustawienie tego pliku jako wewnętrznego oznacza brak możliwości współużytkowania go z osobami spoza organizacji. ${br}${br}" +
             "Wszystkie zasoby współużytkowane z zewnętrznymi osobami, społecznościami lub folderami zostaną usunięte. ${br}${br}Ustawienie pliku jako wewnętrznego jest operacją trwałą, której nie można cofnąć."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Zatrzymywanie współużytkowania pliku",
           PROMPT: "Czy na pewno zatrzymać współużytkowanie tego pliku?",
           QUESTION_PUBLIC: "Ten plik nie będzie już widoczny dla wszystkich osób w organizacji użytkownika ani udostępniony do współużytkowania dla osób, folderów i społeczności. Tej operacji nie można cofnąć.",
           QUESTION_PUBLIC_E: "Ten plik nie będzie już widoczny dla wszystkich osób w organizacji użytkownika ani udostępniony do współużytkowania dla osób i folderów. Tej operacji nie można cofnąć.",
           QUESTION: "Ten plik przestanie być współużytkowany z osobami oraz społecznościami i zostanie usunięty ze wszystkich folderów z wyjątkiem prywatnych folderów użytkownika. Tego działania nie można cofnąć.",
           QUESTION_E: "Ten plik przestanie być współużytkowany z osobami i zostanie usunięty ze wszystkich folderów z wyjątkiem folderów prywatnych użytkownika. Tego działania nie można cofnąć."
         },
         MAKE_PRIVATE_SUCCESS: "Ten plik jest teraz prywatny.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Nie można zatrzymać współużytkowania pliku. Spróbuj ponownie później."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Moje relacje współużytkowania"
	   },
	   STREAM: {
	     LOADING: "Ładowanie...",
	     LOAD_MORE: "Załaduj więcej..."
	   },
	   ENTRY: {
	     REMOVE: "Usuń",
	     RESTORE: "Odtwórz",
	     EDIT: "Edytuj",
	     DELETE: "Usuń",
	     OK: "OK",
	     CANCEL: "Anuluj",
	     USER_PICTURE: "Zdjęcie użytkownika ${0}",
	     FLAG: "Oznacz jako niestosowne"
	   },
	   PANEL: {
	     LOAD_ERROR: "Wystąpił błąd podczas uzyskiwania dostępu do metadanych tego pliku. ",
	     ABOUT: {
	       TITLE: "Informacje",
	       EXPAND_BUTTON: "Rozwiń ten przycisk, aby wyświetlić więcej informacji",
	       CURRENT_VERSION_HEADER: "Bieżąca wersja: ${versionNumber}",
	       FILE_SIZE_HEADER: "Wielkość pliku",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} – bieżąca wersja",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} – wszystkie wersje",
	       DOCS_DRAFT_UPDATED_HEADER: "Edytowana wersja robocza",
	       DOCS_DRAFT_CREATED_HEADER: "Utworzona wersja robocza",
	       DOCS_UPDATED_HEADER: "Opublikowane",
	       DOCS_CREATED_HEADER: "Utworzono",
	       UPDATED_HEADER: "Zaktualizowano",
	       CREATED_HEADER: "Utworzono",
	       LIKES_HEADER: "Polubienia",
	       LIKES_EXPAND_ICON: "Rozwiń tę ikonę, aby sprawdzić, kto polubił plik",
	       DOWNLOADS_HEADER: "Pobrania",
	       DOWNLOADS_HEADER_MORE: "Pobrania (${0})",
	       DOWNLOADS_EXPAND_ICON: "Rozwiń tę ikonę, aby sprawdzić, kto pobrał plik",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} – anonimowo: ${anonymousDownloads}",
	       DOWNLOADS_LATEST_VERSION: "Masz najnowszą wersję tego pliku",
	       DOWNLOADS_LAST_VERSION: "Ostatnio pobrano wersję ${0} tego pliku",
	       TAGS_HEADER: "Znaczniki",
	       DESCRIPTION_HEADER: "Opis",
	       DESCRIPTION_READ_MORE: "Więcej informacji...",
	       LINKS_HEADER: "Odsyłacze",
	       SECURITY: "Zabezpieczenia",
	       FILE_ENCRYPTED: "Treść pliku jest zaszyfrowana. Zaszyfrowanej treści pliku nie można przeszukiwać. Treści pliku nie można wyświetlić ani edytować przy użyciu programu HCL Docs.",
	       GET_LINKS: "Uzyskaj odsyłacze...",
	       ADD_DESCRIPTION: "Dodaj opis",
	       NO_DESCRIPTION: "Brak opisu",
	       ADD_TAGS: "Dodaj znaczniki",
	       NO_TAGS: "Brak znaczników"
	     },
	     COMMENTS: {
	       TITLE: "Komentarze",
	       TITLE_WITH_COUNT: "Komentarze (${0})",
	       VERSION: "Wersja ${0}",
	       FEED_LINK: "Kanał RSS dla tych komentarzy",
	       FEED_TITLE: "Śledź zmiany dotyczące tych komentarzy przy użyciu czytnika RSS"
	     },
	     SHARING: {
	       TITLE: "Współużytkowanie",
	       TITLE_WITH_COUNT: "Współużytkowane (${0})",
	       SHARED_WITH_FOLDERS: "Współużytkowane z folderami – ${count}",
	       SEE_WHO_HAS_SHARED: "Wyświetl osoby, które udostępniały do współużytkowania",
           COMMUNITY_FILE: "Pliki będące własnością społeczności nie mogą być udostępniane do współużytkowania dla osób ani innych społeczności. ",
           SHARED_WITH_COMMUNITY: "Współużytkowany z członkami społeczności ${0}",
           LOGIN: "Zaloguj",
           NO_SHARE: "Ten plik nie został jeszcze dodany do żadnego folderu.",
           ONE_SHARE: "Ten plik znajduje się w folderze lub społeczności, do których nie masz dostępu. ",
           MULTIPLE_SHARE: "Ten plik znajduje się w ${fileNumber} folderach lub społecznościach, do których nie masz dostępu."
	     },
	     VERSIONS: {
	       TITLE: "Wersje",
	       TITLE_WITH_COUNT: "Wersje (${0})",
	       FEED_LINK: "Kanał RSS dla tych wersji",
	       FEED_TITLE: "Śledź zmiany zachodzące w tym pliku przy użyciu czytnika RSS"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Potwierdzenie działania",
       DIALOG_TITLE: "Potwierdzenie",
       PROMPT: "Czy na pewno wykonać to działanie?",
       ERROR: "Wystąpił błąd podczas wykonywania działania. Spróbuj ponownie później.",
       TOOLTIP: "Wykonaj działanie",
       OK: "OK",
       CANCEL: "Anuluj",
       A11Y: "Ten przycisk powoduje wykonanie bieżącego działania."
     },
     THUMBNAIL: {
       TITLE: "Miniatura",
       CHANGE_LINK: "Zmień miniaturę...",
       ERROR: "Nie można zapisać miniatury. Spróbuj ponownie później.",
       EXT_ERROR: "Wybierz plik o jednym z następujących obsługiwanych rozszerzeń: ${0}",
       SUCCESS: "Zmieniono miniaturę",
       UPLOAD: "Zapisz",
       CANCEL: "Anuluj"
     },
     UPLOAD_VERSION: {
       LINK: "Prześlij nową wersję...",
       CHANGE_SUMMARY: "Opcjonalne podsumowanie zmian...",
       ERROR: "Nie można zapisać nowej wersji. Spróbuj ponownie później.",
       SUCCESS: "Zapisano nową wersję.",
       UPLOAD: "Prześlij",
       UPLOAD_AND_CHANGE_EXTENSION: "Prześlij i zmień rozszerzenie",
       CANCEL: "Anuluj"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Wystąpił błąd podczas uzyskiwania dostępu do pliku. Spróbuj ponownie później.",
       UNAUTHENTICATED: "Limit czasu sesji został przekroczony. Aby wyświetlić ten plik, należy zalogować się ponownie.",
       NOT_FOUND: "Żądany plik został usunięty lub przeniesiony. Jeśli ten odsyłacz został przysłany przez innego użytkownika, sprawdź, czy jest on poprawny.",
       ACCESS_DENIED: "Nie masz uprawnień do wyświetlania tego pliku. Ten plik nie został udostępniony do współużytkowania dla bieżącego użytkownika.",
       ACCESS_DENIED_ANON: "Nie masz uprawnień do wyświetlania tego pliku. Jeśli jest to plik, którego właścicielem jest bieżący użytkownik, lub jest to plik udostępniony mu do współużytkowania, użytkownik musi najpierw się zalogować."
     },
     LOAD_ERROR: {
       DEFAULT: "Niestety, wystąpił błąd podczas uzyskiwania dostępu do odsyłacza. ",
       ACCESS_DENIED: "Skontaktuj się z właścicielem pliku, aby poprosić o uprawnienia do wyświetlenia tego pliku. "
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - Plik",
       LOAD_ERROR: "Błąd podczas uzyskiwania dostępu do pliku"
     }
  },

   "pt-br": true,
    "ca": true,
    "cs": true,
    "da": true,
    "nl": true,
    "fi": true,
    "fr": true,
    "de": true,
    "el": true,
    "hu": true,
    "pt": true,
    "it": true,
    "ja": true,
    "ko": true,
    "no": true,
    "pl": true,
    "ru": true,
    "zh": true,
    "sl": true,
    "es": true,
    "sv": true,
    "th": true,
    "zh-tw": true,
    "tr": true
});
