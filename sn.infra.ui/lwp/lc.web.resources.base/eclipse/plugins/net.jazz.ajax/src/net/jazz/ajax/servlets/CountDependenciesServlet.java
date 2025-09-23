/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2010, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

/*
 * Rights Reserved.
 * 
 * Note to U.S. Government Users Restricted Rights: Use, duplication or
*/
package net.jazz.ajax.servlets;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.text.NumberFormat;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.jazz.ajax.internal.util.ServletUtil;
import net.jazz.ajax.model.JavaScriptResource;
import net.jazz.ajax.model.RenderContext;
import net.jazz.ajax.model.Resource;
import net.jazz.ajax.model.Resource.Type;
import net.jazz.ajax.model.ResourceOptimization;
//import net.jazz.ajax.servlets.ResourceGraph.Node;

// ADDED
public class CountDependenciesServlet extends HttpServlet
{
  private static final long serialVersionUID = 1L;

  protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
  {

    String[] includes = request.getParameterValues("include");
    if (includes != null && includes.length > 0)
    {
      String[] excludes = request.getParameterValues("exclude");
      if (excludes == null)
        excludes = new String[0];
      List<Resource> include = Resource.resolveAll(includes);
      List<Resource> exclude = Resource.resolveAll(excludes);

      RenderContext context = RenderContext.forRequest(request);
      int minimumReached = include.size();
      String min = request.getParameter("min");
      if (min != null)
        minimumReached = Integer.parseInt(min);

      Map<String, DependencyCount> depsMap = new HashMap<String, DependencyCount>();

      for (Resource res : include)
      {
        // Step 1: build a ResourceGraph for each include
        ResourceGraph graph = new ResourceGraph(context, Collections.singletonList(res), exclude);
        List<Resource> resources = graph.getResources();

        // Step 2: Add dependencies to a Map<String, DependencyCount>
        for (Resource r : resources)
        {
          String resId = r.getId();
          DependencyCount dep = depsMap.get(resId);
          if (dep != null)
            dep.increment();
          else
            depsMap.put(resId, DependencyCount.create(r));
        }
      }

      // Step 3: Sort dependencies by dep count desc, module id asc
      List<DependencyCount> deps = new LinkedList<DependencyCount>(depsMap.values());
      Collections.sort(deps);

      response.setContentType("text/plain");
      Writer output = ServletUtil.negotiateWriter(request, response);
      int totalSize = 0;

      output.append("// Common dependencies in decreasing order of frequency of:\n");
      for (Resource resource : include)
        output.append("//   ").append(resource.toString()).append("\n");
      output.append("// Excluding:\n");
      for (Resource resource : exclude)
        output.append("//   ").append(resource.toString()).append("\n");
      output.append("\n");

      NumberFormat format = NumberFormat.getInstance();
      int count = -1;
      for (DependencyCount dep : deps)
      {
        if (JavaScriptResource.TYPE.equals(dep.getType()))
        {
          if (count > dep.getCount())
            output.append("// Partial size of dependencies required at least ").append(String.valueOf(count)).append(" times: ").append(
                format.format(totalSize)).append("\n");
          count = dep.getCount();
          if (count < minimumReached)
            break;

          int size = 0;
          try
          {
            StringWriter w = new StringWriter();
            dep.resource.write(w, context);
            size = w.getBuffer().length();
            totalSize += size;
          }
          catch (IOException ioe)
          {
            ioe.printStackTrace(System.out);
          }
          output.append("dojo.require(\"").append(dep.getId()).append("\"); ").append("//").append(" included ").append(
              String.valueOf(dep.getCount())).append(" times, compressed size ").append(format.format(size)).append("\n");
        }
        // size += node.size;
      }
      output.append("\n");

      // List<Resource> specificMatches = new ArrayList<Resource>();
      // for (Node node : nodes)
      // specificMatches.add(node.resource);
      //
      // ResourceGraph outcomeGraph = new ResourceGraphOperation(context, specificMatches, exclude).execute();
      // StringWriter w = new StringWriter();
      // outcomeGraph.writeJavascript(w, context);
      // int l = w.getBuffer().length();
      // output.append("# direct dependencies:   ").append(format.format(size)).append("\n");
      // output.append("# indirect dependencies: ").append(format.format(l - size)).append("\n");
      output.append("// Total size:            ").append(format.format(totalSize)).append("\n");

      output.close();
    }
    else
    {
      response.setContentType("text/plain");

      Writer output = ServletUtil.negotiateWriter(request, response);

      Map<String, Integer> optimized = ResourceOptimization.getIdentifiers();
      for (Map.Entry<String, Integer> entry : optimized.entrySet())
      {
        output.write(String.valueOf(entry.getValue()));
        output.write("=");
        output.write(entry.getKey());
        output.write("\n");
      }

      output.close();
    }
  }

  static class DependencyCount implements Comparable<DependencyCount>
  {
    Resource resource;

    int count;

    public DependencyCount(Resource res)
    {
      resource = res;
      count = 1;
    }

    public static DependencyCount create(Resource res)
    {
      return new DependencyCount(res);
    }

    public void increment()
    {
      count++;
    }

    public int getCount()
    {
      return count;
    }

    public String getId()
    {
      return resource.getId();
    }

    public Type<?> getType()
    {
      return resource.getType();
    }

    public int compareTo(DependencyCount other)
    {
      if (other.getCount() < count)
        return -1;
      else if (other.getCount() > count)
        return 1;
      else
        return getId().compareTo(other.getId());
    }
  }
}
