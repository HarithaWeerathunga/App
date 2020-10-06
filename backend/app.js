
// Node File System import to interact with the local files
const fs = require("fs");

// web application framework used
const express = require("express");

// middle ware for uploading files
const multer = require("multer");

// this is the downloaded credentials file from the Google Cloud Console
const OAuth2Data = require("./credentials.json");

// To assign the user name and the profile picture when the user authenticates the consent
var name,pic;

//  Google APIs
const { google } = require("googleapis");

// Initialize an express application
const app = express();


// public and unique identifier to identify Easy Upload as an application
const CLIENT_ID = OAuth2Data.web.client_id;

// private identifier which is kept between the app and the Google API
const CLIENT_SECRET = OAuth2Data.web.client_secret;

// This is the call back URL from Google
const REDIRECT_URL = OAuth2Data.web.redirect_uris[0];

// Initialize the oAuth 2.0 client
const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

// initially set the authorization to false
var authorized = false;

// Scopes
const SCOPES =
    "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile";

// ejs handlebars view engine
app.set("view engine", "ejs");

//initialize local storage
var LocalStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./images");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

// upload

var upload = multer({
    storage: LocalStorage,
}).single("file"); //Field name and max count

// this will get the authentication URL
app.get("/", (req, res) => {
    if (!authorized) {

        // This will generate the authentication URL for consent page landing
        var generateAuthUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: SCOPES,
        });
        console.log(generateAuthUrl);
        res.render("index", { url: generateAuthUrl });
    } else {
        var oauth2 = google.oauth2({
            auth: oAuth2Client,
            version: "v2",
        });
        oauth2.userinfo.get(function (err, response) {
            if (err) {
                console.log(err);
            } else {

                console.log(response.data);
                name = response.data.name
                pic = response.data.picture

                res.render("success", {
                    name: response.data.name,
                    pic: response.data.picture,
                    success:false
                });
            }
        });
    }
});

app.post("/upload", (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.end("Something went wrong");
        } else {
            console.log(req.file.path);
            const drive = google.drive({ version: "v3",auth:oAuth2Client  });
            const fileMetadata = {
                name: req.file.filename,
            };
            const media = {
                mimeType: req.file.mimetype,
                body: fs.createReadStream(req.file.path),
            };
            drive.files.create(
                {
                    resource: fileMetadata,
                    media: media,
                    fields: "id",
                },
                (err, file) => {
                    if (err) {
                        // Handle error
                        console.error(err);
                    } else {
                        fs.unlinkSync(req.file.path)
                        res.render("success",{name:name,pic:pic,success:true})
                    }

                }
            );
        }
    });
});




app.get('/logout',(req,res) => {
    authorized = false
    res.redirect('/')
})

app.get("/google/callback", function (req, res) {
    const code = req.query.code;
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log("Error authenticating");
                console.log(err);
            } else {
                console.log("Successfully authenticated");
                console.log(tokens)
                oAuth2Client.setCredentials(tokens);


                authorized = true;
                res.redirect("/");
            }
        });
    }
});

app.listen(5000, () => {
    console.log("App is listening on Port 5000");
});
