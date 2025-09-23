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
     FILE_VIEWER_TITLE: "Dateivorschau",
     FILENAME_TOOLTIP: "Dateiname bearbeiten",
     ICON_TOOLTIP: "Datei herunterladen",
     ERROR: "Es ist ein Fehler aufgetreten. ",
     SHARED_EXTERNALLY: "Extern geteilt",
     FILE_SYNCED: "Zu Synchronisation hinzugefügt",
     MORE_ACTIONS: {
       TITLE: "Weitere Aktionen",
       A11Y: "Öffnet ein Dropdown-Menü mit einer Liste mit weiteren Aktionen, die für diese Datei ausgeführt werden können."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Mehr Optionen",
         A11Y: "Über diese Schaltfläche wird ein Menü für weitere Optionen geöffnet."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Bearbeiten"
         },
         UPLOAD: {
           TITLE: "Hochladen"
         }
       }
     },
     WELCOME: {
       TITLE: "Dateiansicht und Details wurden kombiniert",
       SUBTITLE: "Nun können Sie eine Datei und die zugehörigen Kommentare gleichzeitig anzeigen.",
       LINES: {
          LINE_1: "Alle Informationen und Aktionen der alten Seite finden Sie nun hier.",
          LINE_2: "Kommentare, Teilen, Versionen und grundlegende Informationen sind neben der jeweiligen Datei verfügbar."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Über diese Schaltfläche navigieren Sie zur nächsten Datei.",
      PREVIOUS_A11Y: "Über diese Schaltfläche navigieren Sie zur vorherigen Datei. "
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Schließen",
         A11Y: "Über diese Schaltfläche wird die Dateianzeigefunktion geschlossen."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Neu aus Datei",
         ACTION_NAME:"Datei erstellen",
         A11Y: {
           TEXT: "Erstellen Sie ein Dokument (DOC-, DOCX- oder ODT-Datei) aus einer Vorlagendatei. Sie können diese Dokumente online in Docs bearbeiten.",
           PRES: "Erstellen Sie eine Präsentation (PPT-, PPTX- oder ODP-Datei) aus einer Vorlagendatei. Sie können diese Präsentationen online in Docs bearbeiten.",
           SHEET: "Erstellen Sie eine Kalkulationstabelle (XLS-, XLSX- oder ODS-Datei) aus einer Vorlagendatei. Sie können diese Kalkulationstabellen online in Docs bearbeiten."
         },
         PROMPT: {
           TEXT: "Erstellen Sie ein Dokument (DOC-, DOCX- oder ODT-Datei) aus einer Vorlagendatei. Sie können diese Dokumente online in Docs bearbeiten.",
           PRES: "Erstellen Sie eine Präsentation (PPT-, PPTX- oder ODP-Datei) aus einer Vorlagendatei. Sie können diese Präsentationen online in Docs bearbeiten.",
           SHEET: "Erstellen Sie eine Kalkulationstabelle (XLS-, XLSX- oder ODS-Datei) aus einer Vorlagendatei. Sie können diese Kalkulationstabellen online in Docs bearbeiten."
         },
         NAME_FIELD: "Name: ",
         EXTERNAL_FIELD: "Die Dateien können mit Personen außerhalb des Unternehmens geteilt werden",
         EXTERNAL_DESC: "Beim externen Zugriff können Dateien mit externen Benutzern (Personen außerhalb Ihres Unternehmens), mit von externen Benutzern aufrufbaren Ordnern und mit Communitys mit externen Personen als Mitgliedern geteilt werden. Sie müssen den externen Zugriff beim Hochladen einer Datei festlegen; er kann nicht nachträglich aktiviert werden.",
         CREATE_BUTTON: "Erstellen",
         CANCEL: "Abbrechen",
         PRE_FILL_NAMES: {
           OTT: "Nicht benanntes Dokument",
           OTS: "Nicht benannte Kalkulationstabelle",
           OTP: "Nicht benannte Präsentation",
           DOT: "Nicht benanntes Dokument",
           XLT: "Nicht benannte Kalkulationstabelle",
           POT: "Nicht benannte Präsentation",
           DOTX: "Nicht benanntes Dokument",
           XLTX: "Nicht benannte Kalkulationstabelle",
           POTX: "Nicht benannte Präsentation"
         },
         ERRORS: {
           NAME_REQUIRED: "Der Dokumentname ist erforderlich.",
           ILLEGAL_NAME:"Dies ist ein unzulässiger Dokumenttitel; geben Sie einen anderen an.",
           WARN_LONG_NAME: "Der Dokumentname ist zu lang.",
           TRIM_NAME: "Dokumentname kürzen?",
           SESSION_TIMEOUT: "Ihre Sitzung ist abgelaufen. Melden Sie sich an und versuchen Sie es erneut.",
           DUPLICATE_NAME: "Es wurde ein doppelt vorhandener Dateiname gefunden. Geben Sie einen neuen Namen ein.",
           SERVER_ERROR: "Der Connections-Server ist nicht verfügbar. Wenden Sie sich an den Serveradministrator und versuchen Sie es später erneut."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Datei herunterladen",
         A11Y: "Über diese Schaltfläche wird die Datei heruntergeladen. "
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Als PDF herunterladen",
         TOOLTIP: "Diese Datei als PDF-Datei herunterladen",
         A11Y: "Über diese Schaltfläche wird die Datei als PDF heruntergeladen.",
         SUCCESS: "Sie haben die Datei erfolgreich PDF heruntergeladen.",
         ERROR: {
           DEFAULT: "Die Datei konnte nicht als PDF heruntergeladen werden. Versuchen Sie es später erneut.",
           UNAUTHENTICATED: "Das zulässige Zeitlimit für Ihre Sitzung ist abgelaufen. Sie müssen sich erneut anmelden, bevor Sie die Datei als PDF herunterladen können.",
           NOT_FOUND: "Die Datei konnte nicht als PDF heruntergeladen werden, weil die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird.",
           ACCESS_DENIED: "Die Datei konnte nicht als PDF heruntergeladen werden, weil die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Es ist keine veröffentlichte Version dieser Datei zum Herunterladen vorhanden. Versionen können über den Docs-Editor veröffentlicht werden."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Datei kann nicht heruntergeladen werden",
           CANCEL: "Schließen",
           PROMPT: "Es ist keine veröffentlichte Version dieser Datei zum Herunterladen vorhanden.",
           PROMPT2: "Versionen können über den Docs-Editor veröffentlicht werden."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Datei kann nicht heruntergeladen werden",
           CANCEL: "Schließen",
           PROMPT: "Es ist keine veröffentlichte Version dieser Datei zum Herunterladen vorhanden.",
           PROMPT2: "Bitten Sie den Dateieigentümer, eine Version dieser Datei zu veröffentlichen."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Eine Version herunterladen",
           OK: "Version herunterladen",
           PROMPT: {
             TODAY: "Ein neuerer Entwurf, zuletzt bearbeitet heute um ${time}, wurde gefunden.",
             YESTERDAY: "Ein neuerer Entwurf, zuletzt bearbeitet gestern um ${time}, wurde gefunden.",
             DAY: "Ein neuerer Entwurf, zuletzt bearbeitet am ${date}, wurde gefunden.",
             MONTH: "Ein neuerer Entwurf, zuletzt bearbeitet am ${date}, wurde gefunden.",
             YEAR: "Ein neuerer Entwurf, zuletzt bearbeitet am ${date_long}, wurde gefunden."
           },
           PROMPT2: {
             TODAY: "Möchten Sie wirklich mit dem Herunterladen der Version fortfahren, die heute um ${time} veröffentlicht wurde?",
             YESTERDAY: "Möchten Sie wirklich mit dem Herunterladen der Version fortfahren, die gestern um ${time} veröffentlicht wurde?",
             DAY: "Möchten Sie wirklich mit dem Herunterladen der Version fortfahren, die am ${date} veröffentlicht wurde?",
             MONTH: "Möchten Sie wirklich mit dem Herunterladen der Version fortfahren, die am ${date} veröffentlicht wurde?",
             YEAR: "Möchten Sie wirklich mit dem Herunterladen der Version fortfahren, die am ${date_long} veröffentlicht wurde?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Detailanzeige einblenden",
         HIDE: "Detailanzeige ausblenden",
         SHOW_A11Y: "Über diese Schaltfläche wechseln Sie zwischen geöffneter und geschlossener seitlicher Anzeige. Die seitliche Anzeige ist derzeit geschlossen.",
         HIDE_A11Y: "Über diese Schaltfläche wechseln Sie zwischen geöffneter und geschlossener seitlicher Anzeige. Die seitliche Anzeige ist derzeit geöffnet."
       },
       VIEW_DOC: {
         NAME: "In Docs Viewer öffnen",
         TOOLTIP: "In Docs Viewer öffnen",
         A11Y: "Über diese Schaltfläche können Sie die Datei zum Anzeigen in einem neuen Browserfenster öffnen. "
       },
       EDIT_DOC: {
         NAME: "In Docs bearbeiten",
         TOOLTIP: "Datei in Docs bearbeiten",
         A11Y: "Über diese Schaltfläche können Sie die Datei zum Bearbeiten in einem neuen Fenster in Docs öffnen."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Auf Desktop bearbeiten ",
         DIALOG_TITLE: "Auf Desktop bearbeiten ",
         TOOLTIP: "Dieses Dokument bearbeiten ",
         A11Y: "Über diese Schaltfläche wird die Datei zum lokalen Bearbeiten geöffnet. ",
         PROMPT: "Mit dieser Funktion können Sie die Datei lokal bearbeiten. ",
         IMPORTANT: "Wichtig: ",
         REMINDER: "Sobald Sie mit der Bearbeitung fertig sind, müssen Sie mithilfe der Desktopdateiconnectors einen Entwurf veröffentlichen. Wenn die Datei nicht geöffnet werden kann, müssen Sie möglicherweise die Desktop-Plug-ins installieren. ",
         SKIP_DIALOG: "Diese Nachricht nicht mehr anzeigen. ",
         OK: "OK",
         CANCEL: "Abbrechen"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Bestätigen",
         DELETE_VERSION: "Version ${version} löschen ",
         DELETE_VERSION_AND_PRIOR: "Version ${version} und alle älteren Versionen löschen",
         PROMPT: "Sie sind dabei, Version ${version} zu löschen. Möchten Sie fortfahren? ",
         DELETE_PRIOR: "Auch alle älteren Versionen löschen",
         ERROR: "Beim Löschen der Version ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         TOOLTIP: "Diese Version löschen",
         OK: "OK",
         CANCEL: "Abbrechen"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Links abrufen",
         LINK_FILE: "Link zu Datei: ",
         LINK_PREVIEW: "Link zu Vorschaudatei: ",
         LINK_DOWNLOAD: "Link zu Downloaddatei:",
         TOOLTIP: "Link zu Datei",
         OK: "Schließen"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Diese Version herunterladen"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Bestätigen",
         PROMPT: "Sie sind dabei, die aktuelle Version dieser Datei durch Version ${version} zu ersetzen. Möchten Sie fortfahren? ",
         ERROR: "Beim Wiederherstellen der Version ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         TOOLTIP: "Diese Version wiederherstellen",
         CHANGE_SUMMARY: "Wiederhergestellt aus Version ${version}",
         OK: "OK",
         CANCEL: "Abbrechen"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Bestätigen",
         REMOVE_EVERYONE: "Möchten Sie den Zugriff Ihres Unternehmens auf diese Datei wirklich beenden? Wenn der Zugriff beendet wird, wird die Datei aus den Ordnern und Communitys entfernt, die Zugriff auf Unternehmensebene ermöglichen, und nur der Eigentümer und Personen, mit denen die Datei geteilt wurde, können sie anzeigen und mit ihr arbeiten.",
         REMOVE_USER: "Möchten Sie wirklich nicht mehr mit ${user} teilen? Wenn Sie das Teilen beenden, kann ${user} nur über Ordner auf diese Datei zugreifen oder dann, wenn sie mit allen Personen in Ihrem Unternehmen geteilt wird.",
         REMOVE_COMMUNITY: "Möchten Sie diese Datei wirklich aus Community ${communityName} entfernen?",
         REMOVE_FOLDER: "Möchten Sie diese Datei wirklich aus dem Ordner ${folderName} entfernen?",
         REMOVE_EVERYONE_TOOLTIP: "Den Zugriff Ihres Unternehmens beenden",
         REMOVE_USER_TOOLTIP: "Teilen mit ${user} komplett beenden",
         REMOVE_COMMUNITY_TOOLTIP: "Aus Community ${communityName} entfernen",
         REMOVE_FOLDER_TOOLTIP: "Aus dem Ordner ${folderName} entfernen",
         OK: "OK",
         CANCEL: "Abbrechen"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Diesen Kommentar bearbeiten"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Bestätigen",
         PROMPT: "Möchten Sie diesen Kommentar wirklich löschen?",
         ERROR: "Beim Löschen des Kommentars ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         TOOLTIP: "Diesen Kommentar löschen",
         OK: "OK",
         CANCEL: "Abbrechen"
       },
       LIKE: {
         LIKE: "Datei empfehlen",
         UNLIKE: "Empfehlung für Datei aufheben",
         LIKE_A11Y: "Über diese Schaltfläche wird die Datei empfohlen. ",
         UNLIKE_A11Y: "Über diese Schaltfläche wird die Empfehlung für die Datei aufgehoben. ",
         LIKED_SUCCESS: "Sie haben diese Datei empfohlen",
         UNLIKE_SUCCESS: "Sie haben die Empfehlung für diese Datei entfernt"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Beschreibung bearbeiten",
         ERROR: {
           DEFAULT: "Die Beschreibung konnte nicht gespeichert werden. Versuchen Sie es später erneut.",
           UNAUTHENTICATED: "Das zulässige Zeitlimit für Ihre Sitzung ist abgelaufen. Sie müssen sich erneut anmelden, bevor Sie die Beschreibung aktualisieren können.",
           NOT_FOUND: "Die Beschreibung konnte nicht gespeichert werden, weil die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird.",
           ACCESS_DENIED: "Die Beschreibung konnte nicht gespeichert werden, weil die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Fehler beim Speichern des Dateinamens",
           CONFLICT: "Dateiname ist bereits vorhanden"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Beim Folgen dieser Datei ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
             UNAUTHENTICATED: "Das zulässige Zeitlimit für Ihre Sitzung ist abgelaufen. Sie müssen sich erneut anmelden, bevor Sie dieser Datei folgen können.",
             NOT_FOUND: "Sie können dieser Datei nicht folgen, da die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird.",
             ACCESS_DENIED: "Sie können dieser Datei nicht folgen, da die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird."
           },
           UNFOLLOW: {
             DEFAULT: "Beim Entfernen des Folgens dieser Datei ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
             UNAUTHENTICATED: "Das zulässige Zeitlimit für Ihre Sitzung ist abgelaufen. Sie müssen sich erneut anmelden, bevor Sie das Folgen dieser Datei stoppen können.",
             NOT_FOUND: "Sie können das Folgen dieser Datei nicht stoppen, da die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird.",
             ACCESS_DENIED: "Sie können das Folgen dieser Datei nicht stoppen, da die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird."
           }
         },
         FOLLOW_NAME: "Folgen",
         FOLLOW_TOOLTIP: "Folgen Sie dieser Datei",
         FOLLOW_A11Y: "Über diese Schaltfläche wird der Datei gefolgt.",
         FOLLOW_SUCCESS: "Sie folgen jetzt dieser Datei.",
         STOP_FOLLOWING_NAME: "Nicht mehr folgen",
         STOP_FOLLOWING_TOOLTIP: "Dieser Datei nicht mehr folgen",
         STOP_FOLLOWING_A11Y: "Über diese Schaltfläche wird das Folgen der Datei gestoppt.",
         STOP_FOLLOWING_SUCCESS: "Sie folgen dieser Datei nicht mehr."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Zu 'Synchronisation' hinzufügen",
           TOOLTIP: "Diese Datei zu 'Synchronisation' hinzufügen",
           A11Y: "Über diese Schaltfläche wird die Datei zu 'Synchronisation' hinzugefügt.",
           SUCCESS: "Sie haben diese Datei zu 'Synchronisation' hinzugefügt.",
           ERROR: {
             DEFAULT: "Beim Hinzufügen dieser Datei zu 'Synchronisation' ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
             UNAUTHENTICATED: "Das zulässige Zeitlimit für Ihre Sitzung ist abgelaufen. Sie müssen sich erneut anmelden, bevor Sie diese Datei zu 'Synchronisation' hinzufügen können.",
             NOT_FOUND: "Sie können diese Datei nicht zu 'Synchronisation' hinzufügen, da die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird.",
             ACCESS_DENIED: "Sie können diese Datei nicht zu 'Synchronisation' hinzufügen, da die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird."
           }
         },
         STOP_SYNC: {
           NAME: "Aus 'Synchronisation' entfernen",
           TOOLTIP: "Diese Datei aus 'Synchronisation' entfernen",
           A11Y: "Über diese Schaltfläche wird die Datei aus 'Synchronisation' entfernt.",
           SUCCESS: "Sie haben diese Datei aus 'Synchronisation' entfernt.",
           ERROR: {
             DEFAULT: "Beim Entfernen dieser Datei aus 'Synchronisation' ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
             UNAUTHENTICATED: "Das zulässige Zeitlimit für Ihre Sitzung ist abgelaufen. Sie müssen sich erneut anmelden, bevor Sie diese Datei aus 'Synchronisation' entfernen können.",
             NOT_FOUND: "Sie können diese Datei nicht aus 'Synchronisation' entfernen, da die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird.",
             ACCESS_DENIED: "Sie können diese Datei nicht aus 'Synchronisation' entfernen, da die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Pinnen",
          FAVORITE_TOOLTIP: "Diese Datei pinnen",
          FAVORITE_A11Y: "Über diese Schaltfläche wird die Datei gepinnt.",
          FAVORITE_SUCCESS: "Sie haben diese Datei gepinnt.",
          STOP_FAVORITEING_NAME: "Abpinnen",
          STOP_FAVORITEING_TOOLTIP: "Diese Datei abpinnen",
          STOP_FAVORITEING_A11Y: "Über diese Schaltfläche wird die Datei abgepinnt.",
          STOP_FAVORITEING_SUCCESS: "Sie haben diese Datei abgepinnt."
       },
       TRASH: {
         NAME: "In Papierkorb verschieben",
         DIALOG_TITLE: "Bestätigen",
         PROMPT: "Möchten Sie diese Datei wirklich in den Papierkorb verschieben? Wenn diese Datei in den Papierkorb verschoben wird, ist sie für niemanden, mit dem sie jetzt geteilt wird, mehr verfügbar.",
         ERROR: "Beim Löschen der Datei ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         TOOLTIP: "Diese Datei löschen",
         OK: "OK",
         CANCEL: "Abbrechen",
         A11Y: "Über diese Schaltfläche wird die Datei in den Papierkorb verschoben.",
         SUCCESS_MSG: "${file} wurde in den Papierkorb verschoben."
       },
       REFRESH: {
         NAME: "Aktualisieren ",
         ERROR: "Beim Aktualisieren der Dateianzeigefunktion ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         TOOLTIP: "Dateianzeigefunktion aktualisieren",
         INFO_MSG: "Aktualisieren, um den neuesten Inhalt anzuzeigen. ${link}",
         A11Y: "Über diese Schaltfläche wird die Datei in den Papierkorb verschoben.",
         SUCCESS_MSG: "Der Inhalt wurde erfolgreich aktualisiert."
       },
       COPY_FILE: {
         NAME: "Kopie an Community übergeben",
         DIALOG_TITLE: "Bestätigen",
         ERROR: "Beim Kopieren der Datei ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
         TOOLTIP: "Eine Kopie dieser Datei an eine Community übergeben",
         OK: "OK",
         CANCEL: "Abbrechen",
         A11Y: "Über diese Schaltfläche wird ein Dialogfenster geöffnet, über das Sie eine Kopie dieser Datei an eine Community übergeben können.",
         SUCCESS_MSG: "${file} wurde in ${community} kopiert."
       },
       UPLOAD_VERSION: {
         NAME: "Neue Version hochladen",
         NAME_SHORT: "Hochladen",
         CHANGE_SUMMARY: "Optionale Änderungsübersicht...",
         TOOLTIP: "Neue Version dieser Datei hochladen",
         A11Y: "Über diese Schaltfläche wird ein Dialogfenster geöffnet, über das Sie eine neue Version dieser Datei hochladen können."
       },
       LOG_IN: {
    	   NAME: "Anmelden",
    	   TOOLTIP: "Melden Sie sich an, um Dateien hochzuladen und freizugeben, Kommentare einzugeben und Ordner zu erstellen"
       },
       LOCK: {
          NAME: "Datei sperren",
          TITLE: "Diese Datei sperren",
          A11Y: "Diese Datei sperren",
          SUCCESS: "Die Datei ist nun gesperrt."
       },
       UNLOCK: {
          NAME: "Datei entsperren",
          TITLE: "Diese Datei entsperren",
          A11Y: "Diese Datei entsperren",
          SUCCESS: "Diese Datei ist nun entsperrt."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Auf Desktop bearbeiten",
          TITLE: "Auf Desktop bearbeiten",
          A11Y: "Auf Desktop bearbeiten"
       },
       FLAG: {
         FILE: {
           NAME: "Als unzulässig markieren",
           TITLE: "Datei markieren",
           A11Y: "Diese Datei als unzulässig markieren",
           PROMPT: "Geben Sie einen Grund für das Markieren dieser Datei an (optional):",
           OK: "Flag",
           CANCEL: "Abbrechen",
           SUCCESS: "Die Datei wurde markiert und zur Überprüfung übergeben.",
           ERROR: "Fehler beim Markieren dieser Datei. Versuchen Sie es später erneut."
         },
         COMMENT: {
           NAME: "Als unzulässig markieren",
           TITLE: "Kommentar markieren",
           A11Y: "Diesen Kommentar als unzulässig markieren",
           PROMPT: "Geben Sie einen Grund für das Markieren dieses Kommentars an (optional):",
           OK: "Flag",
           CANCEL: "Abbrechen",
           SUCCESS: "Der Kommentar wurde markiert und zur Überprüfung übergeben.",
           ERROR: "Fehler beim Markieren dieses Kommentars. Versuchen Sie es später erneut."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Über diese Datei",
       VIEW_FILE_DETAILS: "Dateidetails anzeigen",
       A11Y: "Durch Aktivieren dieses Links wird die Dateianzeigefunktion geschlossen und Sie gelangen zur Seite mit den Dateidetails für diese Datei. "
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Für diese Datei ist keine Vorschau verfügbar."
      },
      IMAGE: {
       ZOOM_IN: "Vergrößern ",
       ZOOM_OUT: "Verkleinern ",
       RESET: "Zurücksetzen",
       ZOOM_IN_A11Y: "Über diese Schaltfläche wird das Bild vergrößert.",
       ZOOM_OUT_A11Y: "Über diese Schaltfläche wird das Bild verkleinert. ",
       RESET_ZOOM_A11Y: "Über diese Schaltfläche wird die Zoomstufe zurückgesetzt. "
      },
      VIEWER: {
       LOADING: "Ladevorgang läuft...",
       NO_PUBLISHED_VERSION: "Eine veröffentlichte Version dieser Datei ist zum Anzeigen nicht verfügbar.",
       IFRAME_TITLE: "Vorschau dieser Datei"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Zuletzt aktualisiert von ${user} heute um ${time}",
       YESTERDAY: "Zuletzt aktualisiert von ${user} gestern um ${time}",
       DAY: "Zuletzt aktualisiert von ${user} am ${EEee} um ${time}",
       MONTH: "Zuletzt aktualisiert von ${user} am ${date_long}",
       YEAR: "Zuletzt aktualisiert von ${user} am ${date_long}"
      },
      CREATED: {
       TODAY: "Erstellt von ${user} heute um ${time}",
       YESTERDAY: "Erstellt von ${user} gestern um ${time}",
       DAY: "Erstellt von ${user} am ${EEee} um ${time}",
       MONTH: "Erstellt von ${user} am ${date_long}",
       YEAR: "Erstellt von ${user} am ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - Heute",
       YESTERDAY: "${time} - Gestern",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "Heute",
       YESTERDAY: "Gestern",
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
       TITLE: "Kommentartextbereich",
       SHADOW_TEXT: "Kommentar hinzufügen...",
       CANNOT_ACCESS_CONTENT: "Die folgenden von Ihnen erwähnten Personen können den Kommentar nicht anzeigen, weil sie keinen Zugriff auf den Inhalt haben: ",
       ERROR: "Beim Überprüfen des Benutzers, den Sie versuchten zu erwähnen, ist ein Fehler aufgetreten. ",
       POST: "Veröffentlichen ",
       SAVE: "Speichern",
       CANCEL: "Abbrechen",
       EXTERNAL_WARNING: "Kommentare könnten von Personen außerhalb Ihres Unternehmens angezeigt werden. "
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Abbrechen",
         A11Y: "Über diese Schaltfläche wird die Aktion zum Bearbeiten des Dateinamens abgebrochen."
       },
       INVALID_CHARACTERS: "Ungültiges Zeichen",
       INVALID_CHARACTERS_REMOVED: "Ungültige Zeichen entfernt"
     },
     COMMENT_WIDGET: {
       EDITED: "(Bearbeitet)",
       EDITED_DATE: {
         TODAY: "Bearbeitet heute um ${time} ",
         YESTERDAY: "Bearbeitet gestern um ${time}",
         DAY: "Bearbeitet am ${EEee} um ${time}",
         MONTH: "Bearbeitet am ${date_long} ",
         YEAR: "Bearbeitet am ${date_long} "
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Speichern",
       CANCEL: "Abbrechen",
       USER: "Benutzer ",
       COMMUNITY: "Community ",
       SHARE: "Teilen ",
       SHARE_ALT: "Mit diesem Benutzer teilen",
       MEMBER_TYPE: "Mitgliedstyp",
       PERSON_SHADOW: "Suchbegriff für Person eingeben",
       COMMUNITY_SHADOW: "Suchbegriff für Community eingeben",
       PERSON_FULL_SEARCH: "Person nicht aufgeführt? Vollständige Suche verwenden...",
       COMMUNITY_FULL_SEARCH: "Community nicht aufgelistet? Vollständige Suche verwenden...",
       ADD_OPTIONAL_MESSAGE: "Optionale Nachricht hinzufügen",
       ROLE_LABEL: "Rolle ",
       ROLE_EDIT: "Bearbeiter",
       ROLE_VIEW: "Leser"
     },
     FILE_STATE: {
       DOCS_FILE: "Dies ist eine Docs-Datei. Alle Bearbeitungen müssen online erfolgen.",
       LOCKED_BY_YOU: {
         TODAY: "Gesperrt von Ihnen um ${time}.",
         YESTERDAY: "Gesperrt von Ihnen gestern um ${time}.",
         DAY: "Gesperrt von Ihnen am ${date}.",
         MONTH: "Gesperrt von Ihnen am ${date}.",
         YEAR: "Gesperrt von Ihnen am ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Gesperrt um ${time} von ${user}.",
         YESTERDAY: "Gesperrt gestern um ${time} von ${user}.",
         DAY: "Gesperrt am ${date} von ${user}.",
         MONTH: "Gesperrt am ${date} von ${user}.",
         YEAR: "Gesperrt am ${date_long} von ${user}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Der Kommentar ist zu lang. ",
         TRIM: "Kommentar kürzen?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Die Beschreibung ist zu lang.",
         TRIM: "Beschreibung kürzen?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Die Nachricht ist zu lang.",
         TRIM: "Nachricht kürzen?"
       },
       TAG: {
         WARN_TOO_LONG: "Der Tag ist zu lang.",
         TRIM: "Tag kürzen?"
       },
       TAGS: {
         WARN_TOO_LONG: "Mindestens ein Tag ist zu lang. ",
         TRIM: "Tags kürzen?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Dateiname zu lang"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Diese Datei ist nur für die Onlinebearbeitung verfügbar, wenn Sie die Docs-Berechtigung bezogen haben.",
       CURRENT_EDITORS: "Diese Datei wird zurzeit von ${users} im Web bearbeitet.",
       UNPUBLISHED_CHANGES: "Es liegen Bearbeitungen an diesem Entwurf vor, die nicht als Version veröffentlicht wurden.",
       PUBLISH_A_VERSION: "Eine Version veröffentlichen",
       PUBLISH_SUCCESS: "Sie haben erfolgreich eine Version dieser Datei veröffentlicht",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Die Version konnte nicht veröffentlicht werden, da der Zugriff verweigert wurde.",
         NOT_FOUND: "Die Version konnte nicht veröffentlicht werden, da das Dokument nicht gefunden wurde.",
         CANNOT_REACH_REPOSITORY: "Die Version konnte nicht veröffentlicht werden, da der Docs-Server keine Verbindung zum Dateirepository herstellen kann.",
         QUOTA_VIOLATION: "Die Version konnte aufgrund von Speicherplatzeinschränkungen nicht veröffentlicht werden. Entfernen Sie andere Dateien, um diese Version zu veröffentlichen.",
         CONVERSION_UNAVAILABLE: "Die Version konnte nicht veröffentlicht werden, da der Docs-Konvertierungsservice nicht verfügbar ist. Versuchen Sie es später erneut.",
         TOO_LARGE: "Die Version konnte nicht veröffentlicht werden, da das Dokument zu groß ist.",
         CONVERSION_TIMEOUT: "Die Version konnte nicht veröffentlicht werden, da der Docs-Konvertierungsservice für die Konvertierung des Dokuments zu viel Zeit benötigt. Versuchen Sie es später erneut.",
         SERVER_BUSY: "Die Version konnte nicht veröffentlicht werden, da der Docs-Server belegt ist. Versuchen Sie es später erneut.",
         DEFAULT: "Die Version konnte nicht veröffentlicht werden, da der Docs-Service nicht verfügbar ist. Versuchen Sie es später erneut."
       }
     },
     COMMENTS: {
       EMPTY: "Es sind keine Kommentare vorhanden.",
       MODERATED: "Der Kommentar wurde zur Überprüfung übergeben und steht nach der Genehmigung zur Verfügung.",
       ERROR: {
         SAVE: {
           DEFAULT: "Ihr Kommentar konnte nicht gespeichert werden. Versuchen Sie es später erneut.",
           UNAUTHENTICATED: "Das zulässige Zeitlimit für Ihre Sitzung ist abgelaufen. Sie müssen sich erneut anmelden, um den Kommentar speichern zu können. ",
           NOT_FOUND: "Ihr Kommentar konnte nicht gespeichert werden, weil die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird. ",
           ACCESS_DENIED: "Ihr Kommentar konnte nicht gespeichert werden, weil die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird. "
         },
         DELETE: {
           DEFAULT: "Ihr Kommentar konnte nicht gelöscht werden. Versuchen Sie es später erneut.",
           UNAUTHENTICATED: "Das zulässige Zeitlimit für Ihre Sitzung ist abgelaufen. Sie müssen sich erneut anmelden, um den Kommentar löschen zu können. ",
           NOT_FOUND: "Ihr Kommentar konnte nicht gelöscht werden, weil die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird. ",
           ACCESS_DENIED: "Ihr Kommentar konnte nicht gelöscht werden, weil die Datei gelöscht wurde oder nicht mehr mit Ihnen geteilt wird. "
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Speichern",
       EDIT_TAGS: "Tags bearbeiten",
       ERROR: {
         SAVE: {
           DEFAULT: "Der Tag konnte nicht erstellt werden.  Versuchen Sie es später erneut."
         },
         DELETE: {
           DEFAULT: "Der Tag konnte nicht gelöscht werden. Versuchen Sie es später erneut."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Mehr anzeigen...",
       READ_LESS: "Weniger anzeigen..."
     },
     SHARE: {
	     EVERYONE: "Jeder in meinem Unternehmen",
	     ADD_TOOLTIP: "Speichern",
	     ROLES: {
	       OWNER: "Eigentümer",
	       EDIT: "Bearbeiter ",
	       VIEW: "Leser ",
	       FOLDER: "Geteilt mit Ordnern"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Eigentümer"
	       },
	       EDIT: {
	         ROLE: "Bearbeiten",
           ADD: "Bearbeiter hinzufügen"
	       },
	       VIEW: {
	         ROLE: "Leser",
           ADD: "Leser hinzufügen "
	       },
	       FOLDER: {
           ADD: "Ordner hinzufügen ",
           COMMUNITY_ADD: "Zu Ordner hinzufügen",
           MOVE: "In Ordner verschieben"
	       },
	       MULTI: {
	         ADD: "Personen oder Communitys hinzufügen",
	         ADD_PEOPLE: "Personen hinzufügen"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Jeder in meinem Unternehmen",
	        LONG: {
	           GENERIC: "Jeder in Ihrem Unternehmen",
	           ORG: "Jeder in ${org}."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Diese Datei wird bereits mit ${user} geteilt.",
	       ERROR: "Derzeit ist das Teilen mit ${user} nicht möglich.",
	       SELF: "Sie können diese Datei nicht mit sich selbst teilen. "
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user} wurde zu einer höheren Berechtigungsklasse für das Teilen hochgestuft."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Erfolgreich geteilt mit ${user}"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Optionale Nachricht..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Bereitstellung für externen Benutzer",
            ACTION: "Bereitstellung für externen Benutzer...",
            TOOLTIP: "Bereitstellung für externen Benutzer",
            DIALOG_TITLE: "Inhalt wurde nicht geteilt",
            PROMPT: {
              NO_ACCOUNT: "Der folgende Benutzer verfügt über kein Konto und es wurden keine Inhalte mit ihm geteilt.",
              INVITE: "Laden Sie diesen Benutzer als Gast ein, um die Inhalte mit ihm zu teilen."
            },
            SUBMIT: "Weiter mit Einladung",
            CANCEL: "Abbrechen",
            ERROR: "Beim Bereitstellen des Kontos ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
            SUCCESS: "Benutzerkonto erfolgreich bereitgestellt."
	       },
	       PLURAL: {
	         NAME: "Bereitstellung für externe Benutzer",
	         ACTION: "Bereitstellung für externe Benutzer...",
	         TOOLTIP: "Bereitstellung für externe Benutzer",
	         DIALOG_TITLE: "Inhalt wurde nicht geteilt",
	         PROMPT: {
	           NO_ACCOUNT: "Die folgenden Benutzer verfügen über kein Konto und es wurden keine Inhalte mit ihnen geteilt.",
	           INVITE: "Laden Sie diese Benutzer als Gäste ein, um die Inhalte mit ihnen zu teilen."
	         },
	         SUBMIT: "Weiter mit Einladungen",
	         CANCEL: "Abbrechen",
	         ERROR: "Beim Bereitstellen der Konten ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
	         SUCCESS: "Benutzerkonten erfolgreich bereitgestellt."
	       },
	       ABSTRACT: {
	         NAME: "Bereitstellung für externe Benutzer",
            ACTION: "Bereitstellung für externe Benutzer...",
            TOOLTIP: "Bereitstellung für externe Benutzer",
            DIALOG_TITLE: "Inhalt wurde nicht geteilt",
            PROMPT: {
              NO_ACCOUNT: "Einige Benutzer verfügen nicht über ein Konto und es wurden keine Inhalte mit ihnen geteilt.",
              INVITE: "Laden Sie diese Benutzer als Gäste ein, um die Inhalte mit ihnen zu teilen."
            },
            SUBMIT: "Weiter mit Einladungen",
            CANCEL: "Abbrechen",
            ERROR: "Beim Bereitstellen der Konten ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
            SUCCESS: "Benutzerkonten erfolgreich bereitgestellt."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Optionen für Teilen",
         PROPAGATION: "Anderen das Teilen dieser Datei ermöglichen ",
         EVERYONE: "Jeder kann diese Datei teilen.",
         OWNER_ONLY: "Nur der Eigentümer kann diese Datei teilen.",
         STOP_SHARE: "Nicht mehr teilen ",
         MAKE_INTERNAL: "Externes Teilen stoppen",
         MAKE_INTERNAL_SUCCESS: "Diese Datei kann nicht mehr mit Personen außerhalb Ihres Unternehmens geteilt werden.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "In intern ändern?",
           PROMPT: "Wenn diese Datei in intern geändert wird, kann sie nicht mehr mit Personen außerhalb Ihres Unternehmens geteilt werden. ${br}${br}" +
             "Das Teilen mit externen Personen, Communitys oder Ordnern wird entfernt.${br}${br}Wenn eine Datei in intern geändert wird, gilt dies dauerhaft und kann nicht rückgängig gemacht werden."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Datei nicht mehr teilen",
           PROMPT: "Möchten Sie diese Datei wirklich nicht mehr teilen?",
           QUESTION_PUBLIC: "Anschließend ist diese Datei nicht mehr für jeden im Unternehmen sichtbar und wird nicht mehr mit Personen, Ordnern oder Communitys geteilt. Dieser Vorgang kann nicht rückgängig gemacht werden.",
           QUESTION_PUBLIC_E: "Anschließend ist diese Datei nicht mehr für jeden im Unternehmen sichtbar und wird nicht mehr mit Personen oder Ordnern geteilt. Dieser Vorgang kann nicht rückgängig gemacht werden.",
           QUESTION: "Die Datei wird nicht mehr mit Personen oder Communitys geteilt und sie wird aus allen Ordnern außer Ihren privaten Ordnern entfernt. Diese Aktion kann nicht rückgängig gemacht werden.",
           QUESTION_E: "Diese Datei wird nicht mehr mit Personen geteilt und wird aus allen Ordnern außer Ihren privaten Ordnern entfernt. Diese Aktion kann nicht rückgängig gemacht werden."
         },
         MAKE_PRIVATE_SUCCESS: "Diese Datei ist nun privat.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Das Teilen der Datei kann nicht gestoppt werden. Versuchen Sie es später erneut."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Von mir geteilt"
	   },
	   STREAM: {
	     LOADING: "Ladevorgang läuft...",
	     LOAD_MORE: "Weitere laden... "
	   },
	   ENTRY: {
	     REMOVE: "Entfernen",
	     RESTORE: "Wiederherstellen ",
	     EDIT: "Bearbeiten",
	     DELETE: "Löschen",
	     OK: "OK",
	     CANCEL: "Abbrechen",
	     USER_PICTURE: "Bild von ${0}",
	     FLAG: "Als unzulässig markieren"
	   },
	   PANEL: {
	     LOAD_ERROR: "Beim Zugriff auf die Metadaten dieser Datei ist ein Fehler aufgetreten.",
	     ABOUT: {
	       TITLE: "Über",
	       EXPAND_BUTTON: "Diese Schaltfläche zum Anzeigen weiterer Informationen erweitern",
	       CURRENT_VERSION_HEADER: "Aktuelle Version ${versionNumber}",
	       FILE_SIZE_HEADER: "Dateigröße ",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - Aktuelle Version",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - Alle Versionen",
	       DOCS_DRAFT_UPDATED_HEADER: "Entwurf bearbeitet",
	       DOCS_DRAFT_CREATED_HEADER: "Entwurf erstellt",
	       DOCS_UPDATED_HEADER: "Veröffentlicht",
	       DOCS_CREATED_HEADER: "Erstellt",
	       UPDATED_HEADER: "Aktualisiert",
	       CREATED_HEADER: "Erstellt",
	       LIKES_HEADER: "Empfehlungen ",
	       LIKES_EXPAND_ICON: "Blenden Sie dieses Symbol ein, um zu sehen, wer die Datei empfohlen hat",
	       DOWNLOADS_HEADER: "Downloads ",
	       DOWNLOADS_HEADER_MORE: "Downloads (${0})",
	       DOWNLOADS_EXPAND_ICON: "Blenden Sie dieses Symbol ein, um zu sehen, wer die Datei heruntergeladen hat",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonym",
	       DOWNLOADS_LATEST_VERSION: "Sie haben die neueste Version dieser Datei",
	       DOWNLOADS_LAST_VERSION: "Sie haben zuletzt Version ${0} dieser Datei heruntergeladen. ",
	       TAGS_HEADER: "Tags",
	       DESCRIPTION_HEADER: "Beschreibung ",
	       DESCRIPTION_READ_MORE: "Mehr anzeigen...",
	       LINKS_HEADER: "Links",
	       SECURITY: "Sicherheit",
	       FILE_ENCRYPTED: "Dateiinhalt ist verschlüsselt. Der Inhalt verschlüsselter Dateien kann nicht durchsucht werden. Dateiinhalt kann nicht angezeigt und nicht mit HCL Docs bearbeitet werden.",
	       GET_LINKS: "Links abrufen...",
	       ADD_DESCRIPTION: "Beschreibung hinzufügen",
	       NO_DESCRIPTION: "Keine Beschreibung",
	       ADD_TAGS: "Tags hinzufügen",
	       NO_TAGS: "Keine Tags"
	     },
	     COMMENTS: {
	       TITLE: "Kommentare ",
	       TITLE_WITH_COUNT: "Kommentare (${0})",
	       VERSION: "Version ${0} ",
	       FEED_LINK: "Feed für diese Kommentare",
	       FEED_TITLE: "Änderungen an diesen Kommentaren über Feed-Leseprogramm folgen"
	     },
	     SHARING: {
	       TITLE: "Teilen",
	       TITLE_WITH_COUNT: "Geteilt (${0})",
	       SHARED_WITH_FOLDERS: "Geteilt mit Ordnern - ${count}",
	       SEE_WHO_HAS_SHARED: "Anzeigen, wer geteilt hat",
           COMMUNITY_FILE: "Dateien, die Eigentum einer Community sind, können nicht mit Personen oder anderen Communitys geteilt werden.",
           SHARED_WITH_COMMUNITY: "Mit Mitgliedern der Community '${0}' geteilt",
           LOGIN: "Anmelden",
           NO_SHARE: "Diese Datei wurde noch zu keinen Ordnern hinzugefügt.",
           ONE_SHARE: "Diese Datei befindet sich in einem Ordner oder einer Community, auf den/die Sie keinen Zugriff haben.",
           MULTIPLE_SHARE: "Diese Datei befindet sich in ${fileNumber} Ordnern oder Communitys, auf die Sie keinen Zugriff haben."
	     },
	     VERSIONS: {
	       TITLE: "Versionen ",
	       TITLE_WITH_COUNT: "Versionen (${0})",
	       FEED_LINK: "Feed für diese Versionen",
	       FEED_TITLE: "Änderungen an dieser Datei über das Feed-Leseprogramm folgen"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Aktionsbestätigung",
       DIALOG_TITLE: "Bestätigen",
       PROMPT: "Möchten Sie diese Aktion wirklich durchführen?",
       ERROR: "Beim Durchführen der Aktion ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
       TOOLTIP: "Aktion durchführen",
       OK: "OK",
       CANCEL: "Abbrechen",
       A11Y: "Über diese Schaltfläche wird die aktuelle Aktion durchgeführt."
     },
     THUMBNAIL: {
       TITLE: "Piktogramm",
       CHANGE_LINK: "Piktogramm ändern...",
       ERROR: "Das Piktogramm konnte nicht gespeichert werden. Versuchen Sie es später erneut.",
       EXT_ERROR: "Wählen Sie eine Datei mit einer der folgenden unterstützten Erweiterungen aus: ${0}",
       SUCCESS: "Das Piktogramm wurde geändert",
       UPLOAD: "Speichern",
       CANCEL: "Abbrechen"
     },
     UPLOAD_VERSION: {
       LINK: "Neue Version hochladen...",
       CHANGE_SUMMARY: "Optionale Änderungsübersicht...",
       ERROR: "Die neue Version konnte nicht gespeichert werden. Versuchen Sie es später erneut.",
       SUCCESS: "Die neue Version wurde gespeichert",
       UPLOAD: "Hochladen",
       UPLOAD_AND_CHANGE_EXTENSION: "Hochladen und Erweiterung ändern",
       CANCEL: "Abbrechen"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Beim Zugriff auf die Datei ist ein Fehler aufgetreten. Versuchen Sie es später erneut.",
       UNAUTHENTICATED: "Das zulässige Zeitlimit für Ihre Sitzung ist abgelaufen. Sie müssen sich erneut anmelden, bevor Sie die Datei anzeigen können.",
       NOT_FOUND: "Die von Ihnen angeforderte Datei wurde gelöscht oder verschoben. Wenn Ihnen dieser Link gesendet wurde, überprüfen Sie, ob er richtig ist. ",
       ACCESS_DENIED: "Sie sind nicht zum Anzeigen dieser Datei berechtigt. Die Datei wird nicht mit Ihnen geteilt.",
       ACCESS_DENIED_ANON: "Sie sind nicht zum Anzeigen dieser Datei berechtigt. Wenn es sich um Ihre Datei handelt oder sie mit Ihnen geteilt wird, müssen Sie sich zunächst anmelden."
     },
     LOAD_ERROR: {
       DEFAULT: "Beim Zugriff auf den Link ist leider ein Fehler aufgetreten.",
       ACCESS_DENIED: "Wenden Sie sich an den Dateieigentümer und bitten Sie ihn um die Berechtigung zum Anzeigen dieser Datei."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - Datei",
       LOAD_ERROR: "Fehler beim Zugriff auf die Datei"
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
