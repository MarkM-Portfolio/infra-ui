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
         "legal" : "Licensierat material \u2013 tillh\u00f6r HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. Med ensamr\u00e4tt. Se produktlicens f\u00f6r mer information. Java och alla Java-baserade varum\u00e4rken och logotyper \u00e4r varum\u00e4rken eller registrerade varum\u00e4rken som tillh\u00f6r Oracleoch/eller dess dotterbolag.",
         "error" : "Det uppstod ett fel. Försök igen senare.",
         "granted" : {
            "title" : "Åtkomst godkändes",
            "blurb" : "Du har beviljat ${0} åtkomst till ditt HCL Connections-konto."
         },
         "denied" : {
            "title" : "Åtkomst nekades",
            "blurb" : "Du har nekat ${0} åtkomst till ditt HCL Connections-konto."
         },
         "blurb" : "{0} har begärt åtkomst till din HCL Connections-information, inklusive allt ditt Connections-innehåll.",
         "revoke" : {
            "description" : "Om du vill återkalla åtkomsten använder du Inställningar > {0} i Connections. Du måste eventuellt autentisera dig igen med regelbundna intervall.",
            "link" : "Applikationsåtkomst"
         },
         "authorize" : {
            "label" : "Godkänn åtkomst"
         },
         "windowtitle" : "Autentisera åtkomst till HCL Connections",
         "title" : "Åtkomstbegäran",
         "deny" : {
            "label" : "Neka åtkomst"
         },
         "action_tooltip" : "Godkänn åtkomst för applikationen ${0}",
         "action" : "Godkänn åtkomst",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Du omdirigeras tillbaka till ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Aktivera JavaScript",
            "p2" : "Uppdatera sidan om du vill fortsätta.",
            "p1" : "JavaScript har avaktiverats i webbläsaren. JavaScript krävs för HCL Connections. Aktivera JavaScript och uppdatera sedan sidan."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Det gick inte att bearbeta din begäran",
            "description" : "Den begäran som utfärdades från den applikation som begärde åtkomst till ditt HCL Connections-konto är ofullständig. Gå tillbaka till den plats eller en applikation du kom från genom att klicka på bakåt-knappen i webbläsaren och försök sedan igen. Kontakta administratören om problemet kvarstår."
         },
         "invalid_token" : {
            "title" : "Det gick inte att bearbeta din begäran",
            "description" : "Den begäran som utfärdades från den applikation som begärde åtkomst till ditt HCL Connections-konto är ogiltig. Gå tillbaka till den plats eller en applikation du kom från genom att klicka på bakåt-knappen i webbläsaren och försök sedan igen. Kontakta administratören om problemet kvarstår."
         },
         "default_action" : {
            "label" : "Tillbaka till hemsidan"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Fel:",
            "icon_alt" : "Fel"
         },
         "success" : {
            "a11y_label" : "Slutfördes:",
            "icon_alt" : "Slutfördes"
         },
         "warning" : {
            "a11y_label" : "Varning!",
            "icon_alt" : "Varning"
         },
         "info" : {
            "a11y_label" : "Information:",
            "icon_alt" : "Information"
         }
      },
      "loading" : "Laddar...",
      "deny" : {
         "error" : "Det uppstod ett fel. Försök igen senare.",
         "action_tooltip" : "Neka åtkomst för applikationen ${0}",
         "action" : "Neka åtkomst",
         "success" : "Åtkomst nekades."
      },
      "grid" : {
         "applications" : {
            "summary" : "Lista över applikationer med åtkomst till din HCL Connections-information.",
            "loading" : "Laddar...",
            "empty" : "Det gick inte att hitta några applikationer.",
            "reverse_sort" : "Omvänd sortering"
         }
      },
      "applications" : {
         "windowtitle" : "Applikationsåtkomst",
         "details" : "Applikationer med åtkomst till din HCL Connections-information.",
         "error" : "Det uppstod ett fel. Det gick inte att hämta listan.",
         "titlebar" : {
            "tab2" : "Applikationsåtkomst",
            "tab1" : "Mejlaviseringar",
            "tab3" : "Globalisering"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Om du trycker på den här knappen uppdateras sidan med det nya innehållet. Återgå till den här menyn genom att gå tillbaka till:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections-inställningar"
         },
         "heading" : "Applikationsåtkomst"
      },
      "sorts" : {
         "application_name" : "Applikationsnamn",
         "authorization_date" : "Autentiseringsdatum",
         "expiration_date" : "Slutdatum",
         "action" : "Åtgärd"
      },
      "revoke_token" : {
         "error" : "Det uppstod ett fel. Försök igen senare.",
         "dialog_title" : "Återkalla åtkomst",
         "action_tooltip" : "Återkalla åtkomst för applikationen ${0}",
         "action" : "Återkalla",
         "ok" : "OK",
         "cancel" : "Avbryt",
         "confirm" : "Vill du återkalla åtkomsten till din HCL Connections-information för den här applikationen? ",
         "success" : "Applikationen togs bort."
      }
});
