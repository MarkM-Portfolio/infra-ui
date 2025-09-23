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
   submit: {label: "Salvar", a11y: "Salvar", tooltip: "Salvar"}, 
   cancel: {label: "Cancelar", a11y: "Cancelar", tooltip: "Cancelar"},
   close: {label: "Fechar", a11y: "Fechar", tooltip: "Fechar"},
   title: {global: "Compartilhar Algo", community: "Compartilhar com uma Comunidade"},
   STATUS: {
	   ACTIONS_UNAVAILABLE: "O compartilhamento de ações não está disponível para este cenário.",
	   ACTIONS_LOAD_ERROR: "Ocorreu um erro ao carregar o compartilhamento de ações.",
	   CONTENT_LOAD_ERROR: "O conteúdo não pode ser carregado. Tente novamente mais tarde ou entre em contato com o administrador do sistema."},
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
	   SHARE: "Compartilhar",
	   UPLOAD: "Carregar",
	   CANCEL: "Cancelar",
	   VISIBILITY_WARNING: "Os arquivos compartilhados com esta comunidade se tornarão públicos.",
	   SHARE_WITH_COMMUNITY: {
		   SUCCESS_ONE: "Você compartilhou com êxito ${0} com ${1}.",
		   SUCCESS_PLURAL: "Você compartilhou com êxito ${0} arquivos com ${1}.",
		   ERROR: "O arquivo não pôde ser compartilhado.  Tente novamente mais tarde.",
		   ERROR_X: "Os arquivos não puderam ser compartilhados.  Tente novamente mais tarde.",
           MAX_SHARES_ERROR: "O número máximo de compartilhamentos foi excedido.",
           EXTERNAL_SHARES_ERROR: "O arquivo só pode ser compartilhado dentro de sua organização.",
           EXTERNAL_SHARES_ERROR_X: "Os arquivos só podem compartilhados dentro de sua organização.",
           NOT_LOGGED_IN_ERROR: "O arquivo não foi compartilhado porque você não efetuou login.  Clique em 'Compartilhar'  para compartilhar o arquivo.",
           NOT_LOGGED_IN_ERROR_X: "Os arquivos não foram compartilhados porque você não efetuou login.  Clique em 'Compartilhar' para compartilhar os arquivos.",
           TIMEOUT_ERROR: "O arquivo não foi compartilhado porque o servidor não pôde ser contatado.  Clique em 'Compartilhar' para tentar novamente.",
           TIMEOUT_ERROR_X: "Os arquivos não foram compartilhados porque o servidor não pôde ser contatado.  Clique em 'Compartilhar' para tentar novamente.",
           CANCEL_ERROR: "O arquivo não foi compartilhado porque a solicitação foi cancelada.  Clique em 'Compartilhar' para tentar novamente.",
           CANCEL_ERROR_X: "Os arquivos não foram compartilhados porque a solicitação foi cancelada.  Clique em 'Compartilhar' para tentar novamente.",
           NOT_FOUND_ERROR: "O arquivo foi excluído ou não está mais visível para você e não pode ser compartilhado.",
           NOT_FOUND_ERROR_X: "Os arquivos foram excluídos ou não estão mais visíveis para você e não podem ser compartilhados.",
           ACCESS_DENIED_ERROR: "Você não tem mais permissão para compartilhar este arquivo.",
           ACCESS_DENIED_ERROR_X: "Você não tem mais permissão para compartilhar estes arquivos.",
           VISIBILITY_RESTRICTION: {
        	   ERROR_SHARE: "Um arquivo restrito não pode ser tornado público.",
        	   ERROR_SHARE_X: "Os arquivos restritos podem não se tornar públicos."
           }
         },
	   UPLOAD_TO_COMMUNITY: {
		   SUCCESS_ONE: "Você transferiu por upload com êxito ${0} para ${1}.",
		   SUCCESS_PLURAL: "Você transferiu por upload com êxito ${0} arquivos para ${1}.",
		   ERROR: "O arquivo não pôde ser carregado.  Tente novamente mais tarde.",
		   ERROR_X: "${0} não pôde ser transferido por upload.  Tente novamente mais tarde.",
		   INFO_SUCCESS_PRE_MODERATION: "O arquivo ${0} foi enviado para revisão e estará disponível quando aprovado.",
		   MULTI_INFO_SUCCESS_PRE_MODERATION: "${0} arquivos foram enviados para revisão e se tornarão disponíveis quando aprovados."
	   }
      },
   UPLOADFILE: {
      DESCRIPTION: "Faça o upload e o compartilhamento dos arquivos"
   },
   UNSAVEDCHANGES: {
	   CANCEL: "Cancelar",
	   CONFIRM_OTHER_TAB: "As informações inseridas nas outras guias serão perdidas se você continuar com a ação atual.  Pressione OK para continuar ou Cancelar para retornar.",
	   CONFIRM_CURRENT_TAB: "As informações inseridas na guia ${0} serão perdidas se você continuar com a ação atual.  Pressione OK para continuar ou Cancelar para retornar.",
	   DIALOG_TITLE: "Confirmar",
	   OK: "OK"
   }
})



