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
         'msg.loginRequired' : 'Tarkastele sisältöä kirjautumalla sisään.',
         'ErrorGeneric' : 'Sisältöä näytettäessä on ilmennyt virhe. Ota yhteys järjestelmän pääkäyttäjään.',
         'showErrorDetails' : 'Näytä virheen tiedot',
         'HideErrorDetails' : 'Piilota virheen tiedot',

         'loadInfo' : 'Lataa tiedot...',

         'dykLoadInfo' : 'Näytä verkostoosi lisättäviksi suositellut henkilöt.',
         'dykLoadInfo2' : 'Näytä nykyisen verkostosi perusteella verkostoosi lisättäviksi suositellut henkilöt.',

         'wcuLoadInfo' : 'Selvitä verkostosi ja toimintasi perusteella, kuinka liityt tähän profiiliin.',

         'ticLoadInfo' : 'Selvitä verkostosi ja toimintasi perusteella, mitä yhteistä sinulla on tämän profiilin kanssa.',

         'deleteWidget' : 'Poista sovellus',
         'hideWidget' : 'Piilota sovellus',
         'deleteWidgetMsg' : 'Olet poistamassa sovellusta. Toiminto poistaa sovelluksen koko sisällön. Tätä toimintoa ei voi kumota. Sisältö, jonka jäsenet ovat määrittäneet yhteiskäyttöön yhteisön kanssa, pysyy yhteiskäytössä. Jos sovellus lisätään uudelleen, kyseinen yhteiskäyttöön määritetty sisältö tulee uudelleen näkyviin sovelluksessa.<br/><br/>Jos haluat varmasti poistaa sovelluksen, napsauta alapuolella olevaa Poista-painiketta. <br/>Napsauta muussa tapauksessa Peruuta-painiketta.',
         'hideWidgetMsg' : 'Olet piilottamassa sovellusta.<br/><br/>Voit aktivoida sovelluksen uudelleen myöhemmin lisäämällä sen uudelleen yhteisöön. Kaikki sovelluksen sisältö säilytetään.',
         'deleteWidgetWarn' : 'Varoitus: Sovelluksen {0} tiedot poistetaan pysyvästi.',
         'deleteWidgetConfirm' : 'Ymmärrän, että sovellus ja siihen liittyvät tiedot poistetaan ja että niitä ei voi palauttaa.',
         'deleteWithSharedContentWidgetConfirm' : 'Ymmärrän, että sovellus ja siihen liittyvät tiedot poistetaan ja että niitä ei voi palauttaa.  Sisältö, jonka jäsenet ovat määrittäneet yhteiskäyttöön yhteisön kanssa, pysyy yhteiskäytössä. Jos sovellus lisätään uudelleen, kyseinen yhteiskäyttöön määritetty sisältö tulee uudelleen näkyviin sovelluksessa.',
         'delete' : 'Poista',
         'hide' : 'Piilota',
         'cancel' : 'Peruuta',
         'save' : 'Tallenna',
         'edit' : 'Muokkaa',
         'view' : 'Näytä',
         'help' : 'Ohje',
         'refresh' : 'Päivitä',
         'actions' : 'Toiminnot',
         'switchTabWarning' : 'Tallenna kunkin välilehden muutokset, ennen kuin siirryt toiseen välilehteen.',
         'confirmDeleteWidget' : 'Haluatko varmasti poistaa tämän sovelluksen?<br><br>Voit palauttaa tämän sovelluksen myöhemmin Yhteisön toiminnot -valikosta.  Sovelluksen esitystapaan liittyvät asetukset menetetään, mutta sovelluksen tiedot säilyvät tallessa.',

         // Strings for Change Title dialog
         'changeTitleAction' : 'Muuta otsikkoa',

         // {0} is the translated title of the application being rendered
         'actions_alt' : 'Toiminnot kohteelle: ${0}',
         'actionsmenu' : 'Toiminnot-valikko',
         'toggle' : 'Vaihda',
         'open' : 'Avaa',
         'close' : 'Sulje',

         'widgets_Move' : 'Siirrä',
         'widgets_MoveUp' : 'Siirrä ylös',
         'widgets_MoveDown' : 'Siirrä alas',
         'widgets_MoveLeft' : 'Siirrä vasemmalle',
         'widgets_MoveRight' : 'Siirrä oikealle',
         'widgets_MovePrev' : 'Siirrä edelliseen sarakkeeseen',
         'widgets_MoveNext' : 'Siirrä seuraavaan sarakkeeseen',
         'widgets_Min' : 'Pienennä',
         'widgets_Max' : 'Suurenna',

         'widgetCat_AllWidgets' : 'Kaikki sovellukset',
         'widgetCat_thrdParty' : 'Muut',
         'widgetCat_hidden' : 'Piilossa',
         'widget_BackToOverview' : 'Palaa Yleiskuvaus-sivulle',
         'widget_AddingWidget' : 'Sovelluksen lisäys on meneillään',
         'widget_RemovingWidget' : 'Sovelluksen poisto on meneillään',
         'widget_AllTab' : 'Kaikki',
         'widget_HideConfirmation' : 'Olet piilottanut kohteen ${0} tältä yhteisöltä. ',
         'widget_HideConfirmationUndo' : 'Kumoa',

         'link.remove' : 'Poista',
         'link.window.close' : 'Sulje ikkuna',
         'link.window.openNewWindow' : 'Tämän napsauttaminen avaa uuden ikkunan',

         'error.title.generic' : 'On havaittu ongelma.',
         'error.message.generic' : 'Jotakin on vialla. Napsauta paluupainiketta ja yritä uudelleen. Jos tämä ei auta, raportoi ongelmasta tukikeskusteluryhmässä.',
         'info.feed.general.moreinfo' : 'Saat lisätietoja napsauttamalla tätä',

         'label.theme.customize' : 'Lisää sovelluksia',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'Syötteitä ei ole käytettävissä',
         'errorDefaultMsg' : 'Sovelluksen tietojen näyttö ei onnistu',
         'errorDefaultMsg2' : 'Järjestelmässä on ilmennyt virhe. Ota yhteys pääkäyttäjään.',
         'errorDefaultMsg3' : 'Saat lisätietoja napsauttamalla tätä',
         'errorMsg' : 'Viesti: ',
         'errorName' : 'Nimi: ',
         'errorType' : 'Laji: ',
         'errorLine' : 'Rivi:',
         'errorStackTrace' : 'Jäljitä: ',
         'errorUnableToConnect' : 'Yhteys ei onnistu kohteeseen {0}'

});

