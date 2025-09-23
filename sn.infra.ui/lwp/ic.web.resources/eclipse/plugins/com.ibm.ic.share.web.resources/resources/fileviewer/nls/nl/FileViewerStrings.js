/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2021                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "Preview van bestanden",
      FILENAME_TOOLTIP: "Bestandsnaam wijzigen",
      ICON_TOOLTIP: "Bestand downloaden",
      ERROR: "Er is een fout opgetreden.",
      FILE_MALICIOUS: "Bij het scannen is schadelijke content aangetroffen",
      SHARED_EXTERNALLY: "Extern gedeeld",
      FILE_SYNCED: "Toegevoegd aan synchronisatie",
      MY_DRIVE: {
         TITLE: "In My Drive",
         ROOT_FOLDER: "/My Drive",
         FOLDER: "/My Drive/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Meer acties",
         A11Y: "Hiermee opent u een keuzemenu met een lijst van andere acties die u op het bestand kunt uitvoeren.",
            PANELS: {
               TITLE: "Meer",
               A11Y: "Hiermee opent u een keuzemenu met een lijst van verborgen vensters."
            }
      },
      WELCOME: {
         TITLE: "De views voor bestanden en details zijn gecombineerd",
         SUBTITLE: "U kunt een bestand en de bijbehorende reacties nu naast elkaar bekijken.",
         LINES: {
            LINE_1: "Alle informatie en beschikbare acties van de oude pagina zijn nu hier te vinden.",
            LINE_2: "Reacties, gedeeld gebruik, versies en basisgegevens vindt u naast het bestand."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Met deze knop navigeert u naar het volgende bestand.",
         PREVIOUS_A11Y: "Met deze knop navigeert u naar het vorige bestand."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Meer bewerkingsopties",
            A11Y: "Met deze knop opent u een menu voor meer bewerkingsopties."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Bewerken"
            },
            UPLOAD: {
               TITLE: "Uploaden"
            },
            CREATE: {
              TITLE: "Maken"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Venstergrootte wijzigen",
           USAGE: "Druk op de toetsen vierkant haakje openen of sluiten om de grootte van het venster te wijzigen."
       },
         CLOSE: {
            TOOLTIP: "Sluiten",
            A11Y: "Met deze knop sluit u de bestandsviewer.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Uw bestand wordt nog steeds geüpload.",
              PROMPT: "Uw bestand wordt nog steeds geüpload. Als u afsluit voordat de uploadactie is voltooid, wordt deze geannuleerd.",
              OK: "Toch sluiten",
              CANCEL: "Wachten op upload"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Toevoegen aan Bestanden",
           A11Y: "Met deze knop voegt u de bijlagen toe aan Bestanden.",
           VIEW_NOW: "Nu weergeven"
         },
         TEAR_OFF: {
           TOOLTIP: "Openen in nieuw venster",
           A11Y: "Openen in nieuw venster",
           ERROR_TEARING_OFF: "Er is een fout opgetreden bij het openen van het nieuwe venster.",
           DIALOG_TITLE: "Bevestigen",
           UNSAVED_CHANGES_WARNING: "Er zijn wijzigingen aangebracht die hiermee verloren gaan. Wilt u toch een nieuw venster openen?",
           OK: "Ja",
           CANCEL: "Nee",
           OPEN: "Openen",
           OPEN_ANYWAY: "Toch openen",
           CANCEL_ALT: "Annuleren"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Nieuw bronbestand",
            ACTION_NAME:"Bestand maken",
            A11Y: {
               TEXT: "Maak een document (DOC-, DOCX- of ODT-bestand) op basis van een sjabloonbestand. U kunt deze documenten online bewerken in Docs.",
               PRES: "Maak een presentatie (PPT-, PPTX- of ODP-bestand) op basis van een sjabloonbestand. U kunt deze presentaties online bewerken in Docs.",
               SHEET: "Maak een spreadsheet (XLS-, XLSX- of ODS-bestand) op basis van een sjabloonbestand. U kunt deze spreadsheets online bewerken in Docs."
            },
            PROMPT: {
               TEXT: "Maak een document (DOC-, DOCX- of ODT-bestand) op basis van een sjabloonbestand. U kunt deze documenten online bewerken in Docs.",
               PRES: "Maak een presentatie (PPT-, PPTX- of ODP-bestand) op basis van een sjabloonbestand. U kunt deze presentaties online bewerken in Docs.",
               SHEET: "Maak een spreadsheet (XLS-, XLSX- of ODS-bestand) op basis van een sjabloonbestand. U kunt deze spreadsheets online bewerken in Docs."
            },
            NAME_FIELD: "Naam:",
            EXTERNAL_FIELD: "Bestanden kunnen worden gedeeld met personen buiten de organisatie",
            EXTERNAL_DESC: "Met externe toegang kunnen bestanden en mappen worden gedeeld met externe gebruikers (personen buiten uw organisatie of bedrijf) en met community's die externe personen als lid hebben. U moet externe toegang inschakelen op het moment dat u een bestand uploadt. Daarna kan dat niet meer.",
            CREATE_BUTTON: "Maken",
            CANCEL: "Annuleren",
            PRE_FILL_NAMES: {
               OTT: "Naamloos document",
               OTS: "Naamloze spreadsheet",
               OTP: "Naamloze presentatie",
               DOT: "Naamloos document",
               XLT: "Naamloze spreadsheet",
               POT: "Naamloze presentatie",
               DOTX: "Naamloos document",
               XLTX: "Naamloze spreadsheet",
               POTX: "Naamloze presentatie"
            },
            ERRORS: {
               NAME_REQUIRED: "Documentnaam is vereist.",
               ILLEGAL_NAME:"Dit is een ongeldige documenttitel. Geef een andere naam op.",
               WARN_LONG_NAME: "De documentnaam is te lang.",
               TRIM_NAME: "De documentnaam inkorten?",
               SESSION_TIMEOUT: "Uw sessie is verlopen; meld u aan en probeer het opnieuw.",
               DUPLICATE_NAME: "De bestandsnaam is al in gebruik. Geef een nieuwe naam op.",
               SERVER_ERROR: "De Connections-server is niet beschikbaar. Neem contact op met de serverbeheerder en probeer het op een ander moment opnieuw."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Bestand downloaden",
            A11Y: "Met deze knop downloadt u het bestand."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Downloaden als PDF",
            TOOLTIP: "Dit bestand downloaden als PDF-bestand",
            A11Y: "Met deze knop downloadt u het bestand als PDF-bestand.",
            SUCCESS: "U hebt het bestand gedownload als PDF-bestand.",
            ERROR: {
               DEFAULT: "Het is niet gelukt om het bestand te downloaden als PDF-bestand.  Probeer het later opnieuw.",
               UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om het bestand te downloaden als PDF-bestand.",
               NOT_FOUND: "Het bestand kan niet worden gedownload als PDF-bestand omdat het bestand is gewist of niet langer met u wordt gedeeld.",
               ACCESS_DENIED: "Het bestand kan niet worden gedownload als PDF-bestand omdat het bestand is gewist of niet langer met u wordt gedeeld."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Er is geen gepubliceerde versie van het bestand die kan worden gedownload.  Versies kunnen worden gepubliceerd vanuit de documenteneditor."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Bestand kan niet worden gedownload",
               CANCEL: "Sluiten",
               PROMPT: "Er is geen gepubliceerde versie van dit bestand om te downloaden",
               PROMPT2: "Versies kunnen worden gepubliceerd vanuit de documenteneditor."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Bestand kan niet worden gedownload",
               CANCEL: "Sluiten",
               PROMPT: "Er is geen gepubliceerde versie van dit bestand om te downloaden",
               PROMPT2: "Verzoek de eigenaar van het bestand om een versie van dit bestand te publiceren."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Versie downloaden",
               OK: "Versie downloaden",
               PROMPT: {
                  TODAY: "Er is een nieuwer concept gevonden, vandaag om ${time} voor het laatst gewijzigd.",
                  YESTERDAY: "Er is een nieuwer concept gevonden, gisteren om ${time} voor het laatst gewijzigd.",
                  DAY: "Er is een nieuwer concept gevonden, laatst gewijzigd op ${date}.",
                  MONTH: "Er is een nieuwer concept gevonden, laatst gewijzigd op ${date}.",
                  YEAR: "Er is een nieuwer concept gevonden, laatst gewijzigd op ${date_long}."
               },
               PROMPT2: {
                  TODAY: "Weet u zeker dat u door wilt gaan met het downloaden van de versie die vandaag om ${time} is gepubliceerd?",
                  YESTERDAY: "Weet u zeker dat u door wilt gaan met het downloaden van de versie die gisteren om ${time} is gepubliceerd?",
                  DAY: "Weet u zeker dat u door wilt gaan met het downloaden van de versie die op ${date} is gepubliceerd?",
                  MONTH: "Weet u zeker dat u door wilt gaan met het downloaden van de versie die op ${date} is gepubliceerd?",
                  YEAR: "Weet u zeker dat u door wilt gaan met het downloaden van de versie die op ${date_long} is gepubliceerd?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Detailvenster afbeelden",
            HIDE: "Detailvenster verbergen",
            RESET: "Venstergrootte opnieuw instellen",
            SHOW_A11Y: "Met deze knop kunt u het zijvenster afwisselend openen en sluiten. Het zijvenster is nu gesloten.",
            HIDE_A11Y: "Met deze knop kunt u het zijvenster afwisselend openen en sluiten. Het zijvenster is nu geopend.",
            RESET_A11Y: "Met deze knop geeft u het zijvenster weer de standaardgrootte. Het zijvenster is nu uitgevouwen."
         },
         VIEW_DOC: {
            NAME: "Openen in Docs Viewer",
            TOOLTIP: "Openen in Docs Viewer",
            A11Y: "Met deze knop opent u het bestand in een nieuw browservenster."
         },
         EDIT_DOC: {
            NAME: "Bewerken in Docs",
            TOOLTIP: "Dit bestand bewerken met HCL Docs",
            A11Y: "Met deze knop opent u het bestand voor bewerken in Docs in een nieuw venster."
         },
         EDIT_OFFICE: {
            TITLE: "Bewerkingsopties.",
            NAME: "Bewerken in Microsoft Office Online",
            TOOLTIP: "Dit bestand bewerken met Microsoft Office Online",
            A11Y: "Met deze knop opent u het bestand voor bewerken in Microsoft Office Online in een nieuw venster."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Bewerken in Microsoft Word Online",
           TOOLTIP: "Dit bestand bewerken met Microsoft Word Online",
           A11Y: "Met deze knop opent u het bestand voor bewerken in Microsoft Word Online in een nieuw venster."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Bewerken in Microsoft Excel Online",
             TOOLTIP: "Dit bestand bewerken met Microsoft Excel Online",
             A11Y: "Met deze knop opent u het bestand voor bewerken in Microsoft Excel Online in een nieuw venster."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Bewerken in Microsoft PowerPoint Online",
             TOOLTIP: "Dit bestand bewerken met Microsoft PowerPoint Online",
             A11Y: "Met deze knop opent u het bestand voor bewerken in Microsoft PowerPoint Online in een nieuw venster."
         },
         OFFICE_EDITED: {
             SUCCESS: "Het bestand wordt opgeslagen."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Bewerken op desktop",
            DIALOG_TITLE: "Bewerken op desktop",
            TOOLTIP: "Dit document bewerken",
            A11Y: "Met deze knop opent u het bestand om het lokaal te bewerken.",
            PROMPT: "Met deze functie kunt u het bestand bewerken met behulp van op uw computer geïnstalleerde software.",
            INSTALL: "${startLink}Installeer de desktop-bestandsconnectors${endLink} en ga verder.",
			// The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Let op:",
            REMINDER: "Wanneer u klaar bent met bewerken, publiceert u een concept met behulp van de desktop-bestandsconnectors.",
            SKIP_DIALOG: "Dit bericht niet meer afbeelden.",
            OK: "OK",
            CANCEL: "Annuleren"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Bevestigen",
            DELETE_VERSION: "Versie ${version} wissen",
            DELETE_VERSION_AND_PRIOR: "Versie ${version} en alle eerdere versies wissen",
            PROMPT: "U staat op het punt om versie ${version} te wissen. Wilt u doorgaan?",
            DELETE_PRIOR: "Ook alle eerdere versies wissen",
            ERROR: "Er is een fout opgetreden bij het wissen van de versie. Probeer het later opnieuw.",
            TOOLTIP: "Deze versie wissen",
            OK: "OK",
            CANCEL: "Annuleren"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Links ophalen",
            LINK_FILE: "Link naar bestand:",
            LINK_PREVIEW: "Link voor preview van bestand:",
            LINK_DOWNLOAD: "Link voor downloaden van bestand:",
            TOOLTIP: "Link naar bestand",
            OK: "Sluiten"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Deze versie downloaden"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Bevestigen",
            PROMPT: "De huidige versie van dit bestand wordt vervangen door versie ${version}. Wilt u doorgaan?",
            ERROR: "Er is een fout opgetreden bij het van de versie. Probeer het later opnieuw.",
            TOOLTIP: "Deze versie herstellen",
            CHANGE_SUMMARY: "Hersteld vanaf versie ${version}",
            OK: "OK",
            CANCEL: "Annuleren"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Bevestigen",
            REMOVE_EVERYONE: "Weet u zeker dat dit bestand niet langer voor uw organisatie toegankelijk moet zijn? Als de toegang wordt opgeheven, wordt het bestand verwijderd uit de mappen en community's die toegankelijk zijn voor uw organisatie en kunnen alleen de eigenaar en de personen met wie het is gedeeld het nog bekijken en gebruiken.",
            REMOVE_USER: "Weet u zeker dat u het delen met ${user} wilt stoppen? Als u het delen stopt, kan ${user} dit bestand alleen openen via gedeelde mappen of via deling met iedereen in uw organisatie.",
            REMOVE_COMMUNITY: "Weet u zeker dat u dit bestand uit de community ${communityName} wilt verwijderen?",
            REMOVE_FOLDER: "Weet u zeker dat u dit bestand uit de map ${folderName} wilt verwijderen?",
            REMOVE_EVERYONE_TOOLTIP: "Toegang voor uw organisatie verwijderen",
            REMOVE_USER_TOOLTIP: "Alle shares met ${user} verwijderen",
            REMOVE_COMMUNITY_TOOLTIP: "Verwijderen uit de community ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Verwijderen uit de map ${folderName}",
            OK: "OK",
            CANCEL: "Annuleren",
            EFSS: {
              DIALOG_TITLE: "Bevestigen",
              REMOVE_EVERYONE: "Weet u zeker dat dit bestand niet langer voor uw organisatie toegankelijk moet zijn? Als de toegang wordt opgeheven, wordt het bestand verwijderd uit de mappen met organisatie-brede toegang en kunnen alleen de eigenaar en de personen met wie het is gedeeld het nog bekijken en gebruiken.",
              REMOVE_USER: "Weet u zeker dat u het delen met ${user} wilt stoppen? Als u het delen stopt, kan ${user} dit bestand alleen openen via gedeelde mappen of via deling met iedereen in uw organisatie.",
              REMOVE_COMMUNITY: "Weet u zeker dat u dit bestand uit de community ${communityName} wilt verwijderen?",
              REMOVE_FOLDER: "Weet u zeker dat u dit bestand uit de map ${folderName} wilt verwijderen?",
              REMOVE_EVERYONE_TOOLTIP: "Toegang voor uw organisatie verwijderen",
              REMOVE_USER_TOOLTIP: "Alle shares met ${user} verwijderen",
              REMOVE_COMMUNITY_TOOLTIP: "Verwijderen uit de community ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Verwijderen uit de map ${folderName}",
              OK: "OK",
              CANCEL: "Annuleren",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Deze reactie bewerken"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Bevestigen",
            PROMPT: "Weet u zeker dat u deze reactie wilt wissen?",
            ERROR: "Er is een fout opgetreden bij het wissen van de reactie. Probeer het later opnieuw.",
            TOOLTIP: "Deze reactie wissen",
            OK: "OK",
            CANCEL: "Annuleren"
         },
         LIKE: {
            LIKE: "Bestand liken",
            UNLIKE: "Like voor het bestand verwijderen",
            LIKE_A11Y: "Met deze knop liket u het bestand.",
            UNLIKE_A11Y: "Met deze knop verwijdert u de like voor het bestand.",
            LIKED_SUCCESS: "U hebt het bestand geliket",
            UNLIKE_SUCCESS: "U hebt de like voor dit bestand verwijderd"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Beschrijving bewerken",
            ERROR: {
               DEFAULT: "De beschrijving kan niet worden opgeslagen. Probeer het later opnieuw.",
               UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om de beschrijving bij te werken.",
               NOT_FOUND: "De beschrijving is niet opgeslagen omdat het bestand is gewist of niet langer gedeeld is met u.",
               ACCESS_DENIED: "De beschrijving is niet opgeslagen omdat het bestand is gewist of niet langer gedeeld is met u."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Fout bij opslaan van bestandsnaam",
               CONFLICT: "Bestandsnaam bestaat al"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Er is een fout opgetreden bij het volgen van dit bestand. Probeer het later opnieuw.",
                  UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om dit bestand te volgen.",
                  NOT_FOUND: "U kunt dit bestand niet volgen, want het bestand is gewist of het wordt niet meer met u gedeeld.",
                  ACCESS_DENIED: "U kunt dit bestand niet volgen, want het bestand is gewist of het wordt niet meer met u gedeeld."
               },
               UNFOLLOW: {
                  DEFAULT: "Er is een fout opgetreden bij het stoppen met volgen van dit bestand. Probeer het later opnieuw.",
                  UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om te stoppen met het volgen van dit bestand.",
                  NOT_FOUND: "U kunt niet stoppen met het volgen van dit bestand, want het bestand is gewist of het wordt niet meer met u gedeeld.",
                  ACCESS_DENIED: "U kunt niet stoppen met het volgen van dit bestand, want het bestand is gewist of het wordt niet meer met u gedeeld."
               }
            },
            FOLLOW_NAME: "Volgen",
            FOLLOW_TOOLTIP: "Dit bestand volgen",
            FOLLOW_A11Y: "Met deze knop volgt u het bestand.",
            FOLLOW_SUCCESS: "U volgt nu het bestand.",
            STOP_FOLLOWING_NAME: "Volgen stoppen",
            STOP_FOLLOWING_TOOLTIP: "Stoppen met het volgen van dit bestand",
            STOP_FOLLOWING_A11Y: "Met deze knop stopt u het volgen van het bestand.",
            STOP_FOLLOWING_SUCCESS: "U bent gestopt met het volgen van het bestand."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Toevoegen aan synchronisatie",
               TOOLTIP: "Dit bestand toevoegen aan de synchronisatielijst",
               A11Y: "Met deze knop voegt u het bestand toe aan de synchronisatielijst.",
               SUCCESS: "U hebt dit bestand toegevoegd aan de synchronisatielijst.",
               ERROR: {
                  DEFAULT: "Er is een fout opgetreden bij het toevoegen van dit bestand aan de synchronisatielijst. Probeer het later opnieuw.",
                  UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om dit bestand toe te voegen aan de synchronisatielijst.",
                  NOT_FOUND: "U kunt dit bestand niet toevoegen aan de synchronisatielijst, want het bestand is gewist of het wordt niet meer met u gedeeld.",
                  ACCESS_DENIED: "U kunt dit bestand niet toevoegen aan de synchronisatielijst, want het bestand is gewist of het wordt niet meer met u gedeeld."
               }
            },
            STOP_SYNC: {
               NAME: "Verwijderen van synchronisatie",
               TOOLTIP: "Dit bestand verwijderen uit de synchronisatielijst",
               A11Y: "Met deze knop verwijdert u het bestand van de synchronisatielijst.",
               SUCCESS: "U hebt dit bestand verwijderd van de synchronisatielijst.",
               ERROR: {
                  DEFAULT: "Er is een fout opgetreden bij het verwijderen van dit bestand uit de synchronisatielijst. Probeer het later opnieuw.",
                  UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om dit bestand te verwijderen uit de synchronisatie.",
                  NOT_FOUND: "U kunt dit bestand niet verwijderen uit de synchronisatielijst, want het bestand is gewist of het wordt niet meer met u gedeeld.",
                  ACCESS_DENIED: "U kunt dit bestand niet verwijderen uit de synchronisatielijst, want het bestand is gewist of het wordt niet meer met u gedeeld."
               }
            },
            MYDRIVE: {
                NAME: "Toevoegen aan My Drive",
                TOOLTIP: "Dit bestand toevoegen aan My Drive",
                A11Y: "Met deze knop voegt u het bestand toe aan My Drive.",
                SUCCESS: "U hebt dit bestand toegevoegd aan My Drive.",
                ERROR: {
                   DEFAULT: "Er is een fout opgetreden bij het toevoegen van dit bestand aan My Drive. Probeer het later opnieuw.",
                   UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om dit bestand toe te voegen aan My Drive.",
                   NOT_FOUND: "U kunt dit bestand niet toevoegen aan My Drive, want het bestand is gewist of het wordt niet meer met u gedeeld.",
                   ACCESS_DENIED: "U kunt dit bestand niet toevoegen aan My Drive, want het bestand is gewist of het wordt niet meer met u gedeeld."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Verwijderen uit My Drive",
                TOOLTIP: "Dit bestand verwijderen uit My Drive",
                A11Y: "Met deze knop verwijdert u het bestand uit My Drive.",
                SUCCESS: "U hebt dit bestand verwijderd uit My Drive.",
                ERROR: {
                   DEFAULT: "Er is een fout opgetreden bij het verwijderen van dit bestand uit My Drive. Probeer het later opnieuw.",
                   UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om dit bestand te verwijderen uit My Drive.",
                   NOT_FOUND: "U kunt dit bestand niet verwijderen uit My Drive, want het bestand is gewist of het wordt niet meer met u gedeeld.",
                   ACCESS_DENIED: "U kunt dit bestand niet verwijderen uit My Drive, want het bestand is gewist of het wordt niet meer met u gedeeld."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Vastzetten",
            FAVORITE_TOOLTIP: "Dit bestand vastzetten",
            FAVORITE_A11Y: "Met deze knop zet u het bestand vast.",
            FAVORITE_SUCCESS: "U hebt dit bestand vastgezet.",
            STOP_FAVORITEING_NAME: "Losmaken",
            STOP_FAVORITEING_TOOLTIP: "Dit bestand losmaken",
            STOP_FAVORITEING_A11Y: "Met deze knop maakt u het bestand los.",
            STOP_FAVORITEING_SUCCESS: "U hebt dit bestand losgemaakt."
         },
         TRASH: {
            NAME: "Verplaatsen naar prullenbak",
            DIALOG_TITLE: "Bevestigen",
            PROMPT: "Weet u zeker dat u dit bestand naar de prullenbak wilt verplaatsen? Als u dit bestand naar de prullenbak verplaatst, is het voor niemand meer beschikbaar met wie het momenteel wordt gedeeld.",
            ERROR: "Er is een fout opgetreden bij het wissen van het bestand. Probeer het later opnieuw.",
            TOOLTIP: "Dit bestand wissen",
            OK: "OK",
            CANCEL: "Annuleren",
            A11Y: "Met deze knop wordt het bestand naar de prullenbak verplaatst.",
            SUCCESS_MSG: "${file} is verplaatst naar de prullenbak."
         },
         REFRESH: {
            NAME: "Vernieuwen",
            ERROR: "Er is een fout opgetreden bij het vernieuwen van de Bestandsviewer. Probeer het later opnieuw.",
            TOOLTIP: "De Bestandsviewer vernieuwen",
            INFO_MSG: "Kies Vernieuwen om de meest recente content te laden. ${link}",
            A11Y: "Met deze knop wordt het bestand naar de prullenbak verplaatst.",
            SUCCESS_MSG: "De content is vernieuwd."
         },
         COPY_FILE: {
            NAME: "Kopie naar community",
            DIALOG_TITLE: "Bevestigen",
            ERROR: "Er is een fout opgetreden bij het kopiëren van het bestand. Probeer het later opnieuw.",
            TOOLTIP: "Kopie van dit bestand aan een community verstrekken",
            OK: "OK",
            CANCEL: "Annuleren",
            A11Y: "Met deze knop wordt er een venster geopend waarin u een kopie van dit bestand aan een community kunt verstrekken.",
            SUCCESS_MSG: "${file} is gekopieerd naar ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Eigenaarschap overdragen...",
            DIALOG_TITLE: "Eigenaarschap overdragen",
            TOOLTIP: "Verplaats dit bestand naar een nieuwe eigenaar",
            A11Y: "Met deze knop opent u een venster waarin u dit bestand aan een nieuwe eigenaar kunt verplaatsen",
            EMPTY: "Leeg"
         },
         UPLOAD_VERSION: {
            NAME: "Nieuwe versie uploaden",
            NAME_SHORT: "Uploaden",
            CHANGE_SUMMARY: "Optioneel wijzigingsoverzicht...",
            TOOLTIP: "Upload een nieuwe versie van dit bestand",
            A11Y: "Met deze knop opent u een venster waarin u een nieuwe versie van dit bestand kunt uploaden."
         },
         LOG_IN: {
            NAME: "Aanmelden",
            TOOLTIP: "Meld u aan om bestanden te delen, te reageren en mappen te maken."
         },
         LOCK: {
            NAME: "Bestand vergrendelen",
            TITLE: "Dit bestand vergrendelen",
            A11Y: "Dit bestand vergrendelen",
            SUCCESS: "Het bestand is nu vergrendeld.",
            ERROR: "Het bestand is niet vergrendeld omdat het is gewist of niet langer met u wordt gedeeld."
         },
         UNLOCK: {
            NAME: "Bestand ontgrendelen",
            TITLE: "Dit bestand ontgrendelen",
            A11Y: "Dit bestand ontgrendelen",
            SUCCESS: "Het bestand is nu ontgrendeld.",
            ERROR: "Het bestand kan niet worden ontgrendeld, want het is gewist of wordt niet langer met u gedeeld."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Bewerken op desktop",
            TITLE: "Bewerken op desktop",
            A11Y: "Bewerken op desktop"
         },
         FLAG: {
            FILE: {
               NAME: "Markeren als ongepast",
               TITLE: "Bestand markeren",
               A11Y: "Dit bestand markeren als ongepast",
               PROMPT: "Geef een reden voor het markeren van dit bestand (optioneel):",
               OK: "Markeren",
               CANCEL: "Annuleren",
               SUCCESS: "Het bestand is gemarkeerd en ingediend ter beoordeling.",
               ERROR: "Fout bij markeren van dit bestand. Probeer het later opnieuw."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Voltooid",
               PROMPT: "Het bestand is gemarkeerd en ingediend ter beoordeling.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Markeren als ongepast",
               TITLE: "Reactie markeren",
               A11Y: "Deze reactie markeren als ongepast",
               PROMPT: "Geef een reden voor het markeren van deze reactie (optioneel):",
               OK: "Markeren",
               CANCEL: "Annuleren",
               SUCCESS: "De reactie is gemarkeerd en ingediend ter beoordeling.",
               ERROR: "Fout bij markeren van deze reactie. Probeer het later opnieuw."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Voltooid",
            PROMPT: "De wijzigingen zijn ingediend ter beoordeling. Het bestand komt pas beschikbaar wanneer de wijzigingen zijn goedgekeurd.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Vervolgkeuzeknop"
      },
      SECTION: {
         ABOUT: {
            NAME: "Info over dit bestand",
            VIEW_FILE_DETAILS: "Bestandsgegevens bekijken",
            A11Y: "Activeren van deze link zal de bestandsweergave sluiten en u doorverbinden naar de pagina met informatie over dit bestand."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "Er is geen preview voor dit bestand."
         },
         IMAGE: {
            ZOOM_IN: "Inzoomen",
            ZOOM_OUT: "Uitzoomen",
            RESET: "Opnieuw instellen",
            ZOOM_IN_A11Y: "Met deze knop zoomt u in op de afbeelding.",
            ZOOM_OUT_A11Y: "Met deze knop zoomt u uit in de afbeelding.",
            RESET_ZOOM_A11Y: "Met deze knop zet u het zoomniveau terug.",
            UNSAFE_PREVIEW: "Dit bestand kan niet worden bekeken, want het is niet gescand op virussen."
         },
         VIEWER: {
            LOADING: "Laden...",
            PUBLISHING: "Bezig met publiceren...",
            NO_PUBLISHED_VERSION: "Er is geen gepubliceerde versie van dit bestand beschikbaar.",
            IFRAME_TITLE: "Preview van dit bestand",
            AUTOPUBLISH_TIMEOUT: "Het duur te lang voordat de server reageert.  Mogelijk zijn de meest recente wijzigingen niet gepubliceerd."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Dit bestand kan niet worden bekeken, want het is niet gescand op virussen."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Laatst bijgewerkt door ${user}, vandaag om ${time}",
            YESTERDAY: "Laatst bijgewerkt door ${user}, gisteren om ${time}",
            DAY: "Laatst bijgewerkt door ${user} op ${EEee} om ${time}",
            MONTH: "Laatst bijgewerkt door ${user} op ${date_long}",
            YEAR: "Laatst bijgewerkt door ${user} op ${date_long}"
         },
         CREATED: {
            TODAY: "Gemaakt door ${user}, vandaag om ${time}",
            YESTERDAY: "Gemaakt door ${user}, gisteren om ${time}",
            DAY: "Gemaakt door ${user} op ${EEee} om ${time}",
            MONTH: "Gemaakt door ${user} op ${date_long}",
            YEAR: "Gemaakt door ${user} op ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - Vandaag",
            YESTERDAY: "${time} - Gisteren",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Vandaag",
            YESTERDAY: "Gisteren",
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
         TITLE: "Tekstgebied voor reacties",
         SHADOW_TEXT: "Reactie toevoegen...",
         CANNOT_ACCESS_CONTENT: "De volgende door u vermelde personen zullen de reactie niet kunnen bekijken, want zij hebben geen toegang tot de content:",
         ERROR: "Er is een fout opgetreden bij de validatie van de gebruiker die u probeert te vermelden.",
         POST: "Posten",
         SAVE: "Opslaan",
         CANCEL: "Annuleren",
         EXTERNAL_WARNING: "Reacties zijn zichtbaar voor personen buiten uw organisatie."
      },
      EDIT_BOX: {
         SAVE: "Opslaan",
         CANCEL: {
            TOOLTIP: "Annuleren",
            A11Y: "Deze knop annuleert de actie van het bewerken van de bestandsnaam."
         },
         INVALID_CHARACTERS: "Ongeldig teken",
         INVALID_CHARACTERS_REMOVED: "Ongeldige tekens verwijderd"
      },
      COMMENT_WIDGET: {
         EDITED: "(Bewerkt)",
         EDITED_DATE: {
            TODAY: "Vandaag om ${time} bewerkt",
            YESTERDAY: "Gisteren om ${time} bewerkt",
            DAY: "Bewerkt op ${EEee} om ${time}",
            MONTH: "Bewerkt op ${date_long}",
            YEAR: "Bewerkt op ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Opslaan",
         CANCEL: "Annuleren",
         USER: "Persoon",
         COMMUNITY: "Community",
         SHARE: "Delen",
         SHARE_ALT: "Delen met deze persoon",
         MEMBER_TYPE: "Type lid",
         PERSON_SHADOW: "Typ om een persoon te vinden",
         COMMUNITY_SHADOW: "Typ om een community te vinden",
         PERSON_ARIA: "Typ de persoon die u vindt.  Druk op Shift+Tab om afwisselend personen, community's en iedereen in de organisatie te zoeken.",
         COMMUNITY_ARIA: "Typ de community die u vindt.  Druk op Shift+Tab om afwisselend personen, community's en iedereen in de organisatie te zoeken.",
         PERSON_FULL_SEARCH: "Persoon niet gevonden? Gebruik volledige zoekopties...",
         COMMUNITY_FULL_SEARCH: "Community niet gevonden? Gebruik volledige zoekopties...",
         ADD_OPTIONAL_MESSAGE: "Optioneel bericht toevoegen",
         ROLE_LABEL: "Rol",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Lezer"
      },
      FILE_STATE: {
         DOCS_FILE: "Dit is een Docs-bestand. Wijzigingen moeten online worden aangebracht.",
         LOCKED_BY_YOU: {
            TODAY: "Door u vergrendeld om ${time}.",
            YESTERDAY: "Gisteren door u vergrendeld om ${time}.",
            DAY: "Door u vergrendeld op ${date}.",
            MONTH: "Door u vergrendeld op ${date}.",
            YEAR: "Door u vergrendeld op ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Om ${time} vergrendeld door ${user}.",
            YESTERDAY: "Gisteren om ${time} vergrendeld door ${user}.",
            DAY: "Vergrendeld op ${date} door${user}.",
            MONTH: "Vergrendeld op ${date} door${user}.",
            YEAR: "Vergrendeld op ${date_long} door${user}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Deze tekst automatisch inkorten",
         COMMENT: {
            WARN_TOO_LONG: "De reactie is te lang.",
            TRIM: "Reactie inkorten?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "De beschrijving is te lang.",
            TRIM: "Beschrijving inkorten?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "Het bericht is te lang.",
            TRIM: "Bericht inkorten?"
         },
         TAG: {
            WARN_TOO_LONG: "De tag is te lang.",
            TRIM: "Tag inkorten?"
         },
         TAGS: {
            WARN_TOO_LONG: "Een of meer tags zijn te lang.",
            TRIM: "Tags inkorten?"
         },
         FILENAME: {
            WARN_TOO_LONG: "Bestandsnaam is te lang"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Dit bestand kan online worden bewerkt door personen die HCL Docs hebben.",
         NO_ENTITLEMENT_LINK: "Dit bestand kan online worden bewerkt door personen die ${startLink}HCL Docs${endLink} hebben.",
		 // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Het bestand wordt op dit moment online bewerkt door ${users}.",
         UNPUBLISHED_CHANGES: "Er zijn wijzigingen aangebracht op dit concept die niet gepubliceerd zijn als versie.",
         PUBLISH_A_VERSION: "Versie publiceren",
         PUBLISH_SUCCESS: "U hebt een versie van dit bestand gepubliceerd",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "De versie kan niet worden gepubliceerd omdat de toegang is geweigerd.",
            NOT_FOUND: "De versie kan niet worden gepubliceerd omdat het document niet is gevonden.",
            CANNOT_REACH_REPOSITORY: "De versie kan niet worden gepubliceerd omdat de Docs-server geen verbinding heeft met de bestandsrepository.",
            QUOTA_VIOLATION: "De versie kan niet worden gepubliceerd vanwege ruimtebeperkingen. Verwijder andere bestanden om voldoende ruimte beschikbaar te maken voor het publiceren van deze versie.",
            CONVERSION_UNAVAILABLE: "De versie kan niet worden gepubliceerd omdat de Docs-conversieservice niet beschikbaar is. Probeer het later opnieuw.",
            TOO_LARGE: "De versie kan niet worden gepubliceerd omdat het document te groot is.",
            CONVERSION_TIMEOUT: "De versie kan niet worden gepubliceerd omdat de Docs-conversieservice te veel tijd nodig heeft voor de conversie van het document. Probeer het later opnieuw.",
            SERVER_BUSY: "De versie kan niet worden gepubliceerd omdat de Docs-server in gebruik is. Probeer het later opnieuw.",
            DEFAULT: "De versie kan niet worden gepubliceerd omdat de Docs-service niet beschikbaar is. Probeer het later opnieuw."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Uw wijzigingen worden gepubliceerd. ${startLink}Vernieuw${endLink} om de wijzigingen af te beelden.",
            GENERIC: "Mogelijk moet u de pagina vernieuwen om de meest recente wijzigingen af te beelden.  ${startLink}Vernieuwen${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Er zijn geen reacties.",
         MODERATED: "De reactie is ingediend ter beoordeling en komt beschikbaar na goedkeuring.",
         ERROR: {
            SAVE: {
               DEFAULT: "Uw reactie is niet opgeslagen. Probeer het later opnieuw.",
               UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om uw reactie op te slaan.",
               NOT_FOUND: "Uw reactie is niet opgeslagen omdat het bestand is gewist of niet langer met u wordt gedeeld.",
               ACCESS_DENIED: "Uw reactie is niet opgeslagen omdat het bestand is gewist of niet langer met u wordt gedeeld."
            },
            DELETE: {
               DEFAULT: "Uw reactie is niet gewist. Probeer het later opnieuw.",
               UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om uw reactie te wissen.",
               NOT_FOUND: "Uw reactie is niet gewist omdat het bestand is gewist of niet langer met u wordt gedeeld.",
               ACCESS_DENIED: "Uw reactie is niet gewist omdat het bestand is gewist of niet langer met u wordt gedeeld."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Opslaan",
         EDIT_TAGS: "Tags bewerken",
         ERROR: {
            SAVE: {
               DEFAULT: "De tag kan niet worden gemaakt. Probeer het later opnieuw."
            },
            DELETE: {
               DEFAULT: "De pagina kan niet worden gewist. Probeer het later opnieuw."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Meer informatie...",
         READ_LESS: "Minder informatie..."
      },
      SHARE: {
         EVERYONE: "Iedereen binnen de organisatie",
         ADD_TOOLTIP: "Opslaan",
         ROLES: {
            OWNER: "Eigenaar",
            EDIT: "Editors",
            VIEW: "Lezers",
            FOLDER: "Gedeeld met mappen:"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Eigenaar"
            },
            EDIT: {
               ROLE: "Bewerken",
               ADD: "Editor toevoegen"
            },
            VIEW: {
               ROLE: "Lezer",
               ADD: "Lezer toevoegen"
            },
            FOLDER: {
               ADD: "Mappen toevoegen",
               COMMUNITY_ADD: "Toevoegen aan map",
               MOVE: "Verplaatsen naar map"
            },
            MULTI: {
               ADD: "Personen of community's toevoegen",
               ADD_PEOPLE: "Personen toevoegen"
            }
         },
         PUBLIC: {
            SHORT: "Iedereen binnen de organisatie",
            LONG: {
               GENERIC: "Iedereen in de organisatie",
               ORG: "Iedereen in ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Dit bestand wordt al gedeeld met ${user}.",
            ERROR: "Het is op dit moment niet mogelijk om gegevens te delen met ${user}.",
            SELF: "U kunt niet delen met uzelf."
         },
         SHARE_INFO: {
            PROMOTED: "Het niveau van de rol voor het delen van informatie van ${user} is verhoogd."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Met succes gedeeld met ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Het bestand is gedeeld."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Optioneel bericht..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Externe gebruiker configureren",
               ACTION: "Externe gebruiker configureren...",
               TOOLTIP: "Externe gebruiker configureren",
               DIALOG_TITLE: "Content is niet gedeeld",
               PROMPT: {
                  NO_ACCOUNT: "De volgende gebruiker heeft geen account. Er is daarom geen content met hem of haar gedeeld.",
                  INVITE: "Nodig deze gebruiker uit als gast om content met hem of haar te delen."
               },
               SUBMIT: "Doorgaan met uitnodiging",
               CANCEL: "Annuleren",
               ERROR: "Er is een fout opgetreden bij het configureren van het account. Probeer het later opnieuw.",
               SUCCESS: "Het gebruikersaccount is geconfigureerd."
            },
            PLURAL: {
               NAME: "Externe gebruikers configureren",
               ACTION: "Externe gebruikers configureren...",
               TOOLTIP: "Externe gebruikers configureren",
               DIALOG_TITLE: "Content is niet gedeeld",
               PROMPT: {
                  NO_ACCOUNT: "De volgende gebruikers hebben geen account. Er is daarom geen content met hen gedeeld.",
                  INVITE: "Nodig deze gebruikers uit als gast om content met hen te delen."
               },
               SUBMIT: "Doorgaan met uitnodigingen",
               CANCEL: "Annuleren",
               ERROR: "Er is een fout opgetreden bij het configureren van accounts. Probeer het later opnieuw.",
               SUCCESS: "De gebruikersaccounts zijn geconfigureerd."
            },
            ABSTRACT: {
               NAME: "Externe gebruikers configureren",
               ACTION: "Externe gebruikers configureren...",
               TOOLTIP: "Externe gebruikers configureren",
               DIALOG_TITLE: "Content is niet gedeeld",
               PROMPT: {
                  NO_ACCOUNT: "Enkele gebruikers hebben geen account. Er is daarom geen content met hen gedeeld.",
                  INVITE: "Nodig deze gebruikers uit als gast om content met hen te delen."
               },
               SUBMIT: "Doorgaan met uitnodigingen",
               CANCEL: "Annuleren",
               ERROR: "Er is een fout opgetreden bij het configureren van accounts. Probeer het later opnieuw.",
               SUCCESS: "De gebruikersaccounts zijn geconfigureerd."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Opties voor delen",
         PROPAGATION: "Andere gebruikers toestemming geven om dit bestand te delen",
         EVERYONE: "Iedereen kan dit bestand delen.",
         OWNER_ONLY: "Alleen de eigenaar kan dit bestand delen.",
         STOP_SHARE: "Delen stoppen",
         MAKE_INTERNAL: "Extern delen stoppen",
         MAKE_INTERNAL_SUCCESS: "Dit bestand kan niet meer worden gedeeld met personen buiten uw organisatie.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Intern maken?",
            PROMPT: "Het intern maken van dit bestand betekent dat het niet meer kan worden gedeeld met personen buiten uw organisatie. ${br}${br}" +
            "Alle shares met externe personen, community's of mappen worden verwijderd.${br}${br}Een bestand intern maken is definitief en kan niet ongedaan worden gemaakt.",
            EFSS: {
               DIALOG_TITLE: "Intern maken?",
               PROMPT: "Het intern maken van dit bestand betekent dat het niet meer kan worden gedeeld met personen buiten uw organisatie. ${br}${br}" +
               "Alle shares met externe personen en mappen worden verwijderd.${br}${br}Een bestand intern maken is definitief en kan niet ongedaan worden gemaakt."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Stoppen met delen van bestand",
            PROMPT: "Weet u zeker dat u wilt stoppen met het delen van dit bestand?",
            QUESTION_PUBLIC: "Het bestand is dan niet meer zichtbaar voor iedereen in uw organisatie en wordt niet meer gedeeld met personen, mappen of community's. Deze bewerking kan niet meer ongedaan worden gemaakt.",
            QUESTION_PUBLIC_E: "Het bestand is dan niet meer zichtbaar voor iedereen in uw organisatie en wordt niet meer gedeeld met personen of mappen. Deze bewerking kan niet meer ongedaan worden gemaakt.",
            QUESTION: "Het bestand dan wordt niet meer gedeeld met personen of community's, en wordt verwijderd uit alle mappen behalve uw persoonlijke mappen. Deze actie kan niet ongedaan worden gemaakt.",
            QUESTION_E: "Het bestand wordt dan niet meer gedeeld met personen en wordt verwijderd uit alle mappen, behalve uw persoonlijke mappen. Deze actie kan niet ongedaan worden gemaakt."
         },
         MAKE_PRIVATE_SUCCESS: "Dit bestand is nu persoonlijk.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Stoppen met het delen van het bestand is nu niet mogelijk. Probeer het later opnieuw."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Mijn shares"
      },
      STREAM: {
         LOADING: "Laden...",
         LOAD_MORE: "Meer laden..."
      },
      ENTRY: {
         REMOVE: "Verwijderen",
         RESTORE: "Herstellen",
         EDIT: "Bewerken",
         DELETE: "Wissen",
         OK: "OK",
         CANCEL: "Annuleren",
         USER_PICTURE: "Afbeelding van ${0}",
         FLAG: "Markeren als ongepast"
      },
      PANEL: {
         LOAD_ERROR: "Er is een fout opgetreden bij de toegang tot de metagegevens van dit bestand.",
         ABOUT: {
            TITLE: "Info",
            EXPAND_BUTTON: "Vouw deze knop uit om meer informatie te bekijken",
            CURRENT_VERSION_HEADER: "Huidige versie ${versionNumber}",
            FILE_SIZE_HEADER: "Bestandsgrootte",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Huidige versie",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Alle versies",
            DOCS_DRAFT_UPDATED_HEADER: "Concept bewerkt",
            DOCS_DRAFT_CREATED_HEADER: "Concept gemaakt",
            DOCS_UPDATED_HEADER: "Gepubliceerd",
            DOCS_CREATED_HEADER: "Gemaakt",
            UPDATED_HEADER: "Bijgewerkt",
            CREATED_HEADER: "Gemaakt",
            LIKES_HEADER: "Likes",
            LIKES_EXPAND_ICON: "Vouw dit pictogram uit om te zien wie het bestand heeft geliket",
            DOWNLOADS_HEADER: "Views",
            DOWNLOADS_HEADER_MORE: "Views (${0})",
            DOWNLOADS_EXPAND_ICON: "Vouw dit pictogram uit om te zien wie het bestand heeft bekeken",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anoniem",
            DOWNLOADS_LATEST_VERSION: "U hebt de meest recente versie van dit bestand",
            DOWNLOADS_LAST_VERSION: "De laatste keer hebt u versie ${0} van het bestand bekeken.",
            TAGS_HEADER: "Tags",
            DESCRIPTION_HEADER: "Omschrijving",
            DESCRIPTION_READ_MORE: "Meer informatie...",
            LINKS_HEADER: "Links",
            SECURITY: "Beveiliging",
            FILE_ENCRYPTED: "Het bestand is versleuteld. In versleutelde bestandscontent kan niet worden gezocht. Het bestand kan niet worden bekeken of bewerkt met HCL Docs.",
            GET_LINKS: "Links ophalen...",
            ADD_DESCRIPTION: "Beschrijving toevoegen",
            NO_DESCRIPTION: "Geen beschrijving",
            ADD_TAGS: "Tags toevoegen",
            NO_TAGS: "Geen tags"
         },
         COMMENTS: {
            TITLE: "Reacties",
            TITLE_WITH_COUNT: "Reacties (${0})",
            VERSION: "Versie ${0}",
            FEED_LINK: "Feed voor deze reacties",
            FEED_TITLE: "Volg de wijzigingen op deze reacties via uw feedlezer"
         },
         SHARING: {
            TITLE: "Delen",
            TITLE_WITH_COUNT: "Gedeeld (${0})",
            SHARED_WITH_FOLDERS: "Gedeeld met mappen - ${count}",
            SEE_WHO_HAS_SHARED: "Kijken wie gedeeld heeft",
            COMMUNITY_FILE: "Bestanden die eigendom zijn van een community, kunnen niet worden gedeeld met personen  of andere community's.",
            SHARED_WITH_COMMUNITY: "Gedeeld met leden van de community '${0}'",
            LOGIN: "Aanmelden",
            NO_SHARE: "Dit bestand is nog niet aan mappen toegevoegd.",
            ONE_SHARE: "Dit bestand bevindt zich in een map of community waartoe u geen toegang hebt.",
            MULTIPLE_SHARE: "Dit bestand bevindt zich in ${fileNumber} mappen of community's waartoe u geen toegang hebt."
         },
         VERSIONS: {
            TITLE: "Versies",
            TITLE_WITH_COUNT: "Versies (${0})",
            FEED_LINK: "Feed voor deze versies",
            FEED_TITLE: "Volg de wijzigingen van dit bestand via uw feedlezer"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Actiebevestiging",
         DIALOG_TITLE: "Bevestigen",
         PROMPT: "Weet u zeker dat u deze actie wilt uitvoeren?",
         ERROR: "Er is een fout opgetreden bij het uitvoeren van de actie. Probeer het later opnieuw.",
         TOOLTIP: "Actie uitvoeren",
         OK: "OK",
         CANCEL: "Annuleren",
         A11Y: "Met deze knop wordt de huidige actie uitgevoerd."
      },
      THUMBNAIL: {
         TITLE: "Miniatuur",
         CHANGE_LINK: "Miniatuur wijzigen...",
         ERROR: "De miniatuur kan niet worden opgeslagen. Probeer het later opnieuw.",
         EXT_ERROR: "Selecteer een bestand met een van de volgende ondersteunde extensies: ${0}",
         SUCCESS: "De miniatuur is gewijzigd",
         UPLOAD: "Opslaan",
         CANCEL: "Annuleren"
      },
      UPLOAD_VERSION: {
         LINK: "Nieuwe versie uploaden...",
         CHANGE_SUMMARY: "Optioneel wijzigingsoverzicht...",
         ERROR: "De nieuwe versie kan niet worden opgeslagen. Probeer het later opnieuw.",
         SUCCESS: "De nieuwe versie is opgeslagen",
         UPLOAD: "Uploaden",
         UPLOAD_AND_CHANGE_EXTENSION: "Extensie uploaden en wijzigen",
         CANCEL: "Annuleren",
         TOO_LARGE: "${file} is groter dan de toegestane bestandsgrootte van ${size}.",
         PROGRESS_BAR_TITLE: "Nieuwe versie wordt geüpload (${uploaded} van ${total} voltooid)",
         CANCEL_UPLOAD: "Uploaden annuleren"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Er is een fout opgetreden bij het openen van het bestand. Probeer het later opnieuw.",
         UNAUTHENTICATED: "Er is een timeout opgetreden voor uw sessie. Meld u opnieuw aan om het bestand te bekijken.",
         NOT_FOUND: "Het gevraagde bestand is gewist of verplaatst. Als u deze link van iemand hebt ontvangen, controleer dan of deze juist is.",
         ACCESS_DENIED: "U bent niet gemachtigd om dit bestand te bekijken. Het bestand wordt niet met u gedeeld.",
         ACCESS_DENIED_ANON: "U bent niet gemachtigd om dit bestand te bekijken. Als het bestand van u is of als het door u is gedeeld, moet u zich eerst aanmelden."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Fout",
         PROMPT: "Het gevraagde bestand is gewist of verplaatst.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Bevestigen",
        PROMPT: "De HCL Connections-sessie is verlopen.${lineBreaks}Kies OK om u weer aan te melden, of Annuleren om het venster te sluiten.",
        OK: "OK",
        CANCEL: "Annuleren"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Geen toegang tot link",
        PROMPT: "Er is iets misgegaan bij het openen van de link.${lineBreaks}Kies OK om naar de pagina te worden doorgeleid.",
        OK: "OK",
        CANCEL: "Annuleren"
      },
      LOAD_ERROR: {
         DEFAULT: "Helaas. Er is een fout opgetreden bij het openen van de link.",
         ACCESS_DENIED: "Neem contact op met de eigenaar van het bestand en vraag deze om toestemming om het bestand te bekijken."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Bestand",
         LOAD_ERROR: "Fout bij openen van bestand"
      },
      SHARE_WITH_LINK: {
         TITLE: "Delen via link",
         EMPTY_DESCRIPTION: "U hebt nog geen link gemaakt voor dit bestand. Maak een gedeelde link die u naar anderen kunt versturen, zodat zij een preview van het bestand kunnen bekijken en het bestand kunnen downloaden.",
         CREATE_LINK: "Link maken",
         COPY_LINK: "Link kopiëren",
         DELETE_LINK: "Link wissen",
         ACCESS_TYPE_1: "Iedereen die de link heeft, kan dit bestand bekijken",
         ACCESS_TYPE_2: "Personen in mijn organisatie kunnen dit bestand bekijken",
         ACCESS_TYPE_1_DESCRIPTION: "Personen die de link ontvangen, kunnen dit bestand vooraf bekijken en downloaden nadat ze zich hebben aangemeld bij Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Personen in mijn organisatie die de link ontvangen, kunnen dit bestand vooraf bekijken en downloaden nadat ze zich hebben aangemeld bij Connections.",
         CHANGE_TYPE_SUCCESS: "Linkmachtiging wordt bijgewerkt als het toegangstype wordt gewijzigd.",
         CHANGE_TYPE_ERROR: "Bijwerken van linkmachtiging is mislukt toen het toegangstype werd gewijzigd.",
         COPY_LINK_SUCCESS: "Link gekopieerd naar klembord",
         CREATE_SHARELINK_SUCCESS:"Link is gemaakt.",
         CREATE_SHARELINK_ERROR:"Wegens een fout kan er geen link worden gemaakt.",
         DELETE_SHARELINK_SUCCESS: "Gedeelde link voor \"${file}\" is gewist.",
         DELETE_SHARELINK_ERROR: "De gedeelde link is niet gewist. Probeer het later opnieuw.",
         CONFIRM_DIALOG: {
            OK: "Wissen",
            DIALOG_TITLE: "Gedeelde link wissen",
            PROMPT: "Dit bestand wordt ontoegankelijk voor personen die de link gebruiken. Weet u zeker dat u de gedeelde link wilt wissen?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Gedeelde link is actief. Iedereen die de link heeft, kan dit bestand bekijken. Klik hier om deze link te kopiëren.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Gedeelde link is actief. Personen in mijn organisatie kunnen dit bestand bekijken. Klik hier om deze link te kopiëren."
      }
});
