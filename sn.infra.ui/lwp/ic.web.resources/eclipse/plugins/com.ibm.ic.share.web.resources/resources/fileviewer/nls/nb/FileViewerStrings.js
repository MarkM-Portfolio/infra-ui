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

define({
      FILE_VIEWER_TITLE: "Forhåndsvisning av fil",
      FILENAME_TOOLTIP: "Rediger filnavn",
      ICON_TOOLTIP: "Last ned fil",
      ERROR: "Det har oppstått en feil.",
      FILE_MALICIOUS: "Skanner oppdaget ondsinnet innhold",
      SHARED_EXTERNALLY: "Delt eksternt",
      FILE_SYNCED: "Lagt til i synkronisering",
      MY_DRIVE: {
         TITLE: "I Min stasjon",
         ROOT_FOLDER: "/Min stasjon",
         FOLDER: "/Min stasjon/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Flere handlinger",
         A11Y: "Åpner en rullegardinmeny med en liste over flere handlinger som kan utføres på filen.",
            PANELS: {
               TITLE: "Mer",
               A11Y: "Åpner en rullegardinmeny med en liste over skjulte paneler"
            }
      },
      WELCOME: {
         TITLE: "Vi har kombinert filvisning og detaljer",
         SUBTITLE: "Du kan nå vise en fil og filens kommentarer ved siden av hverandre.",
         LINES: {
            LINE_1: "All informasjon og alt du kunne gjøre på den gamle siden, finnes her.",
            LINE_2: "Kommentarer, deling, versjoner og basisinformasjon er tilgjengelig ved siden av filen."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Denne knappen navigerer til den neste filen.",
         PREVIOUS_A11Y: "Denne knappen navigerer til den forrige filen."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Flere redigeringsalternativer",
            A11Y: "Denne knappen åpner en meny for flere redigeringsalternativer."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Rediger"
            },
            UPLOAD: {
               TITLE: "Last opp"
            },
            CREATE: {
              TITLE: "Opprett"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Endre størrelse på panelet",
           USAGE: "Trykk på venstre hakeparentes eller høyre hakeparentes for å endre størrelsen på panelet."
       },
         CLOSE: {
            TOOLTIP: "Lukk",
            A11Y: "Denne knappen lukker filviseren.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Filen blir fremdeles lastet opp.",
              PROMPT: "Filen blir fremdeles lastet opp. Hvis du lukker før opplastingen er fullført, vil den bli avbrutt.",
              OK: "Lukk likevel",
              CANCEL: "Vent på opplastingen"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Legg til i Filer",
           A11Y: "Denne knappen legger til vedlegget i Filer.",
           VIEW_NOW: "Vis nå"
         },
         TEAR_OFF: {
           TOOLTIP: "Åpne i nytt vindu",
           A11Y: "Åpne i nytt vindu",
           ERROR_TEARING_OFF: "Det oppstod en feil da det nye vinduet skulle åpnes.",
           DIALOG_TITLE: "Bekreft",
           UNSAVED_CHANGES_WARNING: "Du har ulagrede endringer som vil gå tapt. Vil du åpne i et nytt vindu likevel?",
           OK: "Ja",
           CANCEL: "Nei",
           OPEN: "Åpne",
           OPEN_ANYWAY: "Åpne likevel",
           CANCEL_ALT: "Avbryt"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Ny fra fil",
            ACTION_NAME:"Opprett fil",
            A11Y: {
               TEXT: "Opprett et dokument (DOC-, DOCX- eller ODT-fil) fra en malfil. Du kan redigere disse dokumentene online i Docs.",
               PRES: "Opprett en presentasjon (PPT-, PPTX- eller ODP-fil) fra en malfil. Du kan redigere disse presentasjonene online i Docs.",
               SHEET: "Opprett et regneark (XLS-, XLSX- eller ODS-fil) fra en malfil. Du kan redigere disse regnearkene online i Docs."
            },
            PROMPT: {
               TEXT: "Opprett et dokument (DOC-, DOCX- eller ODT-fil) fra en malfil. Du kan redigere disse dokumentene online i Docs.",
               PRES: "Opprett en presentasjon (PPT-, PPTX- eller ODP-fil) fra en malfil. Du kan redigere disse presentasjonene online i Docs.",
               SHEET: "Opprett et regneark (XLS-, XLSX- eller ODS-fil) fra en malfil. Du kan redigere disse regnearkene online i Docs."
            },
            NAME_FIELD: "Navn:",
            EXTERNAL_FIELD: "Filer kan deles med personer utenfor organisasjonen min",
            EXTERNAL_DESC: "Ekstern tilgang gjør at filer kan deles med eksterne brukere (personer utenfor organisasjonen eller bedriften din), mapper kan deles med eksterne brukere og fellesskap kan ha eksterne personer som medlemmer. Du må definere ekstern tilgang når du laster opp en fil. Det kan ikke gjøres senere.",
            CREATE_BUTTON: "Opprett",
            CANCEL: "Avbryt",
            PRE_FILL_NAMES: {
               OTT: "Dokument uten navn",
               OTS: "Regneark uten navn",
               OTP: "Presentasjon uten navn",
               DOT: "Dokument uten navn",
               XLT: "Regneark uten navn",
               POT: "Presentasjon uten navn",
               DOTX: "Dokument uten navn",
               XLTX: "Regneark uten navn",
               POTX: "Presentasjon uten navn"
            },
            ERRORS: {
               NAME_REQUIRED: "Dokumentnavnet er nødvendig.",
               ILLEGAL_NAME:"Dette er en ugyldig dokumenttittel. Angi en annen.",
               WARN_LONG_NAME: "Dokumentnavnet er for langt.",
               TRIM_NAME: "Vil du forkorte dokumentnavnet?",
               SESSION_TIMEOUT: "Sesjonen har utløpt. Logg deg på og prøv igjen.",
               DUPLICATE_NAME: "Filnavnet er brukt fra før. Angi et nytt navn.",
               SERVER_ERROR: "Connections-serveren er ikke tilgjengelig. Kontakt serveradministratoren og prøv igjen senere."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Last ned fil",
            A11Y: "Denne knappen laster ned filen."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Last ned som PDF",
            TOOLTIP: "Last ned denne filen som en PDF-fil",
            A11Y: "Denne knappen laster ned filen som en PDF.",
            SUCCESS: "Du har lastet ned filen som en PDF.",
            ERROR: {
               DEFAULT: "Du kunne ikke laste ned filen som en PDF. Prøv igjen senere.",
               UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan laste ned filen som en PDF.",
               NOT_FOUND: "Filen kunne ikke lastes ned som en PDF fordi filen er slettet eller ikke lenger er delt med deg.",
               ACCESS_DENIED: "Filen kunne ikke lastes ned som en PDF fordi filen er slettet eller ikke lenger er delt med deg."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Det er ingen publisert versjon av denne filen å laste ned. Versjoner kan publiseres fra Docs-redigeringsprogrammet."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Kan ikke laste ned filen",
               CANCEL: "Lukk",
               PROMPT: "Det er ingen publisert versjon av denne filen å laste ned.",
               PROMPT2: "Versjoner kan publiseres fra Docs-redigeringsprogrammet."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Kan ikke laste ned filen",
               CANCEL: "Lukk",
               PROMPT: "Det er ingen publisert versjon av denne filen å laste ned.",
               PROMPT2: "Be fileieren om å publisere en versjon av denne filen."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Last ned en versjon",
               OK: "Last ned versjon",
               PROMPT: {
                  TODAY: "Et nyere utkast, sist redigert i dag klokken ${time}, er oppdaget.",
                  YESTERDAY: "Et nyere utkast, sist redigert i går klokken ${time}, er oppdaget.",
                  DAY: "Et nyere utkast, sist redigert ${date}, er oppdaget.",
                  MONTH: "Et nyere utkast, sist redigert ${date}, er oppdaget.",
                  YEAR: "Et nyere utkast, sist redigert ${date_long}, er oppdaget."
               },
               PROMPT2: {
                  TODAY: "Er du sikker på at du vil fortsette å laste ned versjonen som ble publisert i dag klokken ${time}?",
                  YESTERDAY: "Er du sikker på at du vil fortsette å laste ned versjonen som ble publisert i går klokken ${time}?",
                  DAY: "Er du sikker på at du vil fortsette å laste ned versjonen som ble publisert ${date}?",
                  MONTH: "Er du sikker på at du vil fortsette å laste ned versjonen som ble publisert ${date}?",
                  YEAR: "Er du sikker på at du vil fortsette å laste ned versjonen som ble publisert ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Vis panel med detaljer",
            HIDE: "Skjul panel med detaljer",
            RESET: "Tilbakestill panelstørrelse",
            SHOW_A11Y: "Denne knappen veksler mellom å åpne og lukke sidepanelet. Sidepanelet er i øyeblikket lukket.",
            HIDE_A11Y: "Denne knappen veksler mellom å åpne og lukke sidepanelet. Sidepanelet er i øyeblikket åpent.",
            RESET_A11Y: "Denne knappen setter sidepanelet tilbake til standardstørrelsen. Sidepanelet er i øyeblikket utvidet."
         },
         VIEW_DOC: {
            NAME: "Åpne i Docs Viewer",
            TOOLTIP: "Åpne i Docs Viewer",
            A11Y: "Denne knappen åpner filen for visning i et nytt nettleservindu."
         },
         EDIT_DOC: {
            NAME: "Rediger i Docs",
            TOOLTIP: "Bruk HCL Docs til å redigere denne filen",
            A11Y: "Denne knappen åpner filen for redigering i Docs i et nytt vindu."
         },
         EDIT_OFFICE: {
            TITLE: "Redigeringsalternativer.",
            NAME: "Rediger i Microsoft Office Online",
            TOOLTIP: "Bruk Microsoft Office Online til å redigere denne filen",
            A11Y: "Denne knappen åpner filen for redigering i Microsoft Office Online i et nytt vindu."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Rediger i Microsoft Word Online",
           TOOLTIP: "Bruk Microsoft Word Online til å redigere denne filen",
           A11Y: "Denne knappen åpner filen for redigering i Microsoft Word Online i et nytt vindu."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Rediger i Microsoft Excel Online",
             TOOLTIP: "Bruk Microsoft Excel Online til å redigere denne filen",
             A11Y: "Denne knappen åpner filen for redigering i Microsoft Excel Online i et nytt vindu."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Rediger i Microsoft PowerPoint Online",
             TOOLTIP: "Bruk Microsoft PowerPoint Online til å redigere denne filen",
             A11Y: "Denne knappen åpner filen for redigering i Microsoft PowerPoint Online i et nytt vindu."
         },
         OFFICE_EDITED: {
             SUCCESS: "Filen blir lagret."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Rediger på skrivebord",
            DIALOG_TITLE: "Rediger på skrivebord",
            TOOLTIP: "Rediger dette dokumentet",
            A11Y: "Denne knappen åpner filen for redigering lokalt.",
            PROMPT: "Denne funksjonen gjør det mulig for deg å redigere ved hjelp av programvare som er installert på datamaskinen din.",
            INSTALL: "Før du fortsetter, må du ${startLink}installere filforbindelser på skrivebordet${endLink}.", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Viktig:",
            REMINDER: "Når du er ferdig med redigeringen, publiserer du et utkast ved hjelp av filforbindelsene på skrivebordet.",
            SKIP_DIALOG: "Ikke vis denne meldingen igjen.",
            OK: "OK",
            CANCEL: "Avbryt"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Bekreft",
            DELETE_VERSION: "Slett versjon ${version}",
            DELETE_VERSION_AND_PRIOR: "Slett versjon ${version} og alle tidligere versjoner",
            PROMPT: "Du er i ferd med å slette versjon ${version}. Vil du fortsette?",
            DELETE_PRIOR: "Slett også alle tidligere versjoner",
            ERROR: "Det oppstod en feil ved sletting av versjonen. Prøv igjen senere.",
            TOOLTIP: "Slett denne versjonen",
            OK: "OK",
            CANCEL: "Avbryt"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Hent koblinger",
            LINK_FILE: "Kobling til fil:",
            LINK_PREVIEW: "Kobling til forhåndsvisningsfil:",
            LINK_DOWNLOAD: "Kobling til nedlastingsfil:",
            TOOLTIP: "Kobling til fil",
            OK: "Lukk"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Last ned denne versjonen"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Bekreft",
            PROMPT: "Du er i ferd med å erstatte den gjeldende versjonen av denne filen med versjon ${version}. Vil du fortsette?",
            ERROR: "Det oppstod en feil ved gjenoppretting av versjonen. Prøv igjen senere.",
            TOOLTIP: "Gjenopprett denne versjonen",
            CHANGE_SUMMARY: "Gjenopprettet fra versjon ${version}",
            OK: "OK",
            CANCEL: "Avbryt"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Bekreft",
            REMOVE_EVERYONE: "Er du sikker på at du vil fjerne din organisasjons tilgang til denne filen? Hvis tilgang fjernes, blir filen fjernet fra mapper og fellesskap som tillater tilgang på organisasjonsnivå, og bare eieren og personer den er delt med, kan se på og arbeide med den.",
            REMOVE_USER: "Er du sikker på at du vil avslutte delingen med ${user}? Hvis du stopper delingen, vil ${user} bare få tilgang til denne filen via mapper eller hvis den deles med alle i organisasjonen.",
            REMOVE_COMMUNITY: "Er du sikker på at du vil fjerne denne filen fra fellesskapet ${communityName}?",
            REMOVE_FOLDER: "Er du sikker på at du vil fjerne denne filen fra mappen ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Fjern organisasjonens tilgang",
            REMOVE_USER_TOOLTIP: "Fjern alle delinger med ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Fjern fra fellesskapet ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Fjern fra mappen ${folderName}",
            OK: "OK",
            CANCEL: "Avbryt",
            EFSS: {
              DIALOG_TITLE: "Bekreft",
              REMOVE_EVERYONE: "Er du sikker på at du vil fjerne din organisasjons tilgang til denne filen? Hvis tilgang fjernes, blir filen fjernet fra mapper som tillater tilgang på organisasjonsnivå, og bare eieren og personer den er delt med, kan se på og arbeide med den.",
              REMOVE_USER: "Er du sikker på at du vil avslutte delingen med ${user}? Hvis du stopper delingen, vil ${user} bare få tilgang til denne filen via mapper eller hvis den deles med alle i organisasjonen.",
              REMOVE_COMMUNITY: "Er du sikker på at du vil fjerne denne filen fra fellesskapet ${communityName}?",
              REMOVE_FOLDER: "Er du sikker på at du vil fjerne denne filen fra mappen ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Fjern organisasjonens tilgang",
              REMOVE_USER_TOOLTIP: "Fjern alle delinger med ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Fjern fra fellesskapet ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Fjern fra mappen ${folderName}",
              OK: "OK",
              CANCEL: "Avbryt",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Rediger denne kommentaren"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Bekreft",
            PROMPT: "Er du sikker på at du vil slette denne kommentaren?",
            ERROR: "Det oppstod en feil ved sletting av kommentaren. Prøv igjen senere.",
            TOOLTIP: "Slett denne kommentaren",
            OK: "OK",
            CANCEL: "Avbryt"
         },
         LIKE: {
            LIKE: "Lik filen",
            UNLIKE: "Angre Liker for filen",
            LIKE_A11Y: "Denne knappen liker filen.",
            UNLIKE_A11Y: "Denne knappen angrer Liker for filen.",
            LIKED_SUCCESS: "Du likte denne filen",
            UNLIKE_SUCCESS: "Du angret Liker for denne filen"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Rediger beskrivelse",
            ERROR: {
               DEFAULT: "Beskrivelsen kunne ikke lagres. Prøv igjen senere.",
               UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan oppdatere beskrivelsen.",
               NOT_FOUND: "Beskrivelsen kunne ikke lagres fordi filen er slettet eller ikke lenger er delt med deg.",
               ACCESS_DENIED: "Beskrivelsen kunne ikke lagres fordi filen er slettet eller ikke lenger er delt med deg."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Feil ved lagring av filnavn",
               CONFLICT: "Filnavnet finnes allerede"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Det oppstod en feil ved følging av denne filen. Prøv igjen senere.",
                  UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan følge denne filen.",
                  NOT_FOUND: "Du kan ikke følge denne filen fordi filen er slettet eller ikke lenger er delt med deg.",
                  ACCESS_DENIED: "Du kan ikke følge denne filen fordi filen er slettet eller ikke lenger er delt med deg."
               },
               UNFOLLOW: {
                  DEFAULT: "Det oppstod en feil da følging av denne filen skulle avsluttes. Prøv igjen senere.",
                  UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan slutte å følge denne filen.",
                  NOT_FOUND: "Du kan ikke slutte å følge denne filen fordi filen er slettet eller ikke lenger er delt med deg.",
                  ACCESS_DENIED: "Du kan ikke slutte å følge denne filen fordi filen er slettet eller ikke lenger er delt med deg."
               }
            },
            FOLLOW_NAME: "Følg",
            FOLLOW_TOOLTIP: "Følg denne filen",
            FOLLOW_A11Y: "Denne knappen følger filen.",
            FOLLOW_SUCCESS: "Du følger nå denne filen.",
            STOP_FOLLOWING_NAME: "Ikke følg lenger",
            STOP_FOLLOWING_TOOLTIP: "Ikke følg denne filen lenger",
            STOP_FOLLOWING_A11Y: "Denne knappen avslutter følging av filen.",
            STOP_FOLLOWING_SUCCESS: "Du har sluttet å følge denne filen."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Legg til i Synk",
               TOOLTIP: "Legg til denne filen i synkronisering",
               A11Y: "Denne knappen legger til filen i synkronisering.",
               SUCCESS: "Du har lagt til denne filen i synkronisering.",
               ERROR: {
                  DEFAULT: "Det oppstod en feil da filen skulle legges til i synkronisering. Prøv igjen senere.",
                  UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan legge til denne filen i synkronisering.",
                  NOT_FOUND: "Du kan ikke legge til denne filen til synkronisering fordi filen er slettet eller ikke lenger er delt med deg.",
                  ACCESS_DENIED: "Du kan ikke legge til denne filen til synkronisering fordi filen er slettet eller ikke lenger er delt med deg."
               }
            },
            STOP_SYNC: {
               NAME: "Fjern fra Synk",
               TOOLTIP: "Fjern denne filen fra synkronisering",
               A11Y: "Denne knappen fjerner filen fra synkronisering.",
               SUCCESS: "Du har fjernet denne filen fra synkronisering.",
               ERROR: {
                  DEFAULT: "Det oppstod en feil da filen skulle fjernes fra synkronisering. Prøv igjen senere.",
                  UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan fjerne denne filen fra synkronisering.",
                  NOT_FOUND: "Du kan ikke fjerne denne filen fra synkronisering fordi filen er slettet eller ikke lenger er delt med deg.",
                  ACCESS_DENIED: "Du kan ikke fjerne denne filen fra synkronisering fordi filen er slettet eller ikke lenger er delt med deg."
               }
            },
            MYDRIVE: {
                NAME: "Legg til i Min stasjon",
                TOOLTIP: "Legg til denne filen i Min stasjon",
                A11Y: "Denne knappen legger til filen i Min stasjon.",
                SUCCESS: "Du har lagt til denne filen i Min stasjon.",
                ERROR: {
                   DEFAULT: "Det oppstod en feil da filen skulle legges til i Min stasjon. Prøv igjen senere.",
                   UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan legge til denne filen i Min stasjon.",
                   NOT_FOUND: "Du kan ikke legge til denne filen i Min stasjon fordi filen er slettet eller ikke lenger er delt med deg.",
                   ACCESS_DENIED: "Du kan ikke legge til denne filen i Min stasjon fordi filen er slettet eller ikke lenger er delt med deg."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Fjern fra Min stasjon",
                TOOLTIP: "Fjern denne filen fra Min stasjon",
                A11Y: "Denne knappen fjerner filen fra Min stasjon.",
                SUCCESS: "Du har fjernet denne filen fra Min stasjon.",
                ERROR: {
                   DEFAULT: "Det oppstod en feil da filen skulle fjernes fra Min stasjon. Prøv igjen senere.",
                   UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan fjerne denne filen fra Min stasjon.",
                   NOT_FOUND: "Du kan ikke fjerne denne filen fra Min stasjon fordi filen er slettet eller ikke lenger er delt med deg.",
                   ACCESS_DENIED: "Du kan ikke fjerne denne filen fra Min stasjon fordi filen er slettet eller ikke lenger er delt med deg."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Fest",
            FAVORITE_TOOLTIP: "Fest denne filen",
            FAVORITE_A11Y: "Denne knappen fester filen.",
            FAVORITE_SUCCESS: "Du festet denne filen.",
            STOP_FAVORITEING_NAME: "Løsne",
            STOP_FAVORITEING_TOOLTIP: "Løsne denne filen",
            STOP_FAVORITEING_A11Y: "Denne knappen løsner filen.",
            STOP_FAVORITEING_SUCCESS: "Du har løsnet denne filen."
         },
         TRASH: {
            NAME: "Flytt til papirkurven",
            DIALOG_TITLE: "Bekreft",
            PROMPT: "Er du sikker på at du vil flytte denne filen til papirkurven? Hvis du flytter denne filen til papirkurven, blir den utilgjengelig for alle som den er delt med nå.",
            ERROR: "Det oppstod en feil ved sletting av filen. Prøv igjen senere.",
            TOOLTIP: "Slett denne filen",
            OK: "OK",
            CANCEL: "Avbryt",
            A11Y: "Denne knappen flytter filen til papirkurven.",
            SUCCESS_MSG: "${file} er flyttet til papirkurven."
         },
         REFRESH: {
            NAME: "Oppdater",
            ERROR: "Det oppstod en feil ved oppdatering av filviseren. Prøv igjen senere.",
            TOOLTIP: "Oppdater filviseren",
            INFO_MSG: "Oppdater for å få det nyeste innholdet. ${link}",
            A11Y: "Denne knappen flytter filen til papirkurven.",
            SUCCESS_MSG: "Innholdet er oppdatert."
         },
         COPY_FILE: {
            NAME: "Gi kopi til fellesskap",
            DIALOG_TITLE: "Bekreft",
            ERROR: "Det oppstod en feil ved kopiering av filen. Prøv igjen senere.",
            TOOLTIP: "Gi en kopi av denne filen til et fellesskap",
            OK: "OK",
            CANCEL: "Avbryt",
            A11Y: "Denne knappen åpner en dialogboks der du kan gi en kopi av denne filen til et fellesskap.",
            SUCCESS_MSG: "${file} er kopiert til ${community}."
         },
         UPLOAD_VERSION: {
            NAME: "Last opp ny versjon",
            NAME_SHORT: "Last opp",
            CHANGE_SUMMARY: "Valgfritt endringssammendrag...",
            TOOLTIP: "Last opp en ny versjon av denne filen",
            A11Y: "Denne knappen åpner en dialogboks der du kan laste opp en ny versjon av denne filen."
         },
         LOG_IN: {
            NAME: "Logg på",
            TOOLTIP: "Logg på for å laste opp og dele filer, kommentere og opprette mapper"
         },
         LOCK: {
            NAME: "Lås fil",
            TITLE: "Lås denne filen",
            A11Y: "Lås denne filen",
            SUCCESS: "Filen er nå låst.",
            ERROR: "Filen kunne ikke låses fordi den er slettet eller ikke lenger er delt med deg."
         },
         UNLOCK: {
            NAME: "Lås opp fil",
            TITLE: "Lås opp denne filen",
            A11Y: "Lås opp denne filen",
            SUCCESS: "Filen er nå låst opp.",
            ERROR: "Filen kunne ikke låses opp fordi den er slettet eller ikke lenger deles med deg."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Rediger på skrivebord",
            TITLE: "Rediger på skrivebord",
            A11Y: "Rediger på skrivebord"
         },
         FLAG: {
            FILE: {
               NAME: "Merk som upassende",
               TITLE: "Merk fil",
               A11Y: "Merk denne filen som upassende",
               PROMPT: "Oppgi en årsak til at denne filen er merket (valgfritt):",
               OK: "Merk",
               CANCEL: "Avbryt",
               SUCCESS: "Filen er merket og sendt til gjennomgang.",
               ERROR: "Feil ved flagging av denne filen. Prøv igjen senere."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Vellykket",
               PROMPT: "Filen er merket og sendt til gjennomgang.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Merk som upassende",
               TITLE: "Merk kommentar",
               A11Y: "Merk denne kommentaren som upassende",
               PROMPT: "Oppgi en årsak til at denne kommentaren er merket (valgfritt):",
               OK: "Merk",
               CANCEL: "Avbryt",
               SUCCESS: "Kommentaren er merket og sendt til gjennomgang.",
               ERROR: "Feil ved flagging av denne kommentaren. Prøv igjen senere."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Vellykket",
            PROMPT: "Endringene er blitt sendt til gjennomgang. Filen vil ikke være tilgjengelig før endringene er godkjent.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Rullegardinknapp"
      },
      SECTION: {
         ABOUT: {
            NAME: "Om denne filen",
            VIEW_FILE_DETAILS: "Vis fildetaljer",
            A11Y: "Hvis du aktiverer denne koblingen, lukkes filviseren, og du kommer til siden med fildetaljene for denne filen."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "Forhåndsvisning er ikke tilgjengelig for denne filen."
         },
         IMAGE: {
            ZOOM_IN: "Zoom inn",
            ZOOM_OUT: "Zoom ut",
            RESET: "Tilbakestill",
            ZOOM_IN_A11Y: "Denne knappen zoomer inn på bildet.",
            ZOOM_OUT_A11Y: "Denne knappen zoomer ut på bildet.",
            RESET_ZOOM_A11Y: "Denne knappen tilbakestiller zoomenivået.",
            UNSAFE_PREVIEW: "Denne filen kan ikke forhåndsvises fordi den ikke er undersøkt for virus."
         },
         VIEWER: {
            LOADING: "Laster inn...",
            PUBLISHING: "Publiserer...",
            NO_PUBLISHED_VERSION: "Det finnes ingen publisert versjon av denne filen tilgjengelig for visning.",
            IFRAME_TITLE: "Forhåndsvisning av denne filen",
            AUTOPUBLISH_TIMEOUT: "Det tar for lang tid før serveren svarer. De nyeste endringene ble kanskje ikke publisert."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Denne filen kan ikke forhåndsvises fordi den ikke er undersøkt for virus."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Sist oppdatert av ${user} i dag klokken ${time}",
            YESTERDAY: "Sist oppdatert av ${user} i går klokken ${time}",
            DAY: "Sist oppdatert av ${user} ${EEee} klokken ${time}",
            MONTH: "Sist oppdatert av ${user} ${date_long}",
            YEAR: "Sist oppdatert av ${user} ${date_long}"
         },
         CREATED: {
            TODAY: "Opprettet av ${user} i dag klokken ${time}",
            YESTERDAY: "Opprettet av ${user} i går klokken ${time}",
            DAY: "Opprettet av ${user} ${EEee} klokken ${time}",
            MONTH: "Opprettet av ${user} ${date_long}",
            YEAR: "Opprettet av ${user} ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - I dag",
            YESTERDAY: "${time} - I går",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "I dag",
            YESTERDAY: "I går",
            DAY: "${EEee}",
            MONTH: "${date_long}",
            YEAR: "${date_long}"
         }
      },
      FILE_SIZE: {
         B: "${0} byte",
         KB: "${0} kB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Tekstområde for kommentar",
         SHADOW_TEXT: "Legg til en kommentar...",
         CANNOT_ACCESS_CONTENT: "Følgende personer som er omtalt, vil ikke kunne se kommentaren fordi de ikke har tilgang til innholdet:",
         ERROR: "Det oppstod en feil ved validering av brukeren du forsøker å nevne.",
         POST: "Legg inn",
         SAVE: "Lagre",
         CANCEL: "Avbryt",
         EXTERNAL_WARNING: "Kommentarer kan ses av personer utenfor organisasjonen."
      },
      EDIT_BOX: {
         SAVE: "Lagre",
         CANCEL: {
            TOOLTIP: "Avbryt",
            A11Y: "Denne knappen avbryter redigeringen av filnavnet."
         },
         INVALID_CHARACTERS: "Ugyldig tegn",
         INVALID_CHARACTERS_REMOVED: "Ugyldige tegn fjernet"
      },
      COMMENT_WIDGET: {
         EDITED: "(Redigert)",
         EDITED_DATE: {
            TODAY: "Redigert i dag klokken ${time}",
            YESTERDAY: "Redigert i går klokken ${time}",
            DAY: "Redigert ${EEee} klokken ${time}",
            MONTH: "Redigert ${date_long}",
            YEAR: "Redigert ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Lagre",
         CANCEL: "Avbryt",
         USER: "Person",
         COMMUNITY: "Fellesskap",
         SHARE: "Del",
         SHARE_ALT: "Del med denne personen",
         MEMBER_TYPE: "Medlemstype",
         PERSON_SHADOW: "Skriv for å finne en person",
         COMMUNITY_SHADOW: "Skriv for å finne et fellesskap",
         PERSON_ARIA: "Skriv for å finne en person. Trykk på skifttasten for å bytte mellom personer, fellesskap og alle i organisasjonen.",
         COMMUNITY_ARIA: "Skriv for å finne et fellesskap. Trykk på skifttasten for å bytte mellom personer, fellesskap og alle i organisasjonen.",
         PERSON_FULL_SEARCH: "Mangler noen på listen? Bruk fullstendig søk...",
         COMMUNITY_FULL_SEARCH: "Mangler et fellesskap på listen? Bruk fullstendig søk...",
         ADD_OPTIONAL_MESSAGE: "Legg til valgfri melding",
         ROLE_LABEL: "Rolle",
         ROLE_EDIT: "Redigerer",
         ROLE_VIEW: "Leser"
      },
      FILE_STATE: {
         DOCS_FILE: "Dette er en Docs-fil. Alle endringer må gjøres online.",
         LOCKED_BY_YOU: {
            TODAY: "Låst av deg klokken ${time}.",
            YESTERDAY: "Låst av deg i går klokken ${time}.",
            DAY: "Låst av deg ${date}.",
            MONTH: "Låst av deg ${date}.",
            YEAR: "Låst av deg ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Låst klokken ${time} av ${user}.",
            YESTERDAY: "Låst i går klokken ${time} av ${user}.",
            DAY: "Låst den ${date} av ${user}.",
            MONTH: "Låst den ${date} av ${user}.",
            YEAR: "Låst den ${date_long} av ${user}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Forkort denne teksten automatisk",
         COMMENT: {
            WARN_TOO_LONG: "Kommentaren er for lang.",
            TRIM: "Forkorte kommentaren?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "Beskrivelsen er for lang.",
            TRIM: "Forkorte beskrivelsen?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "Meldingen er for lang.",
            TRIM: "Forkorte meldingen?"
         },
         TAG: {
            WARN_TOO_LONG: "Taggen er for lang.",
            TRIM: "Forkorte taggen?"
         },
         TAGS: {
            WARN_TOO_LONG: "En eller flere tagger er for lange.",
            TRIM: "Forkorte taggene?"
         },
         FILENAME: {
            WARN_TOO_LONG: "Filnavnet er for langt"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Denne filen kan redigeres online av personer som har HCL Docs.",
         NO_ENTITLEMENT_LINK: "Denne filen kan redigeres online av personer som har ${startLink}HCL Docs${endLink}.", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Denne filen blir i øyeblikket redigert på weben av ${users}.",
         UNPUBLISHED_CHANGES: "Det er redigeringer i dette utkastet som ikke er publisert som en versjon.",
         PUBLISH_A_VERSION: "Publiser en versjon",
         PUBLISH_SUCCESS: "Du har publisert en versjon av denne filen",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "Versjonen kunne ikke publiseres fordi det ble nektet tilgang.",
            NOT_FOUND: "Versjonen kunne ikke publiseres fordi dokumentet ikke ble funnet.",
            CANNOT_REACH_REPOSITORY: "Versjonen kunne ikke publiseres fordi Docs-serveren ikke kan koble seg til fildatalageret.",
            QUOTA_VIOLATION: "Versjonen kunne ikke publiseres på grunn av plassbegrensninger. Fjern andre filer for å frigjøre nok plass til å publisere denne versjonen.",
            CONVERSION_UNAVAILABLE: "Versjonen kunne ikke publiseres fordi Docs-konverteringstjenesten ikke er tilgjengelig. Prøv igjen senere.",
            TOO_LARGE: "Versjonen kunne ikke publiseres fordi dokumentet er for stort.",
            CONVERSION_TIMEOUT: "Versjonen kunne ikke publiseres fordi Docs-konverteringstjenesten bruker for lang tid på å konvertere dokumentet. Prøv igjen senere.",
            SERVER_BUSY: "Versjonen kunne ikke publiseres fordi Docs-serveren er opptatt. Prøv igjen senere.",
            DEFAULT: "Versjonen kunne ikke publiseres fordi Docs-tjenesten ikke er tilgjengelig. Prøv igjen senere."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Redigeringene dine blir publisert. ${startLink}Oppdater for å se endringene dine.${endLink}",
            GENERIC: "Du må kanskje oppdatere siden for å se de nyeste endringene. ${startLink}Oppdater${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Det er ingen kommentarer.",
         MODERATED: "Kommentaren er sendt til gjennomgang og vil bli tilgjengelig når den er godkjent.",
         ERROR: {
            SAVE: {
               DEFAULT: "Kommentaren kunne ikke lagres. Prøv igjen senere.",
               UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan lagre kommentaren.",
               NOT_FOUND: "Kommentaren kunne ikke lagres fordi filen er slettet eller ikke lenger er delt med deg.",
               ACCESS_DENIED: "Kommentaren kunne ikke lagres fordi filen er slettet eller ikke lenger er delt med deg."
            },
            DELETE: {
               DEFAULT: "Kommentaren kunne ikke slettes. Prøv igjen senere.",
               UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan slette kommentaren.",
               NOT_FOUND: "Kommentaren kunne ikke slettes fordi filen er slettet eller ikke lenger er delt med deg.",
               ACCESS_DENIED: "Kommentaren kunne ikke slettes fordi filen er slettet eller ikke lenger er delt med deg."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Lagre",
         EDIT_TAGS: "Rediger tagger",
         ERROR: {
            SAVE: {
               DEFAULT: "Taggen kunne ikke opprettes. Prøv igjen senere."
            },
            DELETE: {
               DEFAULT: "Taggen kunne ikke slettes. Prøv igjen senere."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Les mer...",
         READ_LESS: "Les mindre..."
      },
      SHARE: {
         EVERYONE: "Alle i min organisasjon",
         ADD_TOOLTIP: "Lagre",
         ROLES: {
            OWNER: "Eier",
            EDIT: "Redigerere",
            VIEW: "Lesere",
            FOLDER: "Delt med Mapper"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Eier"
            },
            EDIT: {
               ROLE: "Rediger",
               ADD: "Legg til redigerer"
            },
            VIEW: {
               ROLE: "Leser",
               ADD: "Legg til leser"
            },
            FOLDER: {
               ADD: "Legg til mapper",
               COMMUNITY_ADD: "Legg til i mappe",
               MOVE: "Flytt til mappe"
            },
            MULTI: {
               ADD: "Legg til personer eller fellesskap",
               ADD_PEOPLE: "Legg til personer"
            }
         },
         PUBLIC: {
            SHORT: "Alle i min organisasjon",
            LONG: {
               GENERIC: "Alle i din organisasjon",
               ORG: "Alle i ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Denne filen er allerede delt med ${user}.",
            ERROR: "Kan ikke dele med ${user} nå.",
            SELF: "Du kan ikke dele med deg selv."
         },
         SHARE_INFO: {
            PROMOTED: "${user} er oppgradert til en høyere delingsrolle."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Vellykket deling med ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Filen ble delt."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Valgfri melding..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Klargjør ekstern bruker",
               ACTION: "Klargjør ekstern bruker...",
               TOOLTIP: "Klargjør ekstern bruker",
               DIALOG_TITLE: "Innhold ble ikke delt",
               PROMPT: {
                  NO_ACCOUNT: "Følgende bruker har ikke en konto, og det ble ikke delt noe innhold med vedkommende.",
                  INVITE: "Inviter denne brukeren som gjest for å dele innholdet med vedkommende."
               },
               SUBMIT: "Fortsett med invitasjon",
               CANCEL: "Avbryt",
               ERROR: "Det oppstod en feil ved klargjøring av kontoen. Prøv igjen senere.",
               SUCCESS: "Klargjøring av brukerkonto var vellykket."
            },
            PLURAL: {
               NAME: "Klargjør eksterne brukere",
               ACTION: "Klargjør eksterne brukere...",
               TOOLTIP: "Klargjør eksterne brukere",
               DIALOG_TITLE: "Innhold ble ikke delt",
               PROMPT: {
                  NO_ACCOUNT: "Følgende brukere har ikke en konto, og det ble ikke delt noe innhold med dem.",
                  INVITE: "Inviter disse brukerne som gjester for å dele innholdet med dem."
               },
               SUBMIT: "Fortsett med invitasjoner",
               CANCEL: "Avbryt",
               ERROR: "Det oppstod en feil ved klargjøring av kontoene. Prøv igjen senere.",
               SUCCESS: "Klargjøring av brukerkontoer var vellykket."
            },
            ABSTRACT: {
               NAME: "Klargjør eksterne brukere",
               ACTION: "Klargjør eksterne brukere...",
               TOOLTIP: "Klargjør eksterne brukere",
               DIALOG_TITLE: "Innhold ble ikke delt",
               PROMPT: {
                  NO_ACCOUNT: "Noen brukere har ikke konto, og det ble ikke delt noe innhold med dem.",
                  INVITE: "Inviter disse brukerne som gjester for å dele innholdet med dem."
               },
               SUBMIT: "Fortsett med invitasjoner",
               CANCEL: "Avbryt",
               ERROR: "Det oppstod en feil ved klargjøring av kontoene. Prøv igjen senere.",
               SUCCESS: "Klargjøring av brukerkontoer var vellykket."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Delingsalternativer",
         PROPAGATION: "Tillat andre å dele denne filen",
         EVERYONE: "Alle kan dele denne filen.",
         OWNER_ONLY: "Bare eieren kan dele denne filen.",
         STOP_SHARE: "Avslutt deling",
         MAKE_INTERNAL: "Avslutt ekstern deling",
         MAKE_INTERNAL_SUCCESS: "Denne filen kan ikke lenger deles med personer utenfor organisasjonen din.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Gjøre intern?",
            PROMPT: "Hvis du gjør denne filen intern, kan den ikke lenger deles med personer utenfor organisasjonen din. ${br}${br}" +
            "Eventuelle delinger med ekstern personer, fellesskap eller mapper vil bli fjernet.${br}${br}Hvis du gjør en fil intern, er det permanent og kan ikke angres.",
            EFSS: {
               DIALOG_TITLE: "Gjøre intern?",
               PROMPT: "Hvis du gjør denne filen intern, kan den ikke lenger deles med personer utenfor organisasjonen din. ${br}${br}" +
               "Eventuelle delinger med ekstern personer eller mapper vil bli fjernet.${br}${br}Hvis du gjør en fil intern, er det permanent og kan ikke angres."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Avslutt deling av fil",
            PROMPT: "Er du sikker på at du vil avslutte delingen av denne filen?",
            QUESTION_PUBLIC: "Denne filen vil ikke lenger være synlig for alle i organisasjonen din, eller delt med personer, mapper eller fellesskap. Denne operasjonen kan ikke angres.",
            QUESTION_PUBLIC_E: "Denne filen vil ikke lenger være synlig for alle i organisasjonen din, eller delt med personer eller mapper. Denne operasjonen kan ikke angres.",
            QUESTION: "Filen vil ikke lenger være delt med personer eller fellesskap, og den vil bli fjernet fra alle mapper unntatt dine private mapper. Denne handlingen kan ikke angres.",
            QUESTION_E: "Denne filen vil ikke lenger være delt med personer, og den vil bli fjernet fra alle mapper unntatt dine private mapper. Denne handlingen kan ikke angres."
         },
         MAKE_PRIVATE_SUCCESS: "Denne filen er nå privat.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Kan ikke avslutte deling av filen. Prøv igjen senere."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Mine delinger"
      },
      STREAM: {
         LOADING: "Laster inn...",
         LOAD_MORE: "Last inn mer..."
      },
      ENTRY: {
         REMOVE: "Fjern",
         RESTORE: "Gjenopprett",
         EDIT: "Rediger",
         DELETE: "Slett",
         OK: "OK",
         CANCEL: "Avbryt",
         USER_PICTURE: "${0}s bilde",
         FLAG: "Merk som upassende"
      },
      PANEL: {
         LOAD_ERROR: "Det oppstod en feil ved tilgang til metadataene for denne filen.",
         ABOUT: {
            TITLE: "Om",
            EXPAND_BUTTON: "Utvid denne knappen for å få se mer informasjon",
            CURRENT_VERSION_HEADER: "Gjeldende versjon ${versionNumber}",
            FILE_SIZE_HEADER: "Filstørrelse",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Gjeldende versjon",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Alle versjoner",
            DOCS_DRAFT_UPDATED_HEADER: "Utkast redigert",
            DOCS_DRAFT_CREATED_HEADER: "Utkast opprettet",
            DOCS_UPDATED_HEADER: "Publisert",
            DOCS_CREATED_HEADER: "Opprettet",
            UPDATED_HEADER: "Oppdatert",
            CREATED_HEADER: "Opprettet",
            LIKES_HEADER: "Liker",
            LIKES_EXPAND_ICON: "Utvid dette ikonet for å se hvem som har likt filen",
            DOWNLOADS_HEADER: "Visninger",
            DOWNLOADS_HEADER_MORE: "Visninger (${0})",
            DOWNLOADS_EXPAND_ICON: "Utvid dette ikonet for å se hvem som har vist filen",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonymt",
            DOWNLOADS_LATEST_VERSION: "Du har den nyeste versjonen av denne filen",
            DOWNLOADS_LAST_VERSION: "Du viste sist versjon ${0} av denne filen",
            TAGS_HEADER: "Tagger",
            DESCRIPTION_HEADER: "  Beskrivelse",
            DESCRIPTION_READ_MORE: "Les mer...",
            LINKS_HEADER: "Koblinger",
            SECURITY: "Sikkerhet",
            FILE_ENCRYPTED: "Filinnholdet er kryptert. Det er ikke mulig å søke i kryptert filinnhold. Filinnholdet kan ikke vises og kan ikke redigeres med HCL Docs.",
            GET_LINKS: "Hent koblinger...",
            ADD_DESCRIPTION: "Legg til en beskrivelse",
            NO_DESCRIPTION: "Ingen beskrivelse",
            ADD_TAGS: "Legg til tagger",
            NO_TAGS: "Ingen tagger"
         },
         COMMENTS: {
            TITLE: "Kommentarer",
            TITLE_WITH_COUNT: "Kommentarer (${0})",
            VERSION: "Versjon ${0}",
            FEED_LINK: "Kanal for disse kommentarene",
            FEED_TITLE: "Følg endringene i disse kommentarene gjennom kanalleseren"
         },
         SHARING: {
            TITLE: "Deling",
            TITLE_WITH_COUNT: "Delt (${0})",
            SHARED_WITH_FOLDERS: "Delt med Mapper - ${count}",
            SEE_WHO_HAS_SHARED: "Se hvem som har delt",
            COMMUNITY_FILE: "Filer som eies av et fellesskap, kan ikke deles med personer eller andre fellesskap.",
            SHARED_WITH_COMMUNITY: "Delt med medlemmer av fellesskapet '${0}'",
            LOGIN: "Logg på",
            NO_SHARE: "Denne filen er ikke lagt til i noen mappe ennå.",
            ONE_SHARE: "Denne filen er i 1 mappe eller fellesskap som du ikke har tilgang til.",
            MULTIPLE_SHARE: "Denne filen er i ${fileNumber} mapper eller fellesskap som du ikke har tilgang til."
         },
         VERSIONS: {
            TITLE: "Versjoner",
            TITLE_WITH_COUNT: "Versjoner (${0})",
            FEED_LINK: "Kanal for disse versjonene",
            FEED_TITLE: "Følg endringene på denne filen gjennom kanalleseren"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Handlingsbekreftelse",
         DIALOG_TITLE: "Bekreft",
         PROMPT: "Er du sikker på at du vil utføre denne handlingen?",
         ERROR: "Det oppstod en feil da handlingen ble utført. Prøv igjen senere.",
         TOOLTIP: "Utfør handling",
         OK: "OK",
         CANCEL: "Avbryt",
         A11Y: "Denne knappen utfører den gjeldende handlingen."
      },
      THUMBNAIL: {
         TITLE: "Miniatyrbilde",
         CHANGE_LINK: "Endre miniatyrbilde...",
         ERROR: "Miniatyrbildet kunne ikke lagres. Prøv igjen senere.",
         EXT_ERROR: "Velg en fil med en av følgende støttede filtyper: ${0}",
         SUCCESS: "Miniatyrbildet ble endret",
         UPLOAD: "Lagre",
         CANCEL: "Avbryt"
      },
      UPLOAD_VERSION: {
         LINK: "Last opp ny versjon...",
         CHANGE_SUMMARY: "Valgfritt endringssammendrag...",
         ERROR: "Den nye versjonen kunne ikke lagres. Prøv igjen senere.",
         SUCCESS: "Den nye versjonen ble lagret",
         UPLOAD: "Last opp",
         UPLOAD_AND_CHANGE_EXTENSION: "Last opp og endre filtype",
         CANCEL: "Avbryt",
         TOO_LARGE: "${file} er større enn den tillatte filstørrelsen på ${size}.",
         PROGRESS_BAR_TITLE: "Laster opp ny versjon (${uploaded} av ${total} ferdig)",
         CANCEL_UPLOAD: "Avbryt opplasting"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Det oppstod en feil ved tilgangen til filen. Prøv igjen senere.",
         UNAUTHENTICATED: "Sesjonen er tidsutkoblet. Du må logge på igjen før du kan vise filen.",
         NOT_FOUND: "Filen du har bedt om, er slettet eller flyttet. Hvis noen sendte deg denne koblingen, må du kontrollere at den er riktig.",
         ACCESS_DENIED: "Du har ikke tillatelse til å se på denne filen. Filen er ikke delt med deg.",
         ACCESS_DENIED_ANON: "Du har ikke tillatelse til å se på denne filen. Hvis dette er din fil eller den er delt med deg, må du logge deg på først."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Feil",
         PROMPT: "Filen du har bedt om, er slettet eller flyttet.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Bekreft",
        PROMPT: "HCL Connections-sesjonen din er tidsutkoblet.${lineBreaks}Klikk på OK hvis du vil logge deg på igjen, eller på Avbryt hvis du vil lukke denne dialogboksen.",
        OK: "OK",
        CANCEL: "Avbryt"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Ingen tilgang til kobling",
        PROMPT: "Feil ved tilgang til koblingen.${lineBreaks}Klikk på OK for å bli omdirigert til siden.",
        OK: "OK",
        CANCEL: "Avbryt"
      },
      LOAD_ERROR: {
         DEFAULT: "Beklager. Det oppstod en feil ved bruk av koblingen.",
         ACCESS_DENIED: "Kontakt fileieren for å be om tillatelse til å vise denne filen."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Fil",
         LOAD_ERROR: "Feil ved tilgang til fil"
      },
      SHARE_WITH_LINK: {
         TITLE: "Del via kobling",
         EMPTY_DESCRIPTION: "Du har ikke opprettet en kobling for denne filen ennå. Opprett en delt kobling som du kan sende til andre, slik at de kan forhåndsvise og laste ned filen.",
         CREATE_LINK: "Opprett en kobling",
         COPY_LINK: "Kopier kobling",
         DELETE_LINK: "Slett kobling",
         ACCESS_TYPE_1: "Alle med koblingen kan vise denne filen",
         ACCESS_TYPE_2: "Personer i organisasjonen min kan vise denne filen",
         ACCESS_TYPE_1_DESCRIPTION: "Personer som får koblingen, kan forhåndsvise og laste ned denne filen etter at de har logget seg på Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Personer i min organisasjon som får koblingen, kan forhåndsvise og laste ned denne filen etter at de har logget seg på Connections.",
         CHANGE_TYPE_SUCCESS: "Koblingstillatelse blir oppdatert når tilgangstypen blir endret.",
         CHANGE_TYPE_ERROR: "Oppdatering av koblingstillatelse mislyktes da tilgangstypen ble endret.",
         COPY_LINK_SUCCESS: "Kobling kopiert til utklippstavlen",
         CREATE_SHARELINK_SUCCESS:"Kobling ble opprettet.",
         CREATE_SHARELINK_ERROR:"Kan ikke opprette en kobling på grunn av en feil.",
         DELETE_SHARELINK_SUCCESS: "Slettet den delte koblingen for \"${file}.\"",
         DELETE_SHARELINK_ERROR: "Den delte koblingen ble ikke slettet. Prøv igjen senere.",
         CONFIRM_DIALOG: {
            OK: "Slett",
            DIALOG_TITLE: "Slett den delte koblingen",
            PROMPT: "Denne filen vil bli utilgjengelig for alle som har koblingen. Er du sikker på at du vil slette den delte koblingen?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Delt kobling er aktiv. Alle med koblingen kan vise denne filen. Klikk for å kopiere denne koblingen.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Delt kobling er aktiv. Personer i organisasjonen min kan vise denne filen. Klikk for å kopiere denne koblingen."
      }
});
