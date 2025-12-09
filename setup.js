    import 'dotenv/config';
    import connectDB from "./app/database/connect.js";
    import { CreateCrypto, FindCrypto } from "./app/database/controllers/crypto.js";
    
    const createSetupCrypto = () => {
        const createDb = async () => {
            await connectDB();
    
            const cryptoData = [
                {
                    name: "TRON",
                    nickname: "TRX",
                    network: [{ name: "TRC20", fee: 1 }],
                    min: 1,
                    max: 100,
                    price: 1000
                },
                {
                    name: "TETHER",
                    nickname: "USDT",
                    network: [
                        { name: "TRC20", fee: 1 },
                        { name: "BEP20", fee: 1 }
                    ],
                    min: 1,
                    max: 100,
                    price: 2000
                },
                // Add the new crypto here
                {
                    name: "BITCOIN",
                    nickname: "BTC",
                    network: [
                        { name: "Mainnet", fee: 0.0001 }
                    ],
                    min: 0.001,
                    max: 1,
                    price: 50000
                }
            ];
    
            for (const crypto of cryptoData) {
                // Check if the crypto already exists
                const existingCrypto = await FindCrypto({ nickname: crypto.nickname });
                if (!existingCrypto) {
                    await CreateCrypto(crypto);
                    console.log(`✅ Crypto ${crypto.nickname} added to database.`);
                } else {
                    console.log(`⚠️ Crypto ${crypto.nickname} already exists in database.`);
                }
            }
        };
        createDb();
    };
    
    createSetupCrypto();
