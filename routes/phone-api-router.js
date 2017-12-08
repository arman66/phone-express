const express = require("express");

const Phone = require("../models/phone-model");


const router = express.Router();


router.get("/phones", (req, res, next) => {
    Phone
      .find()
      .limit(25)
      .exec()
      .then((phoneResults) => {
          // respond with the QUERY RESULTS in the JSON format
          res.status(200).json(phoneResults);
      })
      .catch((err) => {
          console.log("GET /phones ERROR!");
          console.log(err);

          // respond with an ERROR MESSAGE in the JSON format
          res.status(500).json({ error: "Phone list database error" });
      });
}); // GET /phones


router.post("/phones", (req, res, next) => {
    const thePhone = new Phone({
        brand: req.body.brand,
        name: req.body.name,
        image: req.body.image,
        specs: req.body.specs
    });

    thePhone.save()
      .then(() => {
          // respond with the NEW PHONE in the JSON format
          res.status(200).json(thePhone);
      })
      .catch((err) => {
          console.log("POST /phones ERROR!");
          console.log(err);

          // 400 status code if validation error
          if (err.errors) {
              // respond with an VALIDATION ERRORS in the JSON format
              res.status(400).json(err.errors);
          }
          else {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(500).json({ error: "Phone save database error" });
          }
      });
}); // POST /phones


router.get("/phones/:id", (req, res, next) => {
    if (req.user === undefined) {
        res.status(400).json({ error: "Not logged in" });
        return;
    }

    Phone.findById(req.params.id)
      .then((phoneFromDb) => {
          // 404 if phone doesn't exist
          if (phoneFromDb === null) {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(404).json({ error: "Phone not found" });
          }
          else {
              // respond with the QUERY RESULTS in the JSON format
              res.status(200).json(phoneFromDb);
          }
      })
      .catch((err) => {
          console.log("GET /phones/:id ERROR!");
          console.log(err);

          // respond with an ERROR MESSAGE in the JSON format
          res.status(500).json({ error: "Phone details database error" });
      });
}); // GET /phones/:id


router.delete("/phones/:id", (req, res, next) => {
    if (req.user === undefined) {
        res.status(400).json({ error: "Not logged in" });
        return;
    }

    Phone.findByIdAndRemove(req.params.id)
      .then((phoneFromDb) => {
          if (phoneFromDb === null) {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(404).json({ error: "Phone not found" });
          }
          else {
              // respond with the QUERY RESULTS in the JSON format
              res.status(200).json(phoneFromDb);
          }
      })
      .catch((err) => {
          console.log("DELETE /phones/:id ERROR!");
          console.log(err);

          // respond with an ERROR MESSAGE in the JSON format
          res.status(500).json({ error: "Phone delete database error" });
      });
}); // DELETE /phones/:id


router.put("/phones/:id", (req, res, next) => {
    Phone.findById(req.params.id)
      .then((phoneFromDb) => {
          if (phoneFromDb === null) {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(404).json({ error: "Phone not found" });
              return;
          }

          phoneFromDb.set({
              brand: req.body.brand,
              name: req.body.name,
              image: req.body.image,
              specs: req.body.specs
          });

          return phoneFromDb.save();
      })
      .then((phoneFromDb) => {
          // respond with the QUERY RESULTS in the JSON format
          res.status(200).json(phoneFromDb);
      })
      .catch((err) => {
          console.log("PUT /phones/:id ERROR!");
          console.log(err);

          // 400 status code if validation error
          if (err.errors) {
              // respond with an VALIDATION ERRORS in the JSON format
              res.status(400).json(err.errors);
          }
          else {
              // respond with an ERROR MESSAGE in the JSON format
              res.status(500).json({ error: "Phone update database error" });
          }
      });
}); // PUT /phones/:id


module.exports = router;
