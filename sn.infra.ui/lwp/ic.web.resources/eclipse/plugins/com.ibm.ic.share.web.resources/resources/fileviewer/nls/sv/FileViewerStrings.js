/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2020                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "Förhandsgranska fil",
      FILENAME_TOOLTIP: "Ändra filnamn",
      ICON_TOOLTIP: "Ladda ned fil",
      ERROR: "Det uppstod ett fel.",
      FILE_MALICIOUS: "Skannar upptäckt skadligt innehåll",
      SHARED_EXTERNALLY: "Delas externt",
      FILE_SYNCED: "Lades till för synkronisering",
      MY_DRIVE: {
         TITLE: "I Min enhet",
         ROOT_FOLDER: "/Min enhet",
         FOLDER: "/Min enhet/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Fler åtgärder",
         A11Y: "Öppnar en listmeny med fler filåtgärder.",
            PANELS: {
               TITLE: "Mer",
               A11Y: "Öppnar en listmeny med dolda paneler."
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
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Fler redigeringsalternativ",
            A11Y: "Med den här knappen öppnar du en meny med fler redigeringsalternativ."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Redigera"
            },
            UPLOAD: {
               TITLE: "Ladda upp"
            },
            CREATE: {
              TITLE: "Skapa"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Ändra storlek på panelen",
           USAGE: "Tryck på vänster eller höger hakparentes för att ändra storleken på panelen."
       },
         CLOSE: {
            TOOLTIP: "Stäng",
            A11Y: "Stänger filvisningen.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Filen laddas fortfarande upp.",
              PROMPT: "Filen laddas fortfarande upp. Uppladdningen avbryts om du stänger innan uppladdningen slutförs.",
              OK: "Stäng ändå",
              CANCEL: "Vänta på uppladdningen"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Lägg till i Filer",
           A11Y: "Lägger till bilagan i Filer.",
           VIEW_NOW: "Visa nu"
         },
         TEAR_OFF: {
           TOOLTIP: "Öppna i nytt fönster",
           A11Y: "Öppna i nytt fönster",
           ERROR_TEARING_OFF: "Fel vid öppning i nytt fönster.",
           DIALOG_TITLE: "Bekräfta",
           UNSAVED_CHANGES_WARNING: "Det finns ändringar som inte har sparats och som tas bort. Vill du ändå öppna i ett nytt fönster?",
           OK: "Ja",
           CANCEL: "Nej",
           OPEN: "Öppna",
           OPEN_ANYWAY: "Öppna ändå",
           CANCEL_ALT: "Avbryt"
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
            EXTERNAL_DESC: "Med extern åtkomst går det att dela filer med externa användare (personer utanför företaget), dela mappar med externa användare och skapa gemenskaper med externa användare som medlemmar. Du måste ange extern åtkomst när du laddar upp en fil, det går inte att ange det senare.",
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
            TOOLTIP: "Ladda ned fil",
            A11Y: "Laddar ned filen."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Ladda ned som PDF",
            TOOLTIP: "Ladda ned filen som en PDF-fil",
            A11Y: "Den här knappen laddar ned filen i PDF-format.",
            SUCCESS: "Du har laddat ned filen i PDF-format.",
            ERROR: {
               DEFAULT: "Det gick inte att ladda ned filen som en PDF.  Försök igen senare.",
               UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen för att kunna ladda ned filen som en PDF.",
               NOT_FOUND: "Det gick inte att ladda ned filen som en PDF eftersom den har tagits bort eller inte längre delas med dig.",
               ACCESS_DENIED: "Det gick inte att ladda ned filen som en PDF eftersom den har tagits bort eller inte längre delas med dig."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Det finns ingen publicerad version av den här filen att ladda ned.  Versioner kan publiceras från Docs-redigeraren."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Det går inte att ladda ned filen",
               CANCEL: "Stäng",
               PROMPT: "Det finns ingen publicerad version av den här filen att ladda ned.",
               PROMPT2: "Versioner kan publiceras från Docs-redigeraren."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Det går inte att ladda ned filen",
               CANCEL: "Stäng",
               PROMPT: "Det finns ingen publicerad version av den här filen att ladda ned.",
               PROMPT2: "Be filägaren publicera en version av filen."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Ladda ned en version",
               OK: "Ladda ned version",
               PROMPT: {
                  TODAY: "Det finns ett nyare utkast som redigerades i dag ${time}.",
                  YESTERDAY: "Det finns ett nyare utkast som redigerades i går ${time}.",
                  DAY: "Det finns ett nyare utkast som redigerades ${date}.",
                  MONTH: "Det finns ett nyare utkast som redigerades ${date}.",
                  YEAR: "Det finns ett nyare utkast som redigerades ${date_long}."
               },
               PROMPT2: {
                  TODAY: "Vill du fortsätta att ladda ned den version som publicerades i dag ${time}?",
                  YESTERDAY: "Vill du fortsätta att ladda ned den version som publicerades i går ${time}?",
                  DAY: "Vill du fortsätta att ladda ned den version som publicerades ${date}?",
                  MONTH: "Vill du fortsätta att ladda ned den version som publicerades ${date}?",
                  YEAR: "Vill du fortsätta att ladda ned den version som publicerades ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Visa detaljer",
            HIDE: "Dölj detaljer",
            RESET: "Återställ panelstorlek",
            SHOW_A11Y: "Öppnar och stänger sidorutan. Sidorutan är stängd.",
            HIDE_A11Y: "Öppnar och stänger sidorutan. Sidorutan är öppen.",
            RESET_A11Y: "Den här knappen återställer sidopanel tillbaka till standardstorleken. Sidopanelen är för tillfället expanderad."
         },
         VIEW_DOC: {
            NAME: "Öppna i Docs Viewer",
            TOOLTIP: "Öppna i Docs Viewer",
            A11Y: "Öppnar filen i ett nytt webbläsarfönster."
         },
         EDIT_DOC: {
            NAME: "Redigera i Docs",
            TOOLTIP: "Använd HCL Docs till att redigera den här filen",
            A11Y: "Öppnar filen för redigering i Docs i ett nytt fönster."
         },
         EDIT_OFFICE: {
            TITLE: "Redigeringsalternativ.",
            NAME: "Redigera i Microsoft Office Online",
            TOOLTIP: "Använd Microsoft Office Online till att redigera den här filen",
            A11Y: "Med den här knappen öppnar du filen för redigering i Microsoft Office Online i ett nytt fönster."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Redigera i Microsoft Word Online",
           TOOLTIP: "Använd Microsoft Word Online till att redigera den här filen",
           A11Y: "Med den här knappen öppnar du filen för redigering i Microsoft Word Online i ett nytt fönster."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Redigera i Microsoft Excel Online",
             TOOLTIP: "Använd Microsoft Excel Online till att redigera den här filen",
             A11Y: "Med den här knappen öppnar du filen för redigering i Microsoft Excel Online i ett nytt fönster."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Redigera i Microsoft PowerPoint Online",
             TOOLTIP: "Använd Microsoft PowerPoint Online till att redigera den här filen",
             A11Y: "Med den här knappen öppnar du filen för redigering i Microsoft PowerPoint Online i ett nytt fönster."
         },
         OFFICE_EDITED: {
             SUCCESS: "Den här filen håller på att sparas."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Redigera på skrivbord",
            DIALOG_TITLE: "Redigera på skrivbord",
            TOOLTIP: "Redigera dokumentet",
            A11Y: "Den här knappen öppnar filen för redigering lokalt.",
            PROMPT: "Med den här funktionen kan du redigera med hjälp av programvara som finns installerad på datorn.",
            INSTALL: "Innan du fortsätter ska du ${startLink}installera skrivbordsfilsfunktionerna${endLink}.", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Viktigt:",
            REMINDER: "När du är färdig med redigeringen kan du publicera ett utkast med hjälp av skrivbordsfilsfunktionerna.",
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
            LINK_DOWNLOAD: "Länk till nedladdningsfil:",
            TOOLTIP: "Länk till fil",
            OK: "Stäng"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Ladda ned den här versionen"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Bekräfta",
            PROMPT: "Den aktuella versionen av den här filen ersätts med version ${version}. Vill du fortsätta?",
            ERROR: "Fel vid återställning av versionen. Försök igen senare.",
            TOOLTIP: "Återställ den här versionen",
            CHANGE_SUMMARY: "Återställdes från version ${version}",
            OK: "OK",
            CANCEL: "Avbryt"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Bekräfta",
            REMOVE_EVERYONE: "Vill du ta bort företagets åtkomst till den här filen? Om du tar bort åtkomsten tas filen bort från mappar och gemenskaper som tillåter åtkomst på företagsnivå och endast ägaren och de personer filen har delats med kan se och arbeta med den.",
            REMOVE_USER: "Vill du sluta dela med ${user}? Om du slutar dela kommer ${user} bara att kunna komma åt den här filen via mappar eller om den delas med alla i företaget.",
            REMOVE_COMMUNITY: "Vill du ta bort filen från gemenskapen ${communityName}?",
            REMOVE_FOLDER: "Vill du ta bort filen från mappen ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Ta bort åtkomst för företaget",
            REMOVE_USER_TOOLTIP: "Ta bort alla delningar med ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Ta bort från gemenskapen ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Ta bort från mappen ${folderName}",
            OK: "OK",
            CANCEL: "Avbryt",
            EFSS: {
              DIALOG_TITLE: "Bekräfta",
              REMOVE_EVERYONE: "Vill du ta bort företagets åtkomst till den här filen? Om åtkomsten tas bort tas filen bort från mappar med åtkomst på företagsnivå och endast ägaren och personer filen har delats med kan se och arbeta med den.",
              REMOVE_USER: "Vill du sluta dela med ${user}? Om du slutar dela kommer ${user} bara att kunna komma åt den här filen via mappar eller om den delas med alla i företaget.",
              REMOVE_COMMUNITY: "Vill du ta bort filen från gemenskapen ${communityName}?",
              REMOVE_FOLDER: "Vill du ta bort filen från mappen ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Ta bort åtkomst för företaget",
              REMOVE_USER_TOOLTIP: "Ta bort alla delningar med ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Ta bort från gemenskapen ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Ta bort från mappen ${folderName}",
              OK: "OK",
              CANCEL: "Avbryt",
            }
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
            UNLIKE: "Sluta gilla den här filen",
            LIKE_A11Y: "Välj den här knappen om du gillar filen.",
            UNLIKE_A11Y: "Välj den här knappen om du vill sluta gilla filen.",
            LIKED_SUCCESS: "Du gillade den här filen",
            UNLIKE_SUCCESS: "Du slutade gilla den här filen"
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
                  DEFAULT: "Fel när filen skulle följas. Försök igen senare.",
                  UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen om du ska kunna följa filen.",
                  NOT_FOUND: "Du kan inte följa filen eftersom den har tagits bort eller inte längre delas med dig.",
                  ACCESS_DENIED: "Du kan inte följa filen eftersom den har tagits bort eller inte längre delas med dig."
               },
               UNFOLLOW: {
                  DEFAULT: "Fel när filen skulle sluta följas. Försök igen senare.",
                  UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan sluta följa filen.",
                  NOT_FOUND: "Du kan inte sluta följa filen eftersom den har tagits bort eller inte längre delas med dig.",
                  ACCESS_DENIED: "Du kan inte sluta följa filen eftersom den har tagits bort eller inte längre delas med dig."
               }
            },
            FOLLOW_NAME: "Följ",
            FOLLOW_TOOLTIP: "Följ den här filen",
            FOLLOW_A11Y: "Följer filen.",
            FOLLOW_SUCCESS: "Du följer nu den här filen.",
            STOP_FOLLOWING_NAME: "Sluta följa",
            STOP_FOLLOWING_TOOLTIP: "Sluta följa den här filen",
            STOP_FOLLOWING_A11Y: "Slutar följa filen.",
            STOP_FOLLOWING_SUCCESS: "Du har slutat följa den här filen."
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
            },
            MYDRIVE: {
                NAME: "Lägg till i Min enhet",
                TOOLTIP: "Lägg till filen i Min enhet",
                A11Y: "Lägger till filen i Min enhet.",
                SUCCESS: "Du har lagt till filen i Min enhet.",
                ERROR: {
                   DEFAULT: "Fel när filen skulle läggas till i Min enhet. Försök igen senare.",
                   UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan lägga till filen i Min enhet.",
                   NOT_FOUND: "Du kan inte lägga till filen i Min enhet eftersom den har tagits bort eller inte längre delas med dig.",
                   ACCESS_DENIED: "Du kan inte lägga till filen i Min enhet eftersom den har tagits bort eller inte längre delas med dig."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Ta bort från Min enhet",
                TOOLTIP: "Ta bort filen från Min enhet",
                A11Y: "Tar bort filen från Min enhet.",
                SUCCESS: "Du har tagit bort filen från Min enhet.",
                ERROR: {
                   DEFAULT: "Fel när filen skulle tas bort från Min enhet. Försök igen senare.",
                   UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen innan du kan ta bort filen från Min enhet.",
                   NOT_FOUND: "Du kan inte ta bort filen från Min enhet eftersom den har tagits bort eller inte längre delas med dig.",
                   ACCESS_DENIED: "Du kan inte ta bort filen från Min enhet eftersom den har tagits bort eller inte längre delas med dig."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Ange som favorit",
            FAVORITE_TOOLTIP: "Ange filen som favorit",
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
            NAME: "Skicka in en kopia till en gemenskap",
            DIALOG_TITLE: "Bekräfta",
            ERROR: "Fel när filen skulle kopieras. Försök igen senare.",
            TOOLTIP: "Skicka in en kopia av den här filen till en gemenskap",
            OK: "OK",
            CANCEL: "Avbryt",
            A11Y: "Öppnar en dialogruta där du kan kopiera filen till en gemenskap.",
            SUCCESS_MSG: "${file} har kopierats till ${community}."
         },
         TRANSFER_FILE: {
            NAME: "\u00d6verf\u00f6r \u00e4gande ...",
            DIALOG_TITLE: "\u00d6verf\u00f6r \u00e4gande",
            TOOLTIP: "Överför den här filen till en ny ägare",
            A11Y: "Använd den här knappen för att öppna en dialogruta där du kan överföra den här filen till en ny ägare.",
            EMPTY: "Tom"
         },
         UPLOAD_VERSION: {
            NAME: "Ladda upp en ny version",
            NAME_SHORT: "Ladda upp",
            CHANGE_SUMMARY: "(Valfritt) Sammanfattning av ändringar...",
            TOOLTIP: "Ladda upp en ny version av den här filen",
            A11Y: "Använd den här knappen för att öppna en dialogruta där du kan ladda upp en ny version av den här filen."
         },
         LOG_IN: {
            NAME: "Logga in",
            TOOLTIP: "Logga in om du vill ladda upp och dela filer, kommentera och skapa mappar"
         },
         LOCK: {
            NAME: "Lås fil",
            TITLE: "Lås filen",
            A11Y: "Lås filen",
            SUCCESS: "Filen är låst.",
            ERROR: "Filen har tagits bort eller delas inte längre med dig. Det gick inte att låsa den."
         },
         UNLOCK: {
            NAME: "Lås upp fil",
            TITLE: "Lås upp filen",
            A11Y: "Lås upp filen",
            SUCCESS: "Filen är inte låst.",
            ERROR: "Filen har tagits bort eller delas inte längre med dig. Det gick inte att låsa upp den."
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
               SUCCESS: "Filen har flaggats och skickats in för granskning.",
               ERROR: "Ett fel uppstod vid flaggning av den här filen. Försök igen senare."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Slutfördes",
               PROMPT: "Filen har flaggats och skickats in för granskning.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Flagga som olämpligt",
               TITLE: "Flagga kommentar",
               A11Y: "Flagga den här kommentaren som olämplig",
               PROMPT: "Ange en orsak till att du har flaggat den här kommentaren (valfritt):",
               OK: "Flagga",
               CANCEL: "Avbryt",
               SUCCESS: "Kommentaren har flaggats och skickats in för granskning.",
               ERROR: "Ett fel uppstod vid flaggning av den här kommentaren. Försök igen senare."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Slutfördes",
            PROMPT: "Ändringarna har skickats in för granskning. Filen blir inte tillgänglig förrän ändringarna har godkänts.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Listknapp"
      },
      SECTION: {
         ABOUT: {
            NAME: "Om den här filen",
            VIEW_FILE_DETAILS: "Visa fildetaljer",
            A11Y: "Om du aktiverar länken stängs filen och du dirigeras till en sida med information om filen."
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
            RESET_ZOOM_A11Y: "Återställer zoomnivån.",
            UNSAFE_PREVIEW: "Det går inte att förhandsgranska filen eftersom den inte har viruskontrollerats."
         },
         VIEWER: {
            LOADING: "Läser in...",
            PUBLISHING: "Publicerar...",
            NO_PUBLISHED_VERSION: "Det finns ingen publicerad version av filen som är tillgänglig för visning.",
            IFRAME_TITLE: "Förhandsgranskning av den här filen",
            AUTOPUBLISH_TIMEOUT: "Det tar för lång tid att få svar från servern.  Det kan hända att de senaste ändringarna inte har publicerats."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Det går inte att förhandsgranska filen eftersom den inte har viruskontrollerats."
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
         B: "${0} B",
         KB: "${0} kB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Textområde för kommentar",
         SHADOW_TEXT: "Lägg till en kommentar...",
         CANNOT_ACCESS_CONTENT: "Följande personer som du har nämnt kommer inte att kunna se kommentaren eftersom de inte har åtkomst till innehållet:",
         ERROR: "Ett fel inträffade under validering av den användare du försöker nämna.",
         POST: "Publicera",
         SAVE: "Spara",
         CANCEL: "Avbryt",
         EXTERNAL_WARNING: "Personer utanför företaget får se kommentarer."
      },
      EDIT_BOX: {
         SAVE: "Spara",
         CANCEL: {
            TOOLTIP: "Avbryt",
            A11Y: "Använd den här knappen för att avbryta redigeringen av filnamnet."
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
         USER: "Person",
         COMMUNITY: "Gemenskap",
         SHARE: "Dela",
         SHARE_ALT: "Dela med den här personen",
         MEMBER_TYPE: "Medlemstyp",
         PERSON_SHADOW: "Ange den person du vill söka efter",
         COMMUNITY_SHADOW: "Ange den gemenskap du vill söka efter",
         PERSON_ARIA: "Ange den person du vill söka efter.  Tryck på Skift+tabb om du vill byta mellan personer, gemenskaper och alla på företaget.",
         COMMUNITY_ARIA: "Ange den gemenskap du vill söka efter.  Tryck på Skift+tabb om du vill byta mellan personer, gemenskaper och alla på företaget.",
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
         A11Y_TEXT: "Korta av texten automatiskt",
         COMMENT: {
            WARN_TOO_LONG: "Kommentaren är för lång.",
            TRIM: "Vill du skriva en kortare kommentar?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "Beskrivningen är för lång.",
            TRIM: "Vill du skriva en kortare beskrivning?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "Meddelandet är för långt.",
            TRIM: "Vill du skriva ett kortare meddelande?"
         },
         TAG: {
            WARN_TOO_LONG: "Taggen är för lång.",
            TRIM: "Vill du välja en kortare tagg?"
         },
         TAGS: {
            WARN_TOO_LONG: "En eller flera taggar är för lång.",
            TRIM: "Vill du ange kortare taggar?"
         },
         FILENAME: {
            WARN_TOO_LONG: "Filnamnet är för långt"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Den här filen kan redigeras online av personer som har HCL Docs.",
         NO_ENTITLEMENT_LINK: "Den här filen kan redigeras online av personer som har ${startLink}HCL Docs${endLink}.", // When configured, "HCL Docs" will be a link to more information about the product
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
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Dina redigeringar publiceras. ${startLink}Uppdatera för att visa dina ändringar.${endLink}",
            GENERIC: "Du kan behöva uppdatera sidan för att de senaste ändringarna ska visas.  ${startLink}Uppdatera${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Det finns inga kommentarer.",
         MODERATED: "Kommentaren har skickats in för granskning och kommer att vara tillgänglig när den har godkänts.",
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
         EDIT_TAGS: "Redigera taggar",
         ERROR: {
            SAVE: {
               DEFAULT: "Det gick inte att skapa taggen. Försök igen senare."
            },
            DELETE: {
               DEFAULT: "Det gick inte att ta bort taggen. Försök igen senare."
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
               ORG: "Alla i ${org}"
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
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Filen delades."
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
                  NO_ACCOUNT: "Följande användare har inte något konto. Det gick inte att dela något innehåll med dem.",
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
            "Alla delningar med externa personer, gemenskaper eller mappar tas bort.${br}${br}Om du gör filen intern går det inte att ångra.",
            EFSS: {
               DIALOG_TITLE: "Gör intern",
               PROMPT: "Om du gör filen intern kan den inte längre delas med personer utanför företaget. ${br}${br}" +
               "Alla delningar med externa personer eller mappar tas bort.${br}${br}Om du gör filen intern går det inte att ångra."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Sluta dela filen",
            PROMPT: "Vill du sluta dela ut den här filen?",
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
            DOCS_CREATED_HEADER: "Skapat",
            UPDATED_HEADER: "Uppdaterat",
            CREATED_HEADER: "Skapat",
            LIKES_HEADER: "Gillanden",
            LIKES_EXPAND_ICON: "Expandera ikonen så ser du vilka som gillar filen.",
            DOWNLOADS_HEADER: "Visningar",
            DOWNLOADS_HEADER_MORE: "Visningar (${0})",
            DOWNLOADS_EXPAND_ICON: "Expandera ikonen så ser du vilka som har öppnat filen.",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonymt",
            DOWNLOADS_LATEST_VERSION: "Du har den senaste versionen av den här filen",
            DOWNLOADS_LAST_VERSION: "Du öppnade senast version ${0} av den här filen",
            TAGS_HEADER: "Taggar",
            DESCRIPTION_HEADER: "Beskrivning",
            DESCRIPTION_READ_MORE: "Läs mer...",
            LINKS_HEADER: "Länkar",
            SECURITY: "Säkerhet",
            FILE_ENCRYPTED: "Filinnehållet är krypterat. Det går inte att söka i krypterat filinnehåll. Det går inte att visa filinnehållet och det går inte heller att redigera det i HCL Docs.",
            GET_LINKS: "Hämta länkar...",
            ADD_DESCRIPTION: "Lägg till en beskrivning",
            NO_DESCRIPTION: "Ingen beskrivning",
            ADD_TAGS: "Lägg till taggar",
            NO_TAGS: "Det finns inga taggar"
         },
         COMMENTS: {
            TITLE: "Kommentarer",
            TITLE_WITH_COUNT: "Kommentarer (${0})",
            VERSION: "Version ${0}",
            FEED_LINK: "Flöde för de här kommentarerna",
            FEED_TITLE: "Följ ändringar av de här kommentarerna med hjälp av en flödesläsare"
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
            FEED_TITLE: "Följ ändringar av den här filen med hjälp av en flödesläsare"
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
         LINK: "Ladda upp ny version...",
         CHANGE_SUMMARY: "(Valfritt) Sammanfattning av ändringar...",
         ERROR: "Det gick inte att spara den nya versionen. Försök igen senare.",
         SUCCESS: "Den nya versionen sparades.",
         UPLOAD: "Ladda upp",
         UPLOAD_AND_CHANGE_EXTENSION: "Ladda upp och ändra tillägg",
         CANCEL: "Avbryt",
         TOO_LARGE: "${file} är större än den tillåtna storleken på ${size}.",
         PROGRESS_BAR_TITLE: "Laddar upp ny version (${uploaded} av ${total} har laddats upp)",
         CANCEL_UPLOAD: "Avbryt uppladdningen"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Ett fel uppstod vid åtkomst till filen. Försök igen senare.",
         UNAUTHENTICATED: "Tidsgränsen för sessionen överskreds. Du måste logga in igen för att kunna se filen.",
         NOT_FOUND: "Den begärda filen har tagits bort eller flyttats. Om någon sände den här länken till dig kontrollerar du att den fungerar.",
         ACCESS_DENIED: "Du har inte behörighet att visa den här filen. Den delas inte längre med dig.",
         ACCESS_DENIED_ANON: "Du har inte behörighet att visa den här filen. Om det här är din fil eller om någon har delat den med dig måste du logga in först."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Fel",
         PROMPT: "Den begärda filen har tagits bort eller flyttats.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Bekräfta",
        PROMPT: "Tidsgränsen för din HCL Connections-session har överskridits.${lineBreaks}Klicka på OK om du vill logga in igen. Om du vill stänga den här dialogrutan klickar du på Avbryt.",
        OK: "OK",
        CANCEL: "Avbryt"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Kan inte öppna länken",
        PROMPT: "Det uppstod ett fel vid försök att öppna länken.${lineBreaks}Klicka på OK så omdirigeras du till sidan.",
        OK: "OK",
        CANCEL: "Avbryt"
      },
      LOAD_ERROR: {
         DEFAULT: "Hoppsan. Ett fel uppstod vid åtkomst till länken.",
         ACCESS_DENIED: "Kontakta filägaren för att be om behörighet att visa den här filen."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - fil",
         LOAD_ERROR: "Fel vid åtkomst av fil"
      },
      SHARE_WITH_LINK: {
         TITLE: "Dela med länk",
         EMPTY_DESCRIPTION: "Du har inte skapat någon länk för den här filen ännu. Skapa en delad länk att skicka till andra så att de kan förhandsgranska och ladda ned filen.",
         CREATE_LINK: "Skapa en länk",
         COPY_LINK: "Kopiera länk",
         DELETE_LINK: "Ta bort länk",
         ACCESS_TYPE_1: "Alla som har länken kan visa filen",
         ACCESS_TYPE_2: "Personer i företaget kan visa filen",
         ACCESS_TYPE_1_DESCRIPTION: "Personer som får länken kan förhandsgranska och ladda ned filen när de har loggat in till Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Personer i företaget som får länken kan förhandsgranska och ladda ned filen när de har loggat in till Connections.",
         CHANGE_TYPE_SUCCESS: "Länkbehörigheten uppdateras när åtkomsttypen ändras.",
         CHANGE_TYPE_ERROR: "Länkbehörigheten uppdateras inte när åtkomsttypen ändras.",
         COPY_LINK_SUCCESS: "Länken kopierades till Urklipp",
         CREATE_SHARELINK_SUCCESS:"Länken skapades.",
         CREATE_SHARELINK_ERROR:"Det går inte att skapa någon länk på grund av ett fel.",
         DELETE_SHARELINK_SUCCESS: "Delningslänken för ${file} togs bort. ",
         DELETE_SHARELINK_ERROR: "Delningslänken togs inte bort. Försök igen senare.",
         CONFIRM_DIALOG: {
            OK: "Ta bort",
            DIALOG_TITLE: "Ta bort delningslänken",
            PROMPT: "Filen blir otillgänglig för alla som har länken. Vill du ta bort länken?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Delningslänken är aktiv. Alla som har länken kan visa filen. Klicka för att kopiera länken.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Delningslänken är aktiv. Personer i företaget kan visa filen. Klicka för att kopiera länken."
      }
});
