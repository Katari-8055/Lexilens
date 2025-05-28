import axios from "axios";
import userModel from "../model/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
    try {
        const userId = req.user; 
        const { prompt } = req.body;

        // 1. Validate presence of prompt and user
        if (!prompt) {
            return res.status(400).json({ message: "Prompt is required" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ message: "User not found" });
        }

        // 2. Check credit balance
        if (user.creditBalance <= 0) {
            return res.json({ message: "Insufficient credits" });
        }
        

        // 3. Prepare API call to ClipDrop
        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'x-api-key': process.env.CLIPDROP_API,
                },
                responseType: 'arraybuffer', // ensure binary response
            }
        );

        // 4. Convert image to base64
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // 5. Deduct 1 credit
        await userModel.findByIdAndUpdate(userId, {
            creditBalance: user.creditBalance - 1
        });

        // 6. Send response
        res.json({
            success: true,
            message: "Image generated successfully",
            resultImage
        });

    } catch (error) {
        console.error("Error generating image:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};
