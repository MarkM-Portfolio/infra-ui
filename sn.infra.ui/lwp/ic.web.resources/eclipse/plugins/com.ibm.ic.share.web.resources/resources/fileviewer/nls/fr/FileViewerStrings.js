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
      FILE_VIEWER_TITLE: "Prévisualisation de fichier",
      FILENAME_TOOLTIP: "Editer le nom de fichier",
      ICON_TOOLTIP: "Télécharger le fichier",
      ERROR: "Une erreur s'est produite.",
      FILE_MALICIOUS: "L'analyse a révélé un contenu dangereux",
      SHARED_EXTERNALLY: "Partagé en externe",
      FILE_SYNCED: "Ajouté à la synchronisation",
      MY_DRIVE: {
         TITLE: "Dans Mon unité",
         ROOT_FOLDER: "/Mon unité",
         FOLDER: "/Mon unité/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Autres actions",
         A11Y: "Ouvre un menu déroulant avec une liste des autres actions à exécuter sur le fichier.",
            PANELS: {
               TITLE: "Plus",
               A11Y: "Ouvre un menu déroulant avec une liste des panneaux masqués"
            }
      },
      WELCOME: {
         TITLE: "L'affichage d'un fichier s'accompagne désormais de ses détails",
         SUBTITLE: "Vous pouvez maintenant afficher un fichier et ses commentaires côte-à-côte.",
         LINES: {
            LINE_1: "Toutes les informations et les opérations que vous pouviez effectuer sur l'ancienne page se trouvent ici.",
            LINE_2: "Les commentaires, informations de partage, versions et informations de base sont disponibles sur le côté du fichier."
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "Ce bouton permet de passer au fichier suivant.",
         PREVIOUS_A11Y: "Ce bouton permet de passer au fichier précédent."
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Options d'édition supplémentaires",
            A11Y: "Ce bouton ouvre un menu comportant des options d'édition supplémentaires."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Editer"
            },
            UPLOAD: {
               TITLE: "Envoyer par téléchargement"
            },
            CREATE: {
              TITLE: "Créer"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Redimensionner le panneau",
           USAGE: "Appuyez sur les touches Crochet gauche ou Crochet droit pour redimensionner le panneau."
       },
         CLOSE: {
            TOOLTIP: "Fermer",
            A11Y: "Ce bouton permet de fermer le visualiseur de fichiers.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "Votre fichier est toujours en cours d'envoi par téléchargement.",
              PROMPT: "Votre fichier est toujours en cours d'envoi par téléchargement. Si vous fermez avant la fin de l'opération, l'envoi par téléchargement sera annulé.",
              OK: "Fermer tout de même",
              CANCEL: "Attendre la fin de l'opération"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Ajouter aux fichiers",
           A11Y: "Ce bouton ajoute la pièce jointe aux Fichiers.",
           VIEW_NOW: "Afficher maintenant"
         },
         TEAR_OFF: {
           TOOLTIP: "Ouvrir dans une nouvelle fenêtre",
           A11Y: "Ouvrir dans une nouvelle fenêtre",
           ERROR_TEARING_OFF: "Une erreur s'est produite lors de l'ouverture de la nouvelle fenêtre.",
           DIALOG_TITLE: "Confirmation",
           UNSAVED_CHANGES_WARNING: "Des modifications non enregistrées seront perdues. Souhaitez-vous malgré tout ouvrir dans une nouvelle fenêtre ?",
           OK: "Oui",
           CANCEL: "Non",
           OPEN: "Ouvrir",
           OPEN_ANYWAY: "Ouvrir malgré tout",
           CANCEL_ALT: "Annuler"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Nouveau à partir du fichier",
            ACTION_NAME:"Créer un fichier",
            A11Y: {
               TEXT: "Créez un document (fichier DOC, DOCX ou ODT) à partir d'un fichier modèle. Vous pouvez éditer ces documents en ligne dans Docs.",
               PRES: "Créez une présentation (fichier PPT, PPTX ou ODP) à partir d'un fichier modèle. Vous pouvez éditer ces présentations en ligne dans Docs.",
               SHEET: "Créez une feuille de calcul (fichier XLS, XLSX ou ODS) à partir d'un fichier modèle. Vous pouvez éditer ces feuilles de calcul en ligne dans Docs."
            },
            PROMPT: {
               TEXT: "Créez un document (fichier DOC, DOCX ou ODT) à partir d'un fichier modèle. Vous pouvez éditer ces documents en ligne dans Docs.",
               PRES: "Créez une présentation (fichier PPT, PPTX ou ODP) à partir d'un fichier modèle. Vous pouvez éditer ces présentations en ligne dans Docs.",
               SHEET: "Créez une feuille de calcul (fichier XLS, XLSX ou ODS) à partir d'un fichier modèle. Vous pouvez éditer ces feuilles de calcul en ligne dans Docs."
            },
            NAME_FIELD: "Nom :",
            EXTERNAL_FIELD: "Fichiers pouvant être partagés avec des personnes externes à mon organisation",
            EXTERNAL_DESC: "L'accès externe permet de partager des fichiers avec des utilisateurs externes (personnes extérieures à votre organisation ou entreprise), de partager des dossiers avec des utilisateurs externes ainsi que des communautés avec les personnes externes qui en sont membres. Vous devez définir l'accès externe lors de l'envoi par téléchargement d'un fichier : il ne pourra pas être activé ultérieurement.",
            CREATE_BUTTON: "Créer",
            CANCEL: "Annuler",
            PRE_FILL_NAMES: {
               OTT: "Document sans titre",
               OTS: "Feuille de calcul sans titre",
               OTP: "Présentation sans titre",
               DOT: "Document sans titre",
               XLT: "Feuille de calcul sans titre",
               POT: "Présentation sans titre",
               DOTX: "Document sans titre",
               XLTX: "Feuille de calcul sans titre",
               POTX: "Présentation sans titre"
            },
            ERRORS: {
               NAME_REQUIRED: "Nom de document requis.",
               ILLEGAL_NAME:"Il s'agit d'un titre de document non admis, spécifiez-en un autre.",
               WARN_LONG_NAME: "Le nom du document est trop long.",
               TRIM_NAME: "Raccourcir le nom du document ?",
               SESSION_TIMEOUT: "Votre session a expiré, connectez-vous puis réessayez.",
               DUPLICATE_NAME: "Un nom de fichier en double a été détecté. Entrez un nouveau nom.",
               SERVER_ERROR: "Le serveur Connections n'est pas disponible. Contactez l'administrateur du serveur et réessayez plus tard."
            }
         },
         DOWNLOAD: {
            TOOLTIP: "Télécharger le fichier",
            A11Y: "Ce bouton permet de télécharger le fichier."
         },
         DOWNLOAD_AS_PDF: {
            NAME: "Télécharger en PDF",
            TOOLTIP: "Télécharger ce fichier sous forme de fichier PDF",
            A11Y: "Ce bouton permet de télécharger le fichier en tant que fichier PDF.",
            SUCCESS: "Vous avez téléchargé ce fichier au format PDF.",
            ERROR: {
               DEFAULT: "Vous n'êtes pas parvenu à télécharger le fichier en PDF.  Veuillez réessayer ultérieurement.",
               UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter à nouveau pour pouvoir télécharger le fichier sous forme de fichier PDF.",
               NOT_FOUND: "Le fichier n'a pas pu être téléchargé en tant que fichier PDF car il a été supprimé ou n'est plus partagé avec vous.",
               ACCESS_DENIED: "Le fichier n'a pas pu être téléchargé en tant que fichier PDF car il a été supprimé ou n'est plus partagé avec vous."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Il n'existe pas de version publiée de ce fichier à télécharger.  Les versions peuvent être publiées à partir de l'éditeur Docs."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Impossible de télécharger le fichier",
               CANCEL: "Fermer",
               PROMPT: "Il n'existe pas de version publiée de ce fichier à télécharger.",
               PROMPT2: "Les versions peuvent être publiées à partir de l'éditeur Docs."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Impossible de télécharger le fichier",
               CANCEL: "Fermer",
               PROMPT: "Il n'existe pas de version publiée de ce fichier à télécharger.",
               PROMPT2: "Demandez au propriétaire du fichier de publier une version de ce fichier."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Télécharger une version",
               OK: "Télécharger une version",
               PROMPT: {
                  TODAY: "Un brouillon plus récent, édité en dernier à ${time}, a été détecté.",
                  YESTERDAY: "Un brouillon plus récent, édité en dernier hier à ${time}, a été détecté.",
                  DAY: "Un brouillon plus récent, édité en dernier le ${date}, a été détecté.",
                  MONTH: "Un brouillon plus récent, édité en dernier le ${date}, a été détecté.",
                  YEAR: "Un brouillon plus récent, édité en dernier le ${date_long}, a été détecté."
               },
               PROMPT2: {
                  TODAY: "Voulez-vous vraiment continuer à télécharger la version publiée aujourd'hui à ${time} ?",
                  YESTERDAY: "Voulez-vous vraiment continuer à télécharger la version publiée hier à ${time} ?",
                  DAY: "Voulez-vous vraiment continuer à télécharger la version publiée le ${date} ?",
                  MONTH: "Voulez-vous vraiment continuer à télécharger la version publiée le ${date} ?",
                  YEAR: "Voulez-vous vraiment continuer à télécharger la version publiée le ${date_long} ?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Afficher le panneau des détails",
            HIDE: "Masquer le panneau des détails",
            RESET: "Réinitialiser la taille du panneau",
            SHOW_A11Y: "Ce bouton permet d'ouvrir/fermer le panneau latéral. Le panneau latéral est actuellement fermé.",
            HIDE_A11Y: "Ce bouton permet d'ouvrir/fermer le panneau latéral. Le panneau latéral est actuellement ouvert.",
            RESET_A11Y: "Ce bouton réinitialise le panneau latéral à sa taille par défaut. Ce panneau latéral est actuellement développé."
         },
         VIEW_DOC: {
            NAME: "Ouvrir dans Docs Viewer",
            TOOLTIP: "Ouvrir dans Docs Viewer",
            A11Y: "Ce bouton ouvre le fichier pour affichage dans une nouvelle fenêtre de navigateur."
         },
         EDIT_DOC: {
            NAME: "Editer dans Docs",
            TOOLTIP: "Utilisez HCL Docs pour éditer ce fichier",
            A11Y: "Ce bouton ouvre le fichier pour édition dans Docs dans une nouvelle fenêtre."
         },
         EDIT_OFFICE: {
            TITLE: "Options d'édition",
            NAME: "Editer dans Microsoft Office Online",
            TOOLTIP: "Utilisez Microsoft Office Online pour éditer ce fichier",
            A11Y: "Ce bouton ouvre le fichier pour édition dans Microsoft Office Online, dans une nouvelle fenêtre."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Editer dans Microsoft Word Online",
           TOOLTIP: "Utilisez Microsoft Word Online pour éditer ce fichier",
           A11Y: "Ce bouton ouvre le fichier pour édition dans Microsoft Word Online, dans une nouvelle fenêtre."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Editer dans Microsoft Excel Online",
             TOOLTIP: "Utilisez Microsoft Excel Online pour éditer ce fichier",
             A11Y: "Ce bouton ouvre le fichier pour édition dans Microsoft Excel Online, dans une nouvelle fenêtre."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Editer dans Microsoft PowerPoint Online",
             TOOLTIP: "Utilisez Microsoft PowerPoint Online pour éditer ce fichier",
             A11Y: "Ce bouton ouvre le fichier pour édition dans Microsoft PowerPoint Online, dans une nouvelle fenêtre."
         },
         OFFICE_EDITED: {
             SUCCESS: "Le fichier a été enregistré."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Editer sur le bureau",
            DIALOG_TITLE: "Editer sur le bureau",
            TOOLTIP: "Editer ce document",
            A11Y: "Ce bouton ouvre le fichier pour l'éditer localement.",
            PROMPT: "Cette fonction vous permet d'éditer à l'aide du logiciel installé sur votre ordinateur.",
            INSTALL: "Avant de poursuivre, ${startLink}installez les connecteurs du fichier de bureau${endLink}.", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Important :",
            REMINDER: "Une fois l'édition terminée, publiez un brouillon à l'aide des connecteurs du fichier de bureau.",
            SKIP_DIALOG: "Ne plus afficher ce message.",
            OK: "OK",
            CANCEL: "Annuler"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Confirmation",
            DELETE_VERSION: "Supprimer la version ${version}",
            DELETE_VERSION_AND_PRIOR: "Supprimer la version ${version} et toutes les versions antérieures",
            PROMPT: "Vous allez supprimer la version ${version}. Souhaitez-vous continuer ?",
            DELETE_PRIOR: "Supprimer également les versions antérieures",
            ERROR: "Une erreur s'est produite lors de la suppression de la version. Réessayez ultérieurement.",
            TOOLTIP: "Supprimer cette version",
            OK: "OK",
            CANCEL: "Annuler"
         },
         GET_LINKS: {
            DIALOG_TITLE: "Obtenir des liens",
            LINK_FILE: "Lien vers un fichier :",
            LINK_PREVIEW: "Lien vers un fichier de prévisualisation :",
            LINK_DOWNLOAD: "Lien vers un fichier de téléchargement :",
            TOOLTIP: "Lien vers un fichier",
            OK: "Fermer"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "Télécharger cette version"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "Confirmation",
            PROMPT: "Vous êtes sur le point de remplacer la version actuelle de ce fichier par la version ${version}. Souhaitez-vous continuer ?",
            ERROR: "Une erreur s'est produite lors de la restauration de la version. Réessayez ultérieurement.",
            TOOLTIP: "Restaurer cette version",
            CHANGE_SUMMARY: "Restauré à partir de la version ${version}",
            OK: "OK",
            CANCEL: "Annuler"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "Confirmation",
            REMOVE_EVERYONE: "Etes-vous sûr de vouloir retirer l'accès à ce fichier pour votre organisation ? Une fois l'accès retiré, le fichier est retiré des dossiers et des communautés autorisant un accès de niveau organisation et seuls le propriétaire et les personnes avec lesquelles il a été partagé peuvent le visualiser et l'utiliser.",
            REMOVE_USER: "Etes-vous sûr de vouloir arrêter le partage avec ${user} ? Si vous arrêtez le partage, ${user} pourra uniquement accéder à ce fichier via des dossiers ou s'il est partagé avec toutes les personnes de votre organisation.",
            REMOVE_COMMUNITY: "Etes-vous sûr de vouloir retirer ce fichier de la communauté ${communityName} ?",
            REMOVE_FOLDER: "Etes-vous sûr de vouloir retirer ce fichier du dossier ${folderName} ?",
            REMOVE_EVERYONE_TOOLTIP: "Retirer l'accès de votre organisation",
            REMOVE_USER_TOOLTIP: "Retirer tous les partages avec ${user}",
            REMOVE_COMMUNITY_TOOLTIP: "Retirer de la communauté ${communityName}",
            REMOVE_FOLDER_TOOLTIP: "Retirer du dossier ${folderName}",
            OK: "OK",
            CANCEL: "Annuler",
            EFSS: {
              DIALOG_TITLE: "Confirmation",
              REMOVE_EVERYONE: "Etes-vous sûr de vouloir retirer l'accès à ce fichier pour votre organisation ? Une fois l'accès retiré, le fichier est retiré des dossiers autorisant l'accès par l'organisation, et seuls le propriétaire et les personnes avec lesquelles il a été partagé peuvent le visualiser et l'utiliser.",
              REMOVE_USER: "Etes-vous sûr de vouloir arrêter le partage avec ${user} ? Si vous arrêtez le partage, ${user} pourra uniquement accéder à ce fichier via des dossiers ou s'il est partagé avec toutes les personnes de votre organisation.",
              REMOVE_COMMUNITY: "Etes-vous sûr de vouloir retirer ce fichier de la communauté ${communityName} ?",
              REMOVE_FOLDER: "Etes-vous sûr de vouloir retirer ce fichier du dossier ${folderName} ?",
              REMOVE_EVERYONE_TOOLTIP: "Retirer l'accès de votre organisation",
              REMOVE_USER_TOOLTIP: "Retirer tous les partages avec ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Retirer de la communauté ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Retirer du dossier ${folderName}",
              OK: "OK",
              CANCEL: "Annuler",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "Editer ce commentaire"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "Confirmation",
            PROMPT: "Etes-vous sûr de vouloir supprimer ce commentaire ?",
            ERROR: "Une erreur s'est produite lors de la suppression du commentaire. Réessayez ultérieurement.",
            TOOLTIP: "Supprimer ce commentaire",
            OK: "OK",
            CANCEL: "Annuler"
         },
         LIKE: {
            LIKE: "Recommander le fichier",
            UNLIKE: "Annuler la recommandation du fichier",
            LIKE_A11Y: "Ce bouton permet de recommander le fichier.",
            UNLIKE_A11Y: "Ce bouton permet de ne plus recommander le fichier.",
            LIKED_SUCCESS: "Vous avez recommandé ce fichier",
            UNLIKE_SUCCESS: "Vous avez annulé la recommandation de ce fichier"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "Editer la description",
            ERROR: {
               DEFAULT: "La description n'a pas pu être enregistrée. Réessayez ultérieurement.",
               UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter pour pouvoir mettre à jour la description.",
               NOT_FOUND: "La description n'a pas pu être enregistrée car le fichier a été supprimé ou n'est plus partagé avec vous.",
               ACCESS_DENIED: "La description n'a pas pu être enregistrée car le fichier a été supprimé ou n'est plus partagé avec vous."
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "Erreur lors de l'enregistrement du nom de fichier",
               CONFLICT: "Le nom de fichier existe déjà"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "Une erreur s'est produite lors du suivi de ce fichier. Réessayez ultérieurement.",
                  UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter à nouveau pour pouvoir suivre ce fichier.",
                  NOT_FOUND: "Vous ne pouvez pas suivre ce fichier car il a été supprimé ou n'est plus partagé avec vous.",
                  ACCESS_DENIED: "Vous ne pouvez pas suivre ce fichier car il a été supprimé ou n'est plus partagé avec vous."
               },
               UNFOLLOW: {
                  DEFAULT: "Une erreur s'est produite lors de l'arrêt du suivi de ce fichier. Réessayez ultérieurement.",
                  UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter à nouveau pour pouvoir arrêter le suivi de ce fichier.",
                  NOT_FOUND: "Vous ne pouvez pas arrêter de suivre ce fichier car il a été supprimé ou n'est plus partagé avec vous.",
                  ACCESS_DENIED: "Vous ne pouvez pas arrêter de suivre ce fichier car il a été supprimé ou n'est plus partagé avec vous."
               }
            },
            FOLLOW_NAME: "Suivre",
            FOLLOW_TOOLTIP: "Suivre ce fichier",
            FOLLOW_A11Y: "Ce bouton permet de suivre le fichier.",
            FOLLOW_SUCCESS: "Vous suivez maintenant ce fichier.",
            STOP_FOLLOWING_NAME: "Arrêter de suivre",
            STOP_FOLLOWING_TOOLTIP: "Arrêter de suivre ce fichier",
            STOP_FOLLOWING_A11Y: "Ce bouton permet d'arrêter de suivre le fichier.",
            STOP_FOLLOWING_SUCCESS: "Vous avez arrêté de suivre ce fichier."
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "Ajouter à la synchronisation",
               TOOLTIP: "Ajouter ce fichier à la synchronisation",
               A11Y: "Ce bouton permet d'ajouter le fichier à la synchronisation.",
               SUCCESS: "Vous avez ajouté ce fichier à la synchronisation.",
               ERROR: {
                  DEFAULT: "Une erreur s'est produite lors de l'ajout de ce fichier à la synchronisation. Réessayez ultérieurement.",
                  UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter à nouveau pour pouvoir ajouter ce fichier à la synchronisation.",
                  NOT_FOUND: "Vous ne pouvez pas ajouter ce fichier à la synchronisation car il a été supprimé ou n'est plus partagé avec vous.",
                  ACCESS_DENIED: "Vous ne pouvez pas ajouter ce fichier à la synchronisation car il a été supprimé ou n'est plus partagé avec vous."
               }
            },
            STOP_SYNC: {
               NAME: "Retirer de la synchronisation",
               TOOLTIP: "Retirer ce fichier de la synchronisation",
               A11Y: "Ce bouton permet de retirer le fichier de la synchronisation.",
               SUCCESS: "Vous avez retiré ce fichier de la synchronisation.",
               ERROR: {
                  DEFAULT: "Une erreur s'est produite lors du retrait de ce fichier de la synchronisation. Réessayez ultérieurement.",
                  UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter à nouveau pour pouvoir retirer ce fichier de la synchronisation.",
                  NOT_FOUND: "Vous ne pouvez pas retirer ce fichier de la synchronisation car il a été supprimé ou n'est plus partagé avec vous.",
                  ACCESS_DENIED: "Vous ne pouvez pas retirer ce fichier de la synchronisation car il a été supprimé ou n'est plus partagé avec vous."
               }
            },
            MYDRIVE: {
                NAME: "Ajouter à Mon unité",
                TOOLTIP: "Ajouter ce fichier à Mon unité",
                A11Y: "Ce bouton permet d'ajouter le fichier à Mon unité.",
                SUCCESS: "Vous avez ajouté ce fichier à Mon unité.",
                ERROR: {
                   DEFAULT: "Une erreur s'est produite lors de l'ajout de ce fichier à Mon unité. Réessayez ultérieurement.",
                   UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter à nouveau pour pouvoir ajouter ce fichier à Mon unité.",
                   NOT_FOUND: "Vous ne pouvez pas ajouter ce fichier à Mon unité car il a été supprimé ou n'est plus partagé avec vous.",
                   ACCESS_DENIED: "Vous ne pouvez pas ajouter ce fichier à Mon unité car il a été supprimé ou n'est plus partagé avec vous."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Retirer de Mon unité",
                TOOLTIP: "Retirer ce fichier de Mon unité",
                A11Y: "Ce bouton permet de retirer le fichier de Mon unité.",
                SUCCESS: "Vous avez retiré ce fichier de Mon unité.",
                ERROR: {
                   DEFAULT: "Une erreur s'est produite lors du retrait de ce fichier de Mon unité. Réessayez ultérieurement.",
                   UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter à nouveau pour pouvoir retirer ce fichier de Mon unité.",
                   NOT_FOUND: "Vous ne pouvez pas retirer ce fichier de Mon unité car il a été supprimé ou n'est plus partagé avec vous.",
                   ACCESS_DENIED: "Vous ne pouvez pas retirer ce fichier de Mon unité car il a été supprimé ou n'est plus partagé avec vous."
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "Epingler",
            FAVORITE_TOOLTIP: "Epingler ce fichier",
            FAVORITE_A11Y: "Ce bouton permet d'épingler le fichier.",
            FAVORITE_SUCCESS: "Vous avez épinglé ce fichier.",
            STOP_FAVORITEING_NAME: "Libérer",
            STOP_FAVORITEING_TOOLTIP: "Libérer ce fichier",
            STOP_FAVORITEING_A11Y: "Ce bouton permet de libérer le fichier.",
            STOP_FAVORITEING_SUCCESS: "Vous avez libéré ce fichier."
         },
         TRASH: {
            NAME: "Déplacer vers la corbeille",
            DIALOG_TITLE: "Confirmation",
            PROMPT: "Etes-vous sûr de vouloir déplacer ce fichier vers la corbeille ? Le déplacement de ce fichier vers la corbeille le rend indisponible pour toutes les personnes avec lesquelles il est actuellement partagé.",
            ERROR: "Une erreur s'est produite lors de la suppression du fichier. Réessayez ultérieurement.",
            TOOLTIP: "Supprimer ce fichier",
            OK: "OK",
            CANCEL: "Annuler",
            A11Y: "Ce bouton déplace le fichier vers la corbeille.",
            SUCCESS_MSG: "${file} a été placé dans la corbeille."
         },
         REFRESH: {
            NAME: "Actualiser",
            ERROR: "Une erreur s'est produite lors de l'actualisation du visualiseur de fichiers. Réessayez ultérieurement.",
            TOOLTIP: "Actualiser le visualiseur de fichiers",
            INFO_MSG: "Actualiser pour obtenir le contenu le plus récent. ${link}",
            A11Y: "Ce bouton déplace le fichier vers la corbeille.",
            SUCCESS_MSG: "Le contenu a été actualisé."
         },
         COPY_FILE: {
            NAME: "Fournir une copie à la communauté",
            DIALOG_TITLE: "Confirmation",
            ERROR: "Une erreur s'est produite lors de la copie du fichier. Réessayez ultérieurement.",
            TOOLTIP: "Fournir une copie de ce fichier à la communauté",
            OK: "OK",
            CANCEL: "Annuler",
            A11Y: "Ce bouton ouvre une boîte de dialogue qui vous permet de donner une copie d'un fichier à une communauté.",
            SUCCESS_MSG: "${file} a été copié dans ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Transférer la propriété...",
            DIALOG_TITLE: "Transférer la propriété",
            TOOLTIP: "Transférer ce fichier à un nouveau propriétaire",
            A11Y: "Ce bouton ouvre une boîte de dialogue qui vous permet de transférer ce fichier à un nouveau propriétaire.",
            EMPTY: "Vide"
         },
         UPLOAD_VERSION: {
            NAME: "Envoyer une nouvelle version par téléchargement",
            NAME_SHORT: "Envoyer par téléchargement",
            CHANGE_SUMMARY: "Récapitulatif facultatif des modifications...",
            TOOLTIP: "Télécharger une nouvelle version de ce fichier",
            A11Y: "Ce bouton ouvre une boîte de dialogue qui vous permet de télécharger une nouvelle version de ce fichier."
         },
         LOG_IN: {
            NAME: "Connexion",
            TOOLTIP: "Connectez-vous pour télécharger et partager des fichiers, rédiger des commentaires et créer des dossiers."
         },
         LOCK: {
            NAME: "Verrouiller le fichier",
            TITLE: "Verrouiller ce fichier",
            A11Y: "Verrouiller ce fichier",
            SUCCESS: "Le fichier est maintenant verrouillé.",
            ERROR: "Le fichier n'a pas pu être verrouillé car il a été supprimé ou n'est plus partagé avec vous."
         },
         UNLOCK: {
            NAME: "Déverrouiller le fichier",
            TITLE: "Déverrouiller ce fichier",
            A11Y: "Déverrouiller ce fichier",
            SUCCESS: "Le fichier est maintenant déverrouillé.",
            ERROR: "Le fichier n'a pas pu être déverrouillé car il a été supprimé ou n'est plus partagé avec vous."
         },
         EDIT_ON_DESKTOP: {
            NAME: "Editer sur le bureau",
            TITLE: "Editer sur le bureau",
            A11Y: "Editer sur le bureau"
         },
         FLAG: {
            FILE: {
               NAME: "Marquer comme inapproprié",
               TITLE: "Marquer un fichier",
               A11Y: "Marquer ce fichier comme étant inapproprié",
               PROMPT: "Fournir un motif pour le marquage de ce fichier (facultatif) :",
               OK: "Marquer",
               CANCEL: "Annuler",
               SUCCESS: "Le fichier a été marqué et soumis pour révision.",
               ERROR: "Erreur de marquage de ce fichier, réessayez plus tard."
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "Opération réussie",
               PROMPT: "Le fichier a été marqué et soumis pour révision.",
               CANCEL: "OK"
            },
            COMMENT: {
               NAME: "Marquer comme inapproprié",
               TITLE: "Marquer un commentaire",
               A11Y: "Marquer ce commentaire comme étant inapproprié",
               PROMPT: "Fournir un motif pour le marquage de ce commentaire (facultatif) :",
               OK: "Marquer",
               CANCEL: "Annuler",
               SUCCESS: "Le commentaire a été marqué et soumis pour révision.",
               ERROR: "Erreur de marquage de ce commentaire, réessayez plus tard."
            }
         },
         MODERATION: {
            DIALOG_TITLE: "Opération réussie",
            PROMPT: "Les modifications ont été soumises pour révision. Ce fichier ne sera pas disponible tant que les modifications n'auront pas été approuvées.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Bouton déroulant"
      },
      SECTION: {
         ABOUT: {
            NAME: "A propos de ce fichier",
            VIEW_FILE_DETAILS: "Afficher les détails du fichier",
            A11Y: "L'activation de ce lien fermera la visionneuse de fichiers et vous dirigera vers la page de détails du fichier pour ce fichier."
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "Aucun aperçu n'est disponible pour ce fichier."
         },
         IMAGE: {
            ZOOM_IN: "Zoom avant",
            ZOOM_OUT: "Zoom arrière",
            RESET: "Réinitialiser",
            ZOOM_IN_A11Y: "Ce bouton permet d'effectuer un zoom avant sur l'image.",
            ZOOM_OUT_A11Y: "Ce bouton permet d'effectuer un zoom arrière sur l'image.",
            RESET_ZOOM_A11Y: "Ce bouton permet de réinitialiser le niveau de zoom.",
            UNSAFE_PREVIEW: "Ce fichier ne peut pas être prévisualisé car il n'a pas été analysé pour vérifier l'absence de virus."
         },
         VIEWER: {
            LOADING: "Chargement...",
            PUBLISHING: "Publication...",
            NO_PUBLISHED_VERSION: "Il n'existe pas de version publiée de ce fichier pouvant être affichée.",
            IFRAME_TITLE: "Aperçu de ce fichier",
            AUTOPUBLISH_TIMEOUT: "Le serveur met trop de temps à répondre.  Les dernières modifications n'ont peut-être pas été publiées."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Ce fichier ne peut pas être prévisualisé car il n'a pas été analysé pour vérifier l'absence de virus."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Dernière mise à jour effectuée par ${user} aujourd'hui à ${time}",
            YESTERDAY: "Dernière mise à jour effectuée par ${user} hier à ${time}",
            DAY: "Dernière mise à jour effectuée par ${user} ${EEee} à ${time}",
            MONTH: "Dernière mise à jour effectuée par ${user} en ${date_long}",
            YEAR: "Dernière mise à jour effectuée par ${user} en ${date_long}"
         },
         CREATED: {
            TODAY: "Créé par ${user} aujourd'hui à ${time}",
            YESTERDAY: "Créé par ${user} hier à ${time}",
            DAY: "Créé par ${user} ${EEee} à ${time}",
            MONTH: "Créé par ${user} le ${date_long}",
            YEAR: "Créé par ${user} le ${date_long}"
         },
         LONG: {
            TODAY: "${EEEE}, ${date_long}, ${time_long}",
            YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
            DAY: "${EEEE}, ${date_long}, ${time_long}",
            MONTH: "${date_long}, ${time_long}",
            YEAR: "${date_long}, ${time_long}"
         },
         SHORT: {
            TODAY: "${time} - Aujourd'hui",
            YESTERDAY: "${time} - Hier",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "Aujourd'hui",
            YESTERDAY: "Hier",
            DAY: "${EEee}",
            MONTH: "${date_long}",
            YEAR: "${date_long}"
         }
      },
      FILE_SIZE: {
         B: "${0} o",
         KB: "${0} ko",
         MB: "${0} Mo",
         GB: "${0} Go",
         TB: "${0} To"
      },
      COMMENT_BOX: {
         TITLE: "Zone de texte de commentaire",
         SHADOW_TEXT: "Ajouter un commentaire...",
         CANNOT_ACCESS_CONTENT: "Les personnes suivantes ne peuvent pas voir le commentaire car elles n'ont pas accès au contenu :",
         ERROR: "Une erreur s'est produite lors de la validation de l'utilisateur que vous tentez de mentionner.",
         POST: "Poster",
         SAVE: "Enregistrer",
         CANCEL: "Annuler",
         EXTERNAL_WARNING: "Les commentaires peuvent être vus par des personnes externes à votre organisation."
      },
      EDIT_BOX: {
         SAVE: "Enregistrer",
         CANCEL: {
            TOOLTIP: "Annuler",
            A11Y: "Ce bouton annule l'action de modification du nom du fichier."
         },
         INVALID_CHARACTERS: "Caractère non valide",
         INVALID_CHARACTERS_REMOVED: "Caractères non valides retirés"
      },
      COMMENT_WIDGET: {
         EDITED: "(Edité)",
         EDITED_DATE: {
            TODAY: "Edité aujourd'hui à ${time}",
            YESTERDAY: "Edité hier à ${time}",
            DAY: "Edité le ${EEee} à ${time}",
            MONTH: "Edité le ${date_long}",
            YEAR: "Edité le ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Enregistrer",
         CANCEL: "Annuler",
         USER: "Personne",
         COMMUNITY: "Communauté",
         SHARE: "Partager",
         SHARE_ALT: "Partager avec cette personne",
         MEMBER_TYPE: "Type de membre",
         PERSON_SHADOW: "Saisissez le nom d'une personne à rechercher",
         COMMUNITY_SHADOW: "Saisissez le nom d'une communauté à rechercher",
         PERSON_ARIA: "Saisissez le nom d'une personne à rechercher.  Appuyez sur Maj + Tab pour passer d'une option à l'autre (personnes, communautés, tout le monde) dans l'organisation.",
         COMMUNITY_ARIA: "Saisissez le nom d'une communauté à rechercher.  Appuyez sur Maj + Tab pour passer d'une option à l'autre (personnes, communautés, tout le monde) dans l'organisation.",
         PERSON_FULL_SEARCH: "Personne non répertoriée ? Utilisez la recherche étendue...",
         COMMUNITY_FULL_SEARCH: "Communauté non répertoriée ? Utilisez la recherche étendue...",
         ADD_OPTIONAL_MESSAGE: "Ajouter un message facultatif",
         ROLE_LABEL: "Rôle",
         ROLE_EDIT: "Editeur",
         ROLE_VIEW: "Lecteur"
      },
      FILE_STATE: {
         DOCS_FILE: "Il s'agit d'un fichier Docs. Toutes les éditions doivent être effectuées en ligne.",
         LOCKED_BY_YOU: {
            TODAY: "Verrouillé par vous à ${time}.",
            YESTERDAY: "Verrouillé par vous hier à ${time}.",
            DAY: "Verrouillé par vous le ${date}.",
            MONTH: "Verrouillé par vous le ${date}.",
            YEAR: "Verrouillé par vous le ${date_long}."
         },
         LOCKED_BY_OTHER: {
            TODAY: "Verrouillé à ${time} par ${user}.",
            YESTERDAY: "Verrouillé hier à ${time} par ${user}.",
            DAY: "Verrouillé le ${date} par ${user}.",
            MONTH: "Verrouillé le ${date} par ${user}.",
            YEAR: "Verrouillé le ${date_long} par ${user}."
         }
      },
      VALIDATION: {
         A11Y_TEXT: "Raccourcir automatiquement ce texte",
         COMMENT: {
            WARN_TOO_LONG: "Le commentaire est trop long.",
            TRIM: "Raccourcir le commentaire ?"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "La description est trop longue.",
            TRIM: "Raccourcir la description ?"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "Le message est trop long.",
            TRIM: "Raccourcir le message ?"
         },
         TAG: {
            WARN_TOO_LONG: "L'étiquette est trop longue.",
            TRIM: "Raccourcir l'étiquette ?"
         },
         TAGS: {
            WARN_TOO_LONG: "Une ou plusieurs étiquettes sont trop longues.",
            TRIM: "Raccourcir les étiquettes ?"
         },
         FILENAME: {
            WARN_TOO_LONG: "Nom de fichier trop long"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "Ce fichier peut être édité en ligne par des personnes disposant d'HCL Docs.",
         NO_ENTITLEMENT_LINK: "Ce fichier peut être édité en ligne par des personnes disposant d'${startLink}HCL Docs${endLink}.", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Ce fichier est actuellement édité sur le Web par ${users}.",
         UNPUBLISHED_CHANGES: "Certaines modifications de ce brouillon n'ont pas été publiées en tant que version.",
         PUBLISH_A_VERSION: "Publier une version",
         PUBLISH_SUCCESS: "Vous avez publié une version de ce fichier",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "La version n'a pas pu être publiée car l'accès a été refusé.",
            NOT_FOUND: "La version n'a pas pu être publiée car le document n'a pas été trouvé.",
            CANNOT_REACH_REPOSITORY: "La version n'a pas pu être publiée car le serveur Docs ne peut pas se connecter au référentiel de fichiers.",
            QUOTA_VIOLATION: "La version n'a pas pu être publiée en raison de restrictions d'espace. Retirez d'autres fichiers afin de libérer suffisamment d'espace pour publier cette version.",
            CONVERSION_UNAVAILABLE: "La version n'a pas pu être publiée car le service de conversion Docs n'est pas disponible. Réessayez ultérieurement.",
            TOO_LARGE: "La version n'a pas pu être publiée car le document est trop volumineux.",
            CONVERSION_TIMEOUT: "La version n'a pas pu être publiée car la conversion du document par le service de conversion Docs prend trop de temps. Réessayez ultérieurement.",
            SERVER_BUSY: "La version n'a pas pu être publiée car le serveur Docs est occupé. Réessayez ultérieurement.",
            DEFAULT: "La version n'a pas pu être publiée car le service Docs n'est pas disponible. Réessayez ultérieurement."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "Vos éditions sont en cours de publication. ${startLink}Actualisez l'affichage pour voir vos modifications.${endLink}",
            GENERIC: "Vous devrez peut-être actualiser l'affichage de la page pour voir les dernières modifications.  ${startLink}Actualiser${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Il n'y a aucun commentaire.",
         MODERATED: "Le commentaire a été soumis pour révision et sera disponible une fois approuvé.",
         ERROR: {
            SAVE: {
               DEFAULT: "Impossible d'enregistrer votre commentaire. Réessayez ultérieurement.",
               UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter pour pouvoir enregistrer votre commentaire.",
               NOT_FOUND: "Impossible d'enregistrer votre commentaire car le fichier a été supprimé ou n'est plus partagé avec vous.",
               ACCESS_DENIED: "Impossible d'enregistrer votre commentaire car le fichier a été supprimé ou n'est plus partagé avec vous."
            },
            DELETE: {
               DEFAULT: "Impossible de supprimer votre commentaire. Réessayez ultérieurement.",
               UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter pour pouvoir supprimer votre commentaire.",
               NOT_FOUND: "Impossible de supprimer votre commentaire car le fichier a été supprimé ou n'est plus partagé avec vous.",
               ACCESS_DENIED: "Impossible de supprimer votre commentaire car le fichier a été supprimé ou n'est plus partagé avec vous."
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "Enregistrer",
         EDIT_TAGS: "Editer des étiquettes",
         ERROR: {
            SAVE: {
               DEFAULT: "Impossible de créer l'étiquette. Réessayez ultérieurement."
            },
            DELETE: {
               DEFAULT: "Impossible de supprimer l'étiquette. Réessayez ultérieurement."
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "En savoir plus...",
         READ_LESS: "En savoir moins..."
      },
      SHARE: {
         EVERYONE: "Tout le monde dans mon organisation",
         ADD_TOOLTIP: "Enregistrer",
         ROLES: {
            OWNER: "Propriétaire",
            EDIT: "Editeurs",
            VIEW: "Lecteurs",
            FOLDER: "Partagé avec des dossiers"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "Propriétaire"
            },
            EDIT: {
               ROLE: "Editer",
               ADD: "Ajouter un éditeur"
            },
            VIEW: {
               ROLE: "Lecteur",
               ADD: "Ajouter un lecteur"
            },
            FOLDER: {
               ADD: "Ajouter des dossiers",
               COMMUNITY_ADD: "Ajouter à un dossier",
               MOVE: "Déplacer vers un dossier"
            },
            MULTI: {
               ADD: "Ajouter des personnes ou des communautés",
               ADD_PEOPLE: "Ajouter des personnes"
            }
         },
         PUBLIC: {
            SHORT: "Tout le monde dans mon organisation",
            LONG: {
               GENERIC: "Tout le monde dans votre organisation",
               ORG: "Tout le monde dans ${org}"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "Ce fichier est déjà partagé avec ${user}.",
            ERROR: "Impossible de partager avec ${user} pour l'instant.",
            SELF: "Vous ne pouvez pas partager avec vous-même."
         },
         SHARE_INFO: {
            PROMOTED: "${user} a été promu à un rôle de partage supérieur."
         },
         SHARE_SUCCESS: {
            SUCCESS: "Partage réussi avec ${user}"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "Le fichier a été partagé."
         },
         MESSAGE_BOX: {
            HINT_TEXT: "Message facultatif..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "Affecter un utilisateur externe",
               ACTION: "Affecter un utilisateur externe...",
               TOOLTIP: "Affecter un utilisateur externe",
               DIALOG_TITLE: "Le contenu n'était pas partagé",
               PROMPT: {
                  NO_ACCOUNT: "L'utilisateur suivant n'a pas de compte et aucun contenu n'a été partagé avec lui.",
                  INVITE: "Proposer à cet utilisateur de partager un contenu avec lui, en tant qu'invité."
               },
               SUBMIT: "Procéder à l'invitation",
               CANCEL: "Annuler",
               ERROR: "Une erreur s'est produite lors de la mise à disposition du compte. Réessayez ultérieurement.",
               SUCCESS: "La mise à disposition du compte utilisateur a été effectuée."
            },
            PLURAL: {
               NAME: "Affecter des utilisateurs externes",
               ACTION: "Affecter des utilisateurs externes...",
               TOOLTIP: "Affecter des utilisateurs externes",
               DIALOG_TITLE: "Le contenu n'était pas partagé",
               PROMPT: {
                  NO_ACCOUNT: "Les utilisateurs suivants n'ont pas de compte et aucun contenu n'a été partagé avec eux.",
                  INVITE: "Proposer à ces utilisateurs de partager un contenu avec eux, en tant qu'invités"
               },
               SUBMIT: "Procéder aux invitations",
               CANCEL: "Annuler",
               ERROR: "Une erreur s'est produite lors de la mise à disposition des comptes. Réessayez ultérieurement.",
               SUCCESS: "La mise à disposition des comptes utilisateur a été effectuée."
            },
            ABSTRACT: {
               NAME: "Affecter des utilisateurs externes",
               ACTION: "Affecter des utilisateurs externes...",
               TOOLTIP: "Affecter des utilisateurs externes",
               DIALOG_TITLE: "Le contenu n'était pas partagé",
               PROMPT: {
                  NO_ACCOUNT: "Certains utilisateurs n'ont pas de compte et aucun contenu n'a été partagé avec eux.",
                  INVITE: "Proposer à ces utilisateurs de partager un contenu avec eux, en tant qu'invités"
               },
               SUBMIT: "Procéder aux invitations",
               CANCEL: "Annuler",
               ERROR: "Une erreur s'est produite lors de la mise à disposition des comptes. Réessayez ultérieurement.",
               SUCCESS: "La mise à disposition des comptes utilisateur a été effectuée."
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "Options de partage",
         PROPAGATION: "Autoriser les autres à partager ce fichier",
         EVERYONE: "Tout le monde peut partager ce fichier.",
         OWNER_ONLY: "Seul le propriétaire peut partager ce fichier.",
         STOP_SHARE: "Arrêter le partage",
         MAKE_INTERNAL: "Arrêter le partage en externe",
         MAKE_INTERNAL_SUCCESS: "Ce fichier ne peut plus être partagé avec des personnes extérieures à votre organisation.",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "Rendre interne ?",
            PROMPT: "Si vous faites de ce fichier un fichier interne, il ne peut plus être partagé avec des personnes extérieures à votre organisation. ${br}${br}" +
            "Tout partage avec des dossiers, des communautés ou des personnes externes sera retiré.${br}${br}Cette transformation en fichier interne est permanente et ne peut pas être annulée.",
            EFSS: {
               DIALOG_TITLE: "Rendre interne ?",
               PROMPT: "Si vous faites de ce fichier un fichier interne, il ne peut plus être partagé avec des personnes extérieures à votre organisation. ${br}${br}" +
               "Tout partage avec des dossiers ou des personnes externes sera retiré.${br}${br}Cette transformation en fichier interne est permanente et ne peut pas être annulée."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Arrêter le partage de fichier",
            PROMPT: "Etes-vous sûr de vouloir arrêter le partage de ce fichier ?",
            QUESTION_PUBLIC: "Ce fichier ne sera plus visible par toutes les personnes de votre organisation ni partagé avec des personnes, des dossiers ou des communautés. Cette opération ne peut pas être annulée.",
            QUESTION_PUBLIC_E: "Ce fichier ne sera plus visible par toutes les personnes de votre organisation ni partagé avec des personnes ou des dossiers. Cette opération ne peut pas être annulée.",
            QUESTION: "Le fichier ne sera plus partagé avec des personnes ou des communautés et sera retiré de tous les dossiers à l'exception de vos dossiers privés. Cette opération ne peut pas être annulée.",
            QUESTION_E: "Ce fichier ne sera plus partagé avec d'autres personnes et sera retiré de tous les dossiers à l'exception de vos dossiers privés. Cette opération ne peut pas être annulée."
         },
         MAKE_PRIVATE_SUCCESS: "Ce fichier est désormais privé.",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "Impossible d'arrêter le partage du fichier. Réessayez ultérieurement."
         }
      },
      SHARE_LINK: {
         MY_SHARES: "Mes partages"
      },
      STREAM: {
         LOADING: "Chargement...",
         LOAD_MORE: "Charger plus..."
      },
      ENTRY: {
         REMOVE: "Retirer",
         RESTORE: "Restaurer",
         EDIT: "Editer",
         DELETE: "Supprimer",
         OK: "OK",
         CANCEL: "Annuler",
         USER_PICTURE: "Image de ${0}",
         FLAG: "Marquer comme inapproprié"
      },
      PANEL: {
         LOAD_ERROR: "Une erreur s'est produite lors de l'accès aux métadonnées de ce fichier.",
         ABOUT: {
            TITLE: "A propos de",
            EXPAND_BUTTON: "Développer ce bouton pour voir plus d'informations",
            CURRENT_VERSION_HEADER: "Version en cours ${versionNumber}",
            FILE_SIZE_HEADER: "Taille du fichier",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Version en cours",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Toutes les versions",
            DOCS_DRAFT_UPDATED_HEADER: "Brouillon édité",
            DOCS_DRAFT_CREATED_HEADER: "Brouillon créé",
            DOCS_UPDATED_HEADER: "Publiée",
            DOCS_CREATED_HEADER: "Créé",
            UPDATED_HEADER: "Mises à jour",
            CREATED_HEADER: "Créé",
            LIKES_HEADER: "Recommandations",
            LIKES_EXPAND_ICON: "Cette icône vous permet de voir qui a recommandé le fichier",
            DOWNLOADS_HEADER: "Vues",
            DOWNLOADS_HEADER_MORE: "Vues (${0})",
            DOWNLOADS_EXPAND_ICON: "Cette icône vous permet de voir qui a affiché le fichier",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonymes",
            DOWNLOADS_LATEST_VERSION: "Vous disposez de la dernière version de ce fichier",
            DOWNLOADS_LAST_VERSION: "Vous avez affiché la version ${0} de ce fichier en dernier",
            TAGS_HEADER: "Etiquettes",
            DESCRIPTION_HEADER: "Description",
            DESCRIPTION_READ_MORE: "En savoir plus...",
            LINKS_HEADER: "Liens",
            SECURITY: "Sécurité",
            FILE_ENCRYPTED: "Le contenu du fichier est chiffré. Aucune recherche n'est possible sur un contenu de fichier chiffré. Le contenu du fichier ne peut être ni lu, ni édité avec HCL Docs.",
            GET_LINKS: "Obtenir des liens...",
            ADD_DESCRIPTION: "Ajouter une description",
            NO_DESCRIPTION: "Aucune description",
            ADD_TAGS: "Ajouter des étiquettes",
            NO_TAGS: "Aucune étiquette"
         },
         COMMENTS: {
            TITLE: "Commentaires",
            TITLE_WITH_COUNT: "Commentaires (${0})",
            VERSION: "Version ${0}",
            FEED_LINK: "Flux pour ces commentaires",
            FEED_TITLE: "Suivez les modifications de ces commentaires via votre programme de lecture de flux"
         },
         SHARING: {
            TITLE: "Partage",
            TITLE_WITH_COUNT: "Partagé (${0})",
            SHARED_WITH_FOLDERS: "Partagé avec des dossiers - ${count}",
            SEE_WHO_HAS_SHARED: "Voir qui a partagé",
            COMMUNITY_FILE: "Les fichiers appartenant à une communauté ne peuvent pas être partagés avec des personnes ou d'autres communautés.",
            SHARED_WITH_COMMUNITY: "Partagé avec les membres de la communauté ${0}",
            LOGIN: "Connexion",
            NO_SHARE: "Ce fichier n'a pas encore été ajouté à un dossier.",
            ONE_SHARE: "Ce fichier figure dans 1 dossier ou communauté auxquels vous n'avez pas accès.",
            MULTIPLE_SHARE: "Ce fichier figure dans les dossiers ou les communautés ${fileNumber} auxquels vous n'avez pas accès."
         },
         VERSIONS: {
            TITLE: "Versions",
            TITLE_WITH_COUNT: "Versions (${0})",
            FEED_LINK: "Flux pour ces versions",
            FEED_TITLE: "Suivez les modifications apportées à ce fichier via votre programme de lecture de flux."
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "Confirmation d'action",
         DIALOG_TITLE: "Confirmation",
         PROMPT: "Voulez-vous vraiment exécuter cette action ?",
         ERROR: "Une erreur s'est produite lors de l'exécution de l'action. Réessayez ultérieurement.",
         TOOLTIP: "Exécuter l'action",
         OK: "OK",
         CANCEL: "Annuler",
         A11Y: "Ce bouton permet d'exécuter l'action actuelle."
      },
      THUMBNAIL: {
         TITLE: "Miniature",
         CHANGE_LINK: "Changer de miniature...",
         ERROR: "La miniature n'a pas pu être enregistrée. Réessayez ultérieurement.",
         EXT_ERROR: "Sélectionnez un fichier avec l'une des extensions prises en charge suivantes : ${0}",
         SUCCESS: "La miniature a été modifiée",
         UPLOAD: "Enregistrer",
         CANCEL: "Annuler"
      },
      UPLOAD_VERSION: {
         LINK: "Envoyer une nouvelle version par téléchargement...",
         CHANGE_SUMMARY: "Récapitulatif facultatif des modifications...",
         ERROR: "La nouvelle version n'a pas pu être enregistrée. Réessayez ultérieurement.",
         SUCCESS: "La nouvelle version a été enregistrée",
         UPLOAD: "Envoyer par téléchargement",
         UPLOAD_AND_CHANGE_EXTENSION: "Envoyer par téléchargement et changer d'extension",
         CANCEL: "Annuler",
         TOO_LARGE: "La taille du fichier ${file} dépasse la taille autorisée (${size}).",
         PROGRESS_BAR_TITLE: "Envoi par téléchargement de la nouvelle version (${uploaded} sur ${total} effectué)",
         CANCEL_UPLOAD: "Annuler l'envoi par téléchargement"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Une erreur s'est produite lors de l'accès au fichier. Réessayez ultérieurement.",
         UNAUTHENTICATED: "Votre session a expiré. Vous devez vous connecter à nouveau pour pouvoir afficher le fichier.",
         NOT_FOUND: "Le fichier que vous avez demandé a été supprimé ou déplacé. Si quelqu'un vous a envoyé ce lien, vérifiez qu'il est correct.",
         ACCESS_DENIED: "Vous n'êtes pas autorisé à afficher ce fichier. Le fichier n'est pas partagé avec vous.",
         ACCESS_DENIED_ANON: "Vous n'êtes pas autorisé à afficher ce fichier. S'il s'agit de votre fichier ou s'il a été partagé avec vous, vous devez d'abord vous connecter."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Erreur",
         PROMPT: "Le fichier que vous avez demandé a été supprimé ou déplacé.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Confirmation",
        PROMPT: "Votre session HCL Connections est arrivée à expiration.${lineBreaks}Cliquez sur OK pour vous reconnecter ou sur Annuler pour fermer cette boîte de dialogue.",
        OK: "OK",
        CANCEL: "Annuler"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Accès au lien impossible",
        PROMPT: "Une erreur s'est produite au moment de l'accès au lien.${lineBreaks}Cliquez sur OK pour être redirigé vers la page.",
        OK: "OK",
        CANCEL: "Annuler"
      },
      LOAD_ERROR: {
         DEFAULT: "Désolé. Une erreur s'est produite lors de l'accès au lien.",
         ACCESS_DENIED: "Contactez le propriétaire du fichier pour lui demander l'autorisation d'afficher ce fichier."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Fichier",
         LOAD_ERROR: "Erreur lors de l'accès au fichier"
      },
      SHARE_WITH_LINK: {
         TITLE: "Partager par lien",
         EMPTY_DESCRIPTION: "Vous n'avez pas encore créé de lien pour ce fichier. Créez un lien partagé à envoyer aux autres pour qu'ils puissent prévisualiser et télécharger le fichier.",
         CREATE_LINK: "Créer un lien",
         COPY_LINK: "Copier le lien",
         DELETE_LINK: "Supprimer le lien",
         ACCESS_TYPE_1: "Toute personne disposant du lien peut visualiser ce fichier",
         ACCESS_TYPE_2: "Les personnes de mon organisation peuvent visualiser ce fichier",
         ACCESS_TYPE_1_DESCRIPTION: "Une fois connectées à Connections, les personnes recevant le lien peuvent prévisualiser et télécharger ce fichier.",
         ACCESS_TYPE_2_DESCRIPTION: "Une fois connectées à Connections, les personnes de mon organisation recevant le lien peuvent prévisualiser et télécharger ce fichier.",
         CHANGE_TYPE_SUCCESS: "Les droits associés au lien ont été mis à jour lorsque le type d'accès a été changé.",
         CHANGE_TYPE_ERROR: "Les mises à jour des droits associés au lien ont échoué lorsque le type d'accès a été changé.",
         COPY_LINK_SUCCESS: "Lien copié dans le presse-papiers",
         CREATE_SHARELINK_SUCCESS:"Le lien a été créé.",
         CREATE_SHARELINK_ERROR:"Impossible de créer un lien en raison d'une erreur.",
         DELETE_SHARELINK_SUCCESS: "Le lien partagé pour \"${file}\" a été supprimé.",
         DELETE_SHARELINK_ERROR: "Le lien partagé n'a pas été supprimé. Réessayez ultérieurement.",
         CONFIRM_DIALOG: {
            OK: "Supprimer",
            DIALOG_TITLE: "Supprimer le lien partagé",
            PROMPT: "Les personnes disposant du lien ne pourront plus accéder à ce fichier. Etes-vous sûr de vouloir supprimer le lien partagé ?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "Le lien partagé est actif. Toute personne disposant du lien peut visualiser ce fichier. Cliquez pour copier ce lien.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "Le lien partagé est actif. Les personnes de mon organisation peuvent visualiser ce fichier. Cliquez pour copier ce lien."
      }
});
