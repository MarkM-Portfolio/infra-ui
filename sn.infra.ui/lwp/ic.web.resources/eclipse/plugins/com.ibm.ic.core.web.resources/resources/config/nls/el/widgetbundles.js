/* Copyright IBM Corp. 2014, 2018  All Rights Reserved.              */

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
            'sand_DYK' : 'Προτεινόμενες επαφές',
            'sand_recomItems' : 'Συστάσεις',
            'sand_recomComm' : 'Συστάσεις',
            'sand_thingsInCommon' : 'Κοινά στοιχεία',
            'sand_socialPath' : 'Ποιος μας συνδέει;',
            'sand_simComm' : 'Παρόμοιες κοινότητες'
         },

         // Stock Profiles widget titles
         'lc_default' : {
            'reportStructure' : 'Αλυσίδα αναφοράς',
            'multiFeedReader' : 'Πρόσφατες αναρτήσεις',
            'filesReader' : 'Αρχεία',
            'multiWidget' : 'Πληροφορίες προφίλ',
            'board' : 'Πίνακας',
            'contactInfo' : 'Πληροφορίες επικοινωνίας',
            'backgroundInfo' : 'Ιστορικό',
            'structTags' : 'Δομημένα προσδιοριστικά',
            'commonTags' : 'Προσδιοριστικά οργανισμού',
            'socialTags' : 'Προσδιοριστικά',
            'linkRoll' : 'Οι διασυνδέσεις μου',
            'friends' : 'Δίκτυο'
         },

         // Stock Communities widget titles
         'Blog' : 'Ιστολόγιο',
         'IdeationBlog' : 'Ιστολόγιο ιδεών',
         'Activities' : 'Δραστηριότητες',
         'Files' : 'Αρχεία',
         'Wiki' : 'Wiki',
         'RichContent' : 'Εμπλουτισμένο περιεχόμενο',
         'Forum' : 'Φόρουμ',
         'Bookmarks' : 'Σελιδοδείκτες',
         'Members' : 'Μέλη',
         'Feeds' : 'Υπηρεσίες διανομής',
         'widgetPalette' : 'Παλέτα μικροεργαλείων',
         'feedReader' : 'Πρόγραμμα ανάγνωσης περιεχομένου υπηρεσιών διανομής',
         'SubcommunityNav' : 'Υποκοινότητες',
         'CommunityUpdates' : 'Ενημερώσεις κοινότητας',
         'Updates' : 'Πρόσφατες αλλαγές',
         'RecentUpdates' : 'Πρόσφατες αλλαγές',
         'StatusUpdates' : 'Ενημερώσεις κατάστασης',
         'Calendar' : {
            'default' : 'Συμβάντα',
            'view' : 'Προσεχή συμβάντα'
         },
         'RelatedCommunities' : 'Σχετικές κοινότητες',
         'MyLibrary' : 'Η βιβλιοθήκη μου',
         'MyLibrary.sequenceNumber' : 'Η βιβλιοθήκη μου {0}',
         'Tags' : 'Προσδιοριστικά',
         'MembersSummary' : 'Μέλη',
         'description' : 'Περιγραφή κοινότητας',
         'ImportantBookmarks' : 'Σημαντικοί σελιδοδείκτες',
         // ICEC
         'highlights': {
         	'Highlights' : 'Επιλεγμένο περιεχόμενο',
         	'Highlights.description' : 'Εξατομικεύστε την Επισκόπηση κοινότητας με τη συγκέντρωση περιεχομένου από διάφορες πηγές, δημιουργώντας έτσι μια ξεχωριστή εμπειρία για τα μέλη της κοινότητας.'
         },

         // Stock MediaGallery widget titles
         'lc_clib' : {
            'MediaGallery' : 'Έκθεση μέσων',
            'MediaGallery.description' : 'Μοιραστείτε φωτογραφίες και βίντεο με την κοινότητα.',
            'CustomLibrary' : 'Διασυνδεδεμένη βιβλιοθήκη',
            'CustomLibrary.sequenceNumber' : 'Διασυνδεδεμένη βιβλιοθήκη {0}',
            'CustomLibrary.description' : 'Χρησιμοποιήστε ένα χώρο αποθήκευσης εγγράφων στην κοινότητά σας.',
            'Library' : 'Βιβλιοθήκη',
            'Library.sequenceNumber' : 'Βιβλιοθήκη {0}',
            'Library.description' : 'Εργαστείτε με αρχεία χρησιμοποιώντας προσχέδια, εργαλεία αναθεώρησης και δημοσίευσης.',
            'librarysummary' : 'Χώρος αποθήκευσης εγγράφων',
            'librarysummary.description' : 'Χρησιμοποιήστε ένα χώρο αποθήκευσης εγγράφων στην κοινότητά σας.',
            'Gallery' : 'Έκθεση',
            'Gallery.description' : 'Παρουσιάστε αρχεία σε αυτή την κοινότητα.'
         },

         // Stock Communities widget descriptions
         'subcommunityDescription' : 'Δημιουργήστε μια ομάδα μελών εντός μιας κοινότητας.',
         'galleryDescription' : 'Μοιραστείτε φωτογραφίες και βίντεο με την κοινότητα.',
         'blogsDescription' : 'Μοιραστείτε γρήγορα ειδήσεις και απόψεις με τα μέλη της κοινότητας.',
         'ideationBlogsDescription' : 'Συνεργαστείτε με τα μέλη της κοινότητας για να συνεισφέρετε και να ψηφίσετε ιδέες.',
         'commActivitesDescription' : 'Παρακολουθήστε τους στόχους της κοινότητας, οργανώστε εργασίες και εκχωρήστε αρμοδιότητες.',
         'filesDescription' : 'Ανεβάστε, κάντε κοινή χρήση και εργαστείτε με αρχεία και φακέλους κοινότητας.',
         'wikiDescription' : 'Μοιραστείτε πόρους με την κοινότητά σας και συνεργαστείτε με τους συναδέλφους σας.',
         'forumDescription' : 'Συζητήστε διάφορα θέματα και ανταλλάξτε ιδέες.',
         'eventsDescription' : 'Αναρτήστε σημαντικά συμβάντα της κοινότητας, όπως σεμινάρια και εκπαιδευτικά προγράμματα. ',
         'commBookmarks' : 'Διαθέστε χρήσιμους διαδικτυακούς πόρους απευθείας από την κοινότητά σας.',
         'commFeeds' : 'Προσθέστε στην κοινότητά σας υπηρεσίες διανομής σε σχετικούς διαδικτυακούς τόπους.',
         'updatesDescription' : 'Ενημερώστε την κατάστασή σας στην κοινότητα προκειμένου να γνωρίζουν τα υπόλοιπα μέλη με τι ασχολείστε.',
         'calendarDescription' : 'Αναρτήστε σημαντικά συμβάντα της κοινότητας, όπως σεμινάρια και εκπαιδευτικά προγράμματα. ',
         'relatedCommunitiesDescription' : 'Δημιουργήστε διασυνδέσεις με άλλες κοινότητες.  ',
         'importantBookmarksDescription' : 'Συλλέξτε σελιδοδείκτες που παραπέμπουν σε σημαντικούς διαδικτυακούς πόρους για την κοινότητά σας.',
         'tagsDescription' : 'Ομαδοποιήστε το περιεχόμενο που σας ενδιαφέρει χρησιμοποιώντας περιγραφικές λέξεις-κλειδιά που διευκολύνουν την αναζήτηση και τον εντοπισμό του.',
         'descriptionDescription' : 'Μια γενική περιγραφή της κοινότητάς σας.  Η περιγραφή πρέπει να αποδίδει τους στόχους και τις αξίες της κοινότητας.',
         'memberSummaryDescription' : 'Τα πρόσωπα που συμμετέχουν στην κοινότητα.  Ανταλλάξτε πληροφορίες και συνεργαστείτε μαζί τους για την επίτευξη των στόχων της κοινότητας σας.'
         // 'Highlights.description' : 'Highlights adds more capabilities to the Community Overview page allowing the Community owner to create a richer and more compelling Community experience.'

});

