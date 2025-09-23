/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2014                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.model;

import java.io.IOException;

import net.jazz.ajax.internal.util.JavaScriptUtil;

public abstract class GeneratedJavaScriptResource extends Resource
{
  private volatile long lastModified;

  private volatile String minified;

  public GeneratedJavaScriptResource(String id)
  {
    this(JavaScriptResource.TYPE, id);

  }

  public GeneratedJavaScriptResource(Type<?> type, String id)
  {
    super(type, id);
  }

  @Override
  public void getState(RenderContext context, State state)
  {
    state.merge(lastModified);
  }

  /**
   * TODO make this thread-safe
   */
  @Override
  public boolean internalRefresh(RenderContext context)
  {
    boolean result = false;
    try
    {
      long now = System.currentTimeMillis();
      if (lastModified == 0 || isOutOfDate(now))
      {
        lastModified = now;
        load(content(context));
        result = true;
      }
    }
    catch (IOException e)
    {
      throw new RuntimeException(e);
    }
    return result;
  }

  public void write(Appendable output, RenderContext context) throws IOException
  {
    switch (context.mode)
      {
        case NO_MINIFY :
          output.append("\n;");
        case DEBUG :
          output.append(content(context));
          output.append("\n");
          break;
        case STANDARD :
          output.append("\n;");
          if (isOutOfDate(System.currentTimeMillis()))
          {
            load(content(context));
          }          
          output.append(minified);
          output.append("\n");
          break;
      }
  }

  protected void load(CharSequence content)
  {
    minified = JavaScriptUtil.minify(content.toString());
  }

  /**
   * Default implementation is that contents are only generated once.
   */
  protected boolean isOutOfDate(long now)
  {
    return false;
  }

  /**
   * @return The time the content was last generated, or 0 if it has never been generated
   */
  final protected long getLastModified()
  {
    return lastModified;
  }

  abstract protected CharSequence content(RenderContext context) throws IOException;
}
