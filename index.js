const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const Role = require("./models/Role"); // Один раз импортируем модуль Role
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://npmmew20:1@cluster0.expyl5w.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`
    );

    // Создание ролей после успешного подключения к базе данных
    await createRoles();

    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

async function createRoles() {
  try {
    const adminRole = await Role.create({ value: "ADMIN" });
    console.log("Admin role created successfully:", adminRole);

    const userRole = await Role.create({ value: "USER" });
    console.log("User role created successfully:", userRole);
  } catch (error) {
    console.error("Error creating roles:", error);
  }
}

app.get("/api", (req, res) => {
  res.json({
    message: "Hello",
  });
});

start();
