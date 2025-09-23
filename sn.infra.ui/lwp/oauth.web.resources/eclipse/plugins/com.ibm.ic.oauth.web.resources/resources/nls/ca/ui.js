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
         "legal" : "Materials sota llicència - Propietat d'IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, el logotip d'IBM, ibm.com i Lotus són marques registrades d'IBM Corporation als Estats Units o a altres països. Drets restringits als usuaris del govern dels EUA: l'ús, la duplicació o la divulgació queden restringits pel GSA ADP Schedule Contract amb IBM Corp. Consulteu la pàgina Quant a per obtenir més informació.",
         "error" : "S'ha produït un error. Torneu a intentar-ho més endavant.",
         "granted" : {
            "title" : "Accés atorgat",
            "blurb" : "Heu atorgat l'accés de ${0} perquè interactuï amb el vostre compte de l'HCL Connections."
         },
         "denied" : {
            "title" : "Accés denegat",
            "blurb" : "Heu denegat l'accés de ${0} perquè interactuï amb el vostre compte de l'HCL Connections."
         },
         "blurb" : "{0} està sol·licitant accés a la informació de l'HCL Connections, inclòs el contingut del Connections.",
         "revoke" : {
            "description" : "Podeu revocar l'accés en qualsevol moment des de Configuració del Connections > {0}. És possible que el Connections us demani periòdicament que el torneu a actualitzar.",
            "link" : "Accés a l'aplicació"
         },
         "authorize" : {
            "label" : "Atorga l'accés"
         },
         "windowtitle" : "Autoritza l'accés a HCL Connections",
         "title" : "Sol·licitud d'accés",
         "deny" : {
            "label" : "Denega l'accés"
         },
         "action_tooltip" : "Atorgueu l'accés a l'aplicació ${0}",
         "action" : "Atorga l'accés",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Se us està redirigint de nou a ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Activa JavaScript",
            "p2" : "Actualitzeu la pàgina per continuar.",
            "p1" : "JavaScript s'ha inhabilitat al navegador web.  L'HCL Connections necessita JavaScript per poder funcionar.  Un cop l'hàgiu activat, actualitzeu la pàgina."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "No podem processar la vostra sol·licitud",
            "description" : "La sol·licitud emesa per l'aplicació per demanar accés al vostre compte de l'HCL Connections no estava completa.  Feu clic al botó Enrere del navegador per tornar al lloc o a l'aplicació que heu enviat aquí i torneu-ho a provar.  Si aquest error persisteix, notifiqueu el problema a l'administrador."
         },
         "invalid_token" : {
            "title" : "No podem processar la vostra sol·licitud",
            "description" : "La sol·licitud emesa per l'aplicació per demanar accés al vostre compte de l'HCL Connections no era vàlida.  Feu clic al botó Enrere del navegador per tornar al lloc o a l'aplicació que heu enviat aquí i torneu-ho a provar.  Si aquest error persisteix, notifiqueu el problema a l'administrador."
         },
         "default_action" : {
            "label" : "Torna a la pàgina inicial"
         }
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
      "loading" : "S'està carregant...",
      "deny" : {
         "error" : "S'ha produït un error. Torneu a intentar-ho més endavant.",
         "action_tooltip" : "Denegueu l'accés a l'aplicació ${0}",
         "action" : "Denega l'accés",
         "success" : "S'ha denegat l'accés."
      },
      "grid" : {
         "applications" : {
            "summary" : "Llista d'aplicacions amb accés a la informació de l'HCL Connections.",
            "loading" : "S'està carregant...",
            "empty" : "No s'ha trobat cap aplicació.",
            "reverse_sort" : "Inverteix l'ordre"
         }
      },
      "applications" : {
         "windowtitle" : "Accés a l'aplicació",
         "details" : "Aplicacions amb accés a la informació de l'HCL Connections.",
         "error" : "La llista no s'ha recuperat a causa d'un error.",
         "titlebar" : {
            "tab2" : "Accés a l'aplicació",
            "tab1" : "Notificació per correu electrònic",
            "tab3" : "Globalització"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "En prémer aquest botó, s'actualitzarà la pàgina actual amb contingut nou.  Per tornar a aquest menú, aneu a:"
         },
         "a11y" : {
            "titlebar_label" : "Configuració de l'HCL Connections"
         },
         "heading" : "Accés a l'aplicació"
      },
      "sorts" : {
         "application_name" : "Nom d'aplicació",
         "authorization_date" : "Data d'autorització",
         "expiration_date" : "Data de caducitat",
         "action" : "Acció"
      },
      "revoke_token" : {
         "error" : "S'ha produït un error. Torneu a intentar-ho més endavant.",
         "dialog_title" : "Revoca l'accés",
         "action_tooltip" : "Revoqueu l'accés a l'aplicació ${0}",
         "action" : "Revoca",
         "ok" : "D'acord",
         "cancel" : "Cancel·la",
         "confirm" : "Voleu revocar l'accés d'aquesta aplicació a la vostra informació de l'HCL Connections? ",
         "success" : "S'ha eliminat l'aplicació."
      }
});
