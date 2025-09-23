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
         "legal" : "Materiais Licenciados \u2013 Propriedade da HCL. \u00a9 Copyright HCL Technologies Limited 2007-2019. Todos os direitos reservados. Consulte a licen\u00e7a do produto para obter detalhes. Java e todas as marcas baseadas em Java e logotipos s\u00e3o marcas comerciais ou marcas registradas da Oracle e/ou suas afiliadas.",
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "granted" : {
            "title" : "Acesso Concedido",
            "blurb" : "Você concedeu acesso a ${0} para interagir com a conta do HCL Connections."
         },
         "denied" : {
            "title" : "Acesso Negado",
            "blurb" : "Você negou acesso a ${0} para interagir com sua conta do HCL Connections."
         },
         "blurb" : "{0} está solicitando acesso às informações do HCL Connections, incluindo todo o seu conteúdo no Connections.",
         "revoke" : {
            "description" : "É possível revogar o acesso a qualquer momento por meio de Configurações do Connections > {0}. O Connections pode, periodicamente, pedir que você reautorize.",
            "link" : "Acesso ao Aplicativo"
         },
         "authorize" : {
            "label" : "Conceder Acesso"
         },
         "windowtitle" : "Autorizar acesso ao HCL Connections",
         "title" : "Solicitação de Acesso",
         "deny" : {
            "label" : "Negar Acesso"
         },
         "action_tooltip" : "Conceder acesso ao aplicativo ${0}",
         "action" : "Conceder Acesso",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "Redirecionando de volta a ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "Ative o JavaScript",
            "p2" : "Atualize a página para continuar.",
            "p1" : "O JavaScript foi desativado no navegador da Web.  O HCL Connections exige JavaScript para que funcione.  Após ativá-lo, atualize a página."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "Não é possível processar sua solicitação",
            "description" : "A solicitação emitida pelo aplicativo que está solicitando acesso a sua conta do HCL Connections estava incompleta.  Clique no botão Voltar do navegador para retornar ao site ou aplicativo que trouxe você aqui e tente novamente.  Se este erro persistir, relate o problema ao administrador."
         },
         "invalid_token" : {
            "title" : "Não é possível processar sua solicitação",
            "description" : "A solicitação emitida pelo aplicativo que está solicitando acesso a sua conta do HCL Connections era inválida.  Clique no botão Voltar do navegador para retornar ao site ou aplicativo que trouxe você aqui e tente novamente.  Se este erro persistir, relate o problema ao administrador."
         },
         "default_action" : {
            "label" : "Retornar para a Página Inicial"
         }
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
      "loading" : "Carregando...",
      "deny" : {
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "action_tooltip" : "Negar acesso ao aplicativo ${0}",
         "action" : "Negar Acesso",
         "success" : "O acesso foi negado."
      },
      "grid" : {
         "applications" : {
            "summary" : "Lista de aplicativos com acesso às informações do HCL Connections.",
            "loading" : "Carregando...",
            "empty" : "Nenhum aplicativo localizado.",
            "reverse_sort" : "Inverter Classificação"
         }
      },
      "applications" : {
         "windowtitle" : "Acesso ao Aplicativo",
         "details" : "Aplicativos com acesso às informações do HCL Connections.",
         "error" : "A lista não foi recuperada devido a um erro.",
         "titlebar" : {
            "tab2" : "Acesso ao Aplicativo",
            "tab1" : "Notificações de E-mail",
            "tab3" : "Globalização"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "Pressionar esse botão atualiza a página atual com o novo conteúdo.  Para retornar a este menu, navegue de volta para:"
         },
         "a11y" : {
            "titlebar_label" : "Configurações do HCL Connections"
         },
         "heading" : "Acesso ao Aplicativo"
      },
      "sorts" : {
         "application_name" : "Nome do Aplicativo",
         "authorization_date" : "Data de Autorização",
         "expiration_date" : "Data de Expiração",
         "action" : "Ação"
      },
      "revoke_token" : {
         "error" : "Ocorreu um erro. Tente novamente mais tarde.",
         "dialog_title" : "Revogar Acesso",
         "action_tooltip" : "Revogar o acesso ao aplicativo ${0}",
         "action" : "Revogar",
         "ok" : "OK",
         "cancel" : "Cancelar",
         "confirm" : "Revogar o acesso desse aplicativo às informações do HCL Connections? ",
         "success" : "O aplicativo foi removido."
      }
});
