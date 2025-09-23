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
         "legal" : "Materiale autorizate - Proprietate a IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, emblema IBM, ibm.com şi Lotus sunt mărci comerciale deţinute de IBM Corporation în Statele Unite, în alte ţări sau ambele. U.S. Government Users Restricted Rights: Utilizarea, duplicarea sau dezvăluirea restricţionate de GSA ADP Schedule Contract with IBM Corp. Vă rugăm să vedeţi pagina Despre pentru informaţii suplimentare.",
         "error" : "A apărut o eroare. Vă rugăm să încercaţi din nou mai târziu.",
         "granted" : {
            "title" : "Acces acordat",
            "blurb" : "Aţi acordat acces pentru ${0} pentru a interacţiona cu contul dumneavoastră HCL Connections."
         },
         "denied" : {
            "title" : "Acces refuzat",
            "blurb" : "Aţi refuzat accesul pentru ${0} pentru a interacţiona cu contul dumneavoastră HCL Connections."
         },
         "blurb" : "{0} solicită acces la informaţiile dumneavoastră HCL Connections, inclusiv tot conţinutul dumneavoastră din Conexiuni.",
         "revoke" : {
            "description" : "Puteţi revoca accesul în orice moment prun Setările de conexiune > {0}. Connections ar putea să vă întrebe periodic să re-autorizaţi.",
            "link" : "Acces aplicaţie"
         },
         "authorize" : {
            "label" : "Acordare acces"
         },
         "windowtitle" : "Autorizaţi accesul la HCL Connections",
         "title" : "Cerere de acces",
         "deny" : {
            "label" : "Refuzare acces"
         },
         "action_tooltip" : "Acordaţi accesul la aplicaţia ${0}",
         "action" : "Acordare acces",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Vă redirecţionează înapoi către ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Porniţi JavaScript",
            "p2" : "Reîmprospătaţi pagina pentru a continua.",
            "p1" : "JavaScript a fost dezactivat în browser-ul dumneavoastră web.  HCL Connections necesită JavaScript pentru a funcţiona.  Odată ce aţi pornit-o, vă rugăm să reîmprospătaţi pagina."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Nu vă putem procesa cererea",
            "description" : "Cererea emisă de aplicaţia cae cere acces la contul dumneavoastră HCL Connections a fost incompletă.  Faceţi clic pe butonul Înapoi al browser-ului pentru a vă întoarce la site-ul sau aplicaţia care v-a trimis aici şi încercaţi din nou.  Dacă această eroare persistă, raportaţi problema administratorului dumneavoastră."
         },
         "invalid_token" : {
            "title" : "Nu vă putem procesa cererea",
            "description" : "Cererea emisă de aplicaţia care necesită acces la contul dumneavoastră HCL Connections a fost invalidă.  Faceţi clic pe butonul Înapoi al browser-ului pentru a vă întoarce la site-ul sau aplicaţia care v-a trimis aici şi încercaţi din nou.  Dacă această eroare persistă, raportaţi problema administratorului dumneavoastră."
         },
         "default_action" : {
            "label" : "Întoarcere la Pagina acasă"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Eroare:",
            "icon_alt" : "Eroare"
         },
         "success" : {
            "a11y_label" : "Succes:",
            "icon_alt" : "Succes"
         },
         "warning" : {
            "a11y_label" : "Avertisment:",
            "icon_alt" : "Avertisment"
         },
         "info" : {
            "a11y_label" : "Informaţii:",
            "icon_alt" : "Informaţii"
         }
      },
      "loading" : "Încărcare...",
      "deny" : {
         "error" : "A apărut o eroare. Vă rugăm să încercaţi din nou mai târziu.",
         "action_tooltip" : "Refuzaţi accesul la aplicaţia ${0}",
         "action" : "Refuzare acces",
         "success" : "Accesul a fost refuzat."
      },
      "grid" : {
         "applications" : {
            "summary" : "Lista de aplicaţii cu acces la informaţiile dumneavoastră HCL Connections.",
            "loading" : "Încărcare...",
            "empty" : "Nicio aplicaţie găsită.",
            "reverse_sort" : "Inversare sortare"
         }
      },
      "applications" : {
         "windowtitle" : "Acces aplicaţie",
         "details" : "Aplicaţiile cu acces la informaţiile dumneavoastră HCL Connections.",
         "error" : "Lista nu a fost extrasă din cauza unei erori.",
         "titlebar" : {
            "tab2" : "Acces aplicaţie",
            "tab1" : "Notificări e-mail",
            "tab3" : "Globalizare"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Apăsarea acestui buton reîmprospătează pagina curentă cu conţinut nou.  Pentru a reveni la acest meniu, navigaţi înapoi la:"
         },
         "a11y" : {
            "titlebar_label" : "Setări HCL Connections"
         },
         "heading" : "Acces aplicaţie"
      },
      "sorts" : {
         "application_name" : "Nume de aplicaţie",
         "authorization_date" : "Dată de autorizare",
         "expiration_date" : "Dată expirare",
         "action" : "Acţiune"
      },
      "revoke_token" : {
         "error" : "A apărut o eroare. Vă rugăm să încercaţi din nou mai târziu.",
         "dialog_title" : "Revocare acces",
         "action_tooltip" : "Revocaţi accesul la aplicaţia ${0}",
         "action" : "Revocare",
         "ok" : "OK",
         "cancel" : "Anulare",
         "confirm" : "Revocaţi accesul aceste aplicaţii la informaţiile dumneavoastră HCL Connections? ",
         "success" : "Aplicaţia a fost înlăturată."
      }
});
