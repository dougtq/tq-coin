const crypto = require('crypto-js/sha256')

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount
    }
}

class Block {
    constructor(timestamp, transaction, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash () {
        return crypto(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock (difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash()
            console.log("Partial Block mined:", this.hash)
        }
        console.log("Final Block mined:", this.hash)
    }
}

class Blockchain {
    constructor () {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
    }

    createGenesisBlock () {
        return new Block(0, Date.now(), "Genesis", "0")
    }

    getLatestBlock () {
        return this.chain[this.chain.length - 1]
    }

    addBlock (newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBLock = this.chain[i];
            // const previousBlock = this.chain[i - 1];

            if (currentBLock.hash !== currentBLock.calculateHash()) {
                return false;
            }

            if (this.currentBLock.hash !== this.previousBlock.hash) {
                return false;
            }

            return true;
        }
    }
}

let tqCoin = new Blockchain()

tqCoin.addBlock(new Block('77', Date.now(), { teste: 'Teste' }, tqCoin.getLatestBlock().hash))
tqCoin.addBlock(new Block('78', Date.now(), { teste: 'Teste' }, tqCoin.getLatestBlock().hash))
