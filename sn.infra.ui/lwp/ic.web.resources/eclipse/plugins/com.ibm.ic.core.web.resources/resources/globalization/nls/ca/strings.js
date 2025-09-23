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
         "windowtitle" : "Globalització",
         "unavailable" : "Els paràmetres de globalització no estan disponibles",
         "details" : "Especifiqueu l'idioma de preferència, quin tipus de calendari preferiu i la direcció en què es distribueix el text que ha generat l'usuari.",
         "error" : "Els paràmetres de la globalització no s'ha recuperat ja que s'ha produït un error.",
         "titlebar" : {
            "tab2" : "Accés a l'aplicació",
            "tab1" : "Notificació per correu electrònic",
            "tab3" : "Globalització"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "En prémer aquest botó, s'actualitzarà la pàgina actual amb contingut nou.  Per tornar a aquest menú, aneu a:"
         },
         "details_nolanguage" : "Especifiqueu quin tipus de calendari preferiu i la direcció en què es distribueix el text que ha generat l'usuari.",
         "a11y" : {
            "titlebar_label" : "Configuració de l'HCL Connections",
            "body_label" : "Paràmetres de globalització"
         },
         "heading" : "Paràmetres de globalització"
      },
      "restore_defaults" : {
         "error" : "S'ha produït un error. Torneu a intentar-ho més endavant.",
         "action_tooltip" : "Restaura paràmetres de globalització als seus originals valors per defecte",
         "action" : "Restaura paràmetres per defecte",
         "success" : "S'han restaurat els paràmetres de globalització als seus originals valors per defecte."
      },
      "help" : {
         "help" : "Ajuda",
         "close" : "Tanca"
      },
      "save" : {
         "error" : "S'ha produït un error. Torneu a intentar-ho més endavant.",
         "action_tooltip" : "Desa els paràmetres de globalització",
         "action" : "Desa",
         "success" : "S'han actualitzat els paràmetres de globalització."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Error:",
            "icon_alt" : "Error"
         },
         "success" : {
            "a11y_label" : "Correcte:",
            "icon_alt" : "Correcte"
         },
         "warning" : {
            "a11y_label" : "Advertiment:",
            "icon_alt" : "Advertiment"
         },
         "info" : {
            "a11y_label" : "Informació:",
            "icon_alt" : "Informació"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Restaura paràmetres per defecte"
         },
         "bidi" : {
            "help" : "Habilitar l'ajuda de text bidireccional",
            "label" : "Habilitar text bidireccional",
            "tooltip" : "Permet la visualització específica del text i el text estructurat, com ara els camins d'accés dels fitxers, en l'idioma específic.  També us permet especificar una direcció del text independent de la vostra selecció d'idioma."
         },
         "error" : "Error",
         "save" : {
            "label" : "Desa"
         },
         "direction" : {
            "label" : "Direcció del text que ha generat l'usuari:",
            "tooltip" : "La direcció de text derivat de l'entrada d'usuari, com ara noms de contingut i d'adreces de navegació.  Per defecte, ho determina la vostra selecció d'idioma (d'esquerra a dreta, normalment).  La selecció contextual permet al sistema determina la direcció en base a l'anàlisi dels caràcters, també admet una direcció del text mixta.",
            "options" : {
               "contextual" : "Contextual (basat en caràcters)",
               "rtl" : "De dreta a esquerra",
               "ltr" : "D'esquerra a dreta",
               "default_ltr" : "Utilitza l'idioma per defecte (d'esquerra a dreta)",
               "default_rtl" : "Utilitza l'idioma per defecte (de dreta a esquerra)"
            }
         },
         "cancel" : {
            "label" : "Cancel·la"
         },
         "language" : {
            "selected" : "${0} (actual)",
            "label" : "Idioma:",
            "tooltip" : "Especifiqueu l'idioma en què es mostrarà el text de l'aplicació.  Aquest paràmetre no afectarà el text que ha generat l'usuari."
         },
         "calendar" : {
            "label" : "Calendari:",
            "options" : {
               "hebrew" : "Hebreu",
               "gregorian" : "Gregorià",
               "hijri" : "Musulmà"
            }
         }
      }
});
