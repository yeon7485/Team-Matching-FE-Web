import axios from 'axios';

export default class MockData {
  async posts() {
    return axios.get('/data/posts.json');
  }
}
