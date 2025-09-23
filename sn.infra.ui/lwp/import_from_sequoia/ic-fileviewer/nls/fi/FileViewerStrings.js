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
     FILE_VIEWER_TITLE: "Tiedoston esikatselu",
     FILENAME_TOOLTIP: "Muokkaa tiedoston nimeä",
     ICON_TOOLTIP: "Lataa tiedosto",
     ERROR: "On ilmennyt virhe.",
     SHARED_EXTERNALLY: "Ulkoisessa yhteiskäytössä",
     FILE_SYNCED: "Lisätty synkronointiin",
     MORE_ACTIONS: {
       TITLE: "Lisää toimintoja",
       A11Y: "Avaa valikon, jossa on luettelo lisätoiminnoista, jotka voi toteuttaa tiedostolle."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Lisää asetuksia",
         A11Y: "Avaa valikko, jossa on lisää asetuksia, napsauttamalla tätä painiketta."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Muokkaa"
         },
         UPLOAD: {
           TITLE: "Siirrä"
         }
       }
     },
     WELCOME: {
       TITLE: "Tiedostonäkymä ja lisätiedot on yhdistetty",
       SUBTITLE: "Nyt voit tarkastella tiedostoa ja sen kommentteja rinnakkain.",
       LINES: {
          LINE_1: "Kaikki tiedot ja vanhassa sivussa käytettävissä olleet toiminnot löytyvät nyt täältä.",
          LINE_2: "Kommentit, yhteiskäyttö, versiot ja perustiedot näkyvät tiedoston vieressä."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Siirry seuraavaan tiedostoon napsauttamalla tätä painiketta.",
      PREVIOUS_A11Y: "Siirry edelliseen tiedostoon napsauttamalla tätä painiketta."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Sulje",
         A11Y: "Sulje tiedostojen tarkasteluohjelma napsauttamalla tätä painiketta."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Uusi tiedostosta",
         ACTION_NAME:"Luo tiedosto",
         A11Y: {
           TEXT: "Luo asiakirja (DOC-, DOCX- tai ODT-tiedosto) mallitiedostosta. Voit muokata näitä asiakirjoja verkossa Docs-ohjelman avulla.",
           PRES: "Luo esitys (PPT-, PPTX- tai ODP-tiedosto) mallitiedostosta. Voit muokata näitä esityksiä verkossa Docs-ohjelman avulla.",
           SHEET: "Luo laskentataulukko (XLS-, XLSX- tai ODS-tiedosto) mallitiedostosta. Voit muokata näitä laskentataulukoita verkossa Docs-ohjelman avulla."
         },
         PROMPT: {
           TEXT: "Luo asiakirja (DOC-, DOCX- tai ODT-tiedosto) mallitiedostosta. Voit muokata näitä asiakirjoja verkossa Docs-ohjelman avulla.",
           PRES: "Luo esitys (PPT-, PPTX- tai ODP-tiedosto) mallitiedostosta. Voit muokata näitä esityksiä verkossa Docs-ohjelman avulla.",
           SHEET: "Luo laskentataulukko (XLS-, XLSX- tai ODS-tiedosto) mallitiedostosta. Voit muokata näitä laskentataulukoita verkossa Docs-ohjelman avulla."
         },
         NAME_FIELD: "Nimi:",
         EXTERNAL_FIELD: "Tiedostot voi määrittää yhteiskäyttöön organisaation ulkopuolisten henkilöiden kanssa",
         EXTERNAL_DESC: "Ulkoisen käytön avulla tiedostoja ja kansioita voi määrittää yhteiskäyttöön ulkoisten käyttäjien (organisaation tai yrityksen ulkopuolisten henkilöiden) kanssa ja ulkoisia henkilöitä voi lisätä yhteisöjen jäseniksi. Ulkoinen käyttö on määritettävä tiedostoa siirrettäessä. Sitä ei voi ottaa käyttöön myöhemmin.",
         CREATE_BUTTON: "Luo",
         CANCEL: "Peruuta",
         PRE_FILL_NAMES: {
           OTT: "Nimetön asiakirja",
           OTS: "Nimetön laskentataulukko",
           OTP: "Nimetön esitys",
           DOT: "Nimetön asiakirja",
           XLT: "Nimetön laskentataulukko",
           POT: "Nimetön esitys",
           DOTX: "Nimetön asiakirja",
           XLTX: "Nimetön laskentataulukko",
           POTX: "Nimetön esitys"
         },
         ERRORS: {
           NAME_REQUIRED: "Asiakirjan nimi on pakollinen.",
           ILLEGAL_NAME:"Asiakirjan otsikko ei kelpaa. Määritä toinen otsikko.",
           WARN_LONG_NAME: "Asiakirjan nimi on liian pitkä.",
           TRIM_NAME: "Haluatko lyhentää asiakirjan nimeä?",
           SESSION_TIMEOUT: "Istunto on vanhentunut. Kirjaudu sisään ja yritä uudelleen.",
           DUPLICATE_NAME: "Nimen kaksoiskappale on löytynyt. Anna uusi nimi.",
           SERVER_ERROR: "Connections-palvelin ei ole käytettävissä. Ota yhteys palvelimen pääkäyttäjään ja yritä myöhemmin uudelleen."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Lataa tiedosto",
         A11Y: "Lataa tiedosto napsauttamalla tätä painiketta."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Lataa PDF-tiedostona",
         TOOLTIP: "Lataa tämä tiedosto PDF-tiedostona",
         A11Y: "Lataa tiedosto PDF-tiedostona napsauttamalla tätä painiketta.",
         SUCCESS: "Olet ladannut tiedoston PDF-tiedostona.",
         ERROR: {
           DEFAULT: "Tiedoston lataus PDF-tiedostona ei onnistunut.  Yritä myöhemmin uudelleen.",
           UNAUTHENTICATED: "Istunto on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit ladata tiedoston PDF-tiedostona.",
           NOT_FOUND: "Tiedoston lataus PDF-tiedostona ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
           ACCESS_DENIED: "Tiedoston lataus PDF-tiedostona ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Tiedostosta ei ole julkaistua ladattavaa versiota.  Versioita voidaan julkaista Docs-muokkausohjelmasta."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Tiedoston lataus ei onnistu",
           CANCEL: "Sulje",
           PROMPT: "Tiedostosta ei ole julkaistua ladattavaa versiota.",
           PROMPT2: "Versioita voidaan julkaista Docs-muokkausohjelmasta."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Tiedoston lataus ei onnistu",
           CANCEL: "Sulje",
           PROMPT: "Tiedostosta ei ole julkaistua ladattavaa versiota.",
           PROMPT2: "Pyydä tiedoston omistajaa julkaisemaan tiedoston versio."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Version lataus",
           OK: "Lataa versio",
           PROMPT: {
             TODAY: "Järjestelmä on havainnut uudemman luonnoksen, jota on viimeksi muokattu tänään kello ${time}.",
             YESTERDAY: "Järjestelmä on havainnut uudemman luonnoksen, jota on viimeksi muokattu eilen kello ${time}.",
             DAY: "Järjestelmä on havainnut uudemman luonnoksen, jota on viimeksi muokattu ${date}.",
             MONTH: "Järjestelmä on havainnut uudemman luonnoksen, jota on viimeksi muokattu ${date}.",
             YEAR: "Järjestelmä on havainnut uudemman luonnoksen, jota on viimeksi muokattu ${date_long}."
           },
           PROMPT2: {
             TODAY: "Haluatko varmasti jatkaa tänään kello ${time} julkaistun version latausta?",
             YESTERDAY: "Haluatko varmasti jatkaa eilen kello ${time} julkaistun version latausta?",
             DAY: "Haluatko varmasti jatkaa ${date} julkaistun version latausta?",
             MONTH: "Haluatko varmasti jatkaa ${date} julkaistun version latausta?",
             YEAR: "Haluatko varmasti jatkaa ${date_long} julkaistun version latausta?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Näytä lisätietonäyttö",
         HIDE: "Piilota lisätietonäyttö",
         SHOW_A11Y: "Avaa ja sulje sivupalkki napsauttamalla tätä painiketta. Sivupalkki on nyt suljettu.",
         HIDE_A11Y: "Avaa ja sulje sivupalkki napsauttamalla tätä painiketta. Sivupalkki on nyt avoinna."
       },
       VIEW_DOC: {
         NAME: "Avaa Docs-tarkasteluohjelmassa",
         TOOLTIP: "Avaa Docs-tarkasteluohjelmassa",
         A11Y: "Tämän painikkeen avulla voit avata tiedoston uuteen selainikkunaan."
       },
       EDIT_DOC: {
         NAME: "Muokkaa Docs-sovelluksessa",
         TOOLTIP: "Muokkaa tiedostoa Docs-sovelluksessa",
         A11Y: "Tämän painikkeen avulla voit avata tiedoston uuteen selainikkunaan muokattavaksi Docs-sovelluksessa."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Muokkaa työasemassa",
         DIALOG_TITLE: "Muokkaa työasemassa",
         TOOLTIP: "Muokkaa tätä asiakirjaa",
         A11Y: "Avaa tiedosto muokattavaksi paikallisesti napsauttamalla tätä painiketta.",
         PROMPT: "Tämän ominaisuuden avulla voit muokata tiedostoa paikallisesti.",
         IMPORTANT: "Tärkeää:",
         REMINDER: "Kun olet lopettanut muokkauksen, julkaise luonnos käyttämällä työpöydän tiedostoliittimiä. Jos tiedosto ei avaudu, työpöytälisäosat on ehkä asennettava.",
         SKIP_DIALOG: "Älä näytä tätä sanomaa uudelleen.",
         OK: "OK",
         CANCEL: "Peruuta"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Vahvista",
         DELETE_VERSION: "Poista versio ${version}",
         DELETE_VERSION_AND_PRIOR: "Poista versio ${version} ja kaikki vanhemmat versiot",
         PROMPT: "Olet poistamassa version ${version}. Haluatko jatkaa?",
         DELETE_PRIOR: "Poista myös kaikki vanhemmat versiot",
         ERROR: "On ilmennyt virhe poistettaessa versiota. Yritä myöhemmin uudelleen.",
         TOOLTIP: "Poista tämä versio",
         OK: "OK",
         CANCEL: "Peruuta"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Nouda linkit",
         LINK_FILE: "Linkki tiedostoon:",
         LINK_PREVIEW: "Linkki esikatselutiedostoon:",
         LINK_DOWNLOAD: "Linkki lataustiedostoon:",
         TOOLTIP: "Linkki tiedostoon",
         OK: "Sulje"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Lataa tämä versio"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Vahvista",
         PROMPT: "Aiot korvata tiedoston nykyisen version versiolla ${version}. Haluatko jatkaa?",
         ERROR: "On ilmennyt virhe palautettaessa versiota. Yritä myöhemmin uudelleen.",
         TOOLTIP: "Palauta tämä versio",
         CHANGE_SUMMARY: "Palautettu versiosta ${version}",
         OK: "OK",
         CANCEL: "Peruuta"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Vahvista",
         REMOVE_EVERYONE: "Haluatko varmasti poistaa tiedoston julkisesta käytöstä organisaatiossasi? Jos julkinen käyttö poistetaan, järjestelmä poistaa tiedoston kansioista ja yhteisöistä, jotka sallivat organisaatiotason käytön, ja vain tiedoston omistaja sekä henkilöt, joille tiedosto on määritetty yhteiskäyttöön, voivat tarkastella ja käsitellä tiedostoa.",
         REMOVE_USER: "Haluatko varmasti lopettaa yhteiskäytön käyttäjän ${user} kanssa? Jos lopetat yhteiskäytön, ${user} voi käyttää tätä tiedostoa vain kansioiden kautta tai silloin, jos tiedosto on yhteiskäytössä kaikkien organisaation jäsenten kanssa.",
         REMOVE_COMMUNITY: "Haluatko varmasti poistaa tämän tiedoston yhteisöstä ${communityName}?",
         REMOVE_FOLDER: "Haluatko varmasti poistaa tämän tiedoston kansiosta ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Poista organisaation käyttö",
         REMOVE_USER_TOOLTIP: "Poista kaikki käyttäjän ${user} yhteiskäyttömääritykset",
         REMOVE_COMMUNITY_TOOLTIP: "Poista yhteisöstä ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Poista kansiosta ${folderName}",
         OK: "OK",
         CANCEL: "Peruuta"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Muokkaa kommenttia"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Vahvista",
         PROMPT: "Haluatko varmasti poistaa tämän kommentin?",
         ERROR: "On ilmennyt virhe poistettaessa kommenttia. Yritä myöhemmin uudelleen.",
         TOOLTIP: "Poista kommentti",
         OK: "OK",
         CANCEL: "Peruuta"
       },
       LIKE: {
         LIKE: "Ilmaise pitäväsi tiedostosta",
         UNLIKE: "Kumoa tiedostosta pitäminen",
         LIKE_A11Y: "Ilmaise pitäväsi tiedostosta napsauttamalla tätä painiketta.",
         UNLIKE_A11Y: "Kumoa tiedostosta pitäminen napsauttamalla tätä painiketta.",
         LIKED_SUCCESS: "Ilmoitit pitäväsi tästä tiedostosta",
         UNLIKE_SUCCESS: "Kumosit tiedostosta pitämisen"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Muokkaa kuvausta",
         ERROR: {
           DEFAULT: "Kuvauksen tallennus ei onnistunut. Yritä myöhemmin uudelleen.",
           UNAUTHENTICATED: "Istunto on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit päivittää kuvauksen.",
           NOT_FOUND: "Kuvauksen tallennus ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
           ACCESS_DENIED: "Kuvauksen tallennus ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Tiedoston tallennuksessa on ilmennyt virhe.",
           CONFLICT: "Samanniminen tiedosto on jo järjestelmässä"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Tämän tiedoston seuraamisessa on ilmennyt virhe. Yritä myöhemmin uudelleen.",
             UNAUTHENTICATED: "Istunto on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit seurata tätä tiedostoa.",
             NOT_FOUND: "Et voi seurata tätä tiedostoa, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
             ACCESS_DENIED: "Et voi seurata tätä tiedostoa, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
           },
           UNFOLLOW: {
             DEFAULT: "Tämän tiedoston seuraamisen lopettamisessa on ilmennyt virhe. Yritä myöhemmin uudelleen.",
             UNAUTHENTICATED: "Istunto on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit lopettaa tämän tiedoston seuraamisen.",
             NOT_FOUND: "Et voi lopettaa tämän tiedoston seuraamista, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
             ACCESS_DENIED: "Et voi lopettaa tämän tiedoston seuraamista, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
           }
         },
         FOLLOW_NAME: "Aloita seuranta",
         FOLLOW_TOOLTIP: "Aloita tiedoston seuranta",
         FOLLOW_A11Y: "Aloita tiedoston seuranta napsauttamalla tätä painiketta.",
         FOLLOW_SUCCESS: "Seuraat tästä lähtien tätä tiedostoa.",
         STOP_FOLLOWING_NAME: "Lopeta seuranta",
         STOP_FOLLOWING_TOOLTIP: "Lopeta tiedoston seuranta",
         STOP_FOLLOWING_A11Y: "Lopeta tiedoston seuranta napsauttamalla tätä painiketta.",
         STOP_FOLLOWING_SUCCESS: "Olet lopettanut tämän tiedoston seurannan."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Lisää synkronointiin",
           TOOLTIP: "Lisää tämä tiedosto synkronointiin",
           A11Y: "Lisää tiedosto synkronointiin napsauttamalla tätä painiketta.",
           SUCCESS: "Olet lisännyt tämän tiedoston synkronointiin.",
           ERROR: {
             DEFAULT: "Tiedoston lisäyksessä synkronointiin on ilmennyt virhe. Yritä myöhemmin uudelleen.",
             UNAUTHENTICATED: "Istunto on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit lisätä tiedoston synkronointiin.",
             NOT_FOUND: "Et voi lisätä tiedostoa synkronointiin, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
             ACCESS_DENIED: "Et voi lisätä tiedostoa synkronointiin, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
           }
         },
         STOP_SYNC: {
           NAME: "Poista synkronoinnista",
           TOOLTIP: "Poista tämä tiedosto synkronoinnista",
           A11Y: "Poista tiedosto synkronoinnista napsauttamalla tätä painiketta.",
           SUCCESS: "Olet poistanut tämän tiedoston synkronoinnista.",
           ERROR: {
             DEFAULT: "Tiedoston poistossa synkronoinnista on ilmennyt virhe. Yritä myöhemmin uudelleen.",
             UNAUTHENTICATED: "Istunto on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit poistaa tiedoston synkronoinnista.",
             NOT_FOUND: "Et voi poistaa tiedostoa synkronoinnista, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
             ACCESS_DENIED: "Et voi poistaa tiedostoa synkronoinnista, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Kiinnitä",
          FAVORITE_TOOLTIP: "Kiinnitä tiedosto",
          FAVORITE_A11Y: "Kiinnitä tiedosto napsauttamalla tätä painiketta.",
          FAVORITE_SUCCESS: "Olet kiinnittänyt tämän tiedoston.",
          STOP_FAVORITEING_NAME: "Poista kiinnitys",
          STOP_FAVORITEING_TOOLTIP: "Poista tämän tiedoston kiinnitys",
          STOP_FAVORITEING_A11Y: "Poista tiedoston kiinnitys napsauttamalla tätä painiketta.",
          STOP_FAVORITEING_SUCCESS: "Olet poistanut tämän tiedoston kiinnityksen."
       },
       TRASH: {
         NAME: "Siirrä roskakoriin",
         DIALOG_TITLE: "Vahvista",
         PROMPT: "Haluatko varmasti siirtää tämän tiedoston roskakoriin? Jos siirrät tämän tiedoston roskakoriin, se ei ole enää kenenkään nykyisen yhteiskäyttäjän käytössä.",
         ERROR: "Tiedostoa poistettaessa on ilmennyt virhe. Yritä myöhemmin uudelleen.",
         TOOLTIP: "Poista tämä tiedosto",
         OK: "OK",
         CANCEL: "Peruuta",
         A11Y: "Siirrä tiedosto roskakoriin napsauttamalla tätä painiketta.",
         SUCCESS_MSG: "${file} on siirretty roskakoriin."
       },
       REFRESH: {
         NAME: "Päivitä",
         ERROR: "Tiedostojen tarkasteluohjelman päivityksessä on ilmennyt virhe. Yritä myöhemmin uudelleen.",
         TOOLTIP: "Päivitä tiedostojen tarkasteluohjelma",
         INFO_MSG: "Nouda viimeisin sisältö päivittämällä. ${link}",
         A11Y: "Siirrä tiedosto roskakoriin napsauttamalla tätä painiketta.",
         SUCCESS_MSG: "Sisältö on päivitetty."
       },
       COPY_FILE: {
         NAME: "Anna kopio yhteisöön",
         DIALOG_TITLE: "Vahvista",
         ERROR: "Tiedostoa kopioitaessa on ilmennyt virhe. Yritä myöhemmin uudelleen.",
         TOOLTIP: "Antaa tiedoston kopion yhteisöön",
         OK: "OK",
         CANCEL: "Peruuta",
         A11Y: "Napsauttamalla tätä painiketta voit avata valintaikkunan, jossa voit antaa tiedoston kopion yhteisöön.",
         SUCCESS_MSG: "${file} on kopioitu yhteisöön ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Siirrä uusi versio palvelimeen",
         NAME_SHORT: "Siirrä",
         CHANGE_SUMMARY: "Valinnainen muutoksen tiivistelmä...",
         TOOLTIP: "Siirrä tiedoston uusi versio palvelimeen",
         A11Y: "Napsauttamalla tätä painiketta voit avata valintaikkunan, jossa voit siirtää tiedoston uuden version palvelimeen."
       },
       LOG_IN: {
    	   NAME: "Kirjaudu sisään",
    	   TOOLTIP: "Kirjautumalla sisään voit siirtää ja määrittää tiedostoja yhteiskäyttöön, lisätä kommentteja ja luoda kansioita"
       },
       LOCK: {
          NAME: "Lukitse tiedosto",
          TITLE: "Lukitse tämä tiedosto",
          A11Y: "Lukitse tämä tiedosto",
          SUCCESS: "Tiedosto on lukittu."
       },
       UNLOCK: {
          NAME: "Poista tiedoston lukitus",
          TITLE: "Poista tämän tiedoston lukitus",
          A11Y: "Poista tämän tiedoston lukitus",
          SUCCESS: "Tiedoston lukitus on poistettu."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Muokkaa työasemassa",
          TITLE: "Muokkaa työasemassa",
          A11Y: "Muokkaa työasemassa"
       },
       FLAG: {
         FILE: {
           NAME: "Merkitse asiattomaksi",
           TITLE: "Merkitse tiedosto",
           A11Y: "Merkitse tämä tiedosto asiattomaksi",
           PROMPT: "Kirjoita tiedostomerkinnän syy (valinnainen):",
           OK: "Merkitse",
           CANCEL: "Peruuta",
           SUCCESS: "Tiedosto on merkitty ja lähetetty tarkistettavaksi.",
           ERROR: "On ilmennyt virhe merkittäessä tätä tiedostoa asiattomaksi. Yritä myöhemmin uudelleen."
         },
         COMMENT: {
           NAME: "Merkitse asiattomaksi",
           TITLE: "Merkitse kommentti",
           A11Y: "Merkitse kommentti asiattomaksi",
           PROMPT: "Anna syy tämän kommentin merkitsemiselle (valinnainen):",
           OK: "Merkitse",
           CANCEL: "Peruuta",
           SUCCESS: "Kommentti on merkitty ja lähetetty tarkistettavaksi.",
           ERROR: "On ilmennyt virhe merkittäessä tätä kommenttia asiattomaksi. Yritä myöhemmin uudelleen."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Tietoja tästä tiedostosta",
       VIEW_FILE_DETAILS: "Näytä tiedoston tiedot",
       A11Y: "Tämän linkin aktivointi sulkee tiedostojen tarkasteluohjelman ja ohjaa sinut tiedoston lisätietosivulle."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Tiedoston esikatselu ei ole käytettävissä."
      },
      IMAGE: {
       ZOOM_IN: "Lähennä",
       ZOOM_OUT: "Loitonna",
       RESET: "Palauta",
       ZOOM_IN_A11Y: "Lähennä kuvaa napsauttamalla tätä painiketta.",
       ZOOM_OUT_A11Y: "Loitonna kuvaa napsauttamalla tätä painiketta.",
       RESET_ZOOM_A11Y: "Palauta zoomaustaso napsauttamalla tätä painiketta."
      },
      VIEWER: {
       LOADING: "Lataus on meneillään...",
       NO_PUBLISHED_VERSION: "Tästä tiedostosta ei ole käytettävissä julkaistua versiota tarkastelua varten.",
       IFRAME_TITLE: "Tiedoston esikatselu"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Viimeksi päivittänyt ${user} tänään kello ${time}",
       YESTERDAY: "Viimeksi päivittänyt ${user} eilen kello ${time}",
       DAY: "Viimeksi päivittänyt ${user}, ${EEee} kello ${time}",
       MONTH: "Viimeksi päivittänyt ${user}, ${date_long}.",
       YEAR: "Viimeksi päivittänyt ${user}, ${date_long}."
      },
      CREATED: {
       TODAY: "Käyttäjän ${user} luoma, tänään kello ${time}",
       YESTERDAY: "Käyttäjän ${user} luoma, eilen kello ${time}",
       DAY: "Käyttäjän ${user} luoma, ${EEee} kello ${time}",
       MONTH: "Käyttäjän ${user} luoma, ${date_long}",
       YEAR: "Käyttäjän ${user} luoma, ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - tänään",
       YESTERDAY: "${time} - eilen",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "Tänään",
       YESTERDAY: "Eilen",
       DAY: "${EEee}",
       MONTH: "${date_long}",
       YEAR: "${date_long}"
      }
     },
     FILE_SIZE: {
      BYTES: "${size} t",
      KILOBYTES: "${size} kt",
      MEGABYTES: "${size} Mt",
      GIGABYTES: "${size} Gt",
      TERRABYTES: "${size} Tt"
     },
     COMMENT_BOX: {
       TITLE: "Kommentin tekstialue",
       SHADOW_TEXT: "Lisää kommentti...",
       CANNOT_ACCESS_CONTENT: "Seuraavat mainitsemasi henkilöt eivät voi tarkastella kommenttia, koska heillä ei ole sisällön käyttöoikeutta:",
       ERROR: "On ilmennyt virhe tarkistettaessa käyttäjää, jonka yrität mainita.",
       POST: "Lisää",
       SAVE: "Tallenna",
       CANCEL: "Peruuta",
       EXTERNAL_WARNING: "Kommentit saattavat näkyä organisaation ulkopuolisille henkilöille."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Peruuta",
         A11Y: "Peruuta tiedoston nimen muokkaus napsauttamalla tätä painiketta."
       },
       INVALID_CHARACTERS: "Virheellinen merkki",
       INVALID_CHARACTERS_REMOVED: "Virheelliset merkit on poistettu"
     },
     COMMENT_WIDGET: {
       EDITED: "(Muokattu)",
       EDITED_DATE: {
         TODAY: "Muokattu tänään kello ${time}",
         YESTERDAY: "Muokattu eilen kello ${time}",
         DAY: "Muokattu ${EEee} kello ${time}",
         MONTH: "Muokattu ${date_long}",
         YEAR: "Muokattu ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Tallenna",
       CANCEL: "Peruuta",
       USER: "Käyttäjä",
       COMMUNITY: "Yhteisö",
       SHARE: "Määritä yhteiskäyttöön",
       SHARE_ALT: "Määritä yhteiskäyttöön tämän käyttäjän kanssa",
       MEMBER_TYPE: "Jäsenlaji",
       PERSON_SHADOW: "Etsi henkilöä kirjoittamalla",
       COMMUNITY_SHADOW: "Etsi yhteisöä kirjoittamalla",
       PERSON_FULL_SEARCH: "Eikö henkilöä löydy luettelosta? Kokeile täyttä hakua...",
       COMMUNITY_FULL_SEARCH: "Eikö yhteisöä löydy luettelosta? Kokeile täyttä hakua...",
       ADD_OPTIONAL_MESSAGE: "Lisää valinnainen viesti",
       ROLE_LABEL: "Rooli",
       ROLE_EDIT: "Muokkaaja",
       ROLE_VIEW: "Lukija"
     },
     FILE_STATE: {
       DOCS_FILE: "Tämä on Docs-tiedosto. Kaikki muokkaukset on tehtävä online-tilassa.",
       LOCKED_BY_YOU: {
         TODAY: "Sinun lukitsemasi kello ${time}.",
         YESTERDAY: "Sinun lukitsemasi eilen kello ${time}.",
         DAY: "Sinun lukitsemasi ${date}.",
         MONTH: "Sinun lukitsemasi ${date}.",
         YEAR: "Sinun lukitsemasi ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Käyttäjän ${user} lukitsema kello ${time}.",
         YESTERDAY: "Käyttäjän ${user} lukitsema eilen kello ${time}.",
         DAY: "Käyttäjän ${user} lukitsema ${date}.",
         MONTH: "Käyttäjän ${user} lukitsema ${date}.",
         YEAR: "Käyttäjän ${user} lukitsema ${date_long}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "Kommentti on liian pitkä.",
         TRIM: "Haluatko lyhentää kommenttia?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "Kuvaus on liian pitkä.",
         TRIM: "Haluatko lyhentää kuvausta?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "Viesti on liian pitkä.",
         TRIM: "Haluatko lyhentää viestiä?"
       },
       TAG: {
         WARN_TOO_LONG: "Tunniste on liian pitkä.",
         TRIM: "Haluatko lyhentää tunnistetta?"
       },
       TAGS: {
         WARN_TOO_LONG: "Ainakin yksi tunniste on liian pitkä.",
         TRIM: "Haluatko lyhentää tunnisteita?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Tiedoston nimi on liian pitkä"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Tiedostoa voi muokata verkossa vain, jos on hankittu Docs-sovelluksen käyttöoikeus.",
       CURRENT_EDITORS: "Käyttäjä ${users} muokkaa tiedostoa Webissä.",
       UNPUBLISHED_CHANGES: "Tähän luonnokseen on tehty muokkauksia, joita ei ole julkaistu versiona.",
       PUBLISH_A_VERSION: "Julkaise versio",
       PUBLISH_SUCCESS: "Olet julkaissut tämän tiedoston version",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Version julkaisu ei onnistunut, koska käyttö on estetty.",
         NOT_FOUND: "Version julkaisu ei onnistunut, koska asiakirjaa ei löytynyt.",
         CANNOT_REACH_REPOSITORY: "Version julkaisu ei onnistunut, koska Docs-palvelin ei saa yhteyttä tiedostovarastoon.",
         QUOTA_VIOLATION: "Version julkaisu ei onnistunut tilarajoitusten takia. Vapauta tilaa poistamalla muita tiedostoja, jotta voit julkaista tämän version.",
         CONVERSION_UNAVAILABLE: "Version julkaisu ei onnistunut, koska Docs-muuntopalvelu ei ole käytettävissä. Yritä myöhemmin uudelleen.",
         TOO_LARGE: "Version julkaisu ei onnistunut, koska asiakirja on liian suuri.",
         CONVERSION_TIMEOUT: "Version julkaisu ei onnistunut, koska asiakirjan muunto Docs-muuntopalvelussa kestää liian kauan. Yritä myöhemmin uudelleen.",
         SERVER_BUSY: "Version julkaisu ei onnistunut, koska Docs-palvelin on varattu. Yritä myöhemmin uudelleen.",
         DEFAULT: "Version julkaisu ei onnistunut, koska Docs-palvelu ei ole käytettävissä. Yritä myöhemmin uudelleen."
       }
     },
     COMMENTS: {
       EMPTY: "Kommentteja ei ole.",
       MODERATED: "Kommentti on lähetetty tarkistettavaksi. Kommentti on käytettävissä, kun se hyväksytään.",
       ERROR: {
         SAVE: {
           DEFAULT: "Kommentin tallennus ei onnistunut. Yritä myöhemmin uudelleen.",
           UNAUTHENTICATED: "Istunto on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit tallentaa kommenttisi.",
           NOT_FOUND: "Kommentin tallennus ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
           ACCESS_DENIED: "Kommentin tallennus ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
         },
         DELETE: {
           DEFAULT: "Kommentin poisto ei onnistunut. Yritä myöhemmin uudelleen.",
           UNAUTHENTICATED: "Istunto on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit poistaa kommenttisi.",
           NOT_FOUND: "Kommentin poisto ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
           ACCESS_DENIED: "Kommentin poisto ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Tallenna",
       EDIT_TAGS: "Muokkaa tunnisteita",
       ERROR: {
         SAVE: {
           DEFAULT: "Tunnisteen luonti ei onnistunut. Yritä myöhemmin uudelleen."
         },
         DELETE: {
           DEFAULT: "Tunnisteen poisto ei onnistunut. Yritä myöhemmin uudelleen."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Enemmän tietoja...",
       READ_LESS: "Vähemmän tietoja..."
     },
     SHARE: {
	     EVERYONE: "Kaikki organisaation jäsenet",
	     ADD_TOOLTIP: "Tallenna",
	     ROLES: {
	       OWNER: "Omistaja",
	       EDIT: "Muokkaajat",
	       VIEW: "Lukijat",
	       FOLDER: "Yhteiskäytössä seuraavien kansioiden kanssa"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Omistaja"
	       },
	       EDIT: {
	         ROLE: "Muokkaaja",
           ADD: "Lisää muokkaaja"
	       },
	       VIEW: {
	         ROLE: "Lukija",
           ADD: "Lisää lukija"
	       },
	       FOLDER: {
           ADD: "Lisää kansioita",
           COMMUNITY_ADD: "Lisää kansioon",
           MOVE: "Siirrä kansioon"
	       },
	       MULTI: {
	         ADD: "Lisää henkilöitä tai yhteisöjä",
	         ADD_PEOPLE: "Lisää henkilöitä"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Kaikki organisaation jäsenet",
	        LONG: {
	           GENERIC: "Kaikki organisaation jäsenet.",
	           ORG: "Kaikki organisaatiossa ${org}."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Tämä tiedosto on jo yhteiskäytössä käyttäjän ${user} kanssa.",
	       ERROR: "Määritys yhteiskäyttöön käyttäjän ${user} kanssa ei onnistu tällä hetkellä.",
	       SELF: "Et voi määrittää itseäsi yhteiskäyttäjäksi."
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user} on korotettu ylempään yhteiskäyttörooliin."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Yhteiskäytössä henkilön ${user} kanssa"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Valinnainen sanoma..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Ulkoisen käyttäjätilin määritys",
            ACTION: "Määritä ulkoinen käyttäjätili...",
            TOOLTIP: "Määritä ulkoinen käyttäjätili",
            DIALOG_TITLE: "Sisältöä ei ole määritetty yhteiskäyttöön",
            PROMPT: {
              NO_ACCOUNT: "Seuraavalla käyttäjällä ei ole tunnusta, eikä sisältöä ole määritetty yhteiskäyttöön hänen kanssaan.",
              INVITE: "Kutsu tämä käyttäjä vieraaksi, jotta voit määrittää sisältöä yhteiskäyttöön hänen kanssaan."
            },
            SUBMIT: "Jatka kutsun lähetystä",
            CANCEL: "Peruuta",
            ERROR: "Tilin määrityksessä on ilmennyt virhe. Yritä myöhemmin uudelleen.",
            SUCCESS: "Käyttäjätilin määritys on onnistunut."
	       },
	       PLURAL: {
	         NAME: "Ulkoisten käyttäjätilien määritys",
	         ACTION: "Määritä ulkoisia käyttäjätilejä...",
	         TOOLTIP: "Määritä ulkoisia käyttäjätilejä",
	         DIALOG_TITLE: "Sisältöä ei ole määritetty yhteiskäyttöön",
	         PROMPT: {
	           NO_ACCOUNT: "Seuraavilla käyttäjillä ei ole tunnusta, eikä sisältöä ole määritetty yhteiskäyttöön heidän kanssaan.",
	           INVITE: "Kutsu nämä käyttäjät vieraiksi, jotta voit määrittää sisältöä yhteiskäyttöön heidän kanssaan."
	         },
	         SUBMIT: "Jatka kutsujen lähetystä",
	         CANCEL: "Peruuta",
	         ERROR: "Tilien määrityksessä on ilmennyt virhe. Yritä myöhemmin uudelleen.",
	         SUCCESS: "Käyttäjätilien määritys on onnistunut."
	       },
	       ABSTRACT: {
	         NAME: "Ulkoisten käyttäjätilien määritys",
            ACTION: "Määritä ulkoisia käyttäjätilejä...",
            TOOLTIP: "Määritä ulkoisia käyttäjätilejä",
            DIALOG_TITLE: "Sisältöä ei ole määritetty yhteiskäyttöön",
            PROMPT: {
              NO_ACCOUNT: "Joillakin käyttäjillä ei ole tunnusta, eikä sisältöä ole määritetty yhteiskäyttöön heidän kanssaan.",
              INVITE: "Kutsu nämä käyttäjät vieraiksi, jotta voit määrittää sisältöä yhteiskäyttöön heidän kanssaan."
            },
            SUBMIT: "Jatka kutsujen lähetystä",
            CANCEL: "Peruuta",
            ERROR: "Tilien määrityksessä on ilmennyt virhe. Yritä myöhemmin uudelleen.",
            SUCCESS: "Käyttäjätilien määritys on onnistunut."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Yhteiskäyttöasetukset",
         PROPAGATION: "Salli muiden määrittää tämä tiedosto yhteiskäyttöön",
         EVERYONE: "Kaikki voivat määrittää tiedoston yhteiskäyttöön.",
         OWNER_ONLY: "Vain omistaja voi määrittää tiedoston yhteiskäyttöön.",
         STOP_SHARE: "Lopeta yhteiskäyttö",
         MAKE_INTERNAL: "Lopeta ulkoinen yhteiskäyttö",
         MAKE_INTERNAL_SUCCESS: "Tätä tiedostoa ei voi enää määrittää yhteiskäyttöön organisaation ulkopuolisten henkilöiden kanssa.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Määritetäänkö sisäiseksi?",
           PROMPT: "Tämän tiedoston määritys sisäiseksi tarkoittaa, ettei sitä voi enää määrittää yhteiskäyttöön organisaation ulkopuolisten henkilöiden kanssa. ${br}${br}" +
             "Järjestelmä poistaa yhteiskäytöt ulkopuolisten henkilöiden, yhteisöjen tai kansioiden kanssa.${br}${br}Tiedoston määritys sisäiseksi on pysyvä, eikä sitä voi kumota."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Lopeta tiedoston yhteiskäyttö",
           PROMPT: "Haluatko varmasti lopettaa tämän tiedoston yhteiskäytön?",
           QUESTION_PUBLIC: "Tämä tiedosto ei enää ole kaikkien organisaation jäsenten nähtävissä eikä yhteiskäytössä ihmisten, kansioiden tai yhteisöjen kanssa. Tätä toimintoa ei voi kumota.",
           QUESTION_PUBLIC_E: "Tämä tiedosto ei enää ole kaikkien organisaation jäsenten nähtävissä eikä yhteiskäytössä ihmisten tai kansioiden kanssa. Tätä toimintoa ei voi kumota.",
           QUESTION: "Tiedosto ei enää ole yhteiskäytössä henkilöiden tai yhteisöjen kanssa, ja se poistetaan kaikista kansioista yksityisiä kansioitasi lukuun ottamatta. Tätä toimintoa ei voi kumota.",
           QUESTION_E: "Tiedosto ei enää ole yhteiskäytössä henkilöiden kanssa, ja se poistetaan kaikista kansioista yksityisiä kansioitasi lukuun ottamatta. Tätä toimintoa ei voi kumota."
         },
         MAKE_PRIVATE_SUCCESS: "Tiedosto on nyt yksityinen.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Tiedoston yhteiskäytön lopetus ei onnistu. Yritä myöhemmin uudelleen."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "Omat yhteiskäyttökohteet"
	   },
	   STREAM: {
	     LOADING: "Lataus on meneillään...",
	     LOAD_MORE: "Lataa lisää..."
	   },
	   ENTRY: {
	     REMOVE: "Poista",
	     RESTORE: "Palauta",
	     EDIT: "Muokkaa",
	     DELETE: "Poista",
	     OK: "OK",
	     CANCEL: "Peruuta",
	     USER_PICTURE: "Henkilön ${0} kuva",
	     FLAG: "Merkitse asiattomaksi"
	   },
	   PANEL: {
	     LOAD_ERROR: "Käytettäessä tiedoston metatietoja on ilmennyt virhe.",
	     ABOUT: {
	       TITLE: "Tietoja",
	       EXPAND_BUTTON: "Laajenna tämä painike, jos haluat nähdä lisätietoja",
	       CURRENT_VERSION_HEADER: "Nykyinen versio ${versionNumber}",
	       FILE_SIZE_HEADER: "Tiedoston koko",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - nykyinen versio",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - kaikki versiot",
	       DOCS_DRAFT_UPDATED_HEADER: "Luonnosta muokattu",
	       DOCS_DRAFT_CREATED_HEADER: "Luonnos luotu",
	       DOCS_UPDATED_HEADER: "Julkaistu",
	       DOCS_CREATED_HEADER: "Luotu",
	       UPDATED_HEADER: "Päivitetty",
	       CREATED_HEADER: "Luotu",
	       LIKES_HEADER: "Pitämiset",
	       LIKES_EXPAND_ICON: "Laajenna tämä kuvake, jos haluat nähdä tiedostosta pitäneet henkilöt",
	       DOWNLOADS_HEADER: "Lataukset",
	       DOWNLOADS_HEADER_MORE: "Lataukset (${0})",
	       DOWNLOADS_EXPAND_ICON: "Laajenna tämä kuvake, jos haluat nähdä tiedoston ladanneet henkilöt",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonyymisti",
	       DOWNLOADS_LATEST_VERSION: "Sinulla on tiedoston uusin versio",
	       DOWNLOADS_LAST_VERSION: "Latasit viimeksi tämän tiedoston version ${0}",
	       TAGS_HEADER: "Tunnisteet",
	       DESCRIPTION_HEADER: "Kuvaus",
	       DESCRIPTION_READ_MORE: "Lisätietoja...",
	       LINKS_HEADER: "Linkit",
	       SECURITY: "Suojaus",
	       FILE_ENCRYPTED: "Tiedoston sisältö on salattu. Salattua tiedoston sisältöä ei voi hakea. Tiedoston sisältöä ei voi tarkastella eikä muokata HCL Docs -ohjelmassa.",
	       GET_LINKS: "Nouda linkit...",
	       ADD_DESCRIPTION: "Lisää kuvaus",
	       NO_DESCRIPTION: "Ei kuvausta",
	       ADD_TAGS: "Lisää tunnisteita",
	       NO_TAGS: "Ei tunnisteita"
	     },
	     COMMENTS: {
	       TITLE: "Kommentit",
	       TITLE_WITH_COUNT: "Kommentit (${0})",
	       VERSION: "Versio ${0}",
	       FEED_LINK: "Näiden kommenttien syöte",
	       FEED_TITLE: "Seuraa näiden kommenttien muutoksia syötteiden lukuohjelmalla"
	     },
	     SHARING: {
	       TITLE: "Yhteiskäyttö",
	       TITLE_WITH_COUNT: "Yhteiskäyttö (${0})",
	       SHARED_WITH_FOLDERS: "Yhteiskäytössä ${count} kansion kanssa",
	       SEE_WHO_HAS_SHARED: "Näytä, kuka on määrittänyt tämän yhteiskäyttöön",
           COMMUNITY_FILE: "Yhteisön omistamia tiedostoja ei voi määrittää yhteiskäyttöön yksittäisten henkilöiden tai muiden yhteisöjen kanssa.",
           SHARED_WITH_COMMUNITY: "Yhteiskäytössä yhteisön ${0} jäsenten kanssa",
           LOGIN: "Kirjaudu sisään",
           NO_SHARE: "Tätä tiedostoa ei ole vielä lisätty kansioon.",
           ONE_SHARE: "Tiedosto sijaitsee kansiossa tai yhteisössä, johon sinulla ei ole käyttöoikeutta.",
           MULTIPLE_SHARE: "Tiedosto sijaitsee ${fileNumber} kansiossa tai yhteisössä, joihin sinulla ei ole käyttöoikeutta."
	     },
	     VERSIONS: {
	       TITLE: "Versiot",
	       TITLE_WITH_COUNT: "Versiot (${0})",
	       FEED_LINK: "Näiden versioiden syöte",
	       FEED_TITLE: "Seuraa tämän tiedoston muutoksia syötteiden lukuohjelmalla"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Toiminnon vahvistus",
       DIALOG_TITLE: "Vahvista",
       PROMPT: "Haluatko varmasti toteuttaa tämän toiminnon?",
       ERROR: "Toimintoa toteutettaessa on ilmennyt virhe. Yritä myöhemmin uudelleen.",
       TOOLTIP: "Toteuta toiminto",
       OK: "OK",
       CANCEL: "Peruuta",
       A11Y: "Toteuta nykyinen toiminto napsauttamalla tätä painiketta."
     },
     THUMBNAIL: {
       TITLE: "Pienoiskuva",
       CHANGE_LINK: "Muuta pienoiskuvaa...",
       ERROR: "Pienoiskuvan tallennus ei onnistunut. Yritä myöhemmin uudelleen.",
       EXT_ERROR: "Valitse tiedosto, jolla on jokin seuraavista tuetuista tunnisteista: ${0}",
       SUCCESS: "Pienoiskuva on muutettu",
       UPLOAD: "Tallenna",
       CANCEL: "Peruuta"
     },
     UPLOAD_VERSION: {
       LINK: "Siirrä uusi versio palvelimeen...",
       CHANGE_SUMMARY: "Valinnainen muutoksen tiivistelmä...",
       ERROR: "Uuden version tallennus ei onnistunut. Yritä myöhemmin uudelleen.",
       SUCCESS: "Uusi versio on tallennettu",
       UPLOAD: "Siirrä",
       UPLOAD_AND_CHANGE_EXTENSION: "Siirrä palvelimeen ja vaihda tunniste",
       CANCEL: "Peruuta"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Tiedostoa käytettäessä on ilmennyt virhe. Yritä myöhemmin uudelleen.",
       UNAUTHENTICATED: "Istunto on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit tarkastella tiedostoa.",
       NOT_FOUND: "Pyydetty tiedosto on poistettu tai siirretty. Jos sait tämän linkin joltakulta, tarkista, että linkki on virheetön.",
       ACCESS_DENIED: "Sinulla ei ole tiedoston tarkasteluoikeuksia. Tiedosto ei ole yhteiskäytössä kanssasi.",
       ACCESS_DENIED_ANON: "Sinulla ei ole tiedoston tarkasteluoikeuksia. Jos tämä on oma tiedostosi tai se on määritetty sinulle yhteiskäyttöön, kirjaudu ensin sisään."
     },
     LOAD_ERROR: {
       DEFAULT: "Linkin avauksessa on ilmennyt virhe.",
       ACCESS_DENIED: "Pyydä tiedoston tarkasteluoikeutta tiedoston omistajalta."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - tiedosto",
       LOAD_ERROR: "Tiedoston käsittelyssä on ilmennyt virhe"
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
