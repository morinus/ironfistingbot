const chai = require('chai');
const expect = chai.expect;
const submitMatchResults = require('../src/commands/submit-match-results.js');

describe('submit-match-results', () => {
    describe('Format character name string', () => {
        describe('Character name string passed', () => {
            it('Should return correct value', () => {
                
                // Arrange
                const characterName = "dRaGuNoV";
                const expectedResult = "Dragunov";
    
                // Act
                var result = submitMatchResults.formatCharacterNameString(characterName);
    
                // Assert
                expect(result).to.be.equal(expectedResult);
            });
        });
    });
});