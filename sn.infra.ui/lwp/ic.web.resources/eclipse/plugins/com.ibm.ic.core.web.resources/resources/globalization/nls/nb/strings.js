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
         "windowtitle" : "Globalisering",
         "unavailable" : "Globaliseringinnstillinger er ikke tilgjengelig",
         "details" : "Angi ditt foretrukne språk, hvilken kalenderen du vil bruke, og retningen på brukergenerert tekst.",
         "error" : "Globaliseringinnstillinger ble ikke hentet på grunn av en feil.",
         "titlebar" : {
            "tab2" : "Applikasjonstilgang",
            "tab1" : "E-postvarsler",
            "tab3" : "Globalisering"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Hvis du trykker på denne knappen, blir den gjeldende siden oppdatert med nytt innhold.  Hvis du vil gå tilbake til denne menyen, navigerer du tilbake til:"
         },
         "details_nolanguage" : "Angi hvilken kalenderen du vil bruke, og retningen på brukergenerert tekst.",
         "a11y" : {
            "titlebar_label" : "HCL Connections-innstillinger",
            "body_label" : "Globaliseringsinnstillinger"
         },
         "heading" : "Globaliseringsinnstillinger"
      },
      "restore_defaults" : {
         "error" : "Det oppstod en feil. Prøv igjen senere.",
         "action_tooltip" : "Gjenopprett globaliseringsinnstillinger til opprinnelige standardverdier",
         "action" : "Bruk standardverdier",
         "success" : "Globaliseringsinnstillingene er gjenopprettet til de opprinnelige standardverdiene."
      },
      "help" : {
         "help" : "Hjelp",
         "close" : "Lukk"
      },
      "save" : {
         "error" : "Det oppstod en feil. Prøv igjen senere.",
         "action_tooltip" : "Lagre globaliseringsinnstillinger",
         "action" : "Lagre",
         "success" : "Globaliseringsinnstillingene er oppdatert."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Feil:",
            "icon_alt" : "Feil"
         },
         "success" : {
            "a11y_label" : "Vellykket:",
            "icon_alt" : "Vellykket"
         },
         "warning" : {
            "a11y_label" : "Advarsel:",
            "icon_alt" : "Advarsel"
         },
         "info" : {
            "a11y_label" : "Informasjon:",
            "icon_alt" : "Informasjon"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Bruk standardverdier"
         },
         "bidi" : {
            "help" : "Hjelp til Aktiver toveistekst",
            "label" : "Aktiver toveistekst",
            "tooltip" : "Tillater språkavhengig visning av sammenkjedet tekst og strukturert tekst, for eksempel filbaner.  Gjør det også mulig for deg å angi en tekstretning uavhengig av språkvalget ditt."
         },
         "error" : "Feil",
         "save" : {
            "label" : "Lagre"
         },
         "direction" : {
            "label" : "Retning på brukergenerert tekst:",
            "tooltip" : "Retningen på tekst avledet fra brukerinndata, for eksempel navn på innhold og navigeringsbrødsmuler.  Som standard bestemmes dette av språkvalget ditt (vanligvis venstre mot høyre).  Hvis du velger kontekstavhengig, kan systemet bestemme retningen basert på tekstanalyse (støtter tekst med blandet retning).",
            "options" : {
               "contextual" : "Kontekstavhengig (tegnbasert)",
               "rtl" : "Høyre mot venstre",
               "ltr" : "Venstre mot høyre",
               "default_ltr" : "Bruk standardspråk (venstre mot høyre)",
               "default_rtl" : "Bruk standardspråk (høyre mot venstre)"
            }
         },
         "cancel" : {
            "label" : "Avbryt"
         },
         "language" : {
            "selected" : "${0} (gjeldende)",
            "label" : "Språk:",
            "tooltip" : "Angi språket som applikasjonsteksten skal vises på.  Denne innstillingen påvirker ikke brukergenerert tekst."
         },
         "calendar" : {
            "label" : "Kalender:",
            "options" : {
               "hebrew" : "Hebraisk",
               "gregorian" : "Gregoriansk",
               "hijri" : " Hijri"
            }
         }
      }
});
