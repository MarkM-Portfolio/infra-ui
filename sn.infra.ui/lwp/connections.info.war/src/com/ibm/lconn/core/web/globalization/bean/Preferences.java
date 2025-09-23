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

package com.ibm.lconn.core.web.globalization.bean;

import com.ibm.lconn.core.web.globalization.Constants;

import com.ibm.json.java.JSONObject;

/**
 * Bean class representing Globalization preferences, with a static factory method that constructs a Preferences object from a JSON object.
 * 
 * @author Claudio Procida <procidac@ie.ibm.com>
 * 
 */
public class Preferences implements Constants
{
  public enum TextDirection {
    DEFAULT("default"), CONTEXTUAL("contextual"), LEFT_TO_RIGHT("ltr"), RIGHT_TO_LEFT("rtl"); //$NON-NLS-1$//$NON-NLS-2$ //$NON-NLS-3$ //$NON-NLS-4$
    private String value;

    TextDirection(String value)
    {
      this.value = value;
    }

    public String getValue()
    {
      return value;
    }

    public static TextDirection parse(String s)
    {
      if (CONTEXTUAL.getValue().equals(s))
        return CONTEXTUAL;
      else if (LEFT_TO_RIGHT.getValue().equals(s))
        return LEFT_TO_RIGHT;
      else if (RIGHT_TO_LEFT.getValue().equals(s))
        return RIGHT_TO_LEFT;
      else
        return DEFAULT;
    }
  }

  public enum Calendar {
    GREGORIAN("gregorian"), HEBREW("hebrew"), HIJRI("hijri");
    private String value;

    Calendar(String value)
    {
      this.value = value;
    }

    public String getValue()
    {
      return value;
    }

    public static Calendar parse(String s)
    {
      if (HEBREW.getValue().equals(s))
        return HEBREW;
      else if (HIJRI.getValue().equals(s))
        return HIJRI;
      else
        return GREGORIAN;
    }
  }

  private TextDirection textDirection;

  private boolean bidiEnabled;

  private Calendar calendar;

  public static Preferences fromJSONObject(JSONObject object)
  {
    Preferences preferences = new Preferences(((Boolean) object.get(BIDI_ENABLED)).booleanValue(), TextDirection.parse((String) object
        .get(TEXT_DIRECTION)), Calendar.parse((String) object.get(CALENDAR)));

    return preferences;
  }

  public Preferences(boolean bidi, TextDirection textDirection, Calendar calendar)
  {
    this.bidiEnabled = bidi;
    this.textDirection = textDirection;
    this.calendar = calendar;
  }

  public boolean isBidiEnabled()
  {
    return bidiEnabled;
  }

  public TextDirection getTextDirection()
  {
    return textDirection;
  }

  public Calendar getCalendar()
  {
    return calendar;
  }

  public String toString()
  {
    // TODO: JSON serialize?
    return new StringBuilder("{bidiEnabled:").append(this.bidiEnabled).append(",textDirection:").append(this.textDirection.getValue()) //$NON-NLS-1$ //$NON-NLS-2$
        .append(",calendar:").append(this.calendar.getValue()).append("}").toString(); //$NON-NLS-1$//$NON-NLS-2$
  }
}
