const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const EmployeeModel = require("./model/childdetail");
const PersonalDetails = require("./routes/personalDetails");
const path = require("path");
const feedbackRoutes = require("./routes/feedbackRoutes");
const vitaminRoutes = require("./routes/vitamins");
const Symptom = require("./model/symptom");
const symptomsRoutes = require("./routes/symptoms");
const DietPlan = require("./model/DietPlan");
const cookieParser = require("cookie-parser");
const vitaminSideEffects = require("./routes/vitaminSideEffects");
const vitamins = require("./routes/vitaminInfo");
const { generateToken, verifyToken } = require("./utils/jwthelper");
const app = express();
const Admin = require("./model/admin");
const fs = require("fs");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/employee")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Login endpoint
// app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     EmployeeModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 if (user.password === password) {
//                     res.json("Success");
//                 } else {
//                     res.status(401).json("The password is incorrect"); // 401 Unauthorized
//                 }
//             } else {
//                 res.status(404).json("No record existed"); // 404 Not Found
//             }
//         })
//         .catch(err => res.status(500).json({ error: err.message })); // Handle errors
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await EmployeeModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "No record existed" });
    }

    // Direct password comparison
    if (user.password !== password) {
      return res.status(401).json({ error: "The password is incorrect" });
    }

    const token = generateToken(user._id, user.email);

    const userData = {
      _id: user._id,
      email: user.email,
      // Add other user fields as needed
    };
    console.log(token);

    res.json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/alogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user._id, user.email);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/aregister", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  try {
    // Check if the user already exists
    let user = await Admin.findOne({ email });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new Admin({
      name,
      email,
      password,
    });
    console.log(user);

    // Save the user to the database
    await user
      .save()
      .then((savedUser) => {
        console.log("User saved:", savedUser);
        res.status(201).json({ message: "User registered successfully" });
      })
      .catch((saveError) => {
        console.error("Error saving user:", saveError);
        res.status(500).json({ message: "Server error during save" });
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get User Profile Route
app.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = verifyToken(token);
    const user = await Admin.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});
app.get("/userprofile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = verifyToken(token);
    const user = await EmployeeModel.findById(decoded.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Register endpoint
app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then((employees) => res.status(201).json(employees)) // 201 Created
    .catch((err) => res.status(400).json({ error: err.message })); // 400 Bad Request
});

// PersonalDetails route
app.use("/api/personal-details", PersonalDetails);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/symptoms", symptomsRoutes);

app.use("/api/vitamin-side-effects", vitaminSideEffects);

app.use("/api/vitamins", vitamins);

// Global error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.post("/send-email", (req, res) => {
  const { email, vitamin } = req.body;

  // Validate input
  if (!email || !vitamin) {
    return res.status(400).json({ message: "Email and vitamin are required." });
  }

  // Create a mapping for vitamin-specific PDFs
  const vitaminPDFs = {
    "Vitamin A": "VitaminA.pdf",
    "Vitamin B1": "VitaminB1.pdf",
    "Vitamin B2": "VitaminB2.pdf",
    "Vitamin B3": "VitaminB3.pdf",
    "Vitamin B12": "VitaminB12.pdf",
    "Vitamin C": "VitaminC.pdf",
    "Vitamin D": "VitaminD.pdf",
    "Vitamin E": "VitaminE.pdf",
    "Vitamin K": "VitaminK.pdf",
  };

  // Get the corresponding PDF for the selected vitamin
  const vitaminPDF = vitaminPDFs[vitamin];
  if (!vitaminPDF) {
    return res.status(400).json({ message: "Invalid vitamin selected." });
  }

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Email service
    auth: {
      user: "jishnum2017123@gmail.com", // Use env variable
      pass: "bxfyujamjxlqnwbe", // Use env variable
    },
  });

  // Read the HTML content from the external file
  const emailContent = fs.readFileSync(
    path.join(__dirname, "dietPlanEmail.html"),
    "utf-8"
  );

  // Prepare the email options
  const mailOptions = {
    from: "jishnum2017123@gmail.com",
    to: email,
    subject: `Your Personalized Diet Plan for ${vitamin} from VitaGuide`,
    html: emailContent, // Use the content from the external HTML file
    attachments: [
      {
        filename: "VitaInfo.pdf", // General PDF
        path: path.join(__dirname, "VitaInfo.pdf"), // Path to VitaInfo PDF
        contentType: "application/pdf", // Specify the content type
      },
      {
        filename: vitaminPDF, // Vitamin-specific PDF
        path: path.join(__dirname, "vitamin-pdfs", vitaminPDF), // Path to the selected vitamin PDF
        contentType: "application/pdf", // Specify the content type
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ message: "Error sending email", error: error.message });
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).json({ message: "Email sent successfully!" });
    }
  });
});

app.get("/api/symptoms", async (req, res) => {
  try {
    const symptoms = await Symptom.find({});
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST endpoint to handle symptom submissions
app.post("/api/symptoms", async (req, res) => {
  try {
    const symptomData = new Symptom(req.body);
    await symptomData.save();

    // Predict deficiencies based on symptoms
    const deficiencyPrediction = predictDeficiency(req.body.signsSymptoms);

    res.status(201).json({
      message: "Data saved successfully",
      deficiencies: deficiencyPrediction,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to save data", details: error.message });
  }
});

// Function to predict deficiency based on symptoms
const predictDeficiency = (symptoms) => {
  const deficiencies = [];

  if (
    symptoms.fatigue ||
    symptoms.paleSkin ||
    symptoms.paleConjunctiva ||
    symptoms.frequentBruising ||
    symptoms.restlessLegsSyndrome
  ) {
    deficiencies.push("Iron Deficiency");
  }

  if (
    symptoms.drySkin ||
    symptoms.hairLoss ||
    symptoms.brittleNails ||
    symptoms.frequentHeadaches ||
    symptoms.jointPain
  ) {
    deficiencies.push("Vitamin D Deficiency");
  }

  if (
    symptoms.moodChanges ||
    symptoms.poorAppetite ||
    symptoms.frequentColds ||
    symptoms.swollenGums
  ) {
    deficiencies.push("Vitamin B12 Deficiency");
  }

  if (
    symptoms.slowGrowth ||
    symptoms.noWeightGain ||
    symptoms.delayedWalking ||
    symptoms.sensitivityToLight
  ) {
    deficiencies.push("Vitamin A Deficiency");
  }

  if (symptoms.diarrhea || symptoms.constipation || symptoms.skinRashes) {
    deficiencies.push("Fiber Deficiency");
  }

  if (symptoms.lowAttentionSpan || symptoms.squinting || symptoms.jointPain) {
    deficiencies.push("Omega-3 Fatty Acids Deficiency");
  }

  if (symptoms.muscleCramps || symptoms.insomnia) {
    deficiencies.push("Magnesium Deficiency");
  }

  return deficiencies.length
    ? deficiencies
    : ["No specific deficiency detected"];
};

const generateDietPlan = (vitaminDeficiency) => {
  // Example diet plan for 10 days
  const plans = {
    "Vitamin A": [
      {
        day: "Day 1",
        meals: {
          morning: "Carrot paratha with yogurt",
          afternoon: "Spinach and carrot curry",
          night: "Grilled chicken with steamed vegetables",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Sweet potato and spinach porridge",
          afternoon: "Tomato and avocado salad",
          night: "Baked salmon with sautéed spinach",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Mango smoothie with chia seeds",
          afternoon: "Spinach and pumpkin soup",
          night: "Grilled chicken with mashed sweet potatoes",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Scrambled eggs with spinach",
          afternoon: "Mixed green salad with carrots and cucumbers",
          night: "Vegetable curry with rice",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Carrot and avocado smoothie",
          afternoon: "Palak paneer with roti",
          night: "Baked fish with roasted carrots",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Oatmeal with carrots and almonds",
          afternoon: "Chickpea and pumpkin stew",
          night: "Grilled chicken with spinach and sweet potatoes",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Pumpkin and avocado smoothie",
          afternoon: "Lentil soup with spinach",
          night: "Grilled salmon with roasted vegetables",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Carrot and beetroot juice",
          afternoon: "Vegetable curry with roti",
          night: "Baked chicken with sweet potato fries",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Mango chia seed pudding",
          afternoon: "Spinach and sweet potato salad",
          night: "Grilled chicken with pumpkin curry",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Avocado toast with poached eggs",
          afternoon: "Chickpea salad with carrots",
          night: "Baked trout with sautéed spinach",
        },
      },
    ],
    "Vitamin B1 (Thiamine)": [
      {
        day: "Day 1",
        meals: {
          morning: "Oats porridge with nuts and seeds",
          afternoon: "Lentil dal with rice",
          night: "Grilled chicken with quinoa",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Flaxseed smoothie with banana",
          afternoon: "Chickpea and spinach salad",
          night: "Baked salmon with vegetables",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Whole grain toast with almond butter",
          afternoon: "Pumpkin seeds and kale chips",
          night: "Grilled turkey with roasted sweet potatoes",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Spinach and avocado smoothie",
          afternoon: "Almonds and sunflower seeds",
          night: "Grilled chicken with asparagus",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Oatmeal with flaxseeds",
          afternoon: "Sweet potato and kale salad",
          night: "Grilled fish with roasted vegetables",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Smoothie with spinach, kiwi, and nuts",
          afternoon: "Hummus with carrot sticks",
          night: "Grilled shrimp with quinoa",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Whole grain pancakes with peanut butter",
          afternoon: "Lentil and avocado salad",
          night: "Salmon with roasted sweet potatoes",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Almonds and banana smoothie",
          afternoon: "Spinach and avocado salad",
          night: "Grilled chicken with mixed greens",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Oatmeal with sunflower seeds",
          afternoon: "Tomato and avocado toast",
          night: "Grilled beef with steamed vegetables",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Smoothie with almond butter and berries",
          afternoon: "Kale salad with pumpkin seeds",
          night: "Baked cod with roasted vegetables",
        },
      },
    ],
    "Vitamin B2 (Riboflavin)": [
      {
        day: "Day 1",
        meals: {
          morning: "Almond milk smoothie with banana",
          afternoon: "Dal with rice",
          night: "Grilled chicken with sautéed spinach",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Whole wheat toast with avocado",
          afternoon: "Chickpea salad with lemon",
          night: "Fish curry with roti",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Oats porridge with flaxseeds",
          afternoon: "Lentil soup with spinach",
          night: "Grilled turkey with quinoa",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Scrambled eggs with bell peppers",
          afternoon: "Chana masala with rice",
          night: "Grilled chicken with roasted vegetables",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Mango smoothie with chia seeds",
          afternoon: "Palak dal with chapati",
          night: "Baked fish with quinoa",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Yogurt with almonds and berries",
          afternoon: "Spinach and lentil stew",
          night: "Chicken curry with rice",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Chia pudding with banana",
          afternoon: "Vegetable stir-fry with tofu",
          night: "Grilled shrimp with quinoa",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Papaya smoothie with almond milk",
          afternoon: "Dal fry with roti",
          night: "Baked salmon with roasted veggies",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Coconut water smoothie with fruit",
          afternoon: "Chickpea and spinach curry",
          night: "Grilled chicken with rice",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Eggs with sautéed spinach",
          afternoon: "Cauliflower and lentil curry",
          night: "Grilled fish with sweet potatoes",
        },
      },
    ],
    "Vitamin B3 (Niacin)": [
      {
        day: "Day 1",
        meals: {
          morning: "Oats porridge with flaxseeds",
          afternoon: "Dal with brown rice",
          night: "Grilled chicken with quinoa",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Spinach and mushroom smoothie",
          afternoon: "Lentil dal with roti",
          night: "Grilled fish with roasted vegetables",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Whole grain bread with peanut butter",
          afternoon: "Chana masala with rice",
          night: "Grilled turkey with quinoa salad",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Mango and spinach smoothie",
          afternoon: "Tofu stir-fry with mixed vegetables",
          night: "Baked salmon with roasted vegetables",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Almond milk smoothie with oats",
          afternoon: "Lentil soup with vegetables",
          night: "Grilled chicken with sweet potatoes",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Yogurt with chia seeds and fruits",
          afternoon: "Palak dal with rice",
          night: "Grilled shrimp with quinoa",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Papaya and chia seed smoothie",
          afternoon: "Vegetable curry with rice",
          night: "Grilled fish with roasted broccoli",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Whole wheat toast with scrambled eggs",
          afternoon: "Tomato and cucumber salad",
          night: "Grilled turkey with quinoa",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Mango chia seed pudding",
          afternoon: "Lentil curry with chapati",
          night: "Baked cod with vegetables",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Banana smoothie with spinach",
          afternoon: "Chickpea salad",
          night: "Grilled shrimp with roasted sweet potatoes",
        },
      },
    ],
    "Vitamin B12": [
      {
        day: "Day 1",
        meals: {
          morning: "Oats porridge with milk",
          afternoon: "Chicken curry with rice",
          night: "Grilled fish with spinach",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Eggs with spinach",
          afternoon: "Lentil soup with rice",
          night: "Grilled chicken with vegetables",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Greek yogurt with berries",
          afternoon: "Paneer butter masala with roti",
          night: "Grilled salmon with quinoa",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Scrambled eggs with spinach",
          afternoon: "Chickpea curry with rice",
          night: "Grilled chicken with broccoli",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Milk with almonds",
          afternoon: "Lentil dal with rice",
          night: "Baked fish with roasted veggies",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Greek yogurt with chia seeds",
          afternoon: "Spinach and chickpea curry",
          night: "Grilled turkey with sweet potatoes",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Eggs with avocado",
          afternoon: "Tomato and cucumber salad",
          night: "Grilled chicken with steamed veggies",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Oatmeal with milk",
          afternoon: "Lentil and vegetable stew",
          night: "Grilled fish with roasted vegetables",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Almond butter on whole grain toast",
          afternoon: "Paneer and vegetable curry with rice",
          night: "Baked salmon with quinoa",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Scrambled eggs with avocado",
          afternoon: "Dal with rice",
          night: "Grilled chicken with roasted broccoli",
        },
      },
    ],
    "Vitamin C": [
      {
        day: "Day 1",
        meals: {
          morning: "Orange and mango smoothie",
          afternoon: "Spinach and bell pepper salad",
          night: "Tomato curry with rice",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Amla juice with honey",
          afternoon: "Cucumber and tomato salad",
          night: "Lemon and coriander chicken",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Papaya smoothie with lemon",
          afternoon: "Chana salad with lemon dressing",
          night: "Karela (bitter gourd) curry with roti",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Guava and orange fruit bowl",
          afternoon: "Mixed bell pepper and carrot stir fry",
          night: "Methi (fenugreek) leaves curry with rice",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Lemon and ginger tea",
          afternoon: "Spinach and tomato soup",
          night: "Lemon fish curry with roti",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Kiwi and apple smoothie",
          afternoon: "Broccoli and bell pepper stir fry",
          night: "Chicken tikka with lemon sauce",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Orange slices with a sprinkle of chili powder",
          afternoon: "Cabbage and carrot salad",
          night: "Dal with lemon zest and rice",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Pineapple and lemon juice",
          afternoon: "Tomato and cucumber salad with lemon dressing",
          night: "Grilled chicken with lemon marinade",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Amla juice with ginger",
          afternoon: "Bell pepper and spinach stir-fry",
          night: "Lemon coriander soup with steamed vegetables",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Mixed citrus fruit salad",
          afternoon: "Sprouted moong dal salad with lemon",
          night: "Grilled fish with a side of broccoli",
        },
      },
    ],
    "Vitamin D": [
      {
        day: "Day 1",
        meals: {
          morning: "Scrambled eggs with mushrooms",
          afternoon: "Palak (spinach) and paneer curry",
          night: "Grilled fish with lemon",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Oats porridge with fortified milk",
          afternoon: "Chana masala with brown rice",
          night: "Baked salmon with steamed vegetables",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Greek yogurt with chia seeds and honey",
          afternoon: "Lentil soup with spinach",
          night: "Grilled chicken with roasted vegetables",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Egg and spinach smoothie",
          afternoon: "Cabbage and carrot stir fry",
          night: "Paneer butter masala with rice",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Fortified milk with almond butter",
          afternoon: "Vegetable curry with rice",
          night: "Tandoori chicken with sautéed greens",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Poached eggs with avocado",
          afternoon: "Methi (fenugreek) leaves and chickpea curry",
          night: "Grilled fish with sautéed spinach",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Chia seed pudding with fortified almond milk",
          afternoon: "Cauliflower and potato curry",
          night: "Grilled chicken with roasted mushrooms",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Mushroom omelet with spinach",
          afternoon: "Dal tadka with brown rice",
          night: "Baked trout with broccoli",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Fortified yogurt with berries",
          afternoon: "Tomato and spinach curry",
          night: "Baked fish with vegetables",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Oats porridge with fortified milk",
          afternoon: "Mixed vegetable soup",
          night: "Grilled salmon with sautéed kale",
        },
      },
    ],
    "Vitamin E": [
      {
        day: "Day 1",
        meals: {
          morning: "Almonds and flaxseed paratha",
          afternoon: "Palak (Spinach) and walnut curry with roti",
          night: "Grilled salmon with sautéed beans",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Poha with almonds and flaxseeds",
          afternoon: "Methi (Fenugreek) and pumpkin curry",
          night: "Grilled chicken with mixed vegetable stir-fry",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Aloo (Potato) and spinach paratha with curd",
          afternoon: "Sweet potato chaat with peanuts",
          night: "Rava upma with mixed nuts",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Oats porridge with chia seeds",
          afternoon: "Chana (Chickpeas) salad with avocado",
          night: "Paneer tikka with sautéed broccoli",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Mango and avocado smoothie",
          afternoon: "Kale and quinoa khichdi",
          night: "Grilled trout with sautéed spinach",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Vegetable poha with nuts",
          afternoon: "Rajma (Kidney beans) curry with brown rice",
          night: "Grilled chicken with roasted vegetables",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Almond and banana smoothie",
          afternoon: "Baked sweet potato with spinach",
          night: "Palak paneer with multigrain roti",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Chia pudding with fruits",
          afternoon: "Baingan (Eggplant) and peanut curry with roti",
          night: "Grilled fish with mixed vegetable salad",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Almond and dates smoothie",
          afternoon: "Mixed sprouts salad with cucumber and tomatoes",
          night: "Baked chicken with spinach and sweet potatoes",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Aloo and flaxseed paratha",
          afternoon: "Kale and avocado salad with chickpeas",
          night: "Grilled shrimp with sautéed carrots",
        },
      },
    ],
    "Vitamin K": [
      {
        day: "Day 1",
        meals: {
          morning: "Methi (Fenugreek) paratha with curd",
          afternoon: "Kale and chickpea curry",
          night: "Grilled chicken with steamed broccoli",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Spinach and ginger smoothie",
          afternoon: "Lentil and kale soup",
          night: "Grilled fish with steamed spinach",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Scrambled eggs with spinach and tomatoes",
          afternoon: "Methi (Fenugreek) leaves with roti",
          night: "Palak (spinach) and dal fry with rice",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Chia pudding with spinach and fruits",
          afternoon: "Broccoli and lentil soup",
          night: "Baked chicken with kale salad",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Spinach and avocado smoothie",
          afternoon: "Cabbage and chickpea curry",
          night: "Grilled shrimp with kale and quinoa",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Omelette with spinach",
          afternoon: "Kale and cabbage salad with peanuts",
          night: "Roast chicken with steamed vegetables",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Smoothie with kale and apple",
          afternoon: "Spinach and dal curry with roti",
          night: "Grilled mackerel with roasted broccoli",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Scrambled tofu with spinach",
          afternoon: "Kale and carrot salad with lemon",
          night: "Chicken stir-fry with broccoli",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Whole grain toast with spinach and avocado",
          afternoon: "Spinach and chickpea curry",
          night: "Grilled salmon with mixed greens",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Omelette with spinach and mushroom",
          afternoon: "Kale salad with chickpeas",
          night: "Palak paneer with roti",
        },
      },
    ],
    Iron: [
      {
        day: "Day 1",
        meals: {
          morning: "Oats with raisins and almonds",
          afternoon: "Chana (Chickpeas) and spinach curry",
          night: "Grilled chicken with quinoa",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Spinach and flaxseed smoothie",
          afternoon: "Lentil curry with brown rice",
          night: "Grilled fish with vegetable stir-fry",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Scrambled eggs with spinach",
          afternoon: "Mixed sprouts salad with lime",
          night: "Mutton curry with steamed vegetables",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Rava upma with peas and peanuts",
          afternoon: "Rajma (Kidney beans) curry with roti",
          night: "Grilled chicken with quinoa",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Whole grain toast with spinach and avocado",
          afternoon: "Lentil and cucumber salad",
          night: "Grilled fish with broccoli",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Chia pudding with berries",
          afternoon: "Chickpea and spinach curry with roti",
          night: "Grilled mackerel with sweet potatoes",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Oatmeal with flaxseeds",
          afternoon: "Kale and chickpea curry with rice",
          night: "Grilled shrimp with vegetable salad",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Spinach and almond smoothie",
          afternoon: "Lentil soup with carrots",
          night: "Roast chicken with broccoli",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Vegetable poha with peanuts",
          afternoon: "Spinach and lentil curry",
          night: "Grilled fish with quinoa",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Aloo and spinach paratha",
          afternoon: "Chana (Chickpeas) salad",
          night: "Grilled chicken with mixed vegetables",
        },
      },
    ],
    Fiber: [
      {
        day: "Day 1",
        meals: {
          morning: "Oatmeal with chia seeds and banana",
          afternoon: "Kale and cucumber salad with peanuts",
          night: "Grilled chicken with roasted vegetables",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Whole grain toast with avocado",
          afternoon: "Spinach and lentil curry",
          night: "Grilled fish with quinoa",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Smoothie with flaxseeds and berries",
          afternoon: "Chickpea salad with tomatoes and cucumber",
          night: "Grilled mackerel with sweet potatoes",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Methi (Fenugreek) paratha with curd",
          afternoon: "Rajma (Kidney beans) salad",
          night: "Grilled chicken with vegetables",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Almond and apple smoothie",
          afternoon: "Lentil and carrot salad",
          night: "Grilled shrimp with roasted broccoli",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Chia and flaxseed pudding",
          afternoon: "Pumpkin and spinach curry",
          night: "Grilled fish with sweet potatoes",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Oatmeal with flaxseeds",
          afternoon: "Chickpea and cucumber salad",
          night: "Grilled turkey with quinoa",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Smoothie with spinach and flaxseeds",
          afternoon: "Kale and tomato salad",
          night: "Roast chicken with roasted sweet potatoes",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Rava upma with peas",
          afternoon: "Lentil and spinach curry",
          night: "Grilled salmon with roasted vegetables",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Vegetable poha with peanuts",
          afternoon: "Spinach and lentil salad",
          night: "Grilled shrimp with quinoa",
        },
      },
    ],
    "Omega-3 Fatty Acids": [
      {
        day: "Day 1",
        meals: {
          morning: "Flaxseed smoothie with spinach",
          afternoon: "Avocado and walnut salad",
          night: "Grilled salmon with broccoli",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Oatmeal with walnuts",
          afternoon: "Chia seeds pudding with berries",
          night: "Grilled mackerel with sweet potatoes",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Smoothie with chia seeds and avocado",
          afternoon: "Spinach and walnut salad",
          night: "Grilled tuna with vegetables",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Flaxseed smoothie with banana",
          afternoon: "Avocado and chia pudding",
          night: "Baked salmon with vegetables",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Oatmeal with walnuts and flaxseeds",
          afternoon: "Avocado and chia salad",
          night: "Grilled trout with mixed greens",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Smoothie with chia seeds and flaxseeds",
          afternoon: "Walnut and berry salad",
          night: "Grilled shrimp with quinoa",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Smoothie with walnuts and flaxseeds",
          afternoon: "Avocado and salmon salad",
          night: "Grilled tuna with vegetables",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Flaxseed smoothie with banana",
          afternoon: "Chia pudding with berries",
          night: "Grilled sardines with quinoa",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Walnut oatmeal with chia seeds",
          afternoon: "Spinach and walnut salad",
          night: "Grilled mackerel with sweet potatoes",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Smoothie with flaxseeds and spinach",
          afternoon: "Hummus with carrot sticks",
          night: "Grilled shrimp with roasted vegetables",
        },
      },
    ],
    Magnesium: [
      {
        day: "Day 1",
        meals: {
          morning: "Oatmeal with almonds",
          afternoon: "Spinach and avocado salad",
          night: "Grilled chicken with quinoa",
        },
      },
      {
        day: "Day 2",
        meals: {
          morning: "Chia pudding with bananas",
          afternoon: "Avocado and cucumber salad",
          night: "Baked salmon with vegetables",
        },
      },
      {
        day: "Day 3",
        meals: {
          morning: "Whole grain toast with almond butter",
          afternoon: "Pumpkin seeds and kale chips",
          night: "Grilled turkey with roasted sweet potatoes",
        },
      },
      {
        day: "Day 4",
        meals: {
          morning: "Spinach and avocado smoothie",
          afternoon: "Almonds and sunflower seeds",
          night: "Grilled chicken with asparagus",
        },
      },
      {
        day: "Day 5",
        meals: {
          morning: "Oatmeal with flaxseeds",
          afternoon: "Sweet potato and kale salad",
          night: "Grilled fish with roasted vegetables",
        },
      },
      {
        day: "Day 6",
        meals: {
          morning: "Smoothie with spinach, kiwi, and nuts",
          afternoon: "Hummus with carrot sticks",
          night: "Grilled shrimp with quinoa",
        },
      },
      {
        day: "Day 7",
        meals: {
          morning: "Whole grain pancakes with peanut butter",
          afternoon: "Lentil and avocado salad",
          night: "Salmon with roasted sweet potatoes",
        },
      },
      {
        day: "Day 8",
        meals: {
          morning: "Almonds and banana smoothie",
          afternoon: "Spinach and avocado salad",
          night: "Grilled chicken with mixed greens",
        },
      },
      {
        day: "Day 9",
        meals: {
          morning: "Oatmeal with sunflower seeds",
          afternoon: "Tomato and avocado toast",
          night: "Grilled beef with steamed vegetables",
        },
      },
      {
        day: "Day 10",
        meals: {
          morning: "Smoothie with almond butter and berries",
          afternoon: "Kale salad with pumpkin seeds",
          night: "Baked cod with roasted vegetables",
        },
      },
    ],
    // Additional deficiencies can be added in a similar format
  };

  return plans[vitaminDeficiency] || [];
};
app.post("/api/diet-plan", async (req, res) => {
  try {
    const dietData = new DietPlan(req.body);
    await dietData.save();

    const generatedPlan = generateDietPlan(req.body.vitaminDeficiency);

    res.status(201).json({
      message: "Diet data saved successfully",
      dietPlan: generatedPlan,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to save data", details: error.message });
  }
});

app.use("/api/vitamins", vitaminRoutes);

// Start server
const PORT = 3001; // Port can be changed as needed
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
