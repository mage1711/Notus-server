import express from 'express';
import { createConnection } from 'typeorm'
import config from "./services/config";
import morgan from 'morgan'
import trim from './services/trim'
import {user} from './routes/user' ;
import {post} from  './routes/post';
import cookieParser from 'cookie-parser';
import { subs } from './routes/subs';
import cors from "cors";
import vote from './routes/vote';
const app = express();
var port = (config.PORT || "8000");
app.set("port", port);

app.use(express.json())

app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: true, //config.ORIGIN
    optionsSuccessStatus: 200,
}))

app.get('/', (_, res) => res.send('Hello World'))
app.use('/api/user', user)
app.use('/api/post', post)
app.use('/api/subs',subs)
app.use('/api/vote', vote)
app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`)
  try {
    await createConnection()
    console.log('Database connected!')
  } catch (err) {
    console.log(err)
  }
})