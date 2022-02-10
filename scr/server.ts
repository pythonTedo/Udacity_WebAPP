import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { sequelize } from './sequelize';
import { V0MODELS } from './controllers/models/User';
import { UserRouter } from './controllers/routes/user.router';
import { requireAuth } from './controllers/routes/auth.router';

(async () => {
  await sequelize.addModels(V0MODELS);
  await sequelize.sync();
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.use('/users', UserRouter)
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
  app.get("/filteredimage",
  requireAuth,
  async (req, res) => {
    let { image_url } = req.query;

    if (!image_url || typeof image_url != "string") {
      return res.status(404).send("Image URL is required");
    }
    else {
      console.log(image_url);
      filterImageFromURL(image_url).then((image) => {
        res.status(200).sendFile(image, () => {deleteLocalFiles([image])})
      }
      ).catch((error) => {res.status(422).send("Invalid URL")})
    }
  })
  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();