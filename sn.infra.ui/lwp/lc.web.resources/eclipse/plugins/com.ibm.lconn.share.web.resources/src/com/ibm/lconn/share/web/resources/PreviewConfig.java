/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2014, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.share.web.resources;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.configuration.XMLConfiguration;

import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.ResourceProvider;
import net.jazz.ajax.model.RenderContext;

import com.ibm.lconn.core.web.resources.map.ConfigurationMapResource;
import com.ibm.ventura.internal.config.api.VenturaConfigurationProvider;
import com.ibm.ventura.internal.config.exception.VenturaConfigException;
import com.ibm.ventura.internal.config.exception.VenturaConfigHelperException;

public class PreviewConfig extends ResourceProvider
{
  private static final String FILE_PREVIEW_CONFIG_ID = "file-preview-config";
  
  public Resource provide(String id)
  {
    return new PreviewConfigurationResource(id);
  }

  private static class PreviewConfigurationResource extends ConfigurationMapResource
  {    
    private static XMLConfiguration PREVIEW_CONFIG = null;
    
    protected int GALLERY_VIEW_WIDTH = 73;
    protected int GALLERY_VIEW_HEIGHT = 73;
    protected int GRID_VIEW_WIDTH = 200;
    protected int GRID_VIEW_HEIGHT = 132;
    protected int GRID_VIEW_TEXT_HEIGHT = 30;
    protected int PREVIEW_VIEW_WIDTH = 450;
    protected int PREVIEW_VIEW_HEIGHT = 450;
    protected String VALID_PHOTO_EXTS = "jpg,jpeg,gif,png";
    protected String VALID_VIDEO_EXTS = "mp4,mov,flv";
    
    public PreviewConfigurationResource(String id)
    {
      super(id);
    }
    
    @Override
    protected Map<String, Object> createConfigurationMap(RenderContext context) throws RuntimeException
    {
      Map<String, Object> config = new HashMap<String, Object>();
      try
      {
        if(PREVIEW_CONFIG == null)
        {
          VenturaConfigurationProvider provider = VenturaConfigurationProvider.Factory.getInstance();
          PREVIEW_CONFIG = (XMLConfiguration) provider.getConfiguration(FILE_PREVIEW_CONFIG_ID);
        }
        
        if(PREVIEW_CONFIG != null)
        {
          GALLERY_VIEW_WIDTH = PREVIEW_CONFIG.getInt("preview.thumbnailView[@width]", GALLERY_VIEW_WIDTH);
          GALLERY_VIEW_HEIGHT = PREVIEW_CONFIG.getInt("preview.thumbnailView[@height]", GALLERY_VIEW_HEIGHT);
          GRID_VIEW_WIDTH = PREVIEW_CONFIG.getInt("preview.galleryView[@width]", GRID_VIEW_WIDTH);
          GRID_VIEW_HEIGHT = PREVIEW_CONFIG.getInt("preview.galleryView[@height]", GRID_VIEW_HEIGHT);
          GRID_VIEW_TEXT_HEIGHT = PREVIEW_CONFIG.getInt("preview.galleryView[@textHeight]", GRID_VIEW_TEXT_HEIGHT);
          PREVIEW_VIEW_WIDTH = PREVIEW_CONFIG.getInt("preview.detailView[@width]", PREVIEW_VIEW_WIDTH);
          PREVIEW_VIEW_HEIGHT = PREVIEW_CONFIG.getInt("preview.detailView[@height]", PREVIEW_VIEW_HEIGHT);
          String[] photoFileExtensions = PREVIEW_CONFIG.getStringArray("photo.supportedFileTypes.extension");
          String[] videoFileExtensions = PREVIEW_CONFIG.getStringArray("video.supportedFileTypes.extension");
          if(photoFileExtensions != null)
          {
            StringBuffer sb = new StringBuffer(32);
            for(int i=0; i<photoFileExtensions.length; i++)
            {
              sb.append(photoFileExtensions[i]);
              if(i < photoFileExtensions.length - 1)
              {
                sb.append(",");
              }
            }
            VALID_PHOTO_EXTS = sb.toString();
          }
          if(videoFileExtensions != null)
          {
            StringBuffer sb = new StringBuffer(32);
            for(int i=0; i<videoFileExtensions.length; i++)
            {
              sb.append(videoFileExtensions[i]);
              if(i < videoFileExtensions.length - 1)
              {
                sb.append(",");
              }
            }
            VALID_VIDEO_EXTS = sb.toString();
          }
        }
         
        config.put("galleryViewWidth", GALLERY_VIEW_WIDTH);
        config.put("galleryViewHeight", GALLERY_VIEW_HEIGHT);
        config.put("gridViewWidth", GRID_VIEW_WIDTH);
        config.put("gridViewHeight", GRID_VIEW_HEIGHT);
        config.put("gridViewTextHeight", GRID_VIEW_TEXT_HEIGHT);
        config.put("previewViewWidth", PREVIEW_VIEW_WIDTH);
        config.put("previewViewHeight", PREVIEW_VIEW_HEIGHT);
        config.put("validPhotoExts", VALID_PHOTO_EXTS);
        config.put("validVideoExts", VALID_VIDEO_EXTS);
      }
      catch (Exception e)
      {
        throw new RuntimeException(e);
      }
      return config;
    }
  }
}
