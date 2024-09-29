import GamesTable from "@/components/GamesTable";

const GamesPage = () => {
  return (
    <div className="flex flex-col items-center 2xl:flex-row 2xl:items-start justify-around pt-7 gap-3">
      <GamesTable header="Ottelut Tänään" gameDays="today" />
      <GamesTable header="Kaikki Ottelut" />
      <GamesTable header="Tulevat Ottelut" gameDays="incoming" />
    </div>
  );
};

export default GamesPage;
