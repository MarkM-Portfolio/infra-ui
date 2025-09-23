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
         "windowtitle" : "Globalização",
         "unavailable" : "As definições de globalização não estão disponíveis",
         "details" : "Especifique o seu idioma preferido, a agenda preferida e a direcção dos fluxos de texto gerados pelo utilizador.",
         "error" : "As definições de globalização não foram obtidas devido a um erro.",
         "titlebar" : {
            "tab2" : "Acesso de aplicações",
            "tab1" : "Notificações por correio electrónico",
            "tab3" : "Globalização"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Ao premir este botão, a página actual é actualizada com conteúdo novo.  Para regressar a este menu, navegue novamente para:"
         },
         "details_nolanguage" : "Especifique a agenda preferida e a direcção dos fluxos de texto gerados pelo utilizador.",
         "a11y" : {
            "titlebar_label" : "Definições do HCL Connections",
            "body_label" : "Definições de globalização"
         },
         "heading" : "Definições de globalização"
      },
      "restore_defaults" : {
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "action_tooltip" : "Restaurar as definições de globalização para os valores predefinidos de origem",
         "action" : "Restaurar predefinições",
         "success" : "As definições de globalização foram restauradas para os valores predefinidos de origem."
      },
      "help" : {
         "help" : "Ajuda",
         "close" : "Fechar"
      },
      "save" : {
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "action_tooltip" : "Guardar definições de globalização",
         "action" : "Guardar",
         "success" : "As definições de globalização foram actualizadas."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Erro:",
            "icon_alt" : "Erro"
         },
         "success" : {
            "a11y_label" : "Êxito:",
            "icon_alt" : "Êxito"
         },
         "warning" : {
            "a11y_label" : "Aviso:",
            "icon_alt" : "Aviso"
         },
         "info" : {
            "a11y_label" : "Informações:",
            "icon_alt" : "Informações"
         }
      },
      "preferences" : {
         "restore_defaults" : {
            "label" : "Restaurar predefinições"
         },
         "bidi" : {
            "help" : "Activar a Ajuda do texto bidireccional",
            "label" : "Activar o texto bidireccional",
            "tooltip" : "Permite a apresentação de texto concatenado e texto estruturado, como caminhos de ficheiros, em idiomas específicos.  Permite ainda especificar uma direcção de texto independentemente da selecção de idioma."
         },
         "error" : "Erro",
         "save" : {
            "label" : "Guardar"
         },
         "direction" : {
            "label" : "Direcção do texto criado pelo utilizador:",
            "tooltip" : "A direcção do texto a partir da introdução de dados do utilizador, como os nomes de conteúdo e o percurso de navegação.  Por predefinição, isto é determinado pela selecção de idioma (esquerda para a direita, para a maioria).  A opção de contextual permite que o sistema determine a direcção com base na análise de caracteres (suporta texto multi-direccional).",
            "options" : {
               "contextual" : "Contextual (com base em caracteres)",
               "rtl" : "Direita para a esquerda",
               "ltr" : "Esquerda para a direita",
               "default_ltr" : "Utilizar predefinição de idioma (esquerda para a direita)",
               "default_rtl" : "Utilizar predefinição de idioma (direita para a esquerda)"
            }
         },
         "cancel" : {
            "label" : "Cancelar"
         },
         "language" : {
            "selected" : "${0} (actual)",
            "label" : "Idioma:",
            "tooltip" : "Especifique o idioma em que o texto da aplicação será apresentado.  Esta definição não afectará o texto gerado pelo utilizador."
         },
         "calendar" : {
            "label" : "Calendário:",
            "options" : {
               "hebrew" : "Hebraico",
               "gregorian" : "Gregoriano",
               "hijri" : "Hijri"
            }
         }
      }
});
