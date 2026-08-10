import { initDataBase } from "./database/seed";
import app from "./app";
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initDataBase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();