var assert = require('assert');

var Main = require('../index');

describe('Test skill data', function() {
	var id = '征夷大將軍';
	var skillData = Main.getSkillData(id);

	it(`Testing id is string`, function() {
		assert.ok(typeof skillData.id === 'string', `Id is not string`);
	});

	it(`Testing can get name`, function() {
		assert.ok(skillData.name.zh === '征夷大將軍', 'Failed to get name');
	});
});