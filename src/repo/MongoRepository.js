import { MongoClient } from 'mongodb';

class MongoRepository {
  constructor(url, dbName, collectionName) {
    this.client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  async initialize() {
    await this.client.connect();
    this.db = await this.client.db(this.dbName);
    this.collection = this.db.collection(this.collectionName);
  }

  static async getInstance(dbUrl, dbName, collectionName) {
    if (!MongoRepository.instance) {
      const repo = new MongoRepository(dbUrl, dbName, collectionName);
      await repo.initialize();
      MongoRepository.instance = repo;
    }
    return MongoRepository.instance;
  }

  async store(message) {
    this.collection.insertOne(message);
  }

  async findByMessageId(messageId) {
    return this.collection.find({ 'context.message_id': messageId }).toArray();
  }
}

export default MongoRepository;
