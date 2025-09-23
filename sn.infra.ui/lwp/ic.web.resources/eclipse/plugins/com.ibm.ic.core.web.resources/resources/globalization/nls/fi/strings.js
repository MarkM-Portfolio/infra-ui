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
         "windowtitle" : "Globalisointi",
         "unavailable" : "Globalisointiasetukset eivät ole käytettävissä",
         "details" : "Määritä haluamasi kieli, kalenteri ja käyttäjien kirjoittaman tekstin suunta.",
         "error" : "Globalisointiasetuksien nouto epäonnistui virheen takia.",
         "titlebar" : {
            "tab2" : "Sovelluksen käyttöoikeudet",
            "tab1" : "Sähköposti-ilmoitukset",
            "tab3" : "Globalisointi"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Kun napsautat tätä painiketta, näkyvissä olevan sivun sisältö päivittyy.  Voit palata tähän valikkoon siirtymällä takaisin seuraavaan kohtaan:"
         },
         "details_nolanguage" : "Määritä haluamasi kalenteri ja käyttäjien kirjoittaman tekstin suunta.",
         "a11y" : {
            "titlebar_label" : "HCL Connections -asetukset",
            "body_label" : "Globalisointiasetukset"
         },
         "heading" : "Globalisointiasetukset"
      },
      "restore_defaults" : {
         "error" : "On ilmennyt virhe. Yritä myöhemmin uudelleen.",
         "action_tooltip" : "Palauta globalisointiasetuksiksi alkuperäiset oletusarvot",
         "action" : "Palauta oletusarvot",
         "success" : "Globalisointiasetukset on palautettu alkuperäisiin oletusarvoihin."
      },
      "help" : {
         "help" : "Ohje",
         "close" : "Sulje"
      },
      "save" : {
         "error" : "On ilmennyt virhe. Yritä myöhemmin uudelleen.",
         "action_tooltip" : "Tallenna globalisointiasetukset",
         "action" : "Tallenna",
         "success" : "Globalisointiasetukset on päivitetty."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Virhe:",
            "icon_alt" : "Virhe"
         },
         "success" : {
            "a11y_label" : "Onnistui:",
            "icon_alt" : "Onnistui"
         },
         "warning" : {
            "a11y_label" : "Varoitus:",
            "icon_alt" : "Varoitus"
         },
         "info" : {
            "a11y_label" : "Tiedot:",
            "icon_alt" : "Ilmoitus"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Palauta oletusarvot"
         },
         "bidi" : {
            "help" : "Ota käyttöön kielen kaksisuuntaisuuden tuen ohje",
            "label" : "Ota käyttöön kielen kaksisuuntaisuuden tuki",
            "tooltip" : "Sallii ketjutetun tekstin ja rakenteellisen tekstin, kuten tiedostopolkujen, kielikohtaisen näyttämisen.  Mahdollistaa myös sen, että tekstin suunta määritetään kielivalinnasta riippumatta."
         },
         "error" : "Virhe",
         "save" : {
            "label" : "Tallenna"
         },
         "direction" : {
            "label" : "Käyttäjän luoman tekstin suunta:",
            "tooltip" : "Käyttäjän syötteestä peräisin olevan tekstin suunta, koskee myös sisällön nimiä ja navigaatiopolkuja.  Oletusarvon mukaan tämä määräytyy kielivalinnan mukaan (useimmissa kielissä vasemmalta oikealle).  Jos valitset vaihtoehdon Kontekstin mukainen, järjestelmä voi määrittää suunnan merkkianalyysin perusteella (tukee sekasuuntaista tekstiä).",
            "options" : {
               "contextual" : "Kontekstin mukainen (merkkiperustainen)",
               "rtl" : "Oikealta vasemmalle",
               "ltr" : "Vasemmalta oikealle",
               "default_ltr" : "Käytä kielen oletusarvoa (vasemmalta oikealle)",
               "default_rtl" : "Käytä kielen oletusarvoa (oikealta vasemmalle)"
            }
         },
         "cancel" : {
            "label" : "Peruuta"
         },
         "language" : {
            "selected" : "${0} (nykyinen)",
            "label" : "Kieli:",
            "tooltip" : "Määritä sovelluksen tekstien näyttökieli.  Tämä asetus ei vaikuta käyttäjän luomaan tekstiin."
         },
         "calendar" : {
            "label" : "Kalenteri:",
            "options" : {
               "hebrew" : "heprea",
               "gregorian" : "Gregoriaaninen",
               "hijri" : "Islamilainen"
            }
         }
      }
});
