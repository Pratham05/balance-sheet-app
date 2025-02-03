import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { createGetBalanceSheetHandler } from './src/routes/getBalanceSheetHandler';
import { createApiClients } from './src/apiClients';
import { config } from './config';

const app = new Koa();
const router = new Router();
const PORT = config.PORT || 4000;

const apiClients = createApiClients(config);

router.get('/api/balance-sheet', createGetBalanceSheetHandler(apiClients));

app.use(router.routes()).use(router.allowedMethods());
app.use(cors());
app.use(bodyParser());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
