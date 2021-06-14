import { GiphyFetch, TrendingOptions } from '@giphy/js-fetch-api';
import { IGif } from '@giphy/js-types';
import config from '../config/giphy';

const giphyFetch = new GiphyFetch(config.apiKey);

const cachedGifs: { [key: string]: IGif } = {};

class GiphyService {
  static trending(options?: TrendingOptions) {
    return giphyFetch.trending(options);
  }

  static async gif(id: string): Promise<IGif> {
    if (cachedGifs[id]) {
      return cachedGifs[id];
    }
    const { data } = await giphyFetch.gif(id);
    cachedGifs[id] = data;

    return cachedGifs[id];
  }
}

export default GiphyService;
