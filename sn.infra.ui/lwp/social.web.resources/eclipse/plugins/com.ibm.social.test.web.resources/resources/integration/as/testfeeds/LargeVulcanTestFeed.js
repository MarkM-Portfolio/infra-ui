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
dojo.provide("com.ibm.social.test.integration.as.testfeeds.LargeVulcanTestFeed");

/**
 * Large feed taken from Vulcan example.
 */
dojo.declare("com.ibm.social.test.integration.as.testfeeds.LargeVulcanTestFeed",
				com.ibm.social.test.integration.as.testfeeds.BaseTestFeed,
				{
					name: "LargeVulcanFeed",
					expectedFragments: 1,
					expectedClasses: ["com.ibm.social.as.item.NewsItem"],

					content: {
						"startIndex" : 0,
						"totalResults" : 1,
						"entry" : [ {
							"id":"http://projectvulcan.lotus.com/user/1320330465487",
							"url":"http://projectvulcan.lotus.com/608201527/posts/1320330465487",
							"published":"2011-10-06T12:25:44.529Z",
							"updated":"2011-10-06T12:25:44.529Z",
							"title":"An event has occurred",
							"actor":
							{
								"id":"89004540-b43a-102f-9803-f98c2b382d13",
								"displayName":"IBM Toolkit Two"
							},
							"verb":"updated",
							"content":"",
							"icon":
							{
								"url":"http://projectvulcan.lotus.com/foo.jpg",
								"width":"100",
								"height":"100",
								"duration":"1200",
								"mediaItemId":"A media item Id"
							},
							"provider":
							{
								"id":"Object ID",
								"summary":"A summary for object",
								"displayName":"A title for object",
								"url":"http://lotus.com/calendar/13194973/i3/object",
								"content":"This is some content filler for object",
								"objectType":"invitation",	
								"published":"2011-10-06T12:25:44.529Z",
								"updated":"2011-10-06T12:25:44.529Z",
								"upstreamDuplicates":["event","another duplicate"],
								"downstreamDuplicates":["event","another duplicate"],
								"author":
								{
									"id":"http://projectvulcan.lotus.com/user/",
									"displayName":"Mrs Jane Vulcan"
								},
								"image":
								{
									"url":"http://projectvulcan.lotus.com/foo.jpg",
									"width":"100",
									"height":"100",
									"duration":"1200",
									"mediaItemId":"A media item Id"
								},
								"attachments":
								[
									{
										"id":"some id"
									},
									{
										"id":"another id",
										"content":"with some content"
									}
								]
							},
							"target":
							{
								"id":"ID of the Target for the event",
								"summary":"A summary for Target",
								"displayName":"Name of the event Target",
								"url":"http://link.com/link",
								"content":"This is some content filler for target",
								"objectType":"type",
								"published":"2011-10-06T12:25:44.529Z",
								"updated":"2011-10-06T12:25:44.529Z",
								"upstreamDuplicates":["event","another duplicate"],
								"downstreamDuplicates":["event","another duplicate"],
								"author":
								{
									"id":"http://projectvulcan.lotus.com/user/",
									"displayName":"Mrs Jane Vulcan"
								},
								"image":
								{
									"url":"http://projectvulcan.lotus.com/foo.jpg",
									"width":"100",
									"height":"100",
									"duration":"1200",
									"mediaItemId":"A media item Id"
								},
								"attachments":
								[	{"id":"some id"},
									{
										"id":"another id",
										"content":"with some content"
									}
								]
							},
							"generator":
							{
								"id":"GeneratorID",
								"summary":"A summary for generator",
								"displayName":"GeneratorID",
								"url":"http://lotus.com/calendar/13194973/i3/generator",
								"content":"Some content for generator",
								"objectType":"invitation",
								"published":"2011-10-06T12:25:44.529Z",
								"updated":"2011-10-06T12:25:44.529Z",
								"upstreamDuplicates":["event","another duplicate"],
								"downstreamDuplicates":["event","another duplicate"],
								"author":
								{
									"id":"http://projectvulcan.lotus.com/user/",
									"displayName":"Mrs Jane Vulcan"
								},
								"image":
								{
									"url":"http://projectvulcan.lotus.com/foo.jpg",
									"width":"100",
									"height":"100",
									"duration":"1200",
									"mediaItemId":"A media item Id"
								},
								"attachments":
								[
									{"id":"some id"},
									{
										"id":"another id",
										"content":"with some content"
									}
								]
							},
							"object":
							{
								"id":"ID of the event object",
								"summary":"Lotus Calendar Entry",
								"displayName":"Name of the event object",
								"url":"http://link.com/link",
								"content":"This is some content filler",
								"objectType":"type",
								"published":"2011-10-06T12:25:44.529Z",
								"updated":"2011-10-06T12:25:44.529Z",
								"upstreamDuplicates":["event","another duplicate"],
								"downstreamDuplicates":["event","another duplicate"],
								"author":
								{
									"id":"http://projectvulcan.lotus.com/user/",
									"displayName":"Mrs Jane Vulcan"
								},
								"image":
								{
									"url":"http://projectvulcan.lotus.com/foo.jpg",
									"width":"100",
									"height":"100",
									"duration":"1200",
									"mediaItemId":"A media item Id"
								},
								"attachments":
								[
									{"id":"some id"},
									{
										"id":"another id",
										"content":"with some content"
									},
									{
										"id":"Object ID",
										"summary":"A summary for object",
										"displayName":"A title for object",
										"url":"http://lotus.com/calendar/13194973/i3/object",
										"content":"This is some content filler for object",
										"objectType":"invitation",
										"published":"2011-10-06T12:25:44.529Z",
										"updated":"2011-10-06T12:25:44.529Z",
										"upstreamDuplicates":["event","another duplicate"],
										"downstreamDuplicates":["event","another duplicate"],
										"author":
										{
											"id":"http://projectvulcan.lotus.com/user/",
											"displayName":"Mrs Jane Vulcan"
										},
										"image":
										{
											"url":"http://projectvulcan.lotus.com/foo.jpg",
											"width":"100",
											"height":"100",
											"duration":"1200",
											"mediaItemId":"A media item Id"
										},
										"attachments":
										[
											{"id":"some id"},
											{
												"id":"another id",
												"content":"with some content"
											}
										]
									},
									{
										"id":"Object ID",
										"summary":"A summary for object",
										"displayName":"A title for object",
										"url":"http://lotus.com/calendar/13194973/i3/object",
										"content":"This is some content filler for object",
										"objectType":"invitation",
										"published":"2011-10-06T12:25:44.529Z",
										"updated":"2011-10-06T12:25:44.529Z",
										"upstreamDuplicates":["event","another duplicate"],
										"downstreamDuplicates":["event","another duplicate"],
										"author":
										{
											"id":"http://projectvulcan.lotus.com/user/",
											"displayName":"Mrs Jane Vulcan"
										},
										"image":
										{
											"url":"http://projectvulcan.lotus.com/foo.jpg",
											"width":"100",
											"height":"100",
											"duration":"1200",
											"mediaItemId":"A media item Id"
										},
										"attachments":
										[
											{"id":"some id"},
											{	
												"id":"another id",
												"content":"with some content"
											},
											{
												"id":"Object ID",
												"summary":"A summary for object",
												"displayName":"A title for object",
												"url":"http://lotus.com/calendar/13194973/i3/object",
												"content":"This is some content filler for object",
												"objectType":"invitation",
												"published":"2011-10-06T12:25:44.529Z",
												"updated":"2011-10-06T12:25:44.529Z",
												"upstreamDuplicates":["event","another duplicate"],
												"downstreamDuplicates":["event","another duplicate"],
												"author":
												{
													"id":"http://projectvulcan.lotus.com/user/",
													"displayName":"Mrs Jane Vulcan"
												},
												"image":
												{
													"url":"http://projectvulcan.lotus.com/foo.jpg",
													"width":"100",
													"height":"100",
													"duration":"1200",
													"mediaItemId":"A media item Id"
												},
												"attachments":
												[
													{"id":"some id"},
													{
														"id":"another id",
														"content":"with some content"
													}
												]
											}
										]
									}
								]
							},
							"connections":{"actionable":""}
						}
					]}
				});
