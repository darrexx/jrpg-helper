import { date, integer, numeric, pgTable, text } from 'drizzle-orm/pg-core';

export const gameTable = pgTable('games', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  releaseDate: date('releaseDate', { mode: 'date' }),
  wikiLink: text('wikiLink').notNull(),
});

export const uniqueMonsterTable = pgTable('uniqueMonsters', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  level: integer('level'),
  map: text('map').notNull(),
  location: text('location'),
  x: numeric('x'),
  y: numeric('y'),
  z: numeric('z'),
  wikiLink: text('wikiLink'),
  spawntime: text('spawnTime'),
  gameId: integer('gameId').references(() => gameTable.id, { onDelete: 'cascade' }),
});

export const sideQuestTable = pgTable('sideQuests', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  gameId: integer('gameId').references(() => gameTable.id, { onDelete: 'cascade' }),
  wikiLink: text('wikiLink'),
  giver: text('giver'),
  level: integer('level'),
  map: text('map').notNull(),
  location: text('location'),
  startX: numeric('startX'),
  startY: numeric('startY'),
  startZ: numeric('startZ'),
  prerequisites: text('prerequisites'),
  category: text('category'),
  steps: text('steps'),
});
