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
         "unavailable" : "Postavke globalizacije nisu dostupna",
         "details" : "Navedite željeni jezik, željeni kalendar i smer teksta generisanog od strane korisnika.",
         "error" : "Postavke globalizacije nisu preuzeta usled greške.",
         "titlebar" : {
            "tab2" : "Pristup aplikaciji",
            "tab1" : "Obaveštenja putem elektronske pošte",
            "tab3" : "Globalizacija"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Pritiskom na ovo dugme osvežićete aktuelnu stranicu novim sadržajem.  Da biste se vratili na ovaj meni, idite nazad na:"
         },
         "details_nolanguage" : "Navedite željeni kalendar i smer teksta generisanog od strane korisnika.",
         "a11y" : {
            "titlebar_label" : "HCL Connections postavke",
            "body_label" : "Postavke globalizacije"
         },
         "heading" : "Podešavanja globalizacije"
      },
      "restore_defaults" : {
         "error" : "Došlo je do greške. Pokušajte ponovo kasnije",
         "action_tooltip" : "Vrati postavke globalizacije na podrazumevane vrednosti",
         "action" : "Vrati na podrazumevane vrednosti",
         "success" : "Vaše postavke globalizacije su vraćena na podrazumevane vrednosti."
      },
      "help" : {
         "help" : "Pomoć",
         "close" : "Zatvori"
      },
      "save" : {
         "error" : "Došlo je do greške. Pokušajte ponovo kasnije",
         "action_tooltip" : "Sačuvaj postavke globalizacije",
         "action" : "Sačuvaj",
         "success" : "Vaše postavke globalizacije su ažurirana."
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "Vrati na podrazumevane vrednosti"
         },
         "bidi" : {
            "help" : "Omogući pomoć za dvosmerni tekst",
            "label" : "Omogući dvosmerni tekst",
            "tooltip" : "Omogućava prikazivanje koncentrisanog i strukturiranog teksta specifičnog za određene jezike, kao što su putanje datoteka.  Takođe vam omogućava i da odredite pravac teksta nezavisno od vašeg odabira jezika."
         },
         "error" : "Greška",
         "save" : {
            "label" : "Sačuvaj"
         },
         "direction" : {
            "label" : "Smer teksta koji je generisan od strane korisnika:",
            "tooltip" : "Smer teksta koji je izveden iz unosa korisnika, kao što su nazivi sadržaja i putanje navigacije.  Ovo se standardno određuje pri odabiru jezika (u najvećem broju slučajeva sa leva na desno).  Odabiranjem kontekstualnog omogućava sistemu da utvrdi smer na osnovu analize karaktera (podržava različite smerove teksta).",
            "options" : {
               "contextual" : "Kontekstualno (na osnovu karaktera)",
               "rtl" : "Sa desna na levo",
               "ltr" : "Sa leva na desno",
               "default_ltr" : "Koristi standardni jezik (sa leva na desno)",
               "default_rtl" : "Koristi standardni jezik (sa leva na desno)"
            }
         },
         "cancel" : {
            "label" : "Otkaži"
         },
         "language" : {
            "selected" : "${0} (trenutno)",
            "label" : "Jezik:",
            "tooltip" : "Naznačite jezik prikaza aplikacije.  Ovo podešavanje neće uticati na tekst generisan od strane korisnika."
         },
         "calendar" : {
            "label" : "Kalendar:",
            "options" : {
               "hebrew" : "Hebrejski",
               "gregorian" : "Gregorijanski",
               "hijri" : "Hidžra"
            }
         }
      }
});
