const { assert, expect } = require("chai");
const { ethers } = require('hardhat');

describe("Test Bank Contract", function () {
  let bank;
  let owner, addr1, addr2;

  describe('Initialisation', function(){
    beforeEach(async function() {
        [owner, addr1, addr2] = await ethers.getSigners();
        let contract = await ethers.getContractFactory('Bank');
        bank = await contract.deploy();
      })

      it('should deploy the smart contract', async function(){
        let theOwner = await bank.owner();
        assert.equal(owner.address, theOwner)
      })
  })

  describe('Deposit', function(){
    beforeEach(async function() {
        [owner, addr1, addr2] = await ethers.getSigners();
        let contract = await ethers.getContractFactory('Bank');
        bank = await contract.deploy();
      })

      it('should NOT deposit ethers on the Bank smart contract if not the owner', async function() {
        let etherQuantity = ethers.parseEther('0.1');
        await expect(
            bank
            .connect(addr1)
            .deposit({ value: etherQuantity })
            ).to.be.revertedWithCustomError(
                bank,
                "OwnableUnauthorizedAccount"
            ).withArgs(
                addr1.address
            )      
        })

      it('should NOT deposit ethers on the Bank smart contract if not enough funds provided', async function() {
        let etherQuantity = ethers.parseEther('0.09');
        await expect(
            bank
            .connect(owner)
            .deposit({ value: etherQuantity })
            ).to.be.revertedWith(
                'not enough funds provided'
            )
              
      })

      it('should deposit ethers if owner and if enough funds provided', async function() {
        let etherQuantity = ethers.parseEther('0.1');
        await expect(
            bank
            .deposit({ value: etherQuantity })
            ).to.emit(
                bank,
                'Deposit'
            )
            .withArgs(
                owner.address,
                etherQuantity
            )
        let balanceOfContract = await ethers.provider.getBalance(bank.target)
        assert(balanceOfContract.toString() === etherQuantity.toString());
      })
  })

  describe('Withdraw', function(){
    beforeEach(async function() {
        [owner, addr1, addr2] = await ethers.getSigners();
        let contract = await ethers.getContractFactory('Bank');
        bank = await contract.deploy();

        let etherQuantity = ethers.parseEther('0.1');
        let transaction= await bank.deposit({ value: etherQuantity });
        await transaction.wait();
      })

      it('should NOT withdraw ethers on the Bank smart contract if not the owner', async function() {
        let etherQuantity = ethers.parseEther('0.1');
        await expect(
            bank
            .connect(addr1)
            .withdraw(etherQuantity)
            ).to.be.revertedWithCustomError(
                bank,
                "OwnableUnauthorizedAccount"
            ).withArgs(
                addr1.address
            )      
        })

        it('should NOT withdraw ethers on the Bank smart contract if too much funds provided', async function() {
            let etherQuantity = ethers.parseEther('0.2');
            await expect(
                bank
                .withdraw(etherQuantity)
                ).to.be.revertedWith(
                    'you cannot withdraw this amount'
                )
                  
          })

          it('should withdraw if the owner try to withdraw and the amount is correct', async function () {
            let etherQuantity = ethers.parseEther('0.05');
            await expect(bank.withdraw(etherQuantity))
            .to.emit(
                bank,
                'Withdraw'
            )
            .withArgs(
                owner.address,
                etherQuantity
            )
            let balance = await ethers.provider.getBalance(bank.target);
            let remainingBalance = ethers.parseEther('0.05');
            assert(balance.toString() === remainingBalance.toString());
          })
    })
})
