/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2021                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "Tiedoston esikatselu",
      FILENAME_TOOLTIP: "Muokkaa tiedoston nimeä",
      ICON_TOOLTIP: "Lataa tiedosto",
      ERROR: "On ilmennyt virhe.",
      FILE_MALICIOUS: "Virusten etsinnän aikana on löytynyt vahingollista sisältöä",
      SHARED_EXTERNALLY: "Jaettu ulkoisesti",
      FILE_SYNCED: "Lisätty synkronointiin",
      MY_DRIVE: {
         TITLE: "Omassa asemassa",
         ROOT_FOLDER: "/Oma asema",
         FOLDER: "/Oma asema/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Lisää toimintoja",
         A11Y: "Avaa valikon, jossa on luettelo lisätoiminnoista, jotka voi toteuttaa tiedostolle.",
            PANELS: {
               TITLE: "Lisää",
               A11Y: "Avaa valikon, jossa on luettelo piilotetuista näytöistä"
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
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Muokkauksen lisäasetukset",
            A11Y: "Avaa muokkauksen lisäasetusvalikko napsauttamalla tätä painiketta."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Muokkaa"
            },
            UPLOAD: {
               TITLE: "Lataa"
            },
            CREATE: {
              TITLE: "Luo"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Muuta näytön kokoa",
           USAGE: "Muuta näytön kokoa painamalla vasenta tai oikeaa suljenäppäintä."
       },
         CLOSE: {
            TOOLTIP: "Sulje",
            A11Y: "Sulje tiedostojen tarkasteluohjelma napsauttamalla tätä painiketta.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Tiedoston siirto palvelimeen on vielä meneillään.",
              PROMPT: "Tiedostoasi ladataan yhä. Jos suljet, ennen kuin se valmistuu, lataaminen peruutetaan.",
              OK: "Sulje silti",
              CANCEL: "Odota siirtoa"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Lisää Tiedostot-sovellukseen",
           A11Y: "Lisää liite Tiedostot-sovellukseen napsauttamalla tätä painiketta.",
           VIEW_NOW: "Tarkastele nyt"
         },
         TEAR_OFF: {
           TOOLTIP: "Avaa uudessa ikkunassa",
           A11Y: "Avaa uudessa ikkunassa",
           ERROR_TEARING_OFF: "Uuden ikkunan avaamisessa on ilmennyt virhe.",
           DIALOG_TITLE: "Vahvista",
           UNSAVED_CHANGES_WARNING: "Sinulla on tallentamattomia muutoksia, jotka menetetään. Haluatko silti avata uudessa ikkunassa?",
           OK: "Kyllä",
           CANCEL: "Ei",
           OPEN: "Avaa",
           OPEN_ANYWAY: "Avaa joka tapauksessa",
           CANCEL_ALT: "Peruuta"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Uusi tiedostosta",
            ACTION_NAME:"Luo tiedosto",
            A11Y: {
               TEXT: "Luo asiakirja (DOC-, DOCX- tai ODT-tiedosto) mallipohjatiedostosta. Voit muokata näitä asiakirjoja verkossa Docs-ohjelmassa.",
               PRES: "Luo esitys (PPT-, PPTX- tai ODP-tiedosto) mallipohjatiedostosta. Voit muokata näitä esityksiä verkossa Docs-ohjelmassa.",
               SHEET: "Luo laskentataulukko (XLS-, XLSX- tai ODS-tiedosto) mallipohjatiedostosta. Voit muokata näitä laskentataulukoita verkossa Docs-ohjelmassa."
            },
            PROMPT: {
               TEXT: "Luo asiakirja (DOC-, DOCX- tai ODT-tiedosto) mallipohjatiedostosta. Voit muokata näitä asiakirjoja verkossa Docs-ohjelmassa.",
               PRES: "Luo esitys (PPT-, PPTX- tai ODP-tiedosto) mallipohjatiedostosta. Voit muokata näitä esityksiä verkossa Docs-ohjelmassa.",
               SHEET: "Luo laskentataulukko (XLS-, XLSX- tai ODS-tiedosto) mallipohjatiedostosta. Voit muokata näitä laskentataulukoita verkossa Docs-ohjelmassa."
            },
            NAME_FIELD: "Nimi:",
            EXTERNAL_FIELD: "Tiedostoja voi jakaa organisaation ulkopuolisten henkilöiden kanssa",
            EXTERNAL_DESC: "Ulkoisen käytön avulla tiedostoja ja kansioita voi jakaa ulkoisten käyttäjien (organisaation tai yrityksen ulkopuolisten henkilöiden) kanssa ja ulkoisia henkilöitä voi lisätä yhteisöjen jäseniksi.  Ulkoinen käyttö on määritettävä tiedostoa siirrettäessä. Sitä ei voi ottaa käyttöön myöhemmin.",
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
               DUPLICATE_NAME: "Löydettiin tiedoston nimen kaksoiskappale. Anna uusi nimi.",
               SERVER_ERROR: "Connections-palvelin ei ole saatavilla. Ota yhteyttä palvelimen pääkäyttäjään ja yritä myöhemmin uudelleen."
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
               DEFAULT: "Et voinut ladata tiedostoa PDF-tiedostona. Yritä myöhemmin uudelleen.",
               UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit ladata tiedoston PDF-tiedostona.",
               NOT_FOUND: "Tiedoston lataus PDF-tiedostona ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
               ACCESS_DENIED: "Tiedoston lataus PDF-tiedostona ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Tästä tiedostosta ei ole julkaistua versiota, joka olisi ladattavissa. Versiot voidaan julkaista Docs-muokkausohjelmasta."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Tiedoston lataus ei onnistu",
               CANCEL: "Sulje",
               PROMPT: "Tästä tiedostosta ei ole julkaistua versiota, jonka voi ladata.",
               PROMPT2: "Versioita voidaan julkaista Docs-muokkausohjelmasta."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Tiedoston lataus ei onnistu",
               CANCEL: "Sulje",
               PROMPT: "Tästä tiedostosta ei ole julkaistua versiota, jonka voi ladata.",
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
            RESET: "Palauta näytön koko",
            SHOW_A11Y: "Tämä painike avaa ja sulkee sivupaneelin. Sivupaneeli on tällä hetkellä suljettu.",
            HIDE_A11Y: "Tämä painike avaa ja sulkee sivupaneelin. Sivupaneeli on tällä hetkellä avoinna.",
            RESET_A11Y: "Tämä painike palauttaa sivupaneelin oletuskokoonsa. Sivupaneeli on tällä hetkellä laajennettu."
         },
         VIEW_DOC: {
            NAME: "Avaa Docs-tarkasteluohjelmassa",
            TOOLTIP: "Avaa Docs-tarkasteluohjelmassa",
            A11Y: "Tämän painikkeen avulla voit avata tiedoston uuteen selainikkunaan."
         },
         EDIT_DOC: {
            NAME: "Muokkaa Docs-ohjelmassa",
            TOOLTIP: "Muokkaa tätä tiedostoa HCL Docs -sovelluksessa",
            A11Y: "Tämän painikkeen avulla voit avata tiedoston uuteen selainikkunaan muokattavaksi Docs-sovelluksessa."
         },
         EDIT_OFFICE: {
            TITLE: "Muokkausasetukset",
            NAME: "Muokkaa Microsoft Office Online -palvelussa",
            TOOLTIP: "Muokkaa tätä tiedostoa Microsoft Office Online -palvelussa",
            A11Y: "Tämän painikkeen avulla voit avata tiedoston uuteen selainikkunaan muokattavaksi Microsoft Office Online -palvelussa."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Muokkaa Microsoft Word Online -sovelluksessa",
           TOOLTIP: "Muokkaa tätä tiedostoa Microsoft Word Online -sovelluksessa",
           A11Y: "Tämän painikkeen avulla voit avata tiedoston uuteen selainikkunaan muokattavaksi Microsoft Word Online -sovelluksessa."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Muokkaa Microsoft Excel Online -sovelluksessa",
             TOOLTIP: "Muokkaa tätä tiedostoa Microsoft Excel Online -sovelluksessa",
             A11Y: "Tämän painikkeen avulla voit avata tiedoston uuteen selainikkunaan muokattavaksi Microsoft Excel Online -sovelluksessa."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Muokkaa Microsoft PowerPoint Online -sovelluksessa",
             TOOLTIP: "Muokkaa tätä tiedostoa Microsoft PowerPoint Online -sovelluksessa",
             A11Y: "Tämän painikkeen avulla voit avata tiedoston uuteen selainikkunaan muokattavaksi Microsoft PowerPoint Online -sovelluksessa."
         },
         OFFICE_EDITED: {
             SUCCESS: "Tiedoston tallennus on meneillään."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Muokkaa työasemassa",
            DIALOG_TITLE: "Muokkaa työasemassa",
            TOOLTIP: "Muokkaa tätä asiakirjaa",
            A11Y: "Avaa tiedosto muokattavaksi paikallisesti napsauttamalla tätä painiketta.",
            PROMPT: "Tämän ominaisuuden avulla voit muokata tiedostoa tietokoneeseesi asennetussa ohjelmassa.",
            INSTALL: "${startLink}Asenna työpöytätiedoston yhdistimet${endLink} ennen jatkamista.",
			// The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Tärkeää:",
            REMINDER: "Kun muokkaus on valmis, julkaise luonnos käyttämällä työpöydän tiedostoliittimiä.",
            SKIP_DIALOG: "Älä näytä tätä sanomaa uudelleen.",
            OK: "OK",
            CANCEL: "Peruuta"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Vahvista",
            DELETE_VERSION: "Poista versio ${version}",
            DELETE_VERSION_AND_PRIOR: "Poista versio ${version} ja kaikki vanhemmat versiot",
            PROMPT: "Olet poistamassa versiota ${version}. Haluatko jatkaa?",
            DELETE_PRIOR: "Poista myös kaikki vanhemmat versiot",
            ERROR: "Virhe versiota poistettaessa. Yritä myöhemmin uudelleen.",
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
            PROMPT: "Olet korvaamassa tämän tiedoston nykyisen version versiolla ${version}. Haluatko jatkaa?",
            ERROR: "Virhe versiota palautettaessa. Yritä myöhemmin uudelleen.",
            TOOLTIP: "Palauta tämä versio",
            CHANGE_SUMMARY: "Palautettu versiosta ${version}",
            OK: "OK",
            CANCEL: "Peruuta"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Vahvista",
            REMOVE_EVERYONE: "Haluatko varmasti poistaa tiedoston julkisesta käytöstä organisaatiossasi? Jos julkinen käyttö poistetaan, järjestelmä poistaa tiedoston kansioista ja yhteisöistä, jotka sallivat organisaatiotason käytön, ja vain tiedoston omistaja sekä henkilöt, joille tiedosto on jaettu, voivat tarkastella ja käsitellä tiedostoa.",
            REMOVE_USER: "Haluatko varmasti lopettaa jakamisen käyttäjän ${user} kanssa? Jos lopetat jakamisen, ${user} voi käyttää tätä tiedostoa vain kansioiden kautta tai silloin, jos tiedosto on yhteiskäytössä kaikkien organisaation jäsenten kanssa.",
            REMOVE_COMMUNITY: "Haluatko varmasti poistaa tämän tiedoston yhteisöstä ${communityName}?",
            REMOVE_FOLDER: "Haluatko varmasti poistaa tämän tiedoston kansiosta ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Poista organisaation käyttö",
            REMOVE_USER_TOOLTIP: "Poista kaikki jakamiset käyttäjän ${user} kanssa",
            REMOVE_COMMUNITY_TOOLTIP: "Poista yhteisöstä ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Poista kansiosta ${folderName}",
            OK: "OK",
            CANCEL: "Peruuta",
            EFSS: {
              DIALOG_TITLE: "Vahvista",
              REMOVE_EVERYONE: "Haluatko varmasti poistaa tiedoston julkisesta käytöstä organisaatiossasi? Jos julkinen käyttö poistetaan, järjestelmä poistaa tiedoston kansioista, jotka sallivat organisaatiotason käytön, ja vain tiedoston omistaja sekä henkilöt, joille tiedosto on jaettu, voivat tarkastella ja käsitellä tiedostoa.",
              REMOVE_USER: "Haluatko varmasti lopettaa jakamisen käyttäjän ${user} kanssa? Jos lopetat jakamisen, ${user} voi käyttää tätä tiedostoa vain kansioiden kautta tai silloin, jos tiedosto on jaettu kaikkien organisaation jäsenten kanssa.",
              REMOVE_COMMUNITY: "Haluatko varmasti poistaa tämän tiedoston yhteisöstä ${communityName}?",
              REMOVE_FOLDER: "Haluatko varmasti poistaa tämän tiedoston kansiosta ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Poista organisaation käyttö",
              REMOVE_USER_TOOLTIP: "Poista kaikki jakamiset käyttäjän ${user} kanssa",
              REMOVE_COMMUNITY_TOOLTIP: "Poista yhteisöstä ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Poista kansiosta ${folderName}",
              OK: "OK",
              CANCEL: "Peruuta",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Muokkaa kommenttia"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Vahvista",
            PROMPT: "Haluatko varmasti poistaa tämän kommentin?",
            ERROR: "Virhe kommenttia poistettaessa. Yritä myöhemmin uudelleen.",
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
               DEFAULT: "Kuvausta ei voitu tallentaa. Yritä myöhemmin uudelleen.",
               UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit päivittää kuvauksen.",
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
                  DEFAULT: "Virhe lisättäessä tätä tiedostoa seurattaessa. Yritä myöhemmin uudelleen.",
                  UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit seurata tätä tiedostoa.",
                  NOT_FOUND: "Et voi seurata tätä tiedostoa, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
                  ACCESS_DENIED: "Et voi seurata tätä tiedostoa, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
               },
               UNFOLLOW: {
                  DEFAULT: "Virhe lisättäessä tämän tiedoston seuraamista lopetettaessa. Yritä myöhemmin uudelleen.",
                  UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit lopettaa tämän tiedoston seuraamisen.",
                  NOT_FOUND: "Et voi lopettaa tämän tiedoston seuraamista, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
                  ACCESS_DENIED: "Et voi lopettaa tämän tiedoston seuraamista, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
               }
            },
            FOLLOW_NAME: "Seuraa",
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
                  DEFAULT: "Virhe lisättäessä tätä tiedostoa synkronointiin. Yritä myöhemmin uudelleen.",
                  UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit lisätä tämän tiedoston synkronointiin.",
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
                  UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit poistaa tämän tiedoston synkronoinnista.",
                  NOT_FOUND: "Et voi poistaa tiedostoa synkronoinnista, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
                  ACCESS_DENIED: "Et voi poistaa tiedostoa synkronoinnista, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
               }
            },
            MYDRIVE: {
                NAME: "Lisää Omaan asemaan",
                TOOLTIP: "Lisää tiedosto Omaan asemaan",
                A11Y: "Lisää tiedosto Omaan asemaan napsauttamalla tätä painiketta.",
                SUCCESS: "Olet lisännyt tämän tiedoston Omaan asemaan.",
                ERROR: {
                   DEFAULT: "Virhe lisättäessä tätä tiedostoa omaan asemaan. Yritä myöhemmin uudelleen.",
                   UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit lisätä tämän tiedoston omaan asemaan.",
                   NOT_FOUND: "Et voi lisätä tiedostoa Omaan asemaan, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
                   ACCESS_DENIED: "Et voi lisätä tiedostoa Omaan asemaan, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Poista omasta asemasta",
                TOOLTIP: "Poista tämä tiedosto Omasta asemasta",
                A11Y: "Poista tiedosto Omasta asemasta napsauttamalla tätä painiketta.",
                SUCCESS: "Olet poistanut tämän tiedoston Omasta asemasta.",
                ERROR: {
                   DEFAULT: "Tiedoston poistossa Omasta asemasta on ilmennyt virhe. Yritä myöhemmin uudelleen.",
                   UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit poistaa tämän tiedoston omasta asemasta.",
                   NOT_FOUND: "Et voi poistaa tiedostoa Omasta asemasta, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
                   ACCESS_DENIED: "Et voi poistaa tiedostoa Omasta asemasta, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
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
            PROMPT: "Haluatko varmasi siirtää tämän tiedoston roskakoriin? Jos siirrät tiedoston roskakoriin, se ei ole enää kenenkään nykyisen yhteiskäyttäjän käytettävissä.",
            ERROR: "Virhe tiedostoa poistettaessa. Yritä myöhemmin uudelleen.",
            TOOLTIP: "Poista tämä tiedosto",
            OK: "OK",
            CANCEL: "Peruuta",
            A11Y: "Siirrä tiedosto roskakoriin napsauttamalla tätä painiketta.",
            SUCCESS_MSG: "${file} on siirretty roskakoriin."
         },
         REFRESH: {
            NAME: "Päivitä",
            ERROR: "Virhe tiedoston tarkasteluohjelmaa päivitettäessä. Yritä myöhemmin uudelleen.",
            TOOLTIP: "Päivitä tiedostojen tarkasteluohjelma",
            INFO_MSG: "Nouda viimeisin sisältö päivittämällä. ${link}",
            A11Y: "Siirrä tiedosto roskakoriin napsauttamalla tätä painiketta.",
            SUCCESS_MSG: "Sisältö on päivitetty."
         },
         COPY_FILE: {
            NAME: "Anna kopio yhteisöön...",
            DIALOG_TITLE: "Vahvista",
            ERROR: "Virhe tiedostoa kopioitaessa. Yritä myöhemmin uudelleen.",
            TOOLTIP: "Antaa tiedoston kopion yhteisöön",
            OK: "OK",
            CANCEL: "Peruuta",
            A11Y: "Napsauttamalla tätä painiketta voit avata valintaikkunan, jossa voit antaa tiedoston kopion yhteisöön.",
            SUCCESS_MSG: "${file} on kopioitu yhteisöön ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Siirrä omistajuus...",
            DIALOG_TITLE: "Siirrä omistajuus",
            TOOLTIP: "Siirrä tämä tiedosto uudelle omistajalle",
            A11Y: "Tämä painike avaa valintaikkunan, jossa voit siirtää tämän tiedoston uudelle omistajalle.",
            EMPTY: "Tyhjennä"
         },
         UPLOAD_VERSION: {
            NAME: "Siirrä uusi versio palvelimeen",
            NAME_SHORT: "Lataa",
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
            SUCCESS: "Tiedosto on lukittu.",
            ERROR: "Tiedoston lukitus ei onnistunut, koska se on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
         },
         UNLOCK: {
            NAME: "Poista tiedoston lukitus",
            TITLE: "Poista tämän tiedoston lukitus",
            A11Y: "Poista tämän tiedoston lukitus",
            SUCCESS: "Tiedoston lukitus on poistettu.",
            ERROR: "Tiedoston lukituksen poisto ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
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
               PROMPT: "Anna syy tämän tiedoston merkitsemiselle (valinnainen):",
               OK: "Merkitse",
               CANCEL: "Peruuta",
               SUCCESS: "Tiedosto on merkitty ja lähetetty tarkistettavaksi.",
               ERROR: "Tämän tiedoston merkitsemisessä on ilmennyt virhe, yritä myöhemmin uudelleen."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Onnistuminen",
               PROMPT: "Tiedosto on merkitty ja lähetetty tarkistettavaksi.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Merkitse asiattomaksi",
               TITLE: "Merkitse kommentti",
               A11Y: "Merkitse kommentti asiattomaksi",
               PROMPT: "Anna syy tämän kommentin merkitsemiselle (valinnainen):",
               OK: "Merkitse",
               CANCEL: "Peruuta",
               SUCCESS: "Kommentti on merkitty ja lähetetty tarkistettavaksi.",
               ERROR: "Tämän kommentin merkitsemisessä on ilmennyt virhe, yritä myöhemmin uudelleen."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Onnistuminen",
            PROMPT: "Muutokset on lähetetty tarkistettavaksi. Tämä tiedosto ei ole saatavilla, ennen kuin muutokset on hyväksytty.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Avattavan luettelon painike"
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
            RESET_ZOOM_A11Y: "Palauta zoomaustaso napsauttamalla tätä painiketta.",
            UNSAFE_PREVIEW: "Tiedostoa ei voi esikatsella, koska sitä ei ole tarkistettu virusten varalta."
         },
         VIEWER: {
            LOADING: "Ladataan...",
            PUBLISHING: "Julkaisu on meneillään...",
            NO_PUBLISHED_VERSION: "Tästä tiedostosta ei ole käytettävissä julkaistua versiota tarkastelua varten.",
            IFRAME_TITLE: "Tiedoston esikatselu",
            AUTOPUBLISH_TIMEOUT: "Palvelimen vastaamiseen menee liian kauan. Uusimpia muutoksia ei ehkä ole julkaistu."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Tiedostoa ei voi esikatsella, koska sitä ei ole tarkistettu virusten varalta."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Tiedostoa on päivittänyt viimeksi ${user} tänään kello ${time}",
            YESTERDAY: "Tiedostoa on päivittänyt viimeksi ${user} eilen kello ${time}",
            DAY: "Tiedostoa on päivittänyt viimeksi ${user} ${EEee} kello ${time}.",
            MONTH: "Tiedostoa on päivittänyt viimeksi ${user} ${date_long}",
            YEAR: "Tiedostoa on päivittänyt viimeksi ${user} ${date_long}"
         },
         CREATED: {
            TODAY: "${user} on luonut tänään kello ${time}",
            YESTERDAY: "${user} on luonut eilen kello ${time}",
            DAY: "${user} on luonut ${EEee} kello ${time}",
            MONTH: "${user} on luonut ${date_long}",
            YEAR: "${user} on luonut ${date_long}"
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
            TODAY: "tänään",
            YESTERDAY: "eilen",
            DAY: "${EEee}",
            MONTH: "${date_long}",
            YEAR: "${date_long}"
         }
      },
      FILE_SIZE: {
         B: "${0} t",
         KB: "${0} kt",
         MB: "${0} Mt",
         GB: "${0} Gt",
         TB: "${0} Tt"
      },
      COMMENT_BOX: {
         TITLE: "Kommentin tekstialue",
         SHADOW_TEXT: "Lisää kommentti...",
         CANNOT_ACCESS_CONTENT: "Seuraavat mainitsemasi henkilöt eivät voi tarkastella kommenttia, koska heillä ei ole sisällön käyttöoikeutta:",
         ERROR: "Virhe tarkistettaessa käyttäjää, jonka yrität mainita.",
         POST: "Julkaise",
         SAVE: "Tallenna",
         CANCEL: "Peruuta",
         EXTERNAL_WARNING: "Kommentit saattavat näkyä organisaation ulkopuolisille henkilöille."
      },
      EDIT_BOX: {
         SAVE: "Tallenna",
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
         USER: "Henkilö",
         COMMUNITY: "Yhteisö",
         SHARE: "Jaa",
         SHARE_ALT: "Määritä yhteiskäyttöön tämän henkilön kanssa",
         MEMBER_TYPE: "Jäsenlaji",
         PERSON_SHADOW: "Etsi henkilöä kirjoittamalla",
         COMMUNITY_SHADOW: "Etsi yhteisöä kirjoittamalla",
         PERSON_ARIA: "Etsi henkilö kirjoittamalla. Voit vaihtaa henkilöiden, yhteisöjen ja kaikkien organisaatioon kuuluvien välillä painamalla näppäinyhdistelmää Vaihto+Sarkain.",
         COMMUNITY_ARIA: "Etsi yhteisö kirjoittamalla. Voit vaihtaa henkilöiden, yhteisöjen ja kaikkien organisaatioon kuuluvien välillä painamalla näppäinyhdistelmää Vaihto+Sarkain.",
         PERSON_FULL_SEARCH: "Eikö henkilöä löydy luettelosta? Kokeile täyttä hakua...",
         COMMUNITY_FULL_SEARCH: "Eikö yhteisöä löydy luettelosta? Kokeile täyttä hakua...",
         ADD_OPTIONAL_MESSAGE: "Lisää valinnainen viesti",
         ROLE_LABEL: "Rooli",
         ROLE_EDIT: "Muokkaaja",
         ROLE_VIEW: "Lukija"
      },
      FILE_STATE: {
         DOCS_FILE: "Tämä on Docs-tiedosto. Muokkaukset on tehtävä online-tilassa.",
         LOCKED_BY_YOU: {
            TODAY: "Lukitsit tämän kello ${time}.",
            YESTERDAY: "Sinun lukitsemasi eilen kello ${time}.",
            DAY: "Lukitsit tämän ${date}.",
            MONTH: "Lukitsit tämän ${date}.",
            YEAR: "Lukitsit tämän ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "${user} lukinnut kello ${time}, ",
            YESTERDAY: "${user} on lukinnut eilen kello ${time}.",
            DAY: "${user} on lukinnut ${date}.",
            MONTH: "${user} on lukinnut ${date}.",
            YEAR: "${user} on lukinnut ${date_long}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Lyhennä tekstiä automaattisesti",
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
         NO_ENTITLEMENT: "Tiedostoa voi muokata online-tilassa HCL Docs -ohjelmassa.",
         NO_ENTITLEMENT_LINK: "Henkilöt, joilla on ${startLink}HCL Docs${endLink}, voivat muokata tätä tiedostoa verkossa.",
		 // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Käyttäjät ${users} muokkaavat tätä tiedostoa Webissä.",
         UNPUBLISHED_CHANGES: "Tähän luonnokseen on tehty muokkauksia, joita ei ole julkaistu versiona.",
         PUBLISH_A_VERSION: "Julkaise versio",
         PUBLISH_SUCCESS: "Olet julkaissut tämän tiedoston version",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "Version julkaisu ei onnistunut, koska käyttö on estetty.",
            NOT_FOUND: "Version julkaisu ei onnistunut, koska asiakirjaa ei löytynyt.",
            CANNOT_REACH_REPOSITORY: "Version julkaisu ei onnistunut, koska Docs-palvelin ei saa yhteyttä tiedostovarastoon.",
            QUOTA_VIOLATION: "Versiota ei voitu julkaista tilarajoitusten vuoksi. Vapauta tarpeeksi tilaa tämän version julkaisemiseen poistamalla muita tiedostoja.",
            CONVERSION_UNAVAILABLE: "Version julkaisu ei onnistunut, koska Docs-muuntopalvelu ei ole käytettävissä. Yritä myöhemmin uudelleen.",
            TOO_LARGE: "Version julkaisu ei onnistunut, koska asiakirja on liian suuri.",
            CONVERSION_TIMEOUT: "Version julkaisu ei onnistunut, koska asiakirjan muunto Docs-muuntopalvelussa kestää liian kauan. Yritä myöhemmin uudelleen.",
            SERVER_BUSY: "Version julkaisu ei onnistunut, koska Docs-palvelin ei ole käytettävissä. Yritä myöhemmin uudelleen.",
            DEFAULT: "Version julkaisu ei onnistunut, koska Docs-palvelu ei ole käytettävissä. Yritä myöhemmin uudelleen."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Tekemiäsi muokkauksia julkaistaan. ${startLink}Katso muutokset päivittämällä.${endLink}",
            GENERIC: "Sinun on ehkä päivitettävä sivu, jos haluat nähdä viimeisimmät muutokset. ${startLink}Päivitä${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Kommentteja ei ole.",
         MODERATED: "Kommentti on lähetetty tarkistettavaksi. Kommentti on käytettävissä, kun se hyväksytään.",
         ERROR: {
            SAVE: {
               DEFAULT: "Kommenttiasi ei voitu tallentaa. Yritä myöhemmin uudelleen.",
               UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit tallentaa kommenttisi.",
               NOT_FOUND: "Kommentin tallennus ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi.",
               ACCESS_DENIED: "Kommentin tallennus ei onnistunut, koska tiedosto on poistettu tai se ei ole enää yhteiskäytössä kanssasi."
            },
            DELETE: {
               DEFAULT: "Kommenttiasi ei voitu poistaa. Yritä myöhemmin uudelleen.",
               UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit poistaa kommenttisi.",
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
               DEFAULT: "Sivun poisto ei onnistunut. Yritä myöhemmin uudelleen."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Lisätietoja...",
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
               ROLE: "Muokkaa",
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
               GENERIC: "Kaikki organisaation jäsenet",
               ORG: "Kaikki organisaatiossa ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Tämä tiedosto on jo jaettu käyttäjän ${user} kanssa.",
            ERROR: "Jakaminen käyttäjän ${user} kanssa ei onnistu tällä hetkellä.",
            SELF: "Et voi määrittää itseäsi yhteiskäyttäjäksi."
         },
         SHARE_INFO: {
            PROMOTED: "${user} on korotettu ylempään jakamisrooliin."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Jaettu henkilön${user}  kanssa"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Tiedosto on määritetty yhteiskäyttöön."
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
               ERROR: "Virhe tiliä varattaessa. Yritä myöhemmin uudelleen.",
               SUCCESS: "Käyttäjätilin määritys on onnistunut."
            },
            PLURAL: {
               NAME: "Ulkoisten käyttäjätilien määritys",
               ACTION: "Määritä ulkoisia käyttäjätilejä...",
               TOOLTIP: "Määritä ulkoisia käyttäjätilejä",
               DIALOG_TITLE: "Sisältöä ei ole määritetty yhteiskäyttöön",
               PROMPT: {
                  NO_ACCOUNT: "Seuraavilla käyttäjillä ei ole tunnusta, eikä sisältöä jaettu heidän kanssaan.",
                  INVITE: "Kutsu nämä käyttäjät vieraiksi, jotta voit jakaa sisältöä heidän kanssaan."
               },
               SUBMIT: "Jatka kutsujen lähetystä",
               CANCEL: "Peruuta",
               ERROR: "Virhe tilejä varattaessa. Yritä myöhemmin uudelleen.",
               SUCCESS: "Käyttäjätilien määritys on onnistunut."
            },
            ABSTRACT: {
               NAME: "Ulkoisten käyttäjätilien määritys",
               ACTION: "Määritä ulkoisia käyttäjätilejä...",
               TOOLTIP: "Määritä ulkoisia käyttäjätilejä",
               DIALOG_TITLE: "Sisältöä ei ole määritetty yhteiskäyttöön",
               PROMPT: {
                  NO_ACCOUNT: "Joillakin käyttäjillä ei ole tunnusta, eikä sisältöä ole määritetty yhteiskäyttöön heidän kanssaan.",
                  INVITE: "Kutsu nämä käyttäjät vieraiksi, jotta voit jakaa sisältöä heidän kanssaan."
               },
               SUBMIT: "Jatka kutsujen lähetystä",
               CANCEL: "Peruuta",
               ERROR: "Virhe tilejä varattaessa. Yritä myöhemmin uudelleen.",
               SUCCESS: "Käyttäjätilien määritys on onnistunut."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Yhteiskäyttöasetukset",
         PROPAGATION: "Salli muiden määrittää tämä tiedosto yhteiskäyttöön",
         EVERYONE: "Kaikki voivat määrittää tiedoston yhteiskäyttöön.",
         OWNER_ONLY: "Vain omistaja voi määrittää tiedoston yhteiskäyttöön.",
         STOP_SHARE: "Lopeta jakaminen",
         MAKE_INTERNAL: "Lopeta ulkoinen yhteiskäyttö",
         MAKE_INTERNAL_SUCCESS: "Tätä tiedostoa ei voi enää määrittää yhteiskäyttöön organisaation ulkopuolisten henkilöiden kanssa.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Määritetäänkö sisäiseksi?",
            PROMPT: "Tämän tiedoston määritys sisäiseksi tarkoittaa, ettei sitä voi enää jakaa organisaation ulkopuolisten henkilöiden kanssa. ${br}${br}" +
            "Järjestelmä poistaa jakamiset ulkopuolisten henkilöiden, yhteisöjen tai kansioiden kanssa.${br}${br}Tiedoston määritys sisäiseksi on pysyvä, eikä sitä voi kumota.",
            EFSS: {
               DIALOG_TITLE: "Määritetäänkö sisäiseksi?",
               PROMPT: "Tämän tiedoston määritys sisäiseksi tarkoittaa, ettei sitä voi enää määrittää yhteiskäyttöön organisaation ulkopuolisten henkilöiden kanssa. ${br}${br}" +
              "Järjestelmä poistaa jakamiset ulkopuolisten henkilöiden tai kansioiden kanssa.${br}${br}Tiedoston määritys sisäiseksi on pysyvä, eikä sitä voi kumota."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Lopeta tiedoston yhteiskäyttö",
            PROMPT: "Haluatko varmasti lopettaa tämän tiedoston yhteiskäytön?",
            QUESTION_PUBLIC: "Tämä tiedosto ei enää ole kaikkien organisaation jäsenten nähtävissä eikä jaettu ihmisten, kansioiden tai yhteisöjen kanssa. Tätä toimintoa ei voi kumota.",
            QUESTION_PUBLIC_E: "Tämä tiedosto ei enää ole kaikkien organisaation jäsenten nähtävissä eikä jaettu ihmisten, kansioiden tai yhteisöjen kanssa. Tätä toimintoa ei voi kumota.",
            QUESTION: "Tiedosto ei enää ole jaettu ihmisten tai yhteisöjen kanssa, ja se poistetaan kaikista kansioista yksityisiä kansioitasi lukuun ottamatta. Tätä toimintoa ei voi kumota.",
            QUESTION_E: "Tiedosto ei enää ole jaettu henkilöiden kanssa, ja se poistetaan kaikista kansioista yksityisiä kansioitasi lukuun ottamatta. Tätä toimintoa ei voi kumota."
         },
         MAKE_PRIVATE_SUCCESS: "Tiedosto on nyt yksityinen.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Tiedoston jakamista ei voitu lopettaa. Yritä myöhemmin uudelleen."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Omat yhteiskäyttökohteet"
      },
      STREAM: {
         LOADING: "Ladataan...",
         LOAD_MORE: "Lataa lisää..."
      },
      ENTRY: {
         REMOVE: "Poista",
         RESTORE: "Palauta",
         EDIT: "Muokkaa",
         DELETE: "Poista",
         OK: "OK",
         CANCEL: "Peruuta",
         USER_PICTURE: "Käyttäjän ${0} kuva",
         FLAG: "Merkitse asiattomaksi"
      },
      PANEL: {
         LOAD_ERROR: "Tämän tiedoston metatietojen käytössä on ilmennyt virhe.",
         ABOUT: {
            TITLE: "Tietoja",
            EXPAND_BUTTON: "Laajenna tämä painike, jos haluat nähdä lisätietoja",
            CURRENT_VERSION_HEADER: "Nykyinen versio ${versionNumber}",
            FILE_SIZE_HEADER: "Tiedoston koko",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Nykyinen versio",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Kaikki versiot",
            DOCS_DRAFT_UPDATED_HEADER: "Luonnosta muokattu",
            DOCS_DRAFT_CREATED_HEADER: "Luonnos luotu",
            DOCS_UPDATED_HEADER: "Julkaistu",
            DOCS_CREATED_HEADER: "Luotu",
            UPDATED_HEADER: "Päivitetty",
            CREATED_HEADER: "Luotu",
            LIKES_HEADER: "Tykkäykset",
            LIKES_EXPAND_ICON: "Laajenna tämä kuvake, jos haluat nähdä tiedostosta pitäneet henkilöt",
            DOWNLOADS_HEADER: "Näyttökerrat",
            DOWNLOADS_HEADER_MORE: "Näyttökerrat (${0})",
            DOWNLOADS_EXPAND_ICON: "Laajenna tämä kuvake, jos haluat nähdä tiedostoa tarkastelleet henkilöt",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} nimettömästi",
            DOWNLOADS_LATEST_VERSION: "Sinulla on tiedoston uusin versio",
            DOWNLOADS_LAST_VERSION: "Tarkastelit viimeksi tämän tiedoston versiota ${0}",
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
            TITLE: "Jaetaan",
            TITLE_WITH_COUNT: "Jaettu (${0})",
            SHARED_WITH_FOLDERS: "Jaettu kansioille - ${count}",
            SEE_WHO_HAS_SHARED: "Näytä, kuka on määrittänyt tämän yhteiskäyttöön",
            COMMUNITY_FILE: "Yhteisön omistamia tiedostoja ei voi määrittää yhteiskäyttöön henkilöille tai muille yhteisöille.",
            SHARED_WITH_COMMUNITY: "Yhteiskäytössä yhteisön ${0} jäsenten kanssa",
            LOGIN: "Kirjaudu sisään",
            NO_SHARE: "Tätä tiedostoa ei ole vielä lisätty kansioon.",
            ONE_SHARE: "Tiedosto on kansiossa tai yhteisössä, johon sinulla ei ole käyttöoikeutta.",
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
         ERROR: "Virhe toimintoa suoritettaessa. Yritä myöhemmin uudelleen.",
         TOOLTIP: "Toteuta toiminto",
         OK: "OK",
         CANCEL: "Peruuta",
         A11Y: "Toteuta nykyinen toiminto napsauttamalla tätä painiketta."
      },
      THUMBNAIL: {
         TITLE: "Pienoiskuva",
         CHANGE_LINK: "Muuta pienoiskuvaa...",
         ERROR: "Pienoiskuvaa ei voitu tallentaa. Yritä myöhemmin uudelleen.",
         EXT_ERROR: "Valitse tiedosto, jolla on jokin seuraavista tuetuista tunnisteista: ${0}",
         SUCCESS: "Pienoiskuva on muutettu",
         UPLOAD: "Tallenna",
         CANCEL: "Peruuta"
      },
      UPLOAD_VERSION: {
         LINK: "Siirrä uusi versio palvelimeen...",
         CHANGE_SUMMARY: "Valinnainen muutoksen tiivistelmä...",
         ERROR: "Uutta versiota ei voitu tallentaa. Yritä myöhemmin uudelleen.",
         SUCCESS: "Uusi versio on tallennettu",
         UPLOAD: "Lataa",
         UPLOAD_AND_CHANGE_EXTENSION: "Siirrä palvelimeen ja vaihda tunniste",
         CANCEL: "Peruuta",
         TOO_LARGE: "${file} on suurempi kuin sallittu tiedostokoko (${size}).",
         PROGRESS_BAR_TITLE: "Ladataan uutta versiota (${uploaded}/${total} valmiina)",
         CANCEL_UPLOAD: "Peruuta siirto"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Virhe tiedostoa käytettäessä. Yritä myöhemmin uudelleen.",
         UNAUTHENTICATED: "Istuntosi on aikakatkaistu. Sinun on kirjauduttava uudelleen sisään, ennen kuin voit tarkastella tiedostoa.",
         NOT_FOUND: "Pyydetty tiedosto on poistettu tai siirretty. Jos sait tämän linkin joltakulta, tarkista, että linkki on virheetön.",
         ACCESS_DENIED: "Sinulla ei ole tiedoston tarkasteluoikeuksia. Tiedostoa ei ole jaettu sinulle.",
         ACCESS_DENIED_ANON: "Sinulla ei ole tiedoston tarkasteluoikeuksia. Jos tämä on oma tiedostosi tai se on jaettu sinulle, sinun on ensin kirjauduttava sisään."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Virhe",
         PROMPT: "Pyydetty tiedosto on poistettu tai siirretty.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Vahvista",
        PROMPT: "HCL Connections -istunto on aikakatkaistu.${lineBreaks}Kirjaudu takaisin sisään valitsemalla OK tai sulje valintaikkuna valitsemalla Peruuta.",
        OK: "OK",
        CANCEL: "Peruuta"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Linkki on virheellinen",
        PROMPT: "Linkin käytössä ilmeni virhe.${lineBreaks}Järjestelmä uudelleenohjaa sinut sivulle, kun valitset OK.",
        OK: "OK",
        CANCEL: "Peruuta"
      },
      LOAD_ERROR: {
         DEFAULT: "Linkin käytössä on ilmennyt virhe.",
         ACCESS_DENIED: "Ota yhteys tiedoston omistajaan ja pyydä tämän näkymän käyttöoikeutta."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Tiedosto",
         LOAD_ERROR: "Tiedostoa käytettäessä on ilmennyt virhe"
      },
      SHARE_WITH_LINK: {
         TITLE: "Määritä yhteiskäyttöön linkin perusteella",
         EMPTY_DESCRIPTION: "Et ole vielä luonut linkkiä tätä tiedostoa varten. Luo muille lähetettävä yhteiskäyttölinkki, jonka avulla voi esikatsella tiedostoa ja ladata sen.",
         CREATE_LINK: "Luo linkki",
         COPY_LINK: "Kopioi linkki",
         DELETE_LINK: "Poista linkki",
         ACCESS_TYPE_1: "Kuka vain linkin saanut voi tarkastella tiedostoa",
         ACCESS_TYPE_2: "Organisaatioon kuuluvat henkilöt voivat tarkastella tiedostoa",
         ACCESS_TYPE_1_DESCRIPTION: "Linkin saavat henkilöt voivat esikatsella tiedostoa ja ladata sen kirjauduttuaan Connections-ohjelmaan.",
         ACCESS_TYPE_2_DESCRIPTION: "Linkin saavat oman organisaation henkilöt voivat esikatsella tiedostoa ja ladata sen kirjauduttuaan Connections-ohjelmaan.",
         CHANGE_TYPE_SUCCESS: "Linkin käyttöoikeus päivittyy käytön lajin muuttuessa.",
         CHANGE_TYPE_ERROR: "Linkin käyttöoikeuden päivitys epäonnistui käytön lajin muuttuessa.",
         COPY_LINK_SUCCESS: "Linkki on kopioitu leikepöydälle",
         CREATE_SHARELINK_SUCCESS:"Linkin luonti onnistui.",
         CREATE_SHARELINK_ERROR:"Linkin luonti ei onnistu virheen takia.",
         DELETE_SHARELINK_SUCCESS: "Tiedoston ${file} jakamislinkki on poistettu.",
         DELETE_SHARELINK_ERROR: "Yhteiskäyttölinkkiä ei poistettu. Yritä myöhemmin uudelleen.",
         CONFIRM_DIALOG: {
            OK: "Poista",
            DIALOG_TITLE: "Poista yhteiskäyttölinkki",
            PROMPT: "Tämä tiedosto ei ole enää kenenkään linkin saaneen käytettävissä. Haluatko varmasti poistaa yhteiskäyttölinkin?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Yhteiskäyttölinkki on aktiivinen. Kuka vain linkin saanut voi tarkastella tiedostoa. Kopioi linkki napsauttamalla sitä.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Yhteiskäyttölinkki on aktiivinen. Organisaatioon kuuluvat henkilöt voivat tarkastella tiedostoa. Kopioi linkki napsauttamalla sitä."
      }
});
