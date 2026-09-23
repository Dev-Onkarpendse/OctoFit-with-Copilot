import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

router.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-logic-tier' });
});

router.get('/users', async (_request, response, next) => {
  try {
    response.json(await User.find().sort({ displayName: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

router.post('/users', async (request, response, next) => {
  try {
    response.status(201).json(await User.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/teams', async (_request, response, next) => {
  try {
    response.json(await Team.find().populate('memberIds', 'displayName username').sort({ name: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

router.post('/teams', async (request, response, next) => {
  try {
    response.status(201).json(await Team.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/activities', async (request, response, next) => {
  try {
    const userId = typeof request.query.userId === 'string' ? request.query.userId : undefined;
    const filter = userId ? { userId } : {};
    response.json(await Activity.find(filter).populate('userId', 'displayName username').sort({ completedAt: -1 }).lean());
  } catch (error) {
    next(error);
  }
});

router.post('/activities', async (request, response, next) => {
  try {
    response.status(201).json(await Activity.create(request.body));
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard', async (_request, response, next) => {
  try {
    response.json(await Leaderboard.find().populate('userId', 'displayName username').sort({ points: -1 }).lean());
  } catch (error) {
    next(error);
  }
});

router.get('/workouts', async (request, response, next) => {
  try {
    const difficulty = typeof request.query.difficulty === 'string' ? request.query.difficulty : undefined;
    const filter: Record<string, string> = difficulty ? { difficulty } : {};
    response.json(await Workout.find(filter).sort({ difficulty: 1, title: 1 }).lean());
  } catch (error) {
    next(error);
  }
});

router.use((error: unknown, _request: unknown, response: { status: (code: number) => typeof response; json: (body: unknown) => void }) => {
  console.error(error);
  response.status(500).json({ error: 'The request could not be completed.' });
});

export default router;