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
         "unavailable" : "As configurações de globalização não estão disponíveis",
         "details" : "Especifique seu idioma preferencial, qual calendário você prefere e a direção em que o texto gerado pelo usuário flui.",
         "error" : "As configurações de globalização não foram recuperadas devido a um erro.",
         "titlebar" : {
            "tab2" : "Acesso ao Aplicativo",
            "tab1" : "Notificações de E-mail",
            "tab3" : "Globalização"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Pressionar este botão atualiza a página atual com conteúdo novo.  Para retornar a este menu, navegue de volta para:"
         },
         "details_nolanguage" : "Especifique qual calendário você prefere e a direção em que o texto gerado pelo usuário flui.",
         "a11y" : {
            "titlebar_label" : "Configurações do HCL Connections",
            "body_label" : "Configurações de globalização"
         },
         "heading" : "Configurações de Globalização"
      },
      "restore_defaults" : {
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "action_tooltip" : "Restaurar configurações de globalização para seus valores padrão originais",
         "action" : "Restaurar Padrões",
         "success" : "As configurações de globalização foram restauradas para seus valores padrão originais."
      },
      "help" : {
         "help" : "Ajuda",
         "close" : "Fechar"
      },
      "save" : {
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "action_tooltip" : "Salvar configurações de globalização",
         "action" : "Salvar",
         "success" : "As configurações de globalização foram atualizadas."
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "Erro:",
            "icon_alt" : "Erro"
         },
         "success" : {
            "a11y_label" : "Sucesso:",
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
            "label" : "Restaurar Padrões"
         },
         "bidi" : {
            "help" : "Ativar ajuda de texto bidirecional",
            "label" : "Ativar texto bidirecional",
            "tooltip" : "Permite a exibição específica do idioma do texto concatenado e do texto estruturado, tais como caminhos de arquivos.  Também permite que você especifique uma direção do texto, independente de sua seleção de idioma."
         },
         "error" : "Erro",
         "save" : {
            "label" : "Salvar"
         },
         "direction" : {
            "label" : "Direção do texto gerado pelo usuário:",
            "tooltip" : "A direção do texto derivada da entrada do usuário, tais como nomes de conteúdo e trilhas de navegação.  Por padrão, isto é determinado por sua seleção de idioma (esquerda para a direita para a maioria).  A escolha de contextual permite que o sistema determine a direção com base na análise de caracteres (suporta texto com direção mista).",
            "options" : {
               "contextual" : "Contextual (baseado em caracteres)",
               "rtl" : "Direita para a esquerda",
               "ltr" : "Esquerda para a direita",
               "default_ltr" : "Usar padrão de idioma (esquerda para a direita)",
               "default_rtl" : "Usar padrão de idioma (direita para a esquerda)"
            }
         },
         "cancel" : {
            "label" : "Cancelar"
         },
         "language" : {
            "selected" : "${0} (atual)",
            "label" : "Idioma:",
            "tooltip" : "Especifique o idioma no qual o texto do aplicativo será exibido.  Esta configuração não afetará o texto gerado pelo usuário."
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
