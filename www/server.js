"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const util_1 = require("./util/util");
const sequelize_1 = require("./sequelize");
const User_1 = require("./controllers/models/User");
const user_router_1 = require("./controllers/routes/user.router");
const auth_router_1 = require("./controllers/routes/auth.router");
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.sequelize.addModels(User_1.V0MODELS);
    yield sequelize_1.sequelize.sync();
    // Init the Express application
    const app = express_1.default();
    // Set the network port
    const port = process.env.PORT || 8082;
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:8100");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        next();
    });
    // Use the body parser middleware for post requests
    app.use(body_parser_1.default.json());
    app.use('/users', user_router_1.UserRouter);
    // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
    // GET /filteredimage?image_url={{URL}}
    // endpoint to filter an image from a public url.
    // IT SHOULD
    //    1
    //    1. validate the image_url query
    //    2. call filterImageFromURL(image_url) to filter the image
    //    3. send the resulting file in the response
    //    4. deletes any files on the server on finish of the response
    // QUERY PARAMATERS
    //    image_url: URL of a publicly accessible image
    // RETURNS
    //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
    /**************************************************************************** */
    app.get("/filteredimage", auth_router_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { image_url } = req.query;
        if (!image_url || typeof image_url != "string") {
            return res.status(404).send("Image URL is required");
        }
        else {
            console.log(image_url);
            util_1.filterImageFromURL(image_url).then((image) => {
                res.status(200).sendFile(image, () => { util_1.deleteLocalFiles([image]); });
            }).catch((error) => { res.status(422).send("Invalid URL"); });
        }
    }));
    //! END @TODO1
    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send("try GET /filteredimage?image_url={{}}");
    }));
    // Start the Server
    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`);
        console.log(`press CTRL+C to stop server`);
    });
}))();
//# sourceMappingURL=server.js.map