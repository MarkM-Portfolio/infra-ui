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
     FILE_VIEWER_TITLE: "Forhåndsvisning af fil",
     FILENAME_TOOLTIP: "Redigér filnavn",
     ICON_TOOLTIP: "Download fil",
     ERROR: "Der er opstået en fejl.",
     SHARED_EXTERNALLY: "Delt eksternt",
     FILE_SYNCED: "Tilføjet til synkronisering",
     MORE_ACTIONS: {
       TITLE: "Flere handlinger",
       A11Y: "Åbner en rullemenu med en liste over flere handlinger, der kan udføres for filen."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Flere indstillinger",
         A11Y: "Brug denne knap til at åbne en menu med flere indstillinger."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Redigér"
         },
         UPLOAD: {
           TITLE: "Upload"
         }
       }
     },
     WELCOME: {
       TITLE: "Vi har kombineret filoversigten og detaljerne.",
       SUBTITLE: "Du kan nu få vist en fil sammen med kommentarerne til den.",
       LINES: {
          LINE_1: "Al den information og de ting, du kunne gøre på den gamle side, findes her.",
          LINE_2: "Kommentarer, delinger, versioner og basisoplysninger findes ved siden af filen."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Brug denne knap til at gå til næste fil.",
      PREVIOUS_A11Y: "Brug denne knap til at gå til forrige fil."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Luk",
         A11Y: "Brug denne knap til at lukke filfremviseren."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Ny fra fil",
         ACTION_NAME:"Opret fil",
         A11Y: {
           TEXT: "Opret et dokument (DOC-, DOCX- eller ODT-fil) fra en skabelonfil. Du kan redigere disse dokumenter online i Docs.",
           PRES: "Opret en præsentation (PPT-, PPTX- eller ODP-fil) fra en skabelonfil. Du kan redigere disse præsentationer online i Docs.",
           SHEET: "Opret et regneark (XLS-, XLSX- eller ODS-fil) fra en skabelonfil. Du kan redigere disse regneark online i Docs."
         },
         PROMPT: {
           TEXT: "Opret et dokument (DOC-, DOCX- eller ODT-fil) fra en skabelonfil. Du kan redigere disse dokumenter online i Docs.",
           PRES: "Opret en præsentation (PPT-, PPTX- eller ODP-fil) fra en skabelonfil. Du kan redigere disse præsentationer online i Docs.",
           SHEET: "Opret et regneark (XLS-, XLSX- eller ODS-fil) fra en skabelonfil. Du kan redigere disse regneark online i Docs."
         },
         NAME_FIELD: "Navn:",
         EXTERNAL_FIELD: "Filer kan deles med personer uden for min organisation",
         EXTERNAL_DESC: "Ekstern adgang giver mulighed for at dele filer med eksterne brugere (personer uden for din organisation eller virksomhed) eller foldere, der er delt med eksterne brugere, samt fællesskaber, hvor eksterne personer er medlemmer. Du skal definere den eksterne adgang, når du uploader en fil, da adgangen ikke kan aktiveres senere.",
         CREATE_BUTTON: "Opret",
         CANCEL: "Annullér",
         PRE_FILL_NAMES: {
           OTT: "Dokument uden titel",
           OTS: "Regneark uden titel",
           OTP: "Præsentation uden titel",
           DOT: "Dokument uden titel",
           XLT: "Regneark uden titel",
           POT: "Præsentation uden titel",
           DOTX: "Dokument uden titel",
           XLTX: "Regneark uden titel",
           POTX: "Præsentation uden titel"
         },
         ERRORS: {
           NAME_REQUIRED: "Angiv et dokumentnavn.",
           ILLEGAL_NAME:"Denne dokumenttitel er ugyldig. Angiv en anden.",
           WARN_LONG_NAME: "Dokumentnavnet er for langt.",
           TRIM_NAME: "Forkort dokumentnavnet?",
           SESSION_TIMEOUT: "Din session er udløbet. Log på, og prøv igen.",
           DUPLICATE_NAME: "Filnavnet findes allerede. Angiv et nyt navn.",
           SERVER_ERROR: "Connections-serveren er ikke tilgængelig. Kontakt serveradministratoren, og prøv igen senere."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Download fil",
         A11Y: "Denne knap downloader filen."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Download som PDF",
         TOOLTIP: "Download denne fil som en PDF-fil",
         A11Y: "Denne knap downloader filen som en PDF.",
         SUCCESS: "Du har downloadet filen som en PDF.",
         ERROR: {
           DEFAULT: "Du kunne ikke downloade filen som en PDF. Prøv igen senere.",
           UNAUTHENTICATED: "Tidsfristen for din session er udløbet. Du skal logge på igen, før du kan downloade filen som en PDF.",
           NOT_FOUND: "Filen kan ikke downloades som en PDF, fordi den er slettet eller ikke længere deles med dig.",
           ACCESS_DENIED: "Filen kan ikke downloades som en PDF, fordi den er slettet eller ikke længere deles med dig."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Der er ingen publiceret version af filen, som kan downloades. Versioner kan publiceres fra Docs-editoren."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Kan ikke downloade filen",
           CANCEL: "Luk",
           PROMPT: "Der er ingen publiceret version af filen, som kan downloades.",
           PROMPT2: "Versioner kan publiceres fra Docs-editoren."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Kan ikke downloade filen",
           CANCEL: "Luk",
           PROMPT: "Der er ingen publiceret version af filen, som kan downloades.",
           PROMPT2: "Bed filens ejer om at publicere en version af filen."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Download en version",
           OK: "Download version",
           PROMPT: {
             TODAY: "Der er fundet en nyere kladde, som senest er redigeret kl. ${time}.",
             YESTERDAY: "Der er fundet en nyere kladde, som senest er redigeret i går kl. ${time}.",
             DAY: "Der er fundet en nyere kladde, som senest er redigeret ${date}.",
             MONTH: "Der er fundet en nyere kladde, som senest er redigeret ${date}.",
             YEAR: "Der er fundet en nyere kladde, som senest er redigeret ${date_long}."
           },
           PROMPT2: {
             TODAY: "Vil du fortsætte med at downloade den version, der blev publiceret i dag kl. ${time}?",
             YESTERDAY: "Vil du fortsætte med at downloade den version, der blev publiceret i går kl. ${time}?",
             DAY: "Vil du fortsætte med at downloade den version, der blev publiceret ${date}?",
             MONTH: "Vil du fortsætte med at downloade den version, der blev publiceret ${date}?",
             YEAR: "Vil du fortsætte med at downloade den version, der blev publiceret ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Vis detaljer",
         HIDE: "Skjul detaljer",
         SHOW_A11Y: "Brug denne knap til at skifte mellem åben og lukket sidepanel. Sidepanelet er i øjeblikket lukket.",
         HIDE_A11Y: "Brug denne knap til at skifte mellem åben og lukket sidepanel. Sidepanelet er i øjeblikket åben."
       },
       VIEW_DOC: {
         NAME: "Åbn i Docs Viewer",
         TOOLTIP: "Åbn i Docs Viewer",
         A11Y: "Knappen åbner filen i fremvisningstilstand i et nyt browservindue."
       },
       EDIT_DOC: {
         NAME: "Redigér i Docs",
         TOOLTIP: "Redigér fil i Docs",
         A11Y: "Knappen åbner filen i redigeringstilstand i et nyt vindue."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Redigér på skrivebord",
         DIALOG_TITLE: "Redigér på skrivebord",
         TOOLTIP: "Redigér dette dokument",
         A11Y: "Brug denne knap til at åbne filen til redigering lokalt.",
         PROMPT: "Denne funktion giver dig mulighed for at redigere filen lokalt.",
         IMPORTANT: "Vigtigt!",
         REMINDER: "Når du er færdig med at redigere, skal du publicere en kladde ved hjælp af desktop connector-funktioner til filer. Hvis filen ikke kan åbnes, skal du muligvis installere desktop-pluginerne.",
         SKIP_DIALOG: "Vis ikke denne meddelelse igen.",
         OK: "OK",
         CANCEL: "Annullér"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Bekræft",
         DELETE_VERSION: "Slet version ${version}",
         DELETE_VERSION_AND_PRIOR: "Slet version ${version} og alle tidligere versioner",
         PROMPT: "Du er ved at slette version ${version}. Vil du fortsætte?",
         DELETE_PRIOR: "Slet også alle tidligere versioner",
         ERROR: "Der er opstået en fejl under sletning af versionen. Prøv igen senere.",
         TOOLTIP: "Slet denne version",
         OK: "OK",
         CANCEL: "Annullér"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Hent link",
         LINK_FILE: "Link til fil:",
         LINK_PREVIEW: "Link til forhåndsvisningsfil:",
         LINK_DOWNLOAD: "Link til downloadningsfil:",
         TOOLTIP: "Link til fil",
         OK: "Luk"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Download denne version"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Bekræft",
         PROMPT: "Du er i færd med at erstatte den aktuelle version af denne fil med version ${version}. Vil du fortsætte?",
         ERROR: "Der er opstået en fejl under gendannelse af versionen. Prøv igen senere.",
         TOOLTIP: "Gendan denne version",
         CHANGE_SUMMARY: "Gendannet fra version ${version}",
         OK: "OK",
         CANCEL: "Annullér"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Bekræft",
         REMOVE_EVERYONE: "Er du sikker på, at du vil fjerne din organisations adgang til denne fil? Hvis adgangen fjernes, bliver filen fjernet fra foldere og fællesskaber, der tillader adgang på organisationsniveau, og kun ejeren og de personer, som den har været delt med, kan se og arbejde med den.",
         REMOVE_USER: "Er du sikker på, at du vil stoppe deling med ${user}? Hvis du stopper deling, har ${user} kun adgang til filen via foldere, eller hvis den deles med alle i organisationen.",
         REMOVE_COMMUNITY: "Er du sikker på, at du vil fjerne denne fil fra fællesskabet ${communityName}?",
         REMOVE_FOLDER: "Er du sikker på, at du vil fjerne denne fil fra folderen ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Fjern din organisations adgang",
         REMOVE_USER_TOOLTIP: "Fjern alle delinger med ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Fjern fra fællesskabet ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Fjern fra folderen ${folderName}",
         OK: "OK",
         CANCEL: "Annullér"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Redigér denne kommentar"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Bekræft",
         PROMPT: "Er du sikker på, at du vil slette denne kommentar?",
         ERROR: "Der er opstået en fejl under sletning af kommentaren. Prøv igen senere.",
         TOOLTIP: "Slet denne kommentar",
         OK: "OK",
         CANCEL: "Annullér"
       },
       LIKE: {
         LIKE: "Synes godt om filen",
         UNLIKE: "Fjern Synes godt om filen",
         LIKE_A11Y: "Brug denne knap til at synes godt om denne fil.",
         UNLIKE_A11Y: "Brug denne knap til at fjerne Synes godt om for denne fil.",
         LIKED_SUCCESS: "Du syntes godt om filen",
         UNLIKE_SUCCESS: "Du holdt op med at synes godt om filen"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Redigér beskrivelse",
         ERROR: {
           DEFAULT: "Beskrivelsen kunne ikke gemmes. Prøv igen senere.",
           UNAUTHENTICATED: "Tidsfristen for din session er udløbet. Du skal logge på igen, før du kan opdatere beskrivelsen.",
           NOT_FOUND: "Beskrivelsen kan ikke gemmes, fordi filen er slettet eller ikke længere deles med dig.",
           ACCESS_DENIED: "Beskrivelsen kan ikke gemmes, fordi filen er slettet eller ikke længere deles med dig."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Fejl under lagring af filnavn",
           CONFLICT: "Filnavn findes allerede"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Der er opstået en fejl under forsøg på at følge filen. Prøv igen senere.",
             UNAUTHENTICATED: "Tidsfristen for din session er udløbet. Du skal logge på igen, før du kan følge filen.",
             NOT_FOUND: "Du kan ikke følge filen, fordi den er slettet eller ikke længere deles med dig.",
             ACCESS_DENIED: "Du kan ikke følge filen, fordi den er slettet eller ikke længere deles med dig."
           },
           UNFOLLOW: {
             DEFAULT: "Der er opstået en fejl under forsøg på at holde op med følge filen. Prøv igen senere.",
             UNAUTHENTICATED: "Tidsfristen for din session er udløbet. Du skal logge på igen, før du kan holde op med at følge filen.",
             NOT_FOUND: "Du kan ikke holde op med at følge filen, fordi den er slettet eller ikke længere deles med dig.",
             ACCESS_DENIED: "Du kan ikke holde op med at følge filen, fordi den er slettet eller ikke længere deles med dig."
           }
         },
         FOLLOW_NAME: "Følg",
         FOLLOW_TOOLTIP: "Følg denne fil",
         FOLLOW_A11Y: "Brug denne knap til at følge filen.",
         FOLLOW_SUCCESS: "Du følger nu denne fil.",
         STOP_FOLLOWING_NAME: "Hold op med at følge",
         STOP_FOLLOWING_TOOLTIP: "Hold op med at følge denne fil",
         STOP_FOLLOWING_A11Y: "Brug denne knap til at holde op med at følge filen.",
         STOP_FOLLOWING_SUCCESS: "Du er stoppet med at følge denne fil."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Tilføj til synkronisering",
           TOOLTIP: "Tilføj denne fil til synkronisering",
           A11Y: "Brug denne knap til at tilføje filen til synkronisering.",
           SUCCESS: "Du har tilføjet denne fil til synkronisering.",
           ERROR: {
             DEFAULT: "Der er opstået en fejl under forsøg på at tilføje filen til synkronisering. Prøv igen senere.",
             UNAUTHENTICATED: "Tidsfristen for din session er udløbet. Du skal logge på igen, før du kan tilføje filen til synkronisering.",
             NOT_FOUND: "Du kan ikke tilføje filen til synkronisering, fordi den er slettet eller ikke længere deles med dig.",
             ACCESS_DENIED: "Du kan ikke tilføje filen til synkronisering, fordi den er slettet eller ikke længere deles med dig."
           }
         },
         STOP_SYNC: {
           NAME: "Fjern fra synkronisering",
           TOOLTIP: "Fjern denne fil fra synkronisering",
           A11Y: "Brug denne knap til at fjerne filen fra synkronisering.",
           SUCCESS: "Du har fjernet denne fil fra synkronisering.",
           ERROR: {
             DEFAULT: "Der er opstået en fejl under forsøg på at fjerne filen fra synkronisering. Prøv igen senere.",
             UNAUTHENTICATED: "Tidsfristen for din session er udløbet. Du skal logge på igen, før du kan fjerne filen fra synkronisering.",
             NOT_FOUND: "Du kan ikke fjerne filen fra synkronisering, fordi den er slettet eller ikke længere deles med dig.",
             ACCESS_DENIED: "Du kan ikke fjerne filen fra synkronisering, fordi den er slettet eller ikke længere deles med dig."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Fastgør",
          FAVORITE_TOOLTIP: "Fastgør denne fil",
          FAVORITE_A11Y: "Denne knap fastgør filen.",
          FAVORITE_SUCCESS: "Du har fastgjort denne fil.",
          STOP_FAVORITEING_NAME: "Frigør",
          STOP_FAVORITEING_TOOLTIP: "Frigør denne fil",
          STOP_FAVORITEING_A11Y: "Denne knap frigør filen.",
          STOP_FAVORITEING_SUCCESS: "Du har frigjort denne fil."
       },
       TRASH: {
         NAME: "Flyt til papirkurv",
         DIALOG_TITLE: "Bekræft",
         PROMPT: "Er du sikker på, at du vil flytte denne fil til papirkurven? Hvis du flytter filen til papirkurven, bliver den utilgængelig for alle, som den deles med i øjeblikket.",
         ERROR: "Der er opstået en fejl under sletning af filen. Prøv igen senere.",
         TOOLTIP: "Slet denne fil",
         OK: "OK",
         CANCEL: "Annullér",
         A11Y: "Brug denne knap til at flytte filen til papirkurven.",
         SUCCESS_MSG: "${file} er flyttet til papirkurven."
       },
       REFRESH: {
         NAME: "Opfrisk",
         ERROR: "Der er opstået en fejl under opfriskning af filfremviseren. Prøv igen senere.",
         TOOLTIP: "Opfrisk filfremviseren",
         INFO_MSG: "Opfrisk for at hente det nyeste indhold. ${link}",
         A11Y: "Brug denne knap til at flytte filen til papirkurven.",
         SUCCESS_MSG: "Indholdet er opfrisket."
       },
       COPY_FILE: {
         NAME: "Giv kopi til fællesskab",
         DIALOG_TITLE: "Bekræft",
         ERROR: "Der er opstået en fejl under kopiering af filen. Prøv igen senere.",
         TOOLTIP: "Giv en kopi af denne fil til et fællesskab",
         OK: "OK",
         CANCEL: "Annullér",
         A11Y: "Brug denne knap til at åbne en dialogboks, hvor du kan give en kopi af filen til et fællesskab.",
         SUCCESS_MSG: "${file} er kopieret til ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Upload ny version",
         NAME_SHORT: "Upload",
         CHANGE_SUMMARY: "Valgfrit ændringsresumé...",
         TOOLTIP: "Upload en ny version af filen",
         A11Y: "Brug denne knap til at åbne en dialogboks, hvor du kan uploade en ny version af denne fil."
       },
       LOG_IN: {
    	   NAME: "Log på",
    	   TOOLTIP: "Log på for at uploade og dele filer, kommentere og oprette foldere"
       },
       LOCK: {
          NAME: "Lås fil",
          TITLE: "Lås denne fil",
          A11Y: "Lås denne fil",
          SUCCESS: "Filen er nu låst."
       },
       UNLOCK: {
          NAME: "Lås fil op",
          TITLE: "Lås denne fil op",
          A11Y: "Lås denne fil op",
          SUCCESS: "Filen er nu låst op."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Redigér på skrivebord",
          TITLE: "Redigér på skrivebord",
          A11Y: "Redigér på skrivebord"
       },
       FLAG: {
         FILE: {
           NAME: "Markér som upassende",
           TITLE: "Markér fil",
           A11Y: "Markér denne fil som upassende",
           PROMPT: "Angiv en årsag til at markere denne fil (valgfrit):",
           OK: "Markér",
           CANCEL: "Annullér",
           SUCCESS: "Filen er markeret og sendt til gennemgang.",
           ERROR: "Filen er fejlmarkeret. Prøv igen senere."
         },
         COMMENT: {
           NAME: "Markér som upassende",
           TITLE: "Markér kommentar",
           A11Y: "Markér denne kommentar som upassende",
           PROMPT: "Angiv en årsag til at markere denne kommentar (valgfrit):",
           OK: "Markér",
           CANCEL: "Annullér",
           SUCCESS: "Kommentaren er markeret og sendt til gennemgang.",
           ERROR: "Kommentaren er fejlmarkeret. Prøv igen senere."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Om denne fil",
       VIEW_FILE_DETAILS: "Vis fildetaljer",
       A11Y: "Når du aktiverer dette link, bliver filfremviseren lukket, og du bliver vender tilbage til siden med fildetaljer for denne fil."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Der er nogen tilgængelig forhåndsvisning af denne fil."
      },
      IMAGE: {
       ZOOM_IN: "Zoom ind",
       ZOOM_OUT: "Zoom ud",
       RESET: "Nulstil",
       ZOOM_IN_A11Y: "Denne knap zoomer ind på billedet.",
       ZOOM_OUT_A11Y: "Denne knap zoomer billedet ud.",
       RESET_ZOOM_A11Y: "Denne knap nulstiller zoomniveauet."
      },
      VIEWER: {
       LOADING: "Indlæser...",
       NO_PUBLISHED_VERSION: "Der er ingen publiceret version af denne fil, der kan fremvises.",
       IFRAME_TITLE: "Forhåndsvisning af denne fil"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Sidst opdateret af ${user} i dag kl. ${time}",
       YESTERDAY: "Sidst opdateret af ${user} i går kl. ${time}",
       DAY: "Sidst opdateret af ${user} ${EEee} kl. ${time}",
       MONTH: "Sidst opdateret af ${user} ${date_long}",
       YEAR: "Sidst opdateret af ${user} ${date_long}"
      },
      CREATED: {
       TODAY: "Oprettet af ${user} i dag kl. ${time}",
       YESTERDAY: "Oprettet af ${user} i går kl. ${time}",
       DAY: "Oprettet af ${user} ${EEee} kl. ${time}",
       MONTH: "Oprettet af ${user} ${date_long}",
       YEAR: "Oprettet af ${user} ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - i dag",
       YESTERDAY: "${time} - i går",
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
      BYTES: "${size} B",
      KILOBYTES: "${size} KB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
     },
     COMMENT_BOX: {
       TITLE: "Tekstområde til kommentar",
       SHADOW_TEXT: "Tilføj en kommentar...",
       CANNOT_ACCESS_CONTENT: "Følgende personer, som du nævnte, vil ikke få kommentaren vist, fordi de ikke har adgang til indholdet:",
       ERROR: "Der er opstået en fejl under validering af den bruger, du forsøger at omtale.",
       POST: "Postér",
       SAVE: "Gem",
       CANCEL: "Annullér",
       EXTERNAL_WARNING: "Kommentarer kan læses af personer uden for din organisation."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Annullér",
         A11Y: "Brug denne knap til at annullere redigeringen af filnavnet."
       },
       INVALID_CHARACTERS: "Ugyldige tegn",
       INVALID_CHARACTERS_REMOVED: "Ugyldige tegn fjernet"
     },
     COMMENT_WIDGET: {
       EDITED: "(redigeret)",
       EDITED_DATE: {
         TODAY: "Redigeret i dag kl. ${time}",
         YESTERDAY: "Redigeret i går kl. ${time}",
         DAY: "Redigeret ${EEee} kl. ${time}",
         MONTH: "Redigeret ${date_long}",
         YEAR: "Redigeret ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Gem",
       CANCEL: "Annullér",
       USER: "Bruger",
       COMMUNITY: "Fællesskab",
       SHARE: "Del",
       SHARE_ALT: "Del med denne bruger",
       MEMBER_TYPE: "Medlemstype",
       PERSON_SHADOW: "Skriv for at søge efter en person",
       COMMUNITY_SHADOW: "Skriv for at søge efter et fællesskab",
       PERSON_FULL_SEARCH: "Findes personen ikke? Brug fuld søgning...",
       COMMUNITY_FULL_SEARCH: "Findes fællesskabet ikke? Brug fuld søgning...",
       ADD_OPTIONAL_MESSAGE: "Tilføj valgfri besked",
       ROLE_LABEL: "Rolle",
       ROLE_EDIT: "Redaktør",
       ROLE_VIEW: "Læser"
     },
     FILE_STATE: {
       DOCS_FILE: "Dette er en Docs-fil. Alle ændringer skal foretages online.",
       LOCKED_BY_YOU: {
         TODAY: "Låst af dig kl. ${time}.",
         YESTERDAY: "Låst af dig i går kl. ${time}.",
         DAY: "Låst af dig ${date}.",
         MONTH: "Låst af dig ${date}.",
         YEAR: "Låst af dig ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Låst kl. ${time} af ${user}.",
         YESTERDAY: "Låst i går kl. ${time} af ${user}.",
         DAY: "Låst ${date} af ${user}.",
         MONTH: "Låst ${date} af ${user}.",
         YEAR: "Låst ${date_long} af ${user}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Kommentaren er for lang.",
         TRIM: "Vil du gøre kommentaren kortere?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Beskrivelsen er for lang.",
         TRIM: "Vil du gøre beskrivelsen kortere?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Beskeden er for lang.",
         TRIM: "Vil du gøre beskeden kortere?"
       },
       TAG: {
         WARN_TOO_LONG: "Emneordet er for langt.",
         TRIM: "Vil du gøre emneordet kortere?"
       },
       TAGS: {
         WARN_TOO_LONG: "Et eller flere emneord er for lange.",
         TRIM: "Vil du gøre emneordene kortere?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Filnavn for langt"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Filen kan kun redigeres på internettet, hvis du har købt en Docs-licens.",
       CURRENT_EDITORS: "Filen redigeres i øjeblikket på internettet af ${users}.",
       UNPUBLISHED_CHANGES: "Der er ændringer af denne kladde, som ikke er publiceret som en version.",
       PUBLISH_A_VERSION: "Publicér en version",
       PUBLISH_SUCCESS: "Du har publiceret en version af filen",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Versionen kan ikke publiceres, fordi du ikke har adgang til den.",
         NOT_FOUND: "Versionen kan ikke publiceres, fordi dokumentet ikke findes.",
         CANNOT_REACH_REPOSITORY: "Versionen kan ikke publiceres, fordi Docs-serveren ikke kan oprette forbindelse til fillageret.",
         QUOTA_VIOLATION: "Versionen kan ikke publiceres på grund af pladsbegrænsninger. Fjern andre filer, så der er plads til at publicere denne version.",
         CONVERSION_UNAVAILABLE: "Versionen kan ikke publiceres, fordi Docs-konverteringsfunktionen ikke er tilgængelig. Prøv igen senere.",
         TOO_LARGE: "Versionen kan ikke publiceres, fordi dokumentet er for stort.",
         CONVERSION_TIMEOUT: "Versionen kan ikke publiceres, fordi Docs-konverteringsfunktionen bruger for lang tid til at konvertere dokumentet. Prøv igen senere.",
         SERVER_BUSY: "Versionen kan ikke publiceres, fordi Docs-serveren er optaget. Prøv igen senere.",
         DEFAULT: "Versionen kan ikke publiceres, fordi Docs-serviceprogrammet ikke er tilgængeligt. Prøv igen senere."
       }
     },
     COMMENTS: {
       EMPTY: "Der er ingen kommentarer.",
       MODERATED: "Kommentaren er sendt til gennemgang og vil blive gjort tilgængelig, når den er godkendt.",
       ERROR: {
         SAVE: {
           DEFAULT: "Kommentaren kan ikke gemmes. Prøv igen senere.",
           UNAUTHENTICATED: "Tidsfristen for din session er udløbet. Du skal logge på igen, før du kan gemme kommentaren.",
           NOT_FOUND: "Kommentaren kan ikke gemmes, fordi filen er slettet eller ikke længere deles med dig.",
           ACCESS_DENIED: "Kommentaren kan ikke gemmes, fordi filen er slettet eller ikke længere deles med dig."
         },
         DELETE: {
           DEFAULT: "Kommentaren kan ikke slettes. Prøv igen senere.",
           UNAUTHENTICATED: "Tidsfristen for din session er udløbet. Du skal logge på igen, før du kan slette kommentaren.",
           NOT_FOUND: "Kommentaren kan ikke slettes, fordi filen er slettet eller ikke længere deles med dig.",
           ACCESS_DENIED: "Kommentaren kan ikke slettes, fordi filen er slettet eller ikke længere deles med dig."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Gem",
       EDIT_TAGS: "Redigér emneord",
       ERROR: {
         SAVE: {
           DEFAULT: "Emneordet kan ikke oprettes. Prøv igen senere."
         },
         DELETE: {
           DEFAULT: "Emneordet kan ikke slettes. Prøv igen senere."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Læs mere...",
       READ_LESS: "Læs mindre..."
     },
     SHARE: {
	     EVERYONE: "Alle i min organisation",
	     ADD_TOOLTIP: "Gem",
	     ROLES: {
	       OWNER: "Ejer",
	       EDIT: "Redaktører",
	       VIEW: "Læsere",
	       FOLDER: "Delt med foldere"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Ejer"
	       },
	       EDIT: {
	         ROLE: "Redigér",
           ADD: "Tilføj redaktør"
	       },
	       VIEW: {
	         ROLE: "Læser",
           ADD: "Tilføj læser"
	       },
	       FOLDER: {
           ADD: "Tilføj foldere",
           COMMUNITY_ADD: "Tilføj til folder",
           MOVE: "Flyt til folder"
	       },
	       MULTI: {
	         ADD: "Tilføj personer eller fællesskaber",
	         ADD_PEOPLE: "Tilføj personer"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Alle i min organisation",
	        LONG: {
	           GENERIC: "Alle i din organisation.",
	           ORG: "Alle i ${org}."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Filen er allerede delt med ${user}.",
	       ERROR: "Kan ikke dele med ${user} på nuværende tidspunkt.",
	       SELF: "Du kan ikke dele med dig selv."
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user} er forfremmet til en højere delingsrolle."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Delt med ${user}"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Valgfri besked..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Klargør ekstern bruger",
            ACTION: "Klargør ekstern bruger...",
            TOOLTIP: "Klargør ekstern bruger",
            DIALOG_TITLE: "Indhold er ikke delt",
            PROMPT: {
              NO_ACCOUNT: "Følgende bruger har ikke en konto, og der er ikke delt noget indhold med vedkommende.",
              INVITE: "Invitér brugeren som gæst for at dele indholdet med vedkommende."
            },
            SUBMIT: "Fortsæt med invitation",
            CANCEL: "Annullér",
            ERROR: "Der er opstået en fejl under klargøring af kontoen. Prøv igen senere.",
            SUCCESS: "Brugerkontoen er gjort klar."
	       },
	       PLURAL: {
	         NAME: "Klargør eksterne brugere",
	         ACTION: "Klargør eksterne brugere...",
	         TOOLTIP: "Klargør eksterne brugere",
	         DIALOG_TITLE: "Indhold er ikke delt",
	         PROMPT: {
	           NO_ACCOUNT: "Følgende brugere har ikke en konto, og der er ikke delt noget indhold med dem.",
	           INVITE: "Invitér brugerne som gæster for at dele indholdet med dem."
	         },
	         SUBMIT: "Fortsæt med invitationer",
	         CANCEL: "Annullér",
	         ERROR: "Der er opstået en fejl under klargøring af konti. Prøv igen senere.",
	         SUCCESS: "Brugerkontiene er gjort klar."
	       },
	       ABSTRACT: {
	         NAME: "Klargør eksterne brugere",
            ACTION: "Klargør eksterne brugere...",
            TOOLTIP: "Klargør eksterne brugere",
            DIALOG_TITLE: "Indhold er ikke delt",
            PROMPT: {
              NO_ACCOUNT: "Visse brugere har ikke en konto, og der er ikke delt noget indhold med dem.",
              INVITE: "Invitér brugerne som gæster for at dele indholdet med dem."
            },
            SUBMIT: "Fortsæt med invitationer",
            CANCEL: "Annullér",
            ERROR: "Der er opstået en fejl under klargøring af konti. Prøv igen senere.",
            SUCCESS: "Brugerkontiene er gjort klar."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Indstillinger for deling",
         PROPAGATION: "Tillad andre at dele denne fil",
         EVERYONE: "Alle kan dele denne fil.",
         OWNER_ONLY: "Kun ejeren kan dele denne fil.",
         STOP_SHARE: "Stop deling",
         MAKE_INTERNAL: "Stop ekstern deling",
         MAKE_INTERNAL_SUCCESS: "Denne fil kan ikke længere deles med personer uden for din organisation.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Gør den intern?",
           PROMPT: "Hvis du gør denne fil intern, betyder det, at den ikke længere kan deles med andre uden for din organisation. ${br}${br}" +
             "Delinger med eksterne personer, fællesskaber eller foldere bliver fjernet.${br}${br}Hvis du gør en fil intern, er det permanent, og det kan ikke fortrydes."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Stop deling af fil",
           PROMPT: "Er du sikker på, at du vil stoppe deling af denne fil?",
           QUESTION_PUBLIC: "Denne fil vil ikke længere være synlig for alle i organisationen, eller være delt med personer, foldere eller fællesskaber. Denne funktion kan ikke fortrydes.",
           QUESTION_PUBLIC_E: "Denne fil vil ikke længere være synlig for alle i organisationen, eller være delt med personer eller foldere. Denne funktion kan ikke fortrydes.",
           QUESTION: "Filen deles ikke længere med personer eller fællesskaber, og den bliver fjernet fra alle foldere undtagen dine private foldere. Handlingen kan ikke fortrydes.",
           QUESTION_E: "Filen deles ikke længere med personer, og den bliver fjernet fra alle foldere undtagen dine private foldere. Handlingen kan ikke fortrydes."
         },
         MAKE_PRIVATE_SUCCESS: "Filen er nu privat.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Kan ikke stoppe deling af filen. Prøv igen senere."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Mine delinger"
	   },
	   STREAM: {
	     LOADING: "Indlæser...",
	     LOAD_MORE: "Indlæs mere..."
	   },
	   ENTRY: {
	     REMOVE: "Fjern",
	     RESTORE: "Gendan",
	     EDIT: "Redigér",
	     DELETE: "Slet",
	     OK: "OK",
	     CANCEL: "Annullér",
	     USER_PICTURE: "${0}s billede",
	     FLAG: "Markér som upassende"
	   },
	   PANEL: {
	     LOAD_ERROR: "Der er opstået en fejl under forsøg på at få adgang til metadata til filen.",
	     ABOUT: {
	       TITLE: "Om",
	       EXPAND_BUTTON: "Udvid denne knap for at få vist flere oplysninger",
	       CURRENT_VERSION_HEADER: "Aktuel version ${versionNumber}",
	       FILE_SIZE_HEADER: "Filstørrelse",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - aktuel version",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - alle versioner",
	       DOCS_DRAFT_UPDATED_HEADER: "Kladde redigeret",
	       DOCS_DRAFT_CREATED_HEADER: "Kladde oprettet",
	       DOCS_UPDATED_HEADER: "Publiceret",
	       DOCS_CREATED_HEADER: "Oprettet",
	       UPDATED_HEADER: "Opdateret",
	       CREATED_HEADER: "Oprettet",
	       LIKES_HEADER: "Synes godt om-tilkendegivelser",
	       LIKES_EXPAND_ICON: "Udvid ikonen for at se, hvem der synes godt om filen.",
	       DOWNLOADS_HEADER: "Downloadninger",
	       DOWNLOADS_HEADER_MORE: "Downloadninger (${0})",
	       DOWNLOADS_EXPAND_ICON: "Udvid ikonen for at se, hvem der har downloadet filen.",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonymt",
	       DOWNLOADS_LATEST_VERSION: "Du har den seneste version af filen",
	       DOWNLOADS_LAST_VERSION: "Du downloadede sidst version ${0} af filen",
	       TAGS_HEADER: "Emneord",
	       DESCRIPTION_HEADER: "Beskrivelse",
	       DESCRIPTION_READ_MORE: "Læs mere...",
	       LINKS_HEADER: "Link",
	       SECURITY: "Sikkerhed",
	       FILE_ENCRYPTED: "Filindholdet er krypteret. Der kan ikke søges i krypteret filindhold. Filindhold kan ikke vises og kan ikke redigeres med HCL Docs.",
	       GET_LINKS: "Hent link...",
	       ADD_DESCRIPTION: "Tilføj en beskrivelse",
	       NO_DESCRIPTION: "Ingen beskrivelse",
	       ADD_TAGS: "Tilføj emneord",
	       NO_TAGS: "Ingen emneord"
	     },
	     COMMENTS: {
	       TITLE: "Kommentarer",
	       TITLE_WITH_COUNT: "Kommentarer (${0})",
	       VERSION: "Version ${0}",
	       FEED_LINK: "Feed for disse kommentarer",
	       FEED_TITLE: "Du kan følge ændringerne af disse kommentarer i din feedlæser"
	     },
	     SHARING: {
	       TITLE: "Deling",
	       TITLE_WITH_COUNT: "Delt (${0})",
	       SHARED_WITH_FOLDERS: "Delt med foldere - ${count}",
	       SEE_WHO_HAS_SHARED: "Se, hvem der har delt",
           COMMUNITY_FILE: "Filer, der ejes af et fællesskab, kan ikke deles med personer eller andre fællesskaber.",
           SHARED_WITH_COMMUNITY: "Delt med medlemmer af fællesskabet '${0}'",
           LOGIN: "Log på",
           NO_SHARE: "Filen er endnu ikke blevet tilføjet til nogen foldere.",
           ONE_SHARE: "Denne fil findes i en folder eller et fællesskab, som du ikke har adgang til.",
           MULTIPLE_SHARE: "Denne fil findes i ${fileNumber} foldere eller fællesskaber, som du ikke har adgang til."
	     },
	     VERSIONS: {
	       TITLE: "Versioner",
	       TITLE_WITH_COUNT: "Versioner (${0})",
	       FEED_LINK: "Feed for disse versioner",
	       FEED_TITLE: "Du kan følge ændringerne af denne fil i din feedlæser"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Bekræftelse på handling",
       DIALOG_TITLE: "Bekræft",
       PROMPT: "Er du sikker på, at du vil udføre denne handling?",
       ERROR: "Der er opstået en fejl under udførelse af handlingen. Prøv igen senere.",
       TOOLTIP: "Udfør handling",
       OK: "OK",
       CANCEL: "Annullér",
       A11Y: "Brug denne knap til at udføre den aktuelle handling."
     },
     THUMBNAIL: {
       TITLE: "Miniature",
       CHANGE_LINK: "Skift miniature...",
       ERROR: "Miniaturen kunne ikke gemmes. Prøv igen senere.",
       EXT_ERROR: "Vælg en fil med en af følgende understøttede filtyper: ${0}",
       SUCCESS: "Miniaturen er ændret",
       UPLOAD: "Gem",
       CANCEL: "Annullér"
     },
     UPLOAD_VERSION: {
       LINK: "Upload ny version...",
       CHANGE_SUMMARY: "Valgfrit ændringsresumé...",
       ERROR: "Den nye version kunne ikke gemmes. Prøv igen senere.",
       SUCCESS: "Den nye version er gemt",
       UPLOAD: "Upload",
       UPLOAD_AND_CHANGE_EXTENSION: "Upload og revidér filtype",
       CANCEL: "Annullér"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Der er opstået en fejl under forsøg på at få adgang til filen. Prøv igen senere.",
       UNAUTHENTICATED: "Tidsfristen for din session er udløbet. Du skal logge på igen, før du kan få filen vist.",
       NOT_FOUND: "Den fil, du har anmodet om, er slettet eller flyttet. Hvis en person har sendt dig dette link, kan du undersøge, om det er korrekt.",
       ACCESS_DENIED: "Du har ikke tilladelse til at se denne fil. Filen deles ikke med dig.",
       ACCESS_DENIED_ANON: "Du har ikke tilladelse til at se denne fil. Hvis det er din fil, eller hvis den deles med dig, skal du logge på først."
     },
     LOAD_ERROR: {
       DEFAULT: "Der er opstået en fejl under adgang til linket.",
       ACCESS_DENIED: "Kontakt filejeren for at anmode om tilladelse til at se denne fil."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - Fil",
       LOAD_ERROR: "Fejl ved adgang til fil"
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
