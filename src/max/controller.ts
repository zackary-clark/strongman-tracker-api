import cors from "cors";
import express, { Request, Response } from "express";
import { logError } from "../utils";
import { CreateMaxInput } from "./schema";
import { maxService } from "./service";

const maxController = express();

maxController.use(express.json());

if (process.env.CLIENT_ORIGIN) maxController.use(cors({origin: process.env.CLIENT_ORIGIN}));

maxController.get("/maxes", async (req: Request, res: Response) => {
    try {
        res.send(await maxService.index());
    } catch (e) {
        res.status(500).send();
    }
});

maxController.post("/max", async (req: Request, res: Response) => {
    try {
        const product = await maxService.create(toMax(req.body));
        res.send(product);
    } catch (e) {
        logError(e);
        res.status(500).send();
    }
});

const toMax = (maxLikeBody: any): CreateMaxInput => ({
    date: maxLikeBody.date,
    squat1RM: maxLikeBody.squat1RM  ? parseInt(maxLikeBody.squat1RM) : undefined,
    bench1RM: maxLikeBody.bench1RM  ? parseInt(maxLikeBody.bench1RM) : undefined,
    deadlift1RM: maxLikeBody.deadlift1RM  ? parseInt(maxLikeBody.deadlift1RM) : undefined,
    press1RM: maxLikeBody.press1RM  ? parseInt(maxLikeBody.press1RM) : undefined
});

export default maxController;
