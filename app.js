const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");


const MONGO_URL="mongodb://127.0.0.1:27017/DWELLIO";


main().then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// app.get("/testlistings", async (req, res) => {
//     let sampleListing=new Listing({
//         title:"MY New Villa",
//         description:"By the sea",
//         price:1200,
//         location:"Goa",
//         country:"India",
        
//     });
//     await sampleListing.save();
//     console.log("Listing saved");
//     res.send("Listing saved");
// });

//index route
app.get("/listings", async (req, res) => {
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});
//new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;

    // Prevent crash if id is not a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.redirect("/listings/new");
    }

    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// create route
app.post("/listings", async (req, res) => {

    let newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});


app.listen(8080, () => {
    console.log("Server started on port 8080");
});