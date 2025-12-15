import pkg from "tronweb";
const { TronWeb } = pkg;

export default class TRC20Wallet {
    constructor(network = "mainnet") {
        const networks = {
            mainnet: "https://api.trongrid.io",
            shasta: "https://api.shasta.trongrid.io",
        };

        this.tronWeb = new TronWeb({
            fullHost: networks[network] || networks.mainnet,
            privateKey: process.env.PRIVATEKEYTRC20,
        });

        this.USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
    };

    async createWallet() {
        try {
            const account = await this.tronWeb.createAccount();
            return {
                address: account.address.base58,
                privateKey: account.privateKey,
                hexAddress: account.address.hex,
            };
        } catch (err) {
            console.error("error created wallet", err.message);
            throw err;
        };
    };

    async getBalance(address) {
        try {
            const trxBalance = await this.tronWeb.trx.getBalance(address);
            const trx = this.tronWeb.fromSun(trxBalance);

            const contract = await this.tronWeb.contract().at(this.USDT_CONTRACT);
            usdtBalance = await contract.balanceOf(address).call();

            return {
                address,
                trx,
                usdt: +usdtBalance / 1e6
            };
        } catch (err) {
            console.error("Error fetching balance:", err.message);
            return null;
        };
    };

    async sendTRX(toAddress, amount) {
        try {
            const amountInSun = this.tronWeb.toSun(amount);
            const tx = await this.tronWeb.trx.sendTransaction(toAddress, amountInSun);
            return tx; 
        } catch (err) {
            console.error("error send trx", err.message || err);
            return false;
        };
    };

    async sendUSDT(toAddress, amount) {
        try {
            const contract = await this.tronWeb.contract().at(this.USDT_CONTRACT);
            const sendAmount = (amount * 1e6).toString();
            const tx = await contract.transfer(toAddress, sendAmount).send({
                feeLimit: 1_000_000_000,
            });
            return {
                success: true,
                tx,
            };
        } catch (err) {
            console.error("error send USDT", err);
            return {
                success: false,
                error: err,
            };
        };
    };

    validateAddress(address) {
        return this.tronWeb.isAddress(address);
    };
};
