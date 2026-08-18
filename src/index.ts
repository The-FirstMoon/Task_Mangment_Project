import { initDataBase } from "./database/seed";
import app from "./app";
import { createDatabase } from "./database/createDatabase";
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await createDatabase();
    await initDataBase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();