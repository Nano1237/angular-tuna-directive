angular.module('angular-tuna-directive', [])
        /**
         * @description Here are precalculatet times, (for example how many ms one year has)
         */
        .constant('angular-tuna-directive.preCalcs', [
            365 * 24 * 60 * 60 * 1000, //days in year * hours in day * minutes in hour * seconds in minute * 1000 (because javascript timestamp is in miliseconds)
            30 * 24 * 60 * 60 * 1000, //~days in month * hours in day * minutes in hour * seconds in minute * 1000 (because javascript timestamp is in miliseconds)
            24 * 60 * 60 * 1000, //hours in day * minutes in hour * seconds in minute * 1000 (because javascript timestamp is in miliseconds)
            60 * 60 * 1000//minutes in hour * seconds in minute * 1000 (because javascript timestamp is in miliseconds)
        ])
        /**
         * 
         * @description Here comes the ngAge directive, which formats the date in the ngAge attribute into past time
         * @param {type} preCalcs The precalculatet constants
         * @param {type} $interpolate We want to show the age as angular variable
         * @returns {_L21.Anonym$4}
         */
        .directive('tuna', [
            'angular-tuna-directive.preCalcs',
            '$interpolate',
            function(preCalcs, $interpolate) {
                return {
                    compile: function(a, b) {
                        var setDate = new Date(b.tuna || '');
                        var retTimes = {years: 0, months: 0, days: 0, hours: 0, minutes: 0};//We can show zeros as default
                        //--------------------------------------------------------
                        //Here come the calculation for the past time
                        var timeDiff = new Date().getTime() - setDate.getTime();
                        retTimes.years = Math.floor(timeDiff / preCalcs[0]);
                        var cacheCalcA = timeDiff - retTimes.years * preCalcs[0];//I know, the calculations are simple, but i want to cache them, because they are used multiple times
                        retTimes.months = Math.floor((timeDiff - retTimes.years * preCalcs[0]) / preCalcs[0]);
                        var cacheCalcB = retTimes.months * preCalcs[1];
                        retTimes.days = Math.floor((cacheCalcA - cacheCalcB) / preCalcs[2]);
                        var cacheCalcC = cacheCalcA - cacheCalcB - retTimes.days * preCalcs[2];
                        retTimes.hours = Math.floor(cacheCalcC / preCalcs[3]);
                        retTimes.minutes = Math.floor((cacheCalcC - retTimes.hours * preCalcs[3]) / 60000);
                        //--------------------------------------------------------
                        a.text($interpolate(a.text())(retTimes));
                    }
                };
            }
        ]);