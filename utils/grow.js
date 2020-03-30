/*
The module handles the query about growth value of characters
*/

module.exports = {
	/*
	 * @min: the value at min level
	 * @max: the value at max level
	 * @lv: the query level
	 */
	getValue: function(min, max, lv) {
		if(lv === 0) {
			return min;
		} else if(lv === 20) {
			return max;
		} else {
			return Math.floor((max - min) / 20 * lv) + min
		}
	}
}