import Router from 'koa-router';
import Logger from 'loglevel';

import mongodb from '../../services/MongoDB';

const router = Router({ prefix: '/user-preferences' });

/* TODO @(hasiddiq): added for testing */
router.get('/', async (ctx) => {
  try {
    const collection = await mongodb.db.collection('users');
    const userPreferences = { username: ctx.query.username, name: 'Hasan Siddique', email: 'hasiddiq@cisco.com' };
    collection.insertOne(userPreferences);
    ctx.body = {
      user_preferences: userPreferences,
    };
  } catch (error) {
    // handleMongoError(error);
    Logger.error(`DB query failed. ${error}`);
    ctx.status = 500;
    ctx.body = {
      errorMessage: `DB query failed. ${error}`,
    };
  }
});

export default router;
