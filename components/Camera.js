const NodeWebcam = require('node-webcam');
const moment = require('moment')

module.exports = class Camera {
    constructor(options)
    {
        this.options = Object.assign({}, {
            width: 1280,
            height: 720,
            quality: 100,
            //Delay to take shot
            delay: 0,
            //Save shots in memory
            saveShots: true,
            // [jpeg, png] support varies
            // Webcam.OutputTypes
            output: "jpeg",

            //Which camera to use
            //Use Webcam.list() for results
            //false for default device
            device: false,

            // [location, buffer, base64]
            // Webcam.CallbackReturnTypes
            callbackReturn: "location",

            //Logging
            verbose: false,

            namePrefix: 'photo',

            // Default name
            name: () => {
                return 'camera/' + this.options.namePrefix + '-' + moment().format('DD-MM-YYYY_HH_mm_ss')
            }
        }, options);

        this.camera = NodeWebcam.create(this.options)
    }

    async photo(name)
    {
        return new Promise((resolve, reject) =>
        {
            this.camera.capture(name ? name : this.options.name(), (err, data) =>
            {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }
};