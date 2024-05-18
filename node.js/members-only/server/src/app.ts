
import express from 'express';
import userRouter from "./routes/user.router"
import messageRouter from "./routes/message.router"
import authRouter from "./routes/auth.router"
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: "*",
}
app.use(cors(corsOptions))

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);
app.use('/api/auth', authRouter);

export default app 