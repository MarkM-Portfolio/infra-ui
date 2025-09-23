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
 * Note to U.S. Government Users Restricted Rights:  Use,
 * duplication or disclosure restricted by GSA ADP Schedule 
 * Contract with IBM Corp.
 *******************************************************************************/

package net.jazz.ajax.internal.util;

public class Triple<First, Second, Third> {
	static final Object NULL = new Object();
	final Object x, y, z;
	
	public Triple(First x, Second y, Third z) {
		this.x = maskNull(x);
		this.y = maskNull(y);
		this.z = maskNull(z);
	}
	
	public boolean equals(Object obj) {
		if (obj instanceof Triple) {
			Triple pair = (Triple) obj;
			return x.equals(pair.x)
					&& y.equals(pair.y)
					&& z.equals(pair.z);
		}
		return false;
	}

	public int hashCode() {
		return x.hashCode() + y.hashCode() + z.hashCode();
	}
	
	public static <X, Y, Z> Triple<X, Y, Z> create(X x, Y y, Z z) {
		return new Triple(x, y, z);
	}

	static Object maskNull(Object object) {
		if (object == null)
			return NULL;
		return object;
	}

}
