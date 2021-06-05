import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(5006, () =>
    console.log('Choreographer listening on port 5006')
  );
}
bootstrap();

/*
bus = messages, messages san queue
pool.hset('bus', 'messages', JSON.stringify([]), () => {});

pool.hset('subscribers', 'channel', JSON.stringify([]), ()=> {});
 */

/**************** SUBSCRIBER ******************/
// pool.hget('subscribers', 'channel', async(err, data) => {
//   let currentSubscribers = JSON.parse(data);
//   let alreadySubscribed = false;
//   let myAddress = 'http://localhost:4000/bus';
//   for(let i = 0; i<currentSubscribers.length; i++) {
//     if (currentSubscribers[i] == myAddress){
//       alreadySubscribed = true;
//     }
//   }
//   if (!alreadySubscribed) {
//     currentSubscribers.push(myAddress)
//     pool.hset('subscribers', 'channel', JSON.stringify(currentSubscribers), () => {})
//     console.log("subscribed")
//   } else {
//     console.log('Already subscribed')
//   }
// })

// Ylopoihsh endpoint
// app.post('/bus', (req, res) => {
//   const event =req.body;
//   res.send({status: 'OK'})
// })

/********** CHOREOGRAPHER ************/

// app.post('/bus', async (req, res) => {
//   const event = req.body;
//   let currentMessages;
//   let newMessage = {};
//   pool.hget('bus', 'messages', async (err, data) => {
//     currentMessages = JSON.parse(data);
//     newMessage = {
//       id: currentMessages.length + 1,
//       event,
//       timestamp: Date.now(),
//     };
//     currentMessages.push(newMessage);
//     pool.hset('bus', 'messages', JSON.stringify(currentMessages), () => {
//       pool.hget('subscribers', 'channel', (err, data) => {
//         const subscribers = JSON.parse(data);
//         for (leti = 0; i < subscribers.length; i++) {
//           axios.post(subscribers[i], newMessage).then((resp) => {
//             console.log(subscribers[i], resp["data"]);
//           }).catch(e => {
//             console.log(subscribers[i], {"status":"lost connection"})
//           })
//           res.send({'status' :'ok'})
//         }
//       });
//     });
//   });
// });

/******** PUBLISHER *********/
/* APLA STELNEI MUNHMA STO API TO CHOREOGRAPHER PX 4200/BUS... */
