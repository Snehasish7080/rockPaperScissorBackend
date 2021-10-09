import { IUser } from '../interfaces/User';
import User from '../models/User';
import { Request, Response, NextFunction } from 'express';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName } = req.body;

        const isUserExist = await User.findOne({
            userName
        });

        if (!userName) {
            return res.status(200).json({
                success: false,
                message: 'UserName Required'
            });
        }

        if (isUserExist) {
            return res.status(200).json({
                success: true,
                message: 'User Already exists.',
                data: isUserExist
            });
        }

        const user = await User.create({
            userName
        });

        if (user) {
            res.status(200).json({
                success: true,
                message: 'User Created Successfully',
                data: user
            });
        } else {
            res.status(200).json({
                success: false,
                message: 'Something went Wrong'
            });
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName } = req.body;

        if (!userName) {
            return res.status(200).json({
                success: false,
                message: 'UserName Required'
            });
        }

        const user = await User.findOne({
            userName
        });

        if (!user) {
            return res.status(200).json({
                success: false,
                message: 'User Not Found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'user found successfully',
            data: user
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const updateScore = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, score } = req.body;

        if (!userName) {
            return res.status(200).json({
                success: false,
                message: 'UserName Required'
            });
        }

        if (score === undefined) {
            return res.status(200).json({
                success: false,
                message: 'score Required'
            });
        }

        const user = await User.findOne({
            userName
        });

        if (!user) {
            return res.status(200).json({
                success: false,
                message: 'user not found'
            });
        } else {
            user.score = score;
            user.save()
                .then((savedUser) => {
                    res.status(200).json({
                        success: true,
                        message: 'Score updated successfully'
                    });
                })
                .catch((error) => {
                    res.status(400).json({
                        success: false,
                        message: error.message
                    });
                });
        }
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const getTopUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName } = req.body;

        const user = await User.find({}).sort({ score: -1 }).limit(10);

        res.status(200).json({
            success: true,
            message: 'user found successfully',
            data: user
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
