const watson = require('watson-developer-cloud/assistant/v1'); // watson sdk
const prompt = require('prompt-sync')();
const URL = process.env.ASSISTANT_IAM_URL;
const APIKEY = process.env.ASSISTANT_IAM_APIKEY;
const WORKSPACE = process.env.WORKSPACE;
const VERSION = process.env.VERSION;

require('dotenv').config();

const chatbot = new watson({
    'version': VERSION,
    'url': URL || '<url>',
    'iam_apikey': APIKEY || '<iam_apikey>',
    'iam_url': 'https://iam.bluemix.net/identity/token'
  });
 
  //Começando a conversação com a mensagem vazia;
  chatbot.message({WORKSPACE}, trataResposta);

  let fimConversa = false;

  function trataResposta(err, resposta){
 
    if(err){
        console.log(err);
        return;
    }
 
    //detecta a intenção do usuário
    if(resposta.intents.length > 0){
      console.log('Eu detectei a inteção: '+resposta.intents[0].intent);
      if(resposta.intents[0].intent = 'despedida'){
         fimConversa = true;
      }
    }

    // exibe a resposta do dialogo,caso exista
    if(resposta.output.text.length > 0){
        console.log(resposta.output.text[0]);
    }

    if(!fimConversa){
      const mensagem_usuario = prompt('>>');

        chatbot.message({
          workspace_id,
          input: {text: mensagem_usuario},
          context: resposta.context
        }, trataResposta);
    }
}


