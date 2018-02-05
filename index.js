const fs = require('fs');

let file = fs.readFileSync('config.json');
const config = JSON.parse(file);

const PhotoMaker = require('./components/PhotoMaker');
const TelegramNotifier = require('./components/TelegramNotifier');

PhotoMaker.setInterval(config.interval)

if (config.notifiers.telegram && config.notifiers.telegram.enabled)
{
    const telegram = new TelegramNotifier(config.notifiers.telegram.token);
    PhotoMaker.addCallback(telegram.newPhoto.bind(telegram))
}
