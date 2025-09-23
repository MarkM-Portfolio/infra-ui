Adding new web bundles
1) Create a new bundle in the lwp/lc.web.resources/eclipse/plugins directory
2) Add the bundle to the feature in lwp/lc.web.resources/eclipse/features/com.ibm.lconn.web.resources.feature so the bundle will build
3) Run a test build and ensure there are no errors
	- Remember that the bundle will build using build.properties and standard PDE targets, so any resources not included in build.properties will be missing
4) Ensure that the bundle is included in the generated WAR at WEB-INF/eclipse/plugins.  Build.xml for the WAR automatically excludes some plugins so you may need to update the build.xml.
5) Open the launch configuration "Common Resources WAR local" in Eclipse and add the extra bundle (it will be saved automatically to lwp/lc.web.resources.war/runtime/Common Resources WAR local.launch)

Running on a test server in Eclipse
1) Run a build on lc.web.resources.war (which updates the war/WEB-INF/eclipse/plugins directory with some of the static dependencies)
2) Add lc.common.ear to the test server
3) Publish and hit http://<server>/connections/resources/web/lconn.core/unicode.js - you should see Javascript returned

Running as an OSGI launch
1) In Eclipse go to Run (or Debug) Configurations.  Under "OSGi Launch" in the left column you should see "Common Resources WAR local"
2) If necessary you can change the ports the application will run on via the JVM properties
3) Select Run or Debug
4) The Console will show the OSGi environment - you can type "?" into the console to get more info, and use "ss" or "bundles" to show information about the bundles that have been loaded.
5) Access http://<server>:<port>/web/lconn.core/unicode.js - you should see Javascript returned
