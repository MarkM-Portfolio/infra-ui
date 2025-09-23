/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2014, 2020                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

define({
      FILE_VIEWER_TITLE: "Pré-visualização do ficheiro",
      FILENAME_TOOLTIP: "Editar nome do ficheiro",
      ICON_TOOLTIP: "Descarregar ficheiro",
      ERROR: "Ocorreu um erro.",
      FILE_MALICIOUS: "A verificação revelou conteúdo malicioso",
      SHARED_EXTERNALLY: "Partilhado externamente",
      FILE_SYNCED: "Adicionado à sincronização",
      MY_DRIVE: {
         TITLE: "Em A minha unidade",
         ROOT_FOLDER: "/My Drive",
         FOLDER: "/My Drive/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "Mais acções",
         A11Y: "Abre um menu pendente com uma lista de mais acções a executar no ficheiro.",
            PANELS: {
               TITLE: "Mais",
               A11Y: "Abre um menu pendente com uma lista de painéis ocultos"
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
      SPLIT_ACTION: {
         MENU: {
            TITLE: "Mais opções de edição",
            A11Y: "Este botão abre um menu para mais opções de edição."
         },
         BUTTON: {
            EDIT: {
               TITLE: "Editar"
            },
            UPLOAD: {
               TITLE: "Transferir"
            },
            CREATE: {
              TITLE: "Criar"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "Redimensionar o painel",
           USAGE: "Prima a tecla parêntese recto esquerdo ou parêntese recto direito para redimensionar o painel."
       },
         CLOSE: {
            TOOLTIP: "Fechar",
            A11Y: "Este botão fecha o visualizador de ficheiros.",
            WARNING_DIALOG: {
              DIALOG_TITLE: "O ficheiro ainda está a ser transferido.",
              PROMPT: "O seu ficheiro ainda está em carregamento. Se o fechar antes de concluir, o carregamento será cancelado.",
              OK: "Fechar mesmo assim",
              CANCEL: "Aguardar pela transferência"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "Adicionar aos Ficheiros",
           A11Y: "Este botão adiciona o anexo aos Ficheiros.",
           VIEW_NOW: "Visualizar agora"
         },
         TEAR_OFF: {
           TOOLTIP: "Abrir numa nova janela",
           A11Y: "Abrir numa nova janela",
           ERROR_TEARING_OFF: "Ocorreu um erro ao abrir a nova janela.",
           DIALOG_TITLE: "Confirmar",
           UNSAVED_CHANGES_WARNING: "Tem alterações não guardadas, que serão perdidas. Quer mesmo abrir numa nova janela?",
           OK: "Sim",
           CANCEL: "Não",
           OPEN: "Abrir",
           OPEN_ANYWAY: "Abrir mesmo assim",
           CANCEL_ALT: "Cancelar"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "Novo a partir do ficheiro",
            ACTION_NAME:"Criar ficheiro",
            A11Y: {
               TEXT: "Crie um documento (ficheiro DOC, DOCX ou ODT) a partir de um ficheiro de modelo. Poderá editar estes documentos online no Docs.",
               PRES: "Crie uma apresentação (ficheiro PPT, PPTX ou ODP) a partir de um ficheiro de modelo. Poderá editar estas apresentações online no Docs.",
               SHEET: "Crie uma folha de cálculo (ficheiro XLS, XLSX ou ODS) a partir de um ficheiro de modelo. Poderá editar estas folhas de cálculo online no Docs."
            },
            PROMPT: {
               TEXT: "Crie um documento (ficheiro DOC, DOCX ou ODT) a partir de um ficheiro de modelo. Poderá editar estes documentos online no Docs.",
               PRES: "Crie uma apresentação (ficheiro PPT, PPTX ou ODP) a partir de um ficheiro de modelo. Poderá editar estas apresentações online no Docs.",
               SHEET: "Crie uma folha de cálculo (ficheiro XLS, XLSX ou ODS) a partir de um ficheiro de modelo. Poderá editar estas folhas de cálculo online no Docs."
            },
            NAME_FIELD: "Nome:",
            EXTERNAL_FIELD: "Os ficheiros podem ser partilhados com pessoas externas à minha organização",
            EXTERNAL_DESC: "O acesso externo permite que os ficheiros sejam partilhados com utilizadores externos (pessoas fora da organização ou empresa), pastas partilhadas com utilizadores externos e comunidades com pessoas externas como membros. É necessário definir o acesso externo ao carregar um ficheiro: não é possível ativá-lo posteriormente.",
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
               DUPLICATE_NAME: "Foi encontrado um nome de ficheiro duplicado. Introduza um novo nome.",
               SERVER_ERROR: "O servidor do Connections não está disponível. Contacte a administração do servidor e tente novamente mais tarde."
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
               DEFAULT: "Não foi possível transferir este ficheiro como PDF. Tente novamente mais tarde.",
               UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Tem de iniciar sessão novamente antes de poder transferir o ficheiro como PDF.",
               NOT_FOUND: "Não foi possível descarregar o ficheiro como um PDF, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
               ACCESS_DENIED: "Não foi possível descarregar o ficheiro como um PDF, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "Não existe uma versão publicada deste ficheiro para transferir. Podem ser publicadas versões do editor Docs."
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "Não é possível descarregar o ficheiro",
               CANCEL: "Fechar",
               PROMPT: "Não existe qualquer versão publicada deste ficheiro para transferência.",
               PROMPT2: "As versões podem ser publicadas a partir do editor do Docs."
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "Não é possível descarregar o ficheiro",
               CANCEL: "Fechar",
               PROMPT: "Não existe qualquer versão publicada deste ficheiro para transferência.",
               PROMPT2: "Solicita ao proprietário do ficheiro que publique uma versão deste ficheiro."
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "Descarregar uma versão",
               OK: "Descarregar versão",
               PROMPT: {
                  TODAY: "Foi detetado um rascunho mais recente, editado pela última vez hoje às ${time}.",
                  YESTERDAY: "Foi detetado um rascunho mais recente, editado pela última vez ontem às ${time}.",
                  DAY: "Foi detetado um rascunho mais recente, editado pela última vez a ${date}.",
                  MONTH: "Foi detetado um rascunho mais recente, editado pela última vez a ${date}.",
                  YEAR: "Foi detetado um rascunho mais recente, editado pela última vez a ${date_long}."
               },
               PROMPT2: {
                  TODAY: "Tem a certeza de que pretende continuar a transferir a versão publicada hoje às ${time}?",
                  YESTERDAY: "Tem a certeza de que pretende continuar a transferir a versão publicada ontem às ${time}?",
                  DAY: "Tem a certeza de que pretende continuar a transferir a versão publicada a ${date}?",
                  MONTH: "Tem a certeza de que pretende continuar a transferir a versão publicada a ${date}?",
                  YEAR: "Tem a certeza de que pretende continuar a transferir a versão publicada a ${date_long}?"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "Mostrar painel de detalhes",
            HIDE: "Ocultar painel de detalhes",
            RESET: "Repor tamanho do painel",
            SHOW_A11Y: "Este botão abre e fecha o painel lateral. Neste momento, o painel lateral está fechado.",
            HIDE_A11Y: "Este botão abre e fecha o painel lateral. Neste momento, o painel lateral está aberto.",
            RESET_A11Y: "Este botão repõe o painel lateral para o tamanho predefinido. O painel lateral encontra-se atualmente expandido."
         },
         VIEW_DOC: {
            NAME: "Abrir no Docs Viewer",
            TOOLTIP: "Abrir no Docs Viewer",
            A11Y: "Este botão abre o ficheiro para visualização numa nova janela do navegador."
         },
         EDIT_DOC: {
            NAME: "Editar no Docs",
            TOOLTIP: "Utilizar o HCL Docs para editar este ficheiro",
            A11Y: "Este botão abre o ficheiro para edição no Docs numa nova janela."
         },
         EDIT_OFFICE: {
            TITLE: "Opções de edição.",
            NAME: "Editar no Microsoft Office Online",
            TOOLTIP: "Utilizar o Microsoft Office Online para editar este ficheiro",
            A11Y: "Este botão abre o ficheiro para edição no Microsoft Office Online numa nova janela."
         },
         EDIT_OFFICE_WORD: {
           NAME: "Editar no Microsoft Word Online",
           TOOLTIP: "Utilizar o Microsoft Word Online para editar este ficheiro",
           A11Y: "Este botão abre o ficheiro para edição no Microsoft Word Online numa nova janela."
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "Editar no Microsoft Excel Online",
             TOOLTIP: "Utilizar o Microsoft Excel Online para editar este ficheiro",
             A11Y: "Este botão abre o ficheiro para edição no Microsoft Excel Online numa nova janela."
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "Editar no Microsoft PowerPoint Online",
             TOOLTIP: "Utilizar o Microsoft PowerPoint Online para editar este ficheiro",
             A11Y: "Este botão abre o ficheiro para edição no Microsoft PowerPoint Online numa nova janela."
         },
         OFFICE_EDITED: {
             SUCCESS: "O ficheiro está a ser guardado."
         },
         ROUNDTRIP_EDIT: {
            NAME: "Editar no ambiente de trabalho",
            DIALOG_TITLE: "Editar no ambiente de trabalho",
            TOOLTIP: "Editar este documento",
            A11Y: "Este botão abre o ficheiro para edição local.",
            PROMPT: "Esta funcionalidade permite editar utilizando o software instalado no computador.",
            INSTALL: "Antes de continuar, ${startLink}instale os conectores de ficheiros de ambiente de trabalho${endLink}.",
			// The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "Importante:",
            REMINDER: "Após concluir a edição, publique um rascunho utilizando conectores de ficheiro do ambiente de trabalho.",
            SKIP_DIALOG: "Não mostrar esta mensagem novamente.",
            OK: "OK",
            CANCEL: "Cancelar"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "Confirmar",
            DELETE_VERSION: "Eliminar a versão ${version}",
            DELETE_VERSION_AND_PRIOR: "Eliminar a versão ${version} e todas as versões anteriores",
            PROMPT: "Está prestes a eliminar a versão ${version}. Pretende continuar?",
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
            PROMPT: "Está prestes a substituir a versão atual deste ficheiro pela versão ${version}. Pretende continuar?",
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
            CANCEL: "Cancelar",
            EFSS: {
              DIALOG_TITLE: "Confirmar",
              REMOVE_EVERYONE: "Tem a certeza de que pretende remover o acesso da organização a este ficheiro? Se o acesso for removido, o ficheiro é removido das pastas com permissão de acesso ao nível da organização e apenas o proprietário e as pessoas com quem foi partilhada poderão visualizar e trabalhar com a mesma.",
              REMOVE_USER: "Tem a certeza de que pretende parar a partilha com ${user}? Se parar a partilha, ${user} apenas poderá aceder a este ficheiro através de pastas ou se este for partilhado com todas as pessoas na organização.",
              REMOVE_COMMUNITY: "Tem a certeza de que pretende remover este ficheiro da comunidade ${communityName}?",
              REMOVE_FOLDER: "Tem a certeza de que pretende remover este ficheiro da pasta ${folderName}?",
              REMOVE_EVERYONE_TOOLTIP: "Remover acesso da organização",
              REMOVE_USER_TOOLTIP: "Remover todas as partilhas com ${user}",
              REMOVE_COMMUNITY_TOOLTIP: "Remover da comunidade ${communityName}",
              REMOVE_FOLDER_TOOLTIP: "Remover da pasta ${folderName}",
              OK: "OK",
              CANCEL: "Cancelar",
            }
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
               UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Tem de iniciar sessão novamente antes de poder atualizar a descrição.",
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
                  DEFAULT: "Ocorreu um erro ao acompanhar este ficheiro. Tente novamente mais tarde.",
                  UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Tem de iniciar sessão novamente antes de poder acompanhar este ficheiro.",
                  NOT_FOUND: "Não pode acompanhar este ficheiro, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
                  ACCESS_DENIED: "Não pode acompanhar este ficheiro, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
               },
               UNFOLLOW: {
                  DEFAULT: "Ocorreu um erro ao deixar de acompanhar este ficheiro. Tente novamente mais tarde.",
                  UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Tem de iniciar sessão novamente antes de poder deixar de acompanhar este ficheiro.",
                  NOT_FOUND: "Não pode parar de acompanhar este ficheiro, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
                  ACCESS_DENIED: "Não pode parar de acompanhar este ficheiro, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
               }
            },
            FOLLOW_NAME: "Acompanhar",
            FOLLOW_TOOLTIP: "Acompanhar este ficheiro",
            FOLLOW_A11Y: "Este botão acompanha o ficheiro.",
            FOLLOW_SUCCESS: "Está agora a acompanhar este ficheiro.",
            STOP_FOLLOWING_NAME: "Parar de Acompanhar",
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
                  DEFAULT: "Ocorreu um erro ao adicionar este ficheiro à sincronização. Tente novamente.",
                  UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Tem de iniciar sessão novamente antes de poder adicionar este ficheiro à sincronização.",
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
                  UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Tem de iniciar sessão novamente antes de poder remover este ficheiro da sincronização.",
                  NOT_FOUND: "Não é possível remover este ficheiro da sincronização, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
                  ACCESS_DENIED: "Não é possível remover este ficheiro da sincronização, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
               }
            },
            MYDRIVE: {
                NAME: "Adicionar a A minha unidade",
                TOOLTIP: "Adicionar este ficheiro a A minha unidade",
                A11Y: "Este botão adiciona o ficheiro a A minha unidade.",
                SUCCESS: "Adicionou este ficheiro a A minha unidade.",
                ERROR: {
                   DEFAULT: "Ocorreu um erro ao adicionar este ficheiro a A minha unidade. Tente novamente mais tarde.",
                   UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Tem de iniciar sessão novamente antes de poder adicionar este ficheiro a A minha unidade.",
                   NOT_FOUND: "Não é possível adicionar este ficheiro a A minha unidade, uma vez que o ficheiro foi eliminado ou já não está partilhado consigo.",
                   ACCESS_DENIED: "Não é possível adicionar este ficheiro a A minha unidade, uma vez que o ficheiro foi eliminado ou já não está partilhado consigo."
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "Remover de A minha unidade",
                TOOLTIP: "Remover este ficheiro de A minha unidade",
                A11Y: "Este botão remove o ficheiro de A minha unidade.",
                SUCCESS: "Removeu este ficheiro de A minha unidade.",
                ERROR: {
                   DEFAULT: "Ocorreu um erro ao remover este ficheiro de A minha unidade. Tente novamente mais tarde.",
                   UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Tem de iniciar sessão novamente antes de poder remover este ficheiro de A minha unidade.",
                   NOT_FOUND: "Não é possível remover este ficheiro de A minha unidade, uma vez que o ficheiro foi eliminado ou já não está partilhado consigo.",
                   ACCESS_DENIED: "Não é possível remover este ficheiro de A minha unidade, uma vez que o ficheiro foi eliminado ou já não está partilhado consigo."
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
            PROMPT: "Tem a certeza de que pretende mover este ficheiro para a pasta Lixo? Mover este ficheiro para a pasta Lixo torna o mesmo indisponível para todas as pessoas com quem está a ser partilhado.",
            ERROR: "Ocorreu um erro ao eliminar o ficheiro. Tente novamente mais tarde.",
            TOOLTIP: "Eliminar este ficheiro",
            OK: "OK",
            CANCEL: "Cancelar",
            A11Y: "Este botão move o ficheiro para a pasta Lixo.",
            SUCCESS_MSG: "${file} foi movido para a pasta Lixo."
         },
         REFRESH: {
            NAME: "Atualizar",
            ERROR: "Ocorreu um erro ao atualizar o Visualizador de ficheiros. Tente novamente mais tarde.",
            TOOLTIP: "Actualizar o visualizador de ficheiros",
            INFO_MSG: "Atualize para obter o conteúdo mais recente. ${link}",
            A11Y: "Este botão move o ficheiro para a pasta Lixo.",
            SUCCESS_MSG: "O conteúdo foi actualizado com êxito."
         },
         COPY_FILE: {
            NAME: "Fornecer cópia à comunidade...",
            DIALOG_TITLE: "Confirmar",
            ERROR: "Ocorreu um erro ao copiar o ficheiro. Tente novamente mais tarde.",
            TOOLTIP: "Fornecer uma cópia deste ficheiro a uma comunidade",
            OK: "OK",
            CANCEL: "Cancelar",
            A11Y: "Este botão abre uma caixa de diálogo que permite fornecer uma cópia deste ficheiro a uma comunidade.",
            SUCCESS_MSG: "${file} foi copiado para ${community}."
         },
         TRANSFER_FILE: {
            NAME: "Transferir propriedade...",
            DIALOG_TITLE: "Transferir propriedade",
            TOOLTIP: "Transferir este ficheiro para um novo proprietário",
            A11Y: "Este botão abre uma caixa de diálogo que permite transferir este ficheiro para um novo proprietário.",
            EMPTY: "Vazio"
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
            SUCCESS: "O ficheiro está agora bloqueado.",
            ERROR: "Não foi possível bloquear o ficheiro, uma vez que foi eliminado ou já não é partilhado consigo."
         },
         UNLOCK: {
            NAME: "Desbloquear ficheiro",
            TITLE: "Desbloquear este ficheiro",
            A11Y: "Desbloquear este ficheiro",
            SUCCESS: "O ficheiro está agora desbloqueado.",
            ERROR: "Não foi possível desbloquear o ficheiro, uma vez que foi eliminado ou já não é partilhado consigo."
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
            FILE_DIALOG: {
               DIALOG_TITLE: "Êxito",
               PROMPT: "O ficheiro foi sinalizado e submetido para revisão.",
               CANCEL: "OK"
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
         },
         MODERATION: {
            DIALOG_TITLE: "Êxito",
            PROMPT: "As alterações foram submetidas para análise. Este ficheiro não ficará disponível até que as alterações sejam aprovadas.",
            CANCEL: "OK"
         },
         DROPDOWN_BUTTON: "Botão pendente"
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
            RESET: "Reiniciar",
            ZOOM_IN_A11Y: "Este botão aumenta o zoom na imagem.",
            ZOOM_OUT_A11Y: "Este botão reduz o zoom na imagem.",
            RESET_ZOOM_A11Y: "Este botão reinicia o nível de zoom.",
            UNSAFE_PREVIEW: "Este ficheiro não pode ser pré-visualizado porque não foi verificado para detecção de vírus."
         },
         VIEWER: {
            LOADING: "A carregar...",
            PUBLISHING: "A publicar...",
            NO_PUBLISHED_VERSION: "Não está disponível para visualização uma versão publicada deste ficheiro.",
            IFRAME_TITLE: "Pré-visualização deste ficheiro",
            AUTOPUBLISH_TIMEOUT: "O servidor está a demorar demasiado tempo a responder. As últimas alterações podem não ter sido publicadas."
         },
         VIDEO: {
            UNSAFE_PREVIEW: "Este ficheiro não pode ser pré-visualizado porque não foi verificado para detecção de vírus."
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "Última atualização por ${user} hoje às ${time}",
            YESTERDAY: "Última atualização por ${user} ontem às ${time}",
            DAY: "Última atualização por ${user} em ${EEee} às ${time}",
            MONTH: "Última atualização por ${user} em ${date_long}",
            YEAR: "Última atualização por ${user} em ${date_long}"
         },
         CREATED: {
            TODAY: "Criado por ${user} hoje às ${time}",
            YESTERDAY: "Criado por ${user} ontem às ${time}",
            DAY: "Criado por ${user} ${EEee} às ${time}",
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
         B: "${0} B",
         KB: "${0} KB",
         MB: "${0} MB",
         GB: "${0} GB",
         TB: "${0} TB"
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
         SAVE: "Guardar",
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
            DAY: "Editado em ${EEee} às ${time}",
            MONTH: "Editado em ${date_long}",
            YEAR: "Editado em ${date_long}"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "Guardar",
         CANCEL: "Cancelar",
         USER: "Pessoa",
         COMMUNITY: "Comunidade",
         SHARE: "Partilhar",
         SHARE_ALT: "Partilhar com esta pessoa",
         MEMBER_TYPE: "Tipo de membro",
         PERSON_SHADOW: "Introduzir para localizar pessoa",
         COMMUNITY_SHADOW: "Introduzir para localizar comunidade",
         PERSON_ARIA: "Escreva para localizar uma pessoa. Prima as teclas Shift+Tab para comutar entre pessoas, comunidades e todas as pessoas na organização.",
         COMMUNITY_ARIA: "Escreva para localizar uma comunidade. Prima as teclas Shift+Tab para comutar entre pessoas, comunidades e todas as pessoas na organização.",
         PERSON_FULL_SEARCH: "Pessoa não apresentada? Utilize a procura completa...",
         COMMUNITY_FULL_SEARCH: "Comunidade não apresentada? Utilize a pesquisa completa...",
         ADD_OPTIONAL_MESSAGE: "Adicionar mensagem opcional",
         ROLE_LABEL: "Função",
         ROLE_EDIT: "Editor",
         ROLE_VIEW: "Leitor"
      },
      FILE_STATE: {
         DOCS_FILE: "Este é um ficheiro do Docs. Todas as edições terão de ser feitas online.",
         LOCKED_BY_YOU: {
            TODAY: "Bloqueado por si às ${time}.",
            YESTERDAY: "Bloqueado por si ontem às ${time}.",
            DAY: "Bloqueado por si em ${date}.",
            MONTH: "Bloqueado por si em ${date}.",
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
         A11Y_TEXT: "Abreviar automaticamente este texto",
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
         NO_ENTITLEMENT: "Este ficheiro pode ser editado online por pessoas que têm o HCL Docs.",
         NO_ENTITLEMENT_LINK: "Este ficheiro pode ser editado online por pessoas que têm o ${startLink}HCL Docs${endLink}.",
		 // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "Este ficheiro está a ser editado na Web por ${users}.",
         UNPUBLISHED_CHANGES: "Existem edições a este rascunho que não foram publicadas como uma versão.",
         PUBLISH_A_VERSION: "Publicar uma versão",
         PUBLISH_SUCCESS: "Publicou com êxito uma versão deste ficheiro",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "Não foi possível publicar a versão, uma vez que o acesso foi recusado.",
            NOT_FOUND: "Não foi possível publicar a versão, uma vez que o documento não foi localizado.",
            CANNOT_REACH_REPOSITORY: "Não foi possível publicar a versão, uma vez que o servidor do Docs não consegue estabelecer ligação ao repositório de ficheiros.",
            QUOTA_VIOLATION: "Não foi possível publicar a versão devido a restrições de espaço. Remova outros ficheiros para libertar espaço suficiente para publicar esta versão.",
            CONVERSION_UNAVAILABLE: "Não foi possível publicar a versão, uma vez que o serviço de conversão do Docs não está disponível. Tente novamente mais tarde.",
            TOO_LARGE: "Não foi possível publicar a versão, uma vez que o documento é demasiado grande.",
            CONVERSION_TIMEOUT: "Não foi possível publicar a versão, uma vez que o serviço de conversão do Docs está a demorar demasiado tempo a converter o documento. Tente novamente mais tarde.",
            SERVER_BUSY: "Não foi possível publicar a versão, uma vez que o serviço do Docs não está disponível. Tente novamente mais tarde.",
            DEFAULT: "Não foi possível publicar a versão, uma vez que o serviço do Docs não está disponível. Tente novamente mais tarde."
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "As suas edições estão a ser publicadas. ${startLink}Atualize para ver as alterações.${endLink}",
            GENERIC: "Poderá ter de atualizar a página para ver as alterações mais recentes. ${startLink}Atualizar${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "Não existem comentários.",
         MODERATED: "O comentário foi submetido para revisão e estará disponível após aprovação.",
         ERROR: {
            SAVE: {
               DEFAULT: "Não foi possível guardar o seu comentário. Tente novamente mais tarde.",
               UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Terá de iniciar sessão novamente antes de poder guardar o seu comentário.",
               NOT_FOUND: "Não foi possível guardar o seu comentário, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo.",
               ACCESS_DENIED: "Não foi possível guardar o seu comentário, uma vez que o ficheiro foi eliminado ou já não é partilhado consigo."
            },
            DELETE: {
               DEFAULT: "Não foi possível eliminar o seu comentário. Tente novamente mais tarde.",
               UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Terá de iniciar sessão novamente antes de poder eliminar o comentário.",
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
               ORG: "Todas as pessoas em ${org}"
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
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "O ficheiro foi partilhado com êxito."
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
               ERROR: "Ocorreu um erro ao aprovisionar a conta. Tente novamente mais tarde.",
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
               ERROR: "Ocorreu um erro ao aprovisionar contas. Tente novamente mais tarde.",
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
               ERROR: "Ocorreu um erro ao aprovisionar contas. Tente novamente mais tarde.",
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
            "Todas as partilhas com pessoas, comunidades ou pastas externas serão removidas.${br}${br}A ação de tornar um ficheiro interno é permanente e não pode ser anulada.",
            EFSS: {
               DIALOG_TITLE: "Tornar interno?",
               PROMPT: "Tornar este ficheiro interno significa que deixará de poder ser partilhado com pessoas que não pertencem à organização. ${br}${br}" +
               "Quaisquer partilhas com pessoas ou pastas externas serão removidas.${br}${br}A ação de tornar um ficheiro interno é permanente e não pode ser anulada."
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "Parar a partilha do ficheiro",
            PROMPT: "Tem a certeza de que pretende parar a partilha deste ficheiro?",
            QUESTION_PUBLIC: "Este ficheiro deixará de ser visível para todas as pessoas na organização ou partilhado com pessoas, pastas ou comunidades. Esta operação não pode ser anulada.",
            QUESTION_PUBLIC_E: "Este ficheiro deixará de ser visível para todas as pessoas na organização ou partilhado com pessoas, pastas ou comunidades. Esta operação não pode ser anulada.",
            QUESTION: "O ficheiro deixará de ser partilhado com pessoas ou comunidades e será removido de todas as pastas, excepto das pastas particulares. Esta ação não pode ser anulada.",
            QUESTION_E: "Este ficheiro já não estará partilhado com outras pessoas e será removido de todas as pastas, excepto das suas pastas particulares. Esta ação não pode ser anulada."
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
         USER_PICTURE: "Imagem de ${0}",
         FLAG: "Sinalizar como inadequado"
      },
      PANEL: {
         LOAD_ERROR: "Ocorreu um erro ao aceder aos metadados deste ficheiro.",
         ABOUT: {
            TITLE: "Acerca de",
            EXPAND_BUTTON: "Expandir este botão para visualizar mais informações",
            CURRENT_VERSION_HEADER: "Versão atual: ${versionNumber}",
            FILE_SIZE_HEADER: "Tamanho do ficheiro",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - Versão atual",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - Todas as versões",
            DOCS_DRAFT_UPDATED_HEADER: "Rascunho editado",
            DOCS_DRAFT_CREATED_HEADER: "Rascunho criado",
            DOCS_UPDATED_HEADER: "Publicado",
            DOCS_CREATED_HEADER: "Criado",
            UPDATED_HEADER: "Atualizado",
            CREATED_HEADER: "Criado",
            LIKES_HEADER: "Gostos",
            LIKES_EXPAND_ICON: "Expanda este ícone para visualizar quem gostou do ficheiro",
            DOWNLOADS_HEADER: "Visualizações",
            DOWNLOADS_HEADER_MORE: "Visualizações (${0})",
            DOWNLOADS_EXPAND_ICON: "Expandir este ícone para visualizar quem visualizou o ficheiro",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads} anonimamente",
            DOWNLOADS_LATEST_VERSION: "Tem a versão mais recente deste ficheiro",
            DOWNLOADS_LAST_VERSION: "A última visualização efetuada foi da versão ${0} deste ficheiro",
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
         ERROR: "Ocorreu um erro ao efetuar esta ação. Tente novamente mais tarde.",
         TOOLTIP: "Executar acção",
         OK: "OK",
         CANCEL: "Cancelar",
         A11Y: "Este botão executa a acção actual."
      },
      THUMBNAIL: {
         TITLE: "Miniatura",
         CHANGE_LINK: "Alterar miniatura...",
         ERROR: "Não foi possível guardar a miniatura. Tente novamente mais tarde.",
         EXT_ERROR: "Selecione um ficheiro com uma das seguintes extensões suportadas ${0}",
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
         CANCEL: "Cancelar",
         TOO_LARGE: "${file} é maior do que o tamanho de ficheiro permitido: ${size}.",
         PROGRESS_BAR_TITLE: "A carregar a nova versão (${uploaded} de ${total} concluídos)",
         CANCEL_UPLOAD: "Cancelar transferência"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "Ocorreu um erro ao aceder ao ficheiro. Tente novamente mais tarde.",
         UNAUTHENTICATED: "A sua sessão excedeu o tempo limite. Terá de iniciar sessão novamente antes de poder ver o ficheiro.",
         NOT_FOUND: "O ficheiro solicitado foi eliminado ou movido. Se alguém lhe enviou esta ligação, verifique se está correcta.",
         ACCESS_DENIED: "Não tem permissão para ver este ficheiro. O ficheiro não é partilhado consigo.",
         ACCESS_DENIED_ANON: "Não tem permissão para visualizar este ficheiro. Se o ficheiro for do utilizador ou se tiver sido partilhado com o mesmo, é necessário iniciar sessão primeiro."
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "Erro",
         PROMPT: "O ficheiro solicitado foi eliminado ou movido.",
         CANCEL: "OK"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "Confirmar",
        PROMPT: "A sessão do HCL Connections excedeu o tempo limite.F${lineBreaks}aça clique em OK para iniciar novamente sessão ou em Cancelar para fechar esta caixa de diálogo.",
        OK: "OK",
        CANCEL: "Cancelar"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "Não é possível aceder à ligação",
        PROMPT: "Ocorreu algum problema com o acesso à ligação.${lineBreaks}Faça clique em OK para ser redirecionado para a página.",
        OK: "OK",
        CANCEL: "Cancelar"
      },
      LOAD_ERROR: {
         DEFAULT: "Ups. Ocorreu um erro ao aceder à ligação.",
         ACCESS_DENIED: "Contacte o proprietário do ficheiro para solicitar permissão para visualizar este ficheiro."
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - Ficheiro",
         LOAD_ERROR: "Erro ao aceder ao ficheiro"
      },
      SHARE_WITH_LINK: {
         TITLE: "Partilhar através de ligação",
         EMPTY_DESCRIPTION: "Ainda não criou uma ligação para este ficheiro. Crie uma ligação partilhada para enviar para outras pessoas de forma a que estas possam pré-visualizar e descarregar o ficheiro.",
         CREATE_LINK: "Criar uma ligação",
         COPY_LINK: "Copiar ligação",
         DELETE_LINK: "Eliminar ligação",
         ACCESS_TYPE_1: "Qualquer pessoa com a ligação pode visualizar este ficheiro",
         ACCESS_TYPE_2: "As pessoas na minha organização podem visualizar este ficheiro",
         ACCESS_TYPE_1_DESCRIPTION: "As pessoas que obtiverem a ligação podem pré-visualizar e descarregar este ficheiro depois de iniciar sessão no Connections.",
         ACCESS_TYPE_2_DESCRIPTION: "As pessoas na minha organização que obtiverem a ligação podem pré-visualizar e descarregar este ficheiro depois de iniciar sessão no Connections.",
         CHANGE_TYPE_SUCCESS: "A permissão da ligação é actualizada quando o tipo de acesso é alterado.",
         CHANGE_TYPE_ERROR: "A actualização da permissão de ligação falha quando o tipo de acesso é alterado.",
         COPY_LINK_SUCCESS: "Ligação copiada para a área de transferência",
         CREATE_SHARELINK_SUCCESS:"Ligação criada com êxito.",
         CREATE_SHARELINK_ERROR:"Não é possível criar uma ligação devido a um erro.",
         DELETE_SHARELINK_SUCCESS: "Eliminou a ligação partilhada para \"${file}.\"",
         DELETE_SHARELINK_ERROR: "A ligação partilhada não foi eliminada. Tente novamente mais tarde.",
         CONFIRM_DIALOG: {
            OK: "Eliminar",
            DIALOG_TITLE: "Eliminar a Ligação partilhada",
            PROMPT: "Este ficheiro ficará inacessível para qualquer pessoa que tenha a ligação. Tem a certeza de que pretende eliminar a ligação partilhada?"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "A ligação partilhada está activa. Qualquer pessoa com a ligação pode visualizar este ficheiro. Clique para copiar esta ligação.",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "A ligação partilhada está activa. As pessoas na minha organização podem visualizar este ficheiro. Clique para copiar esta ligação."
      }
});
