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
         "legal" : "Licencni materijali - vlasništvo IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, IBM logo, ibm.com i Lotus su zaštitni znaci u vlasništvu IBM Corporation u Sjedinjenim Državama, drugim državama ili oboje. Ograničena prava korisnika iz vlade SAD-a: upotreba, dupliciranje ili objavljivanje ograničeni su ugovorom s IBM Corp. Molimo pogledajte stranicu o proizvodu radi dodatnih informacija.",
         "error" : "Dogodila se greška. Molim, pokušajte ponovno kasnije.",
         "granted" : {
            "title" : "Pristup dozvoljen",
            "blurb" : "Dodijelili ste ${0} pristup za interakciju s vašim HCL Connections računom."
         },
         "denied" : {
            "title" : "Pristup odbijen",
            "blurb" : "Zabranili ste ${0} pristup za interakciju s vašim HCL Connections računom."
         },
         "blurb" : "{0} zahtijeva pristup vašim HCL Connections informacijama, uključujući sav vaš sadržaj u proizvodu Connections.",
         "revoke" : {
            "description" : "Pristup u svakom trenutku možete opozvati kroz Postavke povezivanja > {0}. Connections od vas mogu periodički tražiti ponovno ovlaštenje.",
            "link" : "Pristup aplikaciji"
         },
         "authorize" : {
            "label" : "Dodjela pristupa"
         },
         "windowtitle" : "Ovlasti pristup na HCL Connections",
         "title" : "Zahtjev za pristupom",
         "deny" : {
            "label" : "Odbijanje pristupa"
         },
         "action_tooltip" : "Dodijeli pristup aplikaciji ${0}",
         "action" : "Dodjela pristupa",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Preusmjeravanje natrag na ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Uključite JavaScript",
            "p2" : "Osvježite stranicu za nastavak.",
            "p1" : "JavaScript je onemogućen u vašem Web pretražitelju.  HCL Connections trebaju JavaScript za rad.  Nakon uključivanja, molimo osvježite stranicu."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Ne možemo obraditi vaš zahtjev",
            "description" : "Zahtjev koji je izdala aplikacija koja zahtijeva pristup vašem HCL Connections računu je nepotpun.  Kliknite gumb za natrag u pretražitelju, vratite se na sjedište ili aplikaciju iz koje ste došli ovamo i pokušajte ponovno.  Ako greška ne nestane, prijavite problem vašem administratoru."
         },
         "invalid_token" : {
            "title" : "Ne možemo obraditi vaš zahtjev",
            "description" : "Zahtjev koji je izdala aplikacija koja zahtijeva pristup vašem HCL Connections računu je pogrešan.  Kliknite gumb za natrag u pretražitelju, vratite se na sjedište ili aplikaciju iz koje ste došli ovamo i pokušajte ponovno.  Ako greška ne nestane, prijavite problem vašem administratoru."
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
         "error" : "Dogodila se greška. Molim, pokušajte ponovno kasnije.",
         "action_tooltip" : "Odbijanje pristupa aplikaciji ${0}",
         "action" : "Odbijanje pristupa",
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
         "error" : "Lista nije dohvaćena zbog greške.",
         "titlebar" : {
            "tab2" : "Pristup aplikaciji",
            "tab1" : "E-mail obavijesti",
            "tab3" : "Globalizacija"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Pritiskom na ovaj gumb osvježava se trenutna stranica, s novim sadržajem.  Da biste se vratili u ovaj izbornik, idite natrag do:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections postavke"
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
         "error" : "Dogodila se greška. Molim, pokušajte ponovno kasnije.",
         "dialog_title" : "Opoziv pristupa",
         "action_tooltip" : "Opozovi pristup aplikaciji ${0}",
         "action" : "Opozovi",
         "ok" : "OK",
         "cancel" : "Opoziv",
         "confirm" : "Opozvati pristup vašim HCL Connections informacijama za ovu aplikaciju? ",
         "success" : "Aplikacija je uklonjena."
      }
});
