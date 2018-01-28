import { get as getCoin } from '../../data/providers/coin';
import { get as getBitfinex } from '../../data/providers/bitfinex';

const idToTicker = {
    1: 'btcusd',
    4: 'ltcusd',
    34: 'dshusd',
    151: 'ethusd',
    162: 'etcusd',
    166: 'zecusd',
}

export default {
    getCoin: async (req, coinId) => {
        const coinPromise = getCoin(req, coinId)
        const bitfinexPromise = getBitfinex(req, `pubticker/${idToTicker[coinId]}`)
        const [ pool, price ] = await Promise.all([coinPromise, bitfinexPromise]);
        return { ...pool, ...price }
    },
};
