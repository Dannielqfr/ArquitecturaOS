import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import PersonRouter from "./routes/person.routes";
import DocumentRouter from "./routes/document.routes";
import WorkshopRouter from "./routes/workshop.routes";
import PaymentRouter from "./routes/payment.routes";
import InscriptionRouter from "./routes/inscription.routes"

const corsOptions = {
  origin: 'http://localhost:4200', // URL de tu aplicación Angular
  methods: 'GET,POST,PUT,DELETE', // Métodos HTTP permitidos
  optionsSuccessStatus: 200 // Algunos navegadores (Safari) tienen problemas con el estado 204
};

const port = 3000;

const app = express();

app.use(bodyParser.json());
//app.use(cors());
app.use(cors(corsOptions));

// rutes
app.use("/person", PersonRouter);
app.use("/document", DocumentRouter);
app.use("/workshop", WorkshopRouter);
app.use("/payment", PaymentRouter);
app.use("/inscription", InscriptionRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
