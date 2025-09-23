/* Copyright IBM Corp. 2013, 2015  All Rights Reserved.              */

dojo.provide("lconn.test.jasmine.core.xsltSpec");

dojo.require("lconn.core.xslt");
dojo.require("dojo.string");

(function(xslt, string) {
   function fec(n) {
      var firstElementChild = n.firstElementChild;
      if (!firstElementChild) {
         for (; n; n = n.nextSibling) {
            if (n.nodeType === 1) {
               firstElementChild = n;
               break;
            }
         }
      }
      return firstElementChild;
   }

   function nv(n) {
      return string.trim(n.nodeValue || (n.firstChild && n.firstChild.nodeValue));
   }

   function c(n) {
      return dojo.filter(n.childNodes, function(c) {
         return c.nodeType === 1;
      });
   }

   describe('the interface of lconn.core.xslt', function() {
      it('implements the expected methods', function() {
         expect(dojo.isFunction(xslt.loadXmlString)).toBeTruthy();
         expect(dojo.isFunction(xslt.getXmlHttpRequest)).toBeTruthy();
         expect(dojo.isFunction(xslt.loadXml)).toBeTruthy();
         expect(dojo.isFunction(xslt.loadXsl)).toBeTruthy();
         expect(dojo.isFunction(xslt.loadXslString)).toBeTruthy();
         expect(dojo.isFunction(xslt.transform)).toBeTruthy();
         expect(dojo.isFunction(xslt.transformDocument)).toBeTruthy();
         expect(dojo.isFunction(xslt.transformAndUpdate)).toBeTruthy();
      });
   });

   describe('the method lconn.core.xslt.loadXmlString()',
      function() {
         var sXml;

         it('correctly loads an xml string from Activities',
            function() {
               sXml = '<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app" xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:os="http://a9.com/-/spec/opensearch/1.1/" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:thr="http://purl.org/syndication/thread/1.0"><generator uri="http://www.ibm.com/xmlns/prod/sn" version="4.5.0.0">IBM Connections - Activities</generator><icon>https://connections.swg.usma.ibm.com/activities/styles/images/favicon.ico</icon><logo>https://connections.swg.usma.ibm.com/activities/nav/common/images/iconActivities128.png</logo><id>https://connections.swg.usma.ibm.com/activities/service/atom2/todos?sortorder=0%2C1&amp;sortfields=duedate%2Clastmod&amp;count=10&amp;assignedToUserid=1a4d1cc0-8301-1032-9a44-89fbb6fdad64</id><title type="text">To Do List for Jorge  Manso</title><updated>1970-01-01T00:00:00Z</updated><author><name>Jorge  Manso</name><email>JORGEMAN@ie.ibm.com</email><snx:userid>1a4d1cc0-8301-1032-9a44-89fbb6fdad64</snx:userid><snx:userState>active</snx:userState></author><link rel="self" href="https://connections.swg.usma.ibm.com/activities/service/atom2/todos?sortorder=0%2C1&amp;sortfields=duedate%2Clastmod&amp;count=10&amp;assignedToUserid=1a4d1cc0-8301-1032-9a44-89fbb6fdad64"/><link rel="http://www.ibm.com/xmlns/prod/sn/service" type="application/atomsvc+xml" href="https://connections.swg.usma.ibm.com/activities/service/atom2/service" /><link rel="http://www.ibm.com/xmlns/prod/sn/tag-cloud" type="application/atomcat+xml" href="https://connections.swg.usma.ibm.com/activities/service/atom2/todos/tags?sortorder=0%2C1&amp;sortfields=duedate%2Clastmod&amp;completed=no&amp;assignedToUserid=1a4d1cc0-8301-1032-9a44-89fbb6fdad64&amp;count=10" /><link rel="alternate" href="https://connections.swg.usma.ibm.com/activities/service/html/todos?sortorder=0%2C1&amp;sortfields=duedate%2Clastmod&amp;assignedToUserid=1a4d1cc0-8301-1032-9a44-89fbb6fdad64&amp;count=10" /><os:totalResults>0</os:totalResults><os:startIndex>1</os:startIndex></feed>';
               var doc = xslt.loadXmlString(sXml);
               expect(c(doc.documentElement).length).toEqual(13);
               expect(nv(fec(doc.documentElement).firstChild)).toBe('IBM Connections - Activities');
            });
         it('correctly loads an xml string from Communities',
            function() {
               sXml = '<?xml version="1.0" encoding="UTF-8"?><atom:feed xmlns:atom="http://www.w3.org/2005/Atom" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ibmsc="http://www.ibm.com/search/content/2010" xmlns:snx="http://www.ibm.com/xmlns/prod/sn"><atom:id>https://connections.swg.usma.ibm.com/communities/service/atom/catalog/owned?results=10&amp;start=0&amp;sortKey=update_date&amp;sortOrder=desc&amp;facet=%7B%22id%22%3A%22tag%22%2C%22count%22%3A%2030%7D&amp;format=XML&amp;userCacheKey=1a4d1cc0-8301-1032-9a44-89fbb6fdad64&amp;dojo.preventCache=1383055971551</atom:id><atom:title><![CDATA[Communities I Own]]></atom:title><atom:author><atom:name>Communities Catalog REST Services</atom:name></atom:author><atom:link href="https://connections.swg.usma.ibm.com/communities/service/atom/catalog/owned?results=10&amp;start=0&amp;sortKey=update_date&amp;sortOrder=desc&amp;facet=%7B%22id%22%3A%22tag%22%2C%22count%22%3A%2030%7D&amp;format=XML&amp;userCacheKey=1a4d1cc0-8301-1032-9a44-89fbb6fdad64&amp;dojo.preventCache=1383055971551" rel="self" type="application/atom+xml"/><atom:updated>2013-10-29T14:12:50.751Z</atom:updated><opensearch:Query role="request" searchTerms="*"/><opensearch:startIndex>0</opensearch:startIndex><opensearch:itemsPerPage>10</opensearch:itemsPerPage><opensearch:totalResults exact="true">0</opensearch:totalResults><ibmsc:facets taxonomyId="facets"/></atom:feed>'
               var doc = xslt.loadXmlString(sXml);
               expect(c(doc.documentElement).length).toEqual(10);
               expect(nv(fec(doc.documentElement).firstChild))
                     .toBe('https://connections.swg.usma.ibm.com/communities/service/atom/catalog/owned?results=10&start=0&sortKey=update_date&sortOrder=desc&facet=%7B%22id%22%3A%22tag%22%2C%22count%22%3A%2030%7D&format=XML&userCacheKey=1a4d1cc0-8301-1032-9a44-89fbb6fdad64&dojo.preventCache=1383055971551');
            });
         it('correctly loads an xml string from Bookmarks',
            function() {
               sXml = '<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom" xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/"><generator uri="http://www.ibm.com/xmlns/prod/sn" version="4.5.0.0">IBM Connections - Bookmarks</generator><title>Bookmarks - Watchlist for Amy Jones2</title><link rel="self" type="application/atom+xml" href="https://dubxpcvm3078.mul.ie.ibm.com:9445/dogear/atom/inbox?email=ajones2%40janet.iris.com&amp;ps=3&amp;sortBy=created&amp;sortOrder=desc&amp;lang=en_US" /><link rel="http://www.ibm.com/xmlns/prod/sn/tag-cloud" type="application/atomcat+xml" href="https://dubxpcvm3078.mul.ie.ibm.com:9445/dogear/tags/inbox?email=ajones2%40janet.iris.com&amp;ps=3&amp;sortBy=created&amp;sortOrder=desc&amp;lang=en_US" /><link rel="alternate" type="text/html" href="https://dubxpcvm3078.mul.ie.ibm.com:9445/dogear/html/inbox?email=ajones2%40janet.iris.com&amp;ps=3&amp;sortBy=created&amp;sortOrder=desc&amp;lang=en_US"/><opensearch:totalResults>0</opensearch:totalResults><id>tag:dogear.ibm.com,2005:feed://inbox?email=ajones2%40janet.iris.com&amp;ps=3&amp;sortBy=created&amp;sortOrder=desc&amp;lang=en_US</id><author><name>Amy Jones2</name><email>ajones2@janet.iris.com</email><snx:userid>4fda6cc0-0101-102e-88dd-f78755f7e0ed</snx:userid><snx:userState>active</snx:userState></author></feed>';
               var doc = xslt.loadXmlString(sXml);
               expect(c(doc.documentElement).length).toEqual(8);
               expect(nv(fec(doc.documentElement).firstChild)).toBe('IBM Connections - Bookmarks');
            });
         it('correctly loads an xml string from Wikis',
            function() {
               sXml = '<?xml version="1.0" encoding="UTF-8"?><feed xmlns:thr="http://purl.org/syndication/thread/1.0" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:td="urn:ibm.com/td" xmlns="http://www.w3.org/2005/Atom"><id>urn:lsid:ibm.com:td:wikis</id><link href="https://dubxpcvm3078.mul.ie.ibm.com:9445/wikis/form/api/wikis/public" rel="self"></link><title type="text">Public Wikis Feed</title><updated>2013-10-30T13:15:58.714Z</updated><generator version="4.5.0.0" uri="http://www.ibm.com/xmlns/prod/sn">IBM Connections - Wikis</generator><opensearch:totalResults>1</opensearch:totalResults><entry><id>urn:lsid:ibm.com:td:3022c48b-d9b4-42b9-84e6-95ef5c092785</id><td:uuid>3022c48b-d9b4-42b9-84e6-95ef5c092785</td:uuid><td:label>wiki #1</td:label><link href="https://dubxpcvm3078.mul.ie.ibm.com:9445/wikis/form/api/wiki/wiki%20%231/entry" rel="self"></link><link href="https://dubxpcvm3078.mul.ie.ibm.com:9445/wikis/home/wiki/wiki%20%231" rel="alternate" type="text/html"></link><link href="https://dubxpcvm3078.mul.ie.ibm.com:9445/wikis/form/api/wiki/wiki%20%231/entry" rel="edit"></link><category term="wiki" scheme="tag:ibm.com,2006:td/type" label="wiki"></category><author><name>Amy Jones2</name><snx:userid>4fda6cc0-0101-102e-88dd-f78755f7e0ed</snx:userid><email>ajones2@janet.iris.com</email><snx:userState>active</snx:userState></author><td:modifier><name>Amy Jones2</name><snx:userid>4fda6cc0-0101-102e-88dd-f78755f7e0ed</snx:userid><email>ajones2@janet.iris.com</email><snx:userState>active</snx:userState></td:modifier><td:themeName></td:themeName><title type="text">wiki #1</title><published>2013-10-30T12:23:53.980Z</published><updated>2013-10-30T12:23:54.206Z</updated><td:created>2013-10-30T12:23:53.980Z</td:created><td:modified>2013-10-30T12:23:53.980Z</td:modified><td:totalRemovedSize>0</td:totalRemovedSize><category term="wiki" label="wiki"></category><summary type="text"></summary><content type="application/atom+xml"></content></entry></feed>';
               var doc = xslt.loadXmlString(sXml);
               expect(c(doc.documentElement).length).toEqual(7);
               expect(nv(fec(doc.documentElement).firstChild)).toBe('urn:lsid:ibm.com:td:wikis');
            });
         it('correctly loads an xml string from Files',
            function() {
               sXml = '<?xml version="1.0" encoding="UTF-8"?><feed xmlns:thr="http://purl.org/syndication/thread/1.0" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:td="urn:ibm.com/td" xmlns="http://www.w3.org/2005/Atom"><generator version="4.5.0.0" uri="http://www.ibm.com/xmlns/prod/sn">IBM Connections - Files</generator><id>urn:lsid:ibm.com:td:myshares</id><title type="text">All Shares for Amy Jones2</title><link href="https://dubxpcvm3078.mul.ie.ibm.com:9445/files/form/api/myshares/feed" rel="self"></link><author><name>Amy Jones2</name><snx:userid>4fda6cc0-0101-102e-88dd-f78755f7e0ed</snx:userid><email>ajones2@janet.iris.com</email><snx:userState>active</snx:userState></author><updated>2013-10-30T13:15:58.818Z</updated><opensearch:totalResults>0</opensearch:totalResults><app:collection href="https://dubxpcvm3078.mul.ie.ibm.com:9445/files/form/api/myshares/feed" xmlns:app="http://www.w3.org/2007/app"><title type="text">myshares</title></app:collection></feed>';
               var doc = xslt.loadXmlString(sXml);
               expect(c(doc.documentElement).length).toEqual(8);
               expect(nv(fec(doc.documentElement).firstChild)).toBe('IBM Connections - Files');
            });
         it('correctly loads an xml string from Profiles',
            function() {
               sXml = '<?xml version="1.0" encoding="UTF-8"?><feed xmlns:app="http://www.w3.org/2007/app" xmlns:thr="http://purl.org/syndication/thread/1.0" xmlns:fh="http://purl.org/syndication/history/1.0" xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xmlns="http://www.w3.org/2005/Atom"><id>tag:profiles.ibm.com,2006:feed</id><generator version="4.5.0.0" uri="http://www.ibm.com/xmlns/prod/sn">IBM Connections - Profiles</generator><title type="text">Connections of Amy Jones2</title><author><name>IBM Connections - Profiles</name></author><updated>2013-10-30T13:15:58.869Z</updated><opensearch:totalResults>0</opensearch:totalResults><opensearch:startIndex>1</opensearch:startIndex><opensearch:itemsPerPage>3</opensearch:itemsPerPage><snx:pendingInvitations>0</snx:pendingInvitations><link href="https://dubxpcvm3078.mul.ie.ibm.com:9445/profiles/atom/connections.do?userid=4fda6cc0-0101-102e-88dd-f78755f7e0ed&amp;connectionType=colleague&amp;forceRefresh=1383138963903&amp;ps=3&amp;inclPendingCount=true&amp;outputType=profile" rel="self" type="application/atom+xml"></link></feed>';
               var doc = xslt.loadXmlString(sXml);
               expect(c(doc.documentElement).length).toEqual(10);
               expect(nv(fec(doc.documentElement).firstChild)).toBe('tag:profiles.ibm.com,2006:feed');
            });
         it('correctly loads an xml string from Blogs',
            function() {
               sXml = '<?xml version="1.0" encoding=\'utf-8\'?><feed xmlns="http://www.w3.org/2005/Atom" xmlns:app="http://www.w3.org/2007/app" xmlns:thr="http://purl.org/syndication/thread/1.0" xmlns:snx="http://www.ibm.com/xmlns/prod/sn" xmlns:opensearch="http://a9.com/-/spec/opensearch/1.1/" xml:lang="en-US"><title type="text">Blogs</title><subtitle type="html"></subtitle><id>urn:lsid:ibm.com:blogs:entries</id><link rel="alternate" type="text/html" href="https://dubxpcvm3078.mul.ie.ibm.com:9445/blogs?lang=en_us" /><link rel="self" type="application/atom+xml" href="https://dubxpcvm3078.mul.ie.ibm.com:9445/blogs/homepage/feed_form/entries/atom?blogType=blog&amp;lang=en_us&amp;ps=3&amp;forceRefresh=1383138963838" /><link rel="replies" type="application/atom+xml" href="https://dubxpcvm3078.mul.ie.ibm.com:9445/blogs/homepage/feed_form/comments/atom?lang=en_us" /><link rel="first" type="application/atom+xml" href="https://dubxpcvm3078.mul.ie.ibm.com:9445/blogs/homepage/feed_form/entries/atom?ps=3&amp;blogType=blog&amp;lang=en_us" /><opensearch:totalResults>1</opensearch:totalResults><app:categories href="https://dubxpcvm3078.mul.ie.ibm.com:9445/blogs/homepage/feed_form/tags/atom?lang=en_us"/><updated>2013-10-30T11:25:53+00:00</updated><generator uri="http://www.ibm.com/xmlns/prod/sn" version="4.5.0.0">IBM Connections - Blogs</generator></feed>';
               var doc = xslt.loadXmlString(sXml);
               expect(c(doc.documentElement).length).toEqual(11);
               expect(nv(fec(doc.documentElement).firstChild)).toBe('Blogs');
            });

         it('throws on invalid XML', function() {
            sXml = 'Malformed';
            expect(function() {
               xslt.loadXmlString(sXml);
            }).toThrow();
         });
      });

   describe('the method lconn.core.xslt.loadXml()',
      function() {
         it('correctly loads xml from Activities', function() {
            var doc = xslt.loadXml('./data/activities.xml');
            expect(c(doc.documentElement).length).toEqual(13);
            expect(nv(fec(doc.documentElement).firstChild)).toBe('IBM Connections - Activities');
         });
         it('correctly loads xml from Communities',
            function() {
               var doc = xslt.loadXml('./data/communities.xml');
               expect(c(doc.documentElement).length).toEqual(10);
               expect(nv(fec(doc.documentElement).firstChild))
                     .toBe('https://connections.swg.usma.ibm.com/communities/service/atom/catalog/owned?results=10&start=0&sortKey=update_date&sortOrder=desc&facet=%7B%22id%22%3A%22tag%22%2C%22count%22%3A%2030%7D&format=XML&userCacheKey=1a4d1cc0-8301-1032-9a44-89fbb6fdad64&dojo.preventCache=1383055971551');
            });
         it('correctly loads xml from Bookmarks', function() {
            var doc = xslt.loadXml('./data/dogear.xml');
            expect(c(doc.documentElement).length).toEqual(8);
            expect(nv(fec(doc.documentElement).firstChild)).toBe('IBM Connections - Bookmarks');
         });
         it('correctly loads xml from Wikis', function() {
            var doc = xslt.loadXml('./data/wikis.xml');
            expect(c(doc.documentElement).length).toEqual(7);
            expect(nv(fec(doc.documentElement).firstChild)).toBe('urn:lsid:ibm.com:td:wikis');
         });
         it('correctly loads xml from Files', function() {
            var doc = xslt.loadXml('./data/files.xml');
            expect(c(doc.documentElement).length).toEqual(8);
            expect(nv(fec(doc.documentElement).firstChild)).toBe('IBM Connections - Files');
         });
         it('correctly loads xml from Profiles', function() {
            var doc = xslt.loadXml('./data/profiles.xml');
            expect(c(doc.documentElement).length).toEqual(10);
            expect(nv(fec(doc.documentElement).firstChild)).toBe('tag:profiles.ibm.com,2006:feed');
         });
         it('correctly loads xml from Blogs', function() {
            var doc = xslt.loadXml('./data/blogs.xml');
            expect(c(doc.documentElement).length).toEqual(11);
            expect(nv(fec(doc.documentElement).firstChild)).toBe('Blogs');
         });
      });
}(lconn.core.xslt, dojo.string));
