import { createConsumer } from '@rails/actioncable';
import Constants from './constants';
import Cookies from 'js-cookie';

const URL = 'ws://127.0.0.1:3000/cable';
// const URL = `ws://hosh-messenger-api.onrender.com/cable`;
const consumer = createConsumer(URL, [], {
    // cookie: `user.id=${Cookies.get('user_id')}`,
    headers: {
        // 'Origin': 'localhost:3001'
    }
});
 
export default consumer;