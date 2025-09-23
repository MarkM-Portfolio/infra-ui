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
      FILE_VIEWER_TITLE: "檔案預覽",
      FILENAME_TOOLTIP: "編輯檔名",
      ICON_TOOLTIP: "下載檔案",
      ERROR: "發生錯誤。",
      FILE_MALICIOUS: "掃描顯示的惡意內容",
      SHARED_EXTERNALLY: "外部共用",
      FILE_SYNCED: "已新增至同步",
      MY_DRIVE: {
         TITLE: "在「我的磁碟機」中",
         ROOT_FOLDER: "/我的磁碟機",
         FOLDER: "/我的磁碟機/.../${0}"
      },
      MORE_ACTIONS: {
         TITLE: "其他動作",
         A11Y: "開啟包含可對檔案執行之更多動作清單的下拉功能表。",
            PANELS: {
               TITLE: "其他",
               A11Y: "開啟含有隱藏畫面清單的下拉功能表"
            }
      },
      WELCOME: {
         TITLE: "我們已合併檔案視圖和詳細資料",
         SUBTITLE: "現在您可以並列檢視檔案和其評論。",
         LINES: {
            LINE_1: "所有資訊與所有可在舊版頁面上執行的動作皆位於此。",
            LINE_2: "評論、共用、版本及基本資訊皆位於檔案側邊。"
         }
      },
      NAVIGATION: {
         NEXT_A11Y: "此按鈕用來導覽至下一個檔案。",
         PREVIOUS_A11Y: "此按鈕用來導覽至上一個檔案。"
      },
      SPLIT_ACTION: {
         MENU: {
            TITLE: "其他編輯選項",
            A11Y: "此按鈕會開啟其他選項的功能表。"
         },
         BUTTON: {
            EDIT: {
               TITLE: "編輯"
            },
            UPLOAD: {
               TITLE: "上傳"
            },
            CREATE: {
              TITLE: "建立"
            }
         }
      },
      ACTION: {
         RESIZE: {
           RESIZE_BAR: "調整畫面大小",
           USAGE: "按左方括弧或右方括弧鍵來調整畫面大小。"
       },
         CLOSE: {
            TOOLTIP: "關閉",
            A11Y: "此按鈕用來關閉檔案檢視器。",
            WARNING_DIALOG: {
              DIALOG_TITLE: "您的檔案仍在上傳中。",
              PROMPT: "您的檔案仍在上傳中。 如果您要在它完成之前關閉，則會取消上傳。",
              OK: "仍然關閉",
              CANCEL: "等待上傳"
            }
         },
         ADD_TO_FILES: {
           TOOLTIP: "新增至檔案",
           A11Y: "此按鈕會將附件新增至檔案。",
           VIEW_NOW: "立即檢視"
         },
         TEAR_OFF: {
           TOOLTIP: "在新視窗中開啟",
           A11Y: "在新視窗中開啟",
           ERROR_TEARING_OFF: "開啟新視窗時發生錯誤。",
           DIALOG_TITLE: "確認",
           UNSAVED_CHANGES_WARNING: "將會遺失尚未儲存的變更。 仍要開啟新視窗嗎？",
           OK: "是",
           CANCEL: "否",
           OPEN: "公開",
           OPEN_ANYWAY: "仍要開啟",
           CANCEL_ALT: "取消"
         },
         CREATE_FROM_TEMPLATE: {
            NAME: "以檔案為範本新建",
            ACTION_NAME:"建立檔案",
            A11Y: {
               TEXT: "從範本檔建立文件（DOC、DOCX 或 ODT 檔）。 您可以使用 Docs 在線上編輯這些文件。",
               PRES: "從範本檔建立簡報（PPT、PPTX 或 ODP 檔）。 您可以使用 Docs 在線上編輯這些簡報。",
               SHEET: "從範本檔建立試算表（XLS、XLSX 或 ODS 檔）。 您可以使用 Docs 在線上編輯這些試算表。"
            },
            PROMPT: {
               TEXT: "從範本檔建立文件（DOC、DOCX 或 ODT 檔）。 您可以使用 Docs 在線上編輯這些文件。",
               PRES: "從範本檔建立簡報（PPT、PPTX 或 ODP 檔）。 您可以使用 Docs 在線上編輯這些簡報。",
               SHEET: "從範本檔建立試算表（XLS、XLSX 或 ODS 檔）。 您可以使用 Docs 在線上編輯這些試算表。"
            },
            NAME_FIELD: "名稱：",
            EXTERNAL_FIELD: "可以與組織外部的人員共用檔案",
            EXTERNAL_DESC: "「外部存取」容許與外部使用者（組織或公司外部的人員）共用檔案、容許與外部使用者和社群（外部人員為其中成員）共用資料夾。 您必須在上傳檔案時設定外部存取；上傳檔案後就無法啟用外部存取。",
            CREATE_BUTTON: "建立",
            CANCEL: "取消",
            PRE_FILL_NAMES: {
               OTT: "未命名文件",
               OTS: "未命名試算表",
               OTP: "未命名簡報",
               DOT: "未命名文件",
               XLT: "未命名試算表",
               POT: "未命名簡報",
               DOTX: "未命名文件",
               XLTX: "未命名試算表",
               POTX: "未命名簡報"
            },
            ERRORS: {
               NAME_REQUIRED: "需要文件名稱。",
               ILLEGAL_NAME:"這是無效文件標題，請指定另一個文件標題。",
               WARN_LONG_NAME: "文件名稱太長。",
               TRIM_NAME: "要縮短文件名稱嗎？",
               SESSION_TIMEOUT: "階段作業已過期，請登入並重試。",
               DUPLICATE_NAME: "發現重複的檔名。 請輸入新名稱。",
               SERVER_ERROR: "Connections 伺服器無法使用。 請聯絡伺服器管理者，然後再試一次。"
            }
         },
         DOWNLOAD: {
            TOOLTIP: "下載檔案",
            A11Y: "此按鈕用來下載檔案。"
         },
         DOWNLOAD_AS_PDF: {
            NAME: "下載為 PDF",
            TOOLTIP: "將此檔案下載為 PDF 檔",
            A11Y: "此按鈕用來將檔案下載為 PDF 檔。",
            SUCCESS: "您已順利將檔案下載為 PDF 檔。",
            ERROR: {
               DEFAULT: "您無法將檔案下載為 PDF 檔。  請稍後重試。",
               UNAUTHENTICATED: "您的階段作業已逾時。 必須重新登入，才能將檔案下載為 PDF 檔。",
               NOT_FOUND: "無法將檔案下載為 PDF 檔，因為檔案已刪除，或者不再與您共用。",
               ACCESS_DENIED: "無法將檔案下載為 PDF 檔，因為檔案已刪除，或者不再與您共用。"
            },
            DOCS_ERRORS: {
               NO_PUBLISHED_OR_EMPTY: "此檔案沒有已發佈的版本可下載。  可從 Docs 編輯器發佈版本。"
            }
         },
         DOWNLOAD_DOCS_FILE: {
            EMPTY_FILE_EDITOR: {
               DIALOG_TITLE: "無法下載檔案",
               CANCEL: "關閉",
               PROMPT: "此檔案沒有已發佈的版本可下載。",
               PROMPT2: "可從 Docs 編輯器發佈版本。"
            },
            EMPTY_FILE_READER: {
               DIALOG_TITLE: "無法下載檔案",
               CANCEL: "關閉",
               PROMPT: "此檔案沒有已發佈的版本可下載。",
               PROMPT2: "要求檔案擁有者發佈此檔案的版本。"
            },
            NEWER_DRAFT_EXISTS: {
               DIALOG_TITLE: "下載版本",
               OK: "下載版本",
               PROMPT: {
                  TODAY: "已偵測到較新的草稿，今天最後編輯的時間為 ${time}。",
                  YESTERDAY: "已偵測到較新的草稿，昨天最後編輯的時間為 ${time}。",
                  DAY: "已偵測到較新的草稿，前次編輯日期為 ${date}。",
                  MONTH: "已偵測到較新的草稿，前次編輯日期為 ${date}。",
                  YEAR: "已偵測到較新的草稿，前次編輯日期為 ${date_long}。"
               },
               PROMPT2: {
                  TODAY: "確定要繼續下載已在今天 ${time} 發佈的版本嗎？",
                  YESTERDAY: "確定要繼續下載已在昨天 ${time} 發佈的版本嗎？",
                  DAY: "確定要繼續下載已在 ${date} 發佈的版本嗎？",
                  MONTH: "確定要繼續下載已在 ${date} 發佈的版本嗎？",
                  YEAR: "確定要繼續下載已在 ${date_long} 發佈的版本嗎？"
               }
            }
         },
         TOGGLE_PANEL: {
            SHOW: "顯示詳細資料畫面",
            HIDE: "隱藏詳細資料畫面",
            RESET: "重設畫面大小",
            SHOW_A11Y: "此按鈕用來在開啟側畫面和關閉側畫面之間切換。 側畫面目前是關閉的。",
            HIDE_A11Y: "此按鈕用來在開啟側畫面和關閉側畫面之間切換。 側畫面目前是開啟的。",
            RESET_A11Y: "此按鈕會將側畫面重設回預設大小。 側畫面目前是展開的。"
         },
         VIEW_DOC: {
            NAME: "在 Docs 檢視器中開啟",
            TOOLTIP: "在 Docs 檢視器中開啟",
            A11Y: "此按鈕會開啟檔案，以在新的瀏覽器視窗內檢視。"
         },
         EDIT_DOC: {
            NAME: "在 Docs 中編輯",
            TOOLTIP: "使用 HCL Docs 編輯此檔案",
            A11Y: "此按鈕會在新的視窗中以 Docs 開啟檔案以供編輯。"
         },
         EDIT_OFFICE: {
            TITLE: "編輯選項。",
            NAME: "在 Microsoft Office Online 中編輯",
            TOOLTIP: "使用 Microsoft Office Online 編輯此檔案",
            A11Y: "此按鈕會在新的視窗中以 Microsoft Office Online 開啟檔案以供編輯。"
         },
         EDIT_OFFICE_WORD: {
           NAME: "在 Microsoft Word Online 中編輯",
           TOOLTIP: "使用 Microsoft Word Online 編輯此檔案",
           A11Y: "此按鈕會在新的視窗中以 Microsoft Word Online 開啟檔案以供編輯。"
         },
         EDIT_OFFICE_EXCEL: {
             NAME: "在 Microsoft Excel Online 中編輯",
             TOOLTIP: "使用 Microsoft Excel Online 編輯此檔案",
             A11Y: "此按鈕會在新的視窗中以 Microsoft Excel Online 開啟檔案以供編輯。"
         },
         EDIT_OFFICE_POWERPOINT: {
             NAME: "在 Microsoft PowerPoint Online 中編輯",
             TOOLTIP: "使用 Microsoft PowerPoint Online 編輯此檔案",
             A11Y: "此按鈕會在新的視窗中以 Microsoft PowerPoint Online 開啟檔案以供編輯。"
         },
         OFFICE_EDITED: {
             SUCCESS: "檔案現已儲存。"
         },
         ROUNDTRIP_EDIT: {
            NAME: "在桌面上編輯",
            DIALOG_TITLE: "在桌面上編輯",
            TOOLTIP: "編輯此文件",
            A11Y: "此按鈕用來開啟檔案以在本端進行編輯。",
            PROMPT: "此功能可讓您使用電腦上安裝的軟體進行編輯。",
            INSTALL: "繼續之前，請${startLink}安裝桌面檔案連接器${endLink}。", // The text between the start/end link tags will be a link to download an installer
            IMPORTANT: "重要事項：",
            REMINDER: "完成編輯後，使用桌面檔案連接器來發佈草稿。",
            SKIP_DIALOG: "不要再顯示此訊息。",
            OK: "確定",
            CANCEL: "取消"
         },
         DELETE_VERSION: {
            DIALOG_TITLE: "確認",
            DELETE_VERSION: "刪除第 ${version} 版",
            DELETE_VERSION_AND_PRIOR: "刪除版本 ${version} 及所有較舊版本",
            PROMPT: "即將刪除版本 ${version}。 您要繼續進行嗎？",
            DELETE_PRIOR: "同時，也會刪除所有較舊版本",
            ERROR: "刪除版本時發生錯誤。 請稍後重試。",
            TOOLTIP: "刪除此版本",
            OK: "確定",
            CANCEL: "取消"
         },
         GET_LINKS: {
            DIALOG_TITLE: "取得鏈結",
            LINK_FILE: "檔案鏈結：",
            LINK_PREVIEW: "預覽檔案鏈結：",
            LINK_DOWNLOAD: "下載檔案鏈結：",
            TOOLTIP: "檔案鏈結",
            OK: "關閉"
         },
         DOWNLOAD_VERSION: {
            TOOLTIP: "下載此版本"
         },
         RESTORE_VERSION: {
            DIALOG_TITLE: "確認",
            PROMPT: "此檔案的現行版本即將取代為版本 ${version}。 您要繼續進行嗎？",
            ERROR: "還原版本時發生錯誤。 請稍後重試。",
            TOOLTIP: "還原此版本",
            CHANGE_SUMMARY: "已從第 ${version} 版還原",
            OK: "確定",
            CANCEL: "取消"
         },
         STOP_SHARING: {
            DIALOG_TITLE: "確認",
            REMOVE_EVERYONE: "確定要移除您組織對此檔案的存取權嗎？ 如果移除存取權，則會從容許組織層級存取的資料夾和社群中移除該檔案，只有擁有者和已共用該檔案的人員可以檢視及使用。",
            REMOVE_USER: "確定要停止與 ${user} 共用嗎？ 如果您停止共用，則只有透過資料夾或僅在與組織中的每個人共用此檔案時，${user} 才能存取此檔案。",
            REMOVE_COMMUNITY: "確定要從社群 ${communityName} 中移除此檔案嗎？",
            REMOVE_FOLDER: "確定要從資料夾 ${folderName} 中移除此檔案嗎？",
            REMOVE_EVERYONE_TOOLTIP: "移除您組織的存取權",
            REMOVE_USER_TOOLTIP: "移除與 ${user} 的所有共用",
            REMOVE_COMMUNITY_TOOLTIP: "從社群 ${communityName} 中移除",
            REMOVE_FOLDER_TOOLTIP: "從資料夾 ${folderName} 中移除",
            OK: "確定",
            CANCEL: "取消",
            EFSS: {
              DIALOG_TITLE: "確認",
              REMOVE_EVERYONE: "確定要移除您組織對此檔案的存取權嗎？ 如果移除存取權，則會從容許組織層級存取的資料夾中移除該檔案，只有擁有者和已共用該檔案的人員可以檢視及使用。",
              REMOVE_USER: "確定要停止與 ${user} 共用嗎？ 如果您停止共用，則只有透過資料夾或僅在與組織中的每個人共用此檔案時，${user} 才能存取此檔案。",
              REMOVE_COMMUNITY: "確定要從社群 ${communityName} 中移除此檔案嗎？",
              REMOVE_FOLDER: "確定要從資料夾 ${folderName} 中移除此檔案嗎？",
              REMOVE_EVERYONE_TOOLTIP: "移除您組織的存取權",
              REMOVE_USER_TOOLTIP: "移除與 ${user} 的所有共用",
              REMOVE_COMMUNITY_TOOLTIP: "從社群 ${communityName} 中移除",
              REMOVE_FOLDER_TOOLTIP: "從資料夾 ${folderName} 中移除",
              OK: "確定",
              CANCEL: "取消",
            }
         },
         EDIT_COMMENT: {
            TOOLTIP: "編輯此評論"
         },
         DELETE_COMMENT: {
            DIALOG_TITLE: "確認",
            PROMPT: "確定要刪除此評論嗎？",
            ERROR: "刪除評論時發生錯誤。 請稍後重試。",
            TOOLTIP: "刪除此評論",
            OK: "確定",
            CANCEL: "取消"
         },
         LIKE: {
            LIKE: "對此檔案按讚",
            UNLIKE: "對此檔案取消讚",
            LIKE_A11Y: "此按鈕用來對此檔案按讚。",
            UNLIKE_A11Y: "此按鈕用來對此檔案取消讚。",
            LIKED_SUCCESS: "您已對此檔案按讚",
            UNLIKE_SUCCESS: "您已對此檔案取消讚"
         },
         EDIT_DESCRIPTION: {
            TOOLTIP: "編輯說明",
            ERROR: {
               DEFAULT: "無法儲存說明。 請稍後重試。",
               UNAUTHENTICATED: "您的階段作業已逾時。 您必須重新登入，然後才能更新說明。",
               NOT_FOUND: "因為檔案已刪除或不再與您共用，因此無法儲存說明。",
               ACCESS_DENIED: "因為檔案已刪除或不再與您共用，因此無法儲存說明。"
            }
         },
         EDIT_FILENAME: {
            ERROR: {
               DEFAULT: "儲存檔名時發生錯誤",
               CONFLICT: "檔名已存在"
            }
         },
         TOGGLE_FOLLOW: {
            ERROR: {
               FOLLOW: {
                  DEFAULT: "追蹤此檔案時發生錯誤。 請稍後重試。",
                  UNAUTHENTICATED: "您的階段作業已逾時。 您必須重新登入，然後才能追蹤此檔案。",
                  NOT_FOUND: "因為此檔案已刪除或不再與您共用，所以您無法追蹤此檔案。",
                  ACCESS_DENIED: "因為此檔案已刪除或不再與您共用，所以您無法追蹤此檔案。"
               },
               UNFOLLOW: {
                  DEFAULT: "停止追蹤此檔案時發生錯誤。 請稍後重試。",
                  UNAUTHENTICATED: "您的階段作業已逾時。 您必須重新登入，然後才能停止追蹤此檔案。",
                  NOT_FOUND: "因為此檔案已刪除或不再與您共用，所以您無法停止追蹤此檔案。",
                  ACCESS_DENIED: "因為此檔案已刪除或不再與您共用，所以您無法停止追蹤此檔案。"
               }
            },
            FOLLOW_NAME: "追蹤",
            FOLLOW_TOOLTIP: "追蹤此檔案",
            FOLLOW_A11Y: "此按鈕會追蹤檔案。",
            FOLLOW_SUCCESS: "您現在正在追蹤此檔案。",
            STOP_FOLLOWING_NAME: "停止追蹤",
            STOP_FOLLOWING_TOOLTIP: "停止追蹤此檔案",
            STOP_FOLLOWING_A11Y: "此按鈕會停止追蹤檔案。",
            STOP_FOLLOWING_SUCCESS: "您已停止追蹤此檔案。"
         },
         TOGGLE_SYNC: {
            SYNC: {
               NAME: "新增至「同步」",
               TOOLTIP: "將此檔案新增至同步",
               A11Y: "此按鈕會將檔案新增至同步。",
               SUCCESS: "您已將此檔案新增至同步。",
               ERROR: {
                  DEFAULT: "將此檔案新增至同步時發生錯誤。 請稍後重試。",
                  UNAUTHENTICATED: "您的階段作業已逾時。 必須重新登入，才能將此檔案新增至同步。",
                  NOT_FOUND: "無法將此檔案新增至同步，因為此檔案已刪除，或者不再與您共用。",
                  ACCESS_DENIED: "無法將此檔案新增至同步，因為此檔案已刪除，或者不再與您共用。"
               }
            },
            STOP_SYNC: {
               NAME: "從「同步」中移除",
               TOOLTIP: "從同步中移除此檔案",
               A11Y: "此按鈕會將檔案從同步中移除。",
               SUCCESS: "您已從同步中移除此檔案。",
               ERROR: {
                  DEFAULT: "從同步中移除此檔案時發生錯誤。 請稍後重試。",
                  UNAUTHENTICATED: "您的階段作業已逾時。 必須重新登入，才能從同步中移除此檔案。",
                  NOT_FOUND: "無法從同步中移除此檔案，因為此檔案已刪除，或者不再與您共用。",
                  ACCESS_DENIED: "無法從同步中移除此檔案，因為此檔案已刪除，或者不再與您共用。"
               }
            },
            MYDRIVE: {
                NAME: "新增至「我的磁碟機」",
                TOOLTIP: "將此檔案新增至「我的磁碟機」",
                A11Y: "此按鈕會將檔案新增至「我的磁碟機」。",
                SUCCESS: "您已將此檔案新增至「我的磁碟機」。",
                ERROR: {
                   DEFAULT: "將此檔案新增至「我的磁碟機」時發生錯誤。 請稍後重試。",
                   UNAUTHENTICATED: "您的階段作業已逾時。 必須重新登入，才能將此檔案新增至「我的磁碟機」。",
                   NOT_FOUND: "無法將此檔案新增至「我的磁碟機」，因為此檔案已刪除，或者不再與您共用。",
                   ACCESS_DENIED: "無法將此檔案新增至「我的磁碟機」，因為此檔案已刪除，或者不再與您共用。"
                }
             },
             REMOVE_MYDRIVE: {
                NAME: "從「我的磁碟機」中移除",
                TOOLTIP: "將此檔案從「我的磁碟機」中移除",
                A11Y: "此按鈕會將檔案從「我的磁碟機」中移除。",
                SUCCESS: "您已將此檔案從「我的磁碟機」中移除。",
                ERROR: {
                   DEFAULT: "將此檔案從「我的磁碟機」中移除時發生錯誤。 請稍後重試。",
                   UNAUTHENTICATED: "您的階段作業已逾時。 必須重新登入，才能將此檔案從「我的磁碟機」中移除。",
                   NOT_FOUND: "無法將此檔案從「我的磁碟機」中移除，因為此檔案已刪除，或者不再與您共用。",
                   ACCESS_DENIED: "無法將此檔案從「我的磁碟機」中移除，因為此檔案已刪除，或者不再與您共用。"
                }
             }
         },
         TOGGLE_FAVORITE: {
            FAVORITE_NAME: "釘選",
            FAVORITE_TOOLTIP: "釘選此檔案",
            FAVORITE_A11Y: "此按鈕用來釘選檔案。",
            FAVORITE_SUCCESS: "您已釘選此檔案。",
            STOP_FAVORITEING_NAME: "取消釘選",
            STOP_FAVORITEING_TOOLTIP: "取消釘選此檔案",
            STOP_FAVORITEING_A11Y: "此按鈕用來取消釘選檔案。",
            STOP_FAVORITEING_SUCCESS: "您已取消釘選此檔案。"
         },
         TRASH: {
            NAME: "移至垃圾桶",
            DIALOG_TITLE: "確認",
            PROMPT: "確定要將此檔案移至垃圾桶嗎？ 將此檔案移至垃圾桶，會使目前共用該檔案的所有人都無法使用它。",
            ERROR: "刪除檔案時發生錯誤。 請稍後重試。",
            TOOLTIP: "刪除此檔案",
            OK: "確定",
            CANCEL: "取消",
            A11Y: "此按鈕會將檔案移至垃圾桶。",
            SUCCESS_MSG: "${file} 已移至垃圾桶。"
         },
         REFRESH: {
            NAME: "重新整理",
            ERROR: "重新整理檔案檢視器時發生錯誤。 請稍後重試。",
            TOOLTIP: "重新整理檔案檢視器",
            INFO_MSG: "重新整理以取得最新內容。 ${link}",
            A11Y: "此按鈕會將檔案移至垃圾桶。",
            SUCCESS_MSG: "已順利重新整理內容。"
         },
         COPY_FILE: {
            NAME: "提供副本給社群",
            DIALOG_TITLE: "確認",
            ERROR: "複製檔案時發生錯誤。 請稍後重試。",
            TOOLTIP: "將此檔案的副本提供給社群",
            OK: "確定",
            CANCEL: "取消",
            A11Y: "此按鈕會開啟一個對話框，讓您可將此檔案的副本提供給社群。",
            SUCCESS_MSG: "${file} 已複製到 ${community}。"
         },
         TRANSFER_FILE: {
            NAME: "轉讓所有權...",
            DIALOG_TITLE: "轉讓所有權",
            TOOLTIP: "將這個檔案傳送給新的擁有者",
            A11Y: "此按鈕會開啟一個對話框，讓您可將這個檔案傳送給新的擁有者。",
            EMPTY: "清空"
         },
         UPLOAD_VERSION: {
            NAME: "上傳新版本",
            NAME_SHORT: "上傳",
            CHANGE_SUMMARY: "選用的變更摘要...",
            TOOLTIP: "上傳這個檔案的新版本",
            A11Y: "此按鈕會開啟一個對話框，讓您上傳這個檔案的新版本。"
         },
         LOG_IN: {
            NAME: "登入",
            TOOLTIP: "登入以上傳及共用檔案、評論並建立資料夾。"
         },
         LOCK: {
            NAME: "鎖定檔案",
            TITLE: "鎖定此檔案",
            A11Y: "鎖定此檔案",
            SUCCESS: "該檔案現已鎖定。",
            ERROR: "因為檔案已刪除或者不再與您共用，所以無法鎖定它。"
         },
         UNLOCK: {
            NAME: "解除鎖定檔案",
            TITLE: "解除鎖定此檔案",
            A11Y: "解除鎖定此檔案",
            SUCCESS: "該檔案現已解除鎖定。",
            ERROR: "因為檔案已被刪除或不再與您共用，所以無法將它解除鎖定。"
         },
         EDIT_ON_DESKTOP: {
            NAME: "在桌面上編輯",
            TITLE: "在桌面上編輯",
            A11Y: "在桌面上編輯"
         },
         FLAG: {
            FILE: {
               NAME: "標示為不適當",
               TITLE: "標示檔案",
               A11Y: "將此檔案標示為不適當",
               PROMPT: "提供標示此檔案的理由（選用）：",
               OK: "標示",
               CANCEL: "取消",
               SUCCESS: "已標示並提交檔案以供檢閱。",
               ERROR: "標示此檔案時發生錯誤，請稍後重試。"
            },
            FILE_DIALOG: {
               DIALOG_TITLE: "順利完成",
               PROMPT: "已標示並提交檔案以供檢閱。",
               CANCEL: "確定"
            },
            COMMENT: {
               NAME: "標示為不適當",
               TITLE: "標示評論",
               A11Y: "將此評論標示為不適當",
               PROMPT: "提供標示此評論的理由（選用）：",
               OK: "標示",
               CANCEL: "取消",
               SUCCESS: "已標示並提交評論以供檢閱。",
               ERROR: "標示此評論時發生錯誤，請稍後重試。"
            }
         },
         MODERATION: {
            DIALOG_TITLE: "順利完成",
            PROMPT: "已提交變更以供檢閱。 在核准該變更之前，無法使用此檔案。",
            CANCEL: "確定"
         },
         DROPDOWN_BUTTON: "下拉按鈕"
      },
      SECTION: {
         ABOUT: {
            NAME: "關於此檔案",
            VIEW_FILE_DETAILS: "檢視檔案詳細資料",
            A11Y: "啟動此鏈結會關閉檔案檢視器，並且將您導向至這個檔案的檔案詳細資料頁面。"
         }
      },
      PREVIEW: {
         ICON: {
            PREVIEW_NOT_AVAILABLE: "無法預覽此檔案。"
         },
         IMAGE: {
            ZOOM_IN: "放大",
            ZOOM_OUT: "縮小",
            RESET: "重設",
            ZOOM_IN_A11Y: "此按鈕用來放大影像。",
            ZOOM_OUT_A11Y: "此按鈕用來縮小影像。",
            RESET_ZOOM_A11Y: "此按鈕用來重設縮放比例。",
            UNSAFE_PREVIEW: "因為未對此檔案掃描是否有病毒，無法預覽此檔案。"
         },
         VIEWER: {
            LOADING: "載入中...",
            PUBLISHING: "發佈中...",
            NO_PUBLISHED_VERSION: "此檔案沒有發佈版本可供檢視。",
            IFRAME_TITLE: "預覽此檔案",
            AUTOPUBLISH_TIMEOUT: "伺服器需要太長的時間來回應。  可能尚未發佈最新的變更。"
         },
         VIDEO: {
            UNSAFE_PREVIEW: "因為未對此檔案掃描是否有病毒，無法預覽此檔案。"
         }
      },
      DATE: {
         LAST_UPDATED: {
            TODAY: "前次更新是由 ${user} 在今天 ${time} 完成",
            YESTERDAY: "前次更新是由 ${user} 在昨天 ${time} 完成",
            DAY: "前次更新是由 ${user} 在 ${EEee} ${time} 完成",
            MONTH: "前次更新是由 ${user} 在 ${date_long} 完成",
            YEAR: "前次更新是由 ${user} 在 ${date_long} 完成"
         },
         CREATED: {
            TODAY: "由 ${user} 在今天 ${time} 建立",
            YESTERDAY: "由 ${user} 在昨天 ${time} 建立",
            DAY: "由 ${user} 在 ${EEee} ${time} 建立",
            MONTH: "由 ${user} 在 ${date_long} 建立",
            YEAR: "由 ${user} 在 ${date_long} 建立"
         },
         LONG: {
            TODAY: "${EEEE}${date_long}${time_long}",
            YESTERDAY: "${EEEE}${date_long}${time_long}",
            DAY: "${EEEE}${date_long}${time_long}",
            MONTH: "${date_long}${time_long}",
            YEAR: "${date_long}${time_long}"
         },
         SHORT: {
            TODAY: "${time} - 今天",
            YESTERDAY: "${time} - 昨天",
            DAY: "${time} - ${EEee}",
            MONTH: "${time} - ${date_long}",
            YEAR: "${time} - ${date_long}"
         },
         VERY_SHORT: {
            TODAY: "今天",
            YESTERDAY: "昨天",
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
         TITLE: "評論文字區",
         SHADOW_TEXT: "新增評論...",
         CANNOT_ACCESS_CONTENT: "您提及的下列人員無法檢視評論，因為他們無權存取內容：",
         ERROR: "驗證您試圖提及的使用者時發生錯誤。",
         POST: "張貼",
         SAVE: "儲存",
         CANCEL: "取消",
         EXTERNAL_WARNING: "組織外部的人員可以看見評論。"
      },
      EDIT_BOX: {
         SAVE: "儲存",
         CANCEL: {
            TOOLTIP: "取消",
            A11Y: "此按鈕會取消編輯檔案名稱的動作。"
         },
         INVALID_CHARACTERS: "字元無效",
         INVALID_CHARACTERS_REMOVED: "已移除無效字元"
      },
      COMMENT_WIDGET: {
         EDITED: "（已編輯）",
         EDITED_DATE: {
            TODAY: "已於今天 ${time} 編輯",
            YESTERDAY: "已於昨天 ${time} 編輯",
            DAY: "於 ${EEee} ${time} 編輯",
            MONTH: "已於 ${date_long} 編輯",
            YEAR: "已於 ${date_long} 編輯"
         }
      },
      TYPEAHEAD_BOX: {
         SAVE: "儲存",
         CANCEL: "取消",
         USER: "人員",
         COMMUNITY: "社群",
         SHARE: "共用",
         SHARE_ALT: "與此人員共用",
         MEMBER_TYPE: "成員類型",
         PERSON_SHADOW: "鍵入以尋找人員",
         COMMUNITY_SHADOW: "鍵入以尋找社群",
         PERSON_ARIA: "鍵入以尋找人員。  按 Shift+Tab 鍵在人員、社群及組織中的每個人之間切換。",
         COMMUNITY_ARIA: "鍵入以尋找社群。  按 Shift+Tab 鍵在人員、社群及組織中的每個人之間切換。",
         PERSON_FULL_SEARCH: "此人未列出， 請使用完整搜尋...",
         COMMUNITY_FULL_SEARCH: "未列出社群？ 請使用完整搜尋...",
         ADD_OPTIONAL_MESSAGE: "新增選用訊息",
         ROLE_LABEL: "角色",
         ROLE_EDIT: "編輯者",
         ROLE_VIEW: "讀者"
      },
      FILE_STATE: {
         DOCS_FILE: "這是 Docs 檔案。 所有編輯都必須在線上進行。",
         LOCKED_BY_YOU: {
            TODAY: "已於 ${time} 由您鎖定。",
            YESTERDAY: "已於昨天 ${time} 由您鎖定。",
            DAY: "已於 ${date} 由您鎖定。",
            MONTH: "已於 ${date} 由您鎖定。",
            YEAR: "已於 ${date_long} 由您鎖定。"
         },
         LOCKED_BY_OTHER: {
            TODAY: "已由 ${user} 於 ${time} 鎖定。",
            YESTERDAY: "已由 ${user} 於昨天 ${time} 鎖定。",
            DAY: "已由 ${user} 於 ${date} 鎖定。",
            MONTH: "已由 ${user} 於 ${date} 鎖定。",
            YEAR: "已由 ${user} 於 ${date_long} 鎖定。"
         }
      },
      VALIDATION: {
         A11Y_TEXT: "自動縮短此文字",
         COMMENT: {
            WARN_TOO_LONG: "評論太長。",
            TRIM: "要縮短評論嗎？"
         },
         DESCRIPTION: {
            WARN_TOO_LONG: "說明太長。",
            TRIM: "要縮短說明嗎？"
         },
         SHARE_MESSAGE: {
            WARN_TOO_LONG: "訊息太長。",
            TRIM: "要縮短訊息嗎？"
         },
         TAG: {
            WARN_TOO_LONG: "標籤太長。",
            TRIM: "要縮短標籤嗎？"
         },
         TAGS: {
            WARN_TOO_LONG: "一個以上標籤太長。",
            TRIM: "要縮短標籤嗎？"
         },
         FILENAME: {
            WARN_TOO_LONG: "檔名太長"
         }
      },
      DOCS_STATUS_MESSAGE: {
         NO_ENTITLEMENT: "此檔案可以由擁有 HCL Docs 的人員進行線上編輯。",
         NO_ENTITLEMENT_LINK: "此檔案可以由擁有 ${startLink}HCL Docs${endLink} 的人員進行線上編輯。", // When configured, "HCL Docs" will be a link to more information about the product
         CURRENT_EDITORS: "此檔案目前正由 ${users} 在 Web 上編輯。",
         UNPUBLISHED_CHANGES: "此草稿有尚未發佈為版本的編輯內容。",
         PUBLISH_A_VERSION: "發佈版本",
         PUBLISH_SUCCESS: "您已順利發佈此檔案的版本",
         PUBLISH_ERROR: {
            ACCESS_DENIED: "因為存取遭拒，所以無法發佈版本。",
            NOT_FOUND: "因為找不到文件，所以無法發佈版本。",
            CANNOT_REACH_REPOSITORY: "因為 Docs 伺服器無法連接至檔案儲存庫，所以無法發佈版本。",
            QUOTA_VIOLATION: "由於空間限制，無法發佈版本。 請移除其他檔案，以釋出足夠空間來發佈此版本。",
            CONVERSION_UNAVAILABLE: "因為無法使用 Docs 轉換服務，所以無法發佈版本。 請稍後重試。",
            TOO_LARGE: "因為文件太大，所以無法發佈版本。",
            CONVERSION_TIMEOUT: "因為 Docs 轉換服務花費太長時間來轉換文件，所以無法發佈版本。 請稍後重試。",
            SERVER_BUSY: "因為 Docs 伺服器忙碌，所以無法發佈版本。 請稍後重試。",
            DEFAULT: "因為無法使用 Docs 服務，所以無法發佈版本。 請稍後重試。"
         },
         AUTOPUBLISH: {
            // The text between the start/end link tags will be links to refresh the content
            IN_PROGRESS: "正在發佈您的編輯。 ${startLink}重新整理以查看您的變更${endLink}。",
            GENERIC: "可能需要重新整理頁面才能查看最新的變更。  ${startLink}重新整理${endLink}"
         }
      },
      COMMENTS: {
         EMPTY: "沒有任何評論。",
         MODERATED: "已提交評論以供檢閱，經核准後方可使用。",
         ERROR: {
            SAVE: {
               DEFAULT: "無法儲存您的評論。 請稍後重試。",
               UNAUTHENTICATED: "您的階段作業已逾時。 您必須重新登入，然後才能儲存您的評論。",
               NOT_FOUND: "因為檔案已刪除或者不再與您共用，所以無法儲存您的評論。",
               ACCESS_DENIED: "因為檔案已刪除或者不再與您共用，所以無法儲存您的評論。"
            },
            DELETE: {
               DEFAULT: "無法刪除您的評論。 請稍後重試。",
               UNAUTHENTICATED: "您的階段作業已逾時。 您必須重新登入，然後才能刪除您的評論。",
               NOT_FOUND: "因為檔案已刪除或者不再與您共用，所以無法刪除您的評論。",
               ACCESS_DENIED: "因為檔案已刪除或者不再與您共用，所以無法刪除您的評論。"
            }
         }
      },
      TAG_WIDGET: {
         ADD_TOOLTIP: "儲存",
         EDIT_TAGS: "編輯標籤",
         ERROR: {
            SAVE: {
               DEFAULT: "無法建立標籤。 請稍後重試。"
            },
            DELETE: {
               DEFAULT: "無法刪除標籤。 請稍後重試。"
            }
         }
      },
      EXPANDABLE_TEXT: {
         READ_MORE: "閱讀更多...",
         READ_LESS: "閱讀更少..."
      },
      SHARE: {
         EVERYONE: "我組織中的每個人",
         ADD_TOOLTIP: "儲存",
         ROLES: {
            OWNER: "擁有者",
            EDIT: "編輯者",
            VIEW: "讀者",
            FOLDER: "透過資料夾共用"
         },
         USERROLE: "${userRole} - ${sharedUserCount}",
         ACTION: {
            OWNER: {
               ROLE: "擁有者"
            },
            EDIT: {
               ROLE: "編輯",
               ADD: "新增編輯者"
            },
            VIEW: {
               ROLE: "讀者",
               ADD: "新增讀者"
            },
            FOLDER: {
               ADD: "新增資料夾",
               COMMUNITY_ADD: "新增至資料夾",
               MOVE: "移至資料夾"
            },
            MULTI: {
               ADD: "新增人員或社群",
               ADD_PEOPLE: "新增人員"
            }
         },
         PUBLIC: {
            SHORT: "我組織中的每個人",
            LONG: {
               GENERIC: "您組織中的每個人",
               ORG: "${org} 中的每個人"
            }
         },
         SHARE_FAIL: {
            EXISTING_USER: "此檔案已與 ${user} 共用。",
            ERROR: "此時無法與 ${user} 共用。",
            SELF: "您不能與自己共用。"
         },
         SHARE_INFO: {
            PROMOTED: "${user} 已升級至更高的共用角色。"
         },
         SHARE_SUCCESS: {
            SUCCESS: "已順利地與 ${user} 共用"
         },
         MULTI_SHARE_SUCCESS: {
            SUCCESS: "已順利共用檔案。"
         },
         MESSAGE_BOX: {
            HINT_TEXT: "選用訊息..."
         },
         PROVISION_EXTERNAL_USER_DIALOG: {
            SINGULAR: {
               NAME: "佈建外部使用者",
               ACTION: "佈建外部使用者...",
               TOOLTIP: "佈建外部使用者",
               DIALOG_TITLE: "尚未共用內容",
               PROMPT: {
                  NO_ACCOUNT: "下列使用者沒有帳號，因此未與其共用任何內容。",
                  INVITE: "邀請此使用者作為來賓以與其共用內容。"
               },
               SUBMIT: "繼續邀請",
               CANCEL: "取消",
               ERROR: "佈建帳號時發生錯誤。 請稍後重試。",
               SUCCESS: "已順利佈建使用者帳號。"
            },
            PLURAL: {
               NAME: "佈建外部使用者",
               ACTION: "佈建外部使用者...",
               TOOLTIP: "佈建外部使用者",
               DIALOG_TITLE: "尚未共用內容",
               PROMPT: {
                  NO_ACCOUNT: "下列使用者沒有帳號，因此未與其共用任何內容。",
                  INVITE: "邀請這些使用者作為來賓以與其共用內容。"
               },
               SUBMIT: "繼續邀請",
               CANCEL: "取消",
               ERROR: "佈建帳號時發生錯誤。 請稍後重試。",
               SUCCESS: "已順利佈建使用者帳號。"
            },
            ABSTRACT: {
               NAME: "佈建外部使用者",
               ACTION: "佈建外部使用者...",
               TOOLTIP: "佈建外部使用者",
               DIALOG_TITLE: "尚未共用內容",
               PROMPT: {
                  NO_ACCOUNT: "部分使用者沒有帳號，因此未與其共用任何內容。",
                  INVITE: "邀請這些使用者作為來賓以與其共用內容。"
               },
               SUBMIT: "繼續邀請",
               CANCEL: "取消",
               ERROR: "佈建帳號時發生錯誤。 請稍後重試。",
               SUCCESS: "已順利佈建使用者帳號。"
            }
         }
      },
      SHARE_OPTIONS: {
         TITLE: "共用選項",
         PROPAGATION: "容許其他人共用此檔案",
         EVERYONE: "每個人都可以共用此檔案。",
         OWNER_ONLY: "只有擁有者才能共用此檔案。",
         STOP_SHARE: "停止共用",
         MAKE_INTERNAL: "停止外部共用",
         MAKE_INTERNAL_SUCCESS: "再也無法與組織外部人員共用此檔案。",
         MAKE_INTERNAL_DIALOG: {
            DIALOG_TITLE: "設定為內部？",
            PROMPT: "將此檔案設定為內部，意味著再也無法與組織外部人員共用此檔案。 ${br}${br}" +
            "將會移除與外部人員、社群或資料夾的所有共用。${br}${br}將檔案設定為內部，是永久性動作且無法復原。",
            EFSS: {
               DIALOG_TITLE: "設定為內部？",
               PROMPT: "將此檔案設定為內部，意味著再也無法與組織外部人員共用此檔案。 ${br}${br}" +
               "將會移除與外部人員或資料夾的所有共用。${br}${br}將檔案設定為內部，是永久性動作且無法復原。"
            }
         },
         MAKE_PRIVATE_DIALOG: {
            DIALOG_TITLE: "停止共用檔案",
            PROMPT: "確定要停止共用此檔案嗎？",
            QUESTION_PUBLIC: "組織中每個人都再也看不見此檔案，或是不再與人員、資料夾或社群共用此檔案。 此作業無法復原。",
            QUESTION_PUBLIC_E: "組織中每個人都再也看不見此檔案，或是不再與人員或資料夾共用此檔案。 此作業無法復原。",
            QUESTION: "將不再與人員或社群共用此檔案，並且會從除了您的專用資料夾以外的所有資料夾中移除此檔案。 此動作無法復原。",
            QUESTION_E: "將不再與人員共用此檔案，並且會從除了您的專用資料夾以外的所有資料夾中移除此檔案。 此動作無法復原。"
         },
         MAKE_PRIVATE_SUCCESS: "此檔案現在為專用。",
         MAKE_PRIVATE_ERROR: {
            DEFAULT: "無法停止共用檔案。 請稍後重試。"
         }
      },
      SHARE_LINK: {
         MY_SHARES: "我的共用"
      },
      STREAM: {
         LOADING: "載入中...",
         LOAD_MORE: "載入更多..."
      },
      ENTRY: {
         REMOVE: "移除",
         RESTORE: "還原",
         EDIT: "編輯",
         DELETE: "刪除",
         OK: "確定",
         CANCEL: "取消",
         USER_PICTURE: "${0} 的照片",
         FLAG: "標示為不適當"
      },
      PANEL: {
         LOAD_ERROR: "存取此檔案的 meta 資料時發生錯誤。",
         ABOUT: {
            TITLE: "關於",
            EXPAND_BUTTON: "展開此按鈕以查看相關資訊",
            CURRENT_VERSION_HEADER: "現行版本 ${versionNumber}",
            FILE_SIZE_HEADER: "檔案大小",
            CURRENT_VERSION_FILE_SIZE: "${fileSize} - 現行版本",
            ALL_VERSIONS_FILE_SIZE: "${fileSize} - 所有版本",
            DOCS_DRAFT_UPDATED_HEADER: "已編輯草稿",
            DOCS_DRAFT_CREATED_HEADER: "已建立草稿",
            DOCS_UPDATED_HEADER: "已發佈",
            DOCS_CREATED_HEADER: "建立資訊",
            UPDATED_HEADER: "更新資訊",
            CREATED_HEADER: "建立資訊",
            LIKES_HEADER: "按讚數",
            LIKES_EXPAND_ICON: "展開此圖示以查看誰對此檔案按讚",
            DOWNLOADS_HEADER: "檢視次數",
            DOWNLOADS_HEADER_MORE: "檢視次數 (${0})",
            DOWNLOADS_EXPAND_ICON: "展開此圖示以查看誰已檢視此檔案",
            DOWNLOADS_COUNT: "${downloads}",
            DOWNLOADS_COUNT_FULL: "${downloads} - ${anonymousDownloads}（匿名方式）",
            DOWNLOADS_LATEST_VERSION: "您具有此檔案的最新版本",
            DOWNLOADS_LAST_VERSION: "您上次檢視了此檔案的第 ${0} 版",
            TAGS_HEADER: "標籤",
            DESCRIPTION_HEADER: "說明",
            DESCRIPTION_READ_MORE: "閱讀更多...",
            LINKS_HEADER: "鏈結",
            SECURITY: "安全",
            FILE_ENCRYPTED: "檔案內容已加密。 無法搜尋已加密的檔案內容。 無法使用 HCL Docs 檢視及編輯檔案內容。",
            GET_LINKS: "取得鏈結...",
            ADD_DESCRIPTION: "新增說明",
            NO_DESCRIPTION: "沒有任何說明",
            ADD_TAGS: "新增標籤",
            NO_TAGS: "沒有任何標籤"
         },
         COMMENTS: {
            TITLE: "評論",
            TITLE_WITH_COUNT: "評論 (${0})",
            VERSION: "第 ${0} 版",
            FEED_LINK: "這些評論的資訊來源",
            FEED_TITLE: "透過資訊來源讀取器來追蹤對這些評論的變更"
         },
         SHARING: {
            TITLE: "共用",
            TITLE_WITH_COUNT: "共用 (${0})",
            SHARED_WITH_FOLDERS: "透過資料夾共用 - ${count}",
            SEE_WHO_HAS_SHARED: "查看已共用的人員",
            COMMUNITY_FILE: "社群所擁有的檔案不能與人員或其他社群共用。",
            SHARED_WITH_COMMUNITY: "已與社群 '${0}' 的成員共用",
            LOGIN: "登入",
            NO_SHARE: "尚未將此檔案新增至任何資料夾。",
            ONE_SHARE: "此檔案位於 1 個資料夾或社群，而您無法存取該資料夾或社群。",
            MULTIPLE_SHARE: "此檔案位於 ${fileNumber} 資料夾或社群，而您無法存取這些資料夾或社群。"
         },
         VERSIONS: {
            TITLE: "版本",
            TITLE_WITH_COUNT: "版本 (${0})",
            FEED_LINK: "這些版本的資訊來源",
            FEED_TITLE: "透過資訊來源讀取器追蹤對此檔案的變更"
         }
      },
      CONFIRMATION_DIALOG: {
         NAME: "確認動作",
         DIALOG_TITLE: "確認",
         PROMPT: "確定要執行此動作嗎？",
         ERROR: "執行動作時發生錯誤。 請稍後重試。",
         TOOLTIP: "執行動作",
         OK: "確定",
         CANCEL: "取消",
         A11Y: "此按鈕會執行現行動作。"
      },
      THUMBNAIL: {
         TITLE: "縮圖",
         CHANGE_LINK: "變更縮圖...",
         ERROR: "無法儲存縮圖。 請稍後重試。",
         EXT_ERROR: "請選取具有下列其中一種支援副檔名的檔案：${0}",
         SUCCESS: "縮圖已變更",
         UPLOAD: "儲存",
         CANCEL: "取消"
      },
      UPLOAD_VERSION: {
         LINK: "上傳新版本...",
         CHANGE_SUMMARY: "選用的變更摘要...",
         ERROR: "無法儲存新版本。 請稍後重試。",
         SUCCESS: "已儲存新版本。",
         UPLOAD: "上傳",
         UPLOAD_AND_CHANGE_EXTENSION: "上傳及變更延伸",
         CANCEL: "取消",
         TOO_LARGE: "${file} 大於容許的 ${size} 檔案大小。",
         PROGRESS_BAR_TITLE: "正在上傳新版本（已完成 ${uploaded} 個，共 ${total} 個）",
         CANCEL_UPLOAD: "取消上傳"
      },
      OPEN_BY_ID_ERROR: {
         DEFAULT: "存取檔案時發生錯誤。 請稍後重試。",
         UNAUTHENTICATED: "您的階段作業已逾時。 必須重新登入，才能檢視檔案。",
         NOT_FOUND: "已刪除或移動您所要求的檔案。 如果某人傳送此鏈結給您，請檢查它是否正確。",
         ACCESS_DENIED: "您沒有檢視此檔案的許可權。 尚未與您共用此檔案。",
         ACCESS_DENIED_ANON: "您沒有檢視此檔案的許可權。 如果這是您的檔案或它已與您共用，則您必須先登入。"
      },
      NOTFOUND_FILE_DIALOG: {
         DIALOG_TITLE: "錯誤",
         PROMPT: "已刪除或移動您所要求的檔案。",
         CANCEL: "確定"
      },
      LOST_AUTHENTICATION_DIALOG: {
        DIALOG_TITLE: "確認",
        PROMPT: "HCL Connections 階段作業已逾時。${lineBreaks}請按一下「確定」以重新登入，或按一下「取消」以關閉這個對話框。",
        OK: "確定",
        CANCEL: "取消"
      },
      ERROR_VALIDATING_FILES_FILE: {
        DIALOG_TITLE: "無法存取鏈結",
        PROMPT: "存取鏈結時發生錯誤。${lineBreaks}按一下「確定」以重新導向至這個頁面。",
        OK: "確定",
        CANCEL: "取消"
      },
      LOAD_ERROR: {
         DEFAULT: "哎呀。 存取鏈結時發生錯誤。",
         ACCESS_DENIED: "聯絡檔案擁有者，以要求檢視此檔案的許可權。"
      },
      WINDOW_TITLE: {
         FILE: "${fileName} - 檔案",
         LOAD_ERROR: "存取檔案時發生錯誤"
      },
      SHARE_WITH_LINK: {
         TITLE: "透過鏈結共用",
         EMPTY_DESCRIPTION: "您尚未為此檔案建立鏈結。 請建立共用鏈結以傳送給其他人，以便他們可以預覽並下載檔案。",
         CREATE_LINK: "建立鏈結",
         COPY_LINK: "複製鏈結",
         DELETE_LINK: "刪除鏈結",
         ACCESS_TYPE_1: "具有此鏈結的任何人都可以檢視此檔案",
         ACCESS_TYPE_2: "我組織中的人員可以檢視此檔案",
         ACCESS_TYPE_1_DESCRIPTION: "取得此鏈結的人員可以在登入 Connections 後預覽並下載此檔案。",
         ACCESS_TYPE_2_DESCRIPTION: "我的組織中取得此鏈結的人員可以在登入 Connections 後預覽並下載此檔案。",
         CHANGE_TYPE_SUCCESS: "在存取類型變更時更新鏈結權限。",
         CHANGE_TYPE_ERROR: "在存取類型變更時更新鏈結權限失敗。",
         COPY_LINK_SUCCESS: "鏈結已複製到剪貼簿",
         CREATE_SHARELINK_SUCCESS:"已順利建立鏈結。",
         CREATE_SHARELINK_ERROR:"由於發生錯誤而無法建立鏈結。",
         DELETE_SHARELINK_SUCCESS: "已刪除 \"${file}\" 的共用鏈結。",
         DELETE_SHARELINK_ERROR: "未刪除共用鏈結。 請稍後重試。",
         CONFIRM_DIALOG: {
            OK: "刪除",
            DIALOG_TITLE: "刪除共用鏈結",
            PROMPT: "具有此鏈結的任何人都將無法存取此檔案。您確定要刪除此共用鏈結嗎？"
         },
         COPY_LINK_ACTION_TOOLTIP_TYPE_1: "共用鏈結處於作用中狀態。 具有此鏈結的任何人都可以檢視此檔案。 按一下以複製此鏈結。",
         COPY_LINK_ACTION_TOOLTIP_TYPE_2: "共用鏈結處於作用中狀態。 我組織中的人員可以檢視此檔案。 按一下以複製此鏈結。"
      }
});
