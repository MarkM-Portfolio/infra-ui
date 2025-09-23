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
         "windowtitle" : "Globalizacija",
         "unavailable" : "Postavke globalizacije nisu dostupne",
         "details" : "Navedite preferirani jezik, kalendar i smjer korisnički definisanog teksta.",
         "error" : "Postavkama globalizacije nije pristupljeno zbog greške.",
         "titlebar" : {
            "tab2" : "Pristup aplikaciji",
            "tab1" : "E-mail obavijesti",
            "tab3" : "Globalizacija"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Pritiskom na ovo dugme osvježava se trenutna stranica, s novim sadržajem.  Da biste se vratili u ovaj meni, idite nazad do:"
         },
         "details_nolanguage" : "Navedite preferirani kalendar i smjer korisnički definisanog teksta.",
         "a11y" : {
            "titlebar_label" : "HCL Connections podešavanja",
            "body_label" : "Postavke globalizacije"
         },
         "heading" : "Postavke globalizacije"
      },
      "restore_defaults" : {
         "error" : "Došlo jedo greške. Molimo da pokušate ponovo kasnije.",
         "action_tooltip" : "Vratite izvorne default vrijednosti postavki globalizacije",
         "action" : "Vraćanje defaulta",
         "success" : "Vaše postavke globalizacije su vraćene na njihove originalne defaultne vrijednosti."
      },
      "help" : {
         "help" : "Pomoć",
         "close" : "Zatvori"
      },
      "save" : {
         "error" : "Došlo je do greške. Molimo da pokušate ponovo kasnije.",
         "action_tooltip" : "Spremite postavke globalizacije",
         "action" : "Spremi",
         "success" : "Vaše postavke globalizacije su ažurirane."
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "Vraćanje defaulta"
         },
         "bidi" : {
            "help" : "Pomoć za omogućavanje dvosmjernog teksta",
            "label" : "Omogući dvosmjerni tekst",
            "tooltip" : "Omogućuje prikaz ulančanog i strukturisanog teksta poput staza datoteka za određeni jezik.  Takođe omogućuje definisanje smjera teksta nezavisno o vašem odabranom jeziku."
         },
         "error" : "Greška",
         "save" : {
            "label" : "Spremi"
         },
         "direction" : {
            "label" : "Smjer korisnički-generisanog teksta:",
            "tooltip" : "Smjer teksta izvedenog iz korisničkog unosa, poput imena sadržaja i breadcrumbs navigacije.  Ovo se po defaultu određuje na osnovu vašeg odabranog jezika (slijeva nadesno u većini slučajeva).  Ako odaberete opciju kontekstualno, sistem može utvrditi smjer na temelju analize znakova (podržava tekst u više smjerova).",
            "options" : {
               "contextual" : "Kontekstualno (na temelju znakova)",
               "rtl" : "S desna na lijevo",
               "ltr" : "S lijeva na desno",
               "default_ltr" : "Koristi default za jezik (slijeva nadesno)",
               "default_rtl" : "Koristi default za jezik (s desna na lijevo)"
            }
         },
         "cancel" : {
            "label" : "Odustani"
         },
         "language" : {
            "selected" : "${0} (trenutno)",
            "label" : "Jezik:",
            "tooltip" : "Navedite jezik u kojem će se prikazivati tekst aplikacije.  Ova postavka nema uticaja na korisnički generisani tekst."
         },
         "calendar" : {
            "label" : "Kalendar:",
            "options" : {
               "hebrew" : "Hebrejski",
               "gregorian" : "Gregorijanski",
               "hijri" : "Islamski"
            }
         }
      }
});
