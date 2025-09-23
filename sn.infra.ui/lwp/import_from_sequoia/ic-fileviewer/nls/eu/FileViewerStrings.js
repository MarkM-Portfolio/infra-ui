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
		 FILENAME_TOOLTIP: "Ireki fitxategiaren xehetasunen orria",
	   ICON_TOOLTIP: "Deskargatu fitxategia",
	   ERROR: "Errore bat gertatu da",
	   NAVIGATION: {
		  NEXT_A11Y: "Botoi honek hurrengo fitxategira nabigatzen du.",
		  PREVIOUS_A11Y: "Botoi honek aurreko fitxategira nabigatzen du."
	   },
	   ACTION: {
	     CLOSE: {
	       TOOLTIP: "Itxie",
	       A11Y: "Botoi honek fitxategi-ikustailea ixten du."
	     },
	     DOWNLOAD: {
	       TOOLTIP: "Deskargatu fitxategia",
	       A11Y: "Botoi honek fitxategia deskargatzen du."
	     },
	     TOGGLE_PANEL: {
	       SHOW: "Erakutsi xehetasunen panela",
	       HIDE: "Ezkutatu xehetasunen panela",
	       SHOW_A11Y: "Botoi honek alboko panela irekitzea eta ixtea txandakatzen du. Alboko panela itxita dago orain.",
	       HIDE_A11Y: "Botoi honek alboko panela irekitzea eta ixtea txandakatzen du. Alboko panela irekita dago orain."
	     },
	     VIEW_DOC: {
	       NAME: "Zabaldu dokumentuen ikustailea",
	       TOOLTIP: "Zabaldu ${0} dokumentuen ikustailean",
	       A11Y: "Botoi honek fitxategia irekitzen du arakatzaile berriaren leihoan barrena ikusteko."
	     },
	     EDIT_DOC: {
	       NAME: "Editatu",
	       TOOLTIP: "Editatu fitxategia",
	       A11Y: "Botoi honek fitxategia irekitzen du leiho berri batean dokumentuak editatzeko."
	     },
	     DELETE_VERSION: {
	       DIALOG_TITLE: "Berretsi",
	       DELETE_VERSION: "Ezabatu bertsio hau: ${version}",
	       DELETE_VERSION_AND_PRIOR: "Kendu ${version}. bertsioa eta aurreko bertsio guztiak",
	       PROMPT: "${version}. bertsioa kentzear zaude. Jarraitu nahi duzu?",
	       DELETE_PRIOR: "Aurreko bertsio guztiak ere kendu",
	       ERROR: "Errore bat gertatu da bertsioa kentzean. Saiatu berriro beranduago.",
	       TOOLTIP: "Kendu bertsio hau",
	       OK: "Ados",
	       CANCEL: "Utzi"
	     },
	     RESTORE_VERSION: {
	       DIALOG_TITLE: "Berretsi",
          PROMPT: "Fitxategi honen uneko bertsioa ${version}. bertsioarekin ordeztear zaude. Jarraitu nahi duzu?",
          ERROR: "Errore bat gertatu da bertsioa leheneratzean. Saiatu berriro beranduago.",
          TOOLTIP: "Leheneratu bertsio hau",
          CHANGE_SUMMARY: "Bertsio honetatik leheneratua: ${version}",
          OK: "Ados",
          CANCEL: "Utzi"
       },
       STOP_SHARING: {
         DIALOG_TITLE: "Berretsi",
         REMOVE_EVERYONE: "Ziur zaude fitxategi honen sarbide publikoa kendu nahi duzula? Sarbidea kentzen bada, fitxategia karpeta eta komunitate publikoetatik kendu egingo da, eta soilik jabeak eta partekatuta duten pertsonek ahal izango dute ikusi eta landu.",
         REMOVE_USER: "Partekatzeari utzi nahi diozu ${user}(r)ekin? Partekatzeari uzten badiozu, soilik karpeten bidez edo publikoa bada atzitzeko gai izango da ${user}.",
         REMOVE_COMMUNITY: "Ziur zaude fitxategi hau ${communityName} komunitatetik kendu nahi duzula?",
         REMOVE_EVERYONE_TOOLTIP: "Kendu sarbide publikoa",
         REMOVE_USER_TOOLTIP: "Kendu ${user}(r)ekin dauden partekatze guztiak",
         REMOVE_COMMUNITY_TOOLTIP: "Kendu ${communityName} komunitatetik",
         OK: "Ados",
         CANCEL: "Utzi"
       },
       DELETE_COMMENT: {
         DIALOG_TITLE: "Berretsi",
         PROMPT: "Ziur zaude iruzkin hau ezabatu nahi duzula?",
         ERROR: "Errore bat gertatu da iruzkina kentzean. Saiatu berriro beranduago",
         OK: "Ados",
         CANCEL: "Utzi"
       },
       LIKE: {
         LIKE: "Atsegin fitxategia",
         UNLIKE: "Desatsegin fitxategia",
         LIKE_A11Y: "Botoi honekin fitxategia atsegiten da",
         UNLIKE_A11Y: "Botoi honekin fitxategia desatsegiten da"
       }
	   },
	   SECTION: {
		  ABOUT: {
			 NAME: "Fitxategi honi buruz",
			 VIEW_FILE_DETAILS: "Ikusi fitxategiaren xehetasunak",
			 A11Y: "Esteka hau aktibatuz gero, fitxategi-ikustailea itxiko da eta fitxategiaren xehetasunen orrira joango zara."
		  }
	   },
	   PREVIEW: {
		  ICON: {
			 PREVIEW_NOT_AVAILABLE: "Ez dago aurrebistarik ${filename} fitxategiarentzat"
		  },
		  IMAGE: {
			 ZOOM_IN: "Handiagotu",
			 ZOOM_OUT: "Txikiagotu",
			 RESET: "Berrezarri",
			 ZOOM_IN_A11Y: "Botoi honek irudia handiagotzen du.",
			 ZOOM_OUT_A11Y: "Botoi honek irudia txikiagotzen du.",
			 RESET_ZOOM_A11Y: "Botoi honek zoom-maila berrezartzen du."
		  },
		  VIEWER: {
			 LOADING: "Kargatzen..."
		  }
	   },
	   DATE: {
		  LAST_UPDATED: {
			 TODAY: "${user} erabiltzaileak gaur ${time}(e)(t)an eguneratua",
			 YESTERDAY: "${user} erabiltzaileak atzo ${time}(e)(t)an eguneratua",
			 DAY: "${user} erabiltzaileak ${EEee}(e)(a)n ${time}(e)(t)an eguneratua",
			 MONTH: "${user} erabiltzaileak ${date_long}(e)(a)n eguneratua",
			 YEAR: "${user} erabiltzaileak ${date_long}(e)(a)n eguneratua"
		  },
		  CREATED: {
			 TODAY: "${user} erabiltzaileak gaur ${time}(e)(t)an sortua",
			 YESTERDAY: "${user} erabiltzaileak atzo ${time}(e)(t)an sortua",
			 DAY: "${user} erabiltzaileak ${EEee}(e)(a)n ${time}(e)(t)an sortua",
			 MONTH: "${user} erabiltzaileak ${date_long}(e)(a)n sortua",
			 YEAR: "${user} erabiltzaileak ${date_long}(e)(a)n sortua"
		  },
		  SHORT: {
		   TODAY: "${time} - Gaur",
	     YESTERDAY: "${time} - Atzo",
	     DAY: "${time} - ${EEee}",
	     MONTH: "${time} - ${date_long}",
	     YEAR: "${time} - ${date_long}"
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
	     SHADOW_TEXT: "Gehitu iruzkin bat...",
	     CANNOT_ACCESS_CONTENT: "Aipatu duzun ondoko jendeak ezin du iruzkina ikusi ez duelako edukirako sarbiderik:",
	     ERROR: "Errore bat gertatu da aipatzen saiatzen ari zaren erabiltzailea baliozkotzean.",
	     POST: "Argitaratu",
	     SAVE: "Gorde",
	     CANCEL: "Utzi"
	   },

	   TYPEAHEAD_BOX: {
       SAVE: "Gorde",
       CANCEL: "Utzi",
       USER: "Erabiltzailea",
       COMMUNITY: "Komunitatea"
	   },
	   VALIDATION: {
	     COMMENT: {
	       WARN_TOO_LONG: "Iruzkina luzeegia da.",
	       TRIM: "Iruzkina laburtu?"
	     },
	     TAG: {
         WARN_TOO_LONG: "Etiketa luzeegia da.",
         TRIM: "Etiketa laburtu?"
       },
       TAGS: {
         WARN_TOO_LONG: "Etiketa bat edo gehiago luzeegiak dira.",
         TRIM: "Etiketak laburtu?"
       }
	   },
	   COMMENTS: {
	     READ_MORE: "Irakurri gehiago...",
	     ERROR: {
	       SAVE: {
	         DEFAULT: "Ezin izan da zure iruzkina gorde. Saiatu berriro beranduago.",
	         UNAUTHENTICATED: "Saioak denbora-muga gainditu du. Berriro hasi behar duzu saioa iruzkina gordetzeko.",
	         NOT_FOUND: "Ezin izan da zure iruzkina gorde fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta.",
	         ACCESS_DENIED: "Ezin izan da zure iruzkina gorde fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta."
	       },
	       DELETE: {
	         DEFAULT: "Ezin izan da zure iruzkina kendu. Saiatu berriro beranduago.",
	         UNAUTHENTICATED: "Saioak denbora-muga gainditu du. Berriro hasi behar duzu saioa iruzkina kentzeko.",
	         NOT_FOUND: "Ezin izan da zure iruzkina kendu fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta.",
	         ACCESS_DENIED: "Ezin izan da zure iruzkina kendu fitxategia kendu egin delako edo jada ez dagoelako zurekin partekatuta."
	       }
	     }
	   },
	   TAG_WIDGET: {
	     ADD_TOOLTIP: "Gorde",
	     ERROR: {
	       SAVE: {
	         DEFAULT: "Ezin izan da etiketa sortu. Saiatu berriro beranduago."
	       },
	       DELETE: {
           DEFAULT: "Ezin izan da etiketa kendu. Saiatu berriro beranduago."
         }
	     }
	   },
	   SHARE: {
	     EVERYONE: "Guztiak (publikoa)",
	     ADD_TOOLTIP: "Gorde",
	     ROLES: {
	       OWNER: "Jabea",
	       EDIT: "Editoreak",
	       VIEW: "Irakurleak",
	       FOLDER: "Karpetekin partekatua"
	     },
	     ACTION: {
	       OWNER: {
	         ROLE: "Jabea"
	       },
	       EDIT: {
	         ROLE: "Editatu",
	         ADD: "Gehitu editorea"
	       },
	       VIEW: {
	         ROLE: "Irakurlea",
	         ADD: "Gehitu irakurlea"
	       }
	     }
	   },
	   STREAM: {
	     LOADING: "Kargatzen...",
	     LOAD_MORE: "Kargatu gehiago..."
	   },
	   ENTRY: {
	     REMOVE: "Kendu",
	     RESTORE: "Leheneratu",
	     EDIT: "Editatu",
	     DELETE: "Kendu",
	     OK: "Ados",
	     CANCEL: "Utzi"
	   },
	   PANEL: {
	     ABOUT: {
	       TITLE: "Fitxategi honi buruz",
	       CURRENT_VERSION_HEADER: "Uneko bertsioa",
	       FILE_SIZE_HEADER: "Fitxategiaren tamaina",
	       CURRENT_VERSION_FILE_SIZE: "${fileSize} - Uneko bertsioa",
	       ALL_VERSIONS_FILE_SIZE: "${fileSize} - Bertsio guztiak",
	       UPDATED_HEADER: "Eguneratzea",
	       CREATED_HEADER: "Sortzea",
	       LIKES_HEADER: "Atsegiteak",
	       DOWNLOADS_HEADER: "Deskargak",
	       DOWNLOADS_COUNT: "${downloads} - ${anonymousDownloads} anonimoki",
	       TAGS_HEADER: "Etiketak",
	       DESCRIPTION_HEADER: "Deskribapena",
	       DESCRIPTION_READ_MORE: "Irakurri gehiago...",
	       LINKS_HEADER: "Estekak",
	       GET_LINKS: "Lortu estekak..."
	     },
	     COMMENTS: {
	       TITLE: "Iruzkinak",
	       TITLE_WITH_COUNT: "Iruzkinak (${0})",
	       VERSION: "${0}. bertsioa"
	     },
	     SHARING: {
	       TITLE: "Norekin partekatuta",
	       TITLE_WITH_COUNT: "Norekin partekatuta (${0})",
	       SHARED_WITH_FOLDERS: "Karpetekin partekatuta - ${count}"
	     },
	     VERSIONS: {
	       TITLE: "Bertsioak",
	       TITLE_WITH_COUNT: "Bertsioak ({$0})"
	     }
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
