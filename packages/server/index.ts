import express from 'express';
import router from './routes';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use(router);

app.listen(PORT, () => {
   console.log(`server is running on port http://localhost:${PORT}`);
});
