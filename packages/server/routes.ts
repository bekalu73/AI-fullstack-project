import express, { type Request, type Response } from 'express';
import { ChatController } from './controllers/chat.controller';

const Router = express.Router();

// routes
Router.get('/api/hello', (req: Request, res: Response) => {
   res.json('Hello World');
});

Router.post('/api/chat', ChatController.sendMessage);

export default Router;
