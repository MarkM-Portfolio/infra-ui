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
         "legal" : "Licencirani materijali - vlasništvo korporacije IBM 5724-S68 \xa9 korporacija IBM 2007, 2012. IBM, IBM logotip, ibm.com i Lotus su žigovi korporacije IBM Sjedinjenim državama, ostalim državama ili oba. Ograničena prava korisnika S.A.D. vlade: Korišćenje, kopiranje i otkrivanje je ograničeno GSA ADP ugovorom rasporeda sa korporacijom IBM. Pogledajte stranicu o proizvodu za više informacija.",
         "error" : "Došlo je do greške. Pokušajte ponovo kasnije.",
         "granted" : {
            "title" : "Pristup je odobren",
            "blurb" : "Odobrili ste ${0} pristup za interakciju sa nalogom aplikacije HCL Connections."
         },
         "denied" : {
            "title" : "Pristup je odbijen",
            "blurb" : "Odbili ste ${0} pristup za interakciju sa nalogom aplikacije HCL Connections."
         },
         "blurb" : "{0} zahteva pristup informacijama aplikacije HCL Connections, obuhvatajući celokupan sadržaj u aplikaciji Connections.",
         "revoke" : {
            "description" : "Moguće je da opozovete pristup u bilo koje vreme preko postavki aplikacije Connections > {0}. Povremeno je moguće da aplikacija Connections traži ponovnu autorizaciju.",
            "link" : "Pristup aplikaciji"
         },
         "authorize" : {
            "label" : "Odobri pristup"
         },
         "windowtitle" : "Ovlasti pristup aplikaciji HCL Connections",
         "title" : "Zahtev za pristup",
         "deny" : {
            "label" : "Zabrani pristup"
         },
         "action_tooltip" : "Odobri pristup za aplikaciju ${0}",
         "action" : "Odobri pristup",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Preusmeravanje na ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Uključi JavaScript",
            "p2" : "Osvežite stranicu kako biste nastavili.",
            "p1" : "JavaScript je deaktiviran u vašem veb pregledaču.  HCL Connections zahteva JavaScript kako bi funkcionisao.  Kada ga uključite, osvežite stranicu."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Nismo u mogućnosti da obradimo vaš zahtev",
            "description" : "Zahtev koji je izdala aplikacija zahtevajući pristup vašem nalogu aplikacije HCL Connections nije potpun.  Kliknite na dugme nazad pregledača da biste se vratili na lokaciju ili aplikaciju koja vas je poslala ovde i pokušajte ponovo.  Ukoliko se ova greška nastavi, pošaljite izveštaj o problemu administratoru."
         },
         "invalid_token" : {
            "title" : "Nismo u mogućnosti da obradimo vaš zahtev",
            "description" : "Zahtev koji je izdala aplikacija zahtevajući pristup vašem nalogu aplikacije HCL Connections nije važeći.  Kliknite na dugme nazad pregledača da biste se vratili na lokaciju ili aplikaciju koja vas je poslala ovde i pokušajte ponovo.  Ukoliko se ova greška nastavi, pošaljite izveštaj o problemu administratoru."
         },
         "default_action" : {
            "label" : "Vrati se na početnu stranicu"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Greška:",
            "icon_alt" : "Greška"
         },
         "success" : {
            "a11y_label" : "Uspešno:",
            "icon_alt" : "Uspešno"
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
         "error" : "Došlo je do greške. Pokušajte ponovo kasnije.",
         "action_tooltip" : "Odbijte pristup aplikaciji ${0}",
         "action" : "Odbij pristup",
         "success" : "Pristup je odbijen."
      },
      "grid" : {
         "applications" : {
            "summary" : "Lista aplikacija sa pristupom vašim informacijama aplikacije HCL Connections.",
            "loading" : "Učitavanje...",
            "empty" : "Nije pronađena nijedna aplikacija.",
            "reverse_sort" : "Inverzno sortiranje"
         }
      },
      "applications" : {
         "windowtitle" : "Pristup aplikaciji",
         "details" : "Aplikacije sa pristupom vašim informacijama aplikacije HCL Connections.",
         "error" : "Lista nije preuzeta zbog greške.",
         "titlebar" : {
            "tab2" : "Pristup aplikaciji",
            "tab1" : "Obaveštenja e-pošte",
            "tab3" : "Globalizacija"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Pritiskom na ovo dugme osvežićete aktuelnu stranicu novim sadržajem.  Da biste se vratili na ovaj meni, idite nazad na:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections postavke"
         },
         "heading" : "Pristup aplikaciji"
      },
      "sorts" : {
         "application_name" : "Ime aplikacije",
         "authorization_date" : "Datum autorizacije",
         "expiration_date" : "Rok trajanja",
         "action" : "Radnja"
      },
      "revoke_token" : {
         "error" : "Došlo je do greške. Pokušajte ponovo kasnije.",
         "dialog_title" : "Opoziv pristupa",
         "action_tooltip" : "Opozovi pristup aplikaciji ${0}",
         "action" : "Opoziv",
         "ok" : "U redu",
         "cancel" : "Otkaži",
         "confirm" : "Opozovi pristup ovoj aplikaciji vašim informacijama aplikacije HCL Connections? ",
         "success" : "Aplikacija je uklonjena."
      }
});
