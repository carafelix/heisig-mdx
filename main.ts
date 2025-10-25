import { csvParse } from "npm:d3";

const csv = Deno.readTextFileSync("./KANJI_RTK_INDEX.csv");

const arr = csvParse(csv) as {
  kanji: string;
  id_5th_ed: string;
  id_6th_ed: string;
  keyword_5th_ed: string;
  keyword_6th_ed: string;
  components: string;
  on_reading: string;
  kun_reading: string;
}[];

const html = arr.map((el) => {
  return (
    `${el.kanji}
    <span>keyword: ${el.keyword_5th_ed} ${
      el.keyword_5th_ed !== el.keyword_6th_ed ? ` k6: ${el.keyword_6th_ed}` : ""
    }</span></br>
    ${el.components ? `<span>components: ${el.components}</span></br>` : ''}
    ${el.on_reading ? `<span>on:${el.on_reading}</span></br>` : ''}
    ${el.kun_reading ? `<span>kun:${el.kun_reading}</span></br>`: ''}
    <span>id: ${el.id_5th_ed} ${
      el.id_5th_ed !== el.id_6th_ed ? ` id6: ${el.id_6th_ed}` : ""
    }</span></br>
    `
  );
}).join("\n</>\n");

Deno.writeTextFileSync("./heisig.txt", html);
