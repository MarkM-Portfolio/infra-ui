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
         "windowtitle" : "Globalisation",
         "unavailable" : "Les paramètres de globalisation ne sont pas disponibles",
         "details" : "Définissez la langue et le calendrier de votre choix, et le sens du texte généré par l'utilisateur.",
         "error" : "Les paramètres de globalisation n'ont pas été récupérés en raison d'une erreur.",
         "titlebar" : {
            "tab2" : "Accès à l'application",
            "tab1" : "Notifications par courrier électronique",
            "tab3" : "Globalisation"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Ce bouton permet d'actualiser la page en cours avec un nouveau contenu.  Pour retourner à ce menu, revenez vers :"
         },
         "details_nolanguage" : "Définissez le calendrier de votre choix, et le sens du texte généré par l'utilisateur.",
         "a11y" : {
            "titlebar_label" : "Paramètres HCL Connections",
            "body_label" : "Paramètres de globalisation"
         },
         "heading" : "Paramètres de globalisation"
      },
      "restore_defaults" : {
         "error" : "Une erreur s'est produite. Veuillez réessayer ultérieurement.",
         "action_tooltip" : "Restaurer les paramètres de globalisation à leur valeur par défaut initiale",
         "action" : "Restaurer les valeurs par défaut",
         "success" : "Vos paramètres de globalisation ont été restaurés à leur valeurs par défaut initiales."
      },
      "help" : {
         "help" : "Aide",
         "close" : "Fermer"
      },
      "save" : {
         "error" : "Une erreur s'est produite. Veuillez réessayer ultérieurement.",
         "action_tooltip" : "Enregistrer les paramètres de globalisation",
         "action" : "Enregistrer",
         "success" : "Vos paramètres de globalisation ont été mis à jour."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Erreur :",
            "icon_alt" : "Erreur"
         },
         "success" : {
            "a11y_label" : "Opération réussie :",
            "icon_alt" : "Réussite"
         },
         "warning" : {
            "a11y_label" : "Avertissement :",
            "icon_alt" : "Avertissement"
         },
         "info" : {
            "a11y_label" : "Informations :",
            "icon_alt" : "Informations"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Restaurer les valeurs par défaut"
         },
         "bidi" : {
            "help" : "Activer le texte d'aide bidirectionnel",
            "label" : "Activer le texte bidirectionnel",
            "tooltip" : "Autorise un affichage spécifique à la langue du texte concaténé et structuré (par exemple les chemins de fichier).  Permet également de définir le sens du texte indépendamment du choix de la langue."
         },
         "error" : "Erreur",
         "save" : {
            "label" : "Enregistrer"
         },
         "direction" : {
            "label" : "Sens du texte généré par l'utilisateur :",
            "tooltip" : "Sens du texte dérivé des entrées de l'utilisateur, par exemple le nom des contenus ou les trajets de navigation.  Par défaut, il est déterminé par le choix de la langue (de gauche à droite généralement).  L'option Contextuel autorise le système à déterminer le sens en fonction de l'analyse des caractères (prend en charge le texte bidirectionnel).",
            "options" : {
               "contextual" : "Contextuel (basé sur les caractères)",
               "rtl" : "De droite à gauche",
               "ltr" : "De gauche à droite",
               "default_ltr" : "Utiliser le sens par défaut de la langue (de gauche à droite)",
               "default_rtl" : "Utiliser le sens par défaut de la langue (de droite à gauche)"
            }
         },
         "cancel" : {
            "label" : "Annuler"
         },
         "language" : {
            "selected" : "${0} (en cours)",
            "label" : "Langue :",
            "tooltip" : "Choisissez la langue du texte de l'application.  Ce paramètre n'affecte pas le texte généré par l'utilisateur."
         },
         "calendar" : {
            "label" : "Calendrier :",
            "options" : {
               "hebrew" : "hébreu",
               "gregorian" : "grégorien",
               "hijri" : "hijri"
            }
         }
      }
});
