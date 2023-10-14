import Head from "next/head";
import Link from "next/link";
import { ShowCharacter } from "~/components/showCharacter";
import { ShowMeaning } from "~/components/showMeaning";
import { ShowPinyin } from "~/components/showPinyin";
import { api } from "~/utils/api";

export default function Home() {
  const { data, refetch, isFetching } = api.example.randomWord.useQuery(
    undefined,
    {
      staleTime: 999999,
    },
  );

  return (
    <>
      <Head>
        <title>Mandarin Flash Cards</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16  ">
          <div className="flex w-[48rem] flex-col gap-12 overflow-hidden rounded shadow-lg ">
            <Link
              className=" w-[6rem] px-8 py-4 text-sky-700 hover:bg-sky-700/20"
              href="/"
            >
              <h3 className="text-2xl font-bold">{"<-"}</h3>
            </Link>
            {isFetching || !data ? (
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                  Loading...
                </h1>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
                  {data.noTone}
                </h1>
                <ShowCharacter word={data} />
                <ShowPinyin word={data} />
                <ShowMeaning word={data} />
              </div>
            )}
            <div
              onClick={() => {
                void refetch();
              }}
              className="bg-sky-700 px-8 py-4 hover:opacity-75  "
            >
              <p className=" text-3xl text-white">Next</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
