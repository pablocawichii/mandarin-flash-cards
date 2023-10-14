import { z } from "zod";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type Word = {
  pinyin: string;
  noTone: string;
  character: string;
  meaning: string;
};

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.example.findMany();
  }),
  randomWord: publicProcedure.query(({}) => {

    const headers = ["pinyin", "noTone", "character", "meaning"];

    // const fileContent = fs.readFileSync("", { encoding: "utf-8" });

    // const promise = await new Promise<Word[]>((res, rej) => {
    //   parse(
    //     fileContent,
    //     {
    //       delimiter: ",",
    //       columns: headers,
    //     },
    //     (error, result: Word[]) => {
    //       if (error) {
    //         rej(error);
    //       }
    //       res(result);
    //     },
    //   );
    // });

    

    // return promise[Math.floor(Math.random() * promise.length)];
    return {
      character: ""
    };
  }),
});
