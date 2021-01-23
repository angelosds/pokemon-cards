import Card from "@/models/card";

export const sortCards = (a: Card, b: Card) => a.name.localeCompare(b.name);
