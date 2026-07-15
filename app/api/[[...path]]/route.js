import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'portfolio';

let cachedClient = null;
async function getDb() {
  if (cachedClient) return cachedClient.db(dbName);
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client.db(dbName);
}

function json(data, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET(request, { params }) {
  const { path = [] } = await params;
  const route = '/' + (path?.join('/') || '');

  if (route === '/' || route === '/health') {
    return json({ ok: true, service: 'portfolio-api', ts: Date.now() });
  }

  if (route === '/messages') {
    try {
      const db = await getDb();
      const messages = await db.collection('contact_messages').find({}, { projection: { _id: 0 } }).sort({ createdAt: -1 }).limit(50).toArray();
      return json({ messages });
    } catch (e) {
      return json({ messages: [], error: e.message }, 200);
    }
  }

  return json({ error: 'Not found', route }, 404);
}

export async function POST(request, { params }) {
  const { path = [] } = await params;
  const route = '/' + (path?.join('/') || '');

  if (route === '/contact') {
    try {
      const body = await request.json();
      const { name, email, subject, message } = body || {};
      if (!name || !email || !message) {
        return json({ error: 'name, email and message are required' }, 400);
      }
      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        subject: String(subject || '').slice(0, 300),
        message: String(message).slice(0, 4000),
        createdAt: new Date().toISOString(),
      };
      try {
        const db = await getDb();
        await db.collection('contact_messages').insertOne(doc);
      } catch (dbErr) {
        // still return success — the message is captured in the response for demo purposes
        return json({ ok: true, saved: false, id: doc.id, warning: 'DB unavailable' });
      }
      return json({ ok: true, saved: true, id: doc.id });
    } catch (e) {
      return json({ error: e.message }, 500);
    }
  }

  return json({ error: 'Not found', route }, 404);
}
