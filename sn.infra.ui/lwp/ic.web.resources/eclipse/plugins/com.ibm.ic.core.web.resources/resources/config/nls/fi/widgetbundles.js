/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

// FIXME: temporary stop-gap until we make net.jazz.ajax.dojoResourceModules work with AMD bundles
define({
      // NLS_ENCODING=UNICODE
      // NLS_MARKUP=IBMJDK21
      //// G11N GA UI

      // COMPONENTPREFIX CLFWZ
      // NLS_MESSAGEFORMAT_VAR
      // NLS_CHARSET=UTF-8
         // These are the default strings that become part of lconn.core.nls.widgetbundles

         // Stock SaND widget titles
         'lc_sand' : {
            'sand_DYK' : 'Ihmisiä, jotka saatat tuntea',
            'sand_recomItems' : 'Suositukset',
            'sand_recomComm' : 'Suositukset',
            'sand_thingsInCommon' : 'Yhteiset tekijät',
            'sand_socialPath' : 'Kuka meidät yhdistää?',
            'sand_simComm' : 'Samankaltaiset yhteisöt'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'Raportointiketju',
            'multiFeedReader' : 'Viimeisimmät viestit',
            'filesReader' : 'Tiedostot',
            'multiWidget' : 'Profiilitiedot',
            'board' : 'Taulu',
            'contactInfo' : 'Yhteystiedot',
            'backgroundInfo' : 'Tausta',
            'structTags' : 'Rakenteiset tunnisteet',
            'commonTags' : 'Organisaation tunnisteet',
            'socialTags' : 'Tunnisteet',
            'linkRoll' : 'Omat linkit',
            'friends' : 'Verkosto'
         },

         // Stock Communities widget titles
         'Blog' : 'Verkkoloki',
         'IdeationBlog' : 'Ideointiverkkoloki',
         'Activities' : 'Aktiviteetit',
         'Files' : 'Tiedostot',
         'Wiki' : 'Wiki',
         'RichContent' : 'Monimuotoinen sisältö',
         'Forum' : 'Keskusteluryhmät',
         'Bookmarks' : 'Kirjanmerkit',
         'Members' : 'Jäsenet',
         'Feeds' : 'Syötteet',
         'widgetPalette' : 'Widget-objektivalikoima',
         'feedReader' : 'Syötteiden lukuohjelma',
         'SubcommunityNav' : 'Aliyhteisöt',
         'CommunityUpdates' : 'Yhteisön päivitykset',
         'Updates' : 'Viimeisimmät päivitykset',
         'RecentUpdates' : 'Viimeisimmät päivitykset',
         'StatusUpdates' : 'Tilapäivitykset',
         'Calendar' : {
            'default' : 'Tapahtumat',
            'view' : 'Tulevat tapahtumat'
         },
         'RelatedCommunities' : 'Aiheeseen liittyvät yhteisöt',
         'MyLibrary' : 'Oma kirjasto',
         'MyLibrary.sequenceNumber' : 'Oma kirjasto {0}',
         'Tags' : 'Tunnisteet',
         'MembersSummary' : 'Jäsenet',
         'description' : 'Yhteisön kuvaus',
         'ImportantBookmarks' : 'Tärkeät kirjanmerkit',
         
         // ICEC
         'highlights': {
         	'Highlights' : 'Tärkeimmät ominaisuudet',
         	'Highlights.description' : 'Yksilöllistä yhteisön yleiskuvausta ja luo mukaansatempaava käyttäjäelämys kokoamalla sisältöä eri lähteistä.'
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'Mediagalleria',
            'MediaGallery.description' : 'Jaa valokuvia ja videoita yhteisölle.',
            'CustomLibrary' : 'Linkitetty kirjasto',
            'CustomLibrary.sequenceNumber' : 'Linkitetty kirjasto {0}',
            'CustomLibrary.description' : 'Voit käyttää asiakirjavarastoa yhteisössä.',
            'Library' : 'Kirjasto',
            'Library.sequenceNumber' : 'Kirjasto {0}',
            'Library.description' : 'Voit käsitellä tiedostoja luonnosten, tarkistajien ja julkaisutoimintojen avulla.',
            'librarysummary' : 'Asiakirjavarasto',
            'librarysummary.description' : 'Voit käyttää asiakirjavarastoa yhteisössä.',
            'Gallery' : 'Galleria',
            'Gallery.description' : 'Voit esitellä tämän yhteisön tiedostoja.'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : 'Yhdistä joukko jäseniä aiemmin luodun yhteisön sisällä.',
         'galleryDescription' : 'Jaa valokuvia ja videoita yhteisölle.',
         'blogsDescription' : 'Kerro kuulumisistasi ja näkemyksistäsi yhteisön jäsenille nopeasti ja dynaamisesti.',
         'ideationBlogsDescription' : 'Lisää ideoita ja äänestä niistä yhdessä muiden yhteisön jäsenien kanssa.',
         'commActivitesDescription' : 'Seuraa yhteisön tavoitteita, järjestä tehtäviä ja anna niitä jäsenien tehtäväksi.',
         'filesDescription' : 'Siirrä yhteisön tiedostoja ja kansioita palvelimeen ja käsittele niitä yhdessä muiden kanssa.',
         'wikiDescription' : 'Jaa Web-resursseja yhteisölle ja tee yhteistyötä kollegojen kanssa.',
         'forumDescription' : 'Keskustele aiheista ja kerro ideoista.',
         'eventsDescription' : 'Julkaise tietoa tärkeistä yhteisön tapahtumista, kuten seminaareista ja koulutustilaisuuksista. ',
         'commBookmarks' : 'Voit määrittää hyödyllisiä verkkoresursseja käytettäviksi suoraan yhteisöstä.',
         'commFeeds' : 'Lisää aiheeseen kuuluvien Web-sivustojen syötteitä yhteisöön.',
         'updatesDescription' : 'Päivitä yhteisön tilaviestiä ja kerro muille jäsenille, mitä teet parhaillaan.',
         'calendarDescription' : 'Julkaise tietoa tärkeistä yhteisön tapahtumista, kuten seminaareista ja koulutustilaisuuksista. ',
         'relatedCommunitiesDescription' : 'Luo linkkejä muihin yhteisöihin.  ',
         'importantBookmarksDescription' : 'Voit kerätä kirjanmerkkejä Web-resursseihin, jotka ovat tärkeitä yhteisöllesi.',
         'tagsDescription' : 'Voit ryhmitellä mielenkiintoista sisältöä lisäämällä siihen merkitseviä avainsanoja, jotka helpottavat sisällön löytämistä.',
         'descriptionDescription' : 'Yleiskuvaus yhteisön tarkoituksesta.  Kuvauksesta tulisi käydä ilmi yhteisön tavoitteet ja arvot.',
         'memberSummaryDescription' : 'Yhteisöön kuuluvat ihmiset.  Jakamalla tietoja ja tekemällä yhteistyötä jäsenten kanssa voit tuoda eloa yhteisöön.'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});
