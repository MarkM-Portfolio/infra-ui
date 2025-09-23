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
         'msg.loginRequired' : 'Jelentkezzen be a tartalom megtekintéséhez.',
         'ErrorGeneric' : 'Hiba történt a tartalom megjelenítésekor. Lépjen kapcsolatba a rendszeradminisztrátorral.',
         'showErrorDetails' : 'Hiba részleteinek megjelenítése',
         'HideErrorDetails' : 'Hiba részleteinek elrejtése',

         'loadInfo' : 'Információk betöltése ...',

         'dykLoadInfo' : 'A hálózathoz hozzáadni javasolt személyek megjelenítése.',
         'dykLoadInfo2' : 'A hálózathoz a meglévő hálózati kapcsolatok alapján hozzáadni javasolt személyek megjelenítése.',

         'wcuLoadInfo' : 'Tekintse meg, hogy hogyan kapcsolódik ez a profil a hálózati műveletei alapján.',

         'ticLoadInfo' : 'Tekintse meg, hogy mi a közös Önben ezzel a profillal, ami a hálózati műveletein alapul.',

         'deleteWidget' : 'Alkalmazás eltávolítása',
         'hideWidget' : 'Alkalmazás elrejtése',
         'deleteWidgetMsg' : 'Az alkalmazás eltávolítására készül. Ezzel minden alkalmazástartalmat eltávolít. Ez a művelet nem vonható vissza. A tagok közösséggel megosztott tartalmai még mindig meg vannak osztva. Ha az alkalmazást újra hozzáadja, akkor a megosztott tartalom újra megjelenik az alkalmazásban.<br/><br/>Ha biztosan el kívánja távolítani az alkalmazást, akkor kattintson a lenti Eltávolítás gombra. <br/>Ellenkező esetben kattintson a Mégse gombra.',
         'hideWidgetMsg' : 'Az alkalmazás elrejtésére készül.<br/><br/>Később újból aktiválhatja azt, ha egyszerűen újból felveszi az alkalmazást a közösségbe. Az alkalmazás teljes tartalma sértetlen marad.',
         'deleteWidgetWarn' : 'Figyelmeztetés: A(z) {0} alkalmazás adatai végleg törölve lesznek.',
         'deleteWidgetConfirm' : 'Megértettem, hogy az alkalmazás és a hozzá tartozó adatok törölve lesznek, és nem állíthatóak helyre.',
         'deleteWithSharedContentWidgetConfirm' : 'Megértettem, hogy az alkalmazás és a hozzá tartozó adatok törölve lesznek, és nem állíthatóak helyre.  A tagok által a közösséggel megosztott tartalmak továbbra is megosztottak maradnak. Ha az alkalmazást újra hozzáadja, akkor a megosztott tartalom újra megjelenik az alkalmazásban.',
         'delete' : 'Törlés',
         'hide' : 'Elrejtés',
         'cancel' : 'Mégse',
         'save' : 'Mentés',
         'edit' : 'Szerkesztés',
         'view' : 'Megtekintés',
         'help' : 'Súgó',
         'refresh' : 'Frissítés',
         'actions' : 'Műveletek',
         'switchTabWarning' : 'Minden lapon el kell mentenie a módosításokat ahhoz, hogy másik lapra lépjen.',
         'confirmDeleteWidget' : 'Biztosan eltávolítja ezt az alkalmazást?<br><br>Az alkalmazást később visszaállíthatja a Közösségi műveletek menüben.  Az alkalmazás megjelenítési beállításai elvesznek, de az alkalmazás adatai érintetlenül maradnak.',

         // Strings for Change Title dialog
         'changeTitleAction' : 'Cím módosítása',

         // {0} is the translated title of the application being rendered
         'actions_alt' : 'Művelet a következőhöz: ${0}',
         'actionsmenu' : 'Műveletek menü',
         'toggle' : 'Átkapcsolás',
         'open' : 'Megnyitás',
         'close' : 'Bezárás',

         'widgets_Move' : 'Áthelyezés',
         'widgets_MoveUp' : 'Felfelé',
         'widgets_MoveDown' : 'Lefelé',
         'widgets_MoveLeft' : 'Áthelyezés balra',
         'widgets_MoveRight' : 'Áthelyezés jobbra',
         'widgets_MovePrev' : 'Áthelyezés az előző oszlopba',
         'widgets_MoveNext' : 'Áthelyezés a következő oszlopba',
         'widgets_Min' : 'Kis méret',
         'widgets_Max' : 'Teljes méret',

         'widgetCat_AllWidgets' : 'Minden alkalmazás',
         'widgetCat_thrdParty' : 'Egyéb',
         'widgetCat_hidden' : 'Rejtett',
         'widget_BackToOverview' : 'Vissza az Áttekintés oldalra',
         'widget_AddingWidget' : 'Alkalmazás hozzáadása',
         'widget_RemovingWidget' : 'Alkalmazás eltávolítása',
         'widget_AllTab' : 'Mind',
         'widget_HideConfirmation' : 'Ebből a közösségből sikeresen elrejtette a következőt: ${0}. ',
         'widget_HideConfirmationUndo' : 'Visszavonás',

         'link.remove' : 'Eltávolítás',
         'link.window.close' : 'Ablak bezárása',
         'link.window.openNewWindow' : 'Ha ide kattint, akkor egy új ablakot nyit meg',

         'error.title.generic' : 'Probléma fordult elő.',
         'error.message.generic' : 'Valami nem sikerült - kattintson a Vissza gombra és próbálkozzon újra. Ha nem működik, jelentse a problémát a támogatási fórumon.',
         'info.feed.general.moreinfo' : 'További részletekért kattintson ide',

         'label.theme.customize' : 'Alkalmazások hozzáadása',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'Nem áll rendelkezésre hírfolyam',
         'errorDefaultMsg' : 'Az alkalmazás adatai nem jeleníthetőek meg',
         'errorDefaultMsg2' : 'Hiba történt, lépjen kapcsolatba a rendszeradminisztrátorral',
         'errorDefaultMsg3' : 'További részletekért kattintson ide',
         'errorMsg' : 'Üzenet: ',
         'errorName' : 'Név: ',
         'errorType' : 'Típus: ',
         'errorLine' : 'Sor:',
         'errorStackTrace' : 'Nyomkövetés: ',
         'errorUnableToConnect' : 'Sikertelen kapcsolódás: {0}'

});

