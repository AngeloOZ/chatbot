const express = require("express");
const app = express();

class Server {
    PORT;
    providerWS;
    providerDB;


    constructor(_port, _providerWS, _providerDB) {
        this.PORT = _port;
        this.providerWS = _providerWS;
        this.providerDB = _providerDB;
    }

    start() {
        const middleware = (req, _, next) => {
            req.providerWS = this.providerWS
            req.providerDB = this.providerDB
            next()
        }

        app.use(express.json());

        app.use("/api/message", middleware, require("./routes/message"));

        app.listen(this.PORT, () => {
            console.log(`http://localhost:${this.PORT}`)
        });
    }
}

module.exports = Server;