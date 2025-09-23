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
         'msg.loginRequired' : 'Ak chcete zobraziť svoj obsah, prihláste sa.',
         'ErrorGeneric' : 'Nastala chyba počas zobrazovania obsahu. Kontaktujte svojho administrátora systému.',
         'showErrorDetails' : 'Zobraziť podrobnosti o chybe',
         'HideErrorDetails' : 'Skryť podrobnosti o chybe',

         'loadInfo' : 'Načítať informácie...',

         'dykLoadInfo' : 'Zobraziť odporúčaných ľudí na pridanie do vašej siete.',
         'dykLoadInfo2' : 'Zobraziť odporúčaných ľudí na pridanie do vašej siete na základe vašich existujúcich sieťových kontaktov.',

         'wcuLoadInfo' : 'Zistite, ako súvisíte s týmto profilom na základe vašej siete a akcií.',

         'ticLoadInfo' : 'Zistite, čo máte spoločné s týmto profilom na základe vašej siete a aktivity.',

         'deleteWidget' : 'Odstrániť aplikáciu',
         'hideWidget' : 'Skryť aplikáciu',
         'deleteWidgetMsg' : 'Chystáte sa odstrániť svoju aplikáciu. Táto akcia odstráni celý obsah aplikácie. Táto akcia sa nedá vrátiť späť. Obsah, ktorý členovia zdieľajú s komunitou, sa stále zdieľa. Ak znova pridáte aplikáciu, tento zdieľaný obsah sa znova zobrazí v aplikácii.<br/><br/>Ak ste si istý, že chcete odstrániť aplikáciu, kliknite na tlačidlo Odstrániť nižšie. <br/>Inak kliknite na tlačidlo Zrušiť.',
         'hideWidgetMsg' : 'Chystáte sa skryť svoju aplikáciu.<br/><br/>Neskôr ju môžete znova aktivovať. Stačí, ak znova pridáte aplikáciu do svojej komunity. Celý obsah aplikácie zostane bez zmeny.',
         'deleteWidgetWarn' : 'Varovanie: Údaje pre aplikáciu {0} budú trvalo vymazané.',
         'deleteWidgetConfirm' : 'Rozumiem, že aplikácia a jej priradené údaje sa vymažú a nedajú sa obnoviť.',
         'deleteWithSharedContentWidgetConfirm' : 'Rozumiem, že aplikácia a jej priradené údaje sa vymažú a nedajú sa obnoviť.  Obsah, ktorý členovia zdieľajú s komunitou, sa stále zdieľa. Ak znova pridáte aplikáciu, tento zdieľaný obsah sa znova zobrazí v aplikácii.',
         'delete' : 'Delete',
         'hide' : 'Skryť',
         'cancel' : 'Zrušiť',
         'save' : 'Uložiť',
         'edit' : 'Upraviť',
         'view' : 'Zobraziť',
         'help' : 'Pomoc',
         'refresh' : 'Obnoviť',
         'actions' : 'Akcie',
         'switchTabWarning' : 'Pred presunom na inú záložku musíte uložiť zmeny na každej záložke.',
         'confirmDeleteWidget' : 'Naozaj chcete odstrániť túto aplikáciu?<br><br>Túto aplikáciu môžete neskôr obnoviť pomocou ponuky Akcie pre komunitu.  Všetky nastavenia pre zobrazenie aplikácie sa stratia, ale údaje aplikácie zostanú nedotknuté.',

         // Strings for Change Title dialog
         'changeTitleAction' : 'Zmeniť nadpis',

         // {0} is the translated title of the application being rendered
         'actions_alt' : 'Akcie pre: ${0}',
         'actionsmenu' : 'Ponuka akcií',
         'toggle' : 'Prepnúť',
         'open' : 'Otvoriť',
         'close' : 'Zatvoriť',

         'widgets_Move' : 'Presunúť',
         'widgets_MoveUp' : 'Presunúť nahor',
         'widgets_MoveDown' : 'Presunúť nadol',
         'widgets_MoveLeft' : 'Posunúť doľava',
         'widgets_MoveRight' : 'Posunúť doprava',
         'widgets_MovePrev' : 'Presunúť do predošlého stĺpca',
         'widgets_MoveNext' : 'Presunúť do ďalšieho stĺpca',
         'widgets_Min' : 'Minimalizovať',
         'widgets_Max' : 'Maximalizovať',

         'widgetCat_AllWidgets' : 'Všetky aplikácie',
         'widgetCat_thrdParty' : 'Iné',
         'widgetCat_hidden' : 'Skryté',
         'widget_BackToOverview' : 'Späť na stránku s prehľadom',
         'widget_AddingWidget' : 'Pridáva sa aplikácia',
         'widget_RemovingWidget' : 'Odstraňuje sa aplikácia',
         'widget_AllTab' : 'Všetko',
         'widget_HideConfirmation' : 'Úspešne ste skryli ${0} pred touto komunitou. ',
         'widget_HideConfirmationUndo' : 'Vrátiť späť',

         'link.remove' : 'Odstrániť',
         'link.window.close' : 'Zatvoriť okno',
         'link.window.openNewWindow' : 'Kliknutie na toto otvorí nové okno',

         'error.title.generic' : 'Zaznamenali sme problém.',
         'error.message.generic' : 'Niečo sa stalo nesprávne - kliknite na tlačidlo Späť a skúste to znova. Ak to nefunguje, nahláste problém vo fóre podpory.',
         'info.feed.general.moreinfo' : 'Kliknite tu, ak chcete zobraziť viac podrobností',

         'label.theme.customize' : 'Pridať aplikácie',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'Nie sú k dispozícii žiadne informačné kanály',
         'errorDefaultMsg' : 'Nemožno zobraziť údaje aplikácie',
         'errorDefaultMsg2' : 'Nastala chyba, kontaktujte svojho administrátora systému.',
         'errorDefaultMsg3' : 'Kliknite tu, ak chcete zobraziť viac podrobností',
         'errorMsg' : 'Správa: ',
         'errorName' : 'Názov: ',
         'errorType' : 'Typ: ',
         'errorLine' : 'Riadok:',
         'errorStackTrace' : 'Sledovanie: ',
         'errorUnableToConnect' : 'Zlyhalo pripojenie pre {0}'

});

