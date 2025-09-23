Customizing sprited images

You can customize the sprited images used in IBM® Connections by modifying the images and copying them to the appropriate customization directory.
Procedure

   1. Optional: Turn on the customization debugging capability. For more information, see Enabling and disabling customization debugging.

   2. Download the following file:
      Spriting.zip

   3. Extract the contents of Spriting.zip to a local working directory.

   4. Modify images as needed using an image editor of your choice.
          * Images are found inside categorically organized subfolders within the resources/imageLibrary folder.

   5. From within your working directory, run the following command to build the sprites:

      WAS_home/bin/ws_ant.sh target

      where:
          * WAS_home is the directory to which you installed IBM WebSphere® Application Server.
          * target is the name of the image that you want to sprite. For a full list of the targets that you can specify, see Sprite targets.
          * NOTE: On the first run the target must be all (default if no target is specified).
          * After the first run, specific sprite targets may be run.
      For example:

      /opt/IBM/WebSphere/AppServer/bin/ws_ant.sh all
      
   6. From the working directory, run the following command to compile the final css for the sprited images.
   	 ./spriteCat.sh

   7. A css folder is created inside the resources directory. Copy all of the contents of this directory to the following location:
      customizationDir/themes/

   8. When you are ready to publish your changes, turn off the customization debugging capability. Test whether your changes were added successfully by restarting the applications, and then refreshing the web browser. A browser refresh only shows you your changes if you turned on debugging. See Enabling and disabling customization debugging for more details.

   9. Update the version stamp and restart the application. For more information, see the topic, Required post-customization step.

    * Sprite targets
      When you are customizing sprited images, you need to specify the sprite target as a parameter when you run the ws_ant.sh command.
