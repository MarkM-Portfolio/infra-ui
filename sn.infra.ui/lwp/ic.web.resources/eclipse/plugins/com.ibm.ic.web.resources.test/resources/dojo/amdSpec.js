/* Copyright IBM Corp. 2015  All Rights Reserved.                    */

define([], function() {
   describe("the AMD require", function() {
      it('ignores dependencies loaded with the css! plugin', function(done) {
         spyOn(console, 'warn');
         require([ 'ic-test/dojo/amdSpec/dummy'
         ], function(dummy) {
            expect(console.warn).toHaveBeenCalledWith('The css! AMD plugin is unsupported in Connections: this/doesnt/exist.css');
            done();
         });
      });
   });
});
