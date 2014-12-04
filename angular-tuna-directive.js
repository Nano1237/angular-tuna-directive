angular.module('angular-tuna-directive', [])
        /**
         * @description Here are precalculatet times, (for example how many ms one year has)
         */
        .constant('angular-tuna-directive.preCalcs', [
            365 * 24 * 60 * 60 * 1000, //days in year * hours in day * minutes in hour * seconds in minute * 1000 (because javascript timestamp is in miliseconds)
            30 * 24 * 60 * 60 * 1000, //~days in month * hours in day * minutes in hour * seconds in minute * 1000 (because javascript timestamp is in miliseconds)
            24 * 60 * 60 * 1000, //hours in day * minutes in hour * seconds in minute * 1000 (because javascript timestamp is in miliseconds)
            60 * 60 * 1000, //minutes in hour * seconds in minute * 1000 (because javascript timestamp is in miliseconds)
            60 * 1000//seconds in minute * 1000 (because javascript timestamp is in miliseconds)
        ])
        /**
         * 
         * @description Calculates the timedifferences
         * @param {type} preCalcs The precalculatet constants
         * @returns {Object}
         */
        .factory('angular-tuna-directive.calculateTimes', [
            'angular-tuna-directive.preCalcs',
            function(preCalcs) {
                return function(ts) {
                    var retTimes = {years: 0, months: 0, days: 0, hours: 0, minutes: 0};//We can show zeros as default
                    var timeDiff = new Date().getTime() - ts;//get the difference between now and then
                    retTimes.years = Math.floor(timeDiff / preCalcs[0]);
                    var cacheCalcA = timeDiff - retTimes.years * preCalcs[0];//I know, the calculations are simple, but i want to cache them, because they are used multiple times
                    retTimes.months = Math.floor((timeDiff - retTimes.years * preCalcs[0]) / preCalcs[0]);
                    var cacheCalcB = retTimes.months * preCalcs[1];
                    retTimes.days = Math.floor((cacheCalcA - cacheCalcB) / preCalcs[2]);
                    var cacheCalcC = cacheCalcA - cacheCalcB - retTimes.days * preCalcs[2];
                    retTimes.hours = Math.floor(cacheCalcC / preCalcs[3]);
                    var cacheCalcD = cacheCalcC - retTimes.hours * preCalcs[3];
                    retTimes.minutes = Math.floor(cacheCalcD / preCalcs[4]);
                    retTimes.seconds = Math.floor((cacheCalcD - retTimes.minutes * preCalcs[4]) / 1000);
                    return retTimes;
                };
            }
        ])
        /**
         * 
         * @description Returns the intervaltime for each indicator
         * @returns {Number}
         */
        .factory('angular-tuna-directive.getInterval', [
            function() {
                return function(string) {
                    switch (string) {
                        case 's' :
                        case 'second' :
                        case 'seconds' :
                            return 1000;
                        case 'i' :
                        case 'minute' :
                        case 'minutes' :
                            return 60000;
                    }
                };
            }
        ])

        /**
         * 
         * @description The directive interpolates the calculatet time into the element
         * @param {Function} calculateTimes
         * @param {Function} getInterval 
         * @param {Function} $interpolate 
         * @param {Function} $interval
         * @returns {_L68.Anonym$5}
         */
        .directive('tuna', [
            'angular-tuna-directive.calculateTimes',
            'angular-tuna-directive.getInterval',
            '$interpolate',
            '$interval',
            function(calculateTimes, getInterval, $interpolate, $interval) {
                var timeStampCache;
                var interpolateCache;
                return {
                    compile: function(a, b) {
                        timeStampCache = timeStampCache || new Date(b.tuna || '').getTime();
                        interpolateCache = interpolateCache || $interpolate(a.text());
                        var realtime = typeof b.tunaRealtime !== 'undefined' ? b.tunaRealtime || 'i' : false;
                        a.text(interpolateCache(calculateTimes(timeStampCache)));
                        if (realtime) {
                            a.text(interpolateCache(calculateTimes(timeStampCache)));
                            $interval(function() {
                                a.text(interpolateCache(calculateTimes(timeStampCache)));
                            }, getInterval(realtime));
                        }
                    }
                };
            }
        ]);