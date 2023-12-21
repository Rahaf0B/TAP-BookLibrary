import express, { Router, Request, Response } from "express";
import bodyParser from "body-parser";
// import services from "./services";
import reqValidation from "../middleware/validateRequest";
import CBook from "../classes/bookClass";
import { IBook } from "../interfaces/objInterfaces";
import { appCache, getCacheValue } from "../appCache";
import CPublisher from "../classes/publisherClass";
const router = Router();

appCache.set("Book", new CBook());
appCache.set("Publisher", new CPublisher());

router.get(
  "/books/:id",
  reqValidation.validateIDParams,
  async (req: Request, res: Response) => {
    try {
      const book = getCacheValue("Book") as CBook;
      const dataInfo = await book?.getEntityByID(Number(req.params.id));
      res.status(200).send(dataInfo);
    } catch (e: any) {
      res.status(500).send();
    }
  }
);

router.get(
  "/publishers/:id",
  reqValidation.validateIDParams,
  async (req: Request, res: Response) => {
    try {
      const publisher = getCacheValue("Publisher") as CPublisher;
      const dataInfo = await publisher?.getEntityByID(Number(req.params.id));
      res.status(200).send(dataInfo);
    } catch (e: any) {
      res.status(500).send();
    }
  }
);

router.get("/books", async (req: Request, res: Response) => {
  try {
    const book = getCacheValue("Book") as CBook;
    const dataInfo = await book?.getEntities();
    res.status(200).send(dataInfo);
  } catch (e: any) {
    res.status(500).send();
  }
});

router.get("/publishers", async (req: Request, res: Response) => {
  try {
    const publisher = getCacheValue("Publisher") as CPublisher;
    const dataInfo = await publisher?.getEntities();
    res.status(200).send(dataInfo);
  } catch (e: any) {
    res.status(500).send();
  }
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post(
  "/books",
  reqValidation.bookPostValidation,
  async (req: Request, res: Response) => {
    try {
      const book = getCacheValue("Book") as CBook;
      const dataInfo = await book?.addEntities(req.body);
      res.status(200).send(dataInfo);
    } catch (e: any) {
      res.status(500).send();
    }
  }
);

router.post(
  "/publishers",
  reqValidation.publisherPostValidation,
  async (req: Request, res: Response) => {
    try {
      const publisher = getCacheValue("Publisher") as CPublisher;
      const dataInfo = await publisher?.addEntities(req.body);
      res.status(200).send(dataInfo);
    } catch (e: any) {
      res.status(500).send();
    }
  }
);
router.patch(
  "/books/:id",
  reqValidation.bookPostUpdateValidation,
  async (req: Request, res: Response) => {
    try {
      const book = getCacheValue("Book") as CBook;
      const dataInfo = await book?.updateEntities(
        req.body,
        "book_id",
        req.params.id
      );
      res.status(200).send(dataInfo.toString());
    } catch (e: any) {
      res.status(500).send();
    }
  }
);

router.patch(
  "/publishers/:id",
  reqValidation.publisherPostUpdateValidation,
  async (req: Request, res: Response) => {
    try {
      const publisher = getCacheValue("Publisher") as CPublisher;
      const dataInfo = await publisher?.updateEntities(
        req.body,
        "publisher_id",
        req.params.id
      );
      res.status(200).send(dataInfo.toString());
    } catch (e: any) {
      res.status(500).send();
    }
  }
);

router.delete(
  "/books/:id",
  reqValidation.validateIDParams,
  async (req: Request, res: Response) => {
    try {
      const book = getCacheValue("Book") as CBook;
      const dataInfo = await book?.deleteEntities(req.params.id);
      res.status(200).send(dataInfo);
    } catch (e: any) {
      res.status(500).send();
    }
  }
);

router.delete(
  "/publishers/:id",
  reqValidation.validateIDParams,
  async (req: Request, res: Response) => {
    try {
      const publisher = getCacheValue("Publisher") as CPublisher;
      const dataInfo = await publisher?.deleteEntities(req.params.id);
      res.status(200).send(dataInfo);
    } catch (e: any) {
      res.status(500).send();
    }
  }
);
export default router;
