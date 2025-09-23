/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([
      "dojo/topic",
      "ic-core/config",
      "ic-core/config/services",
      "ic-core/config/properties",
      "ic-core/globalization/scenes/Preferences"
], function(topic, config, services, properties, Preferences) {
   describe("the Preferences scene", function() {
      var scene;
      beforeEach(function() {
         scene = new Preferences();
      });
      afterEach(function() {
         scene.end();
      });
      it("implements the expected methods", function() {
         expect(scene.begin).toEqual(jasmine.any(Function));
         expect(scene.render).toEqual(jasmine.any(Function));
         expect(scene.end).toEqual(jasmine.any(Function));
      });
      describe("the constructor", function() {
         it('subscribes to the ic-core/action/completed topic', function() {
            var MESSAGE = {
               'foo' : 'bar'
            };
            scene._renderMessage = jasmine.createSpy('renderMessage');
            topic.publish("ic-core/action/completed", {
               messages : MESSAGE
            });
            expect(scene._renderMessage).toHaveBeenCalledWith(MESSAGE);
         });
      });
      describe("the begin() method", function() {
         it('calls render()', function() {
            scene.render = jasmine.createSpy('render');
            scene.begin();
            expect(scene.render).toHaveBeenCalled();
         });
      });
      describe("the getTabs() method", function() {
         var _enableEmail, _news, _oauth, _property, scene_with_app;
         var URLCONFIG = {
            url : 'abc'
         };
         beforeEach(function() {
            _oauth = services.oauth;
            _news = services.news;
            _enableEmail = config.enableEmail;
            _property = properties["com.ibm.lconn.oauth.ui.enabled"];
            scene_with_app = new Preferences({
               nls : {
                  globalization : {
                     titlebar : {
                        tab1 : 'Notifications',
                        tab2 : 'Globalization',
                        tab3 : 'Oauth'
                     }
                  }
               },
               getUrl : function() {
                  return '';
               }
            });
         });
         afterEach(function() {
            services.oauth = _oauth;
            services.news = _news;
            config.enableEmail = _enableEmail;
            properties["com.ibm.lconn.oauth.ui.enabled"] = _property;
         });
         it('returns three tabs when oauth, news and email are enabled', function() {
            services.oauth = services.news = URLCONFIG;
            config.enableEmail = true;
            expect(scene_with_app.getTabs().length).toBe(3);
         });
         it('does not return news when news is not enabled or email is not enabled', function() {
            services.oauth = services.news = URLCONFIG;
            config.enableEmail = false;
            expect(scene_with_app.getTabs().length).toBe(2);

            delete services.news;
            config.enableEmail = true;
            expect(scene_with_app.getTabs().length).toBe(2);
         });
         it('does not return oauth when oauth is not enabled or its ui is hidden', function() {
            services.news = URLCONFIG;
            delete services.oauth;
            config.enableEmail = true;
            delete properties["com.ibm.lconn.oauth.ui.enabled"];
            expect(scene_with_app.getTabs().length).toBe(2);

            services.oauth = services.news = URLCONFIG;
            properties["com.ibm.lconn.oauth.ui.enabled"] = "false";
            expect(scene_with_app.getTabs().length).toBe(2);
         });
         it('does not return news when news is not enabled or email is not enabled', function() {
            services.oauth = services.news = URLCONFIG;
            config.enableEmail = false;
            expect(scene_with_app.getTabs().length).toBe(2);

            delete services.news;
            config.enableEmail = true;
            expect(scene_with_app.getTabs().length).toBe(2);
         });
         it('only returns globalization when news is not enabled or email is not enabled, and oauth is not enabled or its ui is hidden', function() {
            delete services.news;
            delete services.oauth;
            config.enableEmail = true;
            delete properties["com.ibm.lconn.oauth.ui.enabled"];
            expect(scene_with_app.getTabs().length).toBe(1);

            services.oauth = services.news = URLCONFIG;
            config.enableEmail = false;
            properties["com.ibm.lconn.oauth.ui.enabled"] = "false";
            expect(scene_with_app.getTabs().length).toBe(1);
         });
      });
   });
});
