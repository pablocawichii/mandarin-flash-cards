import { z } from "zod";
import { parse } from "csv-parse";
import axios from "axios";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Word } from "~/server/types";

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
  randomWord: publicProcedure.query(async ({}) => {
    const response = await axios.get(
      "https://mandarin.pablocawichii.com/pinyin.csv",
      { responseType: "blob" },
    );

    const headers = ["pinyin", "noTone", "character", "meaning"];

    // const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    const promise = await new Promise<Word[]>((res, rej) => {
      parse(
        response.data as string,
        {
          delimiter: ",",
          columns: headers,
          from_line: 2,
        },
        (error, result: Word[]) => {
          if (error) {
            rej(error);
          }
          res(result);
        },
      );
    });

    return promise[Math.floor(Math.random() * promise.length)];
  }),
});
