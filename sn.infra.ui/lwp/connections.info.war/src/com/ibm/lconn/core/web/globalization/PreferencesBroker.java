/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2013                                          */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package com.ibm.lconn.core.web.globalization;

import java.util.logging.Level;
import java.util.logging.Logger;

import com.ibm.lconn.core.web.globalization.bean.Preferences;

import com.ibm.lconn.prefs.BidiEnabledPreference;
import com.ibm.lconn.prefs.CalendarPreference;
import com.ibm.lconn.prefs.IUserPreference;
import com.ibm.lconn.prefs.TextDirectionPreference;
import com.ibm.lconn.prefs.service.UserPreferenceServiceBroker;

public class PreferencesBroker
{
  private final static String CLASS_NAME = PreferencesBroker.class.getName();

  private final static Logger log = Logger.getLogger(CLASS_NAME);

  /*
   * TODO: Move to Preferences helper
   */
  private static TextDirectionPreference getTextDirection(Preferences preferences)
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "getTextDirection(Preferences preferences)", //$NON-NLS-1$
          preferences);
    }
    Preferences.TextDirection direction = preferences.getTextDirection();
    TextDirectionPreference ret;
    switch (direction)
      {
        case LEFT_TO_RIGHT :
          ret = TextDirectionPreference.LEFT_TO_RIGHT;
          break;
        case RIGHT_TO_LEFT :
          ret = TextDirectionPreference.RIGHT_TO_LEFT;
          break;
        case CONTEXTUAL :
          ret = TextDirectionPreference.CONTEXTUAL;
          break;
        case DEFAULT :
        default:
          ret = TextDirectionPreference.LANGUAGE_DEFAULT;
      }
    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "getTextDirection(Preferences preferences)", //$NON-NLS-1$
          ret);
    }
    return ret;
  }

  /*
   * TODO: Move to Preferences helper
   */
  private static CalendarPreference getCalendar(Preferences preferences)
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "getCalendar(Preferences preferences)", //$NON-NLS-1$
          preferences);
    }
    Preferences.Calendar calendar = preferences.getCalendar();
    CalendarPreference ret;
    switch (calendar)
      {
        case HEBREW :
          ret = CalendarPreference.HEBREW;
          break;
        case HIJRI :
          ret = CalendarPreference.HIJRI;
          break;
        case GREGORIAN :
        default:
          ret = CalendarPreference.GREGORIAN;
      }
    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "getCalendar(Preferences preferences)", //$NON-NLS-1$
          ret);
    }
    return ret;
  }

  /*
   * TODO: Move to Preferences helper
   */
  private static BidiEnabledPreference getBidiEnabled(Preferences preferences)
  {
    if (log.isLoggable(Level.FINER))
    {
      log.entering(CLASS_NAME, "getBidiEnabled(Preferences preferences)", //$NON-NLS-1$
          preferences);
    }
    BidiEnabledPreference ret;
    if (preferences.isBidiEnabled())
      ret = BidiEnabledPreference.TRUE;
    else
      ret = BidiEnabledPreference.FALSE;
    if (log.isLoggable(Level.FINER))
    {
      log.exiting(CLASS_NAME, "getBidiEnabled(Preferences preferences)", //$NON-NLS-1$
          ret);
    }
    return ret;
  }

  /**
   * Saves user preferences through the provided IUserPreferenceService handle
   * 
   * @param personId
   * @param serviceName
   * @param preferences
   */
  public static void savePreferences(String personId, String serviceName, Preferences preferences)
  {
    UserPreferenceServiceBroker.savePreference(personId, serviceName, getBidiEnabled(preferences));
    UserPreferenceServiceBroker.savePreference(personId, serviceName, getTextDirection(preferences));
    UserPreferenceServiceBroker.savePreference(personId, serviceName, getCalendar(preferences));
  }

  /**
   * Deletes user preferences through the provided IUserPreferenceService handle
   * 
   * @param personId
   * @param serviceName
   */
  public static void deletePreferences(String personId, String serviceName)
  {
    UserPreferenceServiceBroker.deletePreference(personId, serviceName, IUserPreference.from(BidiEnabledPreference.class));
    UserPreferenceServiceBroker.deletePreference(personId, serviceName, IUserPreference.from(TextDirectionPreference.class));
    UserPreferenceServiceBroker.deletePreference(personId, serviceName, IUserPreference.from(CalendarPreference.class));
  }
}
