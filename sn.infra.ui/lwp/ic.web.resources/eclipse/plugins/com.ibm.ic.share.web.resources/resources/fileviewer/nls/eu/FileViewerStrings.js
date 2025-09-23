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

define({
      FILE_VIEWER_TITLE: "Fitxategiaren aurrebista",
      FILENAME_TOOLTIP: "Editatu fitxategiaren izena",
      ICON_TOOLTIP: "Deskargatu fitxategia",
      ERROR: "Errore bat gertatu da.",
      FILE_MALICIOUS: "Aurkitutako eduki gaiztoa eskaneatzen",
      SHARED_EXTERNALLY: "Kanpokoekin partekatua",
      FILE_SYNCED: "Sinkronizazioan gehitu da",
      MY_DRIVE: {
         TITLE: "Nire Diskoan",
         ROOT_FOLDER: "Nire Diskoa",
         FOLDER: "/Nire Diskoa/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Ekintza gehiago",
         A11Y: "Fitxategian gauzatzeko ekintza gehiago dituen zerrenda bat zabaltzen du.",
            PANELS: {
               TITLE: "Gehiago",
               A11Y: "Ezkutatutako panelak dituen menua irekitzen du"
            }
      },
      WELCOME: {
         TITLE: "Fitxategiaren ikuspegia eta xehetasunak bateratu egin ditugu",
         SUBTITLE: "Orain, fitxategia eta bere iruzkinak bata besteen aldean ikus ditzakezu.",
         LINES: {
            LINE_1: "Orri zaharrean egin zenitzakeen gauza guztiak eta informazioa hemen daude.",
            LINE_2: "Iruzkinak, partekatzea, bertsioak eta oinarrizko informazioa fitxategiaren alde batean daude ."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Botoi honek hurrengo fitxategira nabigatzen du.",
         PREVIOUS_A11Y: "Botoi honek aurreko fitxategira nabigatzen du."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Edizio-aukera gehiago",
            A11Y: "Botoi honek edizio-aukera gehiago dituen menu bat irekitzen du."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Editatu"
            },
            UPLOAD: {
               TITLE: "Kargatu"
            },
            CREATE: {
              TITLE: "Sortu"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Aldatu panelaren tamaina",
           USAGE: "Panelaren tamaina aldatzeko, sakatu ezkerreko eta eskumako kortxeteak."
       },
         CLOSE: {
            TOOLTIP: "Itxi",
            A11Y: "Botoi honek fitxategi-ikustailea ixten du.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Zure fitxategia kargatzen ari da oraindik.",
              PROMPT: "Zure fitxategia kargatzen ari da oraindik. Karga osatu baino lehen ixten baduzu, bertan behera utziko da.",
              OK: "Itxi hala ere",
              CANCEL: "Itxaron kargatu arte"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Gehitu fitxategietan",
           A11Y: "Botoi honek eranskin bat gehitzen du fitxategietan.",
           VIEW_NOW: "Ikusi orain"
         },
         TEAR_OFF: {
           TOOLTIP: "Ireki leiho berrian",
           A11Y: "Ireki leiho berrian",
           ERROR_TEARING_OFF: "Errore bat gertatu da leiho berrian irekitzean.",
           DIALOG_TITLE: "Baieztatu",
           UNSAVED_CHANGES_WARNING: "Gorde ez diren eta galduko diren aldaketak dituzu. Leiho berri batean ireki nahi duzu, dena den?",
           OK: "Bai",
           CANCEL: "Ez",
           OPEN: "Ireki",
           OPEN_ANYWAY: "Ireki, dena den",
           CANCEL_ALT: "Utzi"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Berria fitxategian oinarrituz",
            ACTION_NAME:"Sortu fitxategia",
            A11Y: {
               TEXT: "Txantiloi batean oinarrituz, sortu dokumentu bat (DOC, DOCX edo ODT). Dokumentu hauek linean edita ditzakezu, Docs-en.",
               PRES: "Txantiloi batean oinarrituz, sortu aurkezpen bat (PPT, PPTX edo ODP). Aurkezpen hauek linean edita ditzakezu, Docs-en.",
               SHEET: "Txantiloi batean oinarrituz, sortu kalkulu-orri bat (XLS, XLSX edo ODS). Kalkulu-orri hauek linean edita ditzakezu, Docs-en."
            },
            PROMPT: {
               TEXT: "Txantiloi batean oinarrituz, sortu dokumentu bat (DOC, DOCX edo ODT). Dokumentu hauek linean edita ditzakezu, Docs-en.",
               PRES: "Txantiloi batean oinarrituz, sortu aurkezpen bat (PPT, PPTX edo ODP). Aurkezpen hauek linean edita ditzakezu, Docs-en.",
               SHEET: "Txantiloi batean oinarrituz, sortu kalkulu-orri bat (XLS, XLSX edo ODS). Kalkulu-orri hauek linean edita ditzakezu, Docs-en."
            },
            NAME_FIELD: "Izena:",
            EXTERNAL_FIELD: "Fitxategiak nire erakundetik kanpoko jendearekin parteka daitezke",
            EXTERNAL_DESC: "Kanpo-sarbideari esker fitxategiak kanpoko erabiltzaileekin (erakunde edo enpresaz kanpoko pertsonekin) parteka daitezke, baita karpetak kanpoko erabiltzaileekin eta komunitateak parte-hartzaile diren kanpoko pertsonekin ere. Kanpoko sarbidea fitxategia kargatzean ezarri behar duzu, ezin baituzu beranduago aldatu.",
            CREATE_BUTTON: "Sortu",
            CANCEL: "Utzi",
            PRE_FILL_NAMES: {
               OTT: "Izenik gabeko dokumentua",
               OTS: "Izenik gabeko kalkulu-orria",
               OTP: "Izenik gabeko aurkezpena",
               DOT: "Izenik gabeko dokumentua",
               XLT: "Izenik gabeko kalkulu-orria",
               POT: "Izenik gabeko aurkezpena",
               DOTX: "Izenik gabeko dokumentua",
               XLTX: "Izenik gabeko kalkulu-orria",
               POTX: "Izenik gabeko aurkezpena"
            },
            ERRORS: {
               NAME_REQUIRED: "Dokumentuaren izena behar da.",
               ILLEGAL_NAME:"Dokumentu-izen hau baliogabea da; mesedez, zehaztu beste bat.",
               WARN_LONG_NAME: "Dokumentuaren izena luzeegia da.",
               TRIM_NAME: "Laburtu dokumentuaren izena?",
               SESSION_TIMEOUT: "Zure sesioa iraungi egin da; mesedez, hasi saioa eta saiatu berriro.",
               DUPLICATE_NAME: "Fitxategi-izen bikoiztua aurkitu da. Idatzi izen berri bat.",
               SERVER_ERROR: "Connections-en zerbitzaria ez dago erabilgarri. Jarri harremanetan zerbitzariaren administratzailearekin eta saiatu berriro beranduago."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Deskargatu fitxategia",
            A11Y: "Botoi honek fitxategia deskargatzen du."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Deskargatu PDF gisa",
            TOOLTIP: "Deskargatu fitxategi hau PDF fitxategi gisa",
            A11Y: "Botoi honek fitxategia PDF gisa deskargatzen du.",
            SUCCESS: "Ondo deskargatu duzu fitxategia PDF gisa.",
            ERROR: {
               DEFAULT: "Ezin izan da fitxategia PDF gisa deskargatu.  Saiatu berriro geroago.",
               UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa fitxategia PDF gisa deskargatzeko.",
               NOT_FOUND: "Ezin izan da fitxategia PDF gisa deskargatu kendu egin delako edo jada ez dagoelako zurekin partekatuta.",
               ACCESS_DENIED: "Ezin izan da fitxategia PDF gisa deskargatu kendu egin delako edo jada ez dagoelako zurekin partekatuta."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Ez dago fitxategi honen bertsio argitaraturik deskargatzeko.  Bertsioak fitxategien editoretik argitara daitezke."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Ezin da fitxategia deskargatu",
               CANCEL: "Itxi",
               PROMPT: "Ez dago fitxategi honen bertsio argitaraturik deskargatzeko.",
               PROMPT2: "Bertsioak fitxategien editoretik argitara daitezke."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Ezin da fitxategia deskargatu",
               CANCEL: "Itxi",
               PROMPT: "Ez dago fitxategi honen bertsio argitaraturik deskargatzeko.",
               PROMPT2: "Eskatu fitxategiaren jabeari fitxategi honen bertsio bat argitaratzea."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Deskargatu bertsio bat",
               OK: "Deskargatu bertsioa",
               PROMPT: {
                  TODAY: "Zirriborro berriago bat detektatu da. Azkenekoz gaur editatu da, ordu honetan: ${time}.",
                  YESTERDAY: "Zirriborro berriago bat detektatu da. Azken editatzea: ${time}.",
                  DAY: "Zirriborro berriago bat detektatu da. Azken editatze-data: ${date}.",
                  MONTH: "Zirriborro berriago bat detektatu da. Azken editatze-data: ${date}.",
                  YEAR: "Zirriborro berriago bat detektatu da. Azkenekoz editatu zen data: ${date_long}"
               },
               PROMPT2: {
                  TODAY: "Ziur zaude gaur (${time}) argitaratutako bertsioa deskargatzen jarraitu nahi duzula?",
                  YESTERDAY: "Ziur zaude atzo (${time}) argitaratutako bertsioa deskargatzen jarraitu nahi duzula?",
                  DAY: "Ziur zaude ${date}(e)an argitaratutako bertsioa deskargatzen jarraitu nahi duzula?",
                  MONTH: "Ziur zaude ${date}(e)an argitaratutako bertsioa deskargatzen jarraitu nahi duzula?",
                  YEAR: "Ziur zaude ${date_long}(e)an argitaratutako bertsioa deskargatzen jarraitu nahi duzula?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Erakutsi xehetasunen panela",
            HIDE: "Ezkutatu xehetasunen panela",
            RESET: "Berrezarri panelaren tamaina",
            SHOW_A11Y: "Botoi honek alboko panela irekitzea eta ixtea txandakatzen du. Alboko panela itxita dago orain.",
            HIDE_A11Y: "Botoi honek alboko panela irekitzea eta ixtea txandakatzen du. Alboko panela irekita dago orain.",
            RESET_A11Y: "Botoi honek panelaren tamaina tamaina lehenetsian berrezartzen du. Alboko panela zabalduta dago orain."
         },
         VIEW_DOC: {
            NAME: "Ireki honekin: Docs Viewer",
            TOOLTIP: "Ireki dokumentuen ikustailean",
            A11Y: "Botoi honek fitxategia irekitzen du arakatzaile berriaren leihoan barrena ikusteko."
         },
         EDIT_DOC: {
            NAME: "Editatu dokumentuen aplikazioan",
            TOOLTIP: "Erabili HCL Docs fitxategi hau editatzeko",
            A11Y: "Botoi honek fitxategia irekitzen du leiho berri batean dokumentuak editatzeko."
         },
         EDIT_OFFICE: {
            TITLE: "Edizio-aukerak.",
            NAME: "Editatu Microsoft Office Online plataforman",
            TOOLTIP: "Erabili Microsoft Office Online fitxategi hau editatzeko",
            A11Y: "Botoi honek fitxategia irekitzen du Microsoft Office Online plataforman editatzeko leiho berri baten barruan."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Editatu Microsoft Word Online plataforman",
           TOOLTIP: "Erabili Microsoft Word Online fitxategi hau editatzeko",
           A11Y: "Botoi honek fitxategia irekitzen du Microsoft Word Online plataforman editatzeko leiho berri baten barruan."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Editatu Microsoft Excel Online plataforman",
             TOOLTIP: "Erabili Microsoft Excel Online fitxategi hau editatzeko",
             A11Y: "Botoi honek fitxategia irekitzen du Microsoft Excel Online plataforman editatzeko leiho berri baten barruan."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Editatu Microsoft PowerPoint Online plataforman",
             TOOLTIP: "Erabili Microsoft PowerPoint Online fitxategi hau editatzeko",
             A11Y: "Botoi honek fitxategia irekitzen du Microsoft PowerPoint Online plataforman editatzeko leiho berri baten barruan."
         },
         OFFICE_EDITED: {
             SUCCESS: "Fitxategia gordetzen."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Editatu mahaigainean",
            DIALOG_TITLE: "Editatu mahaigainean",
            TOOLTIP: "Editatu dokumentu hau",
            A11Y: "Botoi honek fitxategia lokalki editatzeko irekitzen du.",
            PROMPT: "Eginbide honi esker, zure ordenagailuan instalatutako software-a erabiliz edita dezakezu.",
            INSTALL: "Aurrera egin baino lehen, ${startLink}instalatu mahaigaineko fitxategien konektoreak ${endLink}", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Garrantzitsua:",
            REMINDER: "Editatzen amaitzen duzunean, argitaratu zirriborro bat mahaigaineko fitxategien konektorea erabiliz.",
            SKIP_DIALOG: "Ez erakutsi berriro mezu hau.",
            OK: "Ados",
            CANCEL: "Utzi"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Baieztatu",
            DELETE_VERSION: "Ezabatu bertsio hau: ${version}",
            DELETE_VERSION_AND_PRIOR: "Ezabatu ${version}. bertsioa eta aurreko bertsio guztiak",
            PROMPT: "${version}. bertsioa kentzear zaude. Jarraitu nahi duzu?",
            DELETE_PRIOR: "Aurreko bertsio guztiak ere kendu",
            ERROR: "Errore bat gertatu da bertsioa kentzean. Saiatu berriro geroago.",
            TOOLTIP: "Ezabatu bertsio hau",
            OK: "Ados",
            CANCEL: "Utzi"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Eskuratu estekak",
            LINK_FILE: "Fitxategi honen esteka:",
            LINK_PREVIEW: "Fitxategiaren aurrebistaren esteka:",
            LINK_DOWNLOAD: "Fitxategia deskargatzeko esteka:",
            TOOLTIP: "Fitxategiaren esteka",
            OK: "Itxi"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Deskargatu bertsio hau"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Baieztatu",
            PROMPT: "Fitxategi honen uneko bertsioa ${version}. bertsioarekin ordeztear zaude. Jarraitu nahi duzu?",
            ERROR: "Errore bat gertatu da bertsioa leheneratzean. Saiatu berriro geroago.",
            TOOLTIP: "Leheneratu bertsio hau",
            CHANGE_SUMMARY: "Bertsio honetatik leheneratua: ${version}",
            OK: "Ados",
            CANCEL: "Utzi"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Baieztatu",
            REMOVE_EVERYONE: "Ziur zaude erakundeak fitxategi honetara duen sarbidea kendu nahi duzula? Sarbidea ezabatzen bada, fitxategia karpetetatik eta erakunde-mailako sarrera duten komunitateetatik ezabatuko da, eta soilik jabeak eta  partekatuta duten pertsonek ahal izango dute berau ikusi eta landu.",
            REMOVE_USER: "Partekatzeari utzi nahi diozu ${user}(r)ekin? Partekatzeari uzten badiozu, ${user}(e)k karpeten bitartez edo zure erakundeko guztiekin partekatzen bada soilik ahal izango du fitxategi hau atzitu.",
            REMOVE_COMMUNITY: "Ziur zaude fitxategi hau ${communityName} komunitatetik kendu nahi duzula?",
            REMOVE_FOLDER: "Ziur zaude fitxategi hau ${folderName} karpetatik kendu nahi duzula?",
            REMOVE_EVERYONE_TOOLTIP: "Kendu erakundearen sarbidea",
            REMOVE_USER_TOOLTIP: "Kendu ${user}(r)ekin dauden partekatze guztiak",
            REMOVE_COMMUNITY_TOOLTIP: "Kendu ${communityName} komunitatetik",
            REMOVE_FOLDER_TOOLTIP: "Kendu ${folderName} karpetatik",
            OK: "Ados",
            CANCEL: "Utzi",
            EFSS: {
              DIALOG_TITLE: "Baieztatu",
              REMOVE_EVERYONE: "Ziur zaude erakundeak fitxategi honetara duen sarbidea kendu nahi duzula? Sarbidea ezabatzen bada, fitxategia karpetetatik eta erakunde-mailako sarrera duten komunitateetatik ezabatuko da, eta soilik jabeak eta partekatuta duten pertsonek ahal izango dute berau ikusi eta landu.",
              REMOVE_USER: "Partekatzeari utzi nahi diozu ${user}(r)ekin? Partekatzeari uzten badiozu, ${user}(e)k karpeten bitartez edo zure erakundeko guztiekin partekatzen bada soilik ahal izango du fitxategi hau atzitu.",
              REMOVE_COMMUNITY: "Ziur zaude fitxategi hau ${communityName} komunitatetik kendu nahi duzula?",
              REMOVE_FOLDER: "Ziur zaude fitxategi hau ${folderName} karpetatik kendu nahi duzula?",
              REMOVE_EVERYONE_TOOLTIP: "Kendu erakundearen sarbidea",
              REMOVE_USER_TOOLTIP: "Kendu ${user}(r)ekin dauden partekatze guztiak",
              REMOVE_COMMUNITY_TOOLTIP: "Kendu ${communityName} komunitatetik",
              REMOVE_FOLDER_TOOLTIP: "Kendu ${folderName} karpetatik",
              OK: "Ados",
              CANCEL: "Utzi",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Editatu iruzkin hau"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Baieztatu",
            PROMPT: "Ziur zaude iruzkin hau ezabatu nahi duzula?",
            ERROR: "Errore bat gertatu da iruzkina kentzean. Saiatu berriro geroago.",
            TOOLTIP: "Ezabatu iruzkin hau",
            OK: "Ados",
            CANCEL: "Utzi"
         },
         LIKE: {
            LIKE: "Atsegin fitxategia",
            UNLIKE: "Desatsegin fitxategia",
            LIKE_A11Y: "Botoi honekin fitxategia atsegiten da",
            UNLIKE_A11Y: "Botoi honekin fitxategia desatsegiten da",
            LIKED_SUCCESS: "Fitxategi hau atsegin duzu",
            UNLIKE_SUCCESS: "Fitxategi hau desatsegin duzu"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Editatu azalpena",
            ERROR: {
               DEFAULT: "Ezin izan da azalpena gorde. Saiatu berriro geroago.",
               UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa azalpena eguneratzeko.",
               NOT_FOUND: "Ezin izan da azalpena gorde fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta.",
               ACCESS_DENIED: "Ezin izan da azalpena gorde fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Errorea fitxategi-izena gordetzean",
               CONFLICT: "Fitxategi-izena badago"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Errore bat gertatu da fitxategi honi jarraitzean. Saiatu berriro geroago.",
                  UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa fitxategi honi jarraitzeko.",
                  NOT_FOUND: "Ezin diozu fitxategi honi jarraitu kendu egin delako edo jada ez dagoelako zurekin partekatuta.",
                  ACCESS_DENIED: "Ezin diozu fitxategi honi jarraitu kendu egin delako edo jada ez dagoelako zurekin partekatuta."
               },
               UNFOLLOW: {
                  DEFAULT: "Errore bat gertatu da fitxategi honi jarraitzeari uztean. Saiatu berriro geroago.",
                  UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa fitxategi honi jarraitzeko.",
                  NOT_FOUND: "Ezin diozu fitxategi honi jarraitzeari utzi kendu egin delako edo jada ez dagoelako zurekin partekatuta.",
                  ACCESS_DENIED: "Ezin diozu fitxategi honi jarraitzeari utzi kendu egin delako edo jada ez dagoelako zurekin partekatuta."
               }
            },
            FOLLOW_NAME: "Jarraitu",
            FOLLOW_TOOLTIP: "Jarraitu fitxategi honi",
            FOLLOW_A11Y: "Botoi honekin fitxategiari jarraitzen zaio.",
            FOLLOW_SUCCESS: "Fitxategi honi jarraitzen diozu orain.",
            STOP_FOLLOWING_NAME: "Utzi jarraitzeari",
            STOP_FOLLOWING_TOOLTIP: "Utzi fitxategi honi jarraitzeari",
            STOP_FOLLOWING_A11Y: "Botoi honekin fitxategiari jarraitzeari uzten zaio.",
            STOP_FOLLOWING_SUCCESS: "Fitxategi honi jarraitzeari utzi diozu."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Gehitu sinkronizazioan",
               TOOLTIP: "Gehitu fitxategi hau sinkronizazioan",
               A11Y: "Botoi honekin, fitxategia sinkronizazioan gehitzen da.",
               SUCCESS: "Fitxategi hau sinkronizazioan gehitu duzu",
               ERROR: {
                  DEFAULT: "Errore bat gertatu da fitxategi hau sinkronizazioan gehitzean. Saiatu berriro geroago.",
                  UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa fitxategi hau sinkronizazioan gehitzeko.",
                  NOT_FOUND: "Ezin duzu fitxategi hau sinkronizazioan gehitu kendu egin delako edo jada ez dagoelako zurekin partekatuta.",
                  ACCESS_DENIED: "Ezin duzu fitxategi hau sinkronizazioan gehitu kendu egin delako edo jada ez dagoelako zurekin partekatuta."
               }
            },
            STOP_SYNC: {
               NAME: "Kendu sinkronizaziotik",
               TOOLTIP: "Kendu fitxategi hau sinkronizaziotik",
               A11Y: "Botoi honekin, fitxategia sinkronizaziotik kentzen da.",
               SUCCESS: "Fitxategi hau sinkronizaziotik kendu duzu.",
               ERROR: {
                  DEFAULT: "Errore bat gertatu da fitxategi hau sinkronizaziotik kentzean. Saiatu berriro geroago.",
                  UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa fitxategia sinkronizaziotik kentzeko.",
                  NOT_FOUND: "Ezin duzu fitxategi hau sinkronizaziotik kendu ezabatu egin delako edo jada ez dagoelako zurekin partekatuta.",
                  ACCESS_DENIED: "Ezin duzu fitxategi hau sinkronizaziotik kendu ezabatu egin delako edo jada ez dagoelako zurekin partekatuta."
               }
            },
            MYDRIVE: {
                NAME: "Gehitu Nire Diskora",
                TOOLTIP: "Gehitu fitxategi hau Nire Diskora",
                A11Y: "Botoi honekin, fitxategia Nire Diskora gehitzen da.",
                SUCCESS: "Fitxategi hau Nire Diskora gehitu duzu",
                ERROR: {
                   DEFAULT: "Errore bat gertatu da fitxategi hau Nire Diskoan gehitzean. Saiatu berriro geroago.",
                   UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa fitxategi hau Nire Diskoan gehitzeko.",
                   NOT_FOUND: "Ezin duzu fitxategi hau Nire Diskoan gehitu. Ezabatu egin da edo jada ez dago zurekin partekatuta.",
                   ACCESS_DENIED: "Ezin duzu fitxategi hau Nire Diskoan gehitu. Ezabatu egin da edo jada ez dago zurekin partekatuta."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Kendu nire diskotik",
                TOOLTIP: "Kendu fitxategi hau nire diskotik",
                A11Y: "Botoi honekin, fitxategia Nire Diskotik kentzen da.",
                SUCCESS: "Fitxategi hau Nire Diskotik kendu duzu.",
                ERROR: {
                   DEFAULT: "Errore bat gertatu da fitxategi hau Nire Diskotik kentzean. Saiatu berriro geroago.",
                   UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa fitxategia Nire Diskotik kentzeko.",
                   NOT_FOUND: "Ezin duzu fitxategi hau Nire Diskotik kendu. Ezabatu egin da edo jada ez dago zurekin partekatuta.",
                   ACCESS_DENIED: "Ezin duzu fitxategi hau Nire Diskotik kendu. Ezabatu egin da edo jada ez dago zurekin partekatuta."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Ainguratu",
            FAVORITE_TOOLTIP: "Ainguratu fitxategi hau",
            FAVORITE_A11Y: "Botoi honekin fitxategia ainguratzen da.",
            FAVORITE_SUCCESS: "Fitxategi hau ainguratu duzu.",
            STOP_FAVORITEING_NAME: "Kendu aingura",
            STOP_FAVORITEING_TOOLTIP: "Kendu aingura fitxategi honi",
            STOP_FAVORITEING_A11Y: "Botoi honekin, fitxategiari aingura kentzen zaio.",
            STOP_FAVORITEING_SUCCESS: "Fitxategi honi aingura kendu diozu."
         },
         TRASH: {
            NAME: "Eraman zakarrontzira",
            DIALOG_TITLE: "Baieztatu",
            PROMPT: "Ziur zaude fitxategi hau zakarrontzira eraman nahi duzula? Fitxategi hau zakarrontzira badaramazu, une honetan partekatuta dutenentzat erabilgarri egoteari utziko dio.",
            ERROR: "Errore bat gertatu da fitxategia ezabatzean. Saiatu berriro geroago.",
            TOOLTIP: "Ezabatu fitxategi hau",
            OK: "Ados",
            CANCEL: "Utzi",
            A11Y: "Botoi honekin, fitxategia zakarrontzira eramaten da.",
            SUCCESS_MSG: "${file} zakarrontzira eraman da."
         },
         REFRESH: {
            NAME: "Freskatu",
            ERROR: "Errore bat gertatu da fitxategien ikustailea freskatzean. Saiatu berriro geroago.",
            TOOLTIP: "Freskatu fitxategien ikustailea",
            INFO_MSG: "Freskatu edukirik berriena eskuratzeko. ${link}",
            A11Y: "Botoi honekin, fitxategia zakarrontzira eramaten da.",
            SUCCESS_MSG: "Edukia ondo freskatu da."
         },
         COPY_FILE: {
            NAME: "Eman kopia komunitateari",
            DIALOG_TITLE: "Baieztatu",
            ERROR: "Errore bat gertatu da fitxategia kopiatzean. Saiatu berriro geroago.",
            TOOLTIP: "Eman fitxategi honen kopia bat komunitate bati",
            OK: "Ados",
            CANCEL: "Utzi",
            A11Y: "Botoi honekin, fitxategi honen kopia bat komunitate bati emateko elkarrizketa irekitzen da.",
            SUCCESS_MSG: "${file} kopiatu egin da komunitate honetan: ${community}."
         },
         UPLOAD_VERSION: {
            NAME: "Kargatu bertsio berria",
            NAME_SHORT: "Kargatu",
            CHANGE_SUMMARY: "Aukerako laburpen-aldaketa...",
            TOOLTIP: "Kargatu fitxategi honen bertsio berri bat",
            A11Y: "Botoi honekin, fitxategi honen bertsio berri bat kargatzeko elkarrizketa irekitzen da."
         },
         LOG_IN: {
            NAME: "Hasi saioa",
            TOOLTIP: "Hasi saioa fitxategiak kargatu eta partekatzeko, iruzkinak egiteko eta karpetak sortzeko."
         },
         LOCK: {
            NAME: "Blokeatu fitxategia",
            TITLE: "Blokeatu fitxategi hau",
            A11Y: "Blokeatu fitxategi hau",
            SUCCESS: "Fitxategia blokeatuta dago orain.",
            ERROR: "Ezin izan da fitxategia blokeatu kendu egin delako edo jada ez dagoelako zurekin partekatuta."
         },
         UNLOCK: {
            NAME: "Desblokeatu fitxategia",
            TITLE: "Desblokeatu fitxategi hau",
            A11Y: "Desblokeatu fitxategi hau",
            SUCCESS: "Fitxategia desblokeatuta dago orain.",
            ERROR: "Ezin izan da fitxategia desblokeatu kendu egin delako edo jada ez dagoelako zurekin partekatuta."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Editatu mahaigainean",
            TITLE: "Editatu mahaigainean",
            A11Y: "Editatu mahaigainean"
         },
         FLAG: {
            FILE: {
               NAME: "Markatu desegoki gisa",
               TITLE: "Markatu fitxategia",
               A11Y: "Markatu fitxategi hau desegoki gisa",
               PROMPT: "Eman fitxategi hau markatzeko arrazoia (aukerakoa):",
               OK: "Markatu",
               CANCEL: "Utzi",
               SUCCESS: "Fitxategia markatu egin da eta berrikusteko bidali da.",
               ERROR: "Errorea fitxategi hau markatzean; mesedez, saiatu berriro beranduago."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Ongi",
               PROMPT: "Fitxategia markatu egin da eta berrikusteko bidali da.",
               CANCEL: "Ados"
            },
            COMMENT: {
               NAME: "Markatu desegoki gisa",
               TITLE: "Markatu iruzkina",
               A11Y: "Markatu iruzkin hau desegoki gisa",
               PROMPT: "Eman iruzkin hau markatzeko arrazoia (aukerakoa):",
               OK: "Markatu",
               CANCEL: "Utzi",
               SUCCESS: "Iruzkina markatu egin da eta berrikusteko bidali da.",
               ERROR: "Errorea iruzkin hau markatzean; mesedez, saiatu berriro beranduago."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Ongi",
            PROMPT: "Aldaketak berrikusteko bidali dira. Norbaitek aldaketak onartu arte, fitxategi hau ez da erabilgarri egongo.",
            CANCEL: "Ados"
         },
         DROPDOWN_BUTTON: "Goitibehera-botoia"
      },
      SECTION: {
         ABOUT: {
            NAME: "Fitxategi honi buruz",
            VIEW_FILE_DETAILS: "Ikusi fitxategiaren xehetasunak",
            A11Y: "Esteka hau aktibatuz gero, fitxategi-ikustailea itxiko da eta fitxategiaren xehetasunen orrira joango zara."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "Ez dago fitxategi honen aurrebistarik erabilgarri."
         },
         IMAGE: {
            ZOOM_IN: "Handiagotu",
            ZOOM_OUT: "Txikiagotu",
            RESET: "Berrezarri",
            ZOOM_IN_A11Y: "Botoi honek irudia handiagotzen du.",
            ZOOM_OUT_A11Y: "Botoi honek irudia txikiagotzen du.",
            RESET_ZOOM_A11Y: "Botoi honek zoom-maila berrezartzen du.",
            UNSAFE_PREVIEW: "Ezin da aurreikusi fitxategi hau; ez da aztertu birusik duen jakiteko."
         },
         VIEWER: {
            LOADING: "Kargatzen...",
            PUBLISHING: "Argitaratzen...",
            NO_PUBLISHED_VERSION: "Ez dago fitxategi honen bertsio argitaraturik ikusteko eskuragarri.",
            IFRAME_TITLE: "Fitxategi honen aurrebista",
            AUTOPUBLISH_TIMEOUT: "Zerbitzariari kosta egiten ari zaio erantzutea.  Baliteke azken aldaketak argitaratu ez izana."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Ezin da aurreikusi fitxategi hau; ez da aztertu birusik duen jakiteko."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Azkenekoz ${user} erabiltzaileak gaur ${time}e(t)an eguneratua",
            YESTERDAY: "Azkenekoz ${user} erabiltzaileak atzo ${time}e(t)an eguneratua",
            DAY: "Azkenekoz ${user} erabiltzaileak ${EEee}(e)an ${time}e(t)an eguneratua",
            MONTH: "${user} erabiltzaileak ${date_long}(e)(a)n eguneratua",
            YEAR: "${user} erabiltzaileak ${date_long}(e)(a)n eguneratua"
         },
         CREATED: {
            TODAY: "${user} erabiltzaileak gaur ${time}e(t)an sortua",
            YESTERDAY: "${user} erabiltzaileak atzo ${time}e(t)an sortua",
            DAY: "${user} erabiltzaileak ${EEee}(e)(a)n ${time}e(t)an sortua",
            MONTH: "${user} erabiltzaileak ${date_long}(e)(a)n sortua",
            YEAR: "${user} erabiltzaileak ${date_long}(e)(a)n sortua"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - Gaur",
            YESTERDAY: "${time} - Atzo",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Gaur",
            YESTERDAY: "Atzo",
            DAY: "${EEee}",
            MONTH: "${date_long}",
            YEAR: "${date_long}"
         }
      },
      FILE_SIZE: {
         B: "${0} B",
         KB: "${0} KB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
      },
      COMMENT_BOX: {
         TITLE: "Iruzkin-testuaren area",
         SHADOW_TEXT: "Gehitu iruzkin bat...",
         CANNOT_ACCESS_CONTENT: "Aipatu duzun ondoko jendeak ezin du iruzkina ikusi ez duelako edukirako sarbiderik:",
         ERROR: "Errore bat gertatu da aipatzen saiatzen ari zaren erabiltzailea baliozkotzean.",
         POST: "Argitaratu",
         SAVE: "Gorde",
         CANCEL: "Utzi",
         EXTERNAL_WARNING: "Iruzkinak zure erakundetik kanpoko jendeak ikus ditzake."
      },
      EDIT_BOX: {
         SAVE: "Gorde",
         CANCEL: {
            TOOLTIP: "Utzi",
            A11Y: "Botoi honekin, fitxategiaren izenaren edizioa bertan behera uzten da."
         },
         INVALID_CHARACTERS: "Karaktere baliogabea",
         INVALID_CHARACTERS_REMOVED: "Karaktere baliogabeak kendu egin dira"
      },
      COMMENT_WIDGET: {
         EDITED: "(Editatuta)",
         EDITED_DATE: {
            TODAY: "Gaur ${time}e(t)an editatua",
            YESTERDAY: "Atzo ${time}e(t)an editatua",
            DAY: "${EEee}(e)an ${time}e(t)an editatua",
            MONTH: "${date_long}e(t)an editatua",
            YEAR: "${date_long}e(t)an editatua"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Gorde",
         CANCEL: "Utzi",
         USER: "Pertsona",
         COMMUNITY: "Komunitatea",
         SHARE: "Partekatu",
         SHARE_ALT: "Partekatu pertsona honekin",
         MEMBER_TYPE: "Kide mota",
         PERSON_SHADOW: "Idatzi pertsona bat aurkitzeko",
         COMMUNITY_SHADOW: "Idatzi komunitate bat aurkitzeko",
         PERSON_ARIA: "Pertsona bat bilatzeko, idatzi bere izena.  Sakatu Maius+Tab pertsonen, komunitateen eta erakundeko guztien artean mugitzeko.",
         COMMUNITY_ARIA: "Komunitate bat bilatzeko, idatzi bere izena.  Sakatu Maius+Tab pertsonen, komunitateen eta erakundeko guztien artean mugitzeko.",
         PERSON_FULL_SEARCH: "Pertsona ez da zerrendan agertzen? Erabili bilaketa aurreratua...",
         COMMUNITY_FULL_SEARCH: "Komunitatea ez da zerrendan agertzen? Erabili bilaketa aurreratua...",
         ADD_OPTIONAL_MESSAGE: "Gehitu aukerako mezua",
         ROLE_LABEL: "Funtzioa",
         ROLE_EDIT: "Editorea",
         ROLE_VIEW: "Irakurlea"
      },
      FILE_STATE: {
         DOCS_FILE: "Hau Docs fitxategi bat da. Aldaketa guztiak linean egin behar dira.",
         LOCKED_BY_YOU: {
            TODAY: "Zuk ${time}e(t)an blokeatua.",
            YESTERDAY: "Zuk atzo ${time}e(t)an blokeatua.",
            DAY: "Zuk ${date}(e)an blokeatua.",
            MONTH: "Zuk ${date}(e)an blokeatua.",
            YEAR: "Zuk ${date_long}(e)an blokeatua."
         },
         LOCKED_BY_OTHER: {
            TODAY: "${time}e(t)an ${user}(e)k blokeatua.",
            YESTERDAY: "Atzo ${time}e(t)an ${user}(e)k blokeatua.",
            DAY: "${date}(e)an ${user}(e)k blokeatua.",
            MONTH: "${date}(e)an ${user}(e)k blokeatua.",
            YEAR: "${date_long}(e)an ${user}(e)k blokeatua."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Laburtu testu hau automatikoki",
         COMMENT: {
            WARN_TOO_LONG: "Iruzkina luzeegia da.",
            TRIM: "Iruzkina laburtu?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "Azalpena luzeegia da.",
            TRIM: "Azalpena laburtu?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "Mezua luzeegia da.",
            TRIM: "Mezua laburtu?"
         },
         TAG: {
            WARN_TOO_LONG: "Etiketa luzeegia da.",
            TRIM: "Etiketa laburtu?"
         },
         TAGS: {
            WARN_TOO_LONG: "Etiketa bat edo gehiago luzeegiak dira.",
            TRIM: "Etiketak laburtu?"
         },
         FILENAME: {
            WARN_TOO_LONG: "Fitxategiaren izena luzeegia da"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "HCL Docs duten pertsonek linean edita dezakete fitxategi hau.",
         NO_ENTITLEMENT_LINK: "${startLink}HCL Docs${endLink} duten pertsonek linean edita dezakete fitxategi hau.", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Une honetan, ${users} erabiltzaile fitxategi hau editatzen ari d(ir)a linean.",
         UNPUBLISHED_CHANGES: "Bertsio gisa argitaratu ez diren edizioak ditu zirriborro honek.",
         PUBLISH_A_VERSION: "Argitaratu bertsio bat",
         PUBLISH_SUCCESS: "Ondo argitaratu duzu fitxategi honen bertsio bat",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "Ezin izan da bertsioa argitaratu sarbidea ukatu egin delako.",
            NOT_FOUND: "Ezin izan da bertsioa argitaratu ez delako dokumentua aurkitu.",
            CANNOT_REACH_REPOSITORY: "Ezin izan da bertsioa argitaratu Docs-en zerbitzaria ezin delako fitxategien biltegiarekin konektatu.",
            QUOTA_VIOLATION: "Ezin izan da bertsioa argitaratu ez dagoelako behar beste leku. Kendu beste fitxategi batzuk bertsio hau argitaratzeko lekua izateko.",
            CONVERSION_UNAVAILABLE: "Ezin izan da bertsioa argitaratu Docs-en bihurtze-zerbitzua ez dagoelako erabilgarri. Saiatu berriro geroago.",
            TOO_LARGE: "Ezin izan da bertsioa argitaratu dokumentua handiegia delako.",
            CONVERSION_TIMEOUT: "Ezin izan da bertsioa argitaratu Docs-en bihurtze-zerbitzuak denbora gehiegi daramalako dokumentua bihurtzen. Saiatu berriro geroago.",
            SERVER_BUSY: "Ezin izan da bertsioa argitaratu Docs-en zerbitzaria lanpetuta dagoelako. Saiatu berriro geroago.",
            DEFAULT: "Ezin izan da bertsioa argitaratu Docs-en zerbitzua ez dagoelako eskuragarri. Saiatu berriro geroago."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Zure edizioak argitaratzen ari dira. ${startLink}Freskatu zure aldaketak ikusteko.${endLink}",
            GENERIC: "Orria freskatu behar zenezake azken aldaketak ikusi ahal izateko.  ${startLink}Freskatu${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Ez dago iruzkinik.",
         MODERATED: "Iruzkina berrikusteko bidali da eta onesten denean argitaratuko da.",
         ERROR: {
            SAVE: {
               DEFAULT: "Ezin izan da iruzkina gorde. Saiatu berriro geroago.",
               UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa iruzkina gordetzeko.",
               NOT_FOUND: "Ezin izan da zure iruzkina gorde fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta.",
               ACCESS_DENIED: "Ezin izan da zure iruzkina gorde fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta."
            },
            DELETE: {
               DEFAULT: "Ezin izan da iruzkina ezabatu. Saiatu berriro geroago.",
               UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa iruzkina kentzeko.",
               NOT_FOUND: "Ezin izan da zure iruzkina kendu fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta.",
               ACCESS_DENIED: "Ezin izan da zure iruzkina kendu fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Gorde",
         EDIT_TAGS: "Editatu etiketak",
         ERROR: {
            SAVE: {
               DEFAULT: "Ezin izan da etiketa sortu. Saiatu berriro geroago."
            },
            DELETE: {
               DEFAULT: "Ezin izan da etiketa kendu. Saiatu berriro geroago."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Irakurri gehiago...",
         READ_LESS: "Irakurri gutxiago..."
      },
      SHARE: {
         EVERYONE: "Nire erakundeko guztiak",
         ADD_TOOLTIP: "Gorde",
         ROLES: {
            OWNER: "Jabea",
            EDIT: "Editoreak",
            VIEW: "Irakurleak",
            FOLDER: "Karpetekin partekatua"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Jabea"
            },
            EDIT: {
               ROLE: "Editatu",
               ADD: "Gehitu editorea"
            },
            VIEW: {
               ROLE: "Irakurlea",
               ADD: "Gehitu irakurlea"
            },
            FOLDER: {
               ADD: "Gehitu karpetak",
               COMMUNITY_ADD: "Gehitu karpetan",
               MOVE: "Eraman karpeta batera"
            },
            MULTI: {
               ADD: "Gehitu jendea edo komunitateak",
               ADD_PEOPLE: "Gehitu jendea"
            }
         },
         PUBLIC: {
            SHORT: "Nire erakundeko guztiak",
            LONG: {
               GENERIC: "Zure erakundeko guztiak",
               ORG: "Hemengo guztiak: ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Fitxategi hau badago ${user}(r)ekin partekatuta.",
            ERROR: "Ezin da une honetan ${user}(r)ekin partekatu.",
            SELF: "Ezin duzu zure buruarekin partekatu."
         },
         SHARE_INFO: {
            PROMOTED: "${user}(e)n partekatze-funtzioa mailaz igo da."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Ondo partekatu da ${user}(r)ekin"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Fitxategia ondo partekatu da."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Aukerako mezua..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Hornitu kanpo-erabiltzailea",
               ACTION: "Hornitu kanpo-erabiltzailea...",
               TOOLTIP: "Hornitu kanpo erabiltzailea",
               DIALOG_TITLE: "Edukia ez da partekatu",
               PROMPT: {
                  NO_ACCOUNT: "Ondoko erabiltzaileak ez du konturik eta ez zaio edukirik partekatu.",
                  INVITE: "Gonbidatu erabiltzaile hau edukiak berarekin partekatzeko."
               },
               SUBMIT: "Ekin gonbidapenari",
               CANCEL: "Utzi",
               ERROR: "Errore bat gertatu da kontua hornitzean. Saiatu berriro geroago.",
               SUCCESS: "Ondo hornitu da erabiltzaile-kontua."
            },
            PLURAL: {
               NAME: "Hornitu kanpo-erabiltzaileak",
               ACTION: "Hornitu kanpo-erabiltzaileak...",
               TOOLTIP: "Hornitu kanpo erabiltzaileak",
               DIALOG_TITLE: "Edukia ez da partekatu",
               PROMPT: {
                  NO_ACCOUNT: "Ondoko erabiltzaileek ez dute konturik eta ez da beraiekin edukirik partekatu.",
                  INVITE: "Gonbidatu erabiltzaile hauek beraiekin edukia partekatzeko."
               },
               SUBMIT: "Ekin gonbidapenei",
               CANCEL: "Utzi",
               ERROR: "Errore bat gertatu da kontuak hornitzean. Saiatu berriro geroago.",
               SUCCESS: "Ondo hornitu dira erabiltzaile-kontuak."
            },
            ABSTRACT: {
               NAME: "Hornitu kanpo-erabiltzaileak",
               ACTION: "Hornitu kanpo-erabiltzaileak...",
               TOOLTIP: "Hornitu kanpo erabiltzaileak",
               DIALOG_TITLE: "Edukia ez da partekatu",
               PROMPT: {
                  NO_ACCOUNT: "Erabiltzaile batzuek ez dute konturik eta ez da beraiekin edukirik partekatu.",
                  INVITE: "Gonbidatu erabiltzaile hauek beraiekin edukia partekatzeko."
               },
               SUBMIT: "Ekin gonbidapenei",
               CANCEL: "Utzi",
               ERROR: "Errore bat gertatu da kontuak hornitzean. Saiatu berriro geroago.",
               SUCCESS: "Ondo hornitu dira erabiltzaile-kontuak."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Partekatze-aukerak",
         PROPAGATION: "Onartu besteek fitxategi hau partekatzea",
         EVERYONE: "Edonork parteka dezake fitxategi hau.",
         OWNER_ONLY: "Jabeak soilik parteka dezake fitxategi hau.",
         STOP_SHARE: "Utzi partekatzeari",
         MAKE_INTERNAL: "Utzi fitxategia kanpokoekin partekatzeari",
         MAKE_INTERNAL_SUCCESS: "Aurrerantzean, fitxategi hau ezin da zure erakundetik kanpoko jendearekin partekatu.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Barruko bihurtu?",
            PROMPT: "Fitxategi hau barruko bihurtzen baduzu, ezin izango da zure erakundetik kanpoko jendearekin partekatu. ${br}${br}" +
            "Kanpoko jende, komunitate edo karpetekin egindako partekatzeak kendu egingo dira.${br}${br}Fitxategi bat barruko bihurtzea betirakoa da eta ezin da desegin.",
            EFSS: {
               DIALOG_TITLE: "Barruko bihurtu?",
               PROMPT: "Fitxategi hau barruko bihurtzen baduzu, ezin izango da zure erakundetik kanpoko jendearekin partekatu. ${br}${br}" +
               "Kanpoko jende edo karpetekin egindako partekatzeak kendu egingo dira.${br}${br}Fitxategi bat barruko bihurtzea betirakoa da eta ezin da desegin."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Utzi fitxategia partekatzeari",
            PROMPT: "Ziur zaude fitxategi hau partekatzeari utzi nahi diozula?",
            QUESTION_PUBLIC: "Aurrerantzean, fitxategi hau ez da erakundeko guztientzat edo partekatuta duten pertsona, karpeta eta komunitateentzako ikusgai egongo. Ekintza hau ezin da desegin.",
            QUESTION_PUBLIC_E: "Aurrerantzean, fitxategi hau ez da erakundeko guztientzat edo partekatuta duten pertsona eta karpetentzat ikusgai egongo. Ekintza hau ezin da desegin.",
            QUESTION: "Aurrerantzean, fitxategia ez da pertsona eta karpetekin partekatuta egongo, eta karpeta guztietatik kenduko da (zure karpeta pribatuetatik izan ezik). Ekintza hau ezin da desegin.",
            QUESTION_E: "Aurrerantzean, fitxategia ez da jendearekin partekatuta egongo, eta karpeta guztietatik kenduko da (zure karpeta pribatuetatik izan ezik). Ekintza hau ezin da desegin."
         },
         MAKE_PRIVATE_SUCCESS: "Fitxategi hau pribatua da orain.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Ezin zaio fitxategia partekatzeari utzi. Saiatu berriro geroago."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Nire partekatzeak"
      },
      STREAM: {
         LOADING: "Kargatzen...",
         LOAD_MORE: "Kargatu gehiago..."
      },
      ENTRY: {
         REMOVE: "Kendu",
         RESTORE: "Leheneratu",
         EDIT: "Editatu",
         DELETE: "Ezabatu",
         OK: "Ados",
         CANCEL: "Utzi",
         USER_PICTURE: "${0}(r)en argazkia",
         FLAG: "Markatu desegoki gisa"
      },
      PANEL: {
         LOAD_ERROR: "Errore bat gertatu da fitxategi honen metadatuak atzitzean.",
         ABOUT: {
            TITLE: "Honi buruz",
            EXPAND_BUTTON: "Zabaldu botoia informazio gehiago ikusteko",
            CURRENT_VERSION_HEADER: "Uneko bertsioa ${versionNumber}",
            FILE_SIZE_HEADER: "Fitxategiaren tamaina",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Uneko bertsioa",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Bertsio guztiak",
            DOCS_DRAFT_UPDATED_HEADER: "Zirriborroa editatu da",
            DOCS_DRAFT_CREATED_HEADER: "Zirriborroa sortu da",
            DOCS_UPDATED_HEADER: "Argitaratua",
            DOCS_CREATED_HEADER: "Sortzea",
            UPDATED_HEADER: "Eguneratzea",
            CREATED_HEADER: "Sortzea",
            LIKES_HEADER: "Atsegiteak",
            LIKES_EXPAND_ICON: "Zabaldu ikono hau fitxategia nork atsegin duen ikusteko",
            DOWNLOADS_HEADER: "Bistaratzeak",
            DOWNLOADS_HEADER_MORE: "Bistaratzeak (${0})",
            DOWNLOADS_EXPAND_ICON: "Zabaldu ikono hau fitxategia nork ikusi duen ikusteko",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonimoki",
            DOWNLOADS_LATEST_VERSION: "Fitxategi honen azkeneko bertsioa duzu",
            DOWNLOADS_LAST_VERSION: "Fitxategi honen ${0}. bertsioa ikusi duzu",
            TAGS_HEADER: "Etiketak",
            DESCRIPTION_HEADER: "Deskribapena",
            DESCRIPTION_READ_MORE: "Irakurri gehiago...",
            LINKS_HEADER: "Estekak",
            SECURITY: "Segurtasuna",
            FILE_ENCRYPTED: "Fitxategiaren edukia kodetua dago. Ezin da enkriptatutako fitxategien edukirik bilatu. Fitxategiaren edukia ezin da HCL Docs-ekin ikusi eta editatu.",
            GET_LINKS: "Lortu estekak...",
            ADD_DESCRIPTION: "Gehitu azalpen bat",
            NO_DESCRIPTION: "Deskribapenik ez",
            ADD_TAGS: "Gehitu etiketak",
            NO_TAGS: "Etiketarik ez"
         },
         COMMENTS: {
            TITLE: "Iruzkinak",
            TITLE_WITH_COUNT: "Iruzkinak (${0})",
            VERSION: "${0}. bertsioa",
            FEED_LINK: "Iruzkin hauen jarioa",
            FEED_TITLE: "Jarraitu iruzkin hauetan egiten diren aldaketak jario-irakurlean"
         },
         SHARING: {
            TITLE: "Partekatzea",
            TITLE_WITH_COUNT: "Partekatua (${0})",
            SHARED_WITH_FOLDERS: "Karpetekin partekatuta - ${count}",
            SEE_WHO_HAS_SHARED: "Ikusi nork partekatu duen",
            COMMUNITY_FILE: "Komunitate batenak diren fitxategiak ezin dira pertsonekin edo beste komunitate batzuekin partekatu.",
            SHARED_WITH_COMMUNITY: "Ondoko komunitateko kideekin partekatuta: '${0}'",
            LOGIN: "Sartu",
            NO_SHARE: "Fitxategi hau ez da inongo karpetan gehitu oraindik.",
            ONE_SHARE: "Fitxategi hau sarbiderik ez duzun karpeta edo komunitate 1ean dago.",
            MULTIPLE_SHARE: "Fitxategi hau sarbiderik ez duzun ${fileNumber} karpeta edo komunitatetan dago."
         },
         VERSIONS: {
            TITLE: "Bertsioak",
            TITLE_WITH_COUNT: "Bertsioak (${0})",
            FEED_LINK: "Bertsio hauen jarioa",
            FEED_TITLE: "Jarraitu fitxategi honen aldaketak zure jario-irakurlearen bitartez"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Ekintzaren berrespena",
         DIALOG_TITLE: "Baieztatu",
         PROMPT: "Ziur zaude ekintza hau gauzatu nahi duzula?",
         ERROR: "Errore bat gertatu da ekintza hau burutzean. Saiatu berriro geroago.",
         TOOLTIP: "Gauzatu ekintza",
         OK: "Ados",
         CANCEL: "Utzi",
         A11Y: "Botoi honekin, uneko ekintza gauzatzen da."
      },
      THUMBNAIL: {
         TITLE: "Koadro txikia",
         CHANGE_LINK: "Aldatu koadro txikia...",
         ERROR: "Ezin izan da koadro txikia gorde. Saiatu berriro geroago.",
         EXT_ERROR: "Hautatu ondoko luzapen onarturen bat duen fitxategi bat: ${0}",
         SUCCESS: "Koadro txikia aldatu egin da",
         UPLOAD: "Gorde",
         CANCEL: "Utzi"
      },
      UPLOAD_VERSION: {
         LINK: "Kargatu bertsio berria...",
         CHANGE_SUMMARY: "Aukerako laburpen-aldaketa...",
         ERROR: "Ezin izan da bertsio berria gorde. Saiatu berriro geroago.",
         SUCCESS: "Bertsio berria gorde egin da",
         UPLOAD: "Kargatu",
         UPLOAD_AND_CHANGE_EXTENSION: "Kargatu eta aldatu luzapena",
         CANCEL: "Utzi",
         TOO_LARGE: "${file} fitxategiak onartzen den tamaina gainditzen du (${size}).",
         PROGRESS_BAR_TITLE: "Bertsio berria kargatzen (${uploaded}/${total} osatu da)",
         CANCEL_UPLOAD: "Utzi karga bertan behera"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Errore bat gertatu da fitxategia atzitzean. Saiatu berriro geroago.",
         UNAUTHENTICATED: "Zure sesioa iraungi egin da. Berriro hasi behar duzu saioa fitxategia berriz ikusteko.",
         NOT_FOUND: "Eskatu duzun fitxategia ezabatu edo mugitu egin da. Esteka norbaitek bidali badizu, ziurtatu zuzena dela.",
         ACCESS_DENIED: "Ez duzu baimenik fitxategi hau ikusteko Fitxategi hau ez dago zurekin partekaturik.",
         ACCESS_DENIED_ANON: "Ez duzu baimenik fitxategi hau ikusteko Fitxategia hau zurea bada edo zurekin partekatuta badago, lehenengo saioa hasi behar duzu"
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Errorea",
         PROMPT: "Eskatu duzun fitxategia ezabatu edo mugitu dute.",
         CANCEL: "Ados"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Baieztatu",
        PROMPT: "HCL Connections-eko saioa iraungi egin da.${lineBreaks}Sakatu 'Ados' saioa berriz hasteko, edo 'Utzi' elkarrizketa hau ixteko.",
        OK: "Ados",
        CANCEL: "Utzi"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Ezin da esteka atzitu",
        PROMPT: "Zerbait gaizki joan da esteka atzitzean.${lineBreaks}Sakatu 'Ados' orrialdera birbideratzeko.",
        OK: "Ados",
        CANCEL: "Utzi"
      },
      LOAD_ERROR: {
         DEFAULT: "Oops. Errore bat gertatu da esteka atzitzean.",
         ACCESS_DENIED: "Jarri harremanetan fitxategiaren jabearekin fitxategi hau ikusteko baimena eskatzeko."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Fitxategia",
         LOAD_ERROR: "Errorea fitxategia atzitzean"
      },
      SHARE_WITH_LINK: {
         TITLE: "Partekatu Estekaren bitartez",
         EMPTY_DESCRIPTION: "Oraindik ez duzu estekarik sortu fitxategi honetarako. Sortu partekatutako esteka bat beste pertsonei bidaltzeko, fitxategia aurreikusi eta deskargatu ahal izan dezaten.",
         CREATE_LINK: "Sortu esteka bat",
         COPY_LINK: "Kopiatu esteka",
         DELETE_LINK: "Ezabatu esteka",
         ACCESS_TYPE_1: "Esteka duen edonork ikus dezake fitxategi hau",
         ACCESS_TYPE_2: "Nire erakundeko pertsonek fitxategi hau ikus dezakete",
         ACCESS_TYPE_1_DESCRIPTION: "Esteka jasotzen duten pertsonek fitxategi hau aurreikusi eta deskargatu dezakete, Connections-en saioa hasi eta gero.",
         ACCESS_TYPE_2_DESCRIPTION: "Nire erakundean esteka jasotzen duten pertsonek fitxategi hau aurreikusi eta deskargatu dezakete, Connections-en saioa hasi eta gero.",
         CHANGE_TYPE_SUCCESS: "Estekaren baimena eguneratzen da sartzeko modua aldatzean.",
         CHANGE_TYPE_ERROR: "Ezin izan da eguneratu estekaren baimena sartzeko modua aldatzean.",
         COPY_LINK_SUCCESS: "Esteka zure arbelean kopiatu da",
         CREATE_SHARELINK_SUCCESS:"Esteka ondo sortu da.",
         CREATE_SHARELINK_ERROR:"Errorea gertatu da eta ezin izan da esteka sortu.",
         DELETE_SHARELINK_SUCCESS: "Ezabatu da  \"${file}\" fitxategirako partekatutako esteka",
         DELETE_SHARELINK_ERROR: "Ez da ezabatu partekatutako esteka. Saiatu berriro geroago.",
         CONFIRM_DIALOG: {
            OK: "Ezabatu",
            DIALOG_TITLE: "Ezabatu Partekatutako esteka",
            PROMPT: "Fitxategi hau eskuraezina bilakatuko da esteka duten guztientzako. Ziur zaude partekatutako esteka kendu nahi duzula?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Partekatutako esteka aktibo dago. Esteka duen edonork ikus dezake fitxategi hau. Egin klik esteka hau kopiatzeko.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Partekatutako esteka aktibo dago. Nire erakundeko pertsonek fitxategi hau ikus dezakete. Egin klik esteka hau kopiatzeko."
      }
});
