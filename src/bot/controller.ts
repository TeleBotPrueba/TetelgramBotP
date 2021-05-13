import telegramBot, { InlineQueryResult } from 'node-telegram-bot-api';
import {malasPalabras} from './blocked';
import fs from 'fs';


function init(){
    const bot = new telegramBot(process.env.token as string,{polling:true});
    const bannedList:{
        [key: string]: number
    } ={};

    bot.on('message',(message)=>{
        
        const sender_id = message.chat.id;
        
          switch(message.text){
           case 'hola':
                bot.sendMessage(sender_id,"Hola");
                break;
            case 'reglas':
               "1 No decir malas palabras \n2 Respetar a los miembros\n3 No hagas comentarios inapropiados\4 nSé claro\n5Cuando las cosas se pongan delicadas, manéjalas fuera del grupo"
                break;
        }
        
        
        if(message.text && malasPalabras(message.text)){
          bannedList[message.from!.id] = bannedList[message.from!.id] === undefined ? 1 : bannedList[message.from!.id] + 1;
    
          if(bannedList[message.from!.id]===3){
              bot.sendMessage(sender_id,"Lo siento debo sacarlo del grupo!");
              bot.kickChatMember(sender_id,message.from!.id.toString());
          }else{
              bot.sendMessage(sender_id,`Cuidado con tus palabras tienes tres oportunidades, advertencia No. ${bannedList[message.from!.id]}`,{
              reply_to_message_id: message.message_id
            });
        }
      } 
    })
    bot.on("inline_query",(qry)=>{
        const matches: Array<InlineQueryResult> = dictionarySearch(qry.query).map(([word,definition],i)=>{
            return {
                id: i.toString(),
                type:'article',
                title: word,
                description: definition,
                input_message_content: {
                    message_text: `${word}; ${definition}`
                }
            }
        })
        bot.answerInlineQuery(qry.id,matches);
    })
}

function dictionarySearch(text: string): Array<[string, string]>{
    const dictionary: {
        [word:string]:string
    }= JSON.parse(fs.readFileSync('./dictionary.json','utf8'));
    const matches: Array<[string,string]> = Object.entries(dictionary).filter(([word])=>{
        return word.includes(text);
    })
    return matches;
}

const botController={init};
export default botController;  
