define({
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
  /* The placeholders for date formatting strings are as follows:
		   ${EEEE} is day of the week (e.g. Monday)
		   ${MMM} is the month in short notation (e.g. Jan, Feb)
		   ${time} is time (e.g. 6:00 PM)
		   ${d} is numerical day of the month (e.g 15)
		   ${YYYY} is year (e.g. 2012)
		*/
		   common: {
		      more: {
		         label: "Więcej",
		         tooltip: "Więcej działań"
		       },
		       tags_more: "i jeszcze ${0}",
		       ERROR_ALT: "Błąd",
		       PERSON_TITLE: "Otwórz profil użytkownika ${user}.",
		       inactiveUser: "${user} (nieaktywny użytkownik)",
		       inactiveIndicator: "(nieaktywny)",
		       like_error: "Nie można zapisać polubienia. Spróbuj ponownie później.",
		       vote_error: "Nie można zapisać głosu. Spróbuj ponownie później."
		   },
		   generic: {
		      untitled: "(Bez tytułu)",
		      tags: "Znaczniki:",
		      tags_more: "i jeszcze ${0}",
		      likes: "Polubienia",
		      comments: "Komentarze",
		      titleTooltip: "Przejdź do: ${app}",
		      error: "Nie można pobrać danych.",
		      timestamp: {
		         created: {
		            DAY: "Utworzono: ${EEEE} o ${time}",
		            MONTH: "Utworzono: ${d} ${MMM}",
		            TODAY: "Utworzono: dzisiaj o ${time}",
		            YEAR: "Utworzono: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Utworzono: wczoraj o ${time}",
		            TOMORROW: "Utworzono: ${d} ${MMM} ${YYYY}"
		         },
		         updated: {
		            DAY: "Zaktualizowano: ${EEEE} o ${time}",
		            MONTH: "Zaktualizowano: ${d} ${MMM}",
		            TODAY: "Zaktualizowano: dzisiaj o ${time}",
		            YEAR: "Zaktualizowano: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Zaktualizowano: wczoraj o ${time}",
		            TOMORROW: "Zaktualizowano: ${d} ${MMM} ${YYYY}"
		         }
		      },
		      visibility: {
		         pub: "Publiczne",
		         priv: "Prywatne"
		      },
		      action: {
		         created: "Utworzono",
		         updated: "Zaktualizowano"
		      }
		   },
		   network : {
		      friendsInviteUpdatesDescription: "Otrzymuj aktualizacje dotyczące śledzonych osób w komponencie Strona główna i w podsumowaniu wysyłanym za pomocą poczty elektronicznej.",
		      profile_title: "Otwórz profil użytkownika ${user}.",
		      profile_a11y: "Aktywowanie tego odsyłacza spowoduje otwarcie profilu użytkownika ${user} w nowym oknie.",
		      error: "Wystąpił błąd.  ${again}.",
		      error_again: "Spróbuj ponownie",
		      error_404: "Zapytanie o dołączenie do sieci już nie istnieje.",
		      warning: "Ostrzeżenie",
		      messages: {
		         success: {
		            accept: {
		            	nofollow: "Teraz jesteś w kontaktach sieciowych.",
		            	follow: "Teraz jesteś w kontaktach sieciowych i śledzisz użytkownika ${user}."
		            },
		            ignore: {
		            	nofollow: "Zignorowano zaproszenie.",
		            	follow: "Zaproszenie zostało zignorowane, ale teraz śledzisz użytkownika ${user}."
		            }
		         },
		         error: {
		            accept: "Wystąpił błąd podczas akceptowania żądania.",
		            ignore: "Wystąpił błąd podczas ignorowania żądania."
		         }
		      },
		      timestamp: {
		          created: {
		              DAY: "${EEEE} o ${time}",
		              MONTH: "${d} ${MMM}",
		              TODAY: "dzisiaj o ${time}",
		              YEAR: "${d} ${MMM} ${YYYY}",
		              YESTERDAY: "wczoraj o ${time}",
		              TOMORROW: "${d} ${MMM} ${YYYY}"
		           }
		      }
		   },
		   file: {
		      a11y_help: "Aktywowanie tego odsyłacza spowoduje otwarcie ${name} w nowym oknie.",
		      tooltip: "Otwórz ${name} w aplikacji Pliki",
		      profile_title: "Otwórz profil użytkownika ${user}.",
		      profile_a11y: "Aktywowanie tego odsyłacza spowoduje otwarcie profilu użytkownika ${user} w nowym oknie.",
		      download_tooltip: "Pobierz ten plik (${0})",
		      following: {
		         add: "Śledź plik",
		         remove: "Anuluj śledzenie",
		         title: "Używając przełącznika określ, czy chcesz otrzymywać aktualizacje dotyczące tego pliku"
		      },
		      share: {
		         label: "Udostępnij",
		         title: "Przyznaj innym użytkownikom dostęp do tego pliku"
		      },
		      timestamp: {
		         created: {
		            DAY: "Utworzono: ${EEEE} o ${time}",
		            MONTH: "Utworzono: ${d} ${MMM}",
		            TODAY: "Utworzono: dzisiaj o ${time}",
		            YEAR: "Utworzono: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Utworzono: wczoraj o ${time}",
		            TOMORROW: "Utworzono: ${d} ${MMM} ${YYYY}"
		         },
		         createdOther: {
		            DAY: "Utworzone przez użytkownika ${user}: ${EEEE} o ${time}",
		            MONTH: "Utworzone przez użytkownika ${user}: ${d} ${MMM}",
		            TODAY: "Utworzone przez użytkownika ${user}: dzisiaj o ${time}",
		            YEAR: "Utworzone przez użytkownika ${user}: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Utworzone przez użytkownika ${user}: wczoraj o ${time}",
		            TOMORROW: "Utworzone przez użytkownika ${user}: ${d} ${MMM} ${YYYY}"
		         },
		         updated: {
		            DAY: "Zaktualizowano: ${EEEE} o ${time}",
		            MONTH: "Zaktualizowano: ${d} ${MMM}",
		            TODAY: "Zaktualizowano: dzisiaj o ${time}",
		            YEAR: "Zaktualizowano: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Zaktualizowano: wczoraj o ${time}",
		            TOMORROW: "Zaktualizowano: ${d} ${MMM} ${YYYY}"
		         },
		         updatedOther: {
		            DAY: "Zaktualizowane przez użytkownika ${user}: ${EEEE} o ${time}",
		            MONTH: "Zaktualizowane przez użytkownika ${user}: ${d} ${MMM}",
		            TODAY: "Zaktualizowane przez użytkownika ${user}: dzisiaj o ${time}",
		            YEAR: "Zaktualizowane przez użytkownika ${user}: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Zaktualizowane przez użytkownika ${user}: wczoraj o ${time}",
		            TOMORROW: "Zaktualizowane przez użytkownika ${user}: ${d} ${MMM} ${YYYY}"
		         },
		         createdCompact: {
		            DAY: "Utworzono: ${EEEE} o ${time}",
		            MONTH: "Utworzono: ${d} ${MMM}",
		            TODAY: "Utworzono: dzisiaj o ${time}",
		            YEAR: "Utworzono: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Utworzono: wczoraj o ${time}",
		            TOMORROW: "Utworzono: ${d} ${MMM} ${YYYY}"
		         },
		         updatedCompact: {
		            DAY: "Zaktualizowano: ${EEEE} o ${time}",
		            MONTH: "Zaktualizowano: ${d} ${MMM}",
		            TODAY: "Zaktualizowano: dzisiaj o ${time}",
		            YEAR: "Zaktualizowano: ${d} ${MMM} ${YYYY}",
		            YESTERDAY: "Zaktualizowano: wczoraj o ${time}",
		            TOMORROW: "Zaktualizowano: ${d} ${MMM} ${YYYY}"
		         }
		      },
		      about: {
		         CREATE_TIMESTAMP: "${date_long} o ${time_long} przez użytkownika ${user}",
		         UPDATE_TIMESTAMP: "${date_long} o ${time_long} przez użytkownika ${user}",
		         ANYUPDATE_TIMESTAMP: "${date_long} o ${time_long}"
		      },
		      download: {
		      	 TOOLTIP: "Pobierz plik (${size})",
		      	 DOWNLOAD_ALT: "Pobierz"
		      },
		      PREVIEW: {
		         LINK: "Podgląd",
		         TITLE: "Wyświetl podgląd tego pliku w nowym oknie."
		      },
		      TAGS: "Znaczniki:",
		      error: "Wystąpił błąd.  ${again}.",
		      error_again: "Spróbuj ponownie",
		      error_404: "Plik już nie istnieje lub użytkownik nie ma wystarczających uprawnień, aby uzyskać dostęp do tego pliku.",
		      error_403: "Nie masz uprawnień do wyświetlania tego pliku. Plik nie jest publiczny i nie jest udostępniony do współużytkowania.",
		      notifications: {
		         USER_SHARED: "Użytkownik ${user} napisał:",
		         CHANGE_SUMMARY: "Użytkownik ${user} udostępnił podsumowanie zmian",
		         NO_CHANGE_SUMMARY: "Użytkownik ${user} nie udostępnił podsumowania zmian",
		         COMMENTED: "Użytkownik ${user} dodał komentarz"
		      }
		   },
		   ecm_file: {
		      checkedout_you: "Pobrane z biblioteki przez użytkownika",
		      checkedout_other: "Pobrane z biblioteki przez użytkownika ${user}",
		      tooltip: "Otwórz plik ${name} w bibliotece",
		      draft_404_info: "Wersja robocza została usunięta lub nie jest już udostępniona do współużytkowania dla Ciebie. Opublikowana wersja jest teraz najnowszą wersją tego pliku.",
		      error_404: "Plik został usunięty lub nie jest już udostępniony do współużytkowania dla Ciebie.",
		      error_403: "Plik został usunięty lub nie jest już udostępniony do współużytkowania dla Ciebie.",
		      error_preview: "Plik nie jest już dostępny do podglądu.",
		      draft_review_canceled: "Żądanie przeglądu zostało anulowane i wersja robocza nie jest już udostępniona dla Ciebie do współużytkowania. Żądanie dotyczące przejrzenia przez Ciebie jest już nieaktualne.",
		      switch_ee: "Wyświetl wersję roboczą",
		      switch_ee_tooltip: "Wyświetl najnowszą wersję roboczą dla tego pliku"
		   },
		   ecm_draft: {
		      tooltip: "Otwórz wersję roboczą ${name} z biblioteki",
		      community_owners: "Właściciele społeczności",
		      draft: "Wersja robocza",
		      draft_tooltip: "Wyświetlanie wersji roboczej",
		      draft_general_info: "Poprzednia wersja robocza już nie istnieje. Nowsza wersja robocza jest teraz najnowszą wersją.",
		      draft_review_404_general_info: "Jeden z recenzentów już zagłosował. Nie musisz już przeglądać tej wersji roboczej.",
		      draft_review_404_request_info: "Poprzednia wersja robocza już nie istnieje, a najnowsza wersja robocza została wysłana do przejrzenia. Zażądano przejrzenia przez Ciebie.",
		      draft_review_404_require_info: "Poprzednia wersja robocza już nie istnieje, a najnowsza wersja robocza została wysłana do przejrzenia. Przejrzenie przez Ciebie jest wymagane.",
		      draft_review_request_info: "Zażądano przejrzenia przez Ciebie.",
		      draft_review_require_info: "Przejrzenie przez Ciebie jest wymagane.",
		      error_404: "Wersja robocza została usunięta lub nie jest już udostępniona do współużytkowania dla Ciebie.",
		      error_403: "Nie można wyświetlić tej wersji roboczej, ponieważ nie została ona udostępniona do współużytkowania dla Ciebie.",
		      error_preview: "Wersja robocza nie jest już dostępna do podglądu.",
		      switch_ee: "Wyświetl wersję opublikowaną",
		      switch_ee_tooltip: "Wyświetl wersję opublikowaną tego pliku",
		      review: "Przegląd",
		      reviewers: "Recenzenci",
		      reviwers_addtl: "Dodatkowi recenzenci",
		      in_review: "Wersja robocza w przeglądzie",
		      in_review_tooltip: "Wyświetlanie wersji roboczej w przeglądzie",
		      review_required_any: "Właściciele społeczności wymagają, aby ta wersja robocza została przejrzana przez jednego recenzenta.",
		      review_required_all: "Właściciele społeczności wymagają, aby ta wersja robocza została przejrzana przez wszystkich recenzentów.",
		      review_required_generic: "Właściciele społeczności wymagają, aby ta wersja robocza została przejrzana przez tych recenzentów.",
		      review_additional_required: "Tę wersję roboczą muszą przejrzeć wszyscy recenzenci, którzy zostali dodani przez użytkownika wysyłającego wersję roboczą.",
		      reivew_submitted_date: {
		         DAY: "Użytkownik ${user} wysłał wersję roboczą do przejrzenia: ${EEEE} o ${time}.",
		         MONTH: "Użytkownik ${user} wysłał wersję roboczą do przejrzenia: ${d} ${MMM}",
		         TODAY: "Użytkownik ${user} wysłał wersję roboczą do przejrzenia: dzisiaj o ${time}.",
		         YEAR: "Użytkownik ${user} wysłał wersję roboczą do przejrzenia: ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Użytkownik ${user} wysłał wersję roboczą do przejrzenia: wczoraj o ${time}.",
		         TOMORROW: "Użytkownik ${user} wysłał wersję roboczą do przejrzenia: ${d} ${MMM} ${YYYY}."
		      },
		      pending: "Oczekujące",
		      pending_rejected: "Przegląd nie jest już potrzebny, ponieważ wersja robocza została odrzucona",
		      approve: "Zatwierdź",
		      approved: "Zatwierdzone",
		      approve_tooltip: "Zatwierdź tę wersję roboczą",
		      accept_success: "Ta wersja robocza została zatwierdzona.",
		      accept_error: "Wystąpił błąd podczas zatwierdzania tej wersji roboczej. Spróbuj ponownie.",
		      accept_info: "Zatwierdzono tę wersję roboczą.",
		      reject: "Odrzuć",
		      rejected: "Odrzucone",
		      reject_tooltip: "Odrzuć tę wersję roboczą",
		      reject_success: "Ta wersja robocza została odrzucona.",
		      reject_error: "Wystąpił błąd podczas odrzucania tej wersji roboczej. Spróbuj ponownie.",
		      reject_info: "Ta wersja robocza została odrzucona."
		   },
		   authUser: {
		      error: "Wystąpił błąd podczas pobierania bieżącego użytkownika.  ${again}.",
		      error_again: "Spróbuj ponownie",
		      error_404: "Nie można znaleźć uwierzytelnionego użytkownika.",
		      error_403: "Brak uprawnień do pobrania informacji o użytkowniku."
		   },
		   forum: {
		      error: "Wystąpił błąd.  ${again}.",
		      error_again: "Spróbuj ponownie",
		      error_404: "Forum już nie istnieje lub użytkownik nie ma wystarczających uprawnień, aby uzyskać dostęp do niego.",
		      error_403: "Nie masz uprawnień do wyświetlania tego forum. Forum nie jest publiczne i nie jest udostępnione do współużytkowania.",
		      readMore: "Wyświetl cały wątek...",
		      readMore_tooltip: "Wyświetl wątek forum o nazwie ${name}.",
		      readMore_a11y: "Aktywowanie tego odsyłacza spowoduje otwarcie wątku forum ${name} w nowym oknie.",
		      QUESTION_ANSWERED: "Na to pytanie udzielono odpowiedzi.",
		      QUESTION_NOT_ANSWERED: "Na to pytanie jeszcze nie udzielono odpowiedzi.",
		      attachments: "Załączniki: ${count}",
		      attachments_one: "Załączniki: ${count}"
		   },
		   blog: {
		      error: "Wystąpił błąd.  ${again}.",
		      error_again: "Spróbuj ponownie",
		      error_404: "Blog już nie istnieje lub użytkownik nie ma wystarczających uprawnień, aby uzyskać dostęp do tego bloga.",
		      error_403: "Nie masz uprawnień do wyświetlania tego bloga. Blog nie jest publiczny i nie jest udostępniony do współużytkowania dla użytkownika.",
		      readMore: " Więcej informacji...",
		      readMore_tooltip: "Otwórz wpis w blogu ${name}.",
		      readMore_a11y: "Aktywowanie tego odsyłacza spowoduje otwarcie wpisu w blogu ${name} w nowym oknie.",
		      graduated: "Awansowane",
		  	  vote: {
		  		  INLINE: {
		  				UNRECOMMENDED: {
		  					READONLYTEXT: "",
		  					TEXT: 		"<a class='lotusLikeAction' role='button' href='javascript:;' id='TOGGLE_${id}'>Głosuj</a>",
		  					TOOLTIP: 	"Głosuj na to"
		  				},
		  				RECOMMENDED: {
		  					READONLYTEXT: "<span class='lotusLikeDescription'>Głosowano</span>",
		  					TEXT: 		"<span class='lotusLikeDescription'>Głosowano</span> <span class='lotusDivider' role='presentation'>-</span> <a class='lotusLikeActions' role='button' aria-label='Voted - Undo' href='javascript:;' id='TOGGLE_${id}'>Cofnij</a>",
		  					TOOLTIP: 	"Wycofaj swój głos oddany na to"
		  				},
		  				RECOMMENDED_BYNONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"Na ten zasób zagłosowało 0 osób"
		  				},
		  				RECOMMENDED_BYONE:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"Na ten zasób zagłosowała 1 osoba"
		  				},
		  				RECOMMENDED_BYMANY:  {
		  					READONLYTEXT: "${recommendCount}",
		  					TEXT: 		"${recommendCount}",
		  					TOOLTIP: 	"Na ten zasób zagłosowała następująca liczba osób: ${recommendCount}"
		  				}
		  			},
		  			LOADING: "Ładowanie...",
		  			TEMPLATE_STRINGS: {
		  				LIKES: "Głosowano"
		  			}
		  		}
		   },
		   idea: {
			  error_404: "Nie można zapisać głosu, ponieważ osiągnięty został limit liczby oddanych głosów lub pomysł nie jest już dostępny.",
		      readMore_tooltip: "Otwórz pomysł ${name}.",
		      readMore_a11y: "Aktywowanie tego odsyłacza spowoduje otwarcie pomysłu ${name} w nowym oknie."
		   },
		   size: {
		      B: "${0} B",
		      KB: "${0} kB",
		      MB: "${0} MB",
		      GB: "${0} GB"
		   },
		   REPLIES: {
		      ARIA_LABEL: "Odpowiedzi",
		      THIS_ARIA_LABEL: "Ta odpowiedź",
		      THIS_TAB_TITLE: "Ta odpowiedź",
		      TAB_TITLE: "Liczba odpowiedzi: (${0})",
		      REPLY_TO_REPLY: "W odpowiedzi na ${thisReply}",
		      REPLY_TO_TOPIC: "W odpowiedzi na ${thisTopic}",
		      THIS_TOPIC: "ten wątek",
		      THIS_REPLY: "tę odpowiedź",
		      NAVIGATE_TO_REPLY: "Przejdź do odpowiedzi nadrzędnej",
		      NAVIGATE_TO_TOPIC: "Przejdź do wątku nadrzędnego",
		      ADD_COMMENT: "Odpowiedz w tym wątku",
		      ADD_COMMENT_TOOLTIP: "Odpowiedz w tym wątku forum",
		      SHOWING_RECENT_REPLIES: "Wyświetlanie następującej liczby najnowszych odpowiedzi: ${0}",
		      PREV_COMMENTS: "Pokaż więcej odpowiedzi",
		      PLACEHOLDER_TXT: "Odpowiedz w tym wątku",
		      EMPTY: "Nie ma odpowiedzi.",
		      TRIM_LONG_COMMENT: "Czy skrócić odpowiedź?",
		      WARN_LONG_COMMENT: "Odpowiedź jest zbyt długa.  ${shorten}",
		      ERROR: "Wystąpił błąd podczas pobierania odpowiedzi. ${again}",
		      ERROR_CREATE: "Nie można zapisać odpowiedzi.  Spróbuj ponownie później.",
		      ERROR_CREATE_NOT_FOUND: "Nie można zapisać odpowiedzi, ponieważ wątek został usunięty lub nie jest już widoczny dla użytkownika.",
		      ERROR_CREATE_ACCESS_DENIED: "Nie można zapisać odpowiedzi, ponieważ wątek został usunięty lub nie jest już widoczny dla użytkownika.",
		      ERROR_CREATE_TIMEOUT: "Nie można zapisać odpowiedzi, ponieważ nie można nawiązać kontaktu z serwerem.  Kliknij przycisk Zapisz, aby spróbować ponownie.",
		      ERROR_CREATE_CANCEL: "Nie można zapisać odpowiedzi, ponieważ żądanie zostało anulowane.  Kliknij przycisk Zapisz, aby spróbować ponownie.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Aby utworzyć tę odpowiedź, należy się zalogować.  Kliknij przycisk Zapisz, aby wyświetlić prośbę o zalogowanie.",
		      ERROR_NO_CONTENT: "Wpisz odpowiedź i kliknij opcję Zapisz.  Aby zrezygnować z wprowadzenia odpowiedzi, kliknij przycisk Anuluj.",
		      ERROR_UNAUTHORIZED: "Nie można zapisać odpowiedzi, ponieważ nie masz uprawnień do udzielania odpowiedzi.",
		      COMMENT_DELETED: {
		         DAY: "Odpowiedź została usunięta przez użytkownika ${user} ${EEEE} o ${time}",
		         MONTH: "Odpowiedź została usunięta przez użytkownika ${user} ${d} ${MMM}",
		         TODAY: "Odpowiedź została usunięta przez użytkownika ${user} dzisiaj o ${time}",
		         YEAR: "Odpowiedź została usunięta przez użytkownika ${user} ${d} ${MMM} ${YYYY}",
		         YESTERDAY: "Odpowiedź została usunięta przez użytkownika ${user} wczoraj o ${time}",
		         TOMORROW: "Odpowiedź została usunięta przez użytkownika ${user} ${d} ${MMM} ${YYYY}"
		      },
		      REASON_FOR_DELETION: "Powód usunięcia: ${reason}",
		      REPLY_TITLE: "ODP: ${0}",
		      SHOW_FULL_REPLY: "Wyświetl całą odpowiedź",
		      SHOW_FULL_REPLY_TOOLTIP: "Przejdź do oryginalnej odpowiedzi w wątku forum",
		      REPLY_ACTION: "Odpowiedz",
		      REPLY_ACTION_TOOLTIP: "Odpowiedz na ten wpis",
		      MODERATION_PENDING: "Ta odpowiedź oczekuje na przegląd.",
		      MODERATION_QUARANTINED: "Wpis został poddany kwarantannie przez moderatora.",
		      MODERATION_REMOVED: {
		         DAY: "Ta odpowiedź została usunięta przez użytkownika ${user}: ${EEEE} o ${time}.",
		         MONTH: "Ta odpowiedź została usunięta przez użytkownika ${user}: ${d} ${MMMM}.",
		         TODAY: "Ta odpowiedź została usunięta przez użytkownika ${user}: dzisiaj o ${time}.",
		         YEAR: "Ta odpowiedź została usunięta przez użytkownika ${user}: ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Ta odpowiedź została usunięta przez użytkownika ${user}: wczoraj o ${time}.",
		         TOMORROW: "Ta odpowiedź została usunięta przez użytkownika ${user}: ${d} ${MMM} ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Ta odpowiedź została odrzucona przez użytkownika ${user}: ${EEEE} o ${time}.",
		         MONTH: "Ta odpowiedź została odrzucona przez użytkownika ${user}: ${d} ${MMM}.",
		         TODAY: "Ta odpowiedź została odrzucona przez użytkownika ${user}: dzisiaj o ${time}.",
		         YEAR: "Ta odpowiedź została odrzucona przez użytkownika ${user}: ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Ta odpowiedź została odrzucona przez użytkownika ${user}: wczoraj o ${time}.",
		         TOMORROW: "Ta odpowiedź została odrzucona przez użytkownika ${user}: ${d} ${MMM} ${YYYY}."
		      }
		   },
		   REPLIES_SUBMITTED: {
		      CONFIRM: "Odpowiedź została wysłana do przejrzenia i będzie dostępna po zatwierdzeniu."
		   },
		   COMMENTS: {
		      ARIA_LABEL: "Komentarze",
		      PLACEHOLDER_TXT: "Dodaj komentarz",
		      TAB_TITLE: "Komentarze (${0})",
		      ACTION_NOT_SUPPORTED: "Nieobsługiwane działanie",
		      ADD_COMMENT: "Dodaj komentarz",
		      ADD_COMMENT_TOOLTIP: "Dodaj komentarz dotyczący tego elementu",
		      CANCEL: "Anuluj",
		      COMMENT_COUNT_ONE: "${0} komentarz",
		      COMMENT_COUNT_MANY: "Liczba komentarzy: ${0}",
		      COMMENT_LABEL: "Komentarz:",
		      DELETE: "Usuń",
		      DELETE_TOOLTIP: "Usuń komentarz",
		      DELETEREASON: "Przyczyna usunięcia tego komentarza:",
		      DIALOG_TITLE: "Skracanie komentarza",
		      TOOLTIP: "Skróć komentarz",
		      NAME: "Skróć komentarz",
		      EDIT: "Edytuj",
		      EDIT_TOOLTIP: "Edytuj komentarz",
		      ERROR_CREATE: "Nie można zapisać komentarza.  Spróbuj ponownie później.",
		      ERROR_CREATE_NOT_FOUND: "Nie można zapisać komentarza, ponieważ element został usunięty lub nie jest już widoczny dla użytkownika.",
		      ERROR_CREATE_ACCESS_DENIED: "Nie można zapisać komentarza, ponieważ element został usunięty lub nie jest już widoczny dla użytkownika.",
		      ERROR_CREATE_TIMEOUT: "Nie można zapisać komentarza, ponieważ nie można nawiązać kontaktu z serwerem.  Kliknij przycisk Publikuj, aby spróbować ponownie.",
		      ERROR_CREATE_CANCEL: "Nie można zapisać komentarza, ponieważ żądanie zostało anulowane.  Kliknij przycisk Publikuj, aby spróbować ponownie.",
		      ERROR_CREATE_NOT_LOGGED_IN: "Aby utworzyć ten komentarz, należy się zalogować.  Kliknij przycisk Publikuj, aby wyświetlić prośbę o zalogowanie.",
		      ERROR_DELETE: "Nie można usunąć komentarza.  Spróbuj ponownie później.",
		      ERROR_DELETE_TIMEOUT: "Nie można usunąć komentarza, ponieważ nie można nawiązać kontaktu z serwerem.  Kliknij przycisk Usuń, aby spróbować ponownie.",
		      ERROR_DELETE_NOT_FOUND: "Nie można usunąć komentarza, ponieważ komentarz lub plik został usunięty albo nie jest już widoczny dla użytkownika.",
		      ERROR_DELETE_ACCESS_DENIED: "Nie można usunąć komentarza, ponieważ element został usunięty lub nie jest już widoczny dla użytkownika.",
		      ERROR_DELETE_CANCEL: "Nie można usunąć komentarza, ponieważ żądanie zostało anulowane.  Kliknij przycisk Usuń, aby spróbować ponownie.",
		      ERROR_DELETE_NOT_LOGGED_IN: "Aby usunąć ten komentarz, należy się zalogować.  Kliknij przycisk Usuń, aby wyświetlić prośbę o zalogowanie.",
		      ERROR_EDIT: "Nie można zaktualizować komentarza.  Spróbuj ponownie później.",
		      ERROR_EDIT_ACCESS_DENIED: "Nie można zaktualizować komentarza, ponieważ element został usunięty lub nie jest już widoczny dla użytkownika.",
		      ERROR_EDIT_NOT_FOUND: "Nie można zaktualizować komentarza, ponieważ element został usunięty lub nie jest już widoczny dla użytkownika.",
		      ERROR_EDIT_TIMEOUT: "Nie można zaktualizować komentarza, ponieważ nie można nawiązać kontaktu z serwerem.  Kliknij przycisk Publikuj, aby spróbować ponownie.",
		      ERROR_EDIT_CANCEL: "Nie można zaktualizować komentarza, ponieważ żądanie zostało anulowane.  Kliknij przycisk Publikuj, aby spróbować ponownie.",
		      ERROR_EDIT_NOT_LOGGED_IN: "Aby móc edytować ten komentarz, należy się zalogować.  Kliknij przycisk Publikuj, aby wyświetlić prośbę o zalogowanie.",
		      ERROR_NO_CONTENT: "Wpisz komentarz i kliknij przycisk Publikuj.  Aby zrezygnować z wprowadzenia komentarza, kliknij przycisk Anuluj.",
		      ERROR_NO_CONTENT_EDIT: "Wpisz komentarz i kliknij przycisk Publikuj.  Aby zrezygnować z edycji komentarza, kliknij przycisk Anuluj.",
		      ERROR_UNAUTHORIZED: "Nie można zapisać komentarza, ponieważ nie masz uprawnień do wprowadzania komentarzy.",
		      ERROR_GENERAL: "Wystąpił błąd.",
		      OK: "OK",
		      YES: "Tak",
		      TRIM_LONG_COMMENT: "Czy skrócić komentarz?",
		      WARN_LONG_COMMENT: "Komentarz jest zbyt długi.  ${shorten}",
		      LINK: "Odsyłacz",
		      SAVE: "Zapisz",
		      POST: "Publikuj",
		      SHOWMORE: "Więcej informacji...",
		      VIEW_COMMENTS_FILE: "Wyświetl komentarze dotyczące tego pliku",
		      SUBSCRIBE_TO_COMMENTS: "Subskrybuj te komentarze",
		      SUBSCRIBE_TO_COMMENTS_TOOLTIP: "Śledź zmiany dotyczące tych komentarzy przy użyciu czytnika RSS",
		      PROFILE_TITLE: "Otwórz profil użytkownika ${user}.",
		      PROFILE_A11Y: "Aktywowanie tego odsyłacza spowoduje otwarcie profilu użytkownika ${user} w nowym oknie.",
		      MODERATION_PENDING: "Ten komentarz oczekuje na przegląd.",
		      MODERATION_REMOVED: {
		         DAY: "Ten komentarz został usunięty przez użytkownika ${user}: ${EEEE} o ${time}.",
		         MONTH: "Ten komentarz został usunięty przez użytkownika ${user}: ${d} ${MMM}.",
		         TODAY: "Ten komentarz został usunięty przez użytkownika ${user}: dzisiaj o ${time}.",
		         YEAR: "Ten komentarz został usunięty przez użytkownika ${user}: ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Ten komentarz został usunięty przez użytkownika ${user}: wczoraj o ${time}.",
		         TOMORROW: "Ten komentarz został usunięty przez użytkownika ${user}: ${d} ${MMM} ${YYYY}."
		      },
		      MODERATION_REJECTED: {
		         DAY: "Ten komentarz został odrzucony przez użytkownika ${user}: ${EEEE} o ${time}.",
		         MONTH: "Ten komentarz został odrzucony przez użytkownika ${user}: ${d} ${MMM}.",
		         TODAY: "Ten komentarz został odrzucony przez użytkownika ${user}: dzisiaj o ${time}.",
		         YEAR: "Ten komentarz został odrzucony przez użytkownika ${user}: ${d} ${MMM} ${YYYY}.",
		         YESTERDAY: "Ten komentarz został odrzucony przez użytkownika ${user}: wczoraj o ${time}.",
		         TOMORROW: "Ten komentarz został odrzucony przez użytkownika ${user}: ${d} ${MMM} ${YYYY}."
		      },
		      PREV_COMMENTS: "Pokaż poprzednie komentarze",
		      EMPTY: "Brak komentarzy.",
		      ERROR_ALT: "Błąd",
		      ERROR: "Wystąpił błąd podczas pobierania komentarzy. ${again}",
		      ERROR_ADDTL: "Wystąpił błąd podczas pobierania dodatkowych komentarzy. ${again}",
		      ERROR_AGAIN: "Spróbuj ponownie.",
		      ERROR_AGAIN_TITLE: "Ponów żądanie pobrania większej liczby komentarzy.",
		      COMMENT_CREATED: {
		         DAY: "${user} ${EEEE} o ${time} (wersja ${version})",
		         MONTH: "${user} ${d} ${MMM} (wersja ${version})",
		         TODAY: "${user} dzisiaj o ${time} (wersja ${version})",
		         YEAR: "${user} ${d} ${MMM} ${YYYY} (wersja ${version})",
		         YESTERDAY: "${user} wczoraj o ${time} (wersja ${version})",
		         TOMORROW: "${user} ${d} ${MMM} ${YYYY} (wersja ${version})"
		      },
		      COMMENT_CREATED_NOVERSION: {
		         DAY: "${user} ${EEEE} o ${time}",
		         MONTH: "${user} ${MMM} ${d}",
		         TODAY: "${user} dzisiaj o ${time}",
		         YEAR: "${user} ${MMM} ${d}, ${YYYY}",
		         YESTERDAY: "${user} wczoraj o ${time}",
		         TOMORROW: "${user} ${MMM} ${d}, ${YYYY}"
		      },
		      COMMENT_CREATED_TIME: {
		         DAY: "${EEEE} o ${time}",
		         MONTH: "${d} ${MMM}",
		         TODAY: "dzisiaj o ${time}",
		         YEAR: "${d} ${MMM} ${YYYY}",
		         YESTERDAY: "wczoraj o ${time}",
		         TOMORROW: "${d} ${MMM} ${YYYY}"
		      },
		      COMMENT_DELETED: {
		         DAY: "Komentarz został usunięty przez użytkownika ${user}: ${EEEE} o ${time}",
		         MONTH: "Komentarz został usunięty przez użytkownika ${user}: ${d} ${MMM}",
		         TODAY: "Komentarz został usunięty przez użytkownika ${user}: dzisiaj o ${time}",
		         YEAR: "Komentarz został usunięty przez użytkownika ${user}: ${d} ${MMM} ${YYYY}",
		         YESTERDAY: "Komentarz został usunięty przez użytkownika ${user}: wczoraj o ${time}",
		         TOMORROW: "Komentarz został usunięty przez użytkownika ${user}: ${d} ${MMM} ${YYYY}"
		      },
		      COMMENT_EDITED: {
		         DAY: "Użytkownik ${user} dokonał edycji: ${EEEE} o ${time} (wersja ${version})",
		         MONTH: "Użytkownik ${user} dokonał edycji ${d} ${MMM} (wersja ${version})",
		         TODAY: "Użytkownik ${user} dokonał edycji: dzisiaj o ${time} (wersja ${version})",
		         YEAR: "Użytkownik ${user} dokonał edycji: ${d} ${MMM} ${YYYY} (wersja ${version})",
		         YESTERDAY: "Użytkownik ${user} dokonał edycji: wczoraj o ${time} (wersja ${version})",
		         TOMORROW: "Użytkownik ${user} dokonał edycji: ${d} ${MMM} ${YYYY} (wersja ${version})"
		      },
		      COMMENT_EDITED_NOVERSION: {
		         DAY: "Użytkownik ${user} dokonał edycji: ${EEEE} o ${time}",
		         MONTH: "Użytkownik ${user} dokonał edycji ${d} ${MMM}",
		         TODAY: "Użytkownik ${user} dokonał edycji: dzisiaj o ${time}",
		         YEAR: "Użytkownik ${user} dokonał edycji: ${d} ${MMM} ${YYYY}",
		         YESTERDAY: "Użytkownik ${user} dokonał edycji: wczoraj o ${time}",
		         TOMORROW: "Użytkownik ${user} dokonał edycji: ${d} ${MMM} ${YYYY}"
		      },
		      DELETE_CONFIRM: "Czy na pewno usunąć ten komentarz?",
		      FLAG_ITEM: {
		         BUSY: "Zapisywanie...",
		         CANCEL: "Anuluj",
		         ACTION: "Oznacz jako niestosowny",
		         DESCRIPTION_LABEL: "Podaj przyczynę oznaczenia tego elementu (opcjonalnie)",
		         EDITERROR: "Metadane pliku nie zostały zmienione z powodu wystąpienia błędu.",
		         OK: "Zapisz",
		         ERROR_SAVING: "Wystąpił błąd podczas przetwarzania żądania. Spróbuj ponownie później.",
		         SUCCESS_SAVING: "Flaga została wprowadzona. Wkrótce zostanie zbadana przez moderatora.",
		         TITLE: "Oznacz element jako niestosowny",
		         COMMENT: {
		            TITLE: "Oznacz komentarz jako niestosowny",
		            A11Y: "Ten przycisk powoduje otwarcie okna dialogowego, które umożliwia użytkownikowi oznaczenie tego komentarza jako niestosownego."
		         }
		      }
		   },
		   COMMENTS_DELETE: {
		      CANCEL: "Anuluj",
		      DIALOG_TITLE: "Usuwanie komentarza",
		      NAME: "Usuń komentarz",
		      OK: "OK",
		      TOOLTIP: "Usuń komentarz"
		   },
		   COMMENTS_SHORTEN: {
		      CANCEL: "Anuluj",
		      CONFIRM: "Skrócenie komentarza spowoduje usunięcie tekstu wykraczającego poza limit określony dla komentarza.  Kliknij przycisk OK, aby skrócić komentarz, lub kliknij przycisk Anuluj, aby przeprowadzić jego ręczną edycję.",
		      DIALOG_TITLE: "Skracanie komentarza",
		      NAME: "Skróć komentarz",
		      OK: "OK",
		      TOOLTIP: "Skróć komentarz"
		   },
		   COMMENTS_SUBMITTED: {
		      DIALOG_TITLE: "Potwierdzenie wysłania",
		      CONFIRM: "Komentarz został wysłany do przejrzenia i będzie dostępny po zatwierdzeniu.",
		      OK: "OK"
		   },
		   DATE: {
		      AM: "przed południem",
		      FULL: "${EEEE}, ${date_long} o ${time_long}",
		      PM: "po południu",
		      TODAY: "dzisiaj",
		      TODAY_U: "Dzisiaj",
		      YESTERDAY: "wczoraj",
		      YESTERDAY_U: "Wczoraj",
		      ADDED: { DAY: "Dodano: ${eeEE} o ${time}",
		         FULL: "${EEEE}, ${date_long} o ${time_long}",
		         MONTH: "Dodano: ${date_long}",
		         TODAY: "Dodano: dzisiaj o ${time}",
		         YEAR: "Dodano: ${date_long}",
		         YESTERDAY: "Dodano: wczoraj o ${time}"
		      },
		      LAST_UPDATED: { DAY: "Ostatnia aktualizacja: ${eeEE} o ${time}",
		         FULL: "${EEEE}, ${date_long} o ${time_long}",
		         MONTH: "Ostatnia aktualizacja: ${date_long}",
		         TODAY: "Ostatnia aktualizacja: dzisiaj o ${time}",
		         YEAR: "Ostatnia aktualizacja: ${date_long}",
		         YESTERDAY: "Ostatnia aktualizacja: wczoraj o ${time}"
		      },
		      MONTHS_ABBR: { 0: "sty",
		         10: "lis",
		         11: "gru",
		         1: "lut",
		         2: "mar",
		         3: "kwi",
		         4: "maj",
		         5: "cze",
		         6: "lip",
		         7: "sie",
		         8: "wrz",
		         9: "paź"
		      },
		      COMPACT: { DAY: "${EEee}",
		         FULL: "${EEEE}, ${date_long} o ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "Dzisiaj",
		         YEAR: "${date_short}",
		         YESTERDAY: "Wczoraj",
		         TOMORROW: "Jutro"
		      },
		      RELATIVE_TIME: { DAY: "${EEee} o ${time}",
		         FULL: "${EEEE}, ${date_long} o ${time_long}",
		         MONTH: "${date_short}",
		         TODAY: "dzisiaj o ${time}",
		         YEAR: "${date_short}",
		         YESTERDAY: "wczoraj o ${time}",
		         TOMORROW: "${date_short}"
		      },
		      RELATIVE_TIME_LONG: { DAY: "${EEee} o ${time}",
		         FULL: "${EEEE}, ${date_long} o ${time_long}",
		         MONTH: "${date_long}",
		         TODAY: "dzisiaj o ${time}",
		         YEAR: "${date_long}",
		         YESTERDAY: "wczoraj o ${time}",
		         TOMORROW: "${date_long}"
		      },
		      DATE_TIME: { DAY: "${date_short} o ${time}",
		         FULL: "${EEEE}, ${date_long} o ${time_long}",
		         MONTH: "${date_short} o ${time}",
		         TODAY: "${date_short} o ${time}",
		         YEAR: "${date_short} o ${time}",
		         YESTERDAY: "${date_short} o ${time}",
		         TOMORROW: "${date_short} o ${time}"
		      },
		      DATE_ONLY: { DAY: "${date_short}",
		         FULL: "${EEEE}, ${date_long}",
		         MONTH: "${date_short}",
		         TODAY: "${date_short}",
		         YEAR: "${date_short}",
		         YESTERDAY: "${date_short}",
		         TOMORROW: "${date_short}"
		      },
		      TIME_ONLY: { DAY: "${time}",
		         FULL: "${time_long}",
		         MONTH: "${time}",
		         TODAY: "${time}",
		         YEAR: "${time}",
		         YESTERDAY: "${time}",
		         TOMORROW: "${time}"
		      },
		      UPDATED: { DAY: "Zaktualizowano: ${eeEE} o ${time}",
		         FULL: "${EEEE}, ${date_long} o ${time_long}",
		         MONTH: "Zaktualizowano: ${date_long}",
		         TODAY: "Zaktualizowano: dzisiaj o ${time}",
		         YEAR: "Zaktualizowano: ${date_long}",
		         YESTERDAY: "Zaktualizowano: wczoraj o ${time}"
		      }
		   },
		   VERSIONS: {
		      ERROR: "Nie można załadować informacji o wersji.",
		      ERROR_REQUEST_CANCELLED: "Żądanie zostało anulowane.",
		      ERROR_REQUEST_TIMEOUT: "Nie można nawiązać kontaktu z serwerem.",
		      ERROR_REQUEST_UNKNOWN: "Wystąpił nieznany błąd.",
		      LOADING: "Ładowanie...",
		      NO_VERSIONS: "Brak wersji",
		      INFO: "Wersja ${0} utworzona ${1} przez ",
		      VERSION_NUMBER: "Wersja ${0}",
		      DELETED: "Usunięto",
		      DELETE_ALL: "Usuń wszystkie wersje starsze niż wersja",
		      DELETE_VERSION_SINGLE: "Usuń wersję ${0}",
		      DELETEERROR: "Wersja nie została usunięta z powodu wystąpienia błędu.",
		      CREATE_VERSION: "Utwórz nową wersję",
		      CREATE_VERSION_TOOLTIP: "Utwórz wersję tego pliku",
		      REVERT_VERSION: "Odtwórz wersję ${0}",
		      REVERT_DESCRIPTION: "Odtworzono z wersji ${0}",
		      PREVIOUS: "Wstecz",
		      PREVIOUS_TOOLTIP: "Poprzednia strona",
		      ELLIPSIS: "...",
		      NEXT: "Dalej",
		      NEXT_TOOLTIP: "Następna strona",
		      COUNT: "${0}–${1} z ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Strona",
		      SHOW: "Pokaż",
		      ITEMS_PER_PAGE: " poz. na stronie",
		      DATE: {
		        AM: "przed południem",
		        RELATIVE_TIME: { DAY: "${date}",
		            YEAR: "${date_long}",
		            FULL: "${date_long} o ${time_long}",
		            MONTH: "${date}",
		            TODAY: "dzisiaj o ${time}",
		            YESTERDAY: "wczoraj o ${time}"
		        },
		        RELATIVE_TIME_L: { DAY: "${EEee} o ${time}",
		            YEAR: "${date_short} o ${time}",
		            FULL: "${EEEE}, ${date_long} o ${time_long}",
		            MONTH: "${date_short} o ${time}",
		            TODAY: "dzisiaj o ${time}",
		            YESTERDAY: "wczoraj o ${time}"
		        },
		        UPDATED: { DAY: "Zaktualizowano: ${eeEE} o ${time}",
		            YEAR: "Zaktualizowano: ${date_short}",
		            FULL: "${EEEE}, ${date_long} o ${time_long}",
		            MONTH: "Zaktualizowano: ${date_short}",
		            TODAY: "Zaktualizowano: dzisiaj o ${time}",
		            YESTERDAY: "Zaktualizowano: wczoraj o ${time}"
		        }
		      },
		      CONTENT: {
		         DELETE_TOOLTIP: "Usuń wersję ${0}",
		         DOWNLOAD: "Pobierz",
		         DOWNLOAD_TOOLTIP: "Pobierz tę wersję (${0})",
		         VIEW: "Wyświetl",
		         VIEW_TOOLTIP: "Wyświetl wersję ${0}",
		         REVERT: {
		            A11Y: "Ten przycisk otwiera okno dialogowe, które umożliwia użytkownikowi potwierdzenie operacji odtworzenia pliku z poprzedniej wersji. Potwierdzenie tego działania spowoduje odświeżenie treści strony.",
		            FULL: "Odtwórz",
		            WIDGET: "Odtwórz tę wersję"
		         }
		      },
		      DELETE: {
		         ERROR_NOT_FOUND: "Nie można usunąć wersji, ponieważ została ona już usunięta lub nie jest widoczna dla użytkownika.",
		         ERROR_ACCESS_DENIED: "Nie można usunąć wersji, ponieważ użytkownik nie ma uprawnień edytującego.",
		         ERROR_TIMEOUT: "Nie usunięto wersji, ponieważ nie można nawiązać kontaktu z serwerem.  Kliknij ponownie przycisk Usuń, aby spróbować ponowić żądanie.",
		         ERROR_CANCEL: "Nie usunięto wersji, ponieważ żądanie zostało anulowane.  Kliknij ponownie przycisk Usuń, aby spróbować ponowić żądanie.",
		         ERROR_NOT_LOGGED_IN: "Aby usunąć tę wersję, należy się zalogować.  Kliknij przycisk Usuń, aby wyświetlić prośbę o zalogowanie.",
		         GENERIC_ERROR: "Nie można usunąć wersji z powodu wystąpienia nieznanego błędu.  Kliknij ponownie przycisk Usuń, aby spróbować ponowić żądanie.",
		         FULL: "Usuń",
		         A11Y: "Ten przycisk otwiera okno dialogowe, które umożliwia użytkownikowi potwierdzenie operacji usuwania tej wersji. Potwierdzenie tego działania spowoduje odświeżenie treści strony."
		      },
		      REVERT: {
		         ERROR_NOT_FOUND: "Nie można odtworzyć wersji, ponieważ została ona usunięta lub nie jest już widoczna dla użytkownika.",
		         ERROR_ACCESS_DENIED: "Nie można odtworzyć wersji, ponieważ użytkownik nie ma uprawnień edytującego.",
		         ERROR_NAME_EXISTS: "Nie można odtworzyć wersji, ponieważ istnieje inny plik o takiej samej nazwie.",
		         ERROR_TIMEOUT: "Nie odtworzono wersji, ponieważ nie można nawiązać kontaktu z serwerem.  Kliknij ponownie przycisk Odtwórz, aby ponowić żądanie.",
		         ERROR_CANCEL: "Nie odtworzono wersji, ponieważ żądanie zostało anulowane.  Kliknij ponownie przycisk Odtwórz, aby ponowić żądanie.",
		         ERROR_QUOTA_VIOLATION: "Nie można odtworzyć tej wersji z powodu ograniczeń dotyczących ilości miejsca.",
		         ERROR_MAX_CONTENT_SIZE: "Nie można odtworzyć wersji, ponieważ jej wielkość przekracza maksymalną dozwoloną wielkość pliku (${0}).",
		         GENERIC_ERROR: "Nie można odtworzyć wersji z powodu wystąpienia nieznanego błędu.  Kliknij ponownie przycisk Odtwórz, aby ponowić żądanie."
		      }
		   },
		   DOWNLOAD_INFO: {
		      SHOW_PEOPLE: "Wyświetl osoby, które pobierały...",
		      PREVIOUS: "Wstecz",
		      PREVIOUS_TOOLTIP: "Poprzednia strona",
		      ELLIPSIS: "...",
		      NEXT: "Dalej",
		      NEXT_TOOLTIP: "Następna strona",
		      COUNT: "${0}–${1} z ${2}",
		      COUNT_SHORT: "${0}-${1}",
		      PAGE: "Strona",
		      SHOW: "Pokaż",
		      ITEMS_PER_PAGE: " poz. na stronie",
		      VERSION: {
		         DAY: "Wersja ${version}: ${date}",
		         MONTH: "Wersja ${version}: ${date}",
		         TODAY: "Wersja ${version}: ${time}",
		         YEAR: "Wersja ${version}: ${date}",
		         YESTERDAY: "Wersja ${version}: wczoraj"
		      },
		      FILE: {
		         V_LATEST: "Pobrano najnowszą wersję tego pliku",
		         V_OLDER: "Ostatnio pobrano wersję ${0} tego pliku",
		         LOADING: "Ładowanie...",
		         EMPTY: "Tylko anonimowi użytkownicy",
		         ERROR: "Nie można załadować informacji o pobieraniu"
		      }
		   },
		   EE_DIALOG: {
		      ERROR: "Błąd",
		      ERROR_ALT_TEXT: "Błąd:",
		      ERROR_MSG_GENERIC: "Wystąpił błąd.  Spróbuj ponownie.",
		      ERROR_MSG_NOT_AVAILABLE: "Ten element został usunięty lub nie jest już dostępny.",
		      ERROR_MSG_CONTENT_NOT_AVAILABLE: "Treść tego elementu jest niedostępna.",
		      ERROR_MSG_NO_ACCESS: "Użytkownik nie ma już dostępu do tego elementu.",
		      LOADING: "Ładowanie...",
		      TITLE_SU: "Użytkownik ${author} opublikował wiadomość.",
		      TITLE_NI: "Użytkownik ${author} zaprosił Cię do swojej sieci.",
		      AUTHOR_TITLE: "Wyświetl profil użytkownika ${author}",
		      OPEN_LINK: "Otwórz: ${title}",
		      CONFIRM_CLOSE_TITLE: "Potwierdzenie",
		      CONFIRM_CLOSE_MESSAGE: "Czy na pewno odrzucić wprowadzone zmiany? Kliknij przycisk OK, aby kontynuować, lub przycisk Anuluj, aby powrócić.",
		      OK: "OK",
		      CANCEL: "Anuluj"
		   },
		   MESSAGE: {
		      SUCCESS: "Potwierdzenie",
		      ERROR: "Błąd",
		      ERROR_ALT_TEXT: "Błąd:",
		      INFO: "Informacja",
		      WARNING: "Ostrzeżenie",
		      DISMISS: "Ukryj ten komunikat",
		      MORE_DETAILS: "Więcej szczegółów",
		      HIDE_DETAILS: "Ukryj szczegóły"
		   },
		   statusUpdate: {
		       createdCompact: {
		           DAY: "Utworzono: ${EEEE} o ${time}",
		           MONTH: "Utworzono: ${d} ${MMM}",
		           TODAY: "Utworzono: dzisiaj o ${time}",
		           YEAR: "Utworzono: ${d} ${MMM} ${YYYY}",
		           YESTERDAY: "Utworzono: wczoraj o ${time}",
		           TOMORROW: "Utworzono: ${d} ${MMM} ${YYYY}"
		       },
		      error: "Wystąpił błąd.  ${again}.",
		      error_again: "Spróbuj ponownie",
		      error_404: "Aktualizacja statusu już nie istnieje.",
		      notifications: {
		         STATUS_UPDATE: "Użytkownik ${user} opublikował wiadomość",
		         USER_BOARD_POST: "Użytkownik ${user} napisał coś na Twojej tablicy",
		         POST_COMMENT: "Użytkownik ${user} napisał:"
		      }
		   },
		   login: {
		      error: "Nazwa użytkownika lub hasło nie są zgodne z istniejącymi kontami. Spróbuj ponownie.",
		      logIn: "Zaloguj",
		      password: "Hasło:",
		      user: "Nazwa użytkownika:",
		      welcome: "Logowanie do programu HCL Connections"
		   },
		   repost: {
		      name: "Publikuj ponownie",
		      title: "Publikuj ponownie tę aktualizację dla mojej społeczności i osób, które śledzą mój profil",
		      msg_success: "Aktualizacja została pomyślnie ponownie opublikowana dla osób śledzących profil użytkownika.",
		      msg_generic: "Wystąpił błąd.  Spróbuj ponownie."
		   },
		   FILE_SHARE_INFO: {
		      ADD: "Dodaj",
		      ADD_TXT: "Dodaj osoby lub społeczności jako czytelników",
		      SHOW_MORE: "Pokaż więcej...",
		      READER_IF_PUBLIC: "Wszyscy (publiczny)",
		      READER_IF_PUBLIC_TOOLTIP: "Ten plik jest publiczny i widoczny dla każdego",
		      EMPTY_READERS: "Brak",
		      READERS_LABEL: "Czytelnicy:\u00a0",
		      EDITORS_LABEL: "Edytujący:\u00a0",
		      OWNER_LABEL: "Właściciel:\u00a0",
		      ERROR: "Nie można załadować informacji o relacji współużytkowania",
		      ERROR_NOT_FOUND: "Żądany plik został usunięty lub przeniesiony. Jeśli ten odsyłacz został przysłany przez innego użytkownika, sprawdź, czy jest on poprawny.",
		      ERROR_ACCESS_DENIED: "Nie masz uprawnień do wyświetlania tego pliku.  Plik nie jest publiczny i nie jest udostępniony do współużytkowania.",
		      SHARE: "Udostępnij",
		      CANCEL: "Anuluj",
		      SHARE_WITH: "Udostępnij dla:",
		      PERSON: "Osoba",
		      COMMUNITY: "Społeczność",
		      PLACEHOLDER: "Nazwa lub adres e-mail osoby...",
		      MESSAGE: "Wiadomość:",
		      MESSAGE_TXT: "Dodaj opcjonalną wiadomość",
		      REMOVE_ITEM_ALT: "Usuń element ${0}",
		      NO_MEMBERS: "Brak",
		      A11Y_READER_ADDED: "Osobę lub społeczność ${0} wybrano jako czytelnika",
		      A11Y_READER_REMOVED: "Osobę lub społeczność ${0} usunięto jako czytelnika",
		      SELF_REFERENCE_ERROR: "Nie można udostępnić dla siebie.",
		      OWNER_REFERENCE_ERROR: "Nie można udostępnić dla właściciela pliku.",
		      SHARE_COMMUNITY_WARN: "Udostępnienie tego pliku do współużytkowania dla społeczności publicznej ${0} spowoduje, że plik stanie się publiczny.",
		      SELECT_USER_ERROR: "Należy wybrać co najmniej jedną osobę lub społeczność, dla której plik ma zostać udostępniony do współużytkowania",
		      WARN_LONG_MESSAGE: "Wiadomość jest zbyt długa.",
		      TRIM_LONG_MESSAGE: "Czy skrócić wiadomość?",
		      ERROR_SHARING: "Nie można udostępnić tego pliku.  Spróbuj ponownie później.",
		      INFO_SUCCESS: "Pomyślnie udostępniono plik.",
		      MAX_SHARES_ERROR: "Przekroczono maksymalną liczbę relacji współużytkowania.",
		      NOT_LOGGED_IN_ERROR: "Nie udostępniono pliku do współużytkowania, ponieważ użytkownik nie był zalogowany.  Kliknij przycisk Udostępnij, aby udostępnić plik do współużytkowania.",
		      TIMEOUT_ERROR: "Nie udostępniono pliku do współużytkowania, ponieważ nie można nawiązać kontaktu z serwerem.  Kliknij przycisk Udostępnij, aby spróbować ponownie.",
		      CANCEL_ERROR: "Nie udostępniono pliku do współużytkowania, ponieważ żądanie zostało anulowane.  Kliknij przycisk Udostępnij, aby spróbować ponownie.",
		      NOT_FOUND_ERROR: "Plik został usunięty lub jest już niewidoczny dla użytkownika, dlatego nie można ustawić jego relacji współużytkowania.",
		      ACCESS_DENIED_ERROR: "Już nie masz uprawnień do współużytkowania tego pliku.",
		      VISIBILITY_RESTRICTION_ERROR_SHARE: "Zastrzeżonego pliku nie można ustawić jako pliku publicznego.",
		      TOOLTIP: "Przyznaj innym użytkownikom dostęp do tego pliku"
		   },
		   HISTORY: {
		      TAB_TITLE: "Ostatnie aktualizacje",
		      NO_HISTORY: "Brak ostatnich aktualizacji.",
		      EMPTY: "Nie można pobrać ostatnich aktualizacji tego elementu. Został on usunięty lub nie masz już dostępu do tego elementu.",
		      MORE: "Pokaż poprzednie aktualizacje",
		      ERROR_ALT: "Błąd",
		      ERROR: "Wystąpił błąd podczas pobierania aktualizacji. ${again}",
		      ERROR_ADDTL: "Wystąpił błąd podczas pobierania dodatkowych aktualizacji. ${again}",
		      ERROR_AGAIN: "Spróbuj ponownie.",
		      ERROR_AGAIN_TITLE: "Ponów żądanie pobrania większej liczby aktualizacji.",
		      PROFILE_TITLE: "Otwórz profil użytkownika ${user}.",
		      SORT_BY: "Sortuj wg\\:",
		      SORTS: {
		         DATE: "Data",
		         DATE_TOOLTIP: "Sortuj elementy od najnowszych do najstarszych według daty aktualizacji",
		         DATE_TOOLTIP_REVERSE: "Sortuj elementy od najstarszych do najnowszych według daty aktualizacji"
		      },
		      TIMESTAMP: {
		         CREATED: {
		             DAY: "${EEEE} o ${time}",
		             MONTH: "${d} ${MMM}",
		             TODAY: "dzisiaj o ${time}",
		             YEAR: "${d} ${MMM} ${YYYY}",
		             YESTERDAY: "wczoraj o ${time}",
		             TOMORROW: "${d} ${MMM} ${YYYY}"
		          }
		     }
		   },
		   THISCOMMENT: {
		       TAB_TITLE: "Ten komentarz",
			   REPLY_ACTION: "Odpowiedz",
		       REPLY_ACTION_TOOLTIP: "Odpowiedz na ten komentarz"
		   },
		   OAUTH: {
		      welcomeHeader: "Witamy w programie Connections",
		      continueBtnLabel: "Kontynuuj",
		      continueBtnA11y: "Aktywowanie tego odsyłacza spowoduje otwarcie nowego okna, które umożliwi uzyskanie autoryzowanego dostępu do programu Connections.",
		      clickHere: "Kliknij tutaj",
		      infoMsg: "Program Connections potrzebuje autoryzacji, aby móc uzyskać dostęp do danych.",
		      authorizeGadget: "${clickHere}, aby autoryzować tę aplikację do uzyskiwania dostępu do informacji programu Connections.",
		      confirmAuthorization: "${clickHere}, aby potwierdzić, że ta aplikacja jest autoryzowana do uzyskiwania dostępu do informacji programu Connections."
		   },
		   OAUTH_FILENET: {
		      continueBtnA11y: "Aktywowanie tego odsyłacza spowoduje otwarcie nowego okna, które umożliwi uzyskanie autoryzowanego dostępu do repozytorium komponentu Biblioteka programu Connections.",
		      infoMsg: "Repozytorium komponentu Biblioteka programu Connections potrzebuje autoryzacji, aby móc uzyskać dostęp do danych.",
		      authorizeGadget: "${clickHere}, aby autoryzować tę aplikację do uzyskiwania dostępu do informacji znajdujących się w repozytorium komponentu Biblioteka programu Connections.",
		      confirmAuthorization: "${clickHere}, aby potwierdzić, że ta aplikacja jest autoryzowana do uzyskiwania dostępu do informacji znajdujących się w repozytorium komponentu Biblioteka programu Connections."
		   },
		   UNSAVEDCHANGES: {
		      CANCEL: "Anuluj",
		      CONFIRM: "Czy na pewno odrzucić wprowadzone zmiany?  Kliknij przycisk OK, aby kontynuować, lub przycisk Anuluj, aby powrócić.",
		      DIALOG_TITLE: "Potwierdzenie",
		      NAME: "Potwierdź",
		      OK: "OK",
		      TOOLTIP: "Potwierdź"
		   }
});
