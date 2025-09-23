/* Copyright IBM Corp. 2014, 2015  All Rights Reserved.              */

define([
        "ic-share/fileviewer/util/DateFormat",
        "dojo/i18n!ic-share/fileviewer/nls/FileViewerStrings"
        ], function(DateFormat, i18n) {
	describe("the method fileviewer/util/DateFormat::formatByAge()", function() {
		beforeEach(function () {
			this.createFormatter = function (date) {
				var formatter = new DateFormat(date);
				formatter._currDate = new Date(2014, 11, 17);
				return formatter;
			}
		});

		it("should format the date for created same day", function() {
			var dateToFormat = new Date(2014, 11, 17),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.CREATED);
			expect(formattedString).toBe("Created by ${user} today at 12:00 AM");
		});

		it("should format the date for created day before", function() {
			var dateToFormat = new Date(2014, 11, 16),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.CREATED);
			expect(formattedString).toBe("Created by ${user} yesterday at 12:00 AM");
		});

		it("should format the date for created two days before", function() {
			var dateToFormat = new Date(2014, 11, 15),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.CREATED);
			expect(formattedString).toBe("Created by ${user} on Monday at 12:00 AM");
		});
		
		it("should format the date for created same month", function() {
			var dateToFormat = new Date(2014, 11, 5),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.CREATED);
			expect(formattedString).toBe("Created by ${user} on December 5, 2014");
		});

		it("should format the date for created same year", function() {
			var dateToFormat = new Date(2014, 8, 16),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.CREATED);
			expect(formattedString).toBe("Created by ${user} on September 16, 2014");
		});

		it("should format the date for created year before", function() {
			var dateToFormat = new Date(2013, 11, 16),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.CREATED);
			expect(formattedString).toBe("Created by ${user} on December 16, 2013");
		});

		it("should format the date for created two years before", function() {
			var dateToFormat = new Date(2012, 11, 16),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.CREATED);
			expect(formattedString).toBe("Created by ${user} on December 16, 2012");
		});

		it("should format the date for updated same day", function() {
			var dateToFormat = new Date(2014, 11, 17),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.LAST_UPDATED);
			expect(formattedString).toBe("Last updated by ${user} today at 12:00 AM");
		});

		it("should format the date for updated day before", function() {
			var dateToFormat = new Date(2014, 11, 16),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.LAST_UPDATED);
			expect(formattedString).toBe("Last updated by ${user} yesterday at 12:00 AM");
		});

		it("should format the date for updated two days before", function() {
			var dateToFormat = new Date(2014, 11, 15),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.LAST_UPDATED);
			expect(formattedString).toBe("Last updated by ${user} on Monday at 12:00 AM");
		});
		
		it("should format the date for updated same month", function() {
			var dateToFormat = new Date(2014, 11, 5),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.LAST_UPDATED);
			expect(formattedString).toBe("Last updated by ${user} on December 5, 2014");
		});

		it("should format the date for updated same year", function() {
			var dateToFormat = new Date(2014, 8, 16),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.LAST_UPDATED);
			expect(formattedString).toBe("Last updated by ${user} on September 16, 2014");
		});

		it("should format the date for updated year before", function() {
			var dateToFormat = new Date(2013, 11, 16),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.LAST_UPDATED);
			expect(formattedString).toBe("Last updated by ${user} on December 16, 2013");
		});

		it("should format the date for updated two years before", function() {
			var dateToFormat = new Date(2012, 11, 16),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			formattedString = formatter.formatByAge(i18n.DATE.LAST_UPDATED);
			expect(formattedString).toBe("Last updated by ${user} on December 16, 2012");
		});
	});

	describe("the method fileviewer/util/DateFormat::formatByAge() with special strings", function() {
		beforeEach(function () {
			this.alternateFormats = [];
			this.alternateFormats.DAY = "${EEE} ${EEEE}";
			this.alternateFormats.YESTERDAY = "24-hr:${HH} 12-hr:${hh} min:${mm} sec:${ss}";
			this.alternateFormats.TODAY = "${Z} time zone:${ZZZZ}";
			this.alternateFormats.TOMORROW = "";
			this.alternateFormats.MONTH = "${MMMM} ${MMM} ${MM}";
			this.alternateFormats.YEAR = "";
			
			this.createFormatter = function (date) {
				var formatter = new DateFormat(date);
				formatter._currDate = new Date(2014, 11, 17);
				return formatter;
			}
		});
		
		it("should test EEE and EEEE formats for short day and long day (Tue/Tuesday)", function() {
			var dateToFormat = new Date(2014, 11, 15),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			
			formattedString = formatter.formatByAge(this.alternateFormats);
			expect(formattedString).toBe("Mon Monday");
		});
		
		it("should test EEee and eeEE formats for short day and long day (Tue/Tuesday)", function() {
			var dateToFormat = new Date(2014, 11, 14),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			this.alternateFormats.DAY = "${EEee} ${eeEE}";
			
			formattedString = formatter.formatByAge(this.alternateFormats);
			expect(formattedString).toBe("Sunday Sunday");
		});
		
		it("should test d and dd formats for days (02, 2)", function() {
			var dateToFormat = new Date(2014, 11, 2),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			this.alternateFormats.YEAR = "${d} ${dd}";
			
			formattedString = formatter.formatByAge(this.alternateFormats);
			expect(formattedString).toBe("2 02");
		});
		
		it("should test time formats for 'yesterday at ...' scenearios with hours minutes seconds", function() {
			var dateToFormat = new Date(2014, 11, 16, 15, 42, 33),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "";
			
			formattedString = formatter.formatByAge(this.alternateFormats);
			expect(formattedString).toBe("24-hr:15 12-hr:03 min:42 sec:33");
		});
		
		it("should test time formats for Month scenarios", function() {
			var dateToFormat = new Date(2014, 11, 17, 15, 41, 22),
			formatter = this.createFormatter(dateToFormat),
			formattedString = "",
			containPlus = false,
			containMinus = false;
			
			formattedString = formatter.formatByAge(this.alternateFormats);
			containPlus = formattedString.indexOf("+") > -1;
			containMinus = formattedString.indexOf("-") > -1;
			
			expect(containMinus).toBe(true);
		});
		
	});
});
