PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  username_norm TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  pin_salt TEXT NOT NULL,
  pin_hash TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS scores (
  id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  shop TEXT NOT NULL,
  takings INTEGER NOT NULL CHECK(takings >= 0),
  served INTEGER NOT NULL CHECK(served >= 0),
  missed INTEGER NOT NULL CHECK(missed BETWEEN 0 AND 3),
  shift_no INTEGER NOT NULL CHECK(shift_no >= 1),
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS progress (
  player_id TEXT PRIMARY KEY REFERENCES players(id) ON DELETE CASCADE,
  state TEXT NOT NULL,
  revision INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_scores_rank ON scores(takings DESC, served DESC, created_at ASC);
CREATE INDEX IF NOT EXISTS idx_scores_player ON scores(player_id, takings DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_player ON sessions(player_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);
