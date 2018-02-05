const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs')

module.exports = class TelegramNotifier
{
    constructor(token)
    {
        this.subscribers = [];

        this.loadSubscribers();

        // Create a bot that uses 'polling' to fetch new updates
        this.bot = new TelegramBot(token, {polling: true});

        this.bot.onText(/\/notify/, (msg, match) => {
            // 'msg' is the received Message from Telegram
            // 'match' is the result of executing the regexp above on the text content
            // of the message

            const chatId = msg.chat.id;

            this.subscribers.push({id: msg.chat.id})
            this.saveSubscribers();

            // send back the matched "whatever" to the chat
            this.bot.sendMessage(chatId, "Теперь ты будешь получать уведомляшки...");
        });

        this.bot.onText(/\/cancel/, (msg, match) => {
            // 'msg' is the received Message from Telegram
            // 'match' is the result of executing the regexp above on the text content
            // of the message

            const chatId = msg.chat.id;

            this.subscribers = this.subscribers.filter(s => s.id === chatId)
            this.saveSubscribers();

            // send back the matched "whatever" to the chat
            this.bot.sendMessage(chatId, "Нуууу, а теперь ты не будешь получать уведомления... Пичаль");
        });

        // Listen for any kind of message. There are different kinds of
        // messages.
        this.bot.on('message', (msg) =>
        {
            const chatId = msg.chat.id;

            // send a message to the chat acknowledging receipt of their message
            // this.bot.sendMessage(chatId, 'Received your message');
        });
    }

    newPhoto(filename)
    {
        let url = `${__dirname}/../${filename}`;

        this.subscribers.forEach(subscriber => {
            this.bot.sendPhoto(subscriber.id, url, {caption: filename})
        });
    }

    loadSubscribers()
    {
        fs.readFile('telegram-subscribers.json', (err, data) =>
        {
            if (!err) {
                this.subscribers = JSON.parse(data);
            }
        });
    }

    saveSubscribers()
    {
        fs.writeFile('telegram-subscribers.json', JSON.stringify(this.subscribers), (err) =>
        {
            console.log(err)
        })
    }
}