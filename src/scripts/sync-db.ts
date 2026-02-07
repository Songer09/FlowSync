import 'dotenv/config';
import User from '../models/User';
import Workflow from '../models/Workflow';
import Trigger from '../models/Trigger';
import Action from '../models/Action';
import connectDB from '../config/db';

const syncDatabase = async () => {
  await connectDB();
  await User.sync({ alter: false });
  await Workflow.sync({ alter: false });
  await Trigger.sync({ alter: false });
  await Action.sync({ alter: false });
  console.log('Tablas creadas en PostgreSQL');
  process.exit(0);
};

syncDatabase().catch((err) => {
  console.error('Error al sincronizar:', err);
  process.exit(1);
});