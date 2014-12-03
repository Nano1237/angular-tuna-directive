# angular-tuna-directive

#### Why is it called Tuna?

I thaught about a abbreviation of "Time until Now" and found TUNA!
Now it is called tuna ... 

#### Demo:

[Demo Page](http://nano1237.github.io/angular-tuna-directive)

#### What time formation can i use?

If a date string is not in the ISO format, JavaScript uses the following rules to parse it.

Short dates

+ The format must follow the month/day/year order, for example "06/08/2010".

+ Either "/" or "-" can be used as a separator.

Long dates

+ The year, month, and day can be in any order. "June 8 2010" and "2010 June 8" are both valid.

+ The year can have two or four digits. If the year has only two digits, it must be at least 70.

+ Month and day names must have at least two characters. Two character names that are not unique are resolved to the last matching name. For example, "Ju" specifies July, not June.

+ A day of the week is ignored if it is inconsistent with the rest of the supplied date. For example, "Tuesday November 9 1996" resolves to "Friday November 9 1996" because Friday is the correct day of the week for that date.

Times

+ Hours, minutes, and seconds are separated by colons. However, some of the parts can be omitted. The following are valid: "10:", "10:11", and "10:11:12".

+ If PM is specified and the specified hour is at least 13, NaN is returned. For example, "23:15 PM" returns NaN.

General

+ A string that contains an invalid date returns NaN. For example, a string that contains two years or two months returns NaN.

+ JavaScript supports all standard time zones, and Universal Coordinated Time (UTC) and Greenwich Mean Time (GMT). (The ISO format does not support time zones.)

+ Text enclosed in parentheses is treated as a comment. The parentheses can be nested.

+ Commas and spaces are treated as delimiters. Multiple delimiters are permitted.

(c) [microsoft](http://msdn.microsoft.com/en-us/library/ie/ff743760%28v=vs.94%29.aspx)  

#### Quick use:

```
<p ng-age='05/21/1990'>{{years}}</p>
<p ng-age='10/08/1991 17:39'>{{days}}</p>
```