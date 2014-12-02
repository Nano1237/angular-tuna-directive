angular.module('angular-age-directive', [])
        /**
         * @description Here are precalculatet times, (for example how many ms one year has) because its stupid to calculate a fixed number
         */
        .constant('angular-age-directive.preCalcs', [31536000000, 2592000000, 86400000, 3600000])

        /**
         * @description Here are the possible time formatations stored. We can just use the methods provided by the date object.
         * I didnt support seconds, because nobody knows his birthsecond. and if he knows it, its stupid to show it.          
         */
        .constant('angular-age-directive.formatTypes', {Y: 'Year', m: 'Month', i: 'Minutes', d: 'Date', H: 'Hours'})

        /**
         * 
         * @description Here comes the ngAge directive, which formats the date in the ngAge attribute into past time
         * @param {type} preCalcs The precalculatet constants
         * @param {type} types The Formation type constant
         * @param {type} $interpolate We want to show the age as angular variable
         * @returns {_L21.Anonym$4}
         */
        .directive('ngAge', [
            'angular-age-directive.preCalcs',
            'angular-age-directive.formatTypes',
            '$interpolate',
            function(preCalcs, types, $interpolate) {
                return {
                    compile: function(a, b) {
                        var inputSplittet = (b.ngAge || '').split(' ');
                        if (inputSplittet.length === 0 || inputSplittet.length % 2 === 1) {
                            console.warn('[angular-age-directive (ngAge)]: wrong input!');
                            return;
                        }
                        var dateAndTime = inputSplittet.length / 2;
                        var setDate = new Date();//that will be the input date
                        //------------------------------------------------------
                        for (var i = 0; i < dateAndTime; i++) {//one circle if just the date, two circles if also the time
                            var inputDates = inputSplittet[i].split(/\D/);//Date and time splittet by non digits
                            var inputFormat = inputSplittet[i + dateAndTime].split(inputSplittet[i].split(/\d+/)[1] || '-');//gets the corrusponding format (like Y or d)
                            for (var index in inputDates) {
                                var methodName = 'set' + types[inputFormat[index]];
                                if (typeof setDate[methodName] !== 'undefined') {
                                    if (methodName === 'setMonth') {//we have to decrement the month, because of calculation errors
                                        inputDates[index]--;
                                    }
                                    setDate[methodName](+inputDates[index]);//set the new value
                                } else {
                                    console.warn('[angular-age-directive (ngAge)]: undefined Method ' + methodName);
                                }
                            }
                        }
                        //-------------------------------------------------------
                        //@todo Sometimes the calculations are wrong! I dont know why :S
                        //Here come the calculation for the past time
                        var retTimes = {years: 0, months: 0, days: 0, hours: 0, minutes: 0};//We can show zeros as default
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