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
         "legal" : "Lizentziadun Materialak - IBMren propietatea, 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, IBM logoa, ibm.com eta Lotus IBM Corporationen markak dira Estatu Batuetan, beste herrialde batzuetan, edo bietan. AEBko Gobernuko erabiltzaileen eskubide mugatuak: Erabilera, bikoizketa edo zabaltzea GSA ADP Schedule-en eta IBM Corp.-en arteko hitzarmenak mugatzen ditu.",
         "error" : "Errore bat gertatu da. Saiatu berriro geroago.",
         "granted" : {
            "title" : "Sarbidea emanda",
            "blurb" : "${0}(r)i zure HCL Connections kontuarekin erlazionatzeko sarbidea eman diozu."
         },
         "denied" : {
            "title" : "Sarbidea ukatuta",
            "blurb" : "${0}(r)i zure HCL Connections kontuarekin erlazionatzeko sarbidea ukatu diozu."
         },
         "blurb" : "{0} zure HCL Connections kontuaren informazioa, Connections-eko zure eduki guztiak barne, atzitzeko baimena eskatzen ari da.",
         "revoke" : {
            "description" : "Edozein unetan ken dezakezu sarrera baimena konexio Ezarpen bidez {0}. Connections-ek aldian behin berriz autorizatzea eska diezazuke.",
            "link" : "Aplikaziorako sarbidea"
         },
         "authorize" : {
            "label" : "Eman sarbidea"
         },
         "windowtitle" : "Eman HCL Connections-erako sarbidea",
         "title" : "Sarbide-eskaera",
         "deny" : {
            "label" : "Ukatu sarbidea"
         },
         "action_tooltip" : "Eman sarbidea ${0} aplikazioari",
         "action" : "Eman sarbidea",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Berriro hona zuzentzen: ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Gaitu JavaScript",
            "p2" : "Freskatu orria jarraitzeko.",
            "p1" : "JavaScript desgaitu egin da zure arakatzailean.  HCL Connections-ek JavaScript behar du funtzionatzeko.  Ireki eta gero, mesedez, freskatu orria."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Ezin dugu zure eskaera prozesatu",
            "description" : "Aplikazioak HCL Connections kontura sartzeko egindako eskaera ez da osatu.  Klik egin nabigatzaileko 'Atzera' botoian hona bidali zaituen gune edo aplikaziora itzultzeko, eta saiatu berriro.  Erroreak badirau, eman berri administratzaileari."
         },
         "invalid_token" : {
            "title" : "Ezin dugu zure eskaera prozesatu",
            "description" : "Aplikazioak bidalitako eskaera HCL Connections kontura sartzeko baliogabezko eskaera da.  Klik egin nabigatzaileko 'Atzera' botoian hona bidali zaituen gune edo aplikaziora itzultzeko, eta saiatu berriro.  Erroreak badirau, eman berri administratzaileari."
         },
         "default_action" : {
            "label" : "Itzuli orri nagusira"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Errorea:",
            "icon_alt" : "Errorea"
         },
         "success" : {
            "a11y_label" : "Arrakasta:",
            "icon_alt" : "Arrakasta"
         },
         "warning" : {
            "a11y_label" : "Abisua:",
            "icon_alt" : "Abisua"
         },
         "info" : {
            "a11y_label" : "Informazioa:",
            "icon_alt" : "Informazioa"
         }
      },
      "loading" : "Kargatzen...",
      "deny" : {
         "error" : "Errore bat gertatu da. Saiatu berriro geroago.",
         "action_tooltip" : "Ukatu sarbidea ${0} aplikazioari",
         "action" : "Ukatu sarbidea",
         "success" : "Sarbidea ukatu egin da."
      },
      "grid" : {
         "applications" : {
            "summary" : "Zure HCL Connections-eko informaziorako sarbidea duten aplikazioen zerrenda.",
            "loading" : "Kargatzen...",
            "empty" : "Ez da aplikaziorik aurkitu.",
            "reverse_sort" : "Alderantzikatu ordena"
         }
      },
      "applications" : {
         "windowtitle" : "Aplikaziorako sarbidea",
         "details" : "HCL Connections-eko zure informaziorako sarbidea duten aplikazioak.",
         "error" : "Zerrenda ez da berreskuratu errore bat gertatu delako.",
         "titlebar" : {
            "tab2" : "Aplikaziorako sarbidea",
            "tab1" : "Mezu elektroniko bidezko jakinarazpenak",
            "tab3" : "Globalizazioa"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Botoi hau sakatzean, uneko orria eduki berriarekin freskatuko da.  Menu honetara itzultzeko, bueltatu hona:"
         },
         "a11y" : {
            "titlebar_label" : "HCL Connections-en ezarpenak"
         },
         "heading" : "Aplikaziorako sarbidea"
      },
      "sorts" : {
         "application_name" : "Aplikazioaren izena",
         "authorization_date" : "Baimentze-data",
         "expiration_date" : "Iraungitze-data",
         "action" : "Ekintza"
      },
      "revoke_token" : {
         "error" : "Errore bat gertatu da. Saiatu berriro geroago.",
         "dialog_title" : "Errebokatu sarbidea",
         "action_tooltip" : "Errebokatu sarbidea ${0} aplikazioari",
         "action" : "Errebokatu",
         "ok" : "Ados",
         "cancel" : "Utzi",
         "confirm" : "Errebokatu aplikazio honek zure HCL Connections-eko informaziorako duen sarbidea? ",
         "success" : "Aplikazioa kendu egin da."
      }
});
