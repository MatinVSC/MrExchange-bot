import { restClient } from "coinmarketcap-js";

export class CryptoPriceFetcher {
    /**
     * @param {string} apiKey
     * @param {string} [convert="USD"]
     */
    constructor(convert = "USD") {
        this.client = restClient(process.env.APICOINMARKETCAP);
        this.convert = convert;
    };

    /**
     * 
     * @param {string[]} symbols
     * @returns {Promise<Object>}
     */
    async fetchPrices(symbols) {
        if (!Array.isArray(symbols) || symbols.length === 0) {
            throw new Error("symbols must be a non-empty array");
        };

        try {
            const response = await this.client.crypto.latestQuotes({
                symbol: symbols.join(","),
                convert: this.convert,
            });

            const data = response.data;

            const result = {};
            for (const sym of symbols) {
                const entry = data[sym];

                if (entry && entry.quote && entry.quote[this.convert]) {
                    result[sym] = entry.quote[this.convert].price;
                } else {
                    result[sym] = null;
                };
            };
            return result;
        } catch (err) {
            console.error("Error fetching crypto prices:", err);
            throw err;
        };
    };
};
