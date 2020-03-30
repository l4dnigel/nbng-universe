
var _ = require('lodash');


module.exports = class {
	constructor(db) {
		this._db = db;
	}

	getName(locale) {
		return this._db['name'][locale];
	}

	getDesc(locale) {
		return this._db['desc'][locale];
	}

	getNature() {
		return this._db['nature'];
	}

	getSystem() {
		return this._db['system'];
	}

	getTarget() {
		return this._db['target'];
	}

	getMinLevel() {
		return this._db['min_lv'];
	}

	getMaxLevel() {
		return this._db['max_lv'];
	}

	getWeight(level) {
		return this._getWeight(this._db['weight'], this.getMinLevel(), level);
	}

	getTeamWeight(level) {
		return this._getWeight(this._db['team_weight'], this.getMinLevel(), level);
	}

	_getWeight(weight, minLevel, level) {
		if (
			!_.isArray(weight) ||
			!_.Number(level) || 
			level < 1 ||
			level < minLevel) 
		{
			throw new Error('Incorrect format of weight or level')
		}

		return weight[level - minLevel];
	}

	getTeamWeightLimitArms() {
		return this._db['team_weight_limit_arms'];
	}

	getLimitNatures() {
		return this._db['limit_natures'];
	}

	getLimitArms() {
		return this._db['limit_arms'];
	}

	getLimitJobs() {
		return this._db['limit_jobs'];
	}

	getLimitUnits() {
		return this._db['limit_units'];
	}

	checkIfSuitNatureLimit(unitNature) {
		var natures = this.getLimitNatures();
		if (natures.length === 0 || natures.indexOf(unitNature) !== -1) { return true; }
		return false;
	}

	checkIfSuitArmLimit(unitArm) {
		var arms = this.getLimitArms();
		if (arms.length === 0 || arms.indexOf(unitArm) !== -1) { return true; }
		return false;
	}

	checkIfSuitJobLimit(unitJob) {
		var jobs = this.getLimitJobs();
		if (jobs.length === 0 || jobs.indexOf(unitJob) !== -1) { return true; }
		return false;
	}

	checkIfSuitUnitLimit(unitId) {
		var units = this.getLimitUnits();
		if (units.length === 0 || units.indexOf(unitId) !== -1) { return true; }
		return false;
	}
}