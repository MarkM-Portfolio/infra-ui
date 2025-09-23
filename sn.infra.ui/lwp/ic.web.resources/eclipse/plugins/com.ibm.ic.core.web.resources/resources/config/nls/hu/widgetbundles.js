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
            'sand_DYK' : 'Emberek, akiket ismerhet',
            'sand_recomItems' : 'Ajánlások',
            'sand_recomComm' : 'Ajánlások',
            'sand_thingsInCommon' : 'Közös elemek',
            'sand_socialPath' : 'Ki kapcsolódik hozzánk?',
            'sand_simComm' : 'Hasonló közösségek'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'Jelentési lánc',
            'multiFeedReader' : 'Friss bejegyzések',
            'filesReader' : 'Fájlok',
            'multiWidget' : 'Profilinformációk',
            'board' : 'Az üzenőfal',
            'contactInfo' : 'Kapcsolatinformációk',
            'backgroundInfo' : 'Háttér',
            'structTags' : 'Strukturált címkék',
            'commonTags' : 'Szervezeti címkék',
            'socialTags' : 'Címkék',
            'linkRoll' : 'Saját hivatkozások',
            'friends' : 'Hálózat'
         },

         // Stock Communities widget titles
         'Blog' : 'Blog',
         'IdeationBlog' : 'Ötletblog',
         'Activities' : 'Tevékenységek',
         'Files' : 'Fájlok',
         'Wiki' : 'Wiki',
         'RichContent' : 'Formázott tartalom',
         'Forum' : 'Fórumok',
         'Bookmarks' : 'Könyvjelzők',
         'Members' : 'Tagok',
         'Feeds' : 'Hírfolyamok',
         'widgetPalette' : 'Felületi elem paletta',
         'feedReader' : 'Hírfolyam-olvasó',
         'SubcommunityNav' : 'Részközösségek',
         'CommunityUpdates' : 'Közösségi frissítések',
         'Updates' : 'Legutóbbi frissítések',
         'RecentUpdates' : 'Legutóbbi frissítések',
         'StatusUpdates' : 'Állapotfrissítések',
         'Calendar' : {
            'default' : 'Események',
            'view' : 'Események a közeljövőben'
         },
         'RelatedCommunities' : 'Kapcsolódó közösségek',
         'MyLibrary' : 'Saját könyvtár',
         'MyLibrary.sequenceNumber' : 'Saját könyvtár {0}',
         'Tags' : 'Címkék',
         'MembersSummary' : 'Tagok',
         'description' : 'Közösség leírása',
         'ImportantBookmarks' : 'Fontos könyvjelzők',
         
         // ICEC
         'highlights': {
         	'Highlights' : 'Aktualitások',
         	'Highlights.description' : 'Szabja személyre a Közösség áttekintése oldalt, és összesítsen tartalmat különféle forrásokból egy vonzóbb élmény összeállításához. '
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'Médiagaléria',
            'MediaGallery.description' : 'Fotók és videók megosztása a közösséggel.',
            'CustomLibrary' : 'Csatolt könyvtár',
            'CustomLibrary.sequenceNumber' : 'Csatolt könyvtár {0}',
            'CustomLibrary.description' : 'Dokumentumlerakat használata a közösségben.',
            'Library' : 'Könyvtár',
            'Library.sequenceNumber' : 'Könyvtár {0}',
            'Library.description' : 'Fájlok kezelése vázlatok, áttekintők és közzététel segítségével.',
            'librarysummary' : 'Dokumentumlerakat',
            'librarysummary.description' : 'Dokumentumlerakat használata a közösségben.',
            'Gallery' : 'Galéria',
            'Gallery.description' : 'Fájlok bemutatása a közösségben.'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : 'Hozza össze tagok egy részét már meglévő közösségben.',
         'galleryDescription' : 'Fotók és videók megosztása a közösséggel.',
         'blogsDescription' : 'A nézetei gyors és dinamikus megosztása a közösség tagjaival.',
         'ideationBlogsDescription' : 'Együttműködhet a közösség tagjaival ötleteken, és szavazhat azokra.',
         'commActivitesDescription' : 'Követheti a közösség céljait, feladatokat szervezhet, és tennivaló elemeket oszthat ki.',
         'filesDescription' : 'Közösségi fájlok és mappák feltöltése, megosztása és kezelése.',
         'wikiDescription' : 'Erőforrások megosztása a közösséggel, és együttműködés a munkatársaival.',
         'forumDescription' : 'Témakörök megvitatása és ötletek megosztása.',
         'eventsDescription' : 'Közzétehet fontos közösségi eseményeket, például szemináriumokat és képzéseket. ',
         'commBookmarks' : 'Hasznos webes erőforrások elérhetővé tétele közvetlenül a közösségből.',
         'commFeeds' : 'Fontos webhelyek hírfolyamainak felvétele a közösségbe.',
         'updatesDescription' : 'Frissítse a közösség állapotát, és tudassa a többi taggal, hogy mit csinál.',
         'calendarDescription' : 'Közzétehet fontos közösségi eseményeket, például szemináriumokat és képzéseket. ',
         'relatedCommunitiesDescription' : 'Kapcsolatok kiépítése más közösségekkel.  ',
         'importantBookmarksDescription' : 'Gyűjtse össze a webes erőforrásokra mutató hivatkozásokat, amelyek fontosak a közösség számára.',
         'tagsDescription' : 'Csoportosítsa az érdekes tartalmakat jelentéssel bíró kulcsszavak használatával, hogy egyszerűbb legyen a keresés.',
         'descriptionDescription' : 'A közösség céljának áttekintése.  A leírásnak a közösség célkitűzéseit és értékeit kell tükröznie.',
         'memberSummaryDescription' : 'Azon személyek, akik tagjai a közösségnek.  Osszon meg információkat és működjön együtt a tagokkal a közösség életre keltéséhez.'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});
