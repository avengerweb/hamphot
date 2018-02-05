const Camera = require('./Camera');

class PhotoMaker {
    constructor(interval)
    {
        this._interval = null;
        this.onPhotoCallbacks = [];
        this.camera = new Camera;

        this.setInterval(interval ? interval : 60 * 1000);

        setTimeout(() => {
            // Send first photo
            this.makePhoto()
        }, 15 * 1000)
    }

    setInterval(interval)
    {
        this.interval = interval;

        this.reload();
    }

    reload()
    {
        if (this._interval) {
            console.log(`Reload with new interval ${this.interval}`);
            clearInterval(this._interval);
        }
        this._interval = setInterval(this.makePhoto.bind(this), this.interval)
    }

    addCallback(callback)
    {
        this.onPhotoCallbacks.push(callback)
    }

    async makePhoto()
    {
        console.log('Cheeeese')
        let photo = await this.camera.photo()
        this.onPhotoCallbacks.forEach(c => c(photo))
    }
}

module.exports = new PhotoMaker()