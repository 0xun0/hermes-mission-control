import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const HERMES_HOME = process.env.HERMES_HOME || path.join(process.env.HOME || '/home/ox', '.hermes');

// We can't use better-sqlite3 without native dependencies, so we'll use
// a lightweight approach: read the DB via the gateway's API if available,
// or provide a summary from the file system stats.
const HERMES_GATEWAY_URL = process.env.HERMES_GATEWAY_URL || 'http://100.122.147.84:8642';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = parseInt(searchParams.get('offset') || '0');
  const source = searchParams.get('source') || null;
  const search = searchParams.get('q') || null;

  try {
    // Check if state.db exists and get its stats
    const dbPath = path.join(HERMES_HOME, 'state.db');
    let dbExists = false;
    let dbSize = 0;
    
    try {
      const stats = await fs.stat(dbPath);
      dbExists = true;
      dbSize = stats.size;
    } catch {
      // DB doesn't exist
    }

    if (!dbExists) {
      return NextResponse.json({
        sessions: [],
        total: 0,
        dbSize: 0,
        dbExists: false,
        source: 'hermes-native',
        lastSync: new Date().toISOString(),
      });
    }

    // Try to get sessions via the Hermes gateway API (if it exposes session data)
    // For now, we return metadata about the DB and available sources
    // The actual session listing will use the SQLite bridge when we add it
    
    // Read the WAL file size too for accuracy
    let walSize = 0;
    try {
      const walStats = await fs.stat(dbPath + '-wal');
      walSize = walStats.size;
    } catch {
      // No WAL file
    }

    return NextResponse.json({
      sessions: [],
      total: 0,
      dbSize,
      walSize,
      dbExists: true,
      dbPath,
      note: 'Session listing requires SQLite bridge — use the Hermes CLI for full session search. Gateway integration coming soon.',
      availableViaCli: [
        'hermes sessions list',
        'hermes sessions search <query>',
        'hermes sessions show <id>',
      ],
      source: 'hermes-native',
      lastSync: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Hermes Sessions Error:', error);
    return NextResponse.json({ error: 'Failed to read Hermes sessions' }, { status: 500 });
  }
}
