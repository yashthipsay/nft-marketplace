const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("NFT Market", function () {
  //this is a conventional way of testing a smart contract, using beforeEach and it functions
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const Nft = await ethers.getContractFactory("NFT")
    const nft = await Nft.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits("100", "ether") //This is to parse whole unit values like ethers from string to number

    await nft.createToken("https://www.mytokenlocation.com") //Creating a token URI as a proof that it is an NFT

    await nft.createToken("https://www.mytokenlocation2.com")

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    })

    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    })
    const [_, buyerAddress] = await ethers.getSigners() //This is a way of getting fake address for testing

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice }) //Connect the buyer to the nft market and creating his token
  })
})
