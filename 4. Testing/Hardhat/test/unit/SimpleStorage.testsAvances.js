/*
const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const helpers = require("@nomicfoundation/hardhat-network-helpers");
  
describe('SimpleStorage tests', function () { async function deployContract() {
    const [owner, otherAccount] = await ethers.getSigners();
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy(SimpleStorage);
    return { simpleStorage, owner, otherAccount };
}

describe('Deployment', function () {
    it('Should deploy the smart contract', async function () {
        const { simpleStorage } = await loadFixture(deployContract)
        expect(await simpleStorage.getValue()).to.equal(0);
    });
});

describe('Set', function () {
    it('Should set a new value inside the smart contract', async function () {
        const { simpleStorage, owner, otherAccount } = await loadFixture(deployContract)
        const newValue = 42
        await simpleStorage.connect(otherAccount).setValue(newValue)
        const storedValue = await simpleStorage.getValue()
        expect(storedValue).to.equal(newValue)
    })
})

describe('getCurrentTimestamp', function() {
    it('Should get the time', async function() {
        const { simpleStorage } = await loadFixture(deployContract)
        await helpers.time.increaseTo(2000000000)
        let currentTimestamp = await simpleStorage.getCurrentTime()
        expect(Number(currentTimestamp)).to.be.equal(2000000000)

        // mine several blocks
        await helpers.mine(1000, {interval: 15})
        let timestampOfLastBlock = await helpers.time.latest()
        console.log(Number(timestampOfLastBlock))
    })
})

})

*/
