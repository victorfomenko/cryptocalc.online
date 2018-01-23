import { get as getCoin } from '../../data/providers/coin';
import { get as getBitfinex } from '../../data/providers/bitfinex';

const idToTicker = {
    1: 'btcusd',
    4: 'ltcusd',
    151: 'ethusd',
}

export default {
    getCoin: async (coinId) => {
        const coinPromise = getCoin(coinId)
        const bitfinexPromise = getBitfinex(`pubticker/${idToTicker[coinId]}`)
        const [ pool, price ] = await Promise.all([coinPromise, bitfinexPromise]);
        return { ...pool, ...price }
    },
};
