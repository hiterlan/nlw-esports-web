import logoImg from "./assets/Logo.svg";
import { CaretDown, Check, GameController } from "phosphor-react";
import { GameBanner } from "./components/GameBanner";
import { useEffect, useState } from "react";
import { Game } from "./types/Game";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { adSchema } from "./components/CreateAdSchema";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import CreateAdBanner from "./components/CreateAdBanner";
import { Input } from "./components/Form/Input";
import * as Select from "@radix-ui/react-select";

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(adSchema) });
  console.log(errors);

  const submitForm = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-standart-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              bannerURL={game.bannerURL}
              adsCount={game._count.Ad}
              title={game.title}
              key={game.id}
            />
          );
        })}
      </div>
      <Dialog.Root onOpenChange={() => setWeekDays([])}>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl text-white font-black">
              Publique um Anúncio
            </Dialog.Title>
            <form
              className="mt-8 flex flex-col gap-4"
              onSubmit={handleSubmit(submitForm)}
            >
              <div className="flex flex-col gap-2 ">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Select.Root>
                  <Select.SelectTrigger
                    id="game"
                    name="game"
                    aria-label="Game"
                    itemRef={"...register('game')"}
                    className="bg-zinc-900 py-3 px-4 rounded text-small flex justify-between "
                  >
                    <Select.SelectValue placeholder="Selecione um game" />
                    <Select.SelectIcon>
                      <CaretDown size={24} className="text-zinc-400" />
                    </Select.SelectIcon>
                  </Select.SelectTrigger>

                  <Select.SelectPortal>
                    <Select.SelectContent className="bg-zinc-900 rounded overflow-hidden">
                      <Select.SelectScrollUpButton>
                        <CaretDown size={24} />
                      </Select.SelectScrollUpButton>
                      <Select.SelectViewport className="py-2 px-1">
                        <Select.SelectGroup>
                          {games.map((game) => {
                            return (
                              <Select.SelectItem
                                key={game.id}
                                className="flex items-center justify-between py-2 px-3 m-1 bg-zinc-900 text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white"
                                value={game.id}
                              >
                                <Select.SelectItemText>
                                  {game.title}
                                </Select.SelectItemText>
                                <Select.SelectItemIndicator>
                                  <Check
                                    size={24}
                                    className="text-emerald-500"
                                  />
                                </Select.SelectItemIndicator>
                              </Select.SelectItem>
                            );
                          })}
                        </Select.SelectGroup>
                      </Select.SelectViewport>
                    </Select.SelectContent>
                  </Select.SelectPortal>
                </Select.Root>
              </div>
              <div className="flex flex-col">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input
                  id="name"
                  itemRef={"...register('nickname')"}
                  placeholder="Como te chamam dentro do game?"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    id="yearsPlaying"
                    placeholder="Tudo bem ser ZERO"
                    type="number"
                    itemRef={"...register('yearsPlaying')"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu Discord?</label>
                  <Input
                    id="discord"
                    placeholder="Usuário#0000"
                    itemRef={"...register('discord')"}
                  />
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  <ToggleGroup.Root
                    type="multiple"
                    className="grid grid-cols-4 gap-2"
                    onValueChange={setWeekDays}
                    value={weekDays}
                    itemRef={"...register('weekDays')"}
                  >
                    <ToggleGroup.Item
                      value="0"
                      title="Domingo"
                      className={`w-8 h-8 rounded 
                  ${weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="1"
                      title="Segunda-feira"
                      className={`w-8 h-8 rounded 
                  ${weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="2"
                      title="Terça-feira"
                      className={`w-8 h-8 rounded 
                  ${weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="3"
                      title="Quarta-feira"
                      className={`w-8 h-8 rounded 
                  ${weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="4"
                      title="Quinta-feira"
                      className={`w-8 h-8 rounded 
                  ${weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="5"
                      title="Sexta-feira"
                      className={`w-8 h-8 rounded 
                  ${weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="6"
                      title="Sábado"
                      className={`w-8 h-8 rounded 
                  ${weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"}`}
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hoursStart">Qual horário do dia</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="time"
                      id="hoursStart"
                      placeholder="De"
                      itemRef={"...register('hourStart')"}
                    />
                    <Input
                      type="time"
                      id="hoursEnd"
                      placeholder="Até"
                      itemRef={"...register('hourEnd')"}
                    />
                  </div>
                </div>
              </div>
              <label className="mt-2 flex gap-2 text-sm items-center">
                <Checkbox.Root
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                  itemRef={"...register('useVoiceChannel')"}
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar ao chat de voz
              </label>
              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
