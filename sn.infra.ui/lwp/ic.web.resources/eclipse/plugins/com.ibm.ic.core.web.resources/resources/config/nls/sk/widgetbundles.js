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
            'sand_DYK' : 'Ľudia, ktorých možno poznáte',
            'sand_recomItems' : 'Odporúčania',
            'sand_recomComm' : 'Odporúčania',
            'sand_thingsInCommon' : 'Spoločné veci',
            'sand_socialPath' : 'Kto nás spája?',
            'sand_simComm' : 'Podobné komunity'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'Hierarchia pozícií',
            'multiFeedReader' : 'Posledné príspevky',
            'filesReader' : 'Súbory',
            'multiWidget' : 'Informácie o profile',
            'board' : 'Nástenka',
            'contactInfo' : 'Kontaktné informácie',
            'backgroundInfo' : 'Pozadie',
            'structTags' : 'Štruktúrované značky',
            'commonTags' : 'Značky organizácie',
            'socialTags' : 'Značky',
            'linkRoll' : 'Moje odkazy',
            'friends' : 'Sieť'
         },

         // Stock Communities widget titles
         'Blog' : 'Blog',
         'IdeationBlog' : 'Blog nápadov',
         'Activities' : 'Aktivity',
         'Files' : 'Súbory',
         'Wiki' : 'Wiki',
         'RichContent' : 'Bohatý obsah',
         'Forum' : 'Fóra',
         'Bookmarks' : 'Záložky',
         'Members' : 'Členovia',
         'Feeds' : 'Informačné kanály',
         'widgetPalette' : 'Paleta widgetov',
         'feedReader' : 'Čítačka informačných kanálov',
         'SubcommunityNav' : 'Podkomunity',
         'CommunityUpdates' : 'Aktualizácie komunity',
         'Updates' : 'Posledné aktualizácie',
         'RecentUpdates' : 'Posledné aktualizácie',
         'StatusUpdates' : 'Aktualizácie stavu',
         'Calendar' : {
            'default' : 'Udalosti',
            'view' : 'Blížiace sa udalosti'
         },
         'RelatedCommunities' : 'Súvisiace komunity',
         'MyLibrary' : 'Moja knižnica',
         'MyLibrary.sequenceNumber' : 'Moja knižnica {0}',
         'Tags' : 'Značky',
         'MembersSummary' : 'Členovia',
         'description' : 'Opis komunity',
         'ImportantBookmarks' : 'Dôležité záložky',
         
         // ICEC
         'highlights': {
         	'Highlights' : 'Prehľad najdôležitejšieho',
         	'Highlights.description' : 'Prispôsobte si prehľad komunity a zlúčte obsah z rôznych zdrojov, aby ste vytvorili atraktívnu skúsenosť.'
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'Galéria médií',
            'MediaGallery.description' : 'Zdieľajte fotografie a videá s komunitou.',
            'CustomLibrary' : 'Prepojená knižnica',
            'CustomLibrary.sequenceNumber' : 'Prepojená knižnica {0}',
            'CustomLibrary.description' : 'Použite archív dokumentov vo svojej komunite.',
            'Library' : 'Knižnica',
            'Library.sequenceNumber' : 'Knižnica {0}',
            'Library.description' : 'Pracujte so súbormi pomocou konceptov, posudzovateľov a zverejňovania.',
            'librarysummary' : 'Archív dokumentov',
            'librarysummary.description' : 'Použite archív dokumentov vo svojej komunite.',
            'Gallery' : 'Galéria',
            'Gallery.description' : 'Vystavte súbory v tejto komunite.'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : 'Spojte podmnožinu členov v existujúcej komunite.',
         'galleryDescription' : 'Zdieľajte fotografie a videá s komunitou.',
         'blogsDescription' : 'Rýchlo a dynamicky zdieľajte svoje noviny a stanoviská s členmi komunity.',
         'ideationBlogsDescription' : 'Spolupracujte s členmi komunity prispievaním nápadmi a hlasovaním za nápady.',
         'commActivitesDescription' : 'Sledujte ciele svojej komunity, organizujte úlohy a priraďujte položky zoznamu úloh.',
         'filesDescription' : 'Odošlite, zdieľajte a pracujte so súbormi a zložkami komunity.',
         'wikiDescription' : 'Zdieľajte prostriedky so svojou komunitou a spolupracujte s kolegami.',
         'forumDescription' : 'Diskutujte o témach a zdieľajte nápady.',
         'eventsDescription' : 'Zverejnite dôležité udalosti komunity, ako sú semináre a školenia. ',
         'commBookmarks' : 'Sprístupnite užitočné webové prostriedky priamo zo svojej komunity.',
         'commFeeds' : 'Pridajte informačné kanály na relevantné webové lokality do svojej komunity.',
         'updatesDescription' : 'Aktualizujte svoj stav komunity, aby ostatní členovia vedeli, čo robíte.',
         'calendarDescription' : 'Zverejnite dôležité udalosti komunity, ako sú semináre a školenia. ',
         'relatedCommunitiesDescription' : 'Vytvorte odkazy na iné komunity.  ',
         'importantBookmarksDescription' : 'Zhromaždite záložky na webové prostriedky, ktoré sú dôležité pre vašu komunitu.',
         'tagsDescription' : 'Zoskupte zaujímavý obsah pomocou zmysluplných kľúčových slov, aby ste zjednodušili jeho nájdenie.',
         'descriptionDescription' : 'Prehľad, na čo slúži vaša komunitu.  Opis by mal uvádzať ciele a hodnoty komunity.',
         'memberSummaryDescription' : 'Osoby, ktoré sú súčasťou tejto komunity.  Zdieľajte informácie a spolupracujte s členmi, aby vaša komunita ožila.'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});
