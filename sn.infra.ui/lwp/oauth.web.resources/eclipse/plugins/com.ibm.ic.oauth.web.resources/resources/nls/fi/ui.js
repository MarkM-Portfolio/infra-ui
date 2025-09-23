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
         "legal" : "Lisensoitua aineistoa - IBM:n omaisuutta, 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, IBM-logo, ibm.com ja Lotus ovat IBM Corporationin tavaramerkkejä Yhdysvalloissa ja muissa maissa. U.S. Government Users Restricted Rights: Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp. Lisätietoja on Tietoja-sivulla.",
         "error" : "On ilmennyt virhe. Yritä myöhemmin uudelleen.",
         "granted" : {
            "title" : "Käyttö myönnetty",
            "blurb" : "Olet myöntänyt sovellukselle ${0} käyttöoikeudet, jotta vuorovaikutus HCL Connections -tilisi kanssa toimisi."
         },
         "denied" : {
            "title" : "Käyttö kielletty",
            "blurb" : "Olet evännyt sovelluksen ${0} käyttöoikeudet, joten vuorovaikutus HCL Connections -tilisi kanssa ei ole mahdollista."
         },
         "blurb" : "{0} pyytää päästä käyttämään HCL Connections -tietojasi, jotka sisältävät myös kaikki sisältösi Connections-sovelluksessa.",
         "revoke" : {
            "description" : "Voit evätä käyttöoikeudet koska tahansa Connections-sovelluksen seuraavien vaihtoehtojen avulla: Asetukset > {0}. Connections-sovellus saattaa pyytää ajoittain käyttöoikeuksien uudelleenmyöntämistä.",
            "link" : "Sovelluksen käyttöoikeudet"
         },
         "authorize" : {
            "label" : "Myönnä käyttöoikeudet"
         },
         "windowtitle" : "HCL Connections -tietojen käyttöoikeuksien myöntäminen",
         "title" : "Käyttöoikeuspyyntö",
         "deny" : {
            "label" : "Estä käyttö"
         },
         "action_tooltip" : "Myönnä käyttöoikeudet sovellukselle ${0}",
         "action" : "Myönnä käyttöoikeudet",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Edelleenohjaus takaisin sovellukseen ${0} on meneillään."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Ota JavaScript käyttöön",
            "p2" : "Jatka päivittämällä sivu.",
            "p1" : "Web-selaimen JavaScript-tuki on poistettu käytöstä.  HCL Connections -ohjelma edellyttää, että JavaScript on käytössä.  Kun olet ottanut sen käyttöön, päivitä sivu."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Pyynnön käsittely ei onnistu",
            "description" : "Sovelluksen antama pyyntö käyttöoikeudesta HCL Connections -tiliisi oli keskeneräinen.  Palaa edelliseen sivustoon tai sovellukseen napsauttamalla selaimen Takaisin-painiketta ja yritä uudelleen.  Jos virhe ilmenee edelleen, ilmoita ongelmasta pääkäyttäjälle."
         },
         "invalid_token" : {
            "title" : "Pyynnön käsittely ei onnistu",
            "description" : "Sovelluksen antama pyyntö käyttöoikeudesta HCL Connections -tiliisi oli virheellinen.  Palaa edelliseen sivustoon tai sovellukseen napsauttamalla selaimen Takaisin-painiketta ja yritä uudelleen.  Jos virhe ilmenee edelleen, ilmoita ongelmasta pääkäyttäjälle."
         },
         "default_action" : {
            "label" : "Palaa kotisivulle"
         }
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
      "loading" : "Lataus on meneillään...",
      "deny" : {
         "error" : "On ilmennyt virhe. Yritä myöhemmin uudelleen.",
         "action_tooltip" : "Kiellä sovelluksen ${0} käyttö",
         "action" : "Estä käyttö",
         "success" : "Käyttö on estetty."
      },
      "grid" : {
         "applications" : {
            "summary" : "Luettelo sovelluksista, joilla on HCL Connections -tietojesi käyttöoikeudet.",
            "loading" : "Lataus on meneillään...",
            "empty" : "Sovelluksia ei löytynyt.",
            "reverse_sort" : "Käänteinen lajittelu"
         }
      },
      "applications" : {
         "windowtitle" : "Sovelluksen käyttöoikeudet",
         "details" : "Sovellukset, joilla on HCL Connections -tietojesi käyttöoikeudet.",
         "error" : "Luettelon nouto epäonnistui virheen takia.",
         "titlebar" : {
            "tab2" : "Sovelluksen käyttöoikeudet",
            "tab1" : "Sähköposti-ilmoitukset",
            "tab3" : "Globalisointi"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Kun napsautat tätä painiketta, näkyvissä olevan sivun sisältö päivittyy.  Voit palata tähän valikkoon siirtymällä takaisin seuraavaan kohtaan:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections -asetukset"
         },
         "heading" : "Sovelluksen käyttöoikeudet"
      },
      "sorts" : {
         "application_name" : "Sovelluksen nimi",
         "authorization_date" : "Valtuutuspäivä",
         "expiration_date" : "Vanhentumispäivä",
         "action" : "Toiminto"
      },
      "revoke_token" : {
         "error" : "On ilmennyt virhe. Yritä myöhemmin uudelleen.",
         "dialog_title" : "Epää käyttöoikeudet",
         "action_tooltip" : "Epää sovelluksen ${0} käyttö",
         "action" : "Epää",
         "ok" : "OK",
         "cancel" : "Peruuta",
         "confirm" : "Haluatko peruuttaa HCL Connections -tietojesi käyttöoikeudet tältä sovellukselta? ",
         "success" : "Sovellus on poistettu."
      }
});
