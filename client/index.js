const auth = require('./auth.js');
const grpcClient = require('./grpcClient.js');


(async () => {
  const apiKey = process.env.API_KEY;    
  const accountId = process.env.ACCOUNT_ID;
  const avatarId = process.env.AVATAR_ID;

  const {grpcEndpoint, sessionToken} = await auth.getAuthToken(apiKey, accountId);


  const conversation = await grpcClient.startConversation(grpcEndpoint, accountId, sessionToken, avatarId);
  conversation.on('data', (response) => {
    console.log(`MESSAGE FROM AVATAR: ${response.utterance}`);
  });

  conversation.on('error', (err) => {
    console.log(err);
  });

  conversation.on('end',() => {
    console.log('AVATAR HAS FINISHED CONVERSATION');
    process.exit(0);
  });

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (userUtteranceText) => {
    conversation.write({text: userUtteranceText})
  });

})();
