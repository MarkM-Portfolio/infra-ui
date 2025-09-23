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
     FILE_VIEWER_TITLE: "Förhandsgranskning av fil",
     FILENAME_TOOLTIP: "Ändra filnamn",
     ICON_TOOLTIP: "Hämta fil",
     ERROR: "Det uppstod ett fel.",
     SHARED_EXTERNALLY: "Delad externt",
     FILE_SYNCED: "Lades till för synkronisering",
     MORE_ACTIONS: {
       TITLE: "Fler åtgärder",
       A11Y: "Öppnar en listmeny med fler filåtgärder."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Fler alternativ",
         A11Y: "Den här knappen öppnar en meny för fler alternativ."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Redigera"
         },
         UPLOAD: {
           TITLE: "Överför"
         }
       }
     },
     WELCOME: {
       TITLE: "Vi har kombinerat filvyn och detaljerna",
       SUBTITLE: "Nu kan du se en fil och kommentarerna sida vid sida.",
       LINES: {
          LINE_1: "All information och alla åtgärder finns här.",
          LINE_2: "Kommentarer, delning, versioner och basinformation finns bredvid filen."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Går till nästa fil.",
      PREVIOUS_A11Y: "Går till föregående fil."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Stäng",
         A11Y: "Stänger filvisningen."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Nytt från fil",
         ACTION_NAME:"Skapa fil",
         A11Y: {
           TEXT: "Skapa ett dokument (DOC, DOCX eller ODT) från en mallfil. Du kan redigera dokumenten online i Docs.",
           PRES: "Skapa en presentation (PPT-, PPTX- eller ODP-fil) från en mallfil. Du kan redigera presentationerna online i Docs.",
           SHEET: "Skapa ett kalkylark (XLS-, XLSX- eller ODS-fil) från en mallfil. Du kan redigera kalkylarken online i Docs."
         },
         PROMPT: {
           TEXT: "Skapa ett dokument (DOC, DOCX eller ODT) från en mallfil. Du kan redigera dokumenten online i Docs.",
           PRES: "Skapa en presentation (PPT-, PPTX- eller ODP-fil) från en mallfil. Du kan redigera presentationerna online i Docs.",
           SHEET: "Skapa ett kalkylark (XLS-, XLSX- eller ODS-fil) från en mallfil. Du kan redigera kalkylarken online i Docs."
         },
         NAME_FIELD: "Namn:",
         EXTERNAL_FIELD: "Filer får delas med personer utanför företaget",
         EXTERNAL_DESC: "Med extern åtkomst går det att dela filer med externa användare (personer utanför företaget), dela mappar med externa användare och skapa gemenskaper med externa användare som medlemmar. Du måste ange extern åtkomst när du överför en fil, det går inte att ange det senare.",
         CREATE_BUTTON: "Skapa",
         CANCEL: "Avbryt",
         PRE_FILL_NAMES: {
           OTT: "Namnlöst dokument",
           OTS: "Namnlöst kalkylark",
           OTP: "Namnlös presentation",
           DOT: "Namnlöst dokument",
           XLT: "Namnlöst kalkylark",
           POT: "Namnlös presentation",
           DOTX: "Namnlöst dokument",
           XLTX: "Namnlöst kalkylark",
           POTX: "Namnlös presentation"
         },
         ERRORS: {
           NAME_REQUIRED: "Du måste fylla i ett dokumentnamn.",
           ILLEGAL_NAME:"Dokumentnamnet är ogiltigt. Ange ett annat namn.",
           WARN_LONG_NAME: "Dokumentets namn innehåller för många tecken.",
           TRIM_NAME: "Vill du ge dokumentet ett kortare namn?",
           SESSION_TIMEOUT: "Sessionen har upphört att gälla, logga in och försök igen.",
           DUPLICATE_NAME: "En dubblettfil hittades. Ange ett nytt namn.",
           SERVER_ERROR: "Connections-servern är inte tillgänglig. Kontakta serveradministratören och försök igen senare."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Hämta fil",
         A11Y: "Hämtar filen."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Hämta som PDF",
         TOOLTIP: "Hämta filen som en PDF-fil",
         A11Y: "Den här knappen hämtar filen som en PDF.",
         SUCCESS: "Du har hämtat filen som en PDF.",
         ERROR: {
           DEFAULT: "Det gick inte att hämta filen som en PDF.  Försök igen senare.",
           UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen för att kunna hämta filen som en PDF.",
           NOT_FOUND: "Det gick inte att hämta filen som en PDF eftersom den har tagits bort eller inte längre delas med dig.",
           ACCESS_DENIED: "Det gick inte att hämta filen som en PDF eftersom den har tagits bort eller inte längre delas med dig."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Det finns ingen publicerad version av den här filen att hämta.  Versioner kan publiceras från Docs-redigeraren."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Det går inte att hämta filen",
           CANCEL: "Stäng",
           PROMPT: "Det finns ingen publicerad version av den här filen att hämta.",
           PROMPT2: "Versioner kan publiceras från Docs-redigeraren."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Det går inte att hämta filen",
           CANCEL: "Stäng",
           PROMPT: "Det finns ingen publicerad version av den här filen att hämta.",
           PROMPT2: "Be filägaren publicera en version av filen."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Hämta en version",
           OK: "Hämta version",
           PROMPT: {
             TODAY: "Det finns ett nyare utkast som redigerades i dag ${time}.",
             YESTERDAY: "Det finns ett nyare utkast som redigerades i går ${time}.",
             DAY: "Det finns ett nyare utkast som redigerades ${date}.",
             MONTH: "Det finns ett nyare utkast som redigerades ${date}.",
             YEAR: "Det finns ett nyare utkast som redigerades ${date_long}."
           },
           PROMPT2: {
             TODAY: "Vill du fortsätta att hämta den version som publicerades i dag ${time}?",
             YESTERDAY: "Vill du fortsätta att hämta den version som publicerades i går ${time}?",
             DAY: "Vill du fortsätta att hämta den version som publicerades ${date}?",
             MONTH: "Vill du fortsätta att hämta den version som publicerades ${date}?",
             YEAR: "Vill du fortsätta att hämta den version som publicerades ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Visa detaljer",
         HIDE: "Göm detaljer",
         SHOW_A11Y: "Öppnar och stänger sidorutan. Sidorutan är stängd.",
         HIDE_A11Y: "Öppnar och stänger sidorutan. Sidorutan är öppen."
       },
       VIEW_DOC: {
         NAME: "Öppna i Docs Viewer",
         TOOLTIP: "Öppna i Docs Viewer",
         A11Y: "Öppnar filen i ett nytt webbläsarfönster."
       },
       EDIT_DOC: {
         NAME: "Redigera i Docs",
         TOOLTIP: "Redigera filen i Docs",
         A11Y: "Öppnar filen för redigering i Docs i ett nytt fönster."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Redigera på skrivbord",
         DIALOG_TITLE: "Redigera på skrivbord",
         TOOLTIP: "Redigera dokumentet",
         A11Y: "Den här knappen öppnar filen för redigering lokalt.",
         PROMPT: "Med den här funktionen kan du redigera filen lokalt.",
         IMPORTANT: "Viktigt:",
         REMINDER: ": När du är klar med redigeringen måste du publicera ett utkast med hjälp av skrivbordsfilsfunktionerna. Om det inte går att öppna filen kan du behöva installera skrivbordsinsticksprogrammen.",
         SKIP_DIALOG: "Visa inte det här meddelandet igen.",
         OK: "OK",
         CANCEL: "Avbryt"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Bekräfta",
         DELETE_VERSION: "Ta bort version ${version}",
         DELETE_VERSION_AND_PRIOR: "Ta bort version ${version} och alla tidigare versioner",
         PROMPT: "Version ${version} kommer att tas bort. Vill du fortsätta?",
         DELETE_PRIOR: "Ta även bort alla tidigare versioner",
         ERROR: "Fel vid borttagning av versionen. Försök igen senare.",
         TOOLTIP: "Ta bort den här versionen",
         OK: "OK",
         CANCEL: "Avbryt"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Hämta länkar",
         LINK_FILE: "Länk till fil:",
         LINK_PREVIEW: "Länk till förhandsgranskningsfil:",
         LINK_DOWNLOAD: "Länk till hämtningsfil:",
         TOOLTIP: "Länk till fil",
         OK: "Stäng"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Hämta den här versionen"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Bekräfta",
         PROMPT: "Den aktuella versionen av den här filen ersätts med version ${version}. Vill du fortsätta?",
         ERROR: "Fel vid återställning av versionen. Försök igen senare.",
         TOOLTIP: "Återställ den här versionen",
         CHANGE_SUMMARY: "Återställd från version ${version}",
         OK: "OK",
         CANCEL: "Avbryt"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Bekräfta",
         REMOVE_EVERYONE: "Vill du ta bort företagets åtkomst till den här filen? Om du tar bort åtkomsten tas filen bort från mappar och gemenskaper som tillåter åtkomst på organisationsnivå och endast ägaren och de personer filen har delats med kan se och arbeta med den.",
         REMOVE_USER: "Vill du sluta dela med ${user}? Om du slutar dela kommer ${user} bara att kunna komma åt den här filen via mappar eller om den delas med alla i företaget.",
         REMOVE_COMMUNITY: "Vill du ta bort filen från gemenskapen ${communityName}?",
         REMOVE_FOLDER: "Vill du ta bort filen från mappen ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Ta bort åtkomst för företaget",
         REMOVE_USER_TOOLTIP: "Ta bort alla delningar med ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Ta bort från gemenskapen ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Ta bort från mappen ${folderName}",
         OK: "OK",
         CANCEL: "Avbryt"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Redigera den här kommentaren"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Bekräfta",
         PROMPT: "Vill du ta bort den här kommentaren?",
         ERROR: "Fel vid borttagning av kommentaren. Försök igen senare.",
         TOOLTIP: "Ta bort den här kommentaren",
         OK: "OK",
         CANCEL: "Avbryt"
       },
       LIKE: {
         LIKE: "Gilla den här filen",
         UNLIKE: "Ogilla den här filen",
         LIKE_A11Y: "Välj den här knappen om du gillar filen.",
         UNLIKE_A11Y: "Välj den här knappen om du inte gillar filen.",
         LIKED_SUCCESS: "Du gillade den här filen",
         UNLIKE_SUCCESS: "Du gillade inte den här filen"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Redigera beskrivning",
         ERROR: {
           DEFAULT: "Det gick inte att spara beskrivningen. Försök igen senare.",
           UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan uppdatera beskrivningen.",
           NOT_FOUND: "Det gick inte att spara beskrivningen eftersom filen har tagits bort eller inte längre delas med dig.",
           ACCESS_DENIED: "Det gick inte att spara beskrivningen eftersom filen har tagits bort eller inte längre delas med dig."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Fel när filnamn sparades",
           CONFLICT: "Filnamnet finns redan"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Fel när filen bevakades. Försök igen senare.",
             UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan bevaka filen.",
             NOT_FOUND: "Du kan inte bevaka filen eftersom den har tagits bort eller inte längre delas med dig.",
             ACCESS_DENIED: "Du kan inte bevaka filen eftersom den har tagits bort eller inte längre delas med dig."
           },
           UNFOLLOW: {
             DEFAULT: "Fel när bevakningen av filen skulle avslutas. Försök igen senare.",
             UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan sluta bevaka filen.",
             NOT_FOUND: "Du kan inte sluta bevaka filen eftersom den har tagits bort eller inte längre delas med dig.",
             ACCESS_DENIED: "Du kan inte sluta bevaka filen eftersom den har tagits bort eller inte längre delas med dig."
           }
         },
         FOLLOW_NAME: "Bevaka",
         FOLLOW_TOOLTIP: "Bevaka den här filen",
         FOLLOW_A11Y: "Bevakar filen.",
         FOLLOW_SUCCESS: "Du bevakar nu den här filen.",
         STOP_FOLLOWING_NAME: "Sluta bevaka",
         STOP_FOLLOWING_TOOLTIP: "Sluta bevaka den här filen",
         STOP_FOLLOWING_A11Y: "Slutar bevaka filen.",
         STOP_FOLLOWING_SUCCESS: "Du har slutat bevaka den här filen."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Lägg till i Synkronisering",
           TOOLTIP: "Lägg till filen för synkronisering",
           A11Y: "Lägger till filen för synkronisering.",
           SUCCESS: "Du har lagt till filen för synkronisering.",
           ERROR: {
             DEFAULT: "Ett fel uppstod när filen skulle läggas till för synkronisering. Försök igen senare.",
             UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan lägga till filen för synkronisering.",
             NOT_FOUND: "Du kan inte lägga till filen för synkronisering eftersom den har tagits bort eller inte längre delas med dig.",
             ACCESS_DENIED: "Du kan inte lägga till filen för synkronisering eftersom den har tagits bort eller inte längre delas med dig."
           }
         },
         STOP_SYNC: {
           NAME: "Ta bort från Synkronisering",
           TOOLTIP: "Ta bort filen från synkronisering",
           A11Y: "Tar bort filen från synkronisering.",
           SUCCESS: "Du har tagit bort filen från synkronisering.",
           ERROR: {
             DEFAULT: "Ett fel uppstod när filen skulle tas bort från synkronisering. Försök igen senare.",
             UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan ta bort filen från synkronisering.",
             NOT_FOUND: "Du kan inte ta bort filen från synkronisering eftersom den har tagits bort eller inte längre delas med dig.",
             ACCESS_DENIED: "Du kan inte ta bort filen från synkronisering eftersom den har tagits bort eller inte längre delas med dig."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Ange som favorit",
          FAVORITE_TOOLTIP: "Ange den här filen som favoritfil",
          FAVORITE_A11Y: "Anger filen som favoritfil.",
          FAVORITE_SUCCESS: "Du har angett filen som favoritfil.",
          STOP_FAVORITEING_NAME: "Sluta ange som favorit",
          STOP_FAVORITEING_TOOLTIP: "Sluta ange filen som favorit",
          STOP_FAVORITEING_A11Y: "Tar bort filen från Favoriter.",
          STOP_FAVORITEING_SUCCESS: "Du har tagit bort filen från Favoriter."
       },
       TRASH: {
         NAME: "Flytta till papperskorgen",
         DIALOG_TITLE: "Bekräfta",
         PROMPT: "Vill du flytta den här filen till papperskorgen? Om du flyttar filen till papperskorgen kommer den inte längre att vara tillgänglig för de personer du delar den med.",
         ERROR: "Fel när filen skulle tas bort. Försök igen senare.",
         TOOLTIP: "Ta bort den här filen",
         OK: "OK",
         CANCEL: "Avbryt",
         A11Y: "Flyttar filen till papperskorgen.",
         SUCCESS_MSG: "${file} har flyttats till papperskorgen."
       },
       REFRESH: {
         NAME: "Uppdatera",
         ERROR: "Fel vid uppdatering av filvisningen. Försök igen senare.",
         TOOLTIP: "Uppdatera filvisning",
         INFO_MSG: "Uppdatera så att det senaste innehållet hämtas. ${link}",
         A11Y: "Flyttar filen till papperskorgen.",
         SUCCESS_MSG: "Innehållet uppdaterades."
       },
       COPY_FILE: {
         NAME: "Lämna in en kopia till en gemenskap",
         DIALOG_TITLE: "Bekräfta",
         ERROR: "Fel när filen skulle kopieras. Försök igen senare.",
         TOOLTIP: "Lämna in en kopia av den här filen till en gemenskap",
         OK: "OK",
         CANCEL: "Avbryt",
         A11Y: "Öppnar en dialogruta där du kan kopiera filen till en gemenskap.",
         SUCCESS_MSG: "${file} har kopierats till ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Överför en ny version",
         NAME_SHORT: "Överför",
         CHANGE_SUMMARY: "Valfri ändringssammanfattning...",
         TOOLTIP: "Överför en ny version av den här filen",
         A11Y: "Den här knappen öppnar en dialogruta där du kan överföra en ny version av den här filen."
       },
       LOG_IN: {
    	   NAME: "Logga in",
    	   TOOLTIP: "Logga in om du vill överföra och dela filer, kommentera och skapa mappar. "
       },
       LOCK: {
          NAME: "Lås fil",
          TITLE: "Lås filen",
          A11Y: "Lås filen",
          SUCCESS: "Filen är låst."
       },
       UNLOCK: {
          NAME: "Lås upp fil",
          TITLE: "Lås upp filen",
          A11Y: "Lås upp filen",
          SUCCESS: "Filen är inte låst."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Redigera på skrivbord",
          TITLE: "Redigera på skrivbord",
          A11Y: "Redigera på skrivbord"
       },
       FLAG: {
         FILE: {
           NAME: "Flagga som olämpligt",
           TITLE: "Flagga fil",
           A11Y: "Flagga den här filen som olämplig",
           PROMPT: "Ange en orsak till att du har flaggat den här filen (valfritt):",
           OK: "Flagga",
           CANCEL: "Avbryt",
           SUCCESS: "Filen har flaggats och lämnats in för granskning.",
           ERROR: "Ett fel uppstod vid flaggning av den här filen. Försök igen senare."
         },
         COMMENT: {
           NAME: "Flagga som olämpligt",
           TITLE: "Flagga kommentar",
           A11Y: "Flagga den här kommentaren som olämplig",
           PROMPT: "Ange en orsak till att du har flaggat den här kommentaren (valfritt):",
           OK: "Flagga",
           CANCEL: "Avbryt",
           SUCCESS: "Kommentaren har flaggats och lämnats in för granskning.",
           ERROR: "Ett fel uppstod vid flaggning av den här kommentaren. Försök igen senare."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Om den här filen",
       VIEW_FILE_DETAILS: "Visa fildetaljer",
       A11Y: "Om du klickar på länken stängs filvisningen och du kommer till fildetaljerna."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Det finns ingen tillgänglig förhandsgranskning för den här filen."
      },
      IMAGE: {
       ZOOM_IN: "Zooma in",
       ZOOM_OUT: "Zooma ut",
       RESET: "Återställ",
       ZOOM_IN_A11Y: "Zoomar in bilden.",
       ZOOM_OUT_A11Y: "Zoomar ut bilden.",
       RESET_ZOOM_A11Y: "Återställer zoomnivån."
      },
      VIEWER: {
       LOADING: "Läser in...",
       NO_PUBLISHED_VERSION: "Det finns ingen publicerad version av filen som är tillgänglig för visning.",
       IFRAME_TITLE: "Förhandsgranskning av den här filen"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Uppdaterades senast av ${user} idag ${time}",
       YESTERDAY: "Uppdaterades senast av ${user} igår ${time}",
       DAY: "Uppdaterades senast av ${user} ${EEee} ${time}",
       MONTH: "Uppdaterades senast av ${user} ${date_long}",
       YEAR: "Uppdaterades senast av ${user} ${date_long}"
      },
      CREATED: {
       TODAY: "Skapades av ${user} idag ${time}",
       YESTERDAY: "Skapades av ${user} igår ${time}",
       DAY: "Skapades av ${user} ${EEee} ${time}",
       MONTH: "Skapades av ${user} ${date_long}",
       YEAR: "Skapades av ${user} ${date_long}"
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
       TITLE: "Textområde för kommentar",
       SHADOW_TEXT: "Lägg till en kommentar...",
       CANNOT_ACCESS_CONTENT: "Följande personer som du har nämnt kommer inte att kunna se kommentaren eftersom de inte har åtkomst till innehållet:",
       ERROR: "Ett fel inträffade under validering av den användare du försöker nämna.",
       POST: "Lämna in",
       SAVE: "Spara",
       CANCEL: "Avbryt",
       EXTERNAL_WARNING: "Personer utanför företaget får visa kommentarer."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Avbryt",
         A11Y: "Den här knappen avbryter redigeringen av filnamnet."
       },
       INVALID_CHARACTERS: "Ogiltigt tecken",
       INVALID_CHARACTERS_REMOVED: "Ogiltiga tecken togs bort"
     },
     COMMENT_WIDGET: {
       EDITED: "(redigerades)",
       EDITED_DATE: {
         TODAY: "Redigerades i dag ${time}",
         YESTERDAY: "Redigerades i går ${time}",
         DAY: "Redigerades ${EEee} ${time}",
         MONTH: "Redigerades ${date_long}",
         YEAR: "Redigerades ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Spara",
       CANCEL: "Avbryt",
       USER: "Användare",
       COMMUNITY: "Gemenskap",
       SHARE: "Dela",
       SHARE_ALT: "Dela med den här användaren",
       MEMBER_TYPE: "Medlemstyp",
       PERSON_SHADOW: "Ange en person att söka efter",
       COMMUNITY_SHADOW: "Ange en gemenskap att söka efter",
       PERSON_FULL_SEARCH: "Visas inte personen? Använd de fullständiga sökfunktionerna...",
       COMMUNITY_FULL_SEARCH: "Visas inte gemenskapen? Använd de fullständiga sökfunktionerna...",
       ADD_OPTIONAL_MESSAGE: "Lägg till ett ytterligare meddelande",
       ROLE_LABEL: "Roll",
       ROLE_EDIT: "Redigerare",
       ROLE_VIEW: "Läsare"
     },
     FILE_STATE: {
       DOCS_FILE: "Det här är en Docs-fil. Alla ändringar måste göras online.",
       LOCKED_BY_YOU: {
         TODAY: "Låstes av dig ${time}.",
         YESTERDAY: "Låstes av dig i går ${time}.",
         DAY: "Låstes av dig ${date}.",
         MONTH: "Låstes av dig ${date}.",
         YEAR: "Låstes av dig ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Låstes ${time} av ${user}.",
         YESTERDAY: "Låstes i går ${time} av ${user}.",
         DAY: "Låstes ${date} av ${user}.",
         MONTH: "Låstes ${date} av ${user}.",
         YEAR: "Låstes ${date_long} av ${user}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Kommentaren är för lång.",
         TRIM: "Vill du ange en kortare kommentar?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Beskrivningen är för lång.",
         TRIM: "Vill du ange en kortare beskrivning?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Meddelandet är för långt.",
         TRIM: "Vill du ange ett kortare meddelande?"
       },
       TAG: {
         WARN_TOO_LONG: "Etiketten är för lång.",
         TRIM: "Vill du ange en kortare etikett?"
       },
       TAGS: {
         WARN_TOO_LONG: "En eller flera etiketter är för lång.",
         TRIM: "Vill du ange kortare etiketter?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Filnamnet är för långt"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Filen är tillgänglig för onlineredigering endast om du har en Docs-licens.",
       CURRENT_EDITORS: "Filen redigeras för närvarande på webben av ${users}.",
       UNPUBLISHED_CHANGES: "Det finns ändringar av utkastet som inte har publicerats.",
       PUBLISH_A_VERSION: "Publicera en version",
       PUBLISH_SUCCESS: "Du har publicerat en version av filen",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Det gick inte att publicera versionen eftersom åtkomst nekades.",
         NOT_FOUND: "Det gick inte att publicera versionen eftersom dokumentet inte hittades.",
         CANNOT_REACH_REPOSITORY: "Det gick inte att publicera versionen eftersom Docs-servern inte kan ansluta till filbehållaren.",
         QUOTA_VIOLATION: "Det gick inte att publicera versionen på grund av utrymmesbegränsningar. Frigör utrymme genom att ta bort andra filer och publicera sedan versionen.",
         CONVERSION_UNAVAILABLE: "Det gick inte att publicera versionen eftersom Docs-konverteringstjänsten inte är tillgänglig. Försök igen senare.",
         TOO_LARGE: "Det gick inte att publicera versionen eftersom dokumentet är för stort.",
         CONVERSION_TIMEOUT: "Det gick inte att publicera versionen eftersom Docs-konverteringstjänsten tog för lång tid. Försök igen senare.",
         SERVER_BUSY: "Det gick inte att publicera versionen eftersom servern är upptagen. Försök igen senare.",
         DEFAULT: "Det gick inte att publicera versionen eftersom Docs-tjänsten inte är tillgänglig. Försök igen senare."
       }
     },
     COMMENTS: {
       EMPTY: "Det finns inga kommentarer.",
       MODERATED: "Kommentaren har lämnats in för granskning och kommer att vara tillgänglig när den har godkänts.",
       ERROR: {
         SAVE: {
           DEFAULT: "Det gick inte att spara kommentaren. Försök igen senare.",
           UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan spara kommentaren.",
           NOT_FOUND: "Filen har tagits bort eller delas inte längre med dig. Det gick inte att spara din kommentar.",
           ACCESS_DENIED: "Filen har tagits bort eller delas inte längre med dig. Det gick inte att spara din kommentar."
         },
         DELETE: {
           DEFAULT: "Det gick inte att ta bort din kommentar. Försök igen senare.",
           UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan ta bort kommentaren.",
           NOT_FOUND: "Filen har tagits bort eller delas inte längre med dig. Det gick inte att ta bort din kommentar.",
           ACCESS_DENIED: "Filen har tagits bort eller delas inte längre med dig. Det gick inte att ta bort din kommentar."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Spara",
       EDIT_TAGS: "Redigera etiketter",
       ERROR: {
         SAVE: {
           DEFAULT: "Det gick inte att skapa etiketten. Försök igen senare."
         },
         DELETE: {
           DEFAULT: "Det gick inte att ta bort etiketten. Försök igen senare."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Läs mer...",
       READ_LESS: "Läs mindre..."
     },
     SHARE: {
	     EVERYONE: "Alla i företaget",
	     ADD_TOOLTIP: "Spara",
	     ROLES: {
	       OWNER: "Ägare",
	       EDIT: "Redigerare",
	       VIEW: "Läsare",
	       FOLDER: "Delas med mappar"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Ägare"
	       },
	       EDIT: {
	         ROLE: "Redigera",
           ADD: "Lägg till redigerare"
	       },
	       VIEW: {
	         ROLE: "Läsare",
           ADD: "Lägg till läsare"
	       },
	       FOLDER: {
           ADD: "Lägg till mappar",
           COMMUNITY_ADD: "Lägg till i mapp",
           MOVE: "Flytta till mapp"
	       },
	       MULTI: {
	         ADD: "Lägg till personer eller gemenskaper",
	         ADD_PEOPLE: "Lägg till personer"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Alla i företaget",
	        LONG: {
	           GENERIC: "Alla i företaget",
	           ORG: "Alla i ${org}."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Filen delas redan med ${user}.",
	       ERROR: "Det går inte att dela med ${user}.",
	       SELF: "Du kan inte dela med dig själv."
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user} har fått en utökad delningsroll."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Delas med ${user}"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Valfritt meddelande..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Etablera extern användare",
            ACTION: "Etablera extern användare...",
            TOOLTIP: "Etablera extern användare",
            DIALOG_TITLE: "Innehållet delades inte",
            PROMPT: {
              NO_ACCOUNT: "Följande användare har inte något konto. Det gick inte att dela något innehåll.",
              INVITE: "Bjud in användaren som gäst om du vill dela innehållet."
            },
            SUBMIT: "Fortsätt med inbjudan",
            CANCEL: "Avbryt",
            ERROR: "Ett fel uppstod när kontot skulle etableras. Försök igen senare.",
            SUCCESS: "Användarkontot har etablerats."
	       },
	       PLURAL: {
	         NAME: "Etablera externa användare",
	         ACTION: "Etablera externa användare...",
	         TOOLTIP: "Etablera externa användare",
	         DIALOG_TITLE: "Innehållet delades inte",
	         PROMPT: {
	           NO_ACCOUNT: "Följande användare har inte något konto. Det gick inte att dela något innehåll.",
	           INVITE: "Bjud in användarna som gäster om du vill dela innehållet med dem."
	         },
	         SUBMIT: "Fortsätt med inbjudningar",
	         CANCEL: "Avbryt",
	         ERROR: "Ett fel uppstod när konton skulle etableras. Försök igen senare.",
	         SUCCESS: "Användarkonton har etablerats."
	       },
	       ABSTRACT: {
	         NAME: "Etablera externa användare",
            ACTION: "Etablera externa användare...",
            TOOLTIP: "Etablera externa användare",
            DIALOG_TITLE: "Innehållet delades inte",
            PROMPT: {
              NO_ACCOUNT: "Vissa användare har inte något konto. Det gick inte att dela något innehåll med dem.",
              INVITE: "Bjud in användarna som gäster om du vill dela innehållet med dem."
            },
            SUBMIT: "Fortsätt med inbjudningar",
            CANCEL: "Avbryt",
            ERROR: "Ett fel uppstod när konton skulle etableras. Försök igen senare.",
            SUCCESS: "Användarkonton har etablerats."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Delningsalternativ",
         PROPAGATION: "Tillåt andra att dela den här filen",
         EVERYONE: "Alla får dela den här filen.",
         OWNER_ONLY: "Endast ägaren får dela den här filen.",
         STOP_SHARE: "Sluta dela",
         MAKE_INTERNAL: "Sluta dela externt",
         MAKE_INTERNAL_SUCCESS: "Det går inte att dela den här filen med personer utanför företaget.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Gör intern",
           PROMPT: "Om du gör filen intern kan den inte längre delas med personer utanför företaget. ${br}${br}" +
             "Alla delningar med externa personer, gemenskaper eller mappar tas bort.${br}${br}Om du gör filen intern går det inte att ångra."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Sluta dela filen",
           PROMPT: "Är du säker på att du vill sluta dela ut den här filen?",
           QUESTION_PUBLIC: "Filen kommer inte längre att visas för alla i företaget eller delas med personer, mappar eller gemenskaper. Det går inte att ångra den här åtgärden.",
           QUESTION_PUBLIC_E: "Filen kommer inte längre att visas för alla i företaget eller delas med personer eller mappar. Det går inte att ångra den här åtgärden.",
           QUESTION: "Filen kommer inte längre att delas med personer eller gemenskaper och kommer att tas bort från alla mappar utom dina privata mappar. Det går inte att ångra den här åtgärden.",
           QUESTION_E: "Filen kommer inte längre att delas med personer och kommer att tas bort från alla mappar utom dina privata mappar. Det går inte att ångra den här åtgärden."
         },
         MAKE_PRIVATE_SUCCESS: "Filen är privat.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Det går inte att sluta dela filen. Försök igen senare."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Mina delningar"
	   },
	   STREAM: {
	     LOADING: "Läser in...",
	     LOAD_MORE: "Läs in fler..."
	   },
	   ENTRY: {
	     REMOVE: "Ta bort",
	     RESTORE: "Återställ",
	     EDIT: "Redigera",
	     DELETE: "Ta bort",
	     OK: "OK",
	     CANCEL: "Avbryt",
	     USER_PICTURE: "Bild av ${0}",
	     FLAG: "Flagga som olämpligt"
	   },
	   PANEL: {
	     LOAD_ERROR: "Ett fel uppstod vid åtkomst av metadata för den här filen.",
	     ABOUT: {
	       TITLE: "Om",
	       EXPAND_BUTTON: "Expandera knappen för att se mer information",
	       CURRENT_VERSION_HEADER: "Aktuell version ${versionNumber}",
	       FILE_SIZE_HEADER: "Filstorlek",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - aktuell version",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - alla versioner",
	       DOCS_DRAFT_UPDATED_HEADER: "Redigerat utkast",
	       DOCS_DRAFT_CREATED_HEADER: "Skapat utkast",
	       DOCS_UPDATED_HEADER: "Publicerat",
	       DOCS_CREATED_HEADER: "Skapades",
	       UPDATED_HEADER: "Uppdaterades",
	       CREATED_HEADER: "Skapades",
	       LIKES_HEADER: "Gillanden",
	       LIKES_EXPAND_ICON: "Expandera ikonen så ser du vilka som gillar filen.",
	       DOWNLOADS_HEADER: "Hämtningar",
	       DOWNLOADS_HEADER_MORE: "Hämtningar (${0})",
	       DOWNLOADS_EXPAND_ICON: "Expandera ikonen så ser du vilka som har hämtat filen.",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonymt",
	       DOWNLOADS_LATEST_VERSION: "Du har den senaste versionen av den här filen",
	       DOWNLOADS_LAST_VERSION: "Du har senast hämtat version ${0} av den här filen",
	       TAGS_HEADER: "Etiketter",
	       DESCRIPTION_HEADER: "Beskrivning",
	       DESCRIPTION_READ_MORE: "Läs mer...",
	       LINKS_HEADER: "Länkar",
	       SECURITY: "Säkerhet",
	       FILE_ENCRYPTED: "Filinnehållet är krypterat. Det går inte att söka i krypterat filinnehåll. Det går inte att visa filinnehållet och det går inte heller att redigera det i HCL Docs.",
	       GET_LINKS: "Hämta länkar...",
	       ADD_DESCRIPTION: "Lägg till en beskrivning",
	       NO_DESCRIPTION: "Ingen beskrivning",
	       ADD_TAGS: "Lägg till etiketter",
	       NO_TAGS: "Inga etiketter"
	     },
	     COMMENTS: {
	       TITLE: "Kommentarer",
	       TITLE_WITH_COUNT: "Kommentarer (${0})",
	       VERSION: "Version ${0}",
	       FEED_LINK: "Flöde för de här kommentarerna",
	       FEED_TITLE: "Bevaka ändringar av de här kommentarerna med hjälp av en flödesläsare"
	     },
	     SHARING: {
	       TITLE: "Delning",
	       TITLE_WITH_COUNT: "Delad (${0})",
	       SHARED_WITH_FOLDERS: "Delas med mappar - ${count}",
	       SEE_WHO_HAS_SHARED: "Se vem som har delat",
           COMMUNITY_FILE: "Filer som ägs av en gemenskap kan inte delas med andra personer eller andra gemenskaper.",
           SHARED_WITH_COMMUNITY: "Delas med medlemmar av gemenskapen ${0}",
           LOGIN: "Logga in",
           NO_SHARE: "Den här filen har ännu inte lagts till i några mappar.",
           ONE_SHARE: "Den här filen ligger i 1 mapp eller gemenskap som du inte har åtkomst till.",
           MULTIPLE_SHARE: "Den här filen finns i ${fileNumber} mappar eller gemenskaper som du inte har åtkomst till."
	     },
	     VERSIONS: {
	       TITLE: "Versioner",
	       TITLE_WITH_COUNT: "Versioner (${0})",
	       FEED_LINK: "Flöde för de här versionerna",
	       FEED_TITLE: "Bevaka ändringar av den här filen med hjälp av en flödesläsare"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Åtgärdsbekräftelse",
       DIALOG_TITLE: "Bekräfta",
       PROMPT: "Vill du utföra den här åtgärden?",
       ERROR: "Fel när åtgärden utfördes. Försök igen senare.",
       TOOLTIP: "Utför åtgärd",
       OK: "OK",
       CANCEL: "Avbryt",
       A11Y: "Utför aktuell åtgärd."
     },
     THUMBNAIL: {
       TITLE: "Miniatyrbild",
       CHANGE_LINK: "Ändra miniatyrbild...",
       ERROR: "Det gick inte att spara miniatyrbilden. Försök igen senare.",
       EXT_ERROR: "Välj en fil med något av följande filtillägg: ${0}",
       SUCCESS: "Miniatyrbilden ändrades",
       UPLOAD: "Spara",
       CANCEL: "Avbryt"
     },
     UPLOAD_VERSION: {
       LINK: "Överför ny version...",
       CHANGE_SUMMARY: "Valfri ändringssammanfattning...",
       ERROR: "Det gick inte att spara den nya versionen. Försök igen senare.",
       SUCCESS: "Den nya versionens sparades.",
       UPLOAD: "Överför",
       UPLOAD_AND_CHANGE_EXTENSION: "Överför och ändra tillägg",
       CANCEL: "Avbryt"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Ett fel uppstod vid åtkomst till filen. Försök igen senare.",
       UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen för att kunna se filen.",
       NOT_FOUND: "Den begärda filen har tagits bort eller flyttats. Om någon sände den här länken till dig kontrollerar du att den fungerar.",
       ACCESS_DENIED: "Du har inte behörighet att visa den här filen. Den delas inte längre med dig.",
       ACCESS_DENIED_ANON: "Du har inte behörighet att visa den här filen. Om det här är din fil eller om någon har delat den med dig måste du logga in först."
     },
     LOAD_ERROR: {
       DEFAULT: "Oops. Ett fel uppstod vid åtkomst till länken.",
       ACCESS_DENIED: "Kontakta filägaren för att be om behörighet att visa den här filen."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - fil",
       LOAD_ERROR: "Fel vid åtkomst av fil"
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
