README.TXT

This is a drop of Mozilla's Rhino Javascript interpreter 1.7R1, packaged as an OSGi bundle for Jazz.
https://developer.mozilla.org/en-US/docs/New_in_Rhino_1.7R1

This bundle is identical to the org.mozilla.rhino_1.7.1.v20090521.jar with the exception of this file and the
exported packages in the MANIFEST.MF.  In this version, the MANIFEST.MF exports the following additional packages needed 
to satisfy references from org.dojotoolkit.shrinksafe:  
     org.mozilla.classfile, 
     org.mozilla.javascript.continuations, 
     org.mozilla.javascript.optimizer,
     org.mozilla.javascript.regexp,
     org.mozilla.javascript.serialize,
     org.mozilla.javascript.tools,
     org.mozilla.javascript.tools.shell 