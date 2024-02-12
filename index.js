import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const API_KEY = "YOUR API KEY HERE"
const API_ENDPOINT = "https://api.unsplash.com/search/photos"


app.get("/", (req, res) => {
    res.render("index.ejs", { photos: "" })
});

app.post("/photos", async (req, res) => {
    const photoObjectsList = []
    const response = await axios.get(`${API_ENDPOINT}?client_id=${API_KEY}&query=${req.body.car}`)
    for (var i=0; i<response.data.results.length; i++) {
        photoObjectsList.push(response.data.results[i].urls.small)
    }
    res.render("index.ejs", { photos: photoObjectsList })
})

app.listen(port, () => {
    console.log("listening for port 3000")
})
