/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2020                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "Visualització prèvia del fitxer",
      FILENAME_TOOLTIP: "Edita el nom del fitxer",
      ICON_TOOLTIP: "Descarrega el fitxer",
      ERROR: "S'ha produït un error.",
      FILE_MALICIOUS: "S'està explorant el contingut maliciós revelat.",
      SHARED_EXTERNALLY: "Compartit externament",
      FILE_SYNCED: "Afegit a la sincronització",
      MY_DRIVE: {
         TITLE: "A La meva unitat",
         ROOT_FOLDER: "/La meva unitat",
         FOLDER: "/La meva unitat/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Més accions",
         A11Y: "Obre un menú desplegable amb una llista amb més opcions que es poden dur a terme al fitxer.",
            PANELS: {
               TITLE: "Més",
               A11Y: "Obre un menú desplegable amb una llista de panells ocults"
            }
      },
      WELCOME: {
         TITLE: "Hem combinat la visualització de fitxers i de detalls.",
         SUBTITLE: "Ara podeu visualitzar un fitxer i els seus comentaris en paral·lel.",
         LINES: {
            LINE_1: "Aquí trobareu tota la informació i les tasques que podeu realitzar a la pàgina antiga.",
            LINE_2: "Al costat del fitxer trobareu comentaris, usos compartits, versions i informació bàsica."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Aquest botó va al fitxer següent.",
         PREVIOUS_A11Y: "Aquest botó va al fitxer anterior."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Més opcions d'edició",
            A11Y: "Aquest botó obre un menú que conté més opcions d'edició."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Edita"
            },
            UPLOAD: {
               TITLE: "Carrega"
            },
            CREATE: {
              TITLE: "Crea"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Canvia la mida del panell",
           USAGE: "Premeu les tecles de claudàtor esquerre o dret per redimensionar el panell."
       },
         CLOSE: {
            TOOLTIP: "Tanca",
            A11Y: "Aquest botó tanca el visualitzador de fitxers.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "El vostre fitxer encara s'està carregant.",
              PROMPT: "El fitxer encara s'està carregant. Si tanqueu abans d'acabar, es cancel·larà la càrrega.",
              OK: "Tanca igualment.",
              CANCEL: "Espera a que es carregui"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Afegeix a Fitxers",
           A11Y: "Aquest botó afegeix l'adjunció a Fitxers.",
           VIEW_NOW: "Visualitzar ara"
         },
         TEAR_OFF: {
           TOOLTIP: "Obre-ho en una finestra nova",
           A11Y: "Obre-ho en una finestra nova",
           ERROR_TEARING_OFF: "S'ha produït un error en obrir la finestra nova.",
           DIALOG_TITLE: "Confirma",
           UNSAVED_CHANGES_WARNING: "Teniu canvis sense desar que es perdran. Voleu obrir una finestra nova igualment?",
           OK: "Sí",
           CANCEL: "No",
           OPEN: "Obre",
           OPEN_ANYWAY: "Obrir igualment",
           CANCEL_ALT: "Cancel·la"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Nou a partir de fitxer",
            ACTION_NAME:"Crea un fitxer",
            A11Y: {
               TEXT: "Creeu un document (en fitxer DOC, DOCX o ODT) a partir d'un fitxer de plantilla. Podeu editar aquests documents en línia al Docs.",
               PRES: "Creeu una presentació (en fitxer PPT, PPTX o ODP) a partir d'un fitxer de plantilla. Podeu editar aquestes presentacions en línia al Docs.",
               SHEET: "Creeu un full de càlcul (en format XLS, XLSX o ODS) a partir d'un fitxer de plantilla. Podeu editar aquests fulls de càlcul en línia al Docs."
            },
            PROMPT: {
               TEXT: "Creeu un document (en fitxer DOC, DOCX o ODT) a partir d'un fitxer de plantilla. Podeu editar aquests documents en línia al Docs.",
               PRES: "Creeu una presentació (en fitxer PPT, PPTX o ODP) a partir d'un fitxer de plantilla. Podeu editar aquestes presentacions en línia al Docs.",
               SHEET: "Creeu un full de càlcul (en format XLS, XLSX o ODS) a partir d'un fitxer de plantilla. Podeu editar aquests fulls de càlcul en línia al Docs."
            },
            NAME_FIELD: "Nom:",
            EXTERNAL_FIELD: "Els fitxers es poden compartir amb persones externes a la meva organització",
            EXTERNAL_DESC: "L'accés extern permet compartir fitxers amb usuaris externs (persones de fora de la vostra organització o empresa), carpetes compartides amb usuaris externs i comunitats amb persones externes com a membres. Heu de definir l'accés extern en carregar un fitxer (no es pot activar més endavant).",
            CREATE_BUTTON: "Crea",
            CANCEL: "Cancel·la",
            PRE_FILL_NAMES: {
               OTT: "Document sense títol",
               OTS: "Full de càlcul sense títol",
               OTP: "Presentació sense títol",
               DOT: "Document sense títol",
               XLT: "Full de càlcul sense títol",
               POT: "Presentació sense títol",
               DOTX: "Document sense títol",
               XLTX: "Full de càlcul sense títol",
               POTX: "Presentació sense títol"
            },
            ERRORS: {
               NAME_REQUIRED: "El nom del document és necessari.",
               ILLEGAL_NAME:"El títol del document no és vàlid, especifiqueu-ne un altre.",
               WARN_LONG_NAME: "El nom del document és massa llarg.",
               TRIM_NAME: "Voleu escurçar el nom del document?",
               SESSION_TIMEOUT: "La sessió ha vençut, inicieu sessió i torneu-ho a provar.",
               DUPLICATE_NAME: "S'ha trobat un nom de fitxer duplicat. Introduïu un nom nou.",
               SERVER_ERROR: "El servidor del Connections no està disponible. Poseu-vos en contacte amb l'administrador del servidor i torneu-ho a provar més tard."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Descarrega el fitxer",
            A11Y: "Aquest botó descarrega el fitxer."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Descarrega com a PDF",
            TOOLTIP: "Descarrega aquest fitxer com un fitxer en PDF",
            A11Y: "Aquest botó descarrega el fitxer com a PDF.",
            SUCCESS: "Heu descarregat correctament el fitxer com a PDF.",
            ERROR: {
               DEFAULT: "No heu pogut descarregar el fitxer com a PDF. Torneu-ho a provar més tard.",
               UNAUTHENTICATED: "La sessió ha caducat. Heu de tornar a iniciar la sessió per poder descarregar el fitxer com a PDF.",
               NOT_FOUND: "El fitxer no s'ha pogut desar com a PDF perquè s'ha suprimit o ja no es comparteix amb l'usuari.",
               ACCESS_DENIED: "El fitxer no s'ha pogut desar com a PDF perquè s'ha suprimit o ja no es comparteix amb l'usuari."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "No hi ha cap versió publicada d'aquest fitxer per descarregar. Es poden publicar versions des de l'editor del Docs."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "No es pot descarregar el fitxer",
               CANCEL: "Tanca",
               PROMPT: "No hi ha cap versió publicada d'aquest fitxer per descarregar.",
               PROMPT2: "Les versions es poden publicar des de l'editor Docs."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "No es pot descarregar el fitxer",
               CANCEL: "Tanca",
               PROMPT: "No hi ha cap versió publicada d'aquest fitxer per descarregar.",
               PROMPT2: "Demaneu al propietari del fitxer que publiqui una versió d'aquest fitxer."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Descarrega una versió",
               OK: "Descarrega versió",
               PROMPT: {
                  TODAY: "S'ha detectat un esborrany més recent, editat per darrer cop avui a les ${time}.",
                  YESTERDAY: "S'ha detectat un esborrany més recent, editat per darrer cop ahir a les ${time}.",
                  DAY: "S'ha detectat un esborrany més recent, editat per darrer cop el dia ${date}.",
                  MONTH: "S'ha detectat un esborrany més recent, editat per darrer cop el dia ${date}.",
                  YEAR: "S'ha detectat un esborrany més recent, editat per darrer cop el dia ${date_long}."
               },
               PROMPT2: {
                  TODAY: "Esteu segur que voleu continuar descarregant la versió que s'ha publicat avui a les ${time}?",
                  YESTERDAY: "Esteu segur que voleu continuar descarregant la versió que es va publicar ahir a les ${time}?",
                  DAY: "Esteu segur que voleu continuar descarregant la versió que es va publicar el dia ${date}?",
                  MONTH: "Esteu segur que voleu continuar descarregant la versió que es va publicar el dia ${date}?",
                  YEAR: "Esteu segur que voleu continuar descarregant la versió que es va publicar el dia ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Mostra el panell de detalls",
            HIDE: "Oculta el panell de detalls",
            RESET: "Restableix la mida del panell",
            SHOW_A11Y: "Aquest botó obre i tanca la subfinestra lateral. La subfinestra lateral està tancada.",
            HIDE_A11Y: "Aquest botó obre i tanca la subfinestra lateral. La subfinestra lateral està oberta.",
            RESET_A11Y: "Aquest botó torna la subfinestra lateral a la seva mida per defecte. La subfinestra lateral està ampliada."
         },
         VIEW_DOC: {
            NAME: "Obre al visualitzador del Docs",
            TOOLTIP: "Obre al visualitzador del Docs",
            A11Y: "Aquest botó obre el fitxer per visualitzar-lo a una nova finestra de navegador."
         },
         EDIT_DOC: {
            NAME: "Edita al Docs",
            TOOLTIP: "Utilitzeu l'HCL Docs per editar aquest fitxer",
            A11Y: "Aquest botó obre el fitxer per editar-lo a Docs en una nova finestra de navegador."
         },
         EDIT_OFFICE: {
            TITLE: "Opcions d'edició.",
            NAME: "Edita a Microsoft Office Online",
            TOOLTIP: "Utilitzeu Microsoft Office Online per editar aquest fitxer",
            A11Y: "Aquest botó obre el fitxer per editar-lo a Microsoft Office Online en una nova finestra de navegador."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Edita a Microsoft Word Online",
           TOOLTIP: "Utilitzeu Microsoft Word Online per editar aquest fitxer",
           A11Y: "Aquest botó obre el fitxer per editar-lo a Microsoft Word Online en una nova finestra de navegador."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Edita a Microsoft Excel Online",
             TOOLTIP: "Utilitzeu Microsoft Excel Online per editar aquest fitxer",
             A11Y: "Aquest botó obre el fitxer per editar-lo a Microsoft Excel Online en una nova finestra de navegador."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Edita a Microsoft PowerPoint Online",
             TOOLTIP: "Utilitzeu Microsoft PowerPoint Online per editar aquest fitxer",
             A11Y: "Aquest botó obre el fitxer per editar-lo a Microsoft PowerPoint Online en una nova finestra de navegador."
         },
         OFFICE_EDITED: {
             SUCCESS: "El fitxer s'està desant."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Edita a l'escriptori",
            DIALOG_TITLE: "Edita a l'escriptori",
            TOOLTIP: "Edita aquest document",
            A11Y: "Aquest botó obre el fitxer per editar-lo localment.",
            PROMPT: "Aquesta característica us permet editar l'ús del programari instal·lat al vostre ordinador.",
            INSTALL: "Abans de continuar, ${startLink}instal·leu connectors de fitxers d'escriptori${endLink}.",
			// The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Important:",
            REMINDER: "Quan hàgiu acabat l'edició, publiqueu un esborrany mitjançant els connectors de fitxer d'escriptori.",
            SKIP_DIALOG: "No tornis a mostrar aquest missatge.",
            OK: "D'acord",
            CANCEL: "Cancel·la"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Confirma",
            DELETE_VERSION: "Suprimeix la versió ${version}",
            DELETE_VERSION_AND_PRIOR: "Suprimeix la versió ${version} i totes les versions anteriors",
            PROMPT: "Esteu a punt de suprimir la versió ${version}. Voleu continuar?",
            DELETE_PRIOR: "Suprimeix també totes les versions anteriors",
            ERROR: "S'ha produït un error en suprimir la versió. Torneu-ho a provar més tard.",
            TOOLTIP: "Suprimeix aquesta versió",
            OK: "D'acord",
            CANCEL: "Cancel·la"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Obtén enllaços",
            LINK_FILE: "Enllaç del fitxer:",
            LINK_PREVIEW: "Enllaç del fitxer de visualització prèvia:",
            LINK_DOWNLOAD: "Enllaç del fitxer de descarregada:",
            TOOLTIP: "Enllaç del fitxer",
            OK: "Tanca"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Descarrega aquesta versió"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Confirma",
            PROMPT: "Esteu a punt de substituir la versió actual d'aquest fitxer per la versió ${version}. Voleu continuar?",
            ERROR: "S'ha produït un error en restaurar la versió. Torneu-ho a provar més tard.",
            TOOLTIP: "Restaura aquesta versió",
            CHANGE_SUMMARY: "Restaurat des de la versió ${version}",
            OK: "D'acord",
            CANCEL: "Cancel·la"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Confirma",
            REMOVE_EVERYONE: "Esteu segur que voleu suprimir l'accés de la vostra organització a aquest fitxer? Si s'elimina l'accés, el fitxer se suprimirà de les carpetes i comunitats públiques amb accés de nivell d'organització, i només el propietari o les persones amb qui s'ha compartit podran visualitzar-lo o treballar-hi.",
            REMOVE_USER: "Esteu segur que voleu deixar de compartir amb ${user}? Si deixeu de compartir, ${user} només podrà accedir a aquest fitxer a través de carpetes o si es comparteix amb tota la vostra organització.",
            REMOVE_COMMUNITY: "Esteu segur que voleu suprimir aquest fitxer de la comunitat ${communityName}?",
            REMOVE_FOLDER: "Esteu segur que voleu suprimir aquest fitxer de la carpeta ${folderName}?",
            REMOVE_EVERYONE_TOOLTIP: "Elimineu l'accés de la vostra organització",
            REMOVE_USER_TOOLTIP: "Suprimeix tots els usos compartits amb ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Suprimeix de la comunitat ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Suprimeix de la carpeta ${folderName}",
            OK: "D'acord",
            CANCEL: "Cancel·la",
            EFSS: {
              DIALOG_TITLE: "Confirma",
              REMOVE_EVERYONE: "Esteu segur que voleu suprimir l'accés de la vostra organització a aquest fitxer? Si s'elimina l'accés, el fitxer se suprimirà de les carpetes amb accés de nivell d'organització i només el propietari o les persones amb qui s'ha compartit podran visualitzar-lo o treballar-hi.",
              REMOVE_USER: "Esteu segur que voleu deixar de compartir amb ${user}? Si deixeu de compartir, ${user} només podrà accedir a aquest fitxer a través de carpetes o si es comparteix amb tota la vostra organització.",
              REMOVE_COMMUNITY: "Esteu segur que voleu suprimir aquest fitxer de la comunitat ${communityName}?",
              REMOVE_FOLDER: "Esteu segur que voleu suprimir aquest fitxer de la carpeta ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Elimineu l'accés de la vostra organització",
              REMOVE_USER_TOOLTIP: "Elimina tots els usos compartits amb ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Elimina de la comunitat ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Elimina de la carpeta ${folderName}",
              OK: "D'acord",
              CANCEL: "Cancel·la",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Edita aquest comentari"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Confirma",
            PROMPT: "Esteu segur que voleu suprimir aquest comentari?",
            ERROR: "S'ha produït un error en suprimir el comentari. Torneu-ho a provar més tard.",
            TOOLTIP: "Suprimeix aquest comentari",
            OK: "D'acord",
            CANCEL: "Cancel·la"
         },
         LIKE: {
            LIKE: "Marca el fitxer com a M'agrada",
            UNLIKE: "Deixa de marcar el fitxer com a M'agrada",
            LIKE_A11Y: "Aquest botó marca el fitxer com a M'agrada.",
            UNLIKE_A11Y: "Aquest botó deixa de marcar el fitxer com a M'agrada.",
            LIKED_SUCCESS: "Heu fet M'agrada a aquest fitxer",
            UNLIKE_SUCCESS: "Ja no us agrada aquest fitxer"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Edita descripció",
            ERROR: {
               DEFAULT: "La descripció no s'ha pogut desar. Torneu-ho a provar més tard.",
               UNAUTHENTICATED: "La sessió ha caducat. Heu de tornar a iniciar la sessió per actualitzar la descripció.",
               NOT_FOUND: "La descripció no s'ha pogut desar perquè el fitxer s'ha suprimit o ja no es comparteix amb l'usuari.",
               ACCESS_DENIED: "La descripció no s'ha pogut desar perquè el fitxer s'ha suprimit o ja no es comparteix amb l'usuari."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "S'ha produït un error en desar el nom de fitxer",
               CONFLICT: "El nom de fitxer ja existeix"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "S'ha produït un error en seguir aquest fitxer. Torneu-ho a provar més tard.",
                  UNAUTHENTICATED: "La sessió ha caducat. Heu de tornar a iniciar la sessió per seguir aquest fitxer.",
                  NOT_FOUND: "No podeu seguir aquest fitxer perquè s'ha suprimit o ja no es comparteix amb vós.",
                  ACCESS_DENIED: "No podeu seguir aquest fitxer perquè s'ha suprimit o ja no es comparteix amb vós."
               },
               UNFOLLOW: {
                  DEFAULT: "S'ha produït un error en deixar de seguir aquest fitxer. Torneu-ho a provar més tard.",
                  UNAUTHENTICATED: "La sessió ha caducat. Heu de tornar a iniciar la sessió per deixar de seguir aquest fitxer.",
                  NOT_FOUND: "No podeu deixar de seguir aquest fitxer perquè s'ha suprimit o ja no es comparteix amb vós.",
                  ACCESS_DENIED: "No podeu deixar de seguir aquest fitxer perquè s'ha suprimit o ja no es comparteix amb vós."
               }
            },
            FOLLOW_NAME: "Segueix",
            FOLLOW_TOOLTIP: "Segueix aquest fitxer",
            FOLLOW_A11Y: "Aquest botó segueix el fitxer.",
            FOLLOW_SUCCESS: "No esteu seguint aquest fitxer.",
            STOP_FOLLOWING_NAME: "Deixa de seguir",
            STOP_FOLLOWING_TOOLTIP: "Deixa de seguir aquest fitxer",
            STOP_FOLLOWING_A11Y: "Aquest botó atura el seguiment del fitxer.",
            STOP_FOLLOWING_SUCCESS: "Heu deixat de seguir aquest fitxer."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Afegeix a la sincronització",
               TOOLTIP: "Afegeix aquest fitxer a la sincronització",
               A11Y: "Amb aquest botó podeu afegir el fitxer a la sincronització.",
               SUCCESS: "Heu afegit aquest fitxer a la sincronització.",
               ERROR: {
                  DEFAULT: "S'ha produït un error en afegir aquest fitxer a la sincronització. Torneu-ho a provar més tard.",
                  UNAUTHENTICATED: "La sessió ha caducat. Heu de tornar a iniciar la sessió per afegir aquest fitxer a la sincronització.",
                  NOT_FOUND: "No podeu afegir aquest fitxer a la sincronització perquè s'ha suprimit o ja no es comparteix amb vós.",
                  ACCESS_DENIED: "No podeu afegir aquest fitxer a la sincronització perquè s'ha suprimit o ja no es comparteix amb vós."
               }
            },
            STOP_SYNC: {
               NAME: "Elimina de la sincronització",
               TOOLTIP: "Elimina aquest fitxer de la sincronització",
               A11Y: "Amb aquest botó podeu eliminar el fitxer de la sincronització.",
               SUCCESS: "Heu eliminat aquest fitxer de la sincronització.",
               ERROR: {
                  DEFAULT: "S'ha produït un error en eliminar el fitxer de la sincronització. Torneu-ho a provar més tard.",
                  UNAUTHENTICATED: "La sessió ha caducat. Heu de tornar a iniciar la sessió per eliminar aquest fitxer de la sincronització.",
                  NOT_FOUND: "No podeu eliminar aquest fitxer de la sincronització perquè s'ha suprimit o ja no es comparteix amb vós.",
                  ACCESS_DENIED: "No podeu eliminar aquest fitxer de la sincronització perquè s'ha suprimit o ja no es comparteix amb vós."
               }
            },
            MYDRIVE: {
                NAME: "Afegeix a La meva unitat",
                TOOLTIP: "Afegeix aquest fitxer a La meva unitat",
                A11Y: "Aquest botó afegeix el fitxer a La meva unitat.",
                SUCCESS: "Heu afegit aquest fitxer a La meva unitat.",
                ERROR: {
                   DEFAULT: "S'ha produït un error en afegir aquest fitxer a La meva unitat. Torneu-ho a provar més tard.",
                   UNAUTHENTICATED: "La sessió ha caducat. Heu de tornar a iniciar la sessió per afegir aquest fitxer a La meva unitat.",
                   NOT_FOUND: "No podeu afegir aquest fitxer a La meva unitat perquè s'ha suprimit o ja no es comparteix amb vós.",
                   ACCESS_DENIED: "No podeu afegir aquest fitxer a La meva unitat perquè s'ha suprimit o ja no es comparteix amb vós."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Elimina de La meva unitat",
                TOOLTIP: "Elimina aquest fitxer de La meva unitat",
                A11Y: "Aquest botó elimina el fitxer de La meva unitat.",
                SUCCESS: "Heu eliminat aquest fitxer de La meva unitat.",
                ERROR: {
                   DEFAULT: "S'ha produït un error en eliminar aquest fitxer de La meva unitat. Torneu-ho a provar més tard.",
                   UNAUTHENTICATED: "La sessió ha caducat. Heu de tornar a iniciar la sessió per eliminar aquest fitxer de La meva unitat.",
                   NOT_FOUND: "No podeu eliminar aquest fitxer de La meva unitat perquè s'ha suprimit o ja no es comparteix amb vós.",
                   ACCESS_DENIED: "No podeu eliminar aquest fitxer de La meva unitat perquè s'ha suprimit o ja no es comparteix amb vós."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Ancora",
            FAVORITE_TOOLTIP: "Ancora aquest fitxer",
            FAVORITE_A11Y: "Amb aquest botó podeu ancorar el fitxer.",
            FAVORITE_SUCCESS: "Heu ancorat aquest fitxer.",
            STOP_FAVORITEING_NAME: "Desancora",
            STOP_FAVORITEING_TOOLTIP: "Desancora aquest fitxer",
            STOP_FAVORITEING_A11Y: "Amb aquest botó podeu desancorar el fitxer.",
            STOP_FAVORITEING_SUCCESS: "Heu desancorat aquest fitxer."
         },
         TRASH: {
            NAME: "Desplaça a la paperera",
            DIALOG_TITLE: "Confirma",
            PROMPT: "Esteu segur que voleu desplaçar aquest fitxer a la paperera? Si un fitxer es mou a la paperera deixarà d'estar disponible per a qualsevol usuari amb qui s'estigui compartint actualment.",
            ERROR: "S'ha produït un error en suprimir el fitxer. Torneu-ho a provar més tard.",
            TOOLTIP: "Suprimeix aquest fitxer",
            OK: "D'acord",
            CANCEL: "Cancel·la",
            A11Y: "Aquest botó mou el fitxer a la paperera.",
            SUCCESS_MSG: "${file} s'ha desplaçat a la paperera."
         },
         REFRESH: {
            NAME: "Actualitza",
            ERROR: "S'ha produït un error en actualitzar el Visualitzador de fitxers. Torneu-ho a provar més tard.",
            TOOLTIP: "Actualitzeu el visualitzador de fitxers",
            INFO_MSG: "Actualitzeu-lo per obtenir el contingut més recent. ${link}",
            A11Y: "Aquest botó mou el fitxer a la paperera.",
            SUCCESS_MSG: "El contingut s'ha actualitzat correctament."
         },
         COPY_FILE: {
            NAME: "Dóna una còpia a la comunitat...",
            DIALOG_TITLE: "Confirma",
            ERROR: "S'ha produït un error en copiar el fitxer. Torneu-ho a provar més tard.",
            TOOLTIP: "Dóna còpia d'aquest fitxer a una comunitat",
            OK: "D'acord",
            CANCEL: "Cancel·la",
            A11Y: "Aquest botó obre un diàleg que us permet proporcionar-ne una còpia a una comunitat.",
            SUCCESS_MSG: "${file} s'ha copiat a ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Transfereix la propietat...",
            DIALOG_TITLE: "Transfereix la propietat",
            TOOLTIP: "Transferiu aquest fitxer a un propietari nou",
            A11Y: "Amb aquest botó s'obre un quadre de diàleg que us permet transferir aquest fitxer a un propietari nou.",
            EMPTY: "Buit"
         },
         UPLOAD_VERSION: {
            NAME: "Carrega la nova versió",
            NAME_SHORT: "Carrega",
            CHANGE_SUMMARY: "Resum de canvis opcionals...",
            TOOLTIP: "Carrega una nova versió del fitxer",
            A11Y: "Aquest botó obre un diàleg que us permet carregar una nova versió del fitxer."
         },
         LOG_IN: {
            NAME: "Inicia la sessió",
            TOOLTIP: "Inicieu sessió per carregar i compartir fitxers, fer comentaris i crear carpetes"
         },
         LOCK: {
            NAME: "Bloqueja fitxer",
            TITLE: "Bloqueja aquest fitxer",
            A11Y: "Bloqueja aquest fitxer",
            SUCCESS: "El fitxer ara està bloquejat.",
            ERROR: "No s'ha pogut bloquejar el fitxer perquè s'ha suprimit o perquè ja no es comparteix amb vós."
         },
         UNLOCK: {
            NAME: "Desbloqueja fitxer",
            TITLE: "Desbloqueja aquest fitxer",
            A11Y: "Desbloqueja aquest fitxer",
            SUCCESS: "El fitxer ara està desbloquejat.",
            ERROR: "No s'ha pogut desbloquejar el fitxer perquè s'ha suprimit o perquè ja no es comparteix amb vós."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Edita a l'escriptori",
            TITLE: "Edita a l'escriptori",
            A11Y: "Edita a l'escriptori"
         },
         FLAG: {
            FILE: {
               NAME: "Senyala com a no adient",
               TITLE: "Marca el fitxer",
               A11Y: "Senyala aquest fitxer com a no adient",
               PROMPT: "Proporcioneu un motiu per senyalar aquest fitxer (opcional):",
               OK: "Marca",
               CANCEL: "Cancel·la",
               SUCCESS: "El fitxer s'ha senyalat i enviat per la seva revisió.",
               ERROR: "Error en senyalar aquest fitxer, torneu a intentar-ho més tard."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Correcte",
               PROMPT: "El fitxer s'ha senyalat i enviat per la seva revisió.",
               CANCEL: "D'acord"
            },
            COMMENT: {
               NAME: "Senyala com a no adient",
               TITLE: "Marca el comentari",
               A11Y: "Senyala aquest comentari com a no adient",
               PROMPT: "Proporcioneu un motiu per senyalar aquest comentari (opcional):",
               OK: "Marca",
               CANCEL: "Cancel·la",
               SUCCESS: "El comentari s'ha senyalat i enviat per ésser revisat.",
               ERROR: "Error en senyalar aquest comentari, torneu a intentar-ho més tard."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Correcte",
            PROMPT: "Els canvis s’han sotmès a revisió. Aquest fitxer no estarà disponible fins que se n'aprovin els canvis.",
            CANCEL: "D'acord"
         },
         DROPDOWN_BUTTON: "Botó desplegable"
      },
      SECTION: {
         ABOUT: {
            NAME: "Quant a aquest fitxer",
            VIEW_FILE_DETAILS: "Visualitza els detalls del fitxer",
            A11Y: "Si activeu aquest enllaç. es tancarà el visualitzador de fitxers i us portarà a la pàgina de detalls del fitxer d'aquest fitxer."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "No hi ha cap visualització prèvia disponible per a aquest fitxer."
         },
         IMAGE: {
            ZOOM_IN: "Apropa",
            ZOOM_OUT: "Allunya",
            RESET: "Restableix",
            ZOOM_IN_A11Y: "Aquest botó apropa la imatge.",
            ZOOM_OUT_A11Y: "Aquest botó allunya la imatge.",
            RESET_ZOOM_A11Y: "Aquest botó restableix el nivell de zoom.",
            UNSAFE_PREVIEW: "Aquest fitxer no es pot previsualitzar perquè no s'ha explorat per cercar virus."
         },
         VIEWER: {
            LOADING: "S'està carregant...",
            PUBLISHING: "Publicant...",
            NO_PUBLISHED_VERSION: "No hi ha disponible cap versió d'aquest fitxer que es pugui visualitzar.",
            IFRAME_TITLE: "Visualització prèvia del fitxer",
            AUTOPUBLISH_TIMEOUT: "El servidor triga massa temps a respondre. És possible que les darreres modificacions no s'hagin publicat."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Aquest fitxer no es pot previsualitzar perquè no s'ha explorat per cercar virus."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Actualitzat per darrera vegada per ${user} avui a les ${time}",
            YESTERDAY: "Actualitzat per darrera vegada per ${user} ahir a les ${time}",
            DAY: "Actualitzat per darrera vegada per ${user} el dia ${EEee} a les ${time}.",
            MONTH: "Actualitzat per darrera vegada per ${user} el dia ${date_long}",
            YEAR: "Actualitzat per darrera vegada per ${user} el dia ${date_long}"
         },
         CREATED: {
            TODAY: "Actualitzat per darrera vegada per ${user} avui a les ${time}",
            YESTERDAY: "Actualitzat per darrera vegada per ${user} ahir a les ${time}",
            DAY: "Creat per ${user} el dia ${EEee} a les ${time}",
            MONTH: "Creat per ${user} el dia ${date_long}",
            YEAR: "Creat per ${user} el dia ${date_long} "
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time}: avui",
            YESTERDAY: "${time}: ahir",
            DAY: "${time}: ${EEee}",
            MONTH: "${time}: ${date_long}",
            YEAR: "${time}: ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Avui",
            YESTERDAY: "Ahir",
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
         TITLE: "Àrea de text de comentaris",
         SHADOW_TEXT: "Afegeix un comentari...",
         CANNOT_ACCESS_CONTENT: "Les següents persones mencionades no poden veure el comentari perquè no tenen accés al contingut:",
         ERROR: "S'ha produït un error durant la validació de l'usuari que esteu intentant mencionar.",
         POST: "Publica",
         SAVE: "Desa",
         CANCEL: "Cancel·la",
         EXTERNAL_WARNING: "És possible que persones externes a la vostra organització puguin veure els comentaris."
      },
      EDIT_BOX: {
         SAVE: "Desa",
         CANCEL: {
            TOOLTIP: "Cancel·la",
            A11Y: "Aquest botó cancel·la l'acció d'editar el nom de fitxer."
         },
         INVALID_CHARACTERS: "Caràcter no vàlid",
         INVALID_CHARACTERS_REMOVED: "S'han eliminat els caràcters no vàlids"
      },
      COMMENT_WIDGET: {
         EDITED: "(Editat)",
         EDITED_DATE: {
            TODAY: "Editat avui a les ${time}",
            YESTERDAY: "Editat ahir a les ${time}",
            DAY: "Editat el dia ${EEee} a les ${time}",
            MONTH: "Editat el ${date_long}",
            YEAR: "Editat el ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Desa",
         CANCEL: "Cancel·la",
         USER: "Persona",
         COMMUNITY: "Comunitat",
         SHARE: "Comparteix",
         SHARE_ALT: "Comparteix amb aquesta persona",
         MEMBER_TYPE: "Tipus de membre",
         PERSON_SHADOW: "Escriviu per cercar una persona",
         COMMUNITY_SHADOW: "Escriviu per cercar una comunitat",
         PERSON_ARIA: "Escriviu per cercar una persona. Premeu majúscules i tabulador per alternar entre persones, comunitats i tothom de l'organització.",
         COMMUNITY_ARIA: "Escriviu per cercar una comunitat. Premeu majúscules i tabulador per alternar entre persones, comunitats i tothom de l'organització.",
         PERSON_FULL_SEARCH: "No està inclosa aquesta persona a la llista? Utilitzeu la cerca completa...",
         COMMUNITY_FULL_SEARCH: "Aquesta comunitat no està inclosa a la llista? Utilitzeu la cerca completa...",
         ADD_OPTIONAL_MESSAGE: "Afegeix el missatge opcional",
         ROLE_LABEL: "Rol",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Lector"
      },
      FILE_STATE: {
         DOCS_FILE: "Això és un fitxer del Docs. Totes les modificacions s’han de fer en línia.",
         LOCKED_BY_YOU: {
            TODAY: "L'heu bloquejat a les ${time}.",
            YESTERDAY: "El vau bloquejar ahir a les ${time}.",
            DAY: "El vau bloquejar el dia ${date}.",
            MONTH: "El vau bloquejar el dia ${date}.",
            YEAR: "El vau bloquejar el dia ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Bloquejat a les ${time} per ${user}.",
            YESTERDAY: "Bloquejat ahir a les ${time} per ${user}.",
            DAY: "Bloquejat el dia ${date} per ${user}.",
            MONTH: "Bloquejat el dia ${date} per ${user}.",
            YEAR: "Bloquejat el dia ${date_long} per ${user}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Escurça automàticament aquest text",
         COMMENT: {
            WARN_TOO_LONG: "El comentari és massa llarg.",
            TRIM: "Voleu escurçar el comentari?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "La descripció és massa llarga.",
            TRIM: "Voleu escurçar la descripció?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "El missatge és massa llarg.",
            TRIM: "Voleu escurçar el missatge?"
         },
         TAG: {
            WARN_TOO_LONG: "L'etiqueta és massa llarga.",
            TRIM: "Voleu escurçar l'etiqueta?"
         },
         TAGS: {
            WARN_TOO_LONG: "Una o diverses etiquetes són massa llargues.",
            TRIM: "Voleu escurçar les etiquetes?"
         },
         FILENAME: {
            WARN_TOO_LONG: "El nom del fitxer és massa llarg"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Aquest fitxer pot ser editat en línia per persones que tinguin l'HCL Docs.",
         NO_ENTITLEMENT_LINK: "Aquest fitxer pot ser editat en línia per persones que tinguin l'${startLink}HCL Docs${endLink}.",
		 // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "${users} actualment estan editant aquest fitxer a la web.",
         UNPUBLISHED_CHANGES: "Hi ha modificacions en aquest esborrany que no s'han publicat com a versió.",
         PUBLISH_A_VERSION: "Publica una versió",
         PUBLISH_SUCCESS: "Heu publicat correctament una versió d'aquest fitxer",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "La versió no s'ha pogut publicar perquè s'ha denegat l'accés.",
            NOT_FOUND: "La versió no s'ha pogut publicar perquè no s'ha trobat el document.",
            CANNOT_REACH_REPOSITORY: "La versió no s'ha pogut publicar perquè el servidor del Docs no es pot connectar amb el dipòsit de fitxers.",
            QUOTA_VIOLATION: "La versió no s'ha pogut publicar a causa de restriccions d'espai. Suprimiu altres fitxers per alliberar prou espai per publicar aquesta versió.",
            CONVERSION_UNAVAILABLE: "La versió no s'ha pogut publicar perquè el servei de conversió del Docs no està disponible. Torneu-ho a provar més tard.",
            TOO_LARGE: "La versió no s'ha pogut publicar perquè el document és massa llarg.",
            CONVERSION_TIMEOUT: "La versió no s'ha pogut publicar perquè el servei de conversió del Docs triga massa a convertir el document. Torneu-ho a provar més tard.",
            SERVER_BUSY: "La versió no s'ha pogut publicar perquè el servei del Docs no està disponible. Torneu-ho a provar més tard.",
            DEFAULT: "La versió no s'ha pogut publicar perquè el servei del Docs no està disponible. Torneu-ho a provar més tard."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "S'estan publicant les vostres modificacions. ${startLink}Actualitzeu per veure els canvis.${endLink}",
            GENERIC: "És possible que hàgiu d'actualitzar la pàgina per visualitzar els darrers canvis. ${startLink}Actualitza${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "No hi ha cap comentari.",
         MODERATED: "El comentari s'ha enviat a revisió i estarà disponible quan s'aprovi.",
         ERROR: {
            SAVE: {
               DEFAULT: "No s'ha pogut desar el comentari. Torneu-ho a provar més tard.",
               UNAUTHENTICATED: "La sessió ha caducat. Heu d'iniciar la sessió una altra vegada per desar el comentari.",
               NOT_FOUND: "No s'ha pogut desar el comentari perquè el fitxer s'ha suprimit o ja no està compartit.",
               ACCESS_DENIED: "No s'ha pogut desar el comentari perquè el fitxer s'ha suprimit o ja no està compartit."
            },
            DELETE: {
               DEFAULT: "No s'ha pogut suprimir el comentari. Torneu-ho a provar més tard.",
               UNAUTHENTICATED: "La sessió ha caducat. Heu d'iniciar la sessió una altra vegada per suprimir el comentari.",
               NOT_FOUND: "No s'ha pogut suprimir el comentari perquè el fitxer s'ha suprimit o ja no està compartit.",
               ACCESS_DENIED: "No s'ha pogut suprimir el comentari perquè el fitxer s'ha suprimit o ja no està compartit."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Desa",
         EDIT_TAGS: "Edita etiquetes",
         ERROR: {
            SAVE: {
               DEFAULT: "No s'ha pogut crear l'etiqueta. Torneu-ho a provar més tard."
            },
            DELETE: {
               DEFAULT: "No s'ha pogut suprimir l'etiqueta. Torneu-ho a provar més tard."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "Informació addicional...",
         READ_LESS: "Llegeix menys..."
      },
      SHARE: {
         EVERYONE: "Tothom de la meva organització",
         ADD_TOOLTIP: "Desa",
         ROLES: {
            OWNER: "Propietari",
            EDIT: "Editors",
            VIEW: "Lectors",
            FOLDER: "Compartit amb carpetes"
         },
         USERROLE: "${userRole}: ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Propietari"
            },
            EDIT: {
               ROLE: "Edita",
               ADD: "Afegeix editor"
            },
            VIEW: {
               ROLE: "Lector",
               ADD: "Afegeix lector"
            },
            FOLDER: {
               ADD: "Afegeix carpetes",
               COMMUNITY_ADD: "Afegeix a carpeta",
               MOVE: "Desplaça a la carpeta"
            },
            MULTI: {
               ADD: "Afegeix persones o comunitats",
               ADD_PEOPLE: "Afegeix persones"
            }
         },
         PUBLIC: {
            SHORT: "Tothom de la meva organització",
            LONG: {
               GENERIC: "Tothom de l'organització",
               ORG: "Tothom de ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Aquest fitxer ja es comparteix amb ${user}.",
            ERROR: "No es pot compartir amb ${user} en aquests moments.",
            SELF: "No podeu compartir-ho amb vós."
         },
         SHARE_INFO: {
            PROMOTED: "L'usuari ${user} ha pujat de nivell a un rol de compartició superior."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Compartit correctament amb ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "S'ha compartit el fitxer correctament."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Missatge opcional..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Subministrament d'un usuari extern",
               ACTION: "Subministrament d'un usuari extern...",
               TOOLTIP: "Subministrament d'un usuari extern",
               DIALOG_TITLE: "El contingut no s'ha compartit",
               PROMPT: {
                  NO_ACCOUNT: "L'usuari següent no té cap compte i no s'ha compartit cap contingut amb ell.",
                  INVITE: "Convideu aquest usuari com a visitant per compartir-hi contingut."
               },
               SUBMIT: "Continua amb la invitació",
               CANCEL: "Cancel·la",
               ERROR: "S'ha produït un error en proporcionar el compte. Torneu-ho a provar més tard.",
               SUCCESS: "S'ha proporcionat correctament el compte d'usuari."
            },
            PLURAL: {
               NAME: "Subministrament d'usuaris externs",
               ACTION: "Subministrament d'usuaris externs...",
               TOOLTIP: "Subministrament d'usuaris externs",
               DIALOG_TITLE: "El contingut no s'ha compartit",
               PROMPT: {
                  NO_ACCOUNT: "Els usuaris següents no tenen cap compte i no s'ha compartit contingut amb ells.",
                  INVITE: "Convideu aquests usuaris com a visitants per compartir-hi contingut."
               },
               SUBMIT: "Continueu amb les invitacions",
               CANCEL: "Cancel·la",
               ERROR: "S'ha produït un error en proporcionar els comptes. Torneu-ho a provar més tard.",
               SUCCESS: "S'ha proporcionat correctament els comptes d'usuari."
            },
            ABSTRACT: {
               NAME: "Subministrament d'usuaris externs",
               ACTION: "Subministrament d'usuaris externs...",
               TOOLTIP: "Subministrament d'usuaris externs",
               DIALOG_TITLE: "El contingut no s'ha compartit",
               PROMPT: {
                  NO_ACCOUNT: "Alguns usuaris no tenen cap compte i no s'ha compartit contingut amb ells.",
                  INVITE: "Convideu aquests usuaris com a visitants per compartir-hi contingut."
               },
               SUBMIT: "Continueu amb les invitacions",
               CANCEL: "Cancel·la",
               ERROR: "S'ha produït un error en proporcionar els comptes. Torneu-ho a provar més tard.",
               SUCCESS: "S'ha proporcionat correctament els comptes d'usuari."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Opcions d'ús compartit",
         PROPAGATION: "Permet a altres persones compartir aquest fitxer",
         EVERYONE: "Tothom pot compartir aquest fitxer.",
         OWNER_ONLY: "Només el propietari pot compartir aquest fitxer.",
         STOP_SHARE: "Deixa de compartir",
         MAKE_INTERNAL: "Deixa de compartir externament",
         MAKE_INTERNAL_SUCCESS: "Aquest fitxer ja no es pot compartir amb persones de fora de la vostra organització.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "El voleu convertir en intern?",
            PROMPT: "Si convertiu aquest fitxer en intern ja no es podrà compartir amb persones de fora de l'organització. ${br}${br}" +
            "Se suprimiran tots els usos compartits amb persones, comunitats o carpetes.${br}${br}Convertir un fitxer en intern és una acció permanent i no es pot desfer.",
            EFSS: {
               DIALOG_TITLE: "El voleu convertir en intern?",
               PROMPT: "Si convertiu aquest fitxer en intern ja no es podrà compartir amb persones de fora de l'organització. ${br}${br}" +
            "Se suprimiran tots els usos compartits amb persones o carpetes.${br}${br} Convertir un fitxer en intern és una acció permanent i no es pot desfer."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Deixa de compartir el fitxer",
            PROMPT: "Esteu segur que voleu deixar de compartir aquest fitxer?",
            QUESTION_PUBLIC: "Aquest fitxer ja no serà visible per a totes les persones de la vostra organització ni es compartirà amb altres persones, carpetes o comunitats. Aquesta operació no es pot desfer.",
            QUESTION_PUBLIC_E: "Aquest fitxer ja no serà visible per a totes les persones de la vostra organització ni es compartirà amb altres persones o carpetes. Aquesta operació no es pot desfer.",
            QUESTION: "El fitxer ja no es pot compartir amb persones o comunitats, i se suprimirà de totes les carpetes, tret de les carpetes privades. Aquesta acció no es pot desfer.",
            QUESTION_E: "El fitxer ja no es pot compartir amb persones i se suprimirà de totes les carpetes, tret de les carpetes privades. Aquesta acció no es pot desfer."
         },
         MAKE_PRIVATE_SUCCESS: "Aquest fitxer ara és privat.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "No es pot deixar de compartir el fitxer. Torneu-ho a provar més tard."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Els meus recursos compartits"
      },
      STREAM: {
         LOADING: "S'està carregant...",
         LOAD_MORE: "Carrega més..."
      },
      ENTRY: {
         REMOVE: "Elimina",
         RESTORE: "Restaura",
         EDIT: "Edita",
         DELETE: "Suprimeix",
         OK: "D'acord",
         CANCEL: "Cancel·la",
         USER_PICTURE: "Imatge de ${0}",
         FLAG: "Senyala com a no adient"
      },
      PANEL: {
         LOAD_ERROR: "S'ha produït un error en accedir a les metadades d'aquest fitxer.",
         ABOUT: {
            TITLE: "Quant a",
            EXPAND_BUTTON: "Amplia el botó per veure més informació",
            CURRENT_VERSION_HEADER: "Versió actual: ${versionNumber}",
            FILE_SIZE_HEADER: "Mida del fitxer",
            CURRENT_VERSION_FILE_SIZE: "${fileSize}: versió actual",
            ALL_VERSIONS_FILE_SIZE: "${fileSize}: totes les versions",
            DOCS_DRAFT_UPDATED_HEADER: "Esborrany editat",
            DOCS_DRAFT_CREATED_HEADER: "Esborrant creat",
            DOCS_UPDATED_HEADER: "Publicat",
            DOCS_CREATED_HEADER: "Creat",
            UPDATED_HEADER: "Actualitzat",
            CREATED_HEADER: "Creat",
            LIKES_HEADER: "M'agrada",
            LIKES_EXPAND_ICON: "Expandiu aquesta icona per veure qui ha fet M'agrada al fitxer",
            DOWNLOADS_HEADER: "Visualitzacions",
            DOWNLOADS_HEADER_MORE: "Visualitzacions (${0})",
            DOWNLOADS_EXPAND_ICON: "Expandiu aquesta icona per veure qui ha visualitzat el fitxer",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads}: ${anonymousDownloads} de manera anònima",
            DOWNLOADS_LATEST_VERSION: "Teniu la versió més recent del fitxer",
            DOWNLOADS_LAST_VERSION: "Vau visualitzar per última vegada la versió ${0} d'aquest fitxer",
            TAGS_HEADER: "Etiquetes",
            DESCRIPTION_HEADER: "Descripció",
            DESCRIPTION_READ_MORE: "Informació addicional...",
            LINKS_HEADER: "Enllaços",
            SECURITY: "Seguretat",
            FILE_ENCRYPTED: "El contingut del fitxer està xifrat. No es poden fer cerques al contingut del fitxer xifrat. No es pot visualitzar el contingut del fitxer ni tampoc no es pot editar amb l'HCL Docs.",
            GET_LINKS: "Obtén enllaços...",
            ADD_DESCRIPTION: "Afegeix una descripció",
            NO_DESCRIPTION: "No hi ha descripció",
            ADD_TAGS: "Afegeix etiquetes",
            NO_TAGS: "Sense etiquetes"
         },
         COMMENTS: {
            TITLE: "Comentaris",
            TITLE_WITH_COUNT: "Comentaris (${0})",
            VERSION: "Versió ${0}",
            FEED_LINK: "Canal d'informació per a aquests comentaris",
            FEED_TITLE: "Seguiu els canvis realitzats en aquests comentaris a través del lector de canals d'informació."
         },
         SHARING: {
            TITLE: "Ús compartit",
            TITLE_WITH_COUNT: "Compartit (${0})",
            SHARED_WITH_FOLDERS: "Compartit amb les carpetes: ${count}",
            SEE_WHO_HAS_SHARED: "Vegeu qui ha compartit",
            COMMUNITY_FILE: "Els fitxers propietat d'una comunitat no es poden compartir amb persones o altres comunitats.",
            SHARED_WITH_COMMUNITY: "Compartit amb membres de la comunitat '${0}'",
            LOGIN: "Inicia la sessió",
            NO_SHARE: "Aquest fitxer encara no s'ha afegit a cap carpeta.",
            ONE_SHARE: "Aquest fitxer és a 1 carpeta o comunitat a les quals no teniu accés.",
            MULTIPLE_SHARE: "Aquest fitxer és a ${fileNumber} carpetes o comunitats a les quals no teniu accés."
         },
         VERSIONS: {
            TITLE: "Versions",
            TITLE_WITH_COUNT: "Versions (${0})",
            FEED_LINK: "Canal d'informació per a aquestes versions",
            FEED_TITLE: "Seguiu els canvis d'aquest fitxer a través del lector de canals d'informació"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Confirmació d'acció",
         DIALOG_TITLE: "Confirma",
         PROMPT: "Esteu segur que voleu realitzar aquesta acció?",
         ERROR: "S'ha produït un error en realitzar l'acció. Torneu-ho a provar més tard.",
         TOOLTIP: "Realitza acció",
         OK: "D'acord",
         CANCEL: "Cancel·la",
         A11Y: "Aquest botó realitza l'acció actual."
      },
      THUMBNAIL: {
         TITLE: "Miniatura",
         CHANGE_LINK: "Canvia la miniatura...",
         ERROR: "No s'ha pogut desar la miniatura. Torneu-ho a provar més tard.",
         EXT_ERROR: "Seleccioneu un fitxer amb una de les següents extensions compatibles: ${0}",
         SUCCESS: "S'ha canviat la miniatura",
         UPLOAD: "Desa",
         CANCEL: "Cancel·la"
      },
      UPLOAD_VERSION: {
         LINK: "Carrega una nova versió...",
         CHANGE_SUMMARY: "Resum de canvis opcionals...",
         ERROR: "No s'ha pogut desar la nova versió. Torneu-ho a provar més tard.",
         SUCCESS: "S'ha desat la versió nova",
         UPLOAD: "Carrega",
         UPLOAD_AND_CHANGE_EXTENSION: "Carrega i canvia l'extensió",
         CANCEL: "Cancel·la",
         TOO_LARGE: "${file} és superior a la mida de fitxer ${size} permesa.",
         PROGRESS_BAR_TITLE: "S'està carregant la nova versió (${uploaded} de ${total} completats)",
         CANCEL_UPLOAD: "Cancel·la la càrrega"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "S'ha produït un error en accedir al fitxer. Torneu-ho a provar més tard.",
         UNAUTHENTICATED: "La sessió ha caducat. Heu de tornar a iniciar la sessió per visualitzar el fitxer.",
         NOT_FOUND: "El fitxer que heu sol·licitat s'ha suprimit o mogut. Si algú us ha enviat aquest enllaç, comproveu que sigui correcte.",
         ACCESS_DENIED: "No teniu permís per visualitzar aquest fitxer, ja que no es comparteix amb el vostre usuari.",
         ACCESS_DENIED_ANON: "No teniu permís per visualitzar aquest fitxer. Si aquest és el vostre fitxer o s'ha compartit amb el vostre usuari, primer cal que inicieu la sessió."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Error",
         PROMPT: "El fitxer que heu sol·licitat s'ha suprimit o mogut.",
         CANCEL: "D'acord"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Confirma",
        PROMPT: "La vostra sessió de l'HCL Connections ha esgotat el temps d'espera.${lineBreaks}Feu clic a D'acord per tornar a iniciar la sessió o a Cancel·la per tancar aquest diàleg.",
        OK: "D'acord",
        CANCEL: "Cancel·la"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "No es pot accedir a l'enllaç.",
        PROMPT: "S'ha produït un problema en accedir a l'enllaç.${lineBreaks}Feu clic a D'acord perquè se us redirigeixi a la pàgina.",
        OK: "D'acord",
        CANCEL: "Cancel·la"
      },
      LOAD_ERROR: {
         DEFAULT: "Vaja. S'ha produït un error en accedir a l'enllaç.",
         ACCESS_DENIED: "Poseu-vos en contacte amb el propietari del fitxer per sol·licitar permís per visualitzar aquest fitxer."
      },
      WINDOW_TITLE: {
         FILE: "${fileName}: fitxer",
         LOAD_ERROR: "Error en accedir al fitxer"
      },
      SHARE_WITH_LINK: {
         TITLE: "Comparteix amb enllaç",
         EMPTY_DESCRIPTION: "Encara no heu creat cap enllaç per al fitxer. Creeu un enllaç compartit per enviar-lo a altres persones de manera que puguin previsualitzar i descarregar el fitxer.",
         CREATE_LINK: "Crea un enllaç",
         COPY_LINK: "Copia l'enllaç",
         DELETE_LINK: "Suprimeix l'enllaç",
         ACCESS_TYPE_1: "Qualsevol persona amb l'enllaç pot visualitzar el fitxer",
         ACCESS_TYPE_2: "Les persones de la meva organització poden visualitzar el fitxer",
         ACCESS_TYPE_1_DESCRIPTION: "Les persones que obtinguin un enllaç podran previsualitzar i descarregar el fitxer després d'iniciar la sessió al Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "Les persones de la meva organització que obtinguin un enllaç podran previsualitzar i descarregar el fitxer després d'iniciar la sessió al Connections.",
         CHANGE_TYPE_SUCCESS: "El permís d'enllaç s'actualitza en canviar el tipus d'accés.",
         CHANGE_TYPE_ERROR: "Han fallat les actualitzacions del permís d'enllaç en canviar el tipus d'accés.",
         COPY_LINK_SUCCESS: "S'ha copiat l'enllaç al porta-retalls",
         CREATE_SHARELINK_SUCCESS:"L'enllaç s'ha creat correctament.",
         CREATE_SHARELINK_ERROR:"No es pot crear un enllaç a causa d'un error.",
         DELETE_SHARELINK_SUCCESS: "S'ha suprimit l'enllaç compartit de \"${file}\".",
         DELETE_SHARELINK_ERROR: "L'enllaç compartit no s'ha suprimit. Torneu a intentar-ho més tard.",
         CONFIRM_DIALOG: {
            OK: "Suprimeix",
            DIALOG_TITLE: "Suprimeix l'enllaç compartit",
            PROMPT: "Aquest fitxer esdevindrà inaccessible per a qualsevol persona que tingui l'enllaç. Esteu segur que voleu suprimir l'enllaç compartit?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "L'enllaç compartit està actiu. Qualsevol persona amb l'enllaç pot visualitzar aquest fitxer. Feu clic per copiar l'enllaç.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "L'enllaç compartit està actiu. Les persones de la meva organització poden visualitzar el fitxer. Feu clic per copiar l'enllaç."
      }
});
