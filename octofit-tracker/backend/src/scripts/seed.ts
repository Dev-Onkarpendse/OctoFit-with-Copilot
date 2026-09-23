import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'maya_runner',
        email: 'maya.chen@mergington.edu',
        displayName: 'Maya Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=47',
      },
      {
        username: 'liam_lifts',
        email: 'liam.johnson@mergington.edu',
        displayName: 'Liam Johnson',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        username: 'sofia_cycles',
        email: 'sofia.rivera@mergington.edu',
        displayName: 'Sofia Rivera',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
      {
        username: 'noah_moves',
        email: 'noah.williams@mergington.edu',
        displayName: 'Noah Williams',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      },
    ]);

    await Team.create([
      {
        name: 'Falcon Fitness',
        description: 'Building strength and consistency together.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Trailblazers',
        description: 'Every lap, ride, and walk counts.',
        memberIds: [users[2]._id, users[3]._id],
      },
    ]);

    const activities = await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 35, points: 70, completedAt: new Date('2026-09-20T16:30:00Z'), notes: 'Park loop' },
      { userId: users[0]._id, type: 'strength', durationMinutes: 25, points: 50, completedAt: new Date('2026-09-18T17:00:00Z'), notes: 'Upper body circuit' },
      { userId: users[1]._id, type: 'strength', durationMinutes: 45, points: 90, completedAt: new Date('2026-09-21T15:30:00Z'), notes: 'Full body session' },
      { userId: users[1]._id, type: 'walking', durationMinutes: 30, points: 30, completedAt: new Date('2026-09-19T12:00:00Z') },
      { userId: users[2]._id, type: 'cycling', durationMinutes: 50, points: 100, completedAt: new Date('2026-09-22T16:00:00Z'), notes: 'River trail' },
      { userId: users[2]._id, type: 'running', durationMinutes: 20, points: 40, completedAt: new Date('2026-09-17T16:00:00Z') },
      { userId: users[3]._id, type: 'walking', durationMinutes: 40, points: 40, completedAt: new Date('2026-09-21T16:30:00Z'), notes: 'Neighborhood walk' },
    ]);

    const pointsByUser = new Map<string, number>();
    for (const activity of activities) {
      const userId = activity.userId.toString();
      pointsByUser.set(userId, (pointsByUser.get(userId) ?? 0) + activity.points);
    }

    await Leaderboard.insertMany(
      users
        .map((user) => ({ userId: user._id, points: pointsByUser.get(user._id.toString()) ?? 0 }))
        .sort((left, right) => right.points - left.points)
        .map((entry, index) => ({ ...entry, rank: index + 1 })),
    );

    await Workout.create([
      { title: 'Starter Strength Circuit', description: 'A balanced bodyweight routine for building a strong foundation.', difficulty: 'beginner', durationMinutes: 20, activityType: 'strength' },
      { title: 'Steady State Run', description: 'A conversational-paced run to build endurance and confidence.', difficulty: 'intermediate', durationMinutes: 30, activityType: 'running' },
      { title: 'Power Ride', description: 'A challenging interval ride for experienced cyclists.', difficulty: 'advanced', durationMinutes: 45, activityType: 'cycling' },
      { title: 'Mindful Walk', description: 'A low-impact walk with a focus on a steady, comfortable pace.', difficulty: 'beginner', durationMinutes: 25, activityType: 'walking' },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 7 activities, 4 leaderboard entries, and 4 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
