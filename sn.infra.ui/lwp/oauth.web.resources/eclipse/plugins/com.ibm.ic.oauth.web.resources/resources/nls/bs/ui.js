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
         "legal" : "Licencirani materijal - Vlasništvo IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, IBM logo, ibm.com i Lotus su zaštitni znaci u vlasništvu IBM Corporation u Sjedinjenim Državama, drugim državama ili oboje. Ograničena prava korisnika Vlade SAD: Upotreba, umnožavanje ili objavljivanje je ograničeno GSA ADP Schedule ugovorom s IBM Corp. molimo da pogledate stranicu o proizvodu za dodatne informacije.",
         "error" : "Došlo je do greške. Molimo da pokušate ponovo kasnije.",
         "granted" : {
            "title" : "Pristup dozvoljen",
            "blurb" : "Dodijeljen vam je ${0} pristup za interakciju s vašim HCL Connections računom."
         },
         "denied" : {
            "title" : "Pristup odbijen",
            "blurb" : "Odbijen vam je ${0} pristup za interakciju s vašim HCL Connections računom."
         },
         "blurb" : "{0}zahtjeva pristup na vaše HCL Connections informacije, uključujući sav vaš sadržaj u Connections.",
         "revoke" : {
            "description" : "Od pristupa u svakom trenutku možete odustati kroz Postavke povezivanja > {0}. Connections od vas mogu periodički tražiti ponovno ovlaštenje.",
            "link" : "Pristup aplikaciji"
         },
         "authorize" : {
            "label" : "Dodjela pristupa"
         },
         "windowtitle" : "Ovlasti pristup na HCL Connections",
         "title" : "Zahtjev za pristupom",
         "deny" : {
            "label" : "Zabrani pristup"
         },
         "action_tooltip" : "Dodijela pristupa za aplikaciju ${0}",
         "action" : "Dodjela pristupa",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Preusmjerava vas nazad na ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Uključite JavaScript",
            "p2" : "Osvježite stranicu za nastavak.",
            "p1" : "U vašem Web serveru nije moguće pristupiti JavaScript .  HCL Connections trebaju JavaScript za rad.  Nakon uključivanja, molimo osvježite stranicu."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Ne možemo obraditi vaš zahtjev",
            "description" : "Zahtjev koji je izdala aplikacija koja zahtijeva pristup vašem HCL Connections računu je nepotpun.  Kliknite dugme za nazad u pretraživaču, vratite se na sajt ili aplikaciju iz koje ste došli ovamo i pokušajte ponovo.  Ako greška ne nestane, prijavite problem vašem administratoru."
         },
         "invalid_token" : {
            "title" : "Ne možemo obraditi vaš zahtjev",
            "description" : "Zahtjev koji je izdala aplikacija koja zahtijeva pristup vašem HCL Connections računu je pogrešan.  Kliknite dugme za nazad u pretraživaču, vratite se na sajt ili aplikaciju iz koje ste došli ovamo i pokušajte ponovo.  Ako greška ne nestane, prijavite problem vašem administratoru."
         },
         "default_action" : {
            "label" : "Povratak na početnu stranicu"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Greška:",
            "icon_alt" : "Greška"
         },
         "success" : {
            "a11y_label" : "Uspjeh:",
            "icon_alt" : "Uspjeh"
         },
         "warning" : {
            "a11y_label" : "Upozorenje:",
            "icon_alt" : "Upozorenje"
         },
         "info" : {
            "a11y_label" : "Informacije:",
            "icon_alt" : "Informacije"
         }
      },
      "loading" : "Učitavanje...",
      "deny" : {
         "error" : "Došlo je do greške. Molimo da pokušate ponovo kasnije.",
         "action_tooltip" : "Odbijen je pristup za aplikaciju ${0}",
         "action" : "Zabrani pristup",
         "success" : "Pristup je odbijen."
      },
      "grid" : {
         "applications" : {
            "summary" : "Lista aplikacija s pristupom vašim HCL Connections informacijama.",
            "loading" : "Učitavanje...",
            "empty" : "Nije pronađena aplikacija.",
            "reverse_sort" : "Obratni sort"
         }
      },
      "applications" : {
         "windowtitle" : "Pristup aplikaciji",
         "details" : "Aplikacije s pristupom vašim HCL Connections informacijama.",
         "error" : "Listi nije pristupljeno zbog greške.",
         "titlebar" : {
            "tab2" : "Pristup aplikaciji",
            "tab1" : "E-mail obavijesti",
            "tab3" : "Globalizacija"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Pritiskom na ovo dugme osvježava se trenutna stranica, s novim sadržajem.  Da biste se vratili u ovaj meni, idite nazad do:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections podešavanja"
         },
         "heading" : "Pristup aplikaciji"
      },
      "sorts" : {
         "application_name" : "Ime aplikacije",
         "authorization_date" : "Ime autorizacije",
         "expiration_date" : "Datum isteka",
         "action" : "Akcija"
      },
      "revoke_token" : {
         "error" : "Došlo je do greške. Molimo da pokušate ponovo kasnije.",
         "dialog_title" : "Odustani od pristupa",
         "action_tooltip" : "Poništen je pristup za aplikaciju ${0}",
         "action" : "Odustani",
         "ok" : "OK",
         "cancel" : "Odustani",
         "confirm" : "Poništen je pristup ove aplikacije na vaše HCL Connections informacije? ",
         "success" : "Aplikacija je uklonjena."
      }
});
