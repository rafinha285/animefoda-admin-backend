import e from "express"
import bodyParser from "body-parser";

const app = e()

app.use(bodyParser.json())


app.listen(8081)
