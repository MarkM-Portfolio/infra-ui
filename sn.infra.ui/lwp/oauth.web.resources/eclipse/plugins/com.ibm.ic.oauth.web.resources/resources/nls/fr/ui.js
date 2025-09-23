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
         "legal" : "El\u00e9ments sous licence \u2013 Propri\u00e9t\u00e9 de HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. Tous droits r\u00e9serv\u00e9s. Voir la licence de produit pour en savoir plus. Java ainsi que toutes les marques et tous les logos d\u00e9riv\u00e9s de Java sont des marques commerciales ou d\u00e9pos\u00e9es d'Oracle et/ou ses filiales.",
         "error" : "Une erreur s'est produite. Veuillez réessayer ultérieurement.",
         "granted" : {
            "title" : "Accès accordé",
            "blurb" : "Vous avez accordé un accès à ${0} pour interagir avec votre compte HCL Connections."
         },
         "denied" : {
            "title" : "Accès refusé",
            "blurb" : "Vous avez refusé un accès ${0} pour interagir avec votre compte HCL Connections."
         },
         "blurb" : "{0} demande à accéder à vos informations HCL Connections, notamment à tout votre contenu dans Connections.",
         "revoke" : {
            "description" : "Vous pouvez révoquer l'accès à tout moment en sélectionnant Paramètres Connections > {0}. Connections peut vous demander de procéder à une nouvelle autorisation périodiquement.",
            "link" : "Accès à l'application"
         },
         "authorize" : {
            "label" : "Accorder l'accès"
         },
         "windowtitle" : "Autorisation d'accès à HCL Connections",
         "title" : "Demande d'accès",
         "deny" : {
            "label" : "Refuser l'accès"
         },
         "action_tooltip" : "Accorder un accès à ${0}",
         "action" : "Accorder l'accès",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Vous êtes réacheminé vers ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Activer JavaScript",
            "p2" : "Actualisez la page pour continuer.",
            "p1" : "JavaScript est désactivé dans votre navigateur Web.  HCL Connections nécessite JavaScript pour fonctionner.  Après avoir activé JavaScript, actualisez la page."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Impossible de traiter votre demande",
            "description" : "La demande émise par l'application pour accéder à votre compte HCL Connections était incomplète.  Cliquez sur le bouton Précédent du navigateur pour revenir au site ou à l'application qui vous a amené ici et recommencez.  Si l'erreur persiste, signalez le problème à votre administrateur."
         },
         "invalid_token" : {
            "title" : "Impossible de traiter votre demande",
            "description" : "La demande émise par l'application pour accéder à votre compte HCL Connections n'était pas valide.  Cliquez sur le bouton Précédent du navigateur pour revenir au site ou à l'application qui vous a amené ici et recommencez.  Si l'erreur persiste, signalez le problème à votre administrateur."
         },
         "default_action" : {
            "label" : "Revenir à la page d'accueil"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Erreur :",
            "icon_alt" : "Erreur"
         },
         "success" : {
            "a11y_label" : "Opération réussie :",
            "icon_alt" : "Opération réussie"
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
      "loading" : "Chargement...",
      "deny" : {
         "error" : "Une erreur s'est produite. Veuillez réessayer ultérieurement.",
         "action_tooltip" : "Refuser un accès à ${0}",
         "action" : "Refuser l'accès",
         "success" : "L'accès a été refusé."
      },
      "grid" : {
         "applications" : {
            "summary" : "Liste des applications avec un accès à vos informations HCL Connections.",
            "loading" : "Chargement...",
            "empty" : "Aucune application trouvée.",
            "reverse_sort" : "Tri inverse"
         }
      },
      "applications" : {
         "windowtitle" : "Accès à l'application",
         "details" : "Applications avec un accès à vos informations HCL Connections.",
         "error" : "La liste n'a pas été extraite en raison d'une erreur.",
         "titlebar" : {
            "tab2" : "Accès à l'application",
            "tab1" : "Notifications par courrier électronique",
            "tab3" : "Globalisation"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Ce bouton permet d'actualiser la page en cours avec un nouveau contenu.  Pour retourner à ce menu, revenez vers :"
         },
         "a11y" : {
            "titlebar_label" : "Paramètres HCL Connections"
         },
         "heading" : "Accès à l'application"
      },
      "sorts" : {
         "application_name" : "Nom d'application",
         "authorization_date" : "Date d'autorisation",
         "expiration_date" : "Date d'expiration",
         "action" : "Action"
      },
      "revoke_token" : {
         "error" : "Une erreur s'est produite. Veuillez réessayer ultérieurement.",
         "dialog_title" : "Révoquer l'accès",
         "action_tooltip" : "Révoquer un accès à ${0}",
         "action" : "Révoquer",
         "ok" : "OK",
         "cancel" : "Annuler",
         "confirm" : "Refuser l'accès de cette application à vos informations HCL Connections ? ",
         "success" : "L'application a été retirée."
      }
});
