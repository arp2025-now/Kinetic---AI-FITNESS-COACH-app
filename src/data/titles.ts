import { CoachTitle } from "@/types";

export const TITLES: CoachTitle[] = [
  {
    id: "stranger",
    name: "Stranger",
    minLevel: 1,
    maxLevel: 1,
    color: "var(--title-stranger)",
  },
  {
    id: "acquaintance",
    name: "Acquaintance",
    minLevel: 2,
    maxLevel: 4,
    color: "var(--title-acquaintance)",
  },
  {
    id: "gym-buddy",
    name: "Gym Buddy",
    minLevel: 5,
    maxLevel: 9,
    color: "var(--title-gym-buddy)",
  },
  {
    id: "training-partner",
    name: "Training Partner",
    minLevel: 10,
    maxLevel: 14,
    color: "var(--title-training-partner)",
  },
  {
    id: "personal-coach",
    name: "Personal Coach",
    minLevel: 15,
    maxLevel: 19,
    color: "var(--title-personal-coach)",
  },
  {
    id: "elite-trainer",
    name: "Elite Trainer",
    minLevel: 20,
    maxLevel: 24,
    color: "var(--title-elite-trainer)",
  },
  {
    id: "master-coach",
    name: "Master Coach",
    minLevel: 25,
    maxLevel: 34,
    color: "var(--title-master-coach)",
  },
  {
    id: "legendary-guide",
    name: "Legendary Guide",
    minLevel: 35,
    maxLevel: 49,
    color: "var(--title-legendary-guide)",
  },
  {
    id: "fitness-sage",
    name: "Fitness Sage",
    minLevel: 50,
    maxLevel: 999,
    color: "var(--title-fitness-sage)",
  },
];

export function getTitleForLevel(level: number): CoachTitle {
  return (
    TITLES.find((t) => level >= t.minLevel && level <= t.maxLevel) || TITLES[0]
  );
}
