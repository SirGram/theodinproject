
import express from 'express';
import userRouter from "./routes/user.router"
import messageRouter from "./routes/message.router"

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);

export default app 