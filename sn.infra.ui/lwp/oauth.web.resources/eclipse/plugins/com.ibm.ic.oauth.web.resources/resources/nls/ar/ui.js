/* *************************************************************** */
/*                                                                 */
/* HCL Confidential                                                */
/*                                                                 */
/* OCO Source Materials                                            */
/*                                                                 */
/* Copyright HCL Technologies Limited 2008, 2019                   */
/*                                                                 */
/* The source code for this program is not published or otherwise  */
/* divested of its trade secrets, irrespective of what has been    */
/* deposited with the U.S. Copyright Office.                       */
/*                                                                 */
/* *************************************************************** */

// NLS_CHARSET=UTF-8
define({
      "authorize" : {
         "legal" : "Licensed Materials - Property of IBM Corp. 5724-S68 \xa9 IBM Corporation 2007, 2012. تعد IBM، شعار IBM، ‏ibm.com، ‏Lotus، علامات تجارية لشركة IBM في الولايات المتحدة الأمريكية أو الدول الأخرى أو كلاهما. ‏حقوق مقصورة على مستخدمي حكومة الولايات المتحدة: تقتصر عمليات الاستخدام أو الاستنساخ أو النشر على تعاقدات ‏GSA ADP Schedule Contract ‏مع شركة ‏IBM Copr.",
         "error" : "حدث خطأ. برجاء اعادة المحاولة فيما بعد.",
         "granted" : {
            "title" : "تم منح التوصل",
            "blurb" : "لقد منحت ${0} امكانية توصل للتفاعل مع حساب HCL Connections الخاص بك."
         },
         "denied" : {
            "title" : "تم رفض التوصل",
            "blurb" : "لقد رفضت منح ${0} امكانية توصل للتفاعل مع حساب HCL Connections الخاص بك."
         },
         "blurb" : "{0} يقوم  بطلب التوصل الى معلومات HCL Connections الخاصة بك، بما في ذلك لك المحتويات الخاصة بك في Connections.",
         "revoke" : {
            "description" : "يمكنك ابطال التوصل في أي وقت من خلال محددات الاتصال > {0}. قد يقوم Connections بسؤال بصفة دورية لاعادة الترخيص.",
            "link" : "التوصل الى التطبيق"
         },
         "authorize" : {
            "label" : "منح التوصل"
         },
         "windowtitle" : "تصريح للتوصل الى HCL Connections",
         "title" : "طلب التوصل",
         "deny" : {
            "label" : "رفض التوصل"
         },
         "action_tooltip" : "منح امكانية التوصل الى التطبيق ${0}",
         "action" : "منح التوصل",
         "connections" : {
            "heading" : "HCL Connections"
         },
         "success" : "اعادة توجيهك الى ${0}."
      },
      "javascript" : {
         "disabled" : {
            "title" : "تشغيل JavaScript",
            "p2" : "قم بتجديد الصفحة للاستمرار.",
            "p1" : "تم الغاء اتاحة JavaScript في برنامج الاستعراض الخاص بك.  HCL Connections تتطلب JavaScript حتى يمكن تشغيلها.  وبمجرد تشغيله، برجاء تجديد الصفحة."
         }
      },
      "errors" : {
         "malformed_request" : {
            "title" : "لا يمكننا تشغيل الطلب الخاص بك",
            "description" : "الطلب الذي تم اصداره بواسطة التطبيق الذي يتطلب امكانية التوصل الى حساب HCL Connections الخاص بك غير كامل.  اضغط على الاختيار للخلف لبرنامج الاستعراض للعودة الى الموقع أو التطبيق الذي قام بالارسال لك وأعد المحاولة مرة أخرى.  اذا استمر هذا الخطأ، قم بابلاغ مسؤول النظام بالمشكلة."
         },
         "invalid_token" : {
            "title" : "لا يمكننا تشغيل الطلب الخاص بك",
            "description" : "الطلب الذي تم اصداره بواسطة التطبيق الذي يتطلب امكانية التوصل الى حساب HCL Connections الخاص بك غير صحيح.  اضغط على الاختيار للخلف لبرنامج الاستعراض للعودة الى الموقع أو التطبيق الذي قام بالارسال لك وأعد المحاولة مرة أخرى.  اذا استمر هذا الخطأ، قم بابلاغ مسؤول النظام بالمشكلة."
         },
         "default_action" : {
            "label" : "العودة الى الصفحة الرئيسية"
         }
      },
      "messagebox" : {
         "error" : {
            "a11y_label" : "خطأ:",
            "icon_alt" : "خطأ"
         },
         "success" : {
            "a11y_label" : "نجاح:",
            "icon_alt" : "نجاح"
         },
         "warning" : {
            "a11y_label" : "تحذير:",
            "icon_alt" : "تحذير"
         },
         "info" : {
            "a11y_label" : "المعلومات:",
            "icon_alt" : "معلومات"
         }
      },
      "loading" : "تحميل...",
      "deny" : {
         "error" : "حدث خطأ. برجاء اعادة المحاولة فيما بعد.",
         "action_tooltip" : "رفض التوصل الى التطبيق ${0}",
         "action" : "رفض التوصل",
         "success" : "تم رفض الاتصال."
      },
      "grid" : {
         "applications" : {
            "summary" : "عرض التطبيقات التي يمكنها التوصل الى معلومات HCL Connections الخاصة بك.",
            "loading" : "تحميل...",
            "empty" : "لم يتم ايجاد تطبيقات.",
            "reverse_sort" : "عكس الفرز"
         }
      },
      "applications" : {
         "windowtitle" : "التوصل الى التطبيق",
         "details" : "ستقوم التطبيقات بالتوصل الى معلومات HCL Connections الخاصة بك.",
         "error" : "لم يتم استرجاع الكشف بسبب حدوث خطأ.",
         "titlebar" : {
            "tab2" : "التوصل الى التطبيق",
            "tab1" : "اعلامات البريد الالكتروني",
            "tab3" : "التعميم"
         },
         "lotusBar" : {
            "refeshPageAriaLabel" : "يقوم الضغط على هذا المفتاح بتجديد الصفحة الحالية، بمحتويات  جديدة.  للعودة الى هذه القائمة، تجول مرة أخرى الى:"
         },
         "a11y" : {
            "titlebar_label" : "اعدادات HCL Connections"
         },
         "heading" : "التوصل الى التطبيق"
      },
      "sorts" : {
         "application_name" : "اسم التطبيق",
         "authorization_date" : "تاريخ الترخيص",
         "expiration_date" : "تاريخ الانتهاء",
         "action" : "‏الوظيفة‏"
      },
      "revoke_token" : {
         "error" : "حدث خطأ. برجاء اعادة المحاولة فيما بعد.",
         "dialog_title" : "ابطال التوصل",
         "action_tooltip" : "رفض امكانية التوصل الى التطبيق ${0}",
         "action" : "رفض",
         "ok" : "‏حسنا‏",
         "cancel" : "الغاء",
         "confirm" : "هل تريد ابطال توصل هذا التطبيق الى معلومات HCL Connections الخاصة بك؟ ",
         "success" : "تم ازالة التطبيق."
      }
});
