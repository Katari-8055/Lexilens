import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing Details" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(201).json({
            success: true,
            token,
            user: {
                name: user.name,
            }
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in registration",
            error: error.message
        });
    }
}


export const loginUser = async (req, res) => {

    
    try {
        const { email, password } = req.body;


        
        const user = await userModel.findOne({ email });
       

        if (!user) {
            return res.json({ message: "User not found" });
        }
         

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            success: true,
            token,
            user: {
                name: user.name,
            }
        });

    } catch (error) {
        
        res.status(500).json({
            success: false,
            message: "Error in Login",
            
        });
    }

}

export const userCredits = async (req, res) => {

    try{
         const userId = req.user;
         
        const user = await userModel.findById(userId)

        res.status(200).json({
            success: true,
            name: user.name,
            credits: user.creditBalance,
            user
        });
    }catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error in fetching user credits",
            error: error.message
        });
    }


}




/// Adding the user credits update logic

export const addCreditsToUser = async (req, res) => {
  try {
    const userId = req.user; // from middleware
    const creditsToAdd = req.body.credits;

    if (!creditsToAdd) {
      return res.json({ success: false, message: "Credits value is required" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.creditBalance += creditsToAdd;
    await user.save();

    res.json({
      success: true,
      message: `${creditsToAdd} credits added successfully`,
      updatedCredits: user.creditBalance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error updating credits",
      error: error.message,
    });
  }
};
