const chai = require('chai');
const expect = chai.expect;
const getNsfwImage = require('../src/commands/get-nsfw-image.js');

describe('get-nsfw-image', () => {
    describe('Validate tag', () => {
        describe('Tag does not exist in JSON', () => {
            it('Should return false', () => {
                
                // Arrange
                const tag = "123j2njk";
    
                // Act
                const result = getNsfwImage.validateTag(tag);
    
                // Assert
                expect(result).to.be.false;
            });
        });

        describe('Tag exists in JSON', () => {
            it('Should return true', () => {

                // Arrange
                const tag = "pussy";
    
                // Act
                const result = getNsfwImage.validateTag(tag);
    
                // Assert
                expect(result).to.be.true;
            });
        });
    });
});