const { createReset, applyReset } = require("../services/reset.service");
const { BadRequestError } = require("../errors");

const ResetController = {
    create: async (req, res, next) => {
        try {
            console.log(req.body);
            const reset = await createReset({ student_id: req.body.student_id });
            res.json({
                message: "Reset created successfully",
                payload: {
                    reset,
                },
            });
        } catch (error) {
            next(error);
        }
    },
    apply: async (req, res, next) => {
        try {
            // const resetId = req.params.id;
            const { otp, password ,resetId} = req.body;
            if (!otp || !password) {
                throw new BadRequestError("OTP and password are required");
            }
            const user = await applyReset({
                otp,
                resetId,
                password,
            });
            res.json({
                message: "Password updated successfully",
                payload: {
                    user,
                },
            });
        } catch (error) {
            next(error);
        }
    },
};

module.exports = ResetController;