import { createConsumer } from '@rails/actioncable';
const URL = 'ws://127.0.0.1:3000/cable';
const consumer = createConsumer(URL);
 
export default consumer;