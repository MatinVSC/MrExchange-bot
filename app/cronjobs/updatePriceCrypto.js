import { CryptoPriceFetcher } from "../api/coinmarketcap.js";
import { FindAllCrypto, UpdateCrypto } from "../database/controllers/crypto.js";

const updatePriceCrypto = async () => {
    const cryptos = await FindAllCrypto();
    const fetcher = new CryptoPriceFetcher();
    const symbols = [];

    for (const item of cryptos) {
        symbols.push(item.nickname)
    };

    const usdtPrice = 125000;
    const prices = await fetcher.fetchPrices(symbols);
    for (const [symbol, price] of Object.entries(prices)) {
        const priceInToman = Math.ceil(price * usdtPrice);
        await UpdateCrypto({ nickname: symbol }, { price: priceInToman });
    };
};

export default updatePriceCrypto;