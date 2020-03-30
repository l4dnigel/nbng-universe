var _ = require('lodash');


var DbUnits = require('./output/module/units');
var DbSkills = require('./output/module/skills');

var ModelUnit = require('./model/unit');
var ModelSkill = require('./model/skill');


module.exports = {
	getUnitData: function(unitId, extraQuery) {
		var query = {id: unitId};

		if(extraQuery) {
			query = Object.assign({}, query, extraQuery);
		}

		var db = _.find(DbUnits, query);
		if (!db) { throw new Error(`Can not find data by ${unitId}`); }
		return db;
	},

	getSkillData: function(skillId, extraQuery) {
		var query = {id: skillId};

		if (extraQuery) {
			query = Object.assign({}, query, extraQuery);
		}

		var db = _.find(DbSkills, query);
		if (!db) { throw new Error(`Can not find data by ${skillId}`); }
		return db;
	},

	getUnitInstance: function(unitId, extraQuery) {
		return new ModelUnit(this.getUnitData(unitId, extraQuery));
	},

	getSkillInstance: function(skillId, extraQuery) {
		return new ModelSkill(this.getSkillData(skillId, extraQuery));
	},

	/*
	 * @unitId: the unit id or unit instance
	 * @skillId: the skill id or skill instance
	 */
	checkIfUnitCanLearnSkill: function(unitId, skillId) {
		var unitIns = unitId instanceof ModelUnit ? unitId : this.getUnitInstance(unitId);
		var skillIns = skillId instanceof ModelSkill ? skillId : this.getSkillInstance(skillId);

		if (!skillIns.checkIfSuitUnitLimit(unitIns.getId())) { return false; }
		if (!skillIns.checkIfSuitArmLimit(unitIns.getArm())) { return false; }
		if (!skillIns.checkIfSuitJobLimit(unitIns.getJob())) { return false; }
		if (!skillIns.checkIfSuitNatureLimit(unitIns.getNature())) { return false; }

		return true;
	}
}