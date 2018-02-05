# Hamphot
App in real-time make photos from your webcam and send it to telegram channel. (I use this application to track the cage of my chinchilla)

### Install
#### Dependencies
`yarn`

#### Configuration
 * Rename `config.json.rename` -> `config.json`
 * Add your telegram token to config file
 * Set required interval (in **milliseconds**)

#### Install webcam dependencies
- Linux
#Linux relies on fswebcam currently
#Tested on ubuntu
`sudo apt-get install fswebcam`

 - Mac OSX
#Mac OSX relies on imagesnap
#Repo https://github.com/rharder/imagesnap
#Avaliable through brew
`brew install imagesnap`

 - Windows
Standalone exe included. See src/bindings/CommandCam

#### Run
`node index.js`

#### Telegram
send `/notify` to bot for get notifications with photos
send `/cancel` to cancel notifications