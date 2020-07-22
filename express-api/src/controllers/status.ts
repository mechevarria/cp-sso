import { Request, Response } from 'express';

export const get = (req: Request, res: Response) => {
    const name = req.query.name || 'Guest';

    res.json({
        message: `Greetings ${name} from the nodes.js Express server`,
        time: new Date()
    });
};