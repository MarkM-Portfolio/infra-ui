/*
 ********************************************************************
 * IBM Confidential                                                 *
 *                                                                  *
 * OCO Source Materials                                             *
 * Copyright IBM Corp. 2007, 2012                                    
 *                                                                  *
 * The source code for this program is not published or otherwise   *
 * divested of its trade secrets, irrespective of what has been     *
 * deposited with the U.S. Copyright Office.                        *
 ********************************************************************
 */
package com.ibm.lconn.atom.constrain;

import java.util.ArrayList;

/**
 * An <code>Expression</code> combined with one of its method reperents a
 * particular Constraints, usually with QueryStringConstraint.
 * 
 * @see Constraint
 * 
 * @author Alan Cui (cuicai@cn.ibm.com)
 * 
 */
public class Expression {
	private final static String COPYRIGHT = com.ibm.lconn.bookmarklet.Copyright.SHORT;
	private String _term;

	/**
	 * Construct an Expression object with the <code>term</code> as the
	 * variable name
	 * 
	 * @param term
	 */
	public Expression(String term) {
		this._term = term;
	}

	/**
	 * A "equals" constrains, such as a=1. That is, all the objects whose
	 * attribute <code>term</code> has a value equals to <code>value</code>
	 * will be get or counted
	 * 
	 * @param value
	 *            the variable <code>term</code> represent
	 * @return A constrain object
	 */
	public Constraint equals(String value) {
		return new QueryStringConstraint(_term, value);
	}

	/**
	 * A "in" constrains, such as x in {2, 3, 5, 20}. That is, all the objects
	 * whose attribute <code>term</code> is in the set that <code>value</code> represents
	 * will be get or counted
	 * 
	 * @param value
	 * @return A constrain object
	 */
	public Constraint in(String value) {
		return new QueryStringConstraint(_term, value);
	}

	/**
	 * A "in" constrains, such as x in {2, 3, 5, 20}. That is, all the objects
	 * whose attribute <code>term</code> is in the set that <code>value</code> represents
	 * will be get or counted
	 * 
	 * @param value
	 * @return A constrain object
	 */
	public Constraint in(ArrayList<String> value) {
		String temp = value.toString();
		return new QueryStringConstraint(_term, temp.substring(1,
				temp.length() - 1));
	}

	/**
	 * A "in" constrains, such as x includes 2, 3, 5 and 20. That is, all the objects
	 * whose attribute <code>term</code> includes the set that <code>value</code> represents
	 * will be get or counted
	 *  
	 * @param value
	 * @return A constrain object
	 */
	public Constraint includes(String value) {
		return new QueryStringConstraint(_term, value);
	}

	/**
	 * A "in" constrains, such as x includes 2, 3, 5 and 20. That is, all the objects
	 * whose attribute <code>term</code> includes the set that <code>value</code> represents
	 * will be get or counted
	 *  
	 * @param value
	 * @return A constrain object
	 */
	public Constraint includes(ArrayList<String> value) {
		String temp = value.toString();
		return new QueryStringConstraint(_term, temp.substring(1,
				temp.length() - 1));
	}

}
