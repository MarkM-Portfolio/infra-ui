/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2008, 2016                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

// NLS_CHARSET=UTF-8
({
   submit: {label: "Guardar", a11y: "Guardar", tooltip: "Guardar"}, 
   cancel: {label: "Cancelar", a11y: "Cancelar", tooltip: "Cancelar"},
   close: {label: "Fechar", a11y: "Fechar", tooltip: "Fechar"},
   title: {global: "Partilhar algo", community: "Partilhar com uma comunidade"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "As acções de partilha não estão disponíveis para este cenário.",
	   ACTIONS_LOAD_ERROR: "Ocorreu um erro ao carregar as acções de partilha.",
	   CONTENT_LOAD_ERROR: "Não é possível carregar o conteúdo. Tente novamente mais tarde ou contacte o administrador do sistema."},
   MESSAGE: {
	      SUCCESS: "Confirmação",
	      ERROR: "Erro",
	      ERROR_ALT_TEXT: "Erro:",
	      INFO: "Informações",
	      WARNING: "Aviso",
	      DISMISS: "Ocultar esta mensagem",
	      MORE_DETAILS: "Mais detalhes",
	      HIDE_DETAILS: "Ocultar detalhes"
	   },
   COMMUNITYUPLOADFILE: {
	   SHARE: "Partilhar",
	   UPLOAD: "Transferir",
	   CANCEL: "Cancelar",
	   VISIBILITY_WARNING: "Os ficheiros partilhados com esta comunidade serão tornados públicos.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "Partilhou ${0} com ${1} com êxito.",
		   SUCCESS_PLURAL: "Partilhou ${0} ficheiros com ${1} com êxito.",
		   ERROR: "Não foi possível partilhar o ficheiro.  Tente novamente mais tarde.",
		   ERROR_X: "Não foi possível partilhar os ficheiros.  Tente novamente mais tarde.",
           MAX_SHARES_ERROR: "O número máximo de partilhas foi excedido.",
           EXTERNAL_SHARES_ERROR: "O ficheiro apenas pode ser partilhado com pessoas que pertencem à organização.",
           EXTERNAL_SHARES_ERROR_X: "É apenas possível partilhar os ficheiros na sua organização.",
           NOT_LOGGED_IN_ERROR: "O ficheiro não foi partilhado, uma vez que não iniciou sessão.  Faça clique em 'Partilhar' para partilhar o ficheiro.",
           NOT_LOGGED_IN_ERROR_X: "Os ficheiros não foram partilhados, uma vez que não iniciou sessão.  Faça clique em 'Partilhar' para partilhar os ficheiros.",
           TIMEOUT_ERROR: "O ficheiro não foi partilhado, uma vez que não foi possível contactar o servidor.  Faça clique em 'Partilhar' para tentar novamente.",
           TIMEOUT_ERROR_X: "Os ficheiros não foram partilhados, uma vez que não foi possível contactar o servidor.  Faça clique em 'Partilhar' para tentar novamente.",
           CANCEL_ERROR: "O ficheiro não foi partilhado, uma vez que o pedido foi cancelado.  Faça clique em 'Partilhar' para tentar novamente.",
           CANCEL_ERROR_X: "Os ficheiros não foram partilhados, uma vez que o pedido foi cancelado.  Faça clique em 'Partilhar' para tentar novamente.",
           NOT_FOUND_ERROR: "O ficheiro foi eliminado ou já não é visível para si e não pode ser partilhado.",
           NOT_FOUND_ERROR_X: "Os ficheiros foram eliminados ou já não são visíveis para si e não podem ser partilhados.",
           ACCESS_DENIED_ERROR: "Já não tem permissão para partilhar este ficheiro.",
           ACCESS_DENIED_ERROR_X: "Já não tem permissão para partilhar estes ficheiros.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "Um ficheiro restrito não pode ser tornado público.",
        	   ERROR_SHARE_X: "Os ficheiros restritos não podem ser tornados públicos."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "Transferiu ${0} para ${1} com êxito.",
		   SUCCESS_PLURAL: "Transferiu ${0} ficheiros para ${1} com êxito.",
		   ERROR: "Não foi possível transferir o ficheiro.  Tente novamente mais tarde.",
		   ERROR_X: "Não foi possível transferir ${0}.  Tente novamente mais tarde.",
		   INFO_SUCCESS_PRE_MODERATION: "O ficheiro ${0} foi submetido para revisão e ficará disponível quando aprovado.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} ficheiros foram submetidos para revisão e ficarão disponíveis quando aprovados."
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "Transferir e partilhar ficheiros"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "Cancelar",
	   CONFIRM_OTHER_TAB: "As informações introduzidas nos restantes separadores serão perdidas, se continuar com a acção actual.  Prima OK para continuar ou Cancelar para retroceder.",
	   CONFIRM_CURRENT_TAB: "Se prosseguir com a acção actual, as informações introduzidas no separador ${0} serão perdidas.  Prima OK para continuar ou Cancelar para retroceder.",
	   DIALOG_TITLE: "Confirmar",
	   OK: "OK"
   }
})



