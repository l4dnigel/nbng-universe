var assert = require('assert');

var Main = require('../index');

describe('Test unit data', function() {
	var unitId = '6003';
	var unitObj = Main.getUnitData(unitId);

	it(`Testing unit id is string`, function() {
		assert.ok(typeof unitObj.id === 'string', `Unit id is not string`);
	});

	it(`Testing can get unit name`, function() {
		assert.ok(unitObj.name.zh === '德川家康', 'Failed to get unit name');
	});
});

describe('Test if functional of getting nature value of unit', function() {
	var unitId = '6002';
	var lv0Value = 86;
	var lv19Value = 204;
	var lv20Value = 211;

	var UnitIns = Main.getUnitInstance(unitId);

	it(`Testing ${unitId} Level 0 fire value`, function() {
		var value = UnitIns.getFire(0);
		assert.ok(value === lv0Value, `Failed to get correct nature value of fire of ${unitId} at level 0. ${value} vs ${lv0Value}`);
	});

	it(`Testing ${unitId} Level 19 fire value`, function() {
		var value = UnitIns.getFire(19);
		assert.ok(value === lv19Value, `Failed to get correct nature value of fire of ${unitId} at level 19. ${value} vs ${lv19Value}`);
	});

	it(`Testing ${unitId} Level 20 fire value`, function() {
		var value = UnitIns.getFire(20);
		assert.ok(value === lv20Value, `Failed to get correct nature value of land of ${unitId} at level 20. ${value} vs ${lv20Value}`);
	});
});

describe('Checking main.checkIfUnitCanLearnSkill', function() {
	it(`Test if unit can learn normal skill by passing unit id, skill id`, function() {
		assert.ok(Main.checkIfUnitCanLearnSkill('6002', '征夷大將軍'), `Unit can not learn easy skill`)
	});

	it(`Test if unit should be failed to learn arm limited skill`, function() {
		assert.ok(!Main.checkIfUnitCanLearnSkill('6002', '甲斐之虎'), `Unit can successfully learn skill that should be restricted`)
	});
})