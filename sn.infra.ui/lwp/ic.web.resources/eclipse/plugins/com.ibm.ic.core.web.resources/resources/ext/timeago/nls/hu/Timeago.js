define({
	      /*
		 * timeago: a jQuery plugin, version: 0.9.3 (2011-01-21)
		 * @requires jQuery v1.2.3 or later
		 *
		 * Timeago is a jQuery plugin that makes it easy to support automatically
		 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
		 *
		 * For usage and examples, visit:
		 * http://timeago.yarp.com/
		 *
		 * Licensed under the MIT:
		 * http://www.opensource.org/licenses/mit-license.php
		 *
		 * Copyright (c) 2008-2016, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
		 */
		    prefixAgo: null,
		    prefixFromNow: null,
		    timeAgo: "%d korábban",  // %d is a number with a unit, e.g., 17h ago meaning 17 hours ago
		    now: "Most",
		    minutes: "%dm",  // %d is a number, e.g., 17m meaning 17 minutes
		    hours: "%dh",    // %d is a number, e.g., 17h meaning 17 hours
		    numbers: [],
		    timeYesterday: "Tegnap",
		    timeDay: "${EEEE}",  // == the long form day name, e.g., Wednesday
		    timeMonth: "${MMMM} ${d}", // == long form month name [space] date, e.g., October 16
		    timeYear: "${MMMM} ${d}, ${YYYY}", // == long form month name [space] date, year e.g., October 16, 2005
		    timeHover: "${MMMM} ${d}, ${h}:${mm} ${a}", // == long form month name [space] date, 12-hour hour:minutes and AM/PM e.g., October 16, 06:25 PM
		    AMPM: {
		    	AM:"DE",
		    	PM:"DU"
		    }
});

