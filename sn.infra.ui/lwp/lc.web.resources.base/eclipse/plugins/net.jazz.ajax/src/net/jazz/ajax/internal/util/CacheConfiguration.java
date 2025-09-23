/* ***************************************************************** */
/*                                                                   */
/* IBM Confidential                                                  */
/*                                                                   */
/* OCO Source Materials                                              */
/*                                                                   */
/* Copyright IBM Corp. 2011, 2015                                    */
/*                                                                   */
/* The source code for this program is not published or otherwise    */
/* divested of its trade secrets, irrespective of what has been      */
/* deposited with the U.S. Copyright Office.                         */
/*                                                                   */
/* ***************************************************************** */

package net.jazz.ajax.internal.util;

import net.jazz.ajax.internal.AjaxFramework;

public class CacheConfiguration {
	private static final Integer ONE_MONTH = 3600 * 24 * 30;

	private static int aggregateResourceFreshness;

	private static int aggregateResourceClientCache;

	private static int fileFreshness;

	private static int fileClientCache;

	private static int immutableFileFreshness;

	private static int immutableFileClientCache;

	private static int aggregateResourceWithETagFreshness;

	private static int aggregateResourceWithETagClientCache;

	private static int directResourceWithETagFreshness;

	private static int directResourceWithETagClientCache;

	private static int directResourceFreshness;

	private static int directResourceClientCache;

	static {
		resetFactorySettings();
	}

	public static void resetFactorySettings() {
		aggregateResourceFreshness = 3;

		aggregateResourceClientCache = 0;

		fileFreshness = 2;

		fileClientCache = 0;

		immutableFileFreshness = 2;

		immutableFileClientCache = 3600;

		aggregateResourceWithETagFreshness = 0;

		aggregateResourceWithETagClientCache = ONE_MONTH;

		directResourceWithETagFreshness = 0;

		directResourceWithETagClientCache = ONE_MONTH;

		directResourceFreshness = 0;

		directResourceClientCache = AjaxFramework.DEV_MODE ? 20 : 600;
	}

	public static int getAggregateResourceFreshness() {
		return aggregateResourceFreshness;
	}

	public static void setAggregateResourceFreshness(
			int aggregateResourceFreshness) {
		CacheConfiguration.aggregateResourceFreshness = aggregateResourceFreshness;
	}

	public static int getAggregateResourceClientCache() {
		return aggregateResourceClientCache;
	}

	public static void setAggregateResourceClientCache(
			int aggregateResourceClientCache) {
		CacheConfiguration.aggregateResourceClientCache = aggregateResourceClientCache;
	}

	public static int getImmutableFileFreshness() {
		return immutableFileFreshness;
	}

	public static void setImmutableFileFreshness(int immutableFileFreshness) {
		CacheConfiguration.immutableFileFreshness = immutableFileFreshness;
	}

	public static int getImmutableFileClientCache() {
		return immutableFileClientCache;
	}

	public static void setImmutableFileClientCache(int immutableFileClientCache) {
		CacheConfiguration.immutableFileClientCache = immutableFileClientCache;
	}

	public static int getFileFreshness() {
		return fileFreshness;
	}

	public static void setFileFreshness(int fileFreshness) {
		CacheConfiguration.fileFreshness = fileFreshness;
	}

	public static int getFileClientCache() {
		return fileClientCache;
	}

	public static void setFileClientCache(int fileClientCache) {
		CacheConfiguration.fileClientCache = fileClientCache;
	}

	public static int getAggregateResourceWithETagFreshness() {
		return aggregateResourceWithETagFreshness;
	}

	public static void setAggregateResourceWithETagFreshness(
			int aggregateResourceFreshness) {
		CacheConfiguration.aggregateResourceWithETagFreshness = aggregateResourceFreshness;
	}

	public static int getAggregateResourceWithETagClientCache() {
		return aggregateResourceWithETagClientCache;
	}

	public static void setAggregateResourceWithETagClientCache(
			int aggregateResourceClientCache) {
		CacheConfiguration.aggregateResourceWithETagClientCache = aggregateResourceClientCache;
	}

	public static int getDirectResourceWithETagFreshness() {
		return directResourceWithETagFreshness;
	}

	public static void setDirectResourceWithETagFreshness(
			int directResourceWithETagFreshness) {
		CacheConfiguration.directResourceWithETagFreshness = directResourceWithETagFreshness;
	}

	public static int getDirectResourceWithETagClientCache() {
		return directResourceWithETagClientCache;
	}

	public static void setDirectResourceWithETagClientCache(
			int directResourceWithETagClientCache) {
		CacheConfiguration.directResourceWithETagClientCache = directResourceWithETagClientCache;
	}

	public static int getDirectResourceFreshness() {
		return directResourceFreshness;
	}

	public static void setDirectResourceFreshness(int directResourceFreshness) {
		CacheConfiguration.directResourceFreshness = directResourceFreshness;
	}

	public static int getDirectResourceClientCache() {
		return directResourceClientCache;
	}

	public static void setDirectResourceClientCache(
			int directResourceClientCache) {
		CacheConfiguration.directResourceClientCache = directResourceClientCache;
	}

	public static void setCacheCapacity(int cacheCapacity) {
		Cache.resizeCapacity(cacheCapacity);
	}
}
