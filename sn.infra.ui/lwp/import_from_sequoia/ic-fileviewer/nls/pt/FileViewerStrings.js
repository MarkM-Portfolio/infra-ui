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

//NLS_CHARSET=UTF-8

define ({
  root: {
     FILE_VIEWER_TITLE: "Pré-visualização do ficheiro",
     FILENAME_TOOLTIP: "Editar nome do ficheiro",
     ICON_TOOLTIP: "Descarregar ficheiro",
     ERROR: "Ocorreu um erro.",
     SHARED_EXTERNALLY: "Partilhado externamente",
     FILE_SYNCED: "Adicionado à sincronização",
     MORE_ACTIONS: {
       TITLE: "Mais acções",
       A11Y: "Abre um menu pendente com uma lista de mais acções a executar no ficheiro."
     },
     SPLIT_ACTION: {
       MENU: {
         TITLE: "Mais opções",
         A11Y: "Este botão abre um menu para obter mais opções."
       },
       BUTTON: {
         EDIT: {
           TITLE: "Editar"
         },
         UPLOAD: {
           TITLE: "Transferir"
         }
       }
     },
     WELCOME: {
       TITLE: "Combinámos a vista de ficheiros e de detalhes",
       SUBTITLE: "Agora pode visualizar um ficheiro e os respectivos comentários lado a lado.",
       LINES: {
          LINE_1: "Todas as informações e tudo o que podia fazer na página antiga encontra-se aqui.",
          LINE_2: "Comentários, partilha, versões e informações básicas estão disponíveis ao lado do ficheiro."
       }
     },
     NAVIGATION: {
      NEXT_A11Y: "Este botão permite navegar até ao ficheiro seguinte.",
      PREVIOUS_A11Y: "Este botão permite navegar até ao ficheiro anterior."
     },
     ACTION: {
       CLOSE: {
         TOOLTIP: "Fechar",
         A11Y: "Este botão fecha o visualizador de ficheiros."
       },
       CREATE_FROM_TEMPLATE: {
         NAME: "Novo a partir do ficheiro",
         ACTION_NAME:"Criar ficheiro",
         A11Y: {
           TEXT: "Crie um documento (ficheiro DOC, DOCX ou ODT) a partir de um ficheiro modelo. Pode editar estes documentos online no Docs.",
           PRES: "Crie uma apresentação (ficheiro PPT, PPTX ou ODP) a partir de um ficheiro modelo. Pode editar estas apresentações online no Docs.",
           SHEET: "Crie uma folha de cálculo (ficheiro XLS, XLSX ou ODS) a partir de um ficheiro modelo. Pode editar estas folhas de cálculo online no Docs."
         },
         PROMPT: {
           TEXT: "Crie um documento (ficheiro DOC, DOCX ou ODT) a partir de um ficheiro modelo. Pode editar estes documentos online no Docs.",
           PRES: "Crie uma apresentação (ficheiro PPT, PPTX ou ODP) a partir de um ficheiro modelo. Pode editar estas apresentações online no Docs.",
           SHEET: "Crie uma folha de cálculo (ficheiro XLS, XLSX ou ODS) a partir de um ficheiro modelo. Pode editar estas folhas de cálculo online no Docs."
         },
         NAME_FIELD: "Nome:",
         EXTERNAL_FIELD: "Os ficheiros podem ser partilhados com pessoas externas à minha organização",
         EXTERNAL_DESC: "O acesso externo permite que os ficheiros sejam partilhados com utilizadores externos (pessoas fora da organização ou empresa), pastas partilhadas com utilizadores externos e comunidades com pessoas externas como membros. É necessário definir o acesso externo ao transferir um ficheiro: não é possível activá-lo posteriormente.",
         CREATE_BUTTON: "Criar",
         CANCEL: "Cancelar",
         PRE_FILL_NAMES: {
           OTT: "Documento sem título",
           OTS: "Folha de cálculo sem título",
           OTP: "Apresentação sem título",
           DOT: "Documento sem título",
           XLT: "Folha de cálculo sem título",
           POT: "Apresentação sem título",
           DOTX: "Documento sem título",
           XLTX: "Folha de cálculo sem título",
           POTX: "Apresentação sem título"
         },
         ERRORS: {
           NAME_REQUIRED: "O nome do documento é requerido.",
           ILLEGAL_NAME:"Trata-se de um título de documento não permitido. Especifique outro título.",
           WARN_LONG_NAME: "O nome do documento é demasiado longo.",
           TRIM_NAME: "Abreviar o nome do documento?",
           SESSION_TIMEOUT: "A sua sessão expirou. Inicie sessão e tente novamente.",
           DUPLICATE_NAME: "Foi encontrado um nome do ficheiro duplicado. Introduza um novo nome.",
           SERVER_ERROR: "O servidor do Connections não está disponível. Contacte o administrador do servidor e tente novamente mais tarde."
         }
       },
       DOWNLOAD: {
         TOOLTIP: "Descarregar ficheiro",
         A11Y: "Este botão permite descarregar o ficheiro."
       },
       DOWNLOAD_AS_PDF: {
         NAME: "Descarregar como PDF",
         TOOLTIP: "Descarregar este ficheiro como um ficheiro PDF",
         A11Y: "Este botão descarrega o ficheiro como um PDF.",
         SUCCESS: "Descarregou o ficheiro com êxito como um PDF.",
         ERROR: {
           DEFAULT: "Não foi possível descarregar o ficheiro como um PDF.  Tente novamente mais tarde.",
           UNAUTHENTICATED: "A sessão excedeu o tempo limite. Tem de iniciar sessão novamente para que possa descarregar o ficheiro como um PDF.",
           NOT_FOUND: "Não foi possível descarregar o ficheiro como um PDF, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
           ACCESS_DENIED: "Não foi possível descarregar o ficheiro como um PDF, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
         },
         DOCS_ERRORS: {
           NO_PUBLISHED_OR_EMPTY: "Não existe qualquer versão publicada deste ficheiro para descarregar.  As versões podem ser publicadas a partir do editor do Docs."
         }
       },
       DOWNLOAD_DOCS_FILE: {
         EMPTY_FILE_EDITOR: {
           DIALOG_TITLE: "Não é possível descarregar o ficheiro",
           CANCEL: "Fechar",
           PROMPT: "Não existe qualquer versão publicada deste ficheiro para descarregar.",
           PROMPT2: "As versões podem ser publicadas a partir do editor do Docs."
         },
         EMPTY_FILE_READER: {
           DIALOG_TITLE: "Não é possível descarregar o ficheiro",
           CANCEL: "Fechar",
           PROMPT: "Não existe qualquer versão publicada deste ficheiro para descarregar.",
           PROMPT2: "Solicita ao proprietário do ficheiro que publique uma versão deste ficheiro."
         },
         NEWER_DRAFT_EXISTS: {
           DIALOG_TITLE: "Descarregar uma versão",
           OK: "Descarregar versão",
           PROMPT: {
             TODAY: "Foi detectado um rascunho mais recente, editado pela última vez hoje às ${time}.",
             YESTERDAY: "Foi detectado um rascunho mais recente, editado pela última vez ontem às ${time}.",
             DAY: "Foi detectado um rascunho mais recente, editado pela última vez a ${date}.",
             MONTH: "Foi detectado um rascunho mais recente, editado pela última vez a ${date}.",
             YEAR: "Foi detectado um rascunho mais recente, editado pela última vez a ${date_long}."
           },
           PROMPT2: {
             TODAY: "Tem a certeza de que pretende continuar a descarregar a versão publicada hoje às ${time}?",
             YESTERDAY: "Tem a certeza de que pretende continuar a descarregar a versão publicada ontem às ${time}?",
             DAY: "Tem a certeza de que pretende continuar a descarregar a versão publicada a ${date}?",
             MONTH: "Tem a certeza de que pretende continuar a descarregar a versão publicada a ${date}?",
             YEAR: "Tem a certeza de que pretende continuar a descarregar a versão publicada a ${date_long}?"
           }
         }
       },
       TOGGLE_PANEL: {
         SHOW: "Mostrar painel de detalhes",
         HIDE: "Ocultar painel de detalhes",
         SHOW_A11Y: "Este botão permite abrir e fechar o painel lateral. O painel lateral está actualmente fechado.",
         HIDE_A11Y: "Este botão permite abrir e fechar o painel lateral. O painel lateral está actualmente aberto."
       },
       VIEW_DOC: {
         NAME: "Abrir no Docs Viewer",
         TOOLTIP: "Abrir no Docs Viewer",
         A11Y: "Este botão abre o ficheiro para visualização numa nova janela do navegador."
       },
       EDIT_DOC: {
         NAME: "Editar no Docs",
         TOOLTIP: "Editar ficheiro no Docs",
         A11Y: "Este botão abre o ficheiro para edição no Docs numa nova janela."
       },
       ROUNDTRIP_EDIT: {
         NAME: "Editar no ambiente de trabalho",
         DIALOG_TITLE: "Editar no ambiente de trabalho",
         TOOLTIP: "Editar este documento",
         A11Y: "Este botão abre o ficheiro para edição local.",
         PROMPT: "Esta funcionalidade permite editar o ficheiro localmente.",
         IMPORTANT: "Importante:",
         REMINDER: "Após concluir a edição, é necessário publicar um rascunho utilizando conectores de ficheiro do ambiente de trabalho. Se não for possível abrir o ficheiro, poderá ser necessário instalar os suplementos de ambiente de trabalho.",
         SKIP_DIALOG: "Não mostrar esta mensagem novamente.",
         OK: "OK",
         CANCEL: "Cancelar"
       },
       DELETE_VERSION: {
         DIALOG_TITLE: "Confirmar",
         DELETE_VERSION: "Eliminar a versão ${version}",
         DELETE_VERSION_AND_PRIOR: "Eliminar versão ${version} e todas as versões anteriores",
         PROMPT: "Está prestes a eliminar a versão ${version}. Pretende prosseguir?",
         DELETE_PRIOR: "Eliminar também todas as versões anteriores",
         ERROR: "Ocorreu um erro ao eliminar a versão. Tente novamente mais tarde.",
         TOOLTIP: "Eliminar esta versão",
         OK: "OK",
         CANCEL: "Cancelar"
       },
       GET_LINKS: {
         DIALOG_TITLE: "Obter ligações",
         LINK_FILE: "Ligação para o ficheiro:",
         LINK_PREVIEW: "Ligação para o ficheiro de pré-visualização:",
         LINK_DOWNLOAD: "Ligação para o ficheiro de transferência:",
         TOOLTIP: "Ligação para o ficheiro",
         OK: "Fechar"
       },
       DOWNLOAD_VERSION: {
         TOOLTIP: "Descarregar esta versão"
       },
       RESTORE_VERSION: {
         DIALOG_TITLE: "Confirmar",
         PROMPT: "Está prestes a substituir a versão atual deste ficheiro pela versão ${version}. Pretende prosseguir?",
         ERROR: "Ocorreu um erro ao restaurar a versão. Tente novamente mais tarde.",
         TOOLTIP: "Restaurar esta versão",
         CHANGE_SUMMARY: "Restaurado a partir da versão ${version}",
         OK: "OK",
         CANCEL: "Cancelar"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Confirmar",
         REMOVE_EVERYONE: "Tem a certeza de que pretende remover o acesso da organização a este ficheiro? Se o acesso for removido, o ficheiro é removido das pastas e comunidades que permitem acesso ao nível da organização e apenas as pessoas com quem foi partilhado podem ver e trabalhar com o mesmo.",
         REMOVE_USER: "Tem a certeza de que pretende parar a partilha com ${user}? Se parar a partilha, ${user} apenas poderá aceder a este ficheiro através de pastas ou se este for partilhado com todas as pessoas na organização.",
         REMOVE_COMMUNITY: "Tem a certeza de que pretende remover este ficheiro da comunidade ${communityName}?",
         REMOVE_FOLDER: "Tem a certeza de que pretende remover este ficheiro da pasta ${folderName}?",
         REMOVE_EVERYONE_TOOLTIP: "Remover acesso da organização",
         REMOVE_USER_TOOLTIP: "Remover todas as partilhas com ${user}",
         REMOVE_COMMUNITY_TOOLTIP: "Remover da comunidade ${communityName}",
         REMOVE_FOLDER_TOOLTIP: "Remover da pasta ${folderName}",
         OK: "OK",
         CANCEL: "Cancelar"
       },
       EDIT_COMMENT: {
         TOOLTIP: "Editar este comentário"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Confirmar",
         PROMPT: "Tem a certeza de que pretende eliminar este comentário?",
         ERROR: "Ocorreu um erro ao eliminar o comentário. Tente novamente mais tarde.",
         TOOLTIP: "Eliminar este comentário",
         OK: "OK",
         CANCEL: "Cancelar"
       },
       LIKE: {
         LIKE: "Gostar do ficheiro",
         UNLIKE: "Não gostar do ficheiro",
         LIKE_A11Y: "Este botão gosta do ficheiro.",
         UNLIKE_A11Y: "Este botão não gosta do ficheiro.",
         LIKED_SUCCESS: "Gostou deste ficheiro",
         UNLIKE_SUCCESS: "Não gostou deste ficheiro"
       },
       EDIT_DESCRIPTION: {
         TOOLTIP: "Editar descrição",
         ERROR: {
           DEFAULT: "Não foi possível guardar a descrição. Tente novamente mais tarde.",
           UNAUTHENTICATED: "A sessão excedeu o tempo limite. Tem de iniciar sessão novamente para que possa actualizar a descrição.",
           NOT_FOUND: "Não foi possível guardar a descrição, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
           ACCESS_DENIED: "Não foi possível guardar a descrição, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
         }
       },
       EDIT_FILENAME: {
         ERROR: {
           DEFAULT: "Erro ao guardar nome do ficheiro",
           CONFLICT: "O nome do ficheiro já existe"
         }
       },
       TOGGLE_FOLLOW: {
         ERROR: {
           FOLLOW: {
             DEFAULT: "Ocorreu um erro no acompanhamento deste ficheiro. Tente novamente mais tarde.",
             UNAUTHENTICATED: "A sessão excedeu o tempo limite. Tem de iniciar sessão novamente para que possa acompanhar este ficheiro.",
             NOT_FOUND: "Não pode acompanhar este ficheiro, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
             ACCESS_DENIED: "Não pode acompanhar este ficheiro, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
           },
           UNFOLLOW: {
             DEFAULT: "Ocorreu um erro ao anular o acompanhamento deste ficheiro. Tente novamente mais tarde.",
             UNAUTHENTICATED: "A sessão excedeu o tempo limite. Tem de iniciar sessão novamente para que possa parar de acompanhar este ficheiro.",
             NOT_FOUND: "Não pode parar de acompanhar este ficheiro, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
             ACCESS_DENIED: "Não pode parar de acompanhar este ficheiro, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
           }
         },
         FOLLOW_NAME: "Acompanhar",
         FOLLOW_TOOLTIP: "Acompanhar este ficheiro",
         FOLLOW_A11Y: "Este botão acompanha o ficheiro.",
         FOLLOW_SUCCESS: "Está agora a acompanhar este ficheiro.",
         STOP_FOLLOWING_NAME: "Parar o acompanhamento",
         STOP_FOLLOWING_TOOLTIP: "Parar o acompanhamento deste ficheiro",
         STOP_FOLLOWING_A11Y: "Este botão pára o acompanhamento do ficheiro.",
         STOP_FOLLOWING_SUCCESS: "Parou o acompanhamento deste ficheiro."
       },
       TOGGLE_SYNC: {
         SYNC: {
           NAME: "Adicionar à Sincronização",
           TOOLTIP: "Adicionar este ficheiro à sincronização",
           A11Y: "Este botão adiciona o ficheiro à sincronização.",
           SUCCESS: "Adicionou este ficheiro à sincronização.",
           ERROR: {
             DEFAULT: "Ocorreu um erro ao adicionar este ficheiro para sincronização. Tente novamente mais tarde.",
             UNAUTHENTICATED: "A sessão excedeu o tempo limite. Tem de iniciar sessão novamente para que possa adicionar este ficheiro à sincronização.",
             NOT_FOUND: "Não é possível adicionar este ficheiro à sincronização, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
             ACCESS_DENIED: "Não é possível adicionar este ficheiro à sincronização, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
           }
         },
         STOP_SYNC: {
           NAME: "Remover da sincronização",
           TOOLTIP: "Remover este ficheiro da sincronização",
           A11Y: "Este botão remove o ficheiro da sincronização.",
           SUCCESS: "Removeu este ficheiro da sincronização.",
           ERROR: {
             DEFAULT: "Ocorreu um erro ao remover este ficheiro da sincronização. Tente novamente mais tarde.",
             UNAUTHENTICATED: "A sessão excedeu o tempo limite. Tem de iniciar sessão novamente para que possa remover este ficheiro da sincronização.",
             NOT_FOUND: "Não é possível remover este ficheiro da sincronização, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
             ACCESS_DENIED: "Não é possível remover este ficheiro da sincronização, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
           }
         }
       },
       TOGGLE_FAVORITE: {
          FAVORITE_NAME: "Marcar",
          FAVORITE_TOOLTIP: "Marcar este ficheiro",
          FAVORITE_A11Y: "Este botão marca o ficheiro.",
          FAVORITE_SUCCESS: "Marcou este ficheiro.",
          STOP_FAVORITEING_NAME: "Desmarcar",
          STOP_FAVORITEING_TOOLTIP: "Desmarcar este ficheiro",
          STOP_FAVORITEING_A11Y: "Este botão desmarca o ficheiro.",
          STOP_FAVORITEING_SUCCESS: "Desmarcou este ficheiro."
       },
       TRASH: {
         NAME: "Mover para a pasta Lixo",
         DIALOG_TITLE: "Confirmar",
         PROMPT: "Tem a certeza de que pretende mover este ficheiro para a pasta Lixo? Ao mover este ficheiro para a pasta Lixo, este torna-se indisponível para qualquer pessoa com o qual esteja a ser partilhado.",
         ERROR: "Ocorre um erro ao eliminar o ficheiro. Tente novamente mais tarde.",
         TOOLTIP: "Eliminar este ficheiro",
         OK: "OK",
         CANCEL: "Cancelar",
         A11Y: "Este botão move o ficheiro para a pasta Lixo.",
         SUCCESS_MSG: "${file} foi movido para a pasta Lixo."
       },
       REFRESH: {
         NAME: "Actualizar",
         ERROR: "Ocorreu um erro ao actualizar o visualizador de ficheiros. Tente novamente mais tarde.",
         TOOLTIP: "Actualizar o visualizador de ficheiros",
         INFO_MSG: "Actualize para obter o conteúdo mais recente. ${link}",
         A11Y: "Este botão move o ficheiro para a pasta Lixo.",
         SUCCESS_MSG: "O conteúdo foi actualizado com êxito."
       },
       COPY_FILE: {
         NAME: "Fornecer cópia à comunidade",
         DIALOG_TITLE: "Confirmar",
         ERROR: "Ocorreu um erro ao copiar o ficheiro. Tente novamente mais tarde.",
         TOOLTIP: "Fornecer uma cópia deste ficheiro a uma comunidade",
         OK: "OK",
         CANCEL: "Cancelar",
         A11Y: "Este botão abre uma caixa de diálogo que permite fornecer uma cópia deste ficheiro a uma comunidade.",
         SUCCESS_MSG: "${file} foi copiado para ${community}."
       },
       UPLOAD_VERSION: {
         NAME: "Transferir nova versão",
         NAME_SHORT: "Transferir",
         CHANGE_SUMMARY: "Resumo de alterações opcional...",
         TOOLTIP: "Transferir uma nova versão deste ficheiro",
         A11Y: "Este botão abre uma caixa de diálogo que permite transferir uma nova versão deste ficheiro."
       },
       LOG_IN: {
    	   NAME: "Iniciar sessão",
    	   TOOLTIP: "Inicie sessão para transferir e partilhar ficheiros, efectuar comentários e criar pastas"
       },
       LOCK: {
          NAME: "Bloquear ficheiro",
          TITLE: "Bloquear este ficheiro",
          A11Y: "Bloquear este ficheiro",
          SUCCESS: "O ficheiro está agora bloqueado."
       },
       UNLOCK: {
          NAME: "Desbloquear ficheiro",
          TITLE: "Desbloquear este ficheiro",
          A11Y: "Desbloquear este ficheiro",
          SUCCESS: "O ficheiro está agora desbloqueado."
       },
       EDIT_ON_DESKTOP: {
          NAME: "Editar no ambiente de trabalho",
          TITLE: "Editar no ambiente de trabalho",
          A11Y: "Editar no ambiente de trabalho"
       },
       FLAG: {
         FILE: {
           NAME: "Sinalizar como inadequado",
           TITLE: "Sinalizar ficheiro",
           A11Y: "Sinalizar este ficheiro como inadequado",
           PROMPT: "Forneça um motivo para a sinalização deste ficheiro (opcional):",
           OK: "Sinalizar",
           CANCEL: "Cancelar",
           SUCCESS: "O ficheiro foi sinalizado e submetido para revisão.",
           ERROR: "Erro ao sinalizar este ficheiro. Tente novamente mais tarde."
         },
         COMMENT: {
           NAME: "Sinalizar como inadequado",
           TITLE: "Sinalizar comentário",
           A11Y: "Sinalizar este comentário como inadequado",
           PROMPT: "Forneça um motivo para a sinalização deste comentário (opcional):",
           OK: "Sinalizar",
           CANCEL: "Cancelar",
           SUCCESS: "O comentário foi sinalizado e submetido para revisão.",
           ERROR: "Erro ao sinalizar este comentário. Tente novamente mais tarde."
         }
       }
     },
     SECTION: {
      ABOUT: {
       NAME: "Acerca deste ficheiro",
       VIEW_FILE_DETAILS: "Ver detalhes do ficheiro",
       A11Y: "Activar esta ligação irá fechar o visualizador de ficheiros e irá direccioná-lo para a página de detalhes do ficheiro deste ficheiro."
      }
     },
     PREVIEW: {
      ICON: {
       PREVIEW_NOT_AVAILABLE: "Nenhum pré-visualização disponível para este ficheiro."
      },
      IMAGE: {
       ZOOM_IN: "Mais zoom",
       ZOOM_OUT: "Menos zoom",
       RESET: "Repor",
       ZOOM_IN_A11Y: "Este botão aumenta o zoom na imagem.",
       ZOOM_OUT_A11Y: "Este botão reduz o zoom na imagem.",
       RESET_ZOOM_A11Y: "Este botão reinicia o nível de zoom."
      },
      VIEWER: {
       LOADING: "A carregar...",
       NO_PUBLISHED_VERSION: "Não está disponível para visualização uma versão publicada deste ficheiro.",
       IFRAME_TITLE: "Pré-visualização deste ficheiro"
      }
     },
     DATE: {
      LAST_UPDATED: {
       TODAY: "Última actualização por ${user} hoje às ${time}",
       YESTERDAY: "Última actualização por ${user} ontem às ${time}",
       DAY: "Última actualização por ${user} a ${EEee} às ${time}",
       MONTH: "Última actualização por ${user} a ${date_long}",
       YEAR: "Última actualização por ${user} a ${date_long}"
      },
      CREATED: {
       TODAY: "Criado por ${user} hoje às ${time}",
       YESTERDAY: "Criado por ${user} ontem às ${time}",
       DAY: "Criado por ${user} em ${EEee} às ${time}",
       MONTH: "Criado por ${user} em ${date_long}",
       YEAR: "Criado por ${user} em ${date_long}"
      },
      LONG: {
         TODAY: "${EEEE}, ${date_long}, ${time_long}",
         YESTERDAY: "${EEEE}, ${date_long}, ${time_long}",
         DAY: "${EEEE}, ${date_long}, ${time_long}",
         MONTH: "${date_long}, ${time_long}",
         YEAR: "${date_long}, ${time_long}"
        },
      SHORT: {
       TODAY: "${time} - Hoje",
       YESTERDAY: "${time} - Ontem",
       DAY: "${time} - ${EEee}",
       MONTH: "${time} - ${date_long}",
       YEAR: "${time} - ${date_long}"
      },
      VERY_SHORT: {
       TODAY: "Hoje",
       YESTERDAY: "Ontem",
       DAY: "${EEee}",
       MONTH: "${date_long}",
       YEAR: "${date_long}"
      }
     },
     FILE_SIZE: {
      BYTES: "${size} B",
      KILOBYTES: "${size} KB",
      MEGABYTES: "${size} MB",
      GIGABYTES: "${size} GB",
      TERRABYTES: "${size} TB"
     },
     COMMENT_BOX: {
       TITLE: "Área de texto de comentários",
       SHADOW_TEXT: "Adicionar um comentário...",
       CANNOT_ACCESS_CONTENT: "As pessoas mencionadas que se seguem não podem visualizar o comentário uma vez que não têm acesso ao conteúdo:",
       ERROR: "Ocorreu um erro ao validar o utilizador que está a tentar mencionar.",
       POST: "Publicar",
       SAVE: "Guardar",
       CANCEL: "Cancelar",
       EXTERNAL_WARNING: "Os comentários poderão ser visualizados por pessoas externas à organização."
     },
     EDIT_BOX: {
       CANCEL: {
         TOOLTIP: "Cancelar",
         A11Y: "Este botão cancela a acção de edição do nome do ficheiro."
       },
       INVALID_CHARACTERS: "Carácter não válido",
       INVALID_CHARACTERS_REMOVED: "Caracteres não válidos removidos"
     },
     COMMENT_WIDGET: {
       EDITED: "(Editado)",
       EDITED_DATE: {
         TODAY: "Editado hoje às ${time}",
         YESTERDAY: "Editado ontem às ${time}",
         DAY: "Editado ${EEee} às ${time}",
         MONTH: "Editado em ${date_long}",
         YEAR: "Editado em ${date_long}"
       }
     },
     TYPEAHEAD_BOX: {
       SAVE: "Guardar",
       CANCEL: "Cancelar",
       USER: "Utilizador",
       COMMUNITY: "Comunidade",
       SHARE: "Partilhar",
       SHARE_ALT: "Partilhar com este utilizador",
       MEMBER_TYPE: "Tipo de membro",
       PERSON_SHADOW: "Introduzir para localizar pessoa",
       COMMUNITY_SHADOW: "Introduzir para localizar comunidade",
       PERSON_FULL_SEARCH: "Pessoa não apresentada? Utilize a procura completa...",
       COMMUNITY_FULL_SEARCH: "Comunidade não apresentada? Utilize a procura completa...",
       ADD_OPTIONAL_MESSAGE: "Adicionar mensagem opcional",
       ROLE_LABEL: "Função",
       ROLE_EDIT: "Editor",
       ROLE_VIEW: "Leitor"
     },
     FILE_STATE: {
       DOCS_FILE: "Este é um ficheiro do Docs. Todas as edições têm de ser efectuadas online.",
       LOCKED_BY_YOU: {
         TODAY: "Bloqueado por si às ${time}.",
         YESTERDAY: "Bloqueado por si ontem às ${time}.",
         DAY: "Bloqueado por si a ${date}.",
         MONTH: "Bloqueado por si a ${date}.",
         YEAR: "Bloqueado por si em ${date_long}."
       },
       LOCKED_BY_OTHER: {
         TODAY: "Bloqueado às ${time} por ${user}.",
         YESTERDAY: "Bloqueado ontem às ${time} por ${user}.",
         DAY: "Bloqueado em ${date} por ${user}.",
         MONTH: "Bloqueado em ${date} por ${user}.",
         YEAR: "Bloqueado em ${date_long} por ${user}."
       }
     },
     VALIDATION: {
       COMMENT: {
         WARN_TOO_LONG: "O comentário é demasiado longo.",
         TRIM: "Abreviar o comentário?"
       },
       DESCRIPTION: {
         WARN_TOO_LONG: "A descrição é demasiado longa.",
         TRIM: "Abreviar a descrição?"
       },
       SHARE_MESSAGE: {
         WARN_TOO_LONG: "A mensagem é demasiado longa.",
         TRIM: "Abreviar mensagem?"
       },
       TAG: {
         WARN_TOO_LONG: "A etiqueta é demasiado longa.",
         TRIM: "Abreviar etiqueta?"
       },
       TAGS: {
         WARN_TOO_LONG: "Uma ou mais etiquetas são demasiado longas.",
         TRIM: "Abreviar etiquetas?"
       },
       FILENAME: {
         WARN_TOO_LONG: "Nome do ficheiro demasiado longo"
       }
     },
     DOCS_STATUS_MESSAGE: {
       NO_ENTITLEMENT: "Este ficheiro está disponível apenas para edição online, caso tenha adquirido a autorização de utilização do Docs.",
       CURRENT_EDITORS: "Este ficheiro está a ser editado na Web por ${users}.",
       UNPUBLISHED_CHANGES: "Existem edições a este rascunho que não foram publicadas como uma versão.",
       PUBLISH_A_VERSION: "Publicar uma versão",
       PUBLISH_SUCCESS: "Publicou com êxito uma versão deste ficheiro",
       PUBLISH_ERROR: {
         ACCESS_DENIED: "Não foi possível publicar a versão, uma vez que o acesso foi recusado.",
         NOT_FOUND: "Não foi possível publicar a versão, uma vez que o documento não foi localizado.",
         CANNOT_REACH_REPOSITORY: "Não foi possível publicar a versão, uma vez que o servidor do Docs não consegue estabelecer ligação ao repositório de ficheiros.",
         QUOTA_VIOLATION: "Não foi possível publicar a versão, devido a restrições de espaço. Remova outros ficheiros para libertar espaço suficiente para publicar esta versão.",
         CONVERSION_UNAVAILABLE: "Não foi possível publicar a versão, uma vez que o serviço de conversão do Docs não está disponível. Tente novamente mais tarde.",
         TOO_LARGE: "Não foi possível publicar a versão, uma vez que o documento é demasiado grande.",
         CONVERSION_TIMEOUT: "Não foi possível publicar a versão, uma vez que o serviço de conversão do Docs está a demorar demasiado tempo a converter o documento. Tente novamente mais tarde.",
         SERVER_BUSY: "Não foi possível publicar a versão, uma vez que o servidor do Docs está ocupado. Tente novamente mais tarde.",
         DEFAULT: "Não foi possível publicar a versão, uma vez que o serviço do Docs não está disponível. Tente novamente mais tarde."
       }
     },
     COMMENTS: {
       EMPTY: "Não existem comentários.",
       MODERATED: "O comentário foi submetido para revisão e estará disponível após aprovação.",
       ERROR: {
         SAVE: {
           DEFAULT: "Não foi possível guardar o seu comentário. Tente novamente mais tarde.",
           UNAUTHENTICATED: "A sessão excedeu o tempo limite. Tem de iniciar sessão novamente para que possa guardar o comentário.",
           NOT_FOUND: "Não foi possível guardar o seu comentário, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
           ACCESS_DENIED: "Não foi possível guardar o seu comentário, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
         },
         DELETE: {
           DEFAULT: "Não foi possível eliminar o seu comentário. Tente novamente mais tarde.",
           UNAUTHENTICATED: "A sessão excedeu o tempo limite. Tem de iniciar sessão novamente para que possa eliminar o comentário.",
           NOT_FOUND: "Não foi possível eliminar o seu comentário, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
           ACCESS_DENIED: "Não foi possível eliminar o seu comentário, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
         }
       }
     },
     TAG_WIDGET: {
       ADD_TOOLTIP: "Guardar",
       EDIT_TAGS: "Editar etiquetas",
       ERROR: {
         SAVE: {
           DEFAULT: "Não foi possível criar a etiqueta. Tente novamente mais tarde."
         },
         DELETE: {
           DEFAULT: "Não foi possível eliminar a etiqueta. Tente novamente mais tarde."
         }
       }
     },
     EXPANDABLE_TEXT: {
       READ_MORE: "Ler mais...",
       READ_LESS: "Ler menos..."
     },
     SHARE: {
	     EVERYONE: "Todas as pessoas na minha organização",
	     ADD_TOOLTIP: "Guardar",
	     ROLES: {
	       OWNER: "Proprietário",
	       EDIT: "Editores",
	       VIEW: "Leitores",
	       FOLDER: "Partilhado com pastas"
	     },
	     USERROLE: "${userRole} - ${sharedUserCount}",
	     ACTION: {
	       OWNER: {
	         ROLE: "Proprietário"
	       },
	       EDIT: {
	         ROLE: "Editar",
           ADD: "Adicionar editor"
	       },
	       VIEW: {
	         ROLE: "Leitor",
           ADD: "Adicionar leitor"
	       },
	       FOLDER: {
           ADD: "Adicionar pastas",
           COMMUNITY_ADD: "Adicionar à pasta",
           MOVE: "Mover para pasta"
	       },
	       MULTI: {
	         ADD: "Adicionar pessoas ou comunidades",
	         ADD_PEOPLE: "Adicionar pessoas"
	       }
	     },
	     PUBLIC: {
	        SHORT: "Todas as pessoas na minha organização",
	        LONG: {
	           GENERIC: "Todas as pessoas na sua organização",
	           ORG: "Todas as pessoas em ${org}."
	        }
	     },
	     SHARE_FAIL: {
	       EXISTING_USER: "Este ficheiro já é partilhado com ${user}.",
	       ERROR: "Não é possível partilhar com ${user} neste momento.",
	       SELF: "Não é possível partilhar consigo próprio."
	     },
	     SHARE_INFO: {
	       PROMOTED: "${user} foi promovido para uma função de partilha mais elevada."
	     },
	     SHARE_SUCCESS: {
	       SUCCESS: "Partilhado com êxito com ${user}"
	     },
	     MESSAGE_BOX: {
	       HINT_TEXT: "Mensagem opcional..."
	     },
	     PROVISION_EXTERNAL_USER_DIALOG: {
	       SINGULAR: {
	         NAME: "Fornecer utilizador externo",
            ACTION: "Fornecer utilizador externo...",
            TOOLTIP: "Fornecer utilizador externo",
            DIALOG_TITLE: "Conteúdo não partilhado",
            PROMPT: {
              NO_ACCOUNT: "O seguinte utilizador não tem uma conta, pelo que não foi partilhado qualquer conteúdo com o mesmo.",
              INVITE: "Convidar este utilizador para partilhar conteúdo com o mesmo."
            },
            SUBMIT: "Prosseguir com o convite",
            CANCEL: "Cancelar",
            ERROR: "Ocorreu um erro ao fornecer a conta. Tente novamente mais tarde.",
            SUCCESS: "Conta de utilizador fornecida com êxito."
	       },
	       PLURAL: {
	         NAME: "Fornecer utilizadores externos",
	         ACTION: "Fornecer utilizadores externos...",
	         TOOLTIP: "Fornecer utilizadores externos",
	         DIALOG_TITLE: "Conteúdo não partilhado",
	         PROMPT: {
	           NO_ACCOUNT: "Os seguintes utilizadores não têm uma conta, pelo que não foi partilhado qualquer conteúdo com os mesmos.",
	           INVITE: "Convidar estes utilizadores para partilhar conteúdo com os mesmos."
	         },
	         SUBMIT: "Prosseguir com os convites",
	         CANCEL: "Cancelar",
	         ERROR: "Ocorreu um erro ao fornecer contas. Tente novamente mais tarde.",
	         SUCCESS: "Contas de utilizador fornecidas com êxito."
	       },
	       ABSTRACT: {
	         NAME: "Fornecer utilizadores externos",
            ACTION: "Fornecer utilizadores externos...",
            TOOLTIP: "Fornecer utilizadores externos",
            DIALOG_TITLE: "Conteúdo não partilhado",
            PROMPT: {
              NO_ACCOUNT: "Alguns utilizadores não têm contas e não foi partilhado qualquer conteúdo com os mesmos.",
              INVITE: "Convidar estes utilizadores para partilhar conteúdo com os mesmos."
            },
            SUBMIT: "Prosseguir com os convites",
            CANCEL: "Cancelar",
            ERROR: "Ocorreu um erro ao fornecer contas. Tente novamente mais tarde.",
            SUCCESS: "Contas de utilizador fornecidas com êxito."
	       }
	     }
	   },
      SHARE_OPTIONS: {
         TITLE: "Opções de partilha",
         PROPAGATION: "Permitir que outras pessoas partilhem este ficheiro",
         EVERYONE: "Todas as pessoas podem partilhar este ficheiro.",
         OWNER_ONLY: "Apenas o proprietário pode partilhar este ficheiro.",
         STOP_SHARE: "Parar a partilha",
         MAKE_INTERNAL: "Parar a partilha externa",
         MAKE_INTERNAL_SUCCESS: "Este ficheiro já não pode ser partilhado com pessoas que não pertencem à sua organização.",
         MAKE_INTERNAL_DIALOG: {
           DIALOG_TITLE: "Tornar interno?",
           PROMPT: "Tornar este ficheiro interno significa que deixará de poder ser partilhado com pessoas que não pertencem à organização. ${br}${br}" +
             "Todas as partilhas com pessoas, comunidades ou pastas externas serão removidas.${br}${br}A acção de tornar um ficheiro interno é permanente e não pode ser anulada."
         },
         MAKE_PRIVATE_DIALOG: {
           DIALOG_TITLE: "Parar a partilha do ficheiro",
           PROMPT: "Tem a certeza de que pretende parar a partilha deste ficheiro?",
           QUESTION_PUBLIC: "Este ficheiro deixará de ser visível para todas as pessoas na organização ou partilhado com pessoas, pastas ou comunidades. Não é possível anular esta operação.",
           QUESTION_PUBLIC_E: "Este ficheiro já não estará visível para todas as pessoas na organização, nem será partilhado com pessoas ou pastas. Não é possível anular esta operação.",
           QUESTION: "O ficheiro deixará de ser partilhado com pessoas ou comunidades e será removido de todas as pastas, excepto das pastas particulares. Não é possível anular esta acção.",
           QUESTION_E: "Este ficheiro já não estará partilhado com outras pessoas e será removido de todas as pastas, excepto das suas pastas particulares. Não é possível anular esta acção."
         },
         MAKE_PRIVATE_SUCCESS: "Este ficheiro é agora particular.",
         MAKE_PRIVATE_ERROR: {
           DEFAULT: "Não é possível parar a partilha do ficheiro. Tente novamente mais tarde."
         }
      },
	   SHARE_LINK: {
	     MY_SHARES: "As minhas partilhas"
	   },
	   STREAM: {
	     LOADING: "A carregar...",
	     LOAD_MORE: "Carregar mais..."
	   },
	   ENTRY: {
	     REMOVE: "Remover",
	     RESTORE: "Restaurar",
	     EDIT: "Editar",
	     DELETE: "Eliminar",
	     OK: "OK",
	     CANCEL: "Cancelar",
	     USER_PICTURE: "Fotografia de ${0}",
	     FLAG: "Sinalizar como inadequado"
	   },
	   PANEL: {
	     LOAD_ERROR: "Ocorreu um erro ao aceder aos metadados deste ficheiro.",
	     ABOUT: {
	       TITLE: "Acerca de",
	       EXPAND_BUTTON: "Expandir este botão para visualizar mais informações",
	       CURRENT_VERSION_HEADER: "Versão actual ${versionNumber}",
	       FILE_SIZE_HEADER: "Tamanho do ficheiro",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - Versão atual",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - Todas as versões",
	       DOCS_DRAFT_UPDATED_HEADER: "Rascunho editado",
	       DOCS_DRAFT_CREATED_HEADER: "Rascunho criado",
	       DOCS_UPDATED_HEADER: "Publicado",
	       DOCS_CREATED_HEADER: "Criado",
	       UPDATED_HEADER: "Actualizado",
	       CREATED_HEADER: "Criado",
	       LIKES_HEADER: "Gostos",
	       LIKES_EXPAND_ICON: "Expanda este ícone para visualizar quem gostou do ficheiro",
	       DOWNLOADS_HEADER: "Transferências",
	       DOWNLOADS_HEADER_MORE: "Transferências (${0})",
	       DOWNLOADS_EXPAND_ICON: "Expanda este ícone para visualizar quem descarregou o ficheiro",
	       DOWNLOADS_COUNT: "${downloads}",
	       DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonimamente",
	       DOWNLOADS_LATEST_VERSION: "Tem a versão mais recente deste ficheiro",
	       DOWNLOADS_LAST_VERSION: "A última transferência efectuada foi da versão ${0} deste ficheiro",
	       TAGS_HEADER: "Etiquetas",
	       DESCRIPTION_HEADER: "Descrição",
	       DESCRIPTION_READ_MORE: "Ler mais...",
	       LINKS_HEADER: "Ligações",
	       SECURITY: "Segurança",
	       FILE_ENCRYPTED: "O conteúdo do ficheiro está encriptado. O conteúdo do ficheiro encriptado não é passível de procura. Não é possível visualizar nem editar o conteúdo do ficheiro com o HCL Docs.",
	       GET_LINKS: "Obter ligações...",
	       ADD_DESCRIPTION: "Adicionar uma descrição",
	       NO_DESCRIPTION: "Sem descrição",
	       ADD_TAGS: "Adicionar etiquetas",
	       NO_TAGS: "Nenhuma etiqueta"
	     },
	     COMMENTS: {
	       TITLE: "Comentários",
	       TITLE_WITH_COUNT: "Comentários (${0})",
	       VERSION: "Versão ${0}",
	       FEED_LINK: "Feed para estes comentários",
	       FEED_TITLE: "Acompanhar as alterações efectuadas a estes comentários através do leitor de feeds"
	     },
	     SHARING: {
	       TITLE: "Partilhar",
	       TITLE_WITH_COUNT: "Partilhado (${0})",
	       SHARED_WITH_FOLDERS: "Partilhado com pastas - ${count}",
	       SEE_WHO_HAS_SHARED: "Ver quem partilhou",
           COMMUNITY_FILE: "Os ficheiros da propriedade de uma comunidade não podem ser partilhados com pessoas ou outras comunidades.",
           SHARED_WITH_COMMUNITY: "Partilhado com membros da comunidade '${0}'",
           LOGIN: "Iniciar sessão",
           NO_SHARE: "Este ficheiro ainda não foi adicionado a quaisquer pastas.",
           ONE_SHARE: "Este ficheiro encontra-se numa pasta ou comunidade à qual não tem acesso.",
           MULTIPLE_SHARE: "Este ficheiro encontra-se em ${fileNumber} pastas ou comunidades às quais não tem acesso."
	     },
	     VERSIONS: {
	       TITLE: "Versões",
	       TITLE_WITH_COUNT: "Versões (${0})",
	       FEED_LINK: "Feed para estas versões",
	       FEED_TITLE: "Acompanhar as alterações efectuadas a este ficheiro através do leitor de feeds"
	     }
     },
     CONFIRMATION_DIALOG: {
       NAME: "Confirmação de acção",
       DIALOG_TITLE: "Confirmar",
       PROMPT: "Tem a certeza de que pretende executar esta acção?",
       ERROR: "Ocorreu um erro ao executar a acção. Tente novamente mais tarde.",
       TOOLTIP: "Executar acção",
       OK: "OK",
       CANCEL: "Cancelar",
       A11Y: "Este botão executa a acção actual."
     },
     THUMBNAIL: {
       TITLE: "Miniatura",
       CHANGE_LINK: "Alterar miniatura...",
       ERROR: "Não foi possível guardar a miniatura. Tente novamente mais tarde.",
       EXT_ERROR: "Seleccione um ficheiro com uma das seguintes extensões suportadas: ${0}",
       SUCCESS: "A miniatura foi alterada",
       UPLOAD: "Guardar",
       CANCEL: "Cancelar"
     },
     UPLOAD_VERSION: {
       LINK: "Transferir nova versão...",
       CHANGE_SUMMARY: "Resumo de alterações opcional...",
       ERROR: "Não foi possível guardar a nova versão. Tente novamente mais tarde.",
       SUCCESS: "A nova versão foi guardada",
       UPLOAD: "Transferir",
       UPLOAD_AND_CHANGE_EXTENSION: "Transferir e alterar extensão",
       CANCEL: "Cancelar"
     },
     OPEN_BY_ID_ERROR: {
       DEFAULT: "Ocorreu um erro ao aceder ao ficheiro. Tente novamente mais tarde.",
       UNAUTHENTICATED: "A sessão excedeu o tempo limite. Tem de iniciar sessão novamente para que possa visualizar o ficheiro.",
       NOT_FOUND: "O ficheiro solicitado foi eliminado ou movido. Se alguém lhe enviou esta ligação, verifique se está correcta.",
       ACCESS_DENIED: "Não tem permissão para visualizar este ficheiro. O ficheiro não está partilhado consigo.",
       ACCESS_DENIED_ANON: "Não tem permissão para visualizar este ficheiro. Se o ficheiro for do utilizador ou se tiver sido partilhado com o mesmo, é necessário iniciar sessão primeiro."
     },
     LOAD_ERROR: {
       DEFAULT: "Ups. Ocorreu um erro ao aceder à ligação.",
       ACCESS_DENIED: "Contacte o proprietário do ficheiro para solicitar permissão para visualizar este ficheiro."
     },
     WINDOW_TITLE: {
       FILE: "${fileName} - Ficheiro",
       LOAD_ERROR: "Erro ao aceder ao ficheiro"
     }
  },

   "pt-br": true,
    "ca": true,
    "cs": true,
    "da": true,
    "nl": true,
    "fi": true,
    "fr": true,
    "de": true,
    "el": true,
    "hu": true,
    "pt": true,
    "it": true,
    "ja": true,
    "ko": true,
    "no": true,
    "pl": true,
    "ru": true,
    "zh": true,
    "sl": true,
    "es": true,
    "sv": true,
    "th": true,
    "zh-tw": true,
    "tr": true
});
