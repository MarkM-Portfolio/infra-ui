/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

// FIXME: temporary stop-gap until we make net.jazz.ajax.dojoResourceModules work with AMD bundles
define({
      // NLS_ENCODING=UNICODE
      // NLS_MARKUP=IBMJDK21
      //// G11N GA UI

      // COMPONENTPREFIX CLFWZ
      // NLS_MESSAGEFORMAT_VAR
      // NLS_CHARSET=UTF-8
         'str_component_id' : 'CLFWZ',

         // Login Required
         'msg.loginRequired' : 'Log på for at få dit indhold vist.',
         'ErrorGeneric' : 'Der er opstået en fejl under fremvisning af indhold. Kontakt systemadministratoren.',
         'showErrorDetails' : 'Vis fejldetaljer',
         'HideErrorDetails' : 'Skjul fejldetaljer',

         'loadInfo' : 'Indlæs oplysninger...',

         'dykLoadInfo' : 'Vis anbefalede personer, du kan tilføje til dit netværk.',
         'dykLoadInfo2' : 'Vis anbefalede personer, du kan tilføje til dit netværk, på basis af dine eksisterende netværkskontakter.',

         'wcuLoadInfo' : 'Find ud af, hvordan du har relation til denne profil på basis af dit netværk og dine handlinger.',

         'ticLoadInfo' : 'Find ud af, hvad du har til fælles med denne profil på basis af dit netværk og dine aktiviteter.',

         'deleteWidget' : 'Fjern applikation',
         'hideWidget' : 'Skjul applikation',
         'deleteWidgetMsg' : 'Du er ved at fjerne din applikation. Herved fjernes alt indhold i applikationen. Handlingen kan ikke fortrydes. Indhold, som medlemmer har delt med fællesskabet, vil stadig være delt. Hvis applikationen bliver tilføjet igen, vil det delte indhold blive vist i den igen.<br/><br/>Hvis du er sikker på, at du vil fjerne applikationen, skal du klikke på Fjern nu. <br/>Ellers skal du klikke på Annullér.',
         'hideWidgetMsg' : 'Du er ved at skjule din applikation.<br/><br/>Du kan aktivere den igen på et senere tidspunkt blot ved at tilføje den igen i fællesskabet. Alt applikationsindhold forbliver intakt.',
         'deleteWidgetWarn' : 'Advarsel: Data for applikationen {0} vil blive slettet permanent.',
         'deleteWidgetConfirm' : 'Jeg er indforstået med, at applikationen og de data, der er knyttet til den, bliver slettet og ikke kan genskabes.',
         'deleteWithSharedContentWidgetConfirm' : 'Jeg er indforstået med, at applikationen og de data, der er knyttet til den, bliver slettet og ikke kan genskabes.  Indhold, som medlemmer har delt med fællesskabet, vil stadig være delt. Hvis applikationen bliver tilføjet igen, vil det delte indhold blive vist i den igen.',
         'delete' : 'Slet',
         'hide' : 'Skjul',
         'cancel' : 'Annullér',
         'save' : 'Gem',
         'edit' : 'Redigér',
         'view' : 'Vis',
         'help' : 'Hjælp',
         'refresh' : 'Opfrisk',
         'actions' : 'Handlinger',
         'switchTabWarning' : 'Du skal gemme ændringerne på de enkelte faner, før du flytter til en anden fane.',
         'confirmDeleteWidget' : 'Er du sikker på, at du vil fjerne denne applikation?<br><br>Du kan gendanne applikationen senere ved hjælp af menuen Fællesskab.  Eventuelle fremvisningsindstillinger for applikationen går tabt, men applikationens data bevares.',

         // Strings for Change Title dialog
         'changeTitleAction' : 'Revidér titel',

         // {0} is the translated title of the application being rendered
         'actions_alt' : 'Handlinger for: ${0}',
         'actionsmenu' : 'Handlingsmenu',
         'toggle' : 'Skift',
         'open' : 'Åbn',
         'close' : 'Luk',

         'widgets_Move' : 'Flyt',
         'widgets_MoveUp' : 'Flyt op',
         'widgets_MoveDown' : 'Flyt ned',
         'widgets_MoveLeft' : 'Flyt til venstre',
         'widgets_MoveRight' : 'Flyt til højre',
         'widgets_MovePrev' : 'Flyt til forrige kolonne',
         'widgets_MoveNext' : 'Flyt til næste kolonne',
         'widgets_Min' : 'Minimér',
         'widgets_Max' : 'Maksimér',

         'widgetCat_AllWidgets' : 'Alle applikationer',
         'widgetCat_thrdParty' : 'Anden',
         'widgetCat_hidden' : 'Skjult',
         'widget_BackToOverview' : 'Tilbage til oversigtsside',
         'widget_AddingWidget' : 'Tilføjer applikation',
         'widget_RemovingWidget' : 'Fjerner applikation',
         'widget_AllTab' : 'Alle',
         'widget_HideConfirmation' : 'Du har skjult ${0} fra fællesskabet. ',
         'widget_HideConfirmationUndo' : 'Fortryd',

         'link.remove' : 'Fjern',
         'link.window.close' : 'Luk vindue',
         'link.window.openNewWindow' : 'Klik her for at åbne et nyt vindue',

         'error.title.generic' : 'Der er opstået et problem.',
         'error.message.generic' : 'Der er opstået en fejl. Klik på tilbageknappen, og prøv igen. Hvis dette ikke fungerer, skal problemet rapporteres til supportforummet.',
         'info.feed.general.moreinfo' : 'Klik her for at få vist flere oplysninger',

         'label.theme.customize' : 'Tilføj apps',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'Der er ingen tilgængelige feeds',
         'errorDefaultMsg' : 'Kan ikke vise applikationsdata.',
         'errorDefaultMsg2' : 'Der er opstået en fejl. Kontakt systemadministratoren',
         'errorDefaultMsg3' : 'Klik her for at få vist flere oplysninger',
         'errorMsg' : 'Meddelelse: ',
         'errorName' : 'Navn: ',
         'errorType' : 'Type: ',
         'errorLine' : 'Linje:',
         'errorStackTrace' : 'Sporing: ',
         'errorUnableToConnect' : 'Det er ikke muligt at oprette forbindelse for {0}'

});

