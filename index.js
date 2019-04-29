const express = require("express")
const app = express()
const port = 5500

var crypto = require("crypto")

app.use(express.static("public"))
app.set('view engine', 'pug')

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("pages/app")
})

const codes = []

function getCode() {
    return crypto.randomBytes(3).toString('hex').toUpperCase()
}

app.get("/new-lobby", (req, res) => {
    var code = getCode()
    while (codes.includes(code)) {
        code = getCode()
    }

    console.log("New lobby hosted! Code: " + code)
    codes.push(code)
    res.send({ code })
})

app.post("/join-lobby", (req, res) => {
    var code = req.body.code
    if (codes.includes(code.toString())) {
        res.json({ success: true })
    } else {
        res.json({ success: false })
    }
})

app.listen(port, () => console.log("Listening on port :" + port))
