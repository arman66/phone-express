require("dotenv").config();

require("../config/mongoose-setup");

const Phone = require("../models/phone-model");


const phoneList = [
    {
        brand: 'Apple',
        name: 'iPhone X',
        image: 'https://cdn.vox-cdn.com/uploads/chorus_asset/file/9230573/apple_iphone_2017_20170912_11670.JPG',
        specs: [
          'Unibrow Design',
          'Unlocks with Your Face',
          'Tons of Screen Space'
        ]
    },
    {
        brand: 'Google',
        name: 'Pixel 2',
        image: 'https://cnet4.cbsistatic.com/img/qhWOoIqPUIs0E8Fs-USZ-6cIQxU=/830x467/2017/10/16/b3f7c184-cbd5-4073-958e-02d33c0ddc88/google-pixel-2-0490-025.jpg',
        specs: [
          'Plastic Design',
          'Domino Design',
          'Ads For Days'
        ]
    }
];


Phone.create(phoneList)
  .then((results) => {
      console.log(`${results.length} phones created`);
  })
  .catch((err) => {
      console.log("Save ERROR!");
      console.log(err);
  });
