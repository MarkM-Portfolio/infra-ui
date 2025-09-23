/*******************************************************************************
 * HCL Confidential
 * OCO Source Materials
 *
 * @Project: ICXT
 *
 * @Copyright HCL Technologies Limited 2015, 2020
 * @License: The source code for this program is not published or otherwise divested of its trade secrets, irrespective of what has been deposited with the U.S. Copyright Office.
 *******************************************************************************/
dojo.provide('lconn.core.pdfexportIntegration');

'use strict';

if (true || dojo.config.isDebug) {
    console.log('lconn.core.pdfexportIntegration starting');
}

lconn.core.pdfexportIntegration.util = lconn.core.pdfexportIntegration.util || {};
lconn.core.pdfexportIntegration.util.currentConnectionsPageName = '';
lconn.core.pdfexportIntegration.util.currentConnectionsUrl = '';
lconn.core.pdfexportIntegration.host = '';
lconn.core.pdfexportIntegration.actions = lconn.core.pdfexportIntegration.actions || [];
lconn.core.pdfexportIntegration.nls = lconn.core.pdfexportIntegration.nls || {};

lconn.core.pdfexportIntegration.util.log = function (msg, method) {
    if (dojo.config.isDebug) {
        var logStr = 'lconn.core.pdfexportIntegration'
        if (method.length) {
            logStr += ':' + method
        }
        logStr += ' ' + msg;
        console.log(logStr);
    }
}

lconn.core.pdfexportIntegration.util.cssLoaded = false;
lconn.core.pdfexportIntegration.util.loadCSSCors = function (stylesheet_uri) {
    lconn.core.pdfexportIntegration.util.log('> url:"' + stylesheet_uri + '"', 'util.loadCSSCors');
    if (lconn.core.pdfexportIntegration.util.cssLoaded) {
        lconn.core.pdfexportIntegration.util.log('< css already loaded', 'util.loadCSSCors');
        return;
    }

    var _xhr = window.XMLHttpRequest;
    var has_cred = false;
    try {
        has_cred = _xhr && ('withCredentials' in (new _xhr()));
    } catch (e) {
    }

    if (!has_cred) {
        return;
    }

    var xhr = new _xhr();
    xhr.open('GET', stylesheet_uri);
    xhr.setRequestHeader('Cache-Control', 'max-age=2592000');
    xhr.onload = function () {
        xhr.onload = xhr.onerror = null;
        if (xhr.status < 200 || xhr.status >= 300) {
            lconn.core.pdfexportIntegration.util.log('style failed to load: ' + stylesheet_uri, 'util.loadCSSCors');
        } else {
            var style_tag = document.createElement('style');
            style_tag.appendChild(document.createTextNode(xhr.responseText));
            document.head.appendChild(style_tag);
            lconn.core.pdfexportIntegration.util.cssLoaded = true;
            lconn.core.pdfexportIntegration.util.log('< loaded css', 'util.loadCSSCors');
        };
    }
    xhr.onerror = function () {
        xhr.onload = xhr.onerror = null;
        lconn.core.pdfexportIntegration.util.log('XHR CORS CSS fail:' + styleURI, 'util.loadCSSCors');
    };
    xhr.send();
};

lconn.core.pdfexportIntegration.util.loadNls = function (cb) {
    lconn.core.pdfexportIntegration.util.log('>', 'util.loadNls');

    var locale = dojo.locale;
    if (locale.length > 2 && locale!="pt-br" && locale !="zh-tw") {
        locale = locale.substring(0, 2);
    }

    if (locale == null || locale === '') {
        lconn.core.pdfexportIntegration.util.log('< no locale found, use default "en".', 'util.loadNls');
        locale = 'en';
    }

    _headers = {};
    _headers['Cache-Control'] = 'max-age=2592000';

    // The parameters to pass to xhrGet, the url, how to handle it, and the callbacks.
    var xhrArgs = {
        url: lconn.core.pdfexportIntegration.host + '/ic360/ui/nls/cors/locale_' + locale + '.json',
        handleAs: 'json',
        preventCache: false,
        headers: _headers,
        load: function (data) {
            lconn.core.pdfexportIntegration.util.log('< data: "' + data + '"', 'util.loadNls');
            cb(null, data);
        },
        error: function (data) {
            lconn.core.pdfexportIntegration.util.log('< error - nls error: "' + data + '"', 'util.loadNls');
            cb(data);
        },
        withCredentials: true
    };

    // Call the asynchronous xhrGet
    dojo.xhrGet(xhrArgs);
};

lconn.core.pdfexportIntegration.util.getURLParameter = function (/* string */name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null;
};

lconn.core.pdfexportIntegration.util.isUserLoggedIntoConnections = function () {
    try {
        var isAuthenticated = lconn.core.auth.isAuthenticated();
        return isAuthenticated;
    } catch (e) { }
    // assume user is logged in if prev check fails
    return true;
}

lconn.core.pdfexportIntegration.util.calculateConnectionsPageContext = function () {
    lconn.core.pdfexportIntegration.util.log('>', 'util.calculateConnectionsPageContext');

    // get config props
    var currentUrl = encodeURIComponent(window.location.href);
    try {
        // in case the uri is encoded twice -> window.location.href returns .../wikis/home?lang=de-de#!/wiki/Random%20Wiki%20Entries
        // -> sending it as Random%2520Wiki%2520Entries would break the code, so need to encode first, then decode again
        currentUrl = encodeURIComponent(decodeURIComponent(currentUrl));
    } catch (e) {
    }
    lconn.core.pdfexportIntegration.util.currentConnectionsUrl = currentUrl;
    lconn.core.pdfexportIntegration.util.currentConnectionsPageName = null;

    if (dojo.byId('editCommunityForm')) {
        lconn.core.pdfexportIntegration.util.currentConnectionsPageName = 'editCommunity'
    } else {

        if (document.querySelectorAll('#wikiContentDiv').length) {
            lconn.core.pdfexportIntegration.util.currentConnectionsPageName = 'wikis';
        }
        if (document.querySelectorAll('#activitypage').length) {
            lconn.core.pdfexportIntegration.util.currentConnectionsPageName = 'activities';
        }

        if (document.querySelectorAll('#forum').length || document.querySelectorAll('#topicList .normalTopic').length) {
            lconn.core.pdfexportIntegration.util.currentConnectionsPageName = 'forums';
        }
        if (document.querySelectorAll('.blogsFixedTable tr').length) {
            lconn.core.pdfexportIntegration.util.currentConnectionsPageName = 'blogs';
        }

        lconn.core.pdfexportIntegration.util.log('< set to "' + lconn.core.pdfexportIntegration.util.currentConnectionsPageName + '"', 'util.calculateConnectionsPageContext');
    }
}

lconn.core.pdfexportIntegration.util.isConnectionsPageIn = function (pageNames) {
    lconn.core.pdfexportIntegration.util.log('> "' + pageNames + '"', 'util.isConnectionsPageIn');

    var isIncluded = false;
    for (pageName in pageNames) {
        if (pageNames[pageName] === lconn.core.pdfexportIntegration.util.currentConnectionsPageName) {
            isIncluded = true;
            break;
        }
    }

    lconn.core.pdfexportIntegration.util.log('< ' + isIncluded, 'util.isConnectionsPageIn');
    return isIncluded;
}

lconn.core.pdfexportIntegration.util.isConnectionsPage = function (pageName) {
    return pageName === lconn.core.pdfexportIntegration.util.currentConnectionsPageName;
}

lconn.core.pdfexportIntegration.util.updatePdfIntegration = function () {
    lconn.core.pdfexportIntegration.util.log('>', 'util.updatePdfIntegration');
    lconn.core.pdfexportIntegration.util.calculateConnectionsPageContext();

    lconn.core.pdfexportIntegration.util.activateActivitiesObserver();
    lconn.core.pdfexportIntegration.util.activateWikisObserver();

    if (!lconn.core.pdfexportIntegration.util.isConnectionsPageIn(['activities', 'blogs', 'forums', 'wikis', 'editCommunity'])) {
        lconn.core.pdfexportIntegration.util.log('< no action available for this page', 'util.updatePdfIntegration');
        return;
    }

    lconn.core.pdfexportIntegration.util.log('check ICXT authentication status', 'ui.init');

    if (lconn.core.pdfexportIntegration.util.isConnectionsPage('editCommunity')) {
        lconn.core.pdfexportIntegration.util.renderManagePdfAccessBtn();

    } else if (lconn.core.pdfexportIntegration.util.isConnectionsPageIn(['activities', 'blogs', 'forums', 'wikis'])) {
        lconn.core.pdfexportIntegration.util.loadCSSCors(lconn.core.pdfexportIntegration.host + '/ic360/ui/api/res/cors/pdfexportIntegration.css');
        if (lconn.core.pdfexportIntegration.util.checkForContents()) {
            lconn.core.pdfexportIntegration.util.calculateRenderPdfExportBtn();
        }
    }
    lconn.core.pdfexportIntegration.util.log('<', 'util.updatePdfIntegration');
}

lconn.core.pdfexportIntegration.util.evaluateContextOnChange = function () {
    lconn.core.pdfexportIntegration.util.log('>', 'evaluateContextOnChange');

    window.addEventListener("hashchange", function () {
        lconn.core.pdfexportIntegration.util.log('onhashchange', 'evaluateContextOnChange');
        lconn.core.pdfexportIntegration.util.updatePdfIntegration();
    }, true);

    window.onmessage = function (event) {
        lconn.core.pdfexportIntegration.util.log('> got message: ' + event.data, 'event.message');
        try {
            if (event && event.data && event.data.indexOf('lconn.core.pdfexportIntegration') < 0) {
                // only handle lconn.core.pdfexportIntegration events here
                return;
            }
            if (event.data === 'lconn.core.pdfexportIntegration.loginSuccess') {
                lconn.core.pdfexportIntegration.util.log('user logged in, refresh ICXT', 'event.message');
                location.reload();
            }
        } catch (e) {
            lconn.core.pdfexportIntegration.util.log('caught exception when evaluating event', 'event.message');
        }
    }
    lconn.core.pdfexportIntegration.util.log('<', 'evaluateContextOnChange');
}

lconn.core.pdfexportIntegration.util.activitiesObserver = null;
lconn.core.pdfexportIntegration.util.activateActivitiesObserver = function () {
    lconn.core.pdfexportIntegration.util.log('> ', 'util.activateActivitiesObserver');
    var activityDOM = document.querySelector('#activitypage');
    if (!activityDOM) {
        lconn.core.pdfexportIntegration.util.log('< - no activity', 'util.activateActivitiesObserver');
        return;
    }

    if (!lconn.core.pdfexportIntegration.util.activitiesObserver) {
        lconn.core.pdfexportIntegration.util.activitiesObserver = new MutationObserver(function (mutations, observer) {
            if (document.querySelectorAll('#activitypage').length) {
                var pdfExportBtn = document.querySelector('.pdfexportBtn');

                if (document.querySelectorAll('.lotusBottomCorner ul .lotusSelected #actNavPaneloutlineLabel').length) {
                    if (document.querySelector('#activitypage').style.display != 'none') {
                        if (lconn.core.pdfexportIntegration.util.checkForContents()) {
                            var activityNodes = document.querySelector('#activitypage').querySelectorAll('.nodeContainer').length;
                            if (document.querySelector('.lotusFormBody.content') || activityNodes == 0) {
                                if (pdfExportBtn) {
                                    pdfExportBtn.style.display = 'none';
                                }
                                return;
                            }
                            if (activityNodes != 0) {
                                if (!pdfExportBtn) {
                                    lconn.core.pdfexportIntegration.util.updatePdfIntegration();
                                } else if (pdfExportBtn.style.display == 'none') {
                                    pdfExportBtn.style.display = '';
                                }
                            }
                        } else if (pdfExportBtn) {
                            pdfExportBtn.remove();
                        }
                    }
                } else if (pdfExportBtn) {
                    pdfExportBtn.remove();
                }
            }
        });
    }
    lconn.core.pdfexportIntegration.util.activitiesObserver.disconnect();

    var config = {
        childList: true,
        subtree: true
    };
    lconn.core.pdfexportIntegration.util.activitiesObserver.observe(activityDOM, config);
    lconn.core.pdfexportIntegration.util.log('< observer initialized', 'util.activitiesObserver');
}

lconn.core.pdfexportIntegration.util.wikisObserver = null;
lconn.core.pdfexportIntegration.util.activateWikisObserver = function () {
    lconn.core.pdfexportIntegration.util.log('> ', 'util.activateWikisObserver');
    try {
        if (!wikisConfig) {
            // ensure this is only done on wiki page
            lconn.core.pdfexportIntegration.util.log('< - no wiki', 'util.activateWikisObserver');
            return;
        }
    } catch (e) {
        // ensure this is only done on wiki page
        lconn.core.pdfexportIntegration.util.log('< - no wiki', 'util.activateWikisObserver');
        return;
    }

    if (!lconn.core.pdfexportIntegration.util.wikisObserver) {
        lconn.core.pdfexportIntegration.util.log('init wikis observer', 'util.activateWikisObserver');
        lconn.core.pdfexportIntegration.util.wikisObserver = new MutationObserver(function (mutations, observer) {
            lconn.core.pdfexportIntegration.util.updatePdfIntegration();
        });
    }
    if (document.location.href.indexOf('/mywikis/create') && document.querySelector('.lotusFormButton')) {
        lconn.core.pdfexportIntegration.util.log('prepare event listening on wikis creation view', 'util.activateWikisObserver');
        document.querySelector('.lotusFormButton').onclick = function () {
            setTimeout(function () {
                lconn.core.pdfexportIntegration.util.updatePdfIntegration();
            }, 3000);
        }
    }
    var lotusMain = document.querySelector('#lotusContent');
    var config = {
        childList: true
    };
    lconn.core.pdfexportIntegration.util.wikisObserver.observe(lotusMain, config);
    lconn.core.pdfexportIntegration.util.log('< observer initialized', 'util.activateWikisObserver');
}

lconn.core.pdfexportIntegration.util.addPdfExportBtn = function (context) {
    lconn.core.pdfexportIntegration.util.log('> context: "' + JSON.stringify(context) + '"', 'util.addPdfExportBtn');

    var contextApp = '' || context.app;
    var contextUuid = '' || context.uuid;

    // in case the is an & in the UUID, this must be encoded
    if (contextUuid.indexOf('&')) {
        contextUuid = contextUuid.replace('&', '%26');
    }

    var replacementMap = {};
    replacementMap['{{app}}'] = contextApp;
    replacementMap['{{uuid}}'] = contextUuid;
    var uri = lconn.core.pdfexportIntegration.util.replacePlaceHolders('/ic360/ui/tools/pdf-export.html?app={{app}}&uuid={{uuid}}', replacementMap);
    uri += '&iframe=resize,hidefooter,hidenav';

    if (lconn.core.pdfexportIntegration.util.getURLParameter('jsdebug')) {
        uri += '&jsdebug=' + lconn.core.pdfexportIntegration.util.getURLParameter('jsdebug');
    }
    if (lconn.core.pdfexportIntegration.util.getURLParameter('jscomponents')) {
        uri += '&jscomponents=' + lconn.core.pdfexportIntegration.util.getURLParameter('jscomponents');
    }

    if (uri.indexOf('/') == 0) {
        uri = lconn.core.pdfexportIntegration.host + uri;
    }

    var d = document;
    if (lconn.core.pdfexportIntegration.util.isConnectionsPageIn('wikis')) {
        var pageActionsElem = null;
        try {
            pageActionsElem = document.querySelector('.lotusBtnContainer .lotusBtn .lotusArrow.lotusDropDownSprite').parentElement
        } catch (e) { }

        // on the wikis page we want to render the action into the existing Page Actions button, instead of as an icon
        if (pageActionsElem) {
            // add click event handler

            // overwrite existing link with link above
            lconn.core.pdfexportIntegration.util.log('<', 'util.addPdfExportBtn');
            //return;
        }
    }

    var label = lconn.core.pdfexportIntegration.util.translate('pdfexport.label');

    var container = d.createElement('span');
    container.className = 'pdfexportBtn';
    container.title = label;

    if (lconn.core.pdfexportIntegration.util.isVisualUpdateApplied()) {
        container.className += ' pdfexportVU';
    }

    var svg = new DOMParser().parseFromString('<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 52 55"><title>' + label + '</title><defs><style>.cls-1{fill:none;clip-rule:evenodd;}.cls-2{clip-path:url(#clip-path);}.cls-3{clip-path:url(#clip-path-2);}.cls-4{clip-path:url(#clip-path-3);}.cls-5{clip-path:url(#clip-path-4);}.cls-6{clip-path:url(#clip-path-5);}</style><clipPath id="clip-path" transform="translate(5 5)"><polygon class="cls-1" points="42 15 42 12 30 12 30 33 33 33 33 24 40.5 24 40.5 21 33 21 33 15 42 15"/></clipPath><clipPath id="clip-path-2" transform="translate(5 5)"><path class="cls-1" d="M9,15H3v7.5H9Zm0-3a3,3,0,0,1,3,3v7.5a3,3,0,0,1-3,3H3V33H0V12Z"/></clipPath><clipPath id="clip-path-3" transform="translate(5 5)"><path class="cls-1" d="M21,15H18V30h3a3,3,0,0,0,3-3V18A3,3,0,0,0,21,15Zm0-3a6,6,0,0,1,6,6v9a6,6,0,0,1-6,6H15V12Z"/></clipPath><clipPath id="clip-path-4" transform="translate(5 5)"><path class="cls-1" d="M36,36v6H6V36H3v6a3,3,0,0,0,3,3H36a3,3,0,0,0,3-3V36Z"/></clipPath><clipPath id="clip-path-5" transform="translate(5 5)"><path class="cls-1" d="M6,9V3H36V9h3V3a3,3,0,0,0-3-3H6A3,3,0,0,0,3,3V9Z"/></clipPath></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><g class="cls-2"><rect x="30" y="12" width="22" height="31"/></g><g class="cls-3"><rect y="12" width="22" height="31"/></g><g class="cls-4"><rect x="15" y="12" width="22" height="31"/></g><g class="cls-5"><rect x="3" y="36" width="46" height="19"/></g><g class="cls-6"><rect x="3" width="46" height="19"/></g></g></g></svg>',
        'application/xml');

    svg.documentElement.style.width = '24px';
    svg.documentElement.style.height = '24px';

    container.appendChild(svg.documentElement);

    container.onclick = function (e) {
        e.preventDefault();
        lconn.core.pdfexportIntegration.util.addIFrameDialog(label, uri);
        return false;
    }

    var previousElem = document.querySelector('.pdfexportBtn');
    if (previousElem) {
        previousElem.parentElement.removeChild(previousElem);
    }

    var elem;
    if (d.querySelector('.lotusContent .lotusActionBar')) {
        elem = d.querySelector('.lotusContent .lotusActionBar');
    }
    if (d.querySelector('.lotusContent .lotusBtnContainer')) {
        elem = d.querySelector('.lotusContent .lotusBtnContainer');
    }
    if (d.querySelector('.lotusContent .ActivityNode #lconn_act_ActivityButtons_0 .lotusActionBar .actionButtons')) {
        elem = d.querySelector('.lotusContent .ActivityNode #lconn_act_ActivityButtons_0 .lotusActionBar .actionButtons');
        // activities uses different styling than other apps, need to accommodate for this.
        container.className += ' activitiesPdfBtn';
    }
    if (!elem) {
        lconn.core.pdfexportIntegration.util.log('< false - no element found to add to', 'util.addPdfExportBtn');
        return;
    }

    if (document.querySelectorAll('#topicList .normalTopic').length) {
        elem.querySelector('.lotusBtnAction').after(container);
    } else {
        elem.appendChild(container);
    }

    lconn.core.pdfexportIntegration.util.log('<', 'util.addPdfExportBtn');
};

lconn.core.pdfexportIntegration.util.removePdfExportBtn = function () {
    var elem = document.querySelector('.lotusBtn.pdfexport');
    if (elem) {
        elem.parentElement.removeChild(elem);
        lconn.core.pdfexportIntegration.util.log('removed pdf export button', 'util.removePdfExportBtn');
    }
}

lconn.core.pdfexportIntegration.util.calculateRenderPdfExportBtn = function () {
    lconn.core.pdfexportIntegration.util.log('>', 'util.calculateRenderPdfExportBtn');

    var pdfExportAccessURL = lconn.core.pdfexportIntegration.host + '/ic360/ui/api/mod/pdfexport/integration/acl.json?context=' + lconn.core.pdfexportIntegration.util.currentConnectionsUrl;

    var communityUuid = null;
    var el = document.querySelector('.vcomm .uuid');
    if (el) {
        communityUuid = el.innerText;
        pdfExportAccessURL = pdfExportAccessURL + '&communityUuid=' + communityUuid
    }

    // The parameters to pass to xhrGet, the url, how to handle it, and the callbacks.
    var xhrArgs = {
        url: pdfExportAccessURL,
        handleAs: 'json',
        load: function (data) {
            data = data.respData || data;
            if (data.access) {
                lconn.core.pdfexportIntegration.context = data.context || {};
                lconn.core.pdfexportIntegration.util.addPdfExportBtn(lconn.core.pdfexportIntegration.context);
            }

            lconn.core.pdfexportIntegration.util.log('<', 'util.calculateRenderPdfExportBtn');
        },
        error: function (error) {
            lconn.core.pdfexportIntegration.util.log('< error - failed fetching ACLs', 'util.calculateRenderPdfExportBtn');
        },
        withCredentials: true
    };

    // Call the asynchronous xhrGet
    dojo.xhrGet(xhrArgs);
}

lconn.core.pdfexportIntegration.util.renderManagePdfAccessBtn = function () {
    lconn.core.pdfexportIntegration.util.log('>', 'util.renderManagePdfAccessBtn');

    if (ic_comm_multiTenantMode) {
        // https://jira.cwp.pnp-hcl.com/browse/CNXSERV-9731 - do not render pdf access management button in MT environment
        return;
    }

    var communityUuid = lconn.core.pdfexportIntegration.util.getURLParameter('communityUuid');

    var uri = '/ic360/ui/tools/pdf-export-community-access.html?iframe=resize,hidefooter,hidenav&communityUuid=' + communityUuid + '&context=' + lconn.core.pdfexportIntegration.util.currentConnectionsUrl;

    if (lconn.core.pdfexportIntegration.util.getURLParameter('jsdebug')) {
        uri += '&jsdebug=' + lconn.core.pdfexportIntegration.util.getURLParameter('jsdebug');
    }
    if (lconn.core.pdfexportIntegration.util.getURLParameter('jscomponents')) {
        uri += '&jscomponents=' + lconn.core.pdfexportIntegration.util.getURLParameter('jscomponents');
    }

    if (uri.indexOf('/') == 0) {
        uri = lconn.core.pdfexportIntegration.host + uri;
    }

    var label = lconn.core.pdfexportIntegration.util.translate('pdfexport.manageAccess.label');

    var d = document;
    var elem;
    if (d.querySelector('#ediPageTabContanierId')) {
        elem = d.querySelector('#ediPageTabContanierId');
    }

    var manageAccessTab = d.createElement('li');
    manageAccessTab.id = 'pdfexportaccess'
    manageAccessTab.innerHTML = '<a tabindex="-1" class="_linkHolder lotusLeft">' + label + '</a>';
    manageAccessTab.style.cursor = 'pointer';

    manageAccessTab.onclick = function (e) {
        e.preventDefault();

        var lotusSelectedTab = document.querySelector('#ediPageTabContanierId li.lotusSelected');
        if (lotusSelectedTab) {
            lotusSelectedTab.className = '';
        }

        var pdfexportaccessTab = document.querySelector('#pdfexportaccess');
        if (pdfexportaccessTab) {
            pdfexportaccessTab.className = 'lotusSelected';
        }

        // add onclick behavior to remove lotusSelected when clicking another tab
        var tabs = document.querySelectorAll('#ediPageTabContanierId li');
        for (var i = 0; i < tabs.length; i++) {
            var _tab = tabs[i];
            if (_tab.id === 'pdfexportaccess') {
                continue;
            }
            _tab.addEventListener('click', function () {
                pdfexportaccessTab.className = '';
            })
        }

        // add the iframe
        lconn.core.pdfexportIntegration.util.openCommunityEditPdfAccessTab(label, uri);
        return false;
    }

    var previousElem = document.querySelector('#pdfexportaccess');
    if (previousElem) {
        previousElem.parentElement.removeChild(previousElem);
    }

    elem.appendChild(manageAccessTab);

    lconn.core.pdfexportIntegration.util.log('<', 'util.renderManagePdfAccessBtn');
}

lconn.core.pdfexportIntegration.util.addIFrameDialog = function (label, uri, size) {
    var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], windowX = w.innerWidth || e.clientWidth || g.clientWidth, windowY = w.innerHeight || e.clientHeight || g.clientHeight;

    if (!size) {
        size = 'large'
    }

    if (size === 'small') {
        windowX = windowX * 0.3;
        windowY = windowY * 0.15;

        if (windowX < 400) {
            windowX = 400;
        }
        if (windowY < 200) {
            windowY = 200;
        }
    } else {
        windowX = windowX * 0.9;
        windowY = windowY * 0.8;

        if (windowX < 700) {
            windowX = 700;
        }
        if (windowY < 550) {
            windowY = 550;
        } else if (windowY > 970) {
            windowY = 970;
        }
    }

    var closeButtonLabel=lconn.core.pdfexportIntegration.nls['core']['button.close'] || "core.button.close";
    
    var dialogHtml = '<div aria-labelledby="dialog_title_0" role="dialog" class="lotusDialogWrapper dijitDialog" id="lconn_share_widget_Dialog_1" widgetid="lconn_share_widget_Dialog_1"><div class="" data-dojo-attach-point="containerNode"><div class="lotusDialogBorder"><form method="POST" class="lotusDialog lotusForm"><div id="dialog_title_0" class="lotusDialogHeader lotusDialogHeader-header" aria-label="' + label + '"><h1 class="lotusHeading lotusHeading-heading">' + label + '</h1><a class="lotusDialogClose" href="javascript:;" title="'+closeButtonLabel+'" role="button"><img alt="Close" style="background-position: -112px; !important" src="/connections/resources/web/com.ibm.lconn.core.styles.oneui3/images/blank.gif?etag=20150401.105152"><span class="lotusAltText">X</span></a></div><div><div class="lotusDialogContent">  <iframe style="height: ' + windowY + 'px; width: ' + windowX + 'px; border:none" src="' + uri + '"></iframe></div></div></form></div></div></div>';

    var dia = new dijit.Dialog();
    dia.setContent(dialogHtml);
    dia.show();
    var dialogWrapper = dojo.query('.lotusDialogWrapper', dia.domNode)[0];

    var lotusDialogContent = dojo.query('.lotusDialogContent', dia.domNode)[0];
    dojo.style(lotusDialogContent, 'max-height', '1000px');
    // prevent scrollbar on side
    dojo.style(lotusDialogContent, 'overflow', 'hidden');

    var bb = dojo.position(dialogWrapper, true);
    dojo.style(dialogWrapper, 'top', (-1 * bb.h) / 2 + 'px');
    dojo.style(dialogWrapper, 'left', (-1 * bb.w) / 2 + 'px');

    // check that underlay has correct height
    var underlayWrapper = document.querySelector('.dijitDialogUnderlayWrapper');
    if (underlayWrapper && underlayWrapper.style.height < window.innerHeight) {
        var height = window.innerHeight + 'px';
        var underlay = document.querySelector('.dijitDialogUnderlay');

        underlayWrapper.style.height = height;
        if (underlay && underlay.style.height) {
            underlay.style.height = height;
        }
    }

    var dialogClose = dojo.query('.lotusDialogWrapper .lotusDialogClose', dia.domNode)[0];
    dojo.connect(dialogClose, 'onclick', dojo.hitch(function () {
        dia.hide();
        dia.destroyRecursive();
        dia = null;
    }));
}

lconn.core.pdfexportIntegration.util.openCommunityEditPdfAccessTab = function (label, uri) {

    var initialFormContainer = document.querySelector('#initialFormContainer');
    if (initialFormContainer) {
        initialFormContainer.style.visibility = 'hidden';
        initialFormContainer.style.display = 'none';
    }

    var editModeContainer = document.querySelector('#widget-container-editModeContainer');
    editModeContainer.innerHTML = '<iframe style="height: 100%; min-height: 200px; width: 100%; border:none" src="' + uri + '"></iframe>';

}

lconn.core.pdfexportIntegration.util.closeEditMode = function () {

    var editCommunityCancelBtn = document.querySelector('#editCommunityCancelBtn');
    if (editCommunityCancelBtn) {
        editCommunityCancelBtn.click();
    }

}

lconn.core.pdfexportIntegration.util.isVisualUpdateApplied = function () {
    if (typeof lconn.core.pdfexportIntegration.util._isVisualUpdateApplied !== 'undefined') {
        return lconn.core.pdfexportIntegration.util._isVisualUpdateApplied;
    }
    lconn.core.pdfexportIntegration.util.log('>', 'util.isVisualUpdateApplied');
    lconn.core.pdfexportIntegration.util._isVisualUpdateApplied = false;
    var ss = document.styleSheets;
    for (var i = 0, max = ss.length; i < max; i++) {
        if (ss[i].href && ss[i].href.indexOf('global.css') > 0) {
            lconn.core.pdfexportIntegration.util._isVisualUpdateApplied = true;
            break;
        }
    }
    lconn.core.pdfexportIntegration.util.log('< ' + lconn.core.pdfexportIntegration.util._isVisualUpdateApplied, 'util.isVisualUpdateApplied');
    return lconn.core.pdfexportIntegration.util._isVisualUpdateApplied;
}

lconn.core.pdfexportIntegration.util.replacePlaceHolders = function (uri, replacementMap) {
    for (var key in replacementMap) {
        if (replacementMap.hasOwnProperty(key)) {
            if (uri.indexOf(key) >= 0) {
                uri = uri.replace(key, replacementMap[key]);
            }
        }
    }

    return uri;
};

lconn.core.pdfexportIntegration.util.translate = function (translateKey, replacements) {
    if (translateKey.indexOf('integration.') != 0) {
        translateKey = 'integration.' + translateKey;
    }
    if (lconn.core.pdfexportIntegration.nls && lconn.core.pdfexportIntegration.nls[translateKey]) {
        var translation = lconn.core.pdfexportIntegration.nls[translateKey];
        // if replacements given, process them
        if (replacements) {
            for (key in replacements) {
                if (translation.indexOf('{{' + key + '}}') >= 0) {
                    translation = translation.replace('{{' + key + '}}', replacements[key]);
                }
            }
        }
        return translation;
    }
    return translateKey;
};

lconn.core.pdfexportIntegration.util.checkAuthenticated = function (cb) {
    lconn.core.pdfexportIntegration.util.log('>', 'util.checkAuthenticated');

    // The parameters to pass to xhrGet, the url, how to handle it, and the callbacks.
    var xhrArgs = {
        url: lconn.core.pdfexportIntegration.host + '/ic360/ui/api/context/cors/whoami.json',
        withCredentials: true,
        load: function (data) {
            if (data == null || data.indexOf('j_security_check') > -1 || data.indexOf('<title>Login - ICXT</title>') > -1) {
                lconn.core.pdfexportIntegration.util.log('< false - login to "' + lconn.core.pdfexportIntegration.host + '/ic360/ui/api/context/cors/ whoami.json" failed', 'util.checkAuthenticated');
                // not authenticated - might have gotten login page as response
                cb('noauth');
            } else {
                lconn.core.pdfexportIntegration.util.log('< true - login succeeded. set cookie and resolve..', 'util.checkAuthenticated');
                cb(null);
            }
        },
        error: function (data) {
            cb(data);
        }
    };

    // Call the asynchronous xhrGet
    dojo.xhrPost(xhrArgs);
};

lconn.core.pdfexportIntegration.util.checkForContents = function () {
    lconn.core.pdfexportIntegration.util.log('>', 'util.checkForContents');
    if (document.querySelectorAll('#activitypage').length) {
        if (!(document.querySelectorAll('.Section').length || document.querySelectorAll('.MiniNode').length)) {
            lconn.core.pdfexportIntegration.util.log('< false - activity has no content', 'util.checkForContents');
            return false;
        }
    }

    if (document.querySelectorAll('.blogsFixedTable tr').length) {
        if (document.querySelectorAll('#entries>.lconnEmpty').length) {
            lconn.core.pdfexportIntegration.util.log('< false - blog has no content', 'util.checkForContents');
            return false;
        }
    }
    lconn.core.pdfexportIntegration.util.log('< true', 'util.checkForContents');
    return true;
}

dojo.addOnLoad(function () {
    try {
        // load resources
        lconn.core.pdfexportIntegration.util.loadNls(function (err, data) {
            if (err) {
                lconn.core.pdfexportIntegration.util.log('Error retrieving nls: "' + JSON.stringify(err) + '"', 'ui.init');
            }
            if (data) {
                lconn.core.pdfexportIntegration.util.log('retrieved nls data: "' + JSON.stringify(data) + '"', 'ui.init');
                lconn.core.pdfexportIntegration.nls = data;
            }
        });

        var waitFor = function (callback, elXpath, elXpathRoot, maxInter, waitTime) {
            if (!elXpathRoot) {
                var elXpathRoot = dojo.body();
            }
            if (!maxInter) {
                var maxInter = 10000; // number of intervals before expiring
            }
            if (!waitTime) {
                var waitTime = 1; // 1000=1 second
            }
            if (!elXpath) {
                return;
            }
            var waitInter = 0; // current interval
            var intId = setInterval(function () {
                if (++waitInter < maxInter && (!dojo.query(elXpath, elXpathRoot).length || !Object.keys(lconn.core.pdfexportIntegration.nls).length)) {
                    return;
                }

                clearInterval(intId);
                if (waitInter >= maxInter) {
                    lconn.core.pdfexportIntegration.util.log('**** WAITFOR [' + elXpath + '] WATCH EXPIRED!!! interval ' + waitInter + ' (max:' + maxInter + ')', 'ui.waitFor');
                } else {
                    lconn.core.pdfexportIntegration.util.log('**** WAITFOR [' + elXpath + '] WATCH TRIPPED AT interval ' + waitInter + ' (max:' + maxInter + ')', 'ui.waitFor');
                    callback();
                }
            }, waitTime);
        };

        waitFor(function () {
            lconn.core.pdfexportIntegration.util.log('> initialize pdfexport integration', 'ui.init');
            if (!lconn.core.pdfexportIntegration.util.isUserLoggedIntoConnections()) {
                lconn.core.pdfexportIntegration.util.log('< anonymous user has no access to any pdf related features', 'ui.init');
                return;
            }

            // add event listening to continuously evaluate context
            lconn.core.pdfexportIntegration.util.evaluateContextOnChange();
            // render pdf button if necessary
            lconn.core.pdfexportIntegration.util.updatePdfIntegration();

            lconn.core.pdfexportIntegration.util.log('< pdfexport integration initialized', 'ui.init');
        }, '.lotusContent');
    } catch (e) {
        alert('Exception occurred in lconn.core.pdfexportIntegration: ' + e);
    }
});