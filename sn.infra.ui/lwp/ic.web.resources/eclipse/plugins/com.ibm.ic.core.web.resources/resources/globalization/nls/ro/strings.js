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
         "windowtitle" : "Globalizare",
         "unavailable" : "Setările de globalizare nu sunt disponibile",
         "details" : "Specificaţi-vă limba preferată, ce calendar preferaţi şi direcţia în care curge textul generat de utilizator.",
         "error" : "Setările de gobalizare nu au fost extrase din cauza unei erori.",
         "titlebar" : {
            "tab2" : "Acces aplicaţie",
            "tab1" : "Notificări e-mail",
            "tab3" : "Globalizare"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Apăsarea acestui buton reîmprospătează pagina curentă cu conţinut nou.  Pentru a reveni la acest meniu, navigaţi înapoi la:"
         },
         "details_nolanguage" : "Specificaţi ce calendar preferaţi şi direcţia în care curge textul generat de utilizator.",
         "a11y" : {
            "titlebar_label" : "Setări HCL Connections",
            "body_label" : "Setări globalizare"
         },
         "heading" : "Setări globalizare"
      },
      "restore_defaults" : {
         "error" : "A apărut o eroare. Vă rugăm să încercaţi din nou mai târziu.",
         "action_tooltip" : "Restaurează setările de globalizare la valorile lor implicite originale",
         "action" : "Restaurare valori implicite",
         "success" : "Setările dumneavoastră de globalizare au fost restaurate la valorile lor implicite originale."
      },
      "help" : {
         "help" : "Ajutor",
         "close" : "Închidere"
      },
      "save" : {
         "error" : "A apărut o eroare. Vă rugăm să încercaţi din nou mai târziu.",
         "action_tooltip" : "Salvare setări globalizare",
         "action" : "Salvare",
         "success" : "Setările dumneavoastră de globalizare au fost actualizate."
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
      "preferences" : {
         "restore_defaults" : {
            "label" : "Restaurare valori implicite"
         },
         "bidi" : {
            "help" : "Activare ajutor text bidirecţional",
            "label" : "Activare text bidirecţional",
            "tooltip" : "Permite afişarea specifică limbii de text concatenat şi structurat, cum ar fi căile de fişier.  De asemenea, vă permite să specificaţi o direcţie de text independentă de selecţia dumneavoastră de limbă."
         },
         "error" : "Eroare",
         "save" : {
            "label" : "Salvare"
         },
         "direction" : {
            "label" : "Direcţia textului generat de utilizator:",
            "tooltip" : "Direcţia textului derivată din ce introduce utilizatorul, cum ar fi nume de conţinut şi de urme de întoarcere pentru navigare.  Implicit, aceasta este determinată de selecţia de limbă (de la stânga la dreapta pentru majoritatea).  Alegând contextual permiteţi sistemului să determine direcţia pe baza analizei caracterelor (suportă text în ambele direcţii).",
            "options" : {
               "contextual" : "Contextual (pe baza caracterelor)",
               "rtl" : "De la dreapta la stânga",
               "ltr" : "De la stânga la dreapta",
               "default_ltr" : "Foloseşte valoarea implicită a limbii (de la stânga la dreapta)",
               "default_rtl" : "Foloseşte valoarea implicită a limbii (de la dreapta la stânga)"
            }
         },
         "cancel" : {
            "label" : "Anulare"
         },
         "language" : {
            "selected" : "${0} (curent)",
            "label" : "Limba:",
            "tooltip" : "Specificaţi limba în care se va afişa textul aplicaţiei.  Această setare nu va afecta textul generat de utilizator."
         },
         "calendar" : {
            "label" : "Calendar:",
            "options" : {
               "hebrew" : "Ebraic",
               "gregorian" : "Gregorian",
               "hijri" : "Hijri"
            }
         }
      }
});
