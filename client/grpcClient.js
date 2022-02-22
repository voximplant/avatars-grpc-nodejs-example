const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH_API = "./proto/api.proto";
const PROTO_PATH_AUTH = "./proto/auth.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
};

const AvatarApi = grpc.loadPackageDefinition(protoLoader.loadSync(PROTO_PATH_API, options)).Avatar;
const AvatarAuth = grpc.loadPackageDefinition(protoLoader.loadSync(PROTO_PATH_AUTH, options)).Login;


async function startConversation(grpcEndpoint, accountId, sessionToken, avatarId) {
  return new Promise(resolve => {
    const clientAuth = new AvatarAuth(
      grpcEndpoint,
      grpc.credentials.createSsl()
    );
    clientAuth.Login({account_id: accountId.toString(), session_id: sessionToken}, (error, response) => {
      if (error) throw error
      const authToken = response.jwt_token;
  
      const clientApi = new AvatarApi(
        grpcEndpoint,
        grpc.credentials.createSsl()
      );
  
      let metadata = new grpc.Metadata();
      metadata.add('Authorization', 'Bearer ' + authToken);
      metadata.add('avatarId', avatarId);
      resolve(clientApi.Conversation(metadata));
    });
  });
}

module.exports.startConversation = startConversation;
