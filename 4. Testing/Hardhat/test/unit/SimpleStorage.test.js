/*
const { assert, expect } = require("chai");
const { ethers } = require('hardhat');

describe("SimpleStorage Tests", function () {
  let owner, addr1, addr2, addr3;
  let simpleStorage;

  beforeEach(async function() {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    simpleStorage = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorage.deploy()
  })

  describe('Set and Get number', function(){
    it('should get number and the number should be equal to 0', async function(){
        let number = await simpleStorage.getValue()
        assert(number.toString() === "0");
    })
    it('should NOT set the number to 99', async function(){
        await expect(simpleStorage.connect(addr1).setValue(99))
        .to.be.revertedWithCustomError(simpleStorage, "NumberOutOfRange")
    })
    it('should set the number to 7', async function(){
        await simpleStorage.connect(addr1).setValue(7);
        let number = await simpleStorage.connect(addr1).getValue()
        assert(number.toString() === "7");
    })
    it('should set the number with different accounts', async function(){
        await simpleStorage.connect(addr1).setValue(7);
        let number = await simpleStorage.connect(addr1).getValue()
        assert(number.toString() === "7");

        await simpleStorage.connect(addr2).setValue(9);
        number = await simpleStorage.connect(addr2).getValue()
        assert(number.toString() === "9");
    })
    it('should emit an event if the number is changed', async function(){
        await expect(simpleStorage.setValue(4))
        .to.emit(simpleStorage, 'NumberChanged')
        .withArgs(owner.address,4);
    })
  })

})

*/
