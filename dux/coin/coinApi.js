import { get as getCoin } from '../../data/providers/coin';
import { get as getBitfinex } from '../../data/providers/bitfinex';

const idToTicker = {
    151: 'ethusd'
}

export default {
    getCoin: async (req, coinId) => {
        const coinPromise = getCoin(req, `${coinId}.json`)
        const bitfinexPromise = getBitfinex(req, `/pubticker/${idToTicker[coinId]}`)
        const [ pool, price ] = await Promise.all([coinPromise, bitfinexPromise]);
        return { ...pool, ...price }
    },
};
