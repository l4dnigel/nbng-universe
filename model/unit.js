
var ConsPropNature = require('../constants/prop-nature');
var UtilGrow = require('../utils/grow');



module.exports = class {
	constructor(db) {
		this._db = db;
	}

	getId() {
		return this._db['id'];
	}

	getFire(lv) {
		return this.getNatureValue(ConsPropNature.FIRE, lv);
	}

	getLand(lv) {
		return this.getNatureValue(ConsPropNature.LAND, lv);
	}

	getWind(lv) {
		return this.getNatureValue(ConsPropNature.WIND, lv);
	}

	getWater(lv) {
		return this.getNatureValue(ConsPropNature.WATER, lv);
	}

	getMoon(lv) {
		return this.getNatureValue(ConsPropNature.MOON, lv);
	}

	getNatureValue(nature, lv) {
		const min = this._db[nature + ConsPropNature.MIN_POSFIX];
		const max = this._db[nature + ConsPropNature.MAX_POSFIX];
		return UtilGrow.getValue(min, max, lv);
	}

	getName(locale) {
		return this._db['name'][locale];
	}

	/*
	 * [[skillId, skillLevel], ...], skillLevel is null if the skill has no level at all
	 */
	getSkills() {
		return this._db['skills'];
	}

	getRarity() {
		return this._db['rarity'];
	}

	getJob() {
		return this._db['job'];
	}

	getArm() {
		return this._db['arm'];
	}

	getNature() {
		return this._db['nature'];
	}

	getCost() {
		return this._db['cost'];
	}

	calcSpeed() {
		//TODO
	}
}