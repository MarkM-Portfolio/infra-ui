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
         'msg.loginRequired' : 'İçeriğiniz görüntülemek için oturum açın.',
         'ErrorGeneric' : 'İçerik görüntülenirken bir hata oluştu. Sistem yöneticinize başvurun.',
         'showErrorDetails' : 'Hata Ayrıntılarını Göster',
         'HideErrorDetails' : 'Hata Ayrıntılarını Gizle',

         'loadInfo' : 'Bilgileri Yükle ...',

         'dykLoadInfo' : 'Ağınıza eklenmek üzere önerilen kişileri görüntüleyin.',
         'dykLoadInfo2' : 'Mevcut ağ kişilerinize dayalı olarak, ağınıza eklenmek üzere önerilen kişileri görüntüleyin.',

         'wcuLoadInfo' : 'Ağınız ve eylemlerinize dayalı olarak, bu profille ne kadar ilgili olduğunuzu öğrenin.',

         'ticLoadInfo' : 'Ağınız ve eylemlerinize dayalı olarak, bu profille ortak noktalarınızı öğrenin.',

         'deleteWidget' : 'Uygulamayı Kaldır',
         'hideWidget' : 'Uygulamayı Gizle',
         'deleteWidgetMsg' : 'Uygulamanızı kaldırmak üzeresiniz. Bu işlem tüm uygulama içeriğini kaldıracak. Bu eylem geri alınamaz. Üyelerin bu toplulukla paylaştıkları içerik paylaşılmaya devam eder. Uygulama yeniden eklenirse, bu paylaşılan içerik uygulamada yeniden görüntülenir.<br/><br/>Uygulamayı kaldırmak istediğinizden eminseniz, aşağıdaki Kaldır düğmesini tıklatın. <br/>Emin Değilseniz, İptal düğmesini tıklatın.',
         'hideWidgetMsg' : 'Uygulamanızı gizlemek üzeresiniz.<br/><br/>Daha sonra Topluluğunuza yeniden ekleyerek uygulamayı yeniden etkinleştirebilirsiniz. Tüm uygulama içeriği değişmeden kalır.',
         'deleteWidgetWarn' : 'Uyarı: {0} uygulamasına ilişkin veriler kalıcı olarak silinecek.',
         'deleteWidgetConfirm' : 'Uygulamanın ve ilişkili verilerin silineceğini ve kurtarılamayacağını anladım.',
         'deleteWithSharedContentWidgetConfirm' : 'Uygulamanın ve ilişkili verilerin silineceğini ve kurtarılamayacağını anladım.  Üyelerin bu toplulukla paylaştıkları içerik paylaşılmaya devam eder. Uygulama yeniden eklenirse, bu paylaşılan içerik uygulamada yeniden görüntülenir.',
         'delete' : 'Sil',
         'hide' : 'Gizle',
         'cancel' : 'İptal',
         'save' : 'Kaydet',
         'edit' : 'Düzenle',
         'view' : 'Görüntüle',
         'help' : 'Yardım',
         'refresh' : 'Yenile',
         'actions' : 'Eylemler',
         'switchTabWarning' : 'Başka bir sekmeye geçmeden önce, her sekmedeki değişiklikleri kaydetmeniz gerekir.',
         'confirmDeleteWidget' : 'Bu uygulamayı kaldırmak istediğinizden emin misiniz?<br><br>Topluluk Eylemleri menüsünden daha sonra bu uygulamayı geri yükleyebilirsiniz.  Uygulamanın görüntülenmesine ilişkin ayarlar kaybedilir, ancak uygulamanın verileri aynı kalır.',

         // Strings for Change Title dialog
         'changeTitleAction' : 'Başlığı Değiştir',

         // {0} is the translated title of the application being rendered
         'actions_alt' : '${0} için Eylemler',
         'actionsmenu' : 'Eylemler Menüsü',
         'toggle' : 'Geçiş Yap',
         'open' : 'Aç',
         'close' : 'Kapat',

         'widgets_Move' : 'Taşı',
         'widgets_MoveUp' : 'Yukarı Taşı',
         'widgets_MoveDown' : 'Aşağı Taşı',
         'widgets_MoveLeft' : 'Sola Taşı',
         'widgets_MoveRight' : 'Sağa Taşı',
         'widgets_MovePrev' : 'Önceki Sütuna Taşı',
         'widgets_MoveNext' : 'Sonraki Sütuna Taşı',
         'widgets_Min' : 'Simge Durumuna Küçült',
         'widgets_Max' : 'Ekranı Kapla',

         'widgetCat_AllWidgets' : 'Tüm Uygulamalar',
         'widgetCat_thrdParty' : 'Diğer',
         'widgetCat_hidden' : 'Gizli',
         'widget_BackToOverview' : 'Genel Bakış Sayfasına Dön',
         'widget_AddingWidget' : 'Uygulama Ekleniyor',
         'widget_RemovingWidget' : 'Uygulama Kaldırılıyor',
         'widget_AllTab' : 'Tümü',
         'widget_HideConfirmation' : '${0} öğesini bu topluluktan başarıyla gizlediniz. ',
         'widget_HideConfirmationUndo' : 'Geri Al',

         'link.remove' : 'Kaldır',
         'link.window.close' : 'Pencereyi kapat',
         'link.window.openNewWindow' : 'Bu düğme öğe tıklatıldığında yeni bir pencere açılır',

         'error.title.generic' : 'Bir sorunla karşılaşıldı.',
         'error.message.generic' : 'Bir sorun var - Geri düğmesini tıklatın ve yeniden deneyin. Bu sorunu çözmezse, sorunu destek forumunda bildirin.',
         'info.feed.general.moreinfo' : 'Daha fazla ayrıntı görüntülemek için burayı tıklatın',

         'label.theme.customize' : 'Uygulama Ekle',

         // Strings used by errorhandling.js
         'multiFeedReaderNoFeeds' : 'Kullanılabilir özet akışı yok',
         'errorDefaultMsg' : 'Uygulama verileri görüntülenemiyor',
         'errorDefaultMsg2' : 'Bir hata oluştu, Sistem Yöneticinize başvurun',
         'errorDefaultMsg3' : 'Daha fazla ayrıntı görüntülemek için burayı tıklatın',
         'errorMsg' : 'İleti: ',
         'errorName' : 'Ad: ',
         'errorType' : 'Tür: ',
         'errorLine' : 'Satır:',
         'errorStackTrace' : 'İz: ',
         'errorUnableToConnect' : '{0} bağlantısı başarısız oldu'

});

