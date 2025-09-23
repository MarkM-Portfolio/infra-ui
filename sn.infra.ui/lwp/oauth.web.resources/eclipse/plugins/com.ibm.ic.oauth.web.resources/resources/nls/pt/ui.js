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
         "legal" : "Materiais licenciados - Propriedade da IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. IBM, o logótipo IBM, ibm.com e Lotus são marcas comerciais da IBM Corporation nos Estados Unidos e/ou noutros países. U.S. Government Users Restricted Rights: Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp. Please see the About page for further information.",
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "granted" : {
            "title" : "Acesso concedido",
            "blurb" : "Conceder acesso a ${0} para interagir com a sua conta do HCL Connections."
         },
         "denied" : {
            "title" : "Acesso recusado",
            "blurb" : "Recusou o acesso a ${0} para interagir com a sua conta do HCL Connections."
         },
         "blurb" : "{0} está a pedir acesso ao à sua informação do HCL Connections, incluindo todo o seu conteúdo no Connections.",
         "revoke" : {
            "description" : "Pode revogar o acesso a qualquer altura através das Definições do Connections > {0}. O Connections pode pedir-lhe periodicamente para voltar a autorizar.",
            "link" : "Acesso de aplicações"
         },
         "authorize" : {
            "label" : "Conceder acesso"
         },
         "windowtitle" : "Autorizar acesso ao HCL Connections",
         "title" : "Pedido de Acesso",
         "deny" : {
            "label" : "Recusar acesso"
         },
         "action_tooltip" : "Conceder acesso à aplicação ${0}",
         "action" : "Conceder acesso",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "A redireccionar novamente para ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Activar JavaScript",
            "p2" : "Actualize a página para continuar.",
            "p1" : "O JavaScript foi desactivado no navegador da Web.  O HCL Connections requer JavaScript para funcionar.  Após a activação do mesmo, actualize a página."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Não é possível processar o seu pedido",
            "description" : "O pedido emitido pela aplicação que está a solicitar acesso à sua conta do HCL Connections estava incompleto.  Faça clique no botão Retroceder do navegador para regressar ao sítio ou aplicação de origem e tente novamente.  Se este erro persistir, relate o problema ao administrador."
         },
         "invalid_token" : {
            "title" : "Não é possível processar o seu pedido",
            "description" : "O pedido emitido pela aplicação que está a solicitar acesso à sua conta do HCL Connections não era válido.  Faça clique no botão Retroceder do navegador para regressar ao sítio ou aplicação de origem e tente novamente.  Se este erro persistir, relate o problema ao administrador."
         },
         "default_action" : {
            "label" : "Regressar à Página inicial"
         }
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
      "loading" : "A carregar...",
      "deny" : {
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "action_tooltip" : "Recusar o acesso à aplicação ${0}",
         "action" : "Recusar acesso",
         "success" : "O acesso foi recusado."
      },
      "grid" : {
         "applications" : {
            "summary" : "Lista de aplicações com acesso às informações do HCL Connections.",
            "loading" : "A carregar...",
            "empty" : "Não foram localizadas aplicações.",
            "reverse_sort" : "Inverter ordem"
         }
      },
      "applications" : {
         "windowtitle" : "Acesso de aplicações",
         "details" : "As aplicações com acesso às suas informações do HCL Connections.",
         "error" : "A lista não foi obtida devido a um erro.",
         "titlebar" : {
            "tab2" : "Acesso de aplicações",
            "tab1" : "Notificações por correio electrónico",
            "tab3" : "Globalização"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Ao premir este botão, a página actual é actualizada com conteúdo novo.  Para regressar a este menu, navegue novamente para:"
         },
         "a11y" : {
            "titlebar_label" : "Definições do HCL Connections"
         },
         "heading" : "Acesso de aplicações"
      },
      "sorts" : {
         "application_name" : "Nome da aplicação",
         "authorization_date" : "Data da autorização",
         "expiration_date" : "Data de validade",
         "action" : "Acção"
      },
      "revoke_token" : {
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "dialog_title" : "Revogar acesso",
         "action_tooltip" : "Revogar o acesso à aplicação ${0}",
         "action" : "Revogar",
         "ok" : "OK",
         "cancel" : "Cancelar",
         "confirm" : "Revogar o acesso desta aplicação à informação do seu HCL Connections? ",
         "success" : "A aplicação foi removida."
      }
});
